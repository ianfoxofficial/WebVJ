import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { ControlPanelComponent } from './control/control-panel/control-panel.component';
import { CanvasComponent } from './visuals/canvas/canvas.component';
const routes: Routes = [
  { path: 'visuals', component : CanvasComponent },
  { path: '', component : ControlPanelComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { }
