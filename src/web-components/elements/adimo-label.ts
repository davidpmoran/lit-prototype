/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AdimoLabel } from './AdimoComponents';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart label - The label
 */
@customElement('adimo-label')
export class AdimoLabelElement extends LitElement {


  @property({ type: AdimoLabel })
  adimoLabel = new AdimoLabel();

  @property()
  display = 'World';



  override render() {
    return html`
       <label  id="adimo-label-${LabelStats.labelCount++}" @click=${this._onClick} part="label" draggable=${true} @dragstart=${(e: DragEvent) => this._onDrag('dragstart', e)}>
         Label Elements
  </label>
   

       <br>
       <slot></slot>
     `;
  }

  private _onClick(e: { target: any; } | null) {

    if (e != null) {
      console.log(e.target);

      document.dispatchEvent(new CustomEvent<AdimoLabelElement>("selectLabelItem", { detail: e.target }));
    }

  }


  private _onDrag(eventType: string, ev: DragEvent) {
    ev.dataTransfer?.setData("text", (<HTMLDivElement>ev.target).id);
    console.log("start of drag" + eventType + ' : ' + JSON.stringify(ev));
  }

}

declare global {
  interface HTMLElementTagNameMap {
    'adimo-label': AdimoLabelElement;
  }
}


export abstract class LabelStats {
  public static labelCount = 0;
}