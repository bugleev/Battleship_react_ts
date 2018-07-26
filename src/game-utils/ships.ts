import { getRandomInt } from "../helpers";
import {
  getAdditionalCell,
  getOrientation,
  getRestrictedCells
} from "./utilities";

function LShip(restrictedCells) {
  const newShip: number[] = [];
  const orientation = getOrientation();
  let x;
  let y;
  const add = orientation === "horizontal" ? 1 : 10;
  if (orientation === "horizontal") {
    x = getRandomInt(1, 9);
    y = getRandomInt(1, 9);
  } else {
    x = getRandomInt(1, 8);
    y = getRandomInt(0, 10);
  }
  const start = parseInt(x.toString().concat(y.toString()), 10);
  newShip.push(start);
  for (let i = 0; i < 2; i++) {
    const next = newShip[i] + add;
    newShip.push(next);
  }
  newShip.push(getAdditionalCell(newShip, orientation));
  restrictedCells.push(...getRestrictedCells(newShip));
  return newShip;
}

function IShip(shipSize, restrictedCells) {
  const orientation = getOrientation();
  let newShip: number[] = [];
  let validShip = false;
  const size = shipSize === 1 ? 11 : orientation === "horizontal" ? 12 : 11;
  const add = orientation === "horizontal" ? 1 : 10;
  while (!validShip) {
    newShip = [];
    const x = getRandomInt(1, size - shipSize);
    let y;
    if (orientation === "horizontal") {
      y = getRandomInt(1, 11 - shipSize);
    } else {
      y = getRandomInt(0, 9);
    }
    const start = parseInt(x.toString().concat(y.toString()), 10);
    if (restrictedCells.indexOf(start) === -1) {
      validShip = true;
      newShip.push(start);
      for (let i = 0; i < shipSize - 1; i++) {
        const next = newShip[i] + add;
        if (restrictedCells.indexOf(next) !== -1) {
          validShip = false;
          newShip = [];
        }
        newShip.push(next);
      }
    }
  }
  restrictedCells.push(...getRestrictedCells(newShip));
  return newShip;
}

export { LShip, IShip };
