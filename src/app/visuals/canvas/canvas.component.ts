import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { BasicDrawlayer } from 'src/app/data/model/implementation/BasicDrawlayer';
import { VideoDrawLayer } from 'src/app/data/model/implementation/VideoDrawLayer';
//import * as PIXI from 'pixi.js';
declare var PIXI:any;
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit  {
  @ViewChild('canvas') public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  private app: any;

  private layers = [];

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    
    this.app = new PIXI.Application( window.innerWidth - 20,  window.innerHeight + 20, {
      antialias: true,
      view: canvasEl,
    });

    const layer1 = new BasicDrawlayer(this.app);
    const layer2 = new VideoDrawLayer(this.app);
    layer1.width = 500;
    layer1.height = 500;
    layer2.width = 500;
    layer2.height = 500;
    layer2.x = 500;
    layer2.y = 0;
    layer2.video = '/assets/demovid.mp4';
    this.app.stage.addChild(layer1.gfx);
    this.app.stage.addChild(layer2.gfx);

    let c = 0xAAAAAA;
    let d = c;
    
    this.app.ticker.add(function(delta) {
      // just for fun, let's rotate mr rabbit a little
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation
      c = Math.round(c + delta *4);
      d = c + 500;
    
      layer1.draw("0x" + c.toString(16));

      layer2.draw(undefined);
    });




    

  }
}
