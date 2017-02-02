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
import * as fromMultilingual from '../../i18n/index';
import { IMultilingualState } from '../../i18n/index';
import * as fromSample from '../../sample/index';
import { ISampleState } from '../../sample/index';
import * as fromKifuGo from '../../kifugo/index';
import { IKifuState, IBoardState } from '../../kifugo/index';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface IAppState {
  // i18n: fromMultilingual.IMultilingualState;
  sample: fromSample.ISampleState;
  kifu: fromKifuGo.IKifuState;
  board: fromKifuGo.IBoardState;
};

/**
 * Because metareducers take a reducer function and return a new reducer,
 * we can use our compose helper to chain them together. Here we are
 * using combineReducers to make our top level reducer, and then
 * wrapping that in storeLogger. Remember that compose applies
 * the result from right to left.
 */
const reducers = {
  // i18n: fromMultilingual.reducer,
  sample: fromSample.reducer,
  kifu: fromKifuGo.kifuReducer,
  board: fromKifuGo.boardReducer
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

// export function getMultilingualState(state$: Observable<IAppState>): Observable<IMultilingualState> {
//   return state$.select(s => s.i18n);
// }
export function getNameListState(state$: Observable<IAppState>): Observable<ISampleState> {
  return state$.select(s => s.sample);
}
export function getKifuState(state$: Observable<IAppState>): Observable<IKifuState> {
  return state$.select(s => s.kifu);
}
export function getBoardState(state$: Observable<IAppState>): Observable<IBoardState> {
  return state$.select(s => s.board);
}

// export const getLang: any = compose(fromMultilingual.getLang, getMultilingualState);
export const getNames: any = compose(fromSample.getNames, getNameListState);
export const getStatus: any = compose(fromKifuGo.getStatus, getBoardState);
export const getBoardKifu: any = compose(fromKifuGo.getBoardKifu, getBoardState);
export const getStones: any = compose(fromKifuGo.getStones, getBoardState);
export const getKifus: any = compose(fromKifuGo.getkifus, getKifuState);
export const getTotalKifuCount: any = compose(fromKifuGo.getTotalCount, getKifuState);
export const getIsNotInKifu: any = compose(fromKifuGo.getIsNotInKifu, getBoardState);
export const getIsFirst: any = compose(fromKifuGo.getIsFirst, getBoardState);
export const getIsLast: any = compose(fromKifuGo.getIsLast, getBoardState);
export const getComment: any = compose(fromKifuGo.getComment, getBoardState);
export const getSequence: any = compose(fromKifuGo.getSequence, getBoardState);

