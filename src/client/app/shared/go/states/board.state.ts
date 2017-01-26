import { Observable } from 'rxjs/Observable';
import { Markup,BoardStatus,KNode, Stone } from '../models/index';
import { CoreService} from '../services/index';
import { Message} from 'primeng/primeng';


export interface IBoardState {
  textMarkups:Markup[],
  trMarkups: Markup[],
  msgs: Message[],
  status: BoardStatus,
  currentNode: KNode,
  stones: Stone[]
}

export const initialBoardState: IBoardState = {
  textMarkups:<Markup[]>[],
  trMarkups: <Markup[]>[],
  msgs: <Message[]>[],
  status: BoardStatus.Disabled,
  currentNode: <KNode>null,
  stones: <Stone[]>[]
};


export function getTextMarkups(state$: Observable<IBoardState>) {
  return state$.select(state => state.textMarkups);
}

export function getTrMarkups(state$: Observable<IBoardState>) {
  return state$.select(state => state.trMarkups);
}

export function getMsgs(state$: Observable<IBoardState>) {
  return state$.select(state => state.msgs);
}

export function getStatus(state$: Observable<IBoardState>) {
  return state$.select(state => state.status);
}

export function getStones(state$: Observable<IBoardState>) {
  return state$.select(state => state.stones);
}



