// tslint:disable:no-console
function getOrientation() {
  return Math.random() > 0.5 ? "horizontal" : "vertical";
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
function getRestrictedCells(type, ship, orientation) {
  const cells = [...ship];
  let result;
  if (type === "I") {
    if (orientation === "horizontal") {
      if (ship[0] !== 1 && ship[0].toString()[1] !== "1") {
        cells.unshift(ship[0] - 1);
      }
      if (ship[ship.length - 1].toString()[1] !== "0") {
        cells.push(ship[ship.length - 1] + 1);
      }
      const upperCells = cells.map(el => el - 10);
      const bottomCells = cells.map(el => el + 10);
      result = cells.concat(upperCells, bottomCells);
    } else {
      let leftCells: number[] = [];
      let rightCells: number[] = [];
      cells.unshift(ship[0] - 10);
      cells.push(ship[ship.length - 1] + 10);

      if (ship[ship.length - 1].toString()[1] !== "0") {
        rightCells = cells.map(el => el + 1);
      }
      if (ship[ship.length - 1].toString()[1] !== "1") {
        leftCells = cells.map(el => el - 1);
      }
      result = cells.concat(leftCells, rightCells);
    }
    return result.filter(el => el > 0 && el < 101 && el);
  } else {
    if (orientation === "horizontal") {
      const upperCells = cells.map(el => el - 10);
      const bottomCells = cells.map(el => el + 10);
      const lastCell = cells[cells.length - 1];
      const additionalCells = [
        lastCell + 10,
        lastCell - 10,
        lastCell + 1,
        lastCell - 1
      ];
      result = cells.concat(upperCells, bottomCells, additionalCells);
    } else {
      const leftCells = cells.map(el => el - 1);
      const rightCells = cells.map(el => el + 1);
      const lastCell = cells[cells.length - 1];
      const additionalCells = [
        lastCell + 10,
        lastCell - 10,
        lastCell + 1,
        lastCell - 1
      ];
      result = cells.concat(leftCells, rightCells, additionalCells);
    }
  }
  return [...new Set(result)].filter(el => el > 0 && el < 101 && el);
}

function cellIterator(shipSize, orientation, cells) {
  let validShip = false;
  const size = orientation === "horizontal" ? 12 : 11;
  const amount = orientation === "horizontal" ? 1 : 10;
  let newShip: number[] = [];
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
    if (cells.indexOf(start) === -1) {
      validShip = true;
      newShip.push(start);
      for (let i = 0; i < shipSize - 1; i++) {
        const next = newShip[i] + amount;
        if (cells.indexOf(next) !== -1) {
          validShip = false;
          newShip = [];
        }
        newShip.push(next);
      }
    }
  }
  return newShip;
}
export function placeLship() {
  const newShip: number[] = [];
  const orientation = getOrientation();
  if (orientation === "horizontal") {
    const x = getRandomInt(1, 9);
    const y = getRandomInt(1, 9);
    const start = parseInt(x.toString().concat(y.toString()), 10);
    newShip.push(start);
    for (let i = 0; i < 2; i++) {
      const next = newShip[i] + 1;
      newShip.push(next);
    }
    if (
      newShip[0].toString().length === 1 &&
      newShip[0].toString()[0] === "1"
    ) {
      const newCell =
        Math.random() > 0.5
          ? newShip[0] + 10
          : newShip[newShip.length - 1] + 10;
      newShip.push(newCell);
    } else if (newShip[0].toString()[0] === "9") {
      const newCell =
        Math.random() > 0.5
          ? newShip[0] - 10
          : newShip[newShip.length - 1] - 10;
      newShip.push(newCell);
    } else {
      const position = getRandomInt(1, 5);
      let newCell;
      switch (position) {
        case 1:
          newCell = newShip[0] - 10;
          break;
        case 2:
          newCell = newShip[0] + 10;
          break;
        case 3:
          newCell = newShip[newShip.length - 1] - 10;
          break;
        case 4:
          newCell = newShip[newShip.length - 1] + 10;
          break;
      }
      newShip.push(newCell);
    }
  } else {
    const x = getRandomInt(1, 8);
    const y = getRandomInt(0, 10);
    const start = parseInt(x.toString().concat(y.toString()), 10);
    newShip.push(start);
    for (let i = 0; i < 2; i++) {
      const next = newShip[i] + 10;
      newShip.push(next);
    }
    if (newShip[0].toString()[1] === "1") {
      const newCell =
        Math.random() > 0.5 ? newShip[0] + 1 : newShip[newShip.length - 1] + 1;
      newShip.push(newCell);
    } else if (newShip[0].toString()[1] === "0") {
      const newCell =
        Math.random() > 0.5 ? newShip[0] - 1 : newShip[newShip.length - 1] - 1;
      newShip.push(newCell);
    } else {
      const position = getRandomInt(1, 5);
      let newCell;
      switch (position) {
        case 1:
          newCell = newShip[0] - 1;
          break;
        case 2:
          newCell = newShip[0] + 1;
          break;
        case 3:
          newCell = newShip[newShip.length - 1] - 1;
          break;
        case 4:
          newCell = newShip[newShip.length - 1] + 1;
          break;
      }
      newShip.push(newCell);
    }
  }
  const restrictedCells = getRestrictedCells("L", newShip, orientation);
  return [newShip, restrictedCells];
}
export function placeShip(shipSize, cells?) {
  let restrictedCells = cells || [];
  console.log(restrictedCells);
  let newShip: number[] = [];
  const orientation = getOrientation();
  const y = getRandomInt(1, 10 - shipSize);

  if (orientation === "horizontal") {
    const x = getRandomInt(1, 12 - shipSize);

    console.log(orientation);
    if (!restrictedCells.length) {
      const start = parseInt(x.toString().concat(y.toString()), 10);
      newShip.push(start);
      for (let i = 0; i < shipSize - 1; i++) {
        const next = newShip[i] + 1;
        newShip.push(next);
      }

      console.log(restrictedCells);
    } else {
      newShip = cellIterator(shipSize, orientation, restrictedCells);

      console.log(restrictedCells);
    }
    console.log(newShip);

    return [newShip, restrictedCells];
  } else {
    const x = getRandomInt(1, 11 - shipSize);
    console.log(orientation);
    if (!restrictedCells.length) {
      const start = parseInt(x.toString().concat(y.toString()), 10);
      newShip.push(start);
      for (let i = 0; i < shipSize - 1; i++) {
        const next = newShip[i] + 10;
        newShip.push(next);
      }

      console.log(restrictedCells);
    } else {
      newShip = cellIterator(shipSize, orientation, restrictedCells);
      console.log(restrictedCells);
    }
    restrictedCells = restrictedCells.concat(
      getRestrictedCells("I", newShip, orientation)
    );
    console.log(newShip);
    return [newShip, restrictedCells];
  }
}
