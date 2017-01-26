// app
import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import { IAppState,getGrid,getTextMarkups,getTrMarkups,getMsgs } from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import { CoreService} from '../services/index'
import { Message} from 'primeng/primeng'
import { Markup} from '../models/index'

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

    constructor(private store: Store<IAppState>) {
      this.grid$ = store.let(getGrid);
      this.textMarkups$ = store.let(getTextMarkups);
      this.trMarkups$ = store.let(getTrMarkups);
      this.msgs$ = store.let(getMsgs);
    }
    
    ngOnInit():void {

    }
    
    ngOnDestroy() {

    }

    onClick(i:number,j:number) {

    }
  
    /**
     * Helper to convert a number to a letter.
     * @param num: a number >= 1 && <= 26
     */    
    num2letter(num: number): string {
        if(num >= 1 && num <= 26) {
            return String.fromCharCode(64 + num) + num;
        }
        return "";
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
