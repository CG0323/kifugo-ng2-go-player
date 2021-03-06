// libs
import { Observable } from 'rxjs/Observable';
// import { combineLatest } from 'rxjs/observable/combineLatest';
import { ActionReducer } from '@ngrx/store';
import '@ngrx/core/add/operator/select';

/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */
import { compose } from '@ngrx/core/compose';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

/**
 * combineReducers is another useful metareducer that takes a map of reducer
 * functions and creates a new reducer that stores the gathers the values
 * of each reducer and stores them using the reducer's key. Think of it
 * almost like a database, where every reducer is a table in the db.
 *
 * More: https://egghead.io/lessons/javascript-redux-implementing-combinereducers-from-scratch
 */
import { combineReducers } from '@ngrx/store';

/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromKifuGo from '../../kifugo/index';
import { IKifuState, IPlayerState } from '../../kifugo/index';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface IAppState {
  kifu: fromKifuGo.IKifuState;
  player: fromKifuGo.IPlayerState;
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  kifu: fromKifuGo.kifuReducer,
  player: fromKifuGo.playerReducer
};

const developmentReducer: ActionReducer<IAppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<IAppState> = combineReducers(reducers);

export function AppReducer(state: any, action: any) {
  if (String('<%= BUILD_TYPE %>') === 'dev') {
    return developmentReducer(state, action);
  } else {
    return productionReducer(state, action);
  }
}

export function getKifuState(state$: Observable<IAppState>): Observable<IKifuState> {
  return state$.select(s => s.kifu);
}
export function getPlayerState(state$: Observable<IAppState>): Observable<IPlayerState> {
  return state$.select(s => s.player);
}

export const getStatus: any = compose(fromKifuGo.getStatus, getPlayerState);
export const getBoardKifu: any = compose(fromKifuGo.getBoardKifu, getPlayerState);
export const getStones: any = compose(fromKifuGo.getStones, getPlayerState);
export const getKifus: any = compose(fromKifuGo.getkifus, getKifuState);
export const getFirst: any = compose(fromKifuGo.getFirst, getKifuState);
export const getPlayer: any = compose(fromKifuGo.getPlayer, getKifuState);
export const getTotalKifuCount: any = compose(fromKifuGo.getTotalCount, getKifuState);
export const getIsNotInKifu: any = compose(fromKifuGo.getIsNotInKifu, getPlayerState);
export const getIsFirst: any = compose(fromKifuGo.getIsFirst, getPlayerState);
export const getIsLast: any = compose(fromKifuGo.getIsLast, getPlayerState);
export const getComment: any = compose(fromKifuGo.getComment, getPlayerState);
export const getSequence: any = compose(fromKifuGo.getSequence, getPlayerState);

