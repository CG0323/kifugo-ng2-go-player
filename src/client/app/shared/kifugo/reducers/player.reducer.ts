import { IPlayerState, initialBoardState } from '../states/player.state';
import * as actions from '../actions/player.action';
import {CoreService} from '../services/index'
import { Message} from 'primeng/primeng';
import { Markup, BoardStatus, Move, KNode, Stone, Kifu} from '../models/index';

export function playerReducer(
    state: IPlayerState = initialBoardState,
    action: actions.Actions
): IPlayerState {
  switch (action.type) {
    case actions.ActionTypes.INITIALIZED:{
      let kifu = <Kifu>action.payload;
      kifu = CoreService.parseKifuDetail(kifu);
      let stones:{[strName:string]:Stone} = {};
      let node = kifu.root;
      let sequence = 0;
      while(node){
        if(node.move){
          stones[node.move.x + ","+node.move.y] = {c: node.move.c, sequence: ++sequence};
          let remove = CoreService.computeRemoveStones(stones, node.move.x, node.move.y);
          for(let prop in remove){
            if(remove.hasOwnProperty(prop)){
              delete stones[prop];
            }
          }
        }
        node = node.children[0];
      }
      return (<any>Object).assign({}, state, {
        stones: stones, status:BoardStatus.Final, kifu: kifu, currentNode: kifu.root, sequence:sequence, removeHistory: {}
      });
    }
    case actions.ActionTypes.START:{
      return (<any>Object).assign({}, state, {
        stones: {}, status:BoardStatus.Enabled, currentNode: state.kifu.root, sequence:0, removeHistory: {}
      });
    }

    case actions.ActionTypes.NEXT:{
      let stones = JSON.parse(JSON.stringify(state.stones));
      let sequence = state.sequence + 1;
      let move = state.currentNode.children[0].move;
      stones[move.x + ","+move.y] = {c: move.c, sequence: sequence};
      let currentNode = Object.assign({},state.currentNode.children[0],{parent: state.currentNode});
      let remove = CoreService.computeRemoveStones(stones, move.x, move.y);
      let removeHistory = state.removeHistory;
      if(!CoreService.isEmpty(remove)){
        removeHistory = JSON.parse(JSON.stringify(state.removeHistory));
        removeHistory[sequence] = remove;
      }
      
      for(let prop in remove){
        if(remove.hasOwnProperty(prop)){
          delete stones[prop];
        }
      }
      return (<any>Object).assign({}, state, {
        stones: stones, currentNode: currentNode, sequence:sequence, removeHistory: removeHistory
      });
    }

    case actions.ActionTypes.PREV:{
      let stones = JSON.parse(JSON.stringify(state.stones));
      let sequence = state.sequence;
      let move = state.currentNode.move;
      delete stones[move.x + ","+move.y];
      if(state.removeHistory.hasOwnProperty(sequence)){
        let addback = state.removeHistory[sequence];
        for(let prop in addback){
          if(addback.hasOwnProperty(prop)){
            stones[prop] = addback[prop];
          }
      }
      }
      
      return (<any>Object).assign({}, state, {
        stones: stones, currentNode: state.currentNode.parent, sequence:sequence - 1
      });
    }

    // case actions.ActionTypes.MOVE:{
    //   var move = <Move>action.payload;
    //   var stones:Stone[] = JSON.parse(JSON.stringify(state.stones))
    //   stones.push({position: move.x + ","+move.y, c: move.c});
    //   var nextNode = state.currentNode.children.find(n=>n.move.x === move.x && n.move.y === move.y);
    //   var status:BoardStatus = BoardStatus.Enabled;
    //   var msgs:Message[] = state.msgs.map(msg=>Object.assign({},msg));

    //   if(!nextNode){
    //     status = BoardStatus.Wrong;
    //     msgs[0].severity = "error"
    //     // msgs.push({severity:"error", summary: "答题错误", detail:"落子错误，本题结束"});
    //   }else if(nextNode.comment == "RIGHT"){
    //     status = BoardStatus.Right;
    //     msgs[0].severity = "success"
    //     // msgs.push({severity:"success", summary: "回答正确", detail:"太棒了"});
    //   }else{
    //     if(nextNode.children && nextNode.children.length > 0){
    //       nextNode = nextNode.children[0];
    //       move = nextNode.move;
    //       stones.push({position: move.x + ","+move.y, c: move.c});
    //       if(!nextNode.children || nextNode.children.length==0){
    //         status = BoardStatus.Wrong;
    //         msgs[0].severity = "error"
    //         // msgs.push({severity:"error", summary: "答题错误", detail:"落子错误，本题结束"});
    //       }
    //     }
    //   }
    //   return (<any>Object).assign({}, state, {stones:stones, currentNode: nextNode, status:status, msgs:msgs});
    // }
    // case actions.ActionTypes.RESET:{
    //   return Object.assign({},initialBoardState);
    // }
      
    default:
      return state;
  }
}
