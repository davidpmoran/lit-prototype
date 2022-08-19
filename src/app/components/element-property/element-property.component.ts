import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'corp-element-property',
  templateUrl: './element-property.component.html',
  styleUrls: ['./element-property.component.css']
})
export class ElementPropertyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Whoop two!");
    document.addEventListener("count-changed", ((event: CustomEvent) => {
      console.log("Whoop!");
    }) as EventListener);
  }



}
