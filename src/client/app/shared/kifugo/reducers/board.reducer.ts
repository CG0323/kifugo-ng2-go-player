import { IBoardState, initialBoardState } from '../states/board.state';
import * as actions from '../actions/board.action';
import {CoreService} from '../services/index'
import { Message} from 'primeng/primeng';
import { Markup, BoardStatus, Move, KNode, Stone, Kifu} from '../models/index';

export function boardReducer(
    state: IBoardState = initialBoardState,
    action: actions.Actions
): IBoardState {
  switch (action.type) {
    case actions.ActionTypes.INIT:{
      var kifu = <Kifu>action.payload;
      kifu = CoreService.parseKifuDetail(kifu);
      var stones:Stone[] = [];
      var node = kifu.root;
      var sequence = 1;
      while(node){
        if(node.move){
          stones.push({position: node.move.x + ","+node.move.y, c: node.move.c, sequence: sequence++});
        }
        node = node.children[0];
      }
      var currentNode = kifu.root;
      var status = BoardStatus.Final;
      return (<any>Object).assign({}, state, {
        stones: stones, status:status, kifu: kifu, currentNode: currentNode
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
