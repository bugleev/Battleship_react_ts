import * as React from "react";
import placeShip from "./helpers";

const grid: number[] = [];
for (let i = 1; i <= 100; i++) {
  grid.push(i);
}
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
interface ICellProps {
  id: string;
  fired: boolean;
  shipArea: boolean;
}

interface IAppState {
  firedCells: number[];
  hitCount: number;
  ships: number[];
}
const Cell: React.SFC<ICellProps> = props => {
  const classAdd =
    props.shipArea && props.fired ? "hit" : props.shipArea ? "ship" : "";

  return (
    <div id={props.id} className={`cell ${classAdd}`}>
      {props.fired ? "X" : null}
    </div>
  );
};

class App extends React.Component<{}, IAppState> {
  public state = {
    firedCells: [],
    hitCount: 0,
    ships: [1]
  };

  public componentDidMount() {
    const [ship1, data] = placeShip(2);
    const [ship2] = placeShip(4, data);
    console.log(ship1, ship2);
    const ships = ship1.concat(ship2);
    console.log(ships);
    this.setState({
      ships
    });
  }
  public handleClick = () => {
    const { firedCells } = this.state;
    let { hitCount } = this.state;
    let validCell = false;
    let shot = 0;
    while (!validCell) {
      shot = getRandomInt(100);
      if ((firedCells as any[]).indexOf(shot) === -1) {
        validCell = true;
      }
    }
    const newCells = (firedCells as any[]).concat([shot]);
    if (this.getOverallShips().indexOf(shot) !== -1) {
      hitCount = hitCount ? hitCount + 1 : 1;
    }
    this.setState({ firedCells: newCells, hitCount }, () => {
      this.checkWinCondition();
    });
  };
  public reset = () => {
    const [ship1, data] = placeShip(2);
    const [ship2] = placeShip(4, data);
    const ships = ship1.concat(ship2);

    this.setState({
      firedCells: [],
      hitCount: 0,
      ships
    });
  };
  public checkWinCondition = () => {
    if (this.state.hitCount === this.getOverallShips().length) {
      alert("Game OVER!");
    }
  };
  public getOverallShips = () => {
    console.log(this.state.ships);

    const ships = [...this.state.ships];
    return ships;
  };
  public render() {
    const { firedCells, ships } = this.state;

    return (
      <div className="container">
        <div className="grid-wrapper">
          {grid.map(el => (
            <Cell
              key={`${el}`}
              id={`${el}`}
              shipArea={ships.indexOf(el) !== -1}
              fired={(firedCells as any[]).indexOf(el) !== -1}
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
