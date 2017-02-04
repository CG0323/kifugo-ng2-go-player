import { Observable } from 'rxjs/Observable';
import { Kifu } from '../models/index';

export interface IKifuState {
  kifus: Kifu[];
  first: number;
  rows: number;
  player: string;
  totalCount: number;
}

export const initialKifuState: IKifuState = {
  kifus: <Kifu[]>[],
  first: 0,
  rows: 20,
  player: <string>null, 
  totalCount: 0
};

export function getkifus(state$: Observable<IKifuState>) {
  return state$.select(state => state.kifus);
}

export function getTotalCount(state$: Observable<IKifuState>) {
  return state$.select(state => state.totalCount);
}




