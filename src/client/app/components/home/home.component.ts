// libs
import { Component, ElementRef, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { IAppState, getKifus, getTotalKifuCount, getFirst, getPlayer} from '../../shared/ngrx/index';
import { Kifu } from '../../shared/kifugo/models/index'
import * as kifuAction from '../../shared/kifugo/actions/kifu.action';
@Component({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {
  public kifus$ : Observable<Kifu[]>;
  public totalCount$: Observable<number>;
   constructor(private store: Store<IAppState>, private router: Router, private route: ActivatedRoute) {
       this.kifus$ = this.store.let(getKifus);
       this.totalCount$ = this.store.let(getTotalKifuCount);
    }

  onLoadKifus(event: any) {
        console.log("I am ahre");
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        this.store.dispatch(new kifuAction.SearchAction({first:event.first, rows: event.rows, player: event.player}));
        let params = <any>{};
         if(event.player){
           params.search = event.player;
         }
         if(event.first != 0){
            params.first = event.first;
        }

        this.router.navigate([],{queryParams:params});
  }
  
  onDeleteKifu(id: string){
        this.store.dispatch(new kifuAction.DeleteAction(id));
    }

  onSelectKifu(id: string){
        this.router.navigate(['./player',id]);
    }
}
