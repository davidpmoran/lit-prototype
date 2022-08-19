import { LitElement, html, TemplateResult, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { AdimoButtonElement } from "./adimo-button";
import { AdimoLabelElement } from "./adimo-label";
import { AdimoButton, AdimoComponent, AdimoLabel } from "./AdimoComponents";
import * as fs from "fs";

@customElement('main-canvas-component')
export class MainCanvasComponent extends LitElement {

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
    this.adimoComponents.adimoComponents = new Array<AdimoComponent>();

  }


  edit(event: Event) {
  }

  static override styles = css`
  :host {
    display: block;
    border: solid 1px gray;
    padding: 16px;
    max-width: 800px;
    min-height:400px;
    min-width:500px;
  }
`;
  // @state is a reactive property. This makes `this.templates`
  // schedule an efficient update when it is assigned to different values.
  // See: https://lit.dev/docs/components/properties/#internal-reactive-state
  @state()
  templates: TemplateResult[] = []




  override render() {
    return html`
         <div id="custom-el-container" style="height:800px;"  @dragover=${(e: DragEvent) => this._allowDrop('dragover', e)} @drop=${(e: DragEvent) => this._onDrop('ondrop', e)} >
        
         ${this.buttonProperties}
         ${this.labelProperties}
         </div>

         <br>
         <div>

          </div>
      `;
  }




  private _onDrop(eventType: string, ev: DragEvent) {
    console.log('onDROP: ' + eventType);
    ev.preventDefault();
    const id = ev.dataTransfer?.getData('text');
    const test = ev.target;
    debugger;
    if (id?.includes('adimo-button')) {
      this.appendNewCustomEl2();
    }

    if (id?.includes('adimo-label')) {
      this.appendNewCustomEl();
    }

    if (id?.includes('adimo-vertical')) {
      this.appendNewVertical();
    }
  }

  private _allowDrop(eventType: string, ev: DragEvent) {
    ev.preventDefault();
    console.log("allow drop" + eventType + ' : ' + JSON.stringify(ev));
  }


  private _onClick(e: { target: any; } | null) {
    if (e != null) {
      console.log(e.target);

      document.dispatchEvent(new CustomEvent<HTMLInputElement>("selectItem", { detail: e.target }));
    }

  }

  appendNewVertical() {
    const templateToAppend = html`
     <label id="adimo-label-${ElementStats.labelCount++}"  draggable="true" @click=${this._onClick}>Label</label>
      `;
    var newElement = { elementId: this.count++, displayText: "Vertical", alignment: "center", elementType: "adimo-vertical" }


    var newLabel = new AdimoLabelElement();
    var adimoLabel = new AdimoLabel();
    newLabel.adimoLabel = adimoLabel;
    this.labelProperties.push(newLabel);

  }

  appendNewCustomEl() {
    const templateToAppend = html`
     <label id="adimo-label-${ElementStats.labelCount++}"  draggable="true" @click=${this._onClick}>Label</label>
      `;
    var newElement = { elementId: this.count++, displayText: "New Label", alignment: "center", elementType: "adimo-label" }


    var newLabel = new AdimoLabelElement();
    var adimoLabel = new AdimoLabel();
    newLabel.adimoLabel = adimoLabel;
    this.labelProperties.push(newLabel);

  }

  appendNewCustomEl2() {
    const templateToAppend = html`
    <button id="adimo-button-${ElementStats.btnCount++}" draggable="true" @click=${this._onClick}>Button</button>`;
    //this.templates = [...this.templates, templateToAppend];
    var newElement = { elementId: this.count++, displayText: "New Label", alignment: "center", elementType: "adimo-button" }


    var newButton = new AdimoButtonElement();
    var adimoButton = new AdimoButton();
    newButton.adimoButton = adimoButton;
    this.buttonProperties.push(newButton);


  }




}

declare global {
  interface HTMLElementTagNameMap {
    'main-canvas-component': MainCanvasComponent;
    'adimo-label': AdimoLabelElement;
    'adimo-button': AdimoButtonElement;
  }
}







export abstract class ElementStats {
  public static labelCount = 1;
  public static btnCount = 1;
}