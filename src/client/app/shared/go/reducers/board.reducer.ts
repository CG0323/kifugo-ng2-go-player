import { IBoardState, initialBoardState } from '../states/board.state';
import * as actions from '../actions/board.action';
import {CoreService} from '../services/index'
import { Message} from 'primeng/primeng';
import { Markup} from '../models/index';

export function boardReducer(
    state: IBoardState = initialBoardState,
    action: actions.Actions
): IBoardState {
  switch (action.type) {
    case actions.ActionTypes.INIT:
      var root = action.payload;
      var setup = root.setup;
      var grid = CoreService.createGrid();
      if(setup){
        for(var i = 0; i < setup.length; i++){
          var move = setup[i];
          grid[move.x][move.y] = move.c;
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

      return (<any>Object).assign({}, state, {
        grid: grid, msgs:msgs, textMarkups: textMarkups, trMarkups: trMarkups
      });
    default:
      return state;
  }
}
