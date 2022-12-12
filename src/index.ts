import dashjs from "dashjs";
import * as DashjsQlog from "./dashjsQlog"
import * as VideoQlog from "./videoQlog"
import * as qlog from "./qlog-schema"

class LoggingHelpers {
    public lastRepresentation: string;

    constructor() {
        this.lastRepresentation = "";
    }
}

export class dashjs_qlog_player {
    private video: HTMLVideoElement;
    private url: string;
    private autosave: boolean;
    private player: dashjs.MediaPlayerClass;
    private eventPoller: NodeJS.Timer | undefined;
    private videoQlog: VideoQlog.VideoQlog;
    private dashjsQlog: DashjsQlog.DashjsQlog;
    private loggingHelpers: LoggingHelpers;


    constructor(video_element: HTMLVideoElement, url: string, autosave: boolean) {
        // create important video streaming elements
        this.video = video_element;
        this.url = url;
        this.autosave = autosave;
        this.player = dashjs.MediaPlayer().create();
        this.videoQlog = new VideoQlog.VideoQlog();
        this.eventPoller = undefined;
        this.dashjsQlog = new DashjsQlog.DashjsQlog(this.player, dashjs.MediaPlayer.events);
        this.loggingHelpers = new LoggingHelpers();

        // modify for logging
        this.init();
    }

    public async init() {
        this.player.updateSettings({
            'debug': {
                /* Can be LOG_LEVEL_NONE, LOG_LEVEL_FATAL, LOG_LEVEL_ERROR, LOG_LEVEL_WARNING, LOG_LEVEL_INFO or LOG_LEVEL_DEBUG */
                'logLevel': dashjs.LogLevel.LOG_LEVEL_DEBUG
            }
        });

        /* Extend RequestModifier class and implement our own behaviour */
        this.player.extend("RequestModifier", function () {
            return {
                modifyRequestHeader: function (xhr: XMLHttpRequest, url: string) {
                    /* Add custom header. Requires to set up Access-Control-Allow-Headers in your */
                    /* response header in the server side. Reference: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader */
                    /* xhr.setRequestHeader('DASH-CUSTOM-HEADER', 'MyValue'); */
                    console.log('XHR1', xhr, url, xhr.response);
                    xhr.addEventListener('loadend', (event) => { console.log('XHR4', xhr.response) });
                    return xhr;
                },
                modifyRequestURL: function (url: string) {
                    /* Modify url adding a custom query string parameter */
                    console.log('XHR2', url);
                    return url + '?customQuery=value';
                },
                modifyRequest(request: any) { //TODO fix type
                    /* Modify the entire request. Allows for async modifications */
                    console.log('XHR3', request);
                    var url = new URL(request.url);

                    if (!/\.mpd$/.test(url.pathname)) {
                        return;
                    }

                    return fetch('https://time.akamai.com')
                        .then(function (response) {
                            return response.text();
                        })
                        .then(function (text) {
                            url.searchParams.set('now', text);
                            request.url = url.toString();
                        });
                },
            };
        }, false);

        console.log(dashjs.MediaPlayer.events);



        await this.videoQlog.init(undefined);

        let autoplay = false;

        console.log(this.url);
        this.player.initialize();
        this.player.retrieveManifest(this.url, (manifest, error) => {

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
            console.log("autoplay", autoplay);
            this.player.setAutoPlay(autoplay);
            // await videoQlog.onStreamInitialised(autoplay);
            // await videoQlog.onReadystateChange(video.readyState); // HAVE_NOTHING ??

            // let a = new DashjsQlog.VideoQlog();
            // await a.init();
            // await a.test();

            this.player.on(dashjs.MediaPlayer.events["PLAYBACK_ENDED"], () => {
                this.videoQlog.onPlaybackEnded(this.video.currentTime * 1000);
                this.stopLogging();

                if (this.autosave) {
                    this.downloadCurrentLog();
                }
            });

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

            this.eventPoller = setInterval(async () => {
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
            }, 100);

            //CHROME ONLY
            //@ts-ignore
            if (this.video.webkitVideoDecodedByteCount !== undefined) {
                var lastDecodedByteCount = 0;
                const bitrateInterval = 5;
                var bitrateCalculator = setInterval(() => {
                    //@ts-ignore
                    var calculatedBitrate = (((this.video.webkitVideoDecodedByteCount - lastDecodedByteCount) / 1000) * 8) / bitrateInterval;
                    //document.getElementById('calculatedBitrate').innerText = Math.round(calculatedBitrate) + " Kbps";
                    console.log(Math.round(calculatedBitrate) + " Kbps");
                    //@ts-ignore
                    lastDecodedByteCount = this.video.webkitVideoDecodedByteCount;
                }, bitrateInterval * 1000);
            } else {
                //document.getElementById('chrome-only').style.display = "none";
            }

        });
    }

    public async stopLogging() {
        clearInterval(this.eventPoller);
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
}

export default dashjs_qlog_player;