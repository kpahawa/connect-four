import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { Move } from '../models/move';
import { INITIAL_STATE } from '../store';

@Injectable()
export class BoardActions {

  public placeToken(row: number, column: number): Action {
    const move = new Move(row, column);    
    return { type: move};
  }

  public resetGame() {
    return {type: {command: "RESET_GAME"}};
  }

  public newGame(row: number, column: number) {
    const board = [];
    for(let c = 0; c < column; c++) {
      const aRow = [];
      for(let r=0; r < row; r++) {
        aRow.push(0);
      }
      board.push(aRow);
    }

    return {type: {command: "NEW_GAME", board: board}};
  }
}
