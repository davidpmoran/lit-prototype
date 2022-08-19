import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AdimoButtonElement } from "../../../web-components/elements/adimo-button";
import { AdimoButton, AdimoComponent, AdimoLabel } from "../../../web-components/elements/AdimoComponents";
import { AdimoLabelElement } from 'src/web-components/elements/adimo-label';
@Component({
  selector: 'corp-label-property',
  templateUrl: './label-property.component.html',
  styleUrls: ['./label-property.component.css']
})
export class LabelPropertyComponent implements AfterViewInit {
  public currentLabelElement!: AdimoLabelElement;
  adimoComponents: AdimoComponent;
  adimoButtons: AdimoButton[] = [];
  adimoLabels: AdimoLabel[] = [];
  private onclickEventDetails!: string;

  constructor() {
    this.onclickEventDetails = "";
    this.adimoComponents = new AdimoComponent();
    this.adimoComponents.adimoButtons = new Array<AdimoButton>();
    this.adimoComponents.adimoLabels = new Array<AdimoLabel>();
  }
  ngAfterViewInit() {

  }
  ngOnInit() {

    document.addEventListener("selectLabelItem", (evt) => this.setLabelElement(evt));
  }

  setLabelElement(evt: Event) {
    debugger;
    console.log("Whoop two!");
    let el: AdimoLabelElement = <AdimoLabelElement>(<CustomEvent>evt).detail;

    this.currentLabelElement = el;
    console.log('working' + JSON.stringify(el));

  }



  applyChanges() {
    const input = document.getElementById('input_BtnCTA') as HTMLInputElement | null;
    const onclick = document.getElementById('input_OnClick') as HTMLInputElement | null;
    const styleInput = document.getElementById('input_CSS') as HTMLInputElement | null;
    const ourElement = document.getElementById(this.currentLabelElement.id) as HTMLInputElement | null;
    const value = input?.value as string;
    const onclickValue = onclick?.value as string;
    const style = styleInput?.value as string;
    debugger;

    this.addNewLabel(value, style, onclickValue);
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
