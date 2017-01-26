// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { DirectoryService, CoreService } from '../services/index';
import * as directory from '../actions/directory.action';
import * as board from '../actions/board.action';
import {KNode} from '../models/index'

@Injectable()
export class DirectoryEffects {

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect() init$: Observable<Action> = this.actions$
    .ofType(directory.ActionTypes.INIT)
    .startWith(new directory.InitAction)
    .switchMap(() => this.directoryService.getMenuItems())
    .map(data => {
      let items = data;
      return new directory.InitializedAction(items);
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new directory.InitFailedAction()));
  
  @Effect() selectDirectory$: Observable<Action> = this.actions$
    .ofType(directory.ActionTypes.SELECT_DIRECTORY)
    .switchMap((action) => this.directoryService.getProblemsRaws(action.payload))
    .map(data => {
      let problemsRaws = data.map((row,i)=>Object.assign({},row,{index:i}));
      return new directory.ProblemsLoadedAction(problemsRaws);
    })
    // nothing reacting to failure at moment but you could if you want (here for example)
    .catch(() => Observable.of(new directory.ProblemsLoadingFailedAction()));

  @Effect() selectProblem$: Observable<Action> = this.actions$
    .ofType(directory.ActionTypes.SELECT_PROBLEM)
    .map(action => {
      let problemRaw = action.payload;
      let root = this.coreService.parseSgf(problemRaw.sgf);
      return new board.InitAction(root);
    })

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private directoryService: DirectoryService,
    private coreService: CoreService
  ) { }
}
