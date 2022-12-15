import dashjs from "dashjs";
import * as DashjsQlog from "./dashjsQlog"
import * as VideoQlog from "./videoQlog"
import * as qlog from "./qlog-schema"

class LoggingHelpers {
    public lastRepresentation: string;
    public lastDecodedByteCount: number;

    constructor() {
        this.lastRepresentation = "";
        this.lastDecodedByteCount = 0;
    }
}

export class dashjs_qlog_player {
    private active: boolean;
    private video: HTMLVideoElement;
    private url: string;
    private autosave: boolean;
    private player: dashjs.MediaPlayerClass;
    private eventPoller: NodeJS.Timer | undefined;
    private eventPollerChrome: NodeJS.Timer | undefined;
    private videoQlog: VideoQlog.VideoQlog;
    private dashjsQlog: DashjsQlog.DashjsQlog;
    private statusBox: HTMLElement;
    private statusItems: { [key: string]: HTMLElement };
    private loggingHelpers: LoggingHelpers;

    public autoplay: boolean;

    constructor(video_element: HTMLVideoElement, url: string, autosave: boolean, statusBox: HTMLElement) {
        // create important video streaming elements
        this.active = false;
        this.video = video_element;
        this.url = url;
        this.autoplay = false;
        this.autosave = autosave;
        this.player = dashjs.MediaPlayer().create();
        this.videoQlog = new VideoQlog.VideoQlog();
        this.eventPoller = undefined;
        this.eventPollerChrome = undefined;
        this.dashjsQlog = new DashjsQlog.DashjsQlog(this.player, dashjs.MediaPlayer.events);
        this.statusBox = statusBox;
        this.statusItems = {};
        this.setStatus('status', 'uninitialised', 'black');
        this.loggingHelpers = new LoggingHelpers();
    }

    public async setup() {
        this.setStatus('status', 'initialising', 'orange');

        this.player.updateSettings({
            'debug': {
                /* Can be LOG_LEVEL_NONE, LOG_LEVEL_FATAL, LOG_LEVEL_ERROR, LOG_LEVEL_WARNING, LOG_LEVEL_INFO or LOG_LEVEL_DEBUG */
                'logLevel': dashjs.LogLevel.LOG_LEVEL_DEBUG
            }
        });

        /* Extend RequestModifier class and implement our own behaviour */
        this.player.extend("RequestModifier", () => {
            return {
                modifyRequestHeader: (xhr: XMLHttpRequest, urlObject: any) => {
                    if (!this.active) { return xhr; }
                    const url = urlObject.url;
                    this.videoQlog.onRequest(url, this.videoQlog.inferMediaTypeFromURL(url));
                    xhr.addEventListener('loadend', () => {
                        this.videoQlog.onRequestUpdate(url, xhr.response.byteLength);
                    });
                    return xhr;
                },
                modifyRequestURL: (url: string) => {
                    return url; // unmodified
                },
                modifyRequest: (request: any) => {
                    return; // unmodified
                },
            };
        }, false);

        this.player.on(dashjs.MediaPlayer.events["PLAYBACK_ENDED"], () => {
            this.videoQlog.onPlaybackEnded(this.video.currentTime * 1000);
            this.stopLogging();

            if (this.autosave) {
                this.downloadCurrentLog();
            }
        });

        console.log(this.url);

        this.player.initialize();
        await this.videoQlog.init(undefined);

        //TODO use promise to ensure this has ended before continuing
        this.player.retrieveManifest(this.url, async (manifest, error) => {

            if (error) {
                console.error(error);
                return;
            }

            if (manifest == null) {
                console.error("null manifest");
                return;
            }

            console.log("video", this.video);
            this.player.attachView(this.video);
            console.log("manifest", manifest);
            this.player.attachSource(manifest);
            console.log("autoplay", this.autoplay);
            this.player.setAutoPlay(this.autoplay);

            await this.videoQlog.onStreamInitialised(this.url, this.autoplay, manifest);
            await this.videoQlog.onReadystateChange(this.video.readyState);

            // https://html.spec.whatwg.org/multipage/media.html#mediaevents
            // video.addEventListener('canplay', (e: Event) => console.log(e));
            this.video.addEventListener('canplay', e => { console.log(e); console.warn(this.video.readyState); this.videoQlog.onReadystateChange(this.video.readyState); });
            this.video.addEventListener('play', e => { console.warn("play"); console.log(e); });
            this.video.addEventListener('waiting', e => { console.warn("waiting"); console.log(e); });
            this.video.addEventListener('playing', e => { console.warn("playing"); console.log(e); });
            this.video.addEventListener('pause', e => { console.warn("pause"); console.log(e); });
            this.video.addEventListener('error', e => { console.warn("error"); console.log(e); });
            this.video.addEventListener('seeking', e => { console.warn("seeking"); console.log(e); });
            this.video.addEventListener('seeked', e => { console.warn("seeked"); console.log(e); });
            this.video.addEventListener('timeupdate', e => { console.log(e); console.log(this.video.currentTime); this.videoQlog.onPlayheadProgress(this.video.currentTime * 1000); });
            // video.addEventListener('progress', e => videoQlog.onProgressUpdate("video", e.timestamp));
            this.video.addEventListener('ratechange', e => { console.warn("ratechange"); console.log(e); });
            this.video.addEventListener('loadedmetadata', e => this.videoQlog.onReadystateChange(this.video.readyState));
            this.video.addEventListener('loadeddata', e => this.videoQlog.onReadystateChange(this.video.readyState));
            this.video.addEventListener('canplay', e => this.videoQlog.onReadystateChange(this.video.readyState));
            this.video.addEventListener('canplaythrough', e => this.videoQlog.onReadystateChange(this.video.readyState));
            this.video.addEventListener('stalled', e => { console.warn("stalled"); console.log(e); });
            this.video.addEventListener('ended', e => { console.warn("eneded"); console.log(e); });
            this.video.addEventListener('resize', e => { console.warn("resize"); console.log(e); });
            this.video.addEventListener('volumechange', e => { console.warn("volumechange"); console.log(e); });
        });

        this.setStatus('status', 'initialised', 'green');
    }

