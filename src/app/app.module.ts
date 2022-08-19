import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ElementPropertyComponent } from './components/element-property/element-property.component';
import { ElementEventActionComponent } from './components/element-event-action/element-event-action.component';
import { ElementProperty2Component } from './components/element-property2/element-property2.component';

@NgModule({
  declarations: [AppComponent, ElementProperty2Component],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
