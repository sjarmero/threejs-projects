import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from 'three';
import { TABLE_LEG_SIZES, TABLE_SIZES } from '../../sizes';
import { getRoundedBoxGeometry } from '../../utils/getRoundedBox';

const KEYBOARD_MAT_SIZES = {
  width: 0.8,
  height: 0.002,
  depth: 0.4,
  radius: 0.05,
};

const KEYBOARD_SIZES = {
  width: 0.45,
  height: 0.015,
  depth: 0.13,
  radius: 0.015,
};

const KEYBOARD_LEG_SIZES = {
  width: 0.025,
  height: 0.025,
  depth: 0.005,
};

export function useKeyboard(table: Group) {
  const keyboardMat = new Mesh(
    getRoundedBoxGeometry(KEYBOARD_MAT_SIZES),
    new MeshStandardMaterial({
      color: 'blue'
    })
  );
  keyboardMat.position.set(
    0,
    TABLE_LEG_SIZES.height + TABLE_SIZES.height - 0.01,
    -(0.5 * TABLE_SIZES.depth) + (0.5 * KEYBOARD_MAT_SIZES.depth) + 0.02,
  );

  const keyboard = new Group();

  const keyboardKeys = new Mesh(
    getRoundedBoxGeometry(KEYBOARD_SIZES),
    new MeshStandardMaterial({
      color: 'white'
    })
  );
  keyboard.add(keyboardKeys);

  keyboardKeys.position.set(
    keyboardMat.position.x,
    keyboardMat.position.y + KEYBOARD_SIZES.height - 0.005,
    keyboardMat.position.z,
  );
  keyboardKeys.rotation.x = -0.05 * Math.PI;

  const keyboardLeftLeg = new Mesh(
    new BoxGeometry(KEYBOARD_LEG_SIZES.width, KEYBOARD_LEG_SIZES.height, KEYBOARD_LEG_SIZES.depth),
    new MeshStandardMaterial({
      color: 'white'
    })
  );
  keyboard.add(keyboardLeftLeg);

  keyboardLeftLeg.position.set(
    keyboardKeys.position.x + (0.5 * KEYBOARD_SIZES.width) - 0.05,
    keyboardKeys.position.y + KEYBOARD_SIZES.height - 0.01,
    keyboardKeys.position.z + (0.5 * KEYBOARD_SIZES.depth) - 0.005,
  );
  keyboardLeftLeg.rotation.x = -0.1 * Math.PI;

  const keyboardRightLeg = new Mesh(
    new BoxGeometry(KEYBOARD_LEG_SIZES.width, KEYBOARD_LEG_SIZES.height, KEYBOARD_LEG_SIZES.depth),
    new MeshStandardMaterial({
      color: 'white'
    })
  );
  keyboard.add(keyboardRightLeg);

  keyboardRightLeg.position.set(
    keyboardKeys.position.x - (0.5 * KEYBOARD_SIZES.width) + 0.05,
    keyboardKeys.position.y + KEYBOARD_SIZES.height - 0.01,
    keyboardKeys.position.z + (0.5 * KEYBOARD_SIZES.depth) - 0.005,
  );
  keyboardRightLeg.rotation.x = -0.1 * Math.PI;

  table.add(keyboardMat, keyboard);
}
