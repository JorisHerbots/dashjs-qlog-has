import * as dashjs from "dashjs";

export class DashjsQlog {
    private mediaPlayer: dashjs.MediaPlayerClass;
    public active: boolean;

    constructor(mediaPlayer: dashjs.MediaPlayerClass, mediaPlayerEvents: dashjs.MediaPlayerEvents) {
        this.active = false;
        this.mediaPlayer = mediaPlayer;
        this.hook(mediaPlayerEvents);
    }

    private dummy(hookArguments: IArguments) {
        if (!this.active) { return; }
        let dummy_string = "dummy hook"
        for (let index = 0; index < hookArguments.length; index++) {
            const argument = hookArguments[index];
            dummy_string += `\t${argument.type}`
            if (argument.message) {
                dummy_string += `{${argument.message}}`
            }
        }

        console.log(dummy_string);
        // console.log(dummy_string, hookArguments);
    }

    // NATIVE EVENTS


    // DASH JS EVENTS

    private onBufferUpdate() {
        if (!this.active) { return; }
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
        // console.log(ignoredEvents);

        // console.log(hooks);

        for (const eventKey in mediaPlayerEvents) {
            //@ts-expect-error
            const eventValue = mediaPlayerEvents[eventKey];
            if (eventValue in hooks) {
                //@ts-expect-error
                this.mediaPlayer.on(eventValue, (...hookArguments: any) => {hooks[eventValue](<IArguments>hookArguments)});
                // console.log("hook found", eventKey)
            } else if (ignoredEvents.includes(eventValue)) {
                // no hook placed
                // console.log('ignored', eventKey);
            } else {
                this.mediaPlayer.on(eventValue, (...hookArguments: any) => {this.dummy(<IArguments>hookArguments)});
                // console.log('dummied', eventKey);
            }
        }
    }
}