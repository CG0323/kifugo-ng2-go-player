// app
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { IAppState,getGrid,getTextMarkups,getTrMarkups,getMsgs,getStatus } from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import { CoreService} from '../services/index'
import { Message} from 'primeng/primeng'
import { Markup, BoardStatus} from '../models/index'

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
    private subscription;

    constructor(private store: Store<IAppState>) {
      this.grid$ = store.let(getGrid);
      this.textMarkups$ = store.let(getTextMarkups);
      this.trMarkups$ = store.let(getTrMarkups);
      this.msgs$ = store.let(getMsgs);
      this.status$ = store.let(getStatus);

      this.subscription = this.status$.subscribe(status=>{
        this.enabled = status == BoardStatus.Enabled;
      });
    }
    
    ngOnInit():void {

    }
    
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    onClick(i:number,j:number) {

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
}
