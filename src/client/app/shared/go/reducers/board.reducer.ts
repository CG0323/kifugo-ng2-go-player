import { IBoardState, initialBoardState } from '../states/board.state';
import * as actions from '../actions/board.action';
import {CoreService} from '../services/index'
import { Message} from 'primeng/primeng';
import { Markup, BoardStatus, Move, KNode, Stone} from '../models/index';

export function boardReducer(
    state: IBoardState = initialBoardState,
    action: actions.Actions
): IBoardState {
  switch (action.type) {
    case actions.ActionTypes.INIT:{
      var root = <KNode>action.payload;
      var setup = root.setup;
      var stones:Stone[] = [];
      if(setup){
        for(var i = 0; i < setup.length; i++){
          var move = setup[i];
          stones.push({position: move.x + ","+move.y, c: move.c});
        }
      }
      var msgs:Message[] = [];
      if(root.comment){
        msgs.push({severity:'info', summary:'题目', detail: root.comment});
      }
      var textMarkups:Markup[] = [];
      var trMarkups:Markup[] = [];
      if(root.markup){
        textMarkups = root.markup.filter(m=>m.type == "LB");
        trMarkups =  root.markup.filter(m=>m.type == "TR");
      }
      var status = BoardStatus.Enabled;
      return (<any>Object).assign({}, state, {
        stones: stones, msgs:msgs, textMarkups: textMarkups, trMarkups: trMarkups, status:status, currentNode:root
      });
    }
    case actions.ActionTypes.MOVE:{
      var move = <Move>action.payload;
      var stones:Stone[] = JSON.parse(JSON.stringify(state.stones))
      stones.push({position: move.x + ","+move.y, c: move.c});
      return (<any>Object).assign({}, state, {stones:stones});
    }
      
    default:
      return state;
  }
}
