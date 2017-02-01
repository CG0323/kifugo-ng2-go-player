import { Observable } from 'rxjs/Observable';
import { Markup,BoardStatus,KNode, Stone, Kifu } from '../models/index';
import { CoreService} from '../services/index';
import { Message} from 'primeng/primeng';


export interface IBoardState {
  kifu: Kifu,
  status: BoardStatus,
  currentNode: KNode,
  stones: Stone[],
  sequence: number
}

export const initialBoardState: IBoardState = {
  kifu: <Kifu>null,
  status: BoardStatus.Final,
  currentNode: <KNode>null,
  stones: <Stone[]>[],
  sequence: 0
};

export function getStatus(state$: Observable<IBoardState>) {
  return state$.select(state => state.status);
}

export function getStones(state$: Observable<IBoardState>) {
  return state$.select(state => state.stones);
}

export function getBoardKifu(state$: Observable<IBoardState>) {
  return state$.select(state => state.kifu);
}





