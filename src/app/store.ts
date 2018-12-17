import { Action } from 'redux';
import { IAppState } from './models/app-state.interface';
import { Move } from './models/move';
import { BoardStatusService } from './services/board-status.service';

const boardStatusService = new BoardStatusService();

export const INITIAL_STATE: IAppState = {
  board: [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
  ], // this board has the 0th indicies as the bottom row of the board,
  player1Turn: true,
  currentWinner: null,
  gameOver: false
};

export function rootReducer(lastState: IAppState, action: Action): IAppState {
  const move = action.type as Move;
  if (typeof(move) === "string") {  // deals with the @@ReduxINIT state and reset state
    if (move === "RESET_GAME") {      
      lastState = {
        board: [
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0],
          [0,0,0,0,0]
        ], // this board has the 0th indicies as the bottom row of the board,
        player1Turn: true,
        currentWinner: null,
        gameOver: false
      };
    }
    return lastState;
  }

  const col = move.column;
  lastState.board = boardStatusService.placeLegalMove(lastState.board, col, lastState.player1Turn);
  lastState.player1Turn = !lastState.player1Turn;
  
  const boardStatus = boardStatusService.checkBoard(lastState.board);
  if (boardStatus.result) {
    lastState.gameOver = true;
    lastState.currentWinner = boardStatus.winner;
  }
  return lastState;
}
