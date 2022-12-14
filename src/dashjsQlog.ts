import * as dashjs from "dashjs";

export class DashjsQlog {
    private mediaPlayer: dashjs.MediaPlayerClass;

    constructor(mediaPlayer: dashjs.MediaPlayerClass, mediaPlayerEvents: dashjs.MediaPlayerEvents) {
        this.mediaPlayer = mediaPlayer;
        this.hook(mediaPlayerEvents);
    }

    private dummy() {
        let dummy_string = "dummy hook"
        for (let index = 0; index < arguments.length; index++) {
            const argument = arguments[index];
            dummy_string += `\t${argument.type}`
            if (argument.message) {
                dummy_string += `{${argument.message}}`
            }
        }

        console.log(dummy_string);
        // console.log(dummy_string, arguments);
    }

    // NATIVE EVENTS


    // DASH JS EVENTS

    private onBufferUpdate() {
        //TODO
        console.log('buffer update', arguments);
    }

    private hook(mediaPlayerEvents: dashjs.MediaPlayerEvents) {
        const hooks = {
            [mediaPlayerEvents.BUFFER_EMPTY]: this.onBufferUpdate,
            [mediaPlayerEvents.BUFFER_LOADED]: this.onBufferUpdate,
            [mediaPlayerEvents.BUFFER_LEVEL_STATE_CHANGED]: this.onBufferUpdate,
        };

        const ignoredEvents = [
            mediaPlayerEvents.METRICS_CHANGED,
            mediaPlayerEvents.METRIC_CHANGED
        ];
        console.log(ignoredEvents);

        console.log(hooks);

        for (const eventKey in mediaPlayerEvents) {
            //@ts-expect-error
            const eventValue = mediaPlayerEvents[eventKey];
            if (eventValue in hooks) {
                //@ts-expect-error
                this.mediaPlayer.on(eventValue, hooks[eventValue]);
                // console.log("hook found", eventKey)
            } else if (ignoredEvents.includes(eventValue)) {
                // no hook placed
                // console.log('ignored', eventKey);
            } else {
                this.mediaPlayer.on(eventValue, this.dummy);
                // console.log('dummied', eventKey);
            }
        }
    }
}