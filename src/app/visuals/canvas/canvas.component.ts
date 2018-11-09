import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { BasicDrawlayer } from 'src/app/data/model/implementation/BasicDrawlayer';
import { VideoDrawLayer } from 'src/app/data/model/implementation/VideoDrawLayer';
import { HelperService } from 'src/app/shared/helper.service';
import { AnimationStepperService } from 'src/app/shared/animation-stepper.service';
// import * as PIXI from 'pixi.js';
declare var PIXI: any;
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
  constructor(public helperService: HelperService, public animationStepperService: AnimationStepperService) {}
  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.app = new PIXI.Application( window.innerWidth - 20,  window.innerHeight + 20, {
      antialias: true,
      view: canvasEl,
    });

   // const layer1 = new BasicDrawlayer(this.app);
    const layer2 = new VideoDrawLayer(this.app);
    // layer1.width = 500;
    // layer1.height = 500;
    layer2.width = this.app.renderer.width;
    layer2.height = this.app.renderer.height;
    layer2.x = 0;
    layer2.y = 0;
    layer2.video = '/assets/demovid.mp4';
  //  layer2.speedByRuntime = true;
  //  layer2.desiredRuntime = this.helperService.getSecondsFromBeats(4, 128);

    // this.app.stage.addChild(layer1.gfx);
    this.app.stage.addChild(layer2.gfx);


    const fadeLength = this.helperService.getSecondsFromBeats(4, 128);

    const ticker = this.app.ticker;
    ticker.add(function(delta) {
      // delta is 1 if running at 100% performance
      // creates frame-independent transformation

      layer2.opacity = this.animationStepperService.fadeUpSlope(layer2.opacity, 0, 1, fadeLength, ticker.FPS);


    });

  }
}
