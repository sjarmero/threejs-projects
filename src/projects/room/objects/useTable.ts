import { CylinderGeometry, Group, Mesh, MeshStandardMaterial } from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/Addons.js';
import { use3DContext } from '~/src/components/scene-viewer/use3DContext';

const TABLE_SIZES = {
  width: 1.9,
  height: 0.035,
  depth: 0.8,
};

const TABLE_LEGS_COUNT = 4;
const TABLE_LEG_SIZES = {
  radius: 0.04,
  height: 0.73,
};

export function useTable() {
  const context = use3DContext();

  const table = new Group();

  const tableTop = new Mesh(
    new RoundedBoxGeometry(TABLE_SIZES.width, TABLE_SIZES.height, TABLE_SIZES.depth),
    new MeshStandardMaterial({
      color: 0xffffff
    })
  );

  table.add(tableTop);

  const tableLegs = [...Array(TABLE_LEGS_COUNT)].map((_, i) => {
    const tableLeg = new Mesh(
      new CylinderGeometry(TABLE_LEG_SIZES.radius, TABLE_LEG_SIZES.radius, TABLE_LEG_SIZES.height),
      new MeshStandardMaterial({
        color: '#ededed',
      })
    );

    tableLeg.position.set(
      (i % 2 === 0 ? 1 : -1) * (0.17 - (TABLE_SIZES.width / 2)),
      -(TABLE_LEG_SIZES.height / 2),
      (i < 2 ? 1 : -1) * (0.09 - (TABLE_SIZES.depth / 2)),
    );

    return tableLeg;
  });

  table.add(...tableLegs);


  context.scene.add(table);
}
