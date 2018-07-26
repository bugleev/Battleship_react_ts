import { getRandomInt } from "../helpers";

function getOrientation() {
  return Math.random() > 0.5 ? "horizontal" : "vertical";
}
function getCellNeighbours(cell) {
  return [
    cell,
    cell + 9,
    cell + 10,
    cell + 11,
    cell - 9,
    cell - 10,
    cell - 11,
    cell + 1,
    cell - 1
  ];
}
function getRestrictedCells(ship) {
  const cells = [...ship];
  const newResult = cells
    .map(cell => getCellNeighbours(cell))
    .reduce((acc, next) => acc.concat(next));
  return [...new Set(newResult)].filter(el => el > 0 && el < 101 && el);
}

function getAdditionalCell(ship, orientation) {
  const newShip = [...ship];
  const add = orientation === "horizontal" ? 10 : 1;
  let newCell;

  switch (orientation) {
    case "horizontal":
      if (
        newShip[0].toString().length === 1 &&
        newShip[0].toString()[0] === "1"
      ) {
        newCell =
          Math.random() > 0.5
            ? newShip[0] + add
            : newShip[newShip.length - 1] + add;
        newShip.push(newCell);
      } else if (newShip[0].toString()[0] === "9") {
        newCell =
          Math.random() > 0.5
            ? newShip[0] - add
            : newShip[newShip.length - 1] - add;
        newShip.push(newCell);
      }
      break;
    case "vertical":
      if (newShip[0].toString()[1] === "1") {
        newCell =
          Math.random() > 0.5
            ? newShip[0] + add
            : newShip[newShip.length - 1] + add;
        newShip.push(newCell);
      } else if (newShip[0].toString()[1] === "0") {
        newCell =
          Math.random() > 0.5
            ? newShip[0] - add
            : newShip[newShip.length - 1] - add;
        newShip.push(newCell);
      }
      break;
  }
  if (!newCell) {
    const position = getRandomInt(1, 5);
    switch (position) {
      case 1:
        newCell = newShip[0] - add;
        break;
      case 2:
        newCell = newShip[0] + add;
        break;
      case 3:
        newCell = newShip[newShip.length - 1] - add;
        break;
      case 4:
        newCell = newShip[newShip.length - 1] + add;
        break;
    }
  }
  return newCell;
}

export { getAdditionalCell, getOrientation, getRestrictedCells };
