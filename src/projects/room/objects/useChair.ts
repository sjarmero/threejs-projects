import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import officeChairModelPath from '~/assets/room/officE_chair.glb?url';
import { use3DContext } from '~/src/components/scene-viewer/use3DContext';
import { useLoadingManager } from '~/src/components/scene-viewer/useLoadingManager';
import { TABLE_SIZES } from '../sizes';

export async function useOfficeChair() {
  const {loadingManager} = useLoadingManager();
  const context = use3DContext();

  const gltfLoader = new GLTFLoader(loadingManager);
  const officeChairModel = await gltfLoader.loadAsync(officeChairModelPath);

  const officeChair = officeChairModel.scene;
  officeChair.position.set(0, 0, -0.1 - (TABLE_SIZES.depth / 2));

  context.scene.add(officeChair);
}
