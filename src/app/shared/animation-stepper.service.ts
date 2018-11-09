import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationStepperService {

  constructor() { }


  fadeUpSlope(current: number, min: number, max: number, seconds: number, fps: number): number {

    const step = 1 / (seconds * fps);

    if (current >= max) {
      current = min;
    }

    return current + step;
  }
}
