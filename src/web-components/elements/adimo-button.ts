/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AdimoButton } from './AdimoComponents';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('adimo-button')
export class AdimoButtonElement extends LitElement {


  @property({ type: AdimoButton })
  adimoButton = new AdimoButton();


  @property({ type: Number })
  count = 1;


  @property({ type: Boolean })
  isVertical = false;


  @property()
  name = 'Button' + this.count;


  override render() {

    if (this.isVertical) {
      return html`
    <br>
       <button  id="adimo-button-${ButtonStats.btnCount++}" part="button" @click="${this._onClick}" draggable=${true} @dragstart=${(e: DragEvent) => this._onDrag('dragstart', e)}>
         Button Elements
       </button>
     `;
    }
    else {
      return html`
         <button  id="adimo-button-${ButtonStats.btnCount++}" part="button" @click="${this._onClick}" draggable=${true} @dragstart=${(e: DragEvent) => this._onDrag('dragstart', e)}>
           Button Elements
         </button>
       `;
    }
  }


  private _onClick(e: { target: any; } | null) {
    if (e != null) {
      console.log(e.target);

      document.dispatchEvent(new CustomEvent<AdimoButtonElement>("selectItem", { detail: e.target }));
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
    'adimo-button': AdimoButtonElement;
  }
}


export abstract class ButtonStats {
  public static btnCount = 0;
}