
import { BaseDrawlayer } from './BaseDrawlayer';
declare var PIXI: any;

export class VideoDrawLayer extends BaseDrawlayer implements DrawLayer {
    private _video: string;
    texture: any;
    videoSource: any;
    private _ratioLock = true;
    private _muted = true;
    private _loop = true;

    // Playback speed can be set by Runtime (in seconds) or by Desired speed (default is 1.0);
    private _speedByRuntime = false;
    private _desiredRuntime: number;
    private _desiredSpeed = 1.0;

    get speedByRuntime(): boolean {
        return this._speedByRuntime;
    }
    set speedByRuntime(value: boolean) {
        this._speedByRuntime = value;

        this.setVideoSpeed();
    }

    get desiredRuntime(): number {
        return this._desiredRuntime;
    }

    set desiredRuntime(value: number) {
        this._desiredRuntime = value;
        this.setVideoSpeed();
    }

    get desiredSpeed(): number {
        return this._desiredSpeed;
    }
    set desiredSpeed(value: number) {
        this._desiredSpeed  = value;
        this.setVideoSpeed();
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this.resize();
    }

    get height(): number {
        return this._height;
    }
    set height(value: number) {
        this._height = value;
        this.resize();
    }

    get muted(): boolean {
        return this._muted;
    }

    set muted(value: boolean) {
        this._muted = value;
        if (this.videoSource) {
            this.videoSource.muted = value;
        }
    }

    get loop(): boolean {
        return this._loop;
    }
    set loop(value: boolean) {
        this._loop = value;
        if (this.videoSource) {
            this.videoSource.loop = value;
        }
    }

    get ratioLock(): boolean {
        return this._ratioLock;
    }

    set ratioLock(value: boolean) {
        this._ratioLock = value;
        this.resize();
    }

    get video(): string {
        return this._video;
    }
    set video(value: string) {
        if (this._video !== value) { // don't reload if current video is the same
            this._video = value;

            this.texture = PIXI.Texture.fromVideo(value);
            this.gfx = new PIXI.Sprite(this.texture);
            this.videoSource = this.texture.baseTexture.source;
            this.videoSource.muted = this.muted;
            this.videoSource.loop = this.loop;
            const self = this;
            this.gfx.x = this.x;
            this.gfx.y = this.y;

            this.videoSource.addEventListener('loadeddata', function() {
                self.resize();
                if (self.desiredRuntime) {
                    self.setVideoSpeed();
                }
            });

        }
    }

    resize() {
        if (this.videoSource && this.gfx) {
            const ratio = this.videoSource.videoHeight / this.videoSource.videoWidth;
            if (this.ratioLock && ratio < 1) {
                // video is landscape
                this.gfx.width = this.width;
                this.gfx.height = this.width * ratio;
            } else if (this.ratioLock && ratio > 1) {
                // video is portrait
                this.gfx.height = this.height;
                this.gfx.width = this.height * ratio;
            } else {
                // video is square
                this.gfx.height = this.height;
                this.gfx.width = this.width;
            }
            // offset x or y based on actual width or height.
            this.gfx.x = this.gfx.x + Math.round((this.width - this.gfx.width) * 0.5);
            this.gfx.y = this.gfx.y + Math.round((this.height - this.gfx.height) * 0.5);
        }
    }

    setVideoSpeed() {
        if (this.videoSource && this.gfx) {

            if (this.speedByRuntime) {
                // the speed is calculated from the desired runtime.
                // ex. The video is 5 seconds long but we want to play it in 1 second. This means the playback speed should be 5
                const newrate = this.videoSource.duration / this.desiredRuntime;

                if (!isNaN(newrate)) {
                    this.videoSource.playbackRate = newrate <= 16 ? newrate : 16;
                }

            } else {
                // The speed is selected by the speed, regardless of duration.
                this.videoSource.playbackRate = this.desiredSpeed;
            }
        }

    }


    draw(undefined) {
        // video draw layers don't need the draw function
        return;
    }
}
