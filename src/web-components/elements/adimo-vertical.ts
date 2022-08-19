/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AdimoButtonElement } from './adimo-button';
import { AdimoLabelElement } from './adimo-label';
import { AdimoButton, AdimoComponent, AdimoLabel } from './AdimoComponents';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('adimo-vertical')
export class AdimoVerticalElement extends LitElement {

  buttonProperties: AdimoButtonElement[] = [];
  labelProperties: AdimoLabelElement[] = [];
  adimoComponents: AdimoComponent;
  adimoButtons: AdimoButton[] = [];
  adimoLabels: AdimoLabel[] = [];
  @property({ type: Number })
  count = 0;

  constructor() {
    super();

    this.adimoComponents = new AdimoComponent();
    this.adimoComponents.adimoButtons = new Array<AdimoButton>();
    this.adimoComponents.adimoLabels = new Array<AdimoLabel>();


    var newButton = new AdimoButtonElement();
    var adimoButton = new AdimoButton();
    newButton.adimoButton = adimoButton;
    var newButton1 = new AdimoButtonElement();
    var adimoButton1 = new AdimoButton();
    newButton.isVertical = false;
    newButton1.isVertical = false;
    newButton1.adimoButton = adimoButton1;
    this.buttonProperties.push(newButton);
    this.buttonProperties.push(newButton1);

  }

  static override styles = css`

  div.adimo-ext-box{
    border: solid 1px gray;

    min-height:200px;
    min-width:200px;
    display: table; width:100%;
  }
  div.adimo-int-box{
    display: table-cell; vertical-align: middle;
  }
`;


  @property()
  name = 'Vertical' + this.count;


  override render() {
    return html`
    <div class="adimo-ext-box">
       <div class="adimo-int-box" id="adimo-vertical-${VerticalStats.btnCount++}"  @click="${this._onClick}" draggable=${true} @dragstart=${(e: DragEvent) => this._onDrag('dragstart', e)}>
       ${this.buttonProperties}
         ${this.labelProperties}
  </div>
  </div>
     `;
  }


  private _onClick(e: { target: any; } | null) {
    if (e != null) {
      console.log(e.target);

      document.dispatchEvent(new CustomEvent<AdimoVerticalElement>("selectItem", { detail: e.target }));
    }

  }

  private _onDrag(eventType: string, ev: DragEvent) {
    ev.dataTransfer?.setData("text", (<HTMLDivElement>ev.target).id);
    console.log("start of drag" + eventType + ' : ' + JSON.stringify(ev));
  }
  private _allowDrop(eventType: string, ev: DragEvent) {
    ev.preventDefault();
    console.log("allow drop" + eventType + ' : ' + JSON.stringify(ev));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'adimo-vertical': AdimoVerticalElement;
  }
}


export abstract class VerticalStats {
  public static btnCount = 0;
}