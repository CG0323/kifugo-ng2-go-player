// app
import {Component, Input} from '@angular/core';
import { CoreService} from '../services/index'
import { Stone} from '../models/index'
@Component({
  moduleId: module.id,
  selector: 'go-board',
  templateUrl: 'board.component.html',
  styleUrls: [
    'board.component.css',
  ],
})

export class BoardComponent {

    @Input() stones: {[strName:string]:Stone};
    @Input() currentSequence: number;
    dim: number = 19;                           
    lines = CoreService.getLines(19);                  
    stars = CoreService.getStars(19);                  
    staticGrid: number[][] = CoreService.createGrid();
    coordinates : string[] = CoreService.getCoordinates();

    constructor() {

    }
    

    getGridStatus(i:number,j:number):number {
      var position = i + "," + j;
      if(this.stones.hasOwnProperty(position)){
        return this.stones[position].c;
      }
      return 0;
    }

    getSequence(i:number,j:number):string {
      var position = i + "," + j;
      if(this.stones.hasOwnProperty(position)){
        return this.stones[position].sequence.toString();
      }
      return "";
    }

    getSequenceClass(i:number,j:number):string {
      var position = i + "," + j;
      if(this.stones.hasOwnProperty(position)){
        let sequence = this.stones[position].sequence;
        if(sequence === this.currentSequence){
          return "text-sequence-last";
        }
        let stone = this.stones[position];
        if(stone.c == 1){
          return "text-sequence-black";
        }else{
          return "text-sequence-white";
        }
      }
      return "";
    }
}
