import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { BOARD } from '../common/category.common';
import { KNode,Move,Kifu } from '../models/index'

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export interface IBoardActions {
  INIT: string;
  INITIALIZED: string;
  START: string;
  NEXT: string;
  PREV: string;
  // RESET:string;
}

export const ActionTypes: IBoardActions = {
  INIT: type(`${BOARD} Init`),
  INITIALIZED: type(`${BOARD} Initialized`),
  START: type(`${BOARD} Start`),
  NEXT: type(`${BOARD} Next`),
  PREV: type(`${BOARD} Prev`),
  // RESET: type(`${BOARD} Reset`)
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
  constructor(public payload: string) { }
}

export class InitializedAction implements Action {
  type = ActionTypes.INITIALIZED;
  constructor(public payload: Kifu) { }
}

export class StartAction implements Action {
  type = ActionTypes.START;
   payload:string=null;
}

export class NextAction implements Action {
  type = ActionTypes.NEXT;
  payload:string=null;
}

export class PrevAction implements Action {
  type = ActionTypes.PREV;
  payload:string=null;
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  |InitializedAction
  |StartAction
  |NextAction
  |PrevAction
