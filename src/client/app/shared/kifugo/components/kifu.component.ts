import { Component, Input, OnInit, OnDestroy, ViewChild,ChangeDetectionStrategy} from '@angular/core';
import { LazyLoadEvent} from 'primeng/primeng';
import { IAppState, getKifus, getTotalKifuCount} from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import { Kifu } from '../models/index'
import * as kifuAction from '../actions/kifu.action';
@Component({
  moduleId: module.id,
  selector: 'kifu',
  templateUrl: 'kifu.component.html',
  styleUrls: [
    'kifu.component.css',
  ],
//   changeDetection:  ChangeDetectionStrategy.OnPush
})

export class KifuComponent implements OnInit, OnDestroy {

    public kifus$ : Observable<Kifu[]>;
    public totalCount$: Observable<number>;
    private globalFilter: string;
    constructor(private store: Store<IAppState>) {
        this.kifus$ = store.let(getKifus);
        this.totalCount$ = store.let(getTotalKifuCount);
    }
    private selectedKifu : Kifu;
    
    ngOnInit():void {
       
    }
    
    ngOnDestroy() {
    }

    getDate(dt:string){
        var matchDate = new Date(dt);
        return matchDate.toLocaleDateString();
    }

    loadKifusLazy(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        
        // console.log(this.globalFilter);
        this.store.dispatch(new kifuAction.SearchAction({first:event.first, rows: event.rows, player: this.globalFilter}));
    }

    deleteKifu(k: Kifu){
        this.store.dispatch(new kifuAction.DeleteAction(k._id));
    }

    selectKifu(k: Kifu){
        console.log(k);
    }

}


