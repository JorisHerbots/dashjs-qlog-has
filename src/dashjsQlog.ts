import * as dashjs from "dashjs";

export class DashjsQlog {
    private mediaPlayer: dashjs.MediaPlayerClass;

    constructor(mediaPlayer: dashjs.MediaPlayerClass, mediaPlayerEvents: dashjs.MediaPlayerEvents) {
        this.mediaPlayer = mediaPlayer;
        this.hook(mediaPlayerEvents);
    }

    private dummy() {
       //console.log(arguments);
       let dummy_string = "dummy hook"
       for (let index = 0; index < arguments.length; index++) {
           const argument = arguments[index];
           dummy_string += `\t${argument.type}`
           if (argument.message) {
               dummy_string += `{${argument.message}}`
           }
       }
       
       console.log(dummy_string);
    }

    // NATIVE EVENTS


    // DASH JS EVENTS

    private onBufferUpdate() {
        console.log(arguments);
    }

    private hook(mediaPlayerEvents: dashjs.MediaPlayerEvents) {
        const eventHooks: Record<string, Function> = {
            [mediaPlayerEvents.AST_IN_FUTURE]: this.dummy,
            [mediaPlayerEvents.BUFFER_EMPTY]: this.onBufferUpdate,
            [mediaPlayerEvents.BUFFER_LOADED]: this.onBufferUpdate,
            [mediaPlayerEvents.BUFFER_LEVEL_STATE_CHANGED]: this.onBufferUpdate,
            [mediaPlayerEvents.ERROR]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_COMPLETED]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_PROGRESS]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_STARTED]: this.dummy,
            [mediaPlayerEvents.FRAGMENT_LOADING_ABANDONED]: this.dummy,
            [mediaPlayerEvents.LOG]: this.dummy,
            [mediaPlayerEvents.MANIFEST_LOADED]: this.dummy,
            [mediaPlayerEvents.METRICS_CHANGED]: this.dummy,
            [mediaPlayerEvents.METRIC_CHANGED]: this.dummy,
            [mediaPlayerEvents.METRIC_ADDED]: this.dummy,
            [mediaPlayerEvents.METRIC_UPDATED]: this.dummy,
            [mediaPlayerEvents.PERIOD_SWITCH_COMPLETED]: this.dummy,
            [mediaPlayerEvents.PERIOD_SWITCH_STARTED]: this.dummy,
            [mediaPlayerEvents.QUALITY_CHANGE_REQUESTED]: this.dummy,
            [mediaPlayerEvents.QUALITY_CHANGE_RENDERED]: this.dummy,
            [mediaPlayerEvents.TRACK_CHANGE_RENDERED]: this.dummy,
            // [mediaPlayerEvents.SOURCE_INITIALIZED]: this.dummy,
            [mediaPlayerEvents.STREAM_INITIALIZING]: this.dummy,
            [mediaPlayerEvents.STREAM_INITIALIZED]: this.dummy,
            [mediaPlayerEvents.STREAM_TEARDOWN_COMPLETE]: this.dummy,
            [mediaPlayerEvents.TEXT_TRACKS_ADDED]: this.dummy,
            [mediaPlayerEvents.TEXT_TRACK_ADDED]: this.dummy,
            [mediaPlayerEvents.TTML_PARSED]: this.dummy,
            [mediaPlayerEvents.TTML_TO_PARSE]: this.dummy,
            [mediaPlayerEvents.CAPTION_RENDERED]: this.dummy,
            [mediaPlayerEvents.CAPTION_CONTAINER_RESIZE]: this.dummy,
            [mediaPlayerEvents.CAN_PLAY]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_ENDED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_ERROR]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_NOT_ALLOWED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_METADATA_LOADED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_PAUSED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_PLAYING]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_PROGRESS]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_RATE_CHANGED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_SEEKED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_SEEKING]: this.dummy,
            // [mediaPlayerEvents.PLAYBACK_SEEK_ASKED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_STALLED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_STARTED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_TIME_UPDATED]: this.dummy,
            [mediaPlayerEvents.PLAYBACK_WAITING]: this.dummy,
            [mediaPlayerEvents.MANIFEST_VALIDITY_CHANGED]: this.dummy,
            // [mediaPlayerEvents.GAP_CAUSED_PLAYBACK_SEEK]: this.dummy,
        };

        console.log(eventHooks);

        for (let key in eventHooks) {
            // @ts-ignore
            this.mediaPlayer.on(key, eventHooks[key]);
        }
    }
}