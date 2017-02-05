import { Component, Input} from '@angular/core';
import { Kifu } from '../models/index'

@Component({
  moduleId: module.id,
  selector: 'info',
  templateUrl: 'info.component.html',
  styleUrls: [
    'info.component.css',
  ]
})

export class InfoComponent {
    @Input() kifu: Kifu;
    @Input() comment: string;
    constructor() {
    }

    getDate(dt:any){
        if(!dt){
            return "";
        }
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }
}


