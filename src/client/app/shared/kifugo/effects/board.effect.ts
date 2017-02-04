// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import {KifuService, CoreService } from '../services/index';
import * as kifu from '../actions/kifu.action';
import * as board from '../actions/board.action';
import {KNode, BoardStatus} from '../models/index'
import {getStatus} from '../../ngrx/index'

@Injectable()
export class BoardEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(board.ActionTypes.INIT)
    .switchMap(action => {
      var id = action.payload;
      return this.kifuService.loadKifuWithDetail(id)}
    )
    .map(data => {
      return new board.InitializedAction(data);
    })

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private kifuService: KifuService
  ) { }
}
