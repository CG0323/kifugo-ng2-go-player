import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { DIRECTORY } from '../common/category.common';
import { MenuItem } from 'primeng/primeng';
import { ProblemRaw} from '../models/index';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export interface IDirectoryActions {
  INIT: string;
  INITIALIZED: string;
  INIT_FAILED: string;
  SELECT_DIRECTORY: string;
  PROBLEMS_LOADED: string;
  PROBLEMS_LOADING_FAILED: string;
  SELECT_PROBLEM: string;
  NEXT_PROBLEM: string;
  EMPTY: string;
}

export const ActionTypes: IDirectoryActions = {
  INIT:        type(`${DIRECTORY} Init`),
  INITIALIZED: type(`${DIRECTORY} Initialized`),
  INIT_FAILED: type(`${DIRECTORY} Init Failed`),
  SELECT_DIRECTORY: type(`${DIRECTORY} Select Directory`),
  PROBLEMS_LOADED: type(`${DIRECTORY} Problems Loaded`),
  PROBLEMS_LOADING_FAILED: type(`${DIRECTORY} Problems Loading Failed`),
  SELECT_PROBLEM: type(`${DIRECTORY} Select Problem`),
  NEXT_PROBLEM: type(`${DIRECTORY} Next Problem`),
  EMPTY: type(`${DIRECTORY} Empty`),
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

export class InitializedAction implements Action {
  type = ActionTypes.INITIALIZED;

  constructor(public payload: MenuItem[]) { }
}

export class InitFailedAction implements Action {
  type = ActionTypes.INIT_FAILED;
  payload: string = null;
}

export class SelectDirectoryAction implements Action {
  type = ActionTypes.SELECT_DIRECTORY;
  constructor(public payload: string) { }
}

export class ProblemsLoadedAction implements Action {
  type = ActionTypes.PROBLEMS_LOADED;
  constructor(public payload: ProblemRaw[]) { }
}

export class ProblemsLoadingFailedAction implements Action {
  type = ActionTypes.PROBLEMS_LOADING_FAILED;
  payload: string = null;
}

export class SelectProblemAction implements Action {
  type = ActionTypes.SELECT_PROBLEM;
  constructor(public payload: ProblemRaw) { }
}

export class NextProblemAction implements Action {
  type = ActionTypes.NEXT_PROBLEM;
  payload: string = null;
}

export class EmptyAction implements Action {
  type = ActionTypes.EMPTY;
  payload: string = null;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  | InitializedAction
  | InitFailedAction
  | SelectDirectoryAction
  | ProblemsLoadedAction
  | ProblemsLoadingFailedAction
  | SelectProblemAction
  | NextProblemAction
  | EmptyAction