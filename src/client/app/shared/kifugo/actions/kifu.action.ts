import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { KIFU } from '../common/category.common';
import { Kifu, SearchParam} from '../models/index';
import { IKifuState } from '../states/index';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export interface IKifuActions {
  INIT: string;
  LOADED: string;
  SEARCH_FAILED: string;
  SEARCH: string;
  EMPTY: string;
  DELETE: string;
}

export const ActionTypes: IKifuActions = {
  INIT:        type(`${KIFU} Init`),
  LOADED: type(`${KIFU} Loaded`),
  SEARCH_FAILED: type(`${KIFU} Search Failed`),
  SEARCH:      type(`${KIFU} Search`),
  EMPTY: type(`${KIFU} Empty`),
  DELETE: type(`${KIFU} Delete`),
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class InitAction implements Action {
  type = ActionTypes.INIT;
  payload: string = null;
}

export class LoadedAction implements Action {
  type = ActionTypes.LOADED;

  constructor(public payload: IKifuState) { }
}

export class SearchFailedAction implements Action {
  type = ActionTypes.SEARCH_FAILED;
  payload: string = null;
}

export class SearchAction implements Action {
  type = ActionTypes.SEARCH;
  constructor(public payload: SearchParam) { }
}

export class EmptyAction implements Action {
  type = ActionTypes.EMPTY;
  payload: string = null;
}

export class DeleteAction implements Action {
  type = ActionTypes.DELETE;
  constructor(public payload: string) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  | LoadedAction
  | SearchFailedAction
  | SearchAction
  | EmptyAction
  | DeleteAction