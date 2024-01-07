// ship.js

let shipIdCounter = 0;

export const createShip = (length) => {
  const id = shipIdCounter++;
  let hitCount = 0;
  let sunk = false;

  const hit = () => {
    if (hitCount < length) {
      hitCount += 1;
      if (hitCount === length) {
        sunk = true;
      }
    }
  };

  const isSunk = () => sunk;

  return { id, length, hit, isSunk };
};
