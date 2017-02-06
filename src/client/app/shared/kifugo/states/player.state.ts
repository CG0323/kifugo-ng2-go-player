import { Observable } from 'rxjs/Observable';
import { Markup,BoardStatus,KNode, Stone, Kifu } from '../models/index';
import { CoreService} from '../services/index';
import { Message} from 'primeng/primeng';


export interface IPlayerState {
  kifu: Kifu,
  status: BoardStatus,
  currentNode: KNode,
  stones: {[strName:string]:Stone},
  sequence: number,
  removeHistory: {[sequence:number]: {[strName:string]:Stone}}
}

export const initialBoardState: IPlayerState = {
  kifu: <Kifu>null,
  status: BoardStatus.Final,
  currentNode: <KNode>null,
  stones: <{[strName:string]:Stone}>{},
  sequence: 0,
  removeHistory: {}
};

export function getStatus(state$: Observable<IPlayerState>) {
  return state$.select(state => state.status);
}

export function getStones(state$: Observable<IPlayerState>) {
  return state$.select(state => state.stones);
}

export function getBoardKifu(state$: Observable<IPlayerState>) {
  return state$.select(state => {
  if (state.kifu){
    return state.kifu;
  }else{
    return {};
  }
  });
}

export function getSequence(state$: Observable<IPlayerState>) {
  return state$.select(state => state.sequence);
}

export function getIsFirst(state$: Observable<IPlayerState>) {
  return state$.select(state => !(state.currentNode)|| !(state.currentNode.parent));
}

export function getIsLast(state$: Observable<IPlayerState>) {
  return state$.select(state => !(state.currentNode)|| !(state.currentNode.children) || (state.currentNode.children.length == 0) || state.status == BoardStatus.Final);
}

export function getIsNotInKifu(state$: Observable<IPlayerState>) {
  return state$.select(state => !(state.kifu));
}

export function getComment(state$: Observable<IPlayerState>) {
  return state$.select(state =>{
    if(state.currentNode && state.currentNode.parent){
      return state.currentNode.comment;
    }else{
      return "";
    }
  });
}





