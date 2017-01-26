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

export function getCurrentProblem(state$: Observable<IDirectoryState>) {
  return state$.select(state => state.currentProblem);
}
