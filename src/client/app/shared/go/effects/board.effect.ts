// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
// module
import {CoreService } from '../services/index';
import * as directory from '../actions/directory.action';
import * as board from '../actions/board.action';
import {KNode, BoardStatus} from '../models/index'
import {getStatus} from '../../ngrx/index'

@Injectable()
export class BoardEffects {

  @Effect() move$: Observable<Action> = this.actions$
    .ofType(board.ActionTypes.MOVE)
    .withLatestFrom(this.store.let(getStatus))
    .map(([action,status]) => {
      if(status == BoardStatus.Right){
        return new directory.NextProblemAction();
      }
      return new directory.EmptyAction()
    })

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private coreService: CoreService
  ) { }
}
