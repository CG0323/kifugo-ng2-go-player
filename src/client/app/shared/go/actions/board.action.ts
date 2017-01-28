import { Action } from '@ngrx/store';
import { type } from '../../core/utils/type';
import { BOARD } from '../common/category.common';
import { KNode,Move } from '../models/index'

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
  MOVE: string;
  RESET:string;
}

export const ActionTypes: IBoardActions = {
  INIT: type(`${BOARD} Init`),
  MOVE: type(`${BOARD} Move`),
  RESET: type(`${BOARD} Reset`)
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
  constructor(public payload: KNode) { }
}

export class MoveAction implements Action {
  type = ActionTypes.MOVE;
  constructor(public payload: Move) { }
}

export class ResetAction implements Action {
  type = ActionTypes.RESET;
  payload:string=null;
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = InitAction
  |MoveAction
  |ResetAction
