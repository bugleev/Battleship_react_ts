import * as React from "react";
import { IShip, LShip } from "../game-utils";
import { getRandomInt, grid } from "../helpers";
import Cell from "./Cell";

interface IAppState {
  firedCells: number[];
  hitCount: number;
  ships: number[];
}
const shipMap = grid();

class App extends React.Component<{}, IAppState> {
  public state = {
    firedCells: [],
    hitCount: 0,
    ships: []
  };
  public componentDidMount() {
    this.setState({
      ships: this.placeShips()
    });
  }
  public placeShips = () => {
    const cells: number[] = [];
    return ([] as number[]).concat(
      LShip(cells),
      IShip(4, cells),
      IShip(1, cells),
      IShip(1, cells)
    );
  };
  public handleClick = () => {
    const { firedCells, ships } = this.state;
    let { hitCount } = this.state;
    let validCell = false;
    let shot = 0;
    while (!validCell) {
      shot = getRandomInt(0, 101);
      if ((firedCells as number[]).indexOf(shot) === -1) {
        validCell = true;
      }
    }
    const newCells = (firedCells as number[]).concat([shot]);
    if ((ships as number[]).indexOf(shot) !== -1) {
      hitCount = hitCount ? hitCount + 1 : 1;
    }
    this.setState({ firedCells: newCells, hitCount }, () => {
      this.checkWinCondition();
    });
  };
  public reset = () => {
    this.setState({
      firedCells: [],
      hitCount: 0,
      ships: this.placeShips()
    });
  };
  public checkWinCondition = () => {
    if (this.state.hitCount === this.state.ships.length) {
      alert("Game OVER!");
    }
  };

  public render() {
    const { firedCells, ships } = this.state;
    return (
      <div className="container">
        <div className="grid-wrapper">
          {shipMap.map(el => (
            <Cell
              key={`${el}`}
              shipArea={(ships as number[]).indexOf(el) !== -1}
              fired={(firedCells as number[]).indexOf(el) !== -1}
            />
          ))}
        </div>
        <div className="controls">
          <button onClick={this.reset}>Reset</button>
          <button onClick={this.handleClick}>Fire random shot</button>
        </div>
      </div>
    );
  }
}
export default App;
