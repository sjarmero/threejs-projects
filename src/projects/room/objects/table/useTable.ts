import { BoxGeometry, CylinderGeometry, Group, Mesh, MeshStandardMaterial } from 'three';
import { use3DContext } from '~/src/components/scene-viewer/use3DContext';
import { TABLE_LEG_SIZES, TABLE_LEGS_COUNT, TABLE_SIZES } from '../../sizes';
import { useKeyboard } from './useKeyboard';

export function useTable() {
  const context = use3DContext();

  const table = new Group();
  useKeyboard(table);

  const tableTop = new Mesh(
    new BoxGeometry(TABLE_SIZES.width, TABLE_SIZES.height, TABLE_SIZES.depth),
    new MeshStandardMaterial({
      color: 0xffffff
    })
  );
  tableTop.position.y = TABLE_LEG_SIZES.height;

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
      (TABLE_LEG_SIZES.height / 2),
      (i < 2 ? 1 : -1) * (0.09 - (TABLE_SIZES.depth / 2)),
    );

    return tableLeg;
  });

  table.add(...tableLegs);


  context.scene.add(table);
}
