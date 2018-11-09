declare var PIXI:any;
export class BaseDrawlayer implements DrawLayer {
    width: number;
    height: number;
    gfx: any;
    private _x =0;
    private _y = 0;
    
    get x():number {
        return this._x;
    }
    set x(value:number) {
        this._x = value;
        if(this.gfx) {
            this.gfx.x = value;
        }
    }

    get y():number {
        return this._y;
    }
    set y(value:number) {
        this._y = value;
        if(this.gfx) {
            this.gfx.y = value;
        }
    }

    layer : PIXI.Application;
    name: string;    
    
    constructor(drawinglayer: PIXI.Application) { 
        this.gfx = new PIXI.Graphics();
        this.layer = drawinglayer;
        this.gfx.x = this.x;
        this.gfx.y = this.y;

    }
    
    
    draw(data: any) {
        if(this.gfx) {
            
            
           
        } else {
            throw Error("No Drawing Layer provided");
        }
    }


}