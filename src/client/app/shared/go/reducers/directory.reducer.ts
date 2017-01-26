import { IDirectoryState, initialDirectoryState } from '../states/index';
import * as actions from '../actions/directory.action';

export function directoryReducer(
    state: IDirectoryState = initialDirectoryState,
    action: actions.Actions
): IDirectoryState {
  switch (action.type) {
    case actions.ActionTypes.INITIALIZED:
      return (<any>Object).assign({}, state, {
        menuItems: action.payload
      });
    case actions.ActionTypes.SELECT_DIRECTORY:
      return (<any>Object).assign({}, state, {
        currentDirectory: action.payload
      });
    case actions.ActionTypes.PROBLEMS_LOADED:
      return (<any>Object).assign({}, state, {
        problemRaws: action.payload
      });
    case actions.ActionTypes.SELECT_PROBLEM:
      return (<any>Object).assign({}, state, {
        currentProblem: action.payload
      });
    default:
      return state;
  }
}
