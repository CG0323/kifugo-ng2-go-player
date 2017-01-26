import { Component, Input, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { MenuItem, SlideMenuModule } from 'primeng/primeng';
import { IAppState, getMenuItems,getProblemRaws } from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import * as directory from '../actions/directory.action';
import { ProblemRaw } from '../models/index'


@Component({
  moduleId: module.id,
  selector: 'go-directory',
  templateUrl: 'directory.component.html',
  styleUrls: [
    'directory.component.css',
  ],
})



export class DirectoryComponent implements OnInit, OnDestroy {
      @ViewChild('menu') menu;
      private directorySubscription;
      private problemsSubscription;
      private menuItems:MenuItem[];
      public problems$: Observable<ProblemRaw[]>;
      constructor(private store: Store<IAppState>) {
         this.directorySubscription = store.let(getMenuItems)
         .subscribe((items:any[]) => {
            this.menuItems = items.map(item=>this.appendCommand(item));
           })
         this.problems$ = store.let(getProblemRaws);
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
          this.menu.toggle();
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
}


