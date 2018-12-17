import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { PlayerEnum, getPlayer} from 'src/app/models/player.enum';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/app/models/app-state.interface';

@Component({
  selector: 'app-cell-component',
  templateUrl: './cell-component.component.html',
  styleUrls: ['./cell-component.component.css'],
})
export class CellComponentComponent implements OnInit {
  private whichPlayer: PlayerEnum = PlayerEnum.NO_PLAYER; // initial value for each cell

  @Input() private row: number;
  @Input() private column: number;
  @Input() private currentBoard: number[][];

  @Output() playerMove = new EventEmitter<{row: number, column: number}>();

  constructor(private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {     
    if (this.currentBoard && this.row !== undefined && this.column !== undefined) {
      const cellStatus = this.currentBoard[this.column][this.row];
      this.whichPlayer = cellStatus;
    }
  }

  private setMove() {    
    this.playerMove.emit({row: this.row, column: this.column});
  }
}
