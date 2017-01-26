import { Observable } from 'rxjs/Observable';
import { Markup } from '../models/index';
import { CoreService} from '../services/index';
import { Message} from 'primeng/primeng';


export interface IBoardState {
  grid: number[][];
  textMarkups:Markup[],
  trMarkups: Markup[],
  msgs: Message[],

}

export const initialBoardState: IBoardState = {
  grid: CoreService.createGrid(),
  textMarkups:<Markup[]>[],
  trMarkups: <Markup[]>[],
  msgs: <Message[]>[],
};

export function getGrid(state$: Observable<IBoardState>) {
  return state$.select(state => state.grid);
}

export function getTextMarkups(state$: Observable<IBoardState>) {
  return state$.select(state => state.textMarkups);
}

export function getTrMarkups(state$: Observable<IBoardState>) {
  return state$.select(state => state.trMarkups);
}

export function getMsgs(state$: Observable<IBoardState>) {
  return state$.select(state => state.msgs);
}



