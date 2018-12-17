import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './models/app-state.interface';
import { BoardActions } from './actions/app.actions';
import { Observable, Subscription } from 'rxjs';
import { INITIAL_STATE } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @select('board') private boardObs$: Observable<number[][]>;
  @select('gameOver') private gameStatusObs$: Observable<boolean>;
  @select('currentWinner') private currentWinnerObs$: Observable<string>;

  private currentBoard: number[][];
  private gameOver = false;
  private currentWinner: string = null;

  constructor(private ngRedux: NgRedux<IAppState>, private actions: BoardActions, private cdr: ChangeDetectorRef) {
    this.boardObs$.subscribe(board => {
        this.currentBoard = board;
      }).unsubscribe();
  }

  private dispatchPlayerMove($event: {row: number, column: number}) {
    const row = $event.row;
    const column = $event.column;
    this.ngRedux.dispatch(this.actions.placeToken(row, column));
    this.detectChanges();
  }

  private detectChanges() {
    this.boardObs$.subscribe(board => {
      this.currentBoard = null;
      this.cdr.detectChanges()
      this.currentBoard = board;
      
    }).unsubscribe();

    this.gameStatusObs$.subscribe(gameOver => this.gameOver = gameOver).unsubscribe();
    this.currentWinnerObs$.subscribe(currentWinner => this.currentWinner = currentWinner).unsubscribe();
  }

  private resetGame() {
    this.ngRedux.dispatch(this.actions.resetGame());
    this.detectChanges();
  }
}
