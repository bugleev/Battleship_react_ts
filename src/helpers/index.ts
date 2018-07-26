function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function grid() {
  const arr: number[] = [];
  for (let i = 1; i <= 100; i++) {
    arr.push(i);
  }
  return arr;
}

export { getRandomInt, grid };
