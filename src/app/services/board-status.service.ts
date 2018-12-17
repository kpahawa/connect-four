import { Move } from '../models/move';

export class BoardStatusService {

    private checkVertical(board: number[][]) {
        for (let col = 0; col < board.length; col++) {
          let p1Chain = 0;
          let p2Chain = 0;
          for (let row = 1; row < board[col].length; row ++) {
            const prev = board[col][row - 1];
            const current = board[col][row];
            
            if (prev === current) {
              if (prev === 1) {          
                p1Chain++;
                
              } else if (prev === 2) {
                p2Chain++;
              }
            } else { // reset the current chain lengths
              p1Chain = 0;
              p2Chain = 0;
            }
      
            // check for a chain length of 3 (cuz we're checking the previous by default)
            if (p1Chain === 3) {
              return {result: true, winner: "p1"};
            } else if (p2Chain === 3) {
              return {result: true, winner: "p2"};
            }
          }
        }
        // no one has won
        return {result: false, winner: null};
    }
      
    private checkHorizontal(board: number[][]) {
        for (let row = 0; row < board.length; row++) {
            let p1Chain = 0;
            let p2Chain = 0;
            for (let col = 1; col < board.length; col++) {
            const prev = board[col - 1][row];
            const current = board[col][row]
        
            if (prev === current) {
                if (prev === 1) {          
                p1Chain++;
                
                } else if (prev === 2) {
                p2Chain++;
                }
            } else { // reset the current chain lengths
                p1Chain = 0;
                p2Chain = 0;
            }
        
            // check for a chain length of 3 (cuz we're checking the previous by default)
            if (p1Chain === 3) {
                return {result: true, winner: "p1"};
            } else if (p2Chain === 3) {
                return {result: true, winner: "p2"};
            }
        }
        }
        // no one has won
        return {result: false, winner: null};
    }
    
    private checkUpwardDiagonal(board: number[][]) {
        const diagonals: Move[][] = [];
        let startingPoint = new Move(board.length-1, 0);
        let numPointsCovered = 0;
        const totalPoints = board.length * board[0].length;
        
        // sets up a nice little list of diagonals to loop through easily
        while (numPointsCovered < totalPoints) {
            const tempDiagnoal = [];
            tempDiagnoal.push(startingPoint);    
            numPointsCovered++;
            let nextPoint = new Move(startingPoint.row + 1, startingPoint.column + 1);
            while (nextPoint.column < board.length && nextPoint.row < board[0].length) {
                tempDiagnoal.push(nextPoint);
                nextPoint = new Move(nextPoint.row + 1, nextPoint.column + 1);
                numPointsCovered++;      
            }
            if (tempDiagnoal.length >= 4) diagonals.push(tempDiagnoal);
            
            if (startingPoint.row === 0) {
            const newColumn = startingPoint.column + 1;
            if (newColumn < board.length) {
                startingPoint = new Move(0, newColumn);
                }
            } else {
            startingPoint = new Move(startingPoint.row - 1, 0);
            }    
        }  
    
        for (const diagonal of diagonals) {
            let p1Chain = 0;
            let p2Chain = 0;
            for (let moveIdx = 1; moveIdx < diagonal.length; moveIdx++) {
                const prevMove = diagonal[moveIdx - 1];
                const currentMove = diagonal[moveIdx];
            
                const prev = board[prevMove.row][prevMove.column];
                const current = board[currentMove.row][currentMove.column];
            
                if (prev === current) {
                    if (prev === 1) {          
                    p1Chain++;
                    
                    } else if (prev === 2) {
                    p2Chain++;
                    }
                } else { // reset the current chain lengths
                    p1Chain = 0;
                    p2Chain = 0;
                }
            
                // check for a chain length of 3 (cuz we're checking the previous by default)
                if (p1Chain === 3) {
                    return {result: true, winner: "p1"};
                } else if (p2Chain === 3) {
                    return {result: true, winner: "p2"};
                }
            }
        }
        return {result: false, winner: null};  
    }
      
    private checkDownwardDiagonal(board: number[][]) {
        const diagonals: Move[][] = [];
        let startingPoint = new Move(0, 0);
        let numPointsCovered = 0;
        const totalPoints = board.length * board[0].length;
        
        // sets up a nice little list of diagonals to loop through easily
        while (numPointsCovered < totalPoints) {
            const tempDiagnoal = [];
            tempDiagnoal.push(startingPoint);    
            numPointsCovered++;
            let nextPoint = new Move(startingPoint.row - 1, startingPoint.column + 1);
            while (nextPoint.column < board.length && nextPoint.row >= 0) {
                tempDiagnoal.push(nextPoint);
                nextPoint = new Move(nextPoint.row - 1, nextPoint.column + 1);
                numPointsCovered++;      
            }
                
            if (tempDiagnoal.length >= 4) diagonals.push(tempDiagnoal);  // let's not waste time with diagonals less than 4
        
            if (startingPoint.row === board[0].length - 1) {  // board[0] in case the board is not a square
                const newColumn = startingPoint.column + 1;
                if (newColumn < board.length) {
                    startingPoint = new Move(board[0].length - 1, newColumn);
                }
            } else {
                startingPoint = new Move(startingPoint.row + 1, 0);
            }
        }  

        for (const diagonal of diagonals) {
            let p1Chain = 0;
            let p2Chain = 0;
            for (let moveIdx = 1; moveIdx < diagonal.length; moveIdx++) {
                const prevMove = diagonal[moveIdx - 1];
                const currentMove = diagonal[moveIdx];
            
                const prev = board[prevMove.row][prevMove.column];
                const current = board[currentMove.row][currentMove.column];
            
                if (prev === current) {
                    if (prev === 1) {          
                    p1Chain++;
                    
                    } else if (prev === 2) {
                    p2Chain++;
                    }
                } else { // reset the current chain lengths
                    p1Chain = 0;
                    p2Chain = 0;
                }
            
                // check for a chain length of 3 (cuz we're checking the previous by default)
                if (p1Chain === 3) {
                    return {result: true, winner: "p1"};
                } else if (p2Chain === 3) {
                    return {result: true, winner: "p2"};
                }
            }
        }
        return {result: false, winner: null};  
    }
    
    public checkBoard(board: number[][]): {result: boolean, winner: string} {
    const checkVert = this.checkVertical(board);
    const checkHoriz = this.checkHorizontal(board);
    const checkUpDiag = this.checkUpwardDiagonal(board);
    const checkDownDiag = this.checkDownwardDiagonal(board);
    
    if (checkVert.result) {
        return checkVert;
    } else if (checkHoriz.result) {
        return checkHoriz;
    } else if (checkUpDiag.result) {
        return checkUpDiag;
    } else if (checkDownDiag.result) {
        return checkDownDiag;
    }
    return {result: false, winner: null};
    }

    public placeLegalMove(currentBoard: number[][], column: number, isPlayer1: boolean) {
        const numToPlace = isPlayer1? 1 : 2;
        // go to each row and grab the matching column. see if it has been set to something, if not, set it and break out
        const currentColumn = currentBoard[column];
        for(let rowIdx = 0; rowIdx < currentColumn.length; rowIdx++) {
          const cell = currentColumn[rowIdx];    
          if (cell === 0) {
            currentBoard[column][rowIdx] = numToPlace;
            break;
          }
        }
        return currentBoard;
    }
      
}