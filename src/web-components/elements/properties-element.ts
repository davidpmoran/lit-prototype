/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { Input } from '@angular/core';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * An example element.
 *
 * @fires count-changed - Indicates when the count changes
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('properties-element')
export class PropertiesElement extends LitElement {
  @property() oldValue = "";
  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World';

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;



  override render() {
    return html`<div class="property-row"> Properties
  
     <div class="property-column" style="background-color:#bbb;">
     <input type="text" id="input_BtnCTA" name="input_BtnCTA"  >
     </div>
   </div>
       <slot></slot>
     `;
  }




}

declare global {
  interface HTMLElementTagNameMap {
    'properties-element': PropertiesElement;
  }
}
