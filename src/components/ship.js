let shipIdCounter = 0;

// Factory to create ships
export const createShip = (length, position, orientation) => {
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

  return { id, length, position, orientation, hit, isSunk };
};
