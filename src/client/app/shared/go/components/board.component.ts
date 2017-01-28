// app
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { IAppState,getTextMarkups,getTrMarkups,getMsgs,getStatus,getStones } from '../../ngrx/index';
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
    public textMarkups$: Observable<Markup[]>;
    public trMarkups$: Observable<Markup[]>;
    public msgs$ : Observable<Message[]>;
    public status$: Observable<BoardStatus>;
    private enabled:boolean;
    private correct:boolean;
    private wrong:boolean;
    private subscription;
    private stoneSubscription;
    private stones: Stone[];

    constructor(private store: Store<IAppState>) {
      this.textMarkups$ = store.let(getTextMarkups);
      this.trMarkups$ = store.let(getTrMarkups);
      this.msgs$ = store.let(getMsgs);
      this.status$ = store.let(getStatus);

      this.subscription = this.status$.subscribe(status=>{
        this.enabled = status == BoardStatus.Enabled;
        this.correct = status == BoardStatus.Right;
        this.wrong = status == BoardStatus.Wrong;
      });
      this.stoneSubscription = store.let(getStones).subscribe(stones=>{
        this.stones = <Stone[]>stones;
      })
    }
    
    ngOnInit():void {

    }
    
    ngOnDestroy() {
      this.subscription.unsubscribe();
      this.stoneSubscription.unsubscribe();
    }

    onClick(i:number,j:number) {
      this.store.dispatch(new board.MoveAction({x:i,y:j,c:1}));
    }

    getTrianglePoints(markup: any): string{
      var x0 = markup.x*500;
      var y0 = 500*markup.y +500;
      var x1 = markup.x*500 + 250;
      var y1 = 500*markup.y;
      var x2 = markup.x*500 + 500;
      var y2 = 500*markup.y +500;

      var result = x0 + ',' + y0 + ' ' + x1 + ',' + y1 + ' ' + x2 + ',' + y2;
      return result;
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
}
