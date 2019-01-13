# ConnectFour

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3.


## Project architecture

This is a basic connect four game where the app component loads the entire game by calling the app store which the initial values for the game. 

The architecture for the app is very simple, each cell you see is created on each update (I will get to why this had to happen below) and is created by the parent component - app.component. The child component is called `cell-component`.

The child component contains no intelligent logic - just what color it should be. On click of a cell, the child component propogates the click event to the Parent `app component` through `Event Emitters` and the parent component then dispatches the event to the `rootReducer` using `ngRedux.dispatch`. 

The `rootReducer` in `store.ts` handles the logic of determining player turns (hence the current player color) and the winner. Meanwhile, the `app.component` handles the display of the game board and action dispatching. 

## Project considerations and challenges

This project was developed using the [@angualr-redux](https://github.com/angular-redux/platform) which extends redux's capabilities to Angular. You can find the initialization of the store in `app/app.module.ts` and the usage of the reducer in `app/store.ts`.

Some issues I ran into in doing this - I initially subscribed each cell child component to observe the board and update itself accordingly however, I was running into issues where, even after subscribing to the store's state through: 

```typescript
// in cell-component.ts <-- the child
this.boardObs$.subscribe(board => {
    // update cell
    updateCellWithBoard(board);
});
```

The observe never fired for some reason. I did not have time to figure out why. Instead, I had to implement an observer anti-pattern to get over this hitch of in `app.component.ts`:

```typescript
// in app.component.ts
this.ngRedux.dispatch(this.actions.placeToken(row, column));

this.boardObs$.subscribe(board => {
      this.currentBoard = null; // sets the board to null so the board empties out
      this.cdr.detectChanges()
      this.currentBoard = board; // board re-draws
      
    }).unsubscribe(); // <-- yes this is super annoying but every time I dispatch an event, I forcebaly watch for changes
```

### Challengs:

The biggest challenge I faced was thinking in the context of the redux store. As an angular engineer, angular never really needed redux/flux like state control simply because angular has so many event bindings. The common pattern in angular for state changes is to create a service which holds a `BehaviorSubject` and each component simply subscribs to this subject to watch for any necessary changes relevant to it (so it sort of acts like a store?). I can see how it can be useful in React (which how much little react I know) considering how lightweight react is.

## Connect four in action
![image of connect four](https://i.imgur.com/kmiKOM6.png)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests (Pending)

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests (Pending)

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Angular CLI help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
