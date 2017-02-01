import { IKifuState, initialKifuState } from '../states/index';
import * as actions from '../actions/kifu.action';
import {SearchParam} from '../models/index'

export function kifuReducer(
    state: IKifuState = initialKifuState,
    action: actions.Actions
): IKifuState {
  switch (action.type) {
    case actions.ActionTypes.LOADED:{
      return (<any>Object).assign({}, state, action.payload);
    }
    default:
      return state;
  }
}
