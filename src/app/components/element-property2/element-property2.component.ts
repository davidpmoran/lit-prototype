import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AdimoButtonElement } from "../../../web-components/elements/adimo-button";
import { AdimoButton, AdimoComponent, AdimoLabel } from "../../../web-components/elements//AdimoComponents";
import { AdimoLabelElement } from 'src/web-components/elements/adimo-label';
@Component({
  selector: 'corp-element-property2',
  templateUrl: './element-property2.component.html',
  styleUrls: ['./element-property2.component.css']
})
export class ElementProperty2Component implements AfterViewInit {
  public currentBtnElement!: AdimoButtonElement;
  public currentLabelElement!: AdimoLabelElement;
  adimoComponents: AdimoComponent;
  adimoButtons: AdimoButton[] = [];
  adimoLabels: AdimoLabel[] = [];
  private onclickEventDetails!: string;
  private componentType!: string;

  constructor() {
    this.onclickEventDetails = "";
    this.componentType = "";
    this.adimoComponents = new AdimoComponent();
    this.adimoComponents.adimoButtons = new Array<AdimoButton>();
    this.adimoComponents.adimoLabels = new Array<AdimoLabel>();
  }
  ngAfterViewInit() {
    const inputTag = document.getElementById('buttonElm2') as HTMLInputElement;


  }
  ngOnInit() {


    document.addEventListener("selectItem", (evt) => this.setButtonElement(evt));

    document.addEventListener("selectLabelItem", (evt) => this.setLabelElement(evt));
  }

  setLabelElement(evt: Event) {
    debugger;
    this.componentType = "label";
    console.log("Whoop two!");
    let el: AdimoLabelElement = <AdimoLabelElement>(<CustomEvent>evt).detail;

    this.currentLabelElement = el;
    console.log('working' + JSON.stringify(el));
    var propBtnBox = document.getElementById('btn_properties_box');
    if (propBtnBox != undefined) {
      propBtnBox.style.display = "none";
    }

    var propLabelBox = document.getElementById('label_properties_box');
    if (propLabelBox != undefined) {
      propLabelBox.style.display = "block";
    }
  }



  setButtonElement(evt: Event) {
    debugger;
    this.componentType = "button";
    console.log("Whoop two!");
    let el: AdimoButtonElement = <AdimoButtonElement>(<CustomEvent>evt).detail;

    this.currentBtnElement = el;
    console.log('working' + JSON.stringify(el));
    var propLabelBox = document.getElementById('label_properties_box');
    if (propLabelBox != undefined) {
      propLabelBox.style.display = "none";
    }
    var propBtnBox = document.getElementById('btn_properties_box');
    if (propBtnBox != undefined) {
      propBtnBox.style.display = "block";
    }



  }

  applyChanges() {

    if (this.componentType === "button") {
      const input = document.getElementById('input_BtnCTA') as HTMLInputElement | null;
      const onclick = document.getElementById('input_OnClick') as HTMLInputElement | null;
      const styleInput = document.getElementById('input_CSS') as HTMLInputElement | null;


      const value = input?.value as string;
      const onclickValue = onclick?.value as string;
      const style = styleInput?.value as string;
      debugger;
      this.addNewButton(value, style, onclickValue);
    }
    else {
      const input = document.getElementById('input_labelCTA') as HTMLInputElement | null;
      const onclick = document.getElementById('input_labelOnClick') as HTMLInputElement | null;
      const styleInput = document.getElementById('input_labelCSS') as HTMLInputElement | null;


      const value = input?.value as string;
      const onclickValue = onclick?.value as string;
      const style = styleInput?.value as string;
      debugger;
      this.addNewLabel(value, style, onclickValue);
    }
  }

  private addNewButton(value: string, style: string, onclickValue: string) {
    this.currentBtnElement.innerText = value;
    var n = this.currentBtnElement.id.lastIndexOf('-');
    var indexResult = this.currentBtnElement.id.substring(n + 1);
    var adimoButton = new AdimoButton();
    adimoButton.id = this.currentBtnElement.id;
    adimoButton.style = style;
    debugger;
    adimoButton.onClick = onclickValue;
    adimoButton.text = value;
    adimoButton.index = indexResult;
    this.adimoComponents.adimoButtons?.push(adimoButton);
    this.currentBtnElement.setAttribute('onclick', 'function onClick() { onclickValue }');
    this.currentBtnElement.setAttribute('style', style);
  }

  private addNewLabel(value: string, style: string, onclickValue: string) {
    this.currentLabelElement.innerText = value;
    var n = this.currentLabelElement.id.lastIndexOf('-');
    var indexResult = this.currentLabelElement.id.substring(n + 1);
    var adimoLabel = new AdimoLabel();
    adimoLabel.id = this.currentLabelElement.id;
    adimoLabel.style = style;
    debugger;
    adimoLabel.onClick = onclickValue;
    adimoLabel.text = value;
    adimoLabel.index = indexResult;
    this.adimoComponents.adimoLabels?.push(adimoLabel);
    this.currentLabelElement.setAttribute('onclick', 'function onClick() { onclickValue }');

    this.currentLabelElement.setAttribute('style', style);
  }

  exportComponent() {
    const element = document.getElementsByTagName("main-canvas-component")[0];

    const canvasString = element.renderRoot.innerHTML.replace('id="custom-el-container" style="height:800px;"', 'id="custom-el-container"');
    element.renderRoot.children[0].removeAttribute("style");

    console.log(element.renderRoot.innerHTML);
    var data = { htmlCanvas: element.renderRoot.innerHTML, JSCanvas: this.onclickEventDetails };
    const response = fetch("https://localhost:7004/createTemplate", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });


    const response2 = fetch("https://localhost:7004/createJSONTemplate", {
      method: 'POST',
      body: JSON.stringify(this.adimoComponents),
      headers: {
        'Content-Type': 'application/json',
      },
    });

  }


}
