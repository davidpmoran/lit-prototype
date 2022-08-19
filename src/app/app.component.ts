import { Component } from '@angular/core';
import { AdimoButtonElement } from 'src/web-components/elements/adimo-button';
import { AdimoLabelElement } from 'src/web-components/elements/adimo-label';
import { MainCanvasComponent } from 'src/web-components/elements/main-canvas-element';
import { PropertiesElement } from 'src/web-components/elements/properties-element';

import '../web-components/elements/adimo-button';
import '../web-components/elements/adimo-label';
import '../web-components/elements/adimo-vertical';
import '../web-components/elements/main-canvas-element';
import '../web-components/elements/properties-element';


@Component({
  selector: 'corp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  parentItem: HTMLInputElement;


}
