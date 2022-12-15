import * as idb from "idb"
import * as qlog from "./qlog-schema"

interface VideoQlogOverviewDB extends idb.DBSchema {
    overview: {
        value: string
        key: string
    }
}

interface VideoQlogDB extends idb.DBSchema {
    events: {
        key: string,
        value: IVideoEvent
        // value: string
    };
}

interface IVideoEvent {
    time: number,
    category: string,
    type: qlog.ABREventTypes,
    data: qlog.ABREventData
}

// Represents a single video trace
export class VideoQlog {
    private traceName!: string;
    private logDatabase!: idb.IDBPDatabase<VideoQlogDB>;
    private overviewDatabase!: VideoQlogOverviewManager;
    private startTimestamp!: number;
    private startTimer!: number;

    async init(traceName: string | undefined) {
        if (!window.indexedDB) {
            console.error("No support for IndexedDB, halting videoQlog.");
            return;
        }

        this.startTimestamp = new Date().getTime();
        this.startTimer = window.performance.now();
        this.traceName = traceName || this.startTimestamp.toString();

        let databaseName: string = "videoQlog-" + this.traceName;
        this.logDatabase = await idb.openDB<VideoQlogDB>(databaseName, 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("events")) {
                    db.createObjectStore("events", { autoIncrement: true })
                }
            }
        });

        this.overviewDatabase = new VideoQlogOverviewManager();
        await this.overviewDatabase.init();
        await this.overviewDatabase.registerNewDatabase(databaseName);
    }

    private getCurrentTimeOffset(): number {
        return window.performance.now() - this.startTimer;
    }

    public async generateBlob() {
        await this.retrieveLogs().then(logs => {
            let time: Date = new Date(new Date().getTime());
            // https://quiclog.github.io/internet-drafts/draft02/draft-marx-qlog-main-schema.html
            let qlogJson: any = {
                qlog_version: "draft-02",
                qlog_format: "JSON",
                title: "qlog-abr",
                description: "",
                traces: [
                    {
                        title: "MPEG-DASH dash.js",
                        description: `MPEG-DASH dash.js collection [${time.toISOString()}] [${navigator.userAgent}]`,
                        vantage_point: {
                            name: "DashJS application layer",
                            type: qlog.VantagePointType.client
                        },
                        common_fields: {
                            protocol_type: "QLOG_ABR", // TODO jherbots
                            reference_time: "" + this.startTimestamp,
                            time_format: "relative",
                        },
                        events: logs
                    }
                ]
            };

            this.generateDownloadEvent(JSON.stringify(qlogJson));
        });
    }

    private async retrieveLogs(): Promise<any[]> {
        let logs: any[] = await this.logDatabase.getAll("events");
        return logs;
    }

    private wrapEventData(category: string, type: qlog.ABREventTypes, data: qlog.ABREventData): IVideoEvent {
        return {
            time: this.getCurrentTimeOffset(),
            category: category,
            type: type,
            data: data
        };
    }

    private generateDownloadEvent(data: string) {
        let blob: Blob = new Blob([data], { type: "application/json;charset=utf8" });
        let link: string = window.URL.createObjectURL(blob);
        let domA = document.createElement("a");
        domA.download = "dashjs.qlog";
        domA.href = link;
        document.body.appendChild(domA);
        domA.click();
        document.body.removeChild(domA);
    }

    private async registerEvent(eventData: IVideoEvent) {
        console.log(eventData);
        await this.logDatabase.put("events", eventData);
    }

    // ***
    // Video QLog formatters
    // ***

    // Native events

    public async onPlaybackEnded(timestamp: number) {
        let eventData: qlog.IEventABRStreamEnd = {
            playhead_ms: timestamp
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.stream_end, eventData));
    }

    public async onPlayheadProgress(timestamp: number) {
        let eventData: qlog.IEventABRPlayheadProgress = {
            playhead_ms: timestamp
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.playhead_progress, eventData));
    }

    public async onStreamInitialised(url: string, autoplay: boolean, manifest: Object | undefined) {
        let eventData: qlog.IEventABRStreamInitialised = {
            url: url,
            autoplay: autoplay,
            manifest: manifest,
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.stream_initialised, eventData));
    }

    public async onStreamEnded(timestamp: number) {
        let eventData: qlog.IEventABRStreamEnd = {
            playhead_ms: timestamp
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.playback, qlog.PlaybackEventType.stream_end, eventData));
    }

    public async onRepresentationSwitch(mediaType: qlog.MediaType, newRepName: string, bitrate: number) {
        let eventData: qlog.IEventABRSwitch = {
            media_type: mediaType,
            to_id: newRepName,
            to_bitrate: bitrate
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.abr, qlog.ABREventType.switch, eventData));
    }

    public async onReadystateChange(state: qlog.ReadyState) {
        let eventData: qlog.IEventABRReadystateChange = {
            state: state
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.abr, qlog.ABREventType.readystate_change, eventData));
    }

    public async onBufferLevelUpdate(mediaType: qlog.MediaType, level: number) {
        let eventData: qlog.IEventABRBufferOccupancy = {
            media_type: mediaType,
            playout_ms: level
        };
        await this.registerEvent(this.wrapEventData("video", qlog.BufferEventType.occupancy_update, eventData));
    }

    public inferMediaTypeFromURL(url: string): qlog.MediaType {
        const extension = url.split('.').slice(-1)[0];
        
        //TODO NOTE might not include all known extensions
        const video_extensions: string[] = [
            'avi',
            'mkv',
            'mp4', 'm4p', 'm4v',
            'webm',
        ];
        if (video_extensions.includes(extension)) {
            return qlog.MediaType.video;
        }

        //TODO NOTE might not include all known extensions
        const audio_extensions: string[] = [
            'aac',
            'm4a',
            'mp3',
            'wav'
        ];
        if (audio_extensions.includes(extension)) {
            return qlog.MediaType.audio;
        }

        //TODO NOTE might not include all known extensions
        const subtitles_extensions: string[] = [
            'srt'
        ];
        if (subtitles_extensions.includes(extension)) {
            return qlog.MediaType.subtitles;
        }

        return qlog.MediaType.other;
    }

    public async onRequest(url: string, media_type: qlog.MediaType) {
        let eventData: qlog.IEventABRRequest = {
            resource_url: url,
            media_type: media_type,
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.abr, qlog.NetworkEventType.request, eventData));
    }

    public async onRequestUpdate(url: string, bytes_received: number) {
        let eventData: qlog.IEventABRRequestUpdate = {
            resource_url: url,
            bytes_received: bytes_received,
        };
        await this.registerEvent(this.wrapEventData(qlog.EventCategory.abr, qlog.NetworkEventType.request_update, eventData));
    }
}

export class VideoQlogOverviewManager {
    private overviewDatabase!: idb.IDBPDatabase<VideoQlogOverviewDB>;

    public async init() {
        this.overviewDatabase = await idb.openDB<VideoQlogOverviewDB>("VideoQlog-overview", 1, {
            upgrade(db) {
                if (!db.objectStoreNames.contains("overview")) {
                    db.createObjectStore("overview", { autoIncrement: true })
                }
            }
        });
    }

    public async clearAll() {
        let databaseNames: string[] = await this.overviewDatabase.getAll("overview");
        // console.log(databaseNames);
        databaseNames.forEach(database => {
            idb.deleteDB(database);
        });
        await this.overviewDatabase.clear("overview");
    }

    public async registerNewDatabase(databaseName: string) {
        return this.overviewDatabase.put("overview", databaseName);
    }
}
