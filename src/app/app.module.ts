import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ControlPanelComponent } from './control/control-panel/control-panel.component';
import { CanvasComponent } from './visuals/canvas/canvas.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
