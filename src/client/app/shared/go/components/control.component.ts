import { Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MenuItem, SlideMenuModule } from 'primeng/primeng';
import { IAppState, getMenuItems,getProblemRaws, getIsFirstProblem, getIsLastProblem,getIsNotInProblem } from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import * as directory from '../actions/directory.action';
import { ProblemRaw } from '../models/index'


@Component({
  moduleId: module.id,
  selector: 'go-control',
  templateUrl: 'control.component.html',
  styleUrls: [
    'control.component.css',
  ],
})



export class ControlComponent implements OnInit, OnDestroy {
      @ViewChild('menu') menu;
      private directorySubscription;
      private problemsSubscription;
      private currentProblemSubscription;
      private isFirst$:Observable<boolean>;
      private isLast$: Observable<boolean>;
      private isNotInProblem$: Observable<boolean>;
      private menuItems:MenuItem[];
      public problems$: Observable<ProblemRaw[]>;
      constructor(private store: Store<IAppState>) {
         this.directorySubscription = store.let(getMenuItems)
         .subscribe((items:any[]) => {
            this.menuItems = items.map(item=>this.appendCommand(item));
           })
         this.problems$ = store.let(getProblemRaws);
         this.isFirst$ = store.let(getIsFirstProblem);
         this.isLast$ = store.let(getIsLastProblem);
         this.isNotInProblem$ = store.let(getIsNotInProblem);
    }
    
    ngOnInit():void {
       
    }
    
    ngOnDestroy() {
        this.directorySubscription.unsubscribe();
    }

    appendCommand = (item:any)=>{
      if(item.id){
        item.command = (event) => {
          this.store.dispatch(new directory.SelectDirectoryAction(event.item.id));
        };
        return item;
      }
      else{
          item.items = item.items.map(i=>this.appendCommand(i));
          return item;
        }
    }

    selectDirectory(id:string){
      this.store.dispatch(new directory.SelectDirectoryAction(id));
    }

    selectProblem(problem:ProblemRaw){
      this.store.dispatch(new directory.SelectProblemAction(problem));
    }

    redoProblem(){
      this.store.dispatch(new directory.ReloadProblemAction());
    }

    nextProblem(){
      this.store.dispatch(new directory.NextProblemAction());
    }

    previousProblem(){
      this.store.dispatch(new directory.PreviousProblemAction());
    }

}


