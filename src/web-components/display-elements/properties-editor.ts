import {
  LitElement,
  html,
  property,
  customElement,
  css,
  state
} from "lit-element";

import { ElementProperty } from 'src/web-components/elements/element-properties';


@customElement("properties-editor")
class PropertiesEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    table {
      border-collapse: collapse;
      width: 100%;
    }

    td,
    th {
      border: 1px solid gray;
      text-align: left;
      padding: 5px;
    }
  `;

  @property({ type: Number }) elementId: number;
  @state() elementProp?: ElementProperty;

  constructor() {
    super();
    this.elementId=0;
  }

  render() {
    if (this.elementId === undefined) {
      return html``;
    }

    return html`
      <table>
        <tr>
          <th>Element Id</th>
        </tr>
        <tr>
          <td>${this.elementProp?.elementId}</td>
        </tr>
      </table>
    `;
  }

  update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("elementId")) {
      const oldValue = changedProperties.get("elementId") as number;
      console.log("elementId updated, newVal", this.elementId, "oldVal", oldValue);
      this.loadAddress(this.elementId);
    }
    super.update(changedProperties);
  }

  private async loadAddress(id: number) {
  //  this.elementProp = await this.getElement(id);

  }

  private getElement(id: number) {
   // return new Promise<ElementProperty>((resolve, reject) => resolve(this.elementId[id]));
  }
}
