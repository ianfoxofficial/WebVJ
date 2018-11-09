import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getSecondsFromBeats(beats: number, bpm: number): number {
    return beats * 60 / bpm;
  }

}
