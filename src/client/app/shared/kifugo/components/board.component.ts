// app
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { IAppState,getStatus,getStones } from '../../ngrx/index';
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

    public grid$: Observable<number[][]>;
    public status$: Observable<BoardStatus>;
    private stoneSubscription;
    private stones: Stone[];

    constructor(private store: Store<IAppState>) {
      this.status$ = store.let(getStatus);
      this.stoneSubscription = store.let(getStones).subscribe(stones=>{
        this.stones = <Stone[]>stones;
      })
    }
    
    ngOnInit():void {

    }
    
    ngOnDestroy() {
      this.stoneSubscription.unsubscribe();
    }

    getGridStatus(i:number,j:number):number {
      var position = i + "," + j;
      if(!this.stones){
        return 0;
      }else{
        var temp = this.stones.filter(s=>s.position === position);
        if(temp.length == 0){
          return 0;
        }else{
          return temp[0].c;
        }
      }
    }

    getSequence(i:number,j:number):string {
      var position = i + "," + j;
      if(!this.stones){
        return "";
      }else{
        var temp = this.stones.filter(s=>s.position === position);
        if(temp.length == 0){
          return "";
        }else{
          return temp[0].sequence.toString();
        }
      }
    }
}
