// tslint:disable:no-console
function getOrientation() {
  return (Math.random() > 0.5) ? "horizontal" : "vertical";
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

function getRestrictedCells(ship, orientation) {
  let cells = [...ship];
  if (orientation === "horizontal") {
    if (ship[0] !== 1 && ship[0].toString()[1] !== "1") {
      cells.unshift(ship[0] - 1)
    }
    if (ship[ship.length - 1].toString()[1] !== "0") {
      cells.push(ship[ship.length - 1] + 1)
    }
    let upperCells = cells.map(el => el - 10);
    let bottomCells = cells.map(el => el + 10);
    const result = cells.concat(upperCells, bottomCells);
    return (result.filter(el => (el > 0 && el < 101) && el));
  } else {
    let leftCells = [];
    let rightCells = [];
    cells.unshift(ship[0] - 10);
    cells.push(ship[ship.length - 1] + 10);

    if (ship[ship.length - 1].toString()[1] !== "0") {
      rightCells = cells.map(el => el + 1);
    }
    if (ship[ship.length - 1].toString()[1] !== "1") {
      leftCells = cells.map(el => el - 1);
    }
    const result = cells.concat(leftCells, rightCells);

    return (result.filter(el => (el > 0 && el < 101) && el));

  }
}
function cellIterator(shipSize, orientation, cells) {
  let validShip = false;
  const size = orientation === "horizontal" ? 12 : 11;
  const amount = orientation === "horizontal" ? 1 : 10;
  while (!validShip) {
    var newShip = [];
    let x = getRandomInt(1, size - shipSize);
    let y;
    if (orientation === "horizontal") {
      y = getRandomInt(1, 11 - shipSize);
    } else {
      y = getRandomInt(0, 9);
    }
    let start = (parseInt(x.toString().concat(y.toString()), 10));
    if (cells.indexOf(start) === -1) {
      validShip = true;
      newShip.push(start);
      for (let i = 0; i < shipSize - 1; i++) {
        let next = newShip[i] + amount;
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

export default function placeShip(shipSize, cells) {
  let restrictedCells = cells || [];
  console.log(restrictedCells);
  let newShip = [];
  let orientation = getOrientation();
  let y = getRandomInt(1, 10 - shipSize);

  if (orientation === "horizontal") {
    let x = getRandomInt(1, 12 - shipSize);

    console.log(orientation);
    if (!restrictedCells.length) {
      let start = (parseInt(x.toString().concat(y.toString()), 10));
      newShip.push(start)
      for (let i = 0; i < shipSize - 1; i++) {
        let next = newShip[i] + 1;
        newShip.push(next)
      }
      restrictedCells = restrictedCells.concat(getRestrictedCells(newShip, orientation));
      console.log(restrictedCells);
    } else {
      newShip = cellIterator(shipSize, orientation, restrictedCells);
      restrictedCells = restrictedCells.concat(getRestrictedCells(newShip, orientation));
      console.log(restrictedCells);
    }
    console.log(newShip);

    return ([newShip, restrictedCells]);
  } else {

    let x = getRandomInt(1, 11 - shipSize);
    console.log(orientation);
    if (!restrictedCells.length) {
      let start = (parseInt(x.toString().concat(y.toString()), 10));
      newShip.push(start)
      for (let i = 0; i < shipSize - 1; i++) {
        let next = newShip[i] + 10;
        newShip.push(next)
      }
      restrictedCells = restrictedCells.concat(getRestrictedCells(newShip, orientation));
      console.log(restrictedCells);
    } else {
      newShip = cellIterator(shipSize, orientation, restrictedCells);
      restrictedCells = restrictedCells.concat(getRestrictedCells(newShip, orientation));
      console.log(restrictedCells);
    }
    console.log(newShip);
    return ([newShip, restrictedCells]);
  }
}