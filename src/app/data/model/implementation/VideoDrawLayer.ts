
import { BaseDrawlayer } from "./BaseDrawlayer";

export class VideoDrawLayer extends BaseDrawlayer implements DrawLayer {
    private _video: string
    texture : any; 
    get video(): string {
        return this._video;
    }
    set video(value: string) {
        this._video = value;

        this.texture = PIXI.Texture.fromVideo(value);
        this.gfx = new PIXI.Sprite(this.texture); 
        this.gfx.x = this.x;
        this.gfx.y = this.y;

    }



    draw(undefined) {
        super.draw(undefined);
        if(this.gfx) {
            
        } else {
            throw Error("No Drawing Layer provided");
        }
    }
}