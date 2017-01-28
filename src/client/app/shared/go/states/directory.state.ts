import { Observable } from 'rxjs/Observable';
import { ProblemRaw } from '../models/index';

export interface IDirectoryState {
  menuItems: any[];
  currentDirectory: string;
  problemRaws: ProblemRaw[];
  currentProblem: ProblemRaw;
}

export const initialDirectoryState: IDirectoryState = {
  menuItems: <any[]>[],
  currentDirectory: null,
  problemRaws: <ProblemRaw[]>[],
  currentProblem: <ProblemRaw>null
};

export function getMenuItems(state$: Observable<IDirectoryState>) {
  return state$.select(state => state.menuItems);
}

export function getCurrentDirectory(state$: Observable<IDirectoryState>) {
  return state$.select(state => state.currentDirectory);
}

export function getProblemRaws(state$: Observable<IDirectoryState>) {
  return state$.select(state => state.problemRaws);
}

export function getCurrentProblemRaw(state$: Observable<IDirectoryState>) {
  return state$.select(state => state.currentProblem);
}

export function getIsFirstProblem(state$: Observable<IDirectoryState>) {
  return state$.select(state => (!(state.currentProblem) || state.currentProblem.index == 0));
}

export function getIsLastProblem(state$: Observable<IDirectoryState>) {
  return state$.select(state => (!(state.currentProblem) || (state.currentProblem.index == state.problemRaws.length - 1)));
}

export function getIsNotInProblem(state$: Observable<IDirectoryState>) {
  return state$.select(state => !(state.currentProblem));
}
