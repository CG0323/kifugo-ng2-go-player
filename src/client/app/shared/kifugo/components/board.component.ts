// app
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { IAppState,getStatus,getStones, getSequence } from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import { CoreService} from '../services/index'
import { Message} from 'primeng/primeng'
import { Markup, BoardStatus,Stone} from '../models/index'
import * as board from '../actions/board.action';
@Component({
  moduleId: module.id,
  selector: 'go-board',
  templateUrl: 'board.component.html',
  styleUrls: [
    'board.component.css',
  ],
})

export class BoardComponent implements OnInit, OnDestroy {
    dim: number = 19;                           
    lines = CoreService.getLines(19);                  
    stars = CoreService.getStars(19);                  
    staticGrid: number[][] = CoreService.createGrid();
    coordinates : string[] = CoreService.getCoordinates();

    public status$: Observable<BoardStatus>;
    private stoneSubscription;
    private stones: {[strName:string]:Stone};
    private currentSequence: number;
    private sequenceSubscription;

    constructor(private  store: Store<IAppState>) {
      this.status$ = store.let(getStatus);
      this.stoneSubscription = store.let(getStones).subscribe(stones=>{
        this.stones = <{[strName:string]:Stone}>stones;
      })
      this.sequenceSubscription = store.let(getSequence).subscribe(s=>{
        this.currentSequence = <number>s;
      })
    }
    
    ngOnInit():void {

    }
    
    ngOnDestroy() {
      this.stoneSubscription.unsubscribe();
      this.sequenceSubscription.unsubscribe();
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
