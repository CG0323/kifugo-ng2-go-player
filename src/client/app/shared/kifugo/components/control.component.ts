import { Component, Input,Output,EventEmitter} from '@angular/core';



@Component({
  moduleId: module.id,
  selector: 'go-control',
  templateUrl: 'control.component.html',
  styleUrls: [
    'control.component.css',
  ],
})

export class ControlComponent {

    @Input() disabled: boolean;
    @Input() isFirst: boolean;
    @Input() isLast: boolean;
    @Output() start = new EventEmitter<any>();
    @Output() prev = new EventEmitter<any>();
    @Output() next = new EventEmitter<any>();

    constructor() {
    }

    onStart(){
      this.start.emit();
    }

    onNext(){
      this.next.emit();
    }

    onPrevious(){
      this.prev.emit();
    }

}


