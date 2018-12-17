export class Move {
    private _row: number;
    private _column: number;

    constructor(row: number, column: number) {
        this._row = row;
        this._column = column;
    }

    get row() {
        return this._row;
    }

    set row(newRow: number) {  // probably will not be used
        this._row = newRow;
    }

    get column() {
        return this._column;
    }

    set column(newCol: number) {
        this._column = newCol;
    }
}
