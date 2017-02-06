// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import {KifuService, CoreService } from '../services/index';
import * as player from '../actions/player.action';
import {KNode, BoardStatus} from '../models/index'
import {getStatus} from '../../ngrx/index'

@Injectable()
export class PlayerEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(player.ActionTypes.INIT)
    .switchMap(action => {
      var id = action.payload;
      return this.kifuService.loadKifuWithDetail(id)}
    )
    .map(data => {
      return new player.InitializedAction(data);
    })

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private kifuService: KifuService
  ) { }
}
