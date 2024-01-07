// ship.test.js
import { createShip } from "../src/components/ship";

test('creates ship with correct id', () => {
  const testShip = createShip(3);
  expect(testShip.id).toBe(0);
});

test('creates ship with correct length', () => {
  const testShip = createShip(3);
  expect(testShip.length).toBe(3);
});

test('does not mark ship as being sunk before reaching max hits', () => {
  const testShip = createShip(3);
  testShip.hit();
  expect(testShip.isSunk()).toBe(false);
});

test('returns false when ship is not sunk', () => {
  const testShip = createShip();
  expect(testShip.isSunk()).toBe(false);
});

test('returns true when ship is sunk', () => {
  const testShip = createShip(3);
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBe(true);
});
