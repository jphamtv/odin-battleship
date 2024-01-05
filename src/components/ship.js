// ship.js

export const ship = (length) => {
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

  return { length, hit, isSunk };
};