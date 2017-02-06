// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { KifuService, CoreService } from '../services/index';
import * as kifu from '../actions/kifu.action';
import * as player from '../actions/player.action';
import {KNode,Kifu,SearchParam} from '../models/index'

@Injectable()
export class KifuEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  // @Effect() init$: Observable<Action> = this.actions$
  //   .ofType(kifu.ActionTypes.INIT)
  //   .startWith(new kifu.InitAction)
  //   .switchMap(() => this.kifuService.searchKifus(0,25,null))
  //   .map(data => {
  //     return new kifu.LoadedAction({kifus: data.res.kifus, first: data.params.first, rows: data.params.rows, player : data.params.player, totalCount: data.res.totalCount});
  //   })
  //   // nothing reacting to failure at moment but you could if you want (here for example)
  //   .catch(() => Observable.of(new kifu.SearchFailedAction()));

  @Effect() search$: Observable<Action> = this.actions$
    .ofType(kifu.ActionTypes.SEARCH)
    .startWith(new kifu.SearchAction({first: 0, rows: 20, player: null}))
    .switchMap(action => {
      var params = <SearchParam>action.payload;
      return this.kifuService.searchKifus(params.first, params.rows, params.player)}
    )
    .map(data => {
      return new kifu.LoadedAction({kifus: data.res.kifus, first: data.params.first, rows: data.params.rows, player : data.params.player, totalCount: data.res.totalCount});
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new kifu.SearchFailedAction()));


  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(kifu.ActionTypes.DELETE)
    .switchMap(action => {
      var id = action.payload;
      return this.kifuService.deleteKifu(id)}
    )
    .map(data => {
      return new kifu.EmptyAction();
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new kifu.SearchFailedAction()));


  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private kifuService: KifuService,
    private coreService: CoreService
  ) { }
}
