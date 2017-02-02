import { Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MenuItem, SlideMenuModule } from 'primeng/primeng';
import { IAppState,getIsNotInKifu,getIsFirst, getIsLast} from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import * as boardAction from '../actions/board.action'



@Component({
  moduleId: module.id,
  selector: 'go-control',
  templateUrl: 'control.component.html',
  styleUrls: [
    'control.component.css',
  ],
})

export class ControlComponent implements OnInit, OnDestroy {

    private isNotInKifu$ : Observable<boolean>;
    private isFirst$ : Observable<boolean>;
    private isLast$ : Observable<boolean>;

    constructor(private store: Store<IAppState>) {
        this.isNotInKifu$ = store.let(getIsNotInKifu);
        this.isFirst$ = store.let(getIsFirst);
        this.isLast$ = store.let(getIsLast);
    }
    
    ngOnInit():void {
       
    }
    
    ngOnDestroy() {
    }

    start(){
      this.store.dispatch(new boardAction.StartAction());
    }

    nextStep(){
      this.store.dispatch(new boardAction.NextAction());
    }

    previousStep(){
      this.store.dispatch(new boardAction.PrevAction());
    }

}


