declare var PIXI: any;
export class BaseDrawlayer implements DrawLayer {
    protected _opacity = 1;
    protected _width: number;
    protected _height: number;


    get opacity(): number {
        return this._opacity;
    }
    set opacity(value: number) {

        value = value >= 0 ?  (value <= 1) ? value : 1    : 0;
        this._opacity = value;

        if (this.gfx) {
            this.gfx.alpha = value;
        }
    }
    gfx: any;


    get width(): number {
        return this._width;
    }
    set width(value: number) {
        this._width = value;
        if (this.gfx) {
            this.gfx._width = value;
        }
    }

    get height(): number {
        return this._height;
    }
    set height(value: number) {
        this._height = value;
        if (this.gfx) {
            this.gfx.height = value;
        }
    }

    protected _x = 0;
    protected _y = 0;

    get x(): number {
        return this._x;
    }
    set x(value: number) {
        this._x = value;
        if (this.gfx) {
            this.gfx.x = value;
        }
    }

    get y(): number {
        return this._y;
    }
    set y(value: number) {
        this._y = value;
        if (this.gfx) {
            this.gfx.y = value;
        }
    }

    layer: PIXI.Application;
    name: string;

    constructor(drawinglayer: PIXI.Application) {
        this.gfx = new PIXI.Graphics();
        this.layer = drawinglayer;
        this.gfx.x = this.x;
        this.gfx.y = this.y;

    }


    draw(data: any) {
        if (this.gfx) {

        } else {
            throw Error('No Drawing Layer provided');
        }
    }


}
