import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'corp-element-event-action',
  templateUrl: './element-event-action.component.html',
  styleUrls: ['./element-event-action.component.css']
})
export class ElementEventActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.addEventListener("count-changed", ((event: CustomEvent) => {
      console.log("Whoop!");
    }) as EventListener);
  }

}
