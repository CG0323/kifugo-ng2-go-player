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
    case actions.ActionTypes.NEXT_PROBLEM:{
      var nextProblem = null;
      var nextIndex = state.currentProblem.index + 1;
      if(nextIndex < state.problemRaws.length){
        nextProblem = state.problemRaws[nextIndex];
      }
      return (<any>Object).assign({}, state, {
        currentProblem: nextProblem
      });
    }
    case actions.ActionTypes.PREVIOUS_PROBLEM:{
      var previousProblem = null;
      var previousIndex = state.currentProblem.index - 1;
      if(previousIndex >= 0){
        previousProblem = state.problemRaws[previousIndex];
      }
      return (<any>Object).assign({}, state, {
        currentProblem: previousProblem
      });
    }

    default:
      return state;
  }
}
