import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'heading',
  template: `<h1 (click)="onClick()">{{value | uppercase}}</h1>`
})
export class HeadingComponent {

  @Input() value = "Grundformular";

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  onClick(){
			this.notify.emit('clicked!');
  }
}
