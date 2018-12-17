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
    return {type: "RESET_GAME"}
  }
}