    private async eventPollerFunction() {
        let activeStream = this.player.getActiveStream();
        if (!activeStream) { return; }
        var streamInfo = activeStream.getStreamInfo();
        var dashMetrics = this.player.getDashMetrics();
        var dashAdapter = this.player.getDashAdapter();

        if (dashMetrics && streamInfo) {
            const periodIdx = streamInfo.index;
            var repSwitch = dashMetrics.getCurrentRepresentationSwitch('video');
            console.log('representationswitch', repSwitch);
            var bufferLevel = dashMetrics.getCurrentBufferLevel('video');
            // var bitrate = repSwitch ? Math.round(dashAdapter.getBandwidthForRepresentation(repSwitch.to, periodIdx) / 1000) : NaN;
            // var adaptation = dashAdapter.getAdaptationForType(periodIdx, 'video', streamInfo)
            // var frameRate = adaptation.Representation_asArray.find(function (rep) {
            //     return rep.id === repSwitch.to
            // }).frameRate;
            // document.getElementById('bufferLevel').innerText = bufferLevel + " secs";
            // document.getElementById('framerate').innerText = frameRate + " fps";
            // document.getElementById('reportedBitrate').innerText = bitrate + " Kbps";

            // console.log(bufferLevel);
            await this.videoQlog.onBufferLevelUpdate(qlog.MediaType.video, bufferLevel);
            // await videoQlog.onRepresentationSwitch("video", repSwitch.to);

            //@ts-ignore
            let adaptation = dashAdapter.getAdaptationForType(periodIdx, 'video', streamInfo);
            //@ts-ignore
            let adaptationInfo = adaptation.Representation_asArray.find(function (rep) {
                //@ts-ignore
                return rep.id === repSwitch.to;
            });
            // console.log(adaptation);
            // console.log(adaptationInfo);
            /**
             bandwidth: 14931538
            codecs: "avc1.640033"
            frameRate: 30
            height: 2160
            id: "bbb_30fps_3840x2160_12000k"
            mimeType: "video/mp4"
            sar: "1:1"
            scanType: "progressive"
            width: 3840
            <prototype>: {…]
            */
            if (this.loggingHelpers.lastRepresentation !== adaptationInfo.id) {
                this.loggingHelpers.lastRepresentation = adaptationInfo.id;
                await this.videoQlog.onRepresentationSwitch(qlog.MediaType.video, adaptationInfo.id, adaptationInfo.bandwidth);
            }
        }
    }

    private async eventPollerFunctionChrome() {
        //@ts-expect-error
        var calculatedBitrate = (((this.video.webkitVideoDecodedByteCount - this.loggingHelpers.lastDecodedByteCount) / 1000) * 8) / 5; //TODO magic bitrate value
        this.setStatus('bitrate', Math.round(calculatedBitrate) + " Kbps", 'black')
        //@ts-expect-error
        this.loggingHelpers.lastDecodedByteCount = this.video.webkitVideoDecodedByteCount;
    }

    public async startLogging() {
        this.active = true;
        this.dashjsQlog.active = true;
        this.eventPoller = setInterval(() => { this.eventPollerFunction() }, 100); //TODO magic value
        //@ts-expect-error
        if (this.video.webkitVideoDecodedByteCount !== undefined) {
            this.eventPollerFunctionChrome(); // first log point is now
            this.eventPollerChrome = setInterval(() => { this.eventPollerFunctionChrome() }, 5 * 1000); //TODO magic bitrate value
        }
    }

    public async stopLogging() {
        this.active = false;
        this.dashjsQlog.active = false;
        clearInterval(this.eventPoller);
        clearInterval(this.eventPollerChrome);
    }

    public async downloadCurrentLog() {
        await this.videoQlog.generateBlob();
    }

    public wipeDatabases() {
        let dbManager = new VideoQlog.VideoQlogOverviewManager();
        dbManager.init().then(() => {
            dbManager.clearAll().then(() => console.info("All databases wiped."));
        });
    }

    public setStatus(key: string, value: string, color: string) {
        if (this.statusItems[key] === undefined) {
            let newStatus = document.createElement('div');
            let keySpan = document.createElement('strong');
            keySpan.innerText = key + ': ';
            let valueSpan = document.createElement('span');

            newStatus.appendChild(keySpan);
            newStatus.appendChild(valueSpan);
            this.statusBox.appendChild(newStatus);

            this.statusItems[key] = valueSpan;
        }

        this.statusItems[key].innerText = value;
        this.statusItems[key].style.color = color;
    }
}

export default dashjs_qlog_player;