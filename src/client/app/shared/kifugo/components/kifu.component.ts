import { Component, Input, OnInit, OnDestroy, ViewChild,ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { LazyLoadEvent, DataTable} from 'primeng/primeng';
import { IAppState, getKifus, getTotalKifuCount} from '../../ngrx/index';
import { Store } from '@ngrx/store';
import { Observable} from 'rxjs/Observable';
import { Kifu } from '../models/index'
import * as kifuAction from '../actions/kifu.action';
import * as boardAction from '../actions/board.action';

@Component({
  moduleId: module.id,
  selector: 'kifu',
  templateUrl: 'kifu.component.html',
  styleUrls: [
    'kifu.component.css',
  ],
  changeDetection:  ChangeDetectionStrategy.Default
})

export class KifuComponent implements OnInit, OnDestroy {
    @ViewChild('dt') dataTable: DataTable;
    public kifus$ : Observable<Kifu[]>;
    public totalCount$: Observable<number>;
    private globalFilter: string;

    constructor(private store: Store<IAppState>, private router: Router, private route: ActivatedRoute) {
       this.kifus$ = this.store.let(getKifus);
       this.totalCount$ = this.store.let(getTotalKifuCount);
    }
    ngOnInit():void {
       let first = +this.route.snapshot.queryParams['first'];
       if(first){
        this.setCurrentPage(first);
       }
       this.globalFilter = this.route.snapshot.queryParams['search'];
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
        // console.log(event.first);

        // if(event.first == 0 && this.ignore0Count > 0){
        //     this.ignore0Count--;
        //     return;
        // }
        this.store.dispatch(new kifuAction.SearchAction({first:event.first, rows: event.rows, player: this.globalFilter}));
        let params = <any>{};

        if(this.globalFilter){
            params.search = this.globalFilter;
        }
        if(event.first != 0){
            params.first = event.first;
        }
        this.router.navigate([],{queryParams:params});
    }

    deleteKifu(k: Kifu){
        this.store.dispatch(new kifuAction.DeleteAction(k._id));
    }

    selectKifu(k: Kifu){

        this.router.navigate(['./player',k._id]);
    }

    /**
     * Set datatable page from outside, workaround to 'remember the page number in url'
     * @param n
     */
    setCurrentPage(first: number) {

        let paging = {
            first: first,
            rows: 20
        };
        this.dataTable.paginate(paging);
    }

     /**
     * A tricky workaround to force requesting data from backend when globalFilter changes
     */
    filterChange(newValue){
        this.globalFilter = newValue;
        let paging = {
            first: this.dataTable.first,
            rows: 20
        };
        this.dataTable.paginate(paging);
    }

}


