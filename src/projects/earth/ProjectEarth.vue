<script setup lang="ts">
import SceneViewer from '@/components/scene-viewer/scene-viewer.vue';
import { use3DContext } from '@/components/scene-viewer/use3DContext.ts';
import { useLoadingManager } from '@/components/scene-viewer/useLoadingManager.ts';
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight, DirectionalLightHelper,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry, SRGBColorSpace, TextureLoader, Timer
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { onMounted } from 'vue';

import earthColorTexturePath from '~/assets/earth/8k_earth_daymap.jpg';
import earthNormalTexturePath from '~/assets/earth/8k_earth_normal_map.png';

// 1 unit: 1000 KM

const {loadingManager} = useLoadingManager();
const textureLoader = new TextureLoader(loadingManager);

const context = use3DContext();
context.scene = new Scene();
context.camera = new PerspectiveCamera();

let earth: Group;

setCamera();
addEarth();
addLights();
addHelpers();

onMounted(()=> {
  tick();
  new OrbitControls(context.camera, context.renderer.domElement);
});

function setCamera() {
  context.camera.position.set(0, 0, 25);
}

function addEarth() {
  const EARTH_AXIAL_TILT = 23 * (Math.PI / 180); // 23º to rads

  earth = new Group();

  const earthColorTexture = textureLoader.load(earthColorTexturePath);
  earthColorTexture.colorSpace = SRGBColorSpace;
  const earthNormalTexture = textureLoader.load(earthNormalTexturePath);

  const globe = new Mesh(
    new SphereGeometry(6, 128, 512),
    new MeshStandardMaterial({
      map: earthColorTexture,
      normalMap: earthNormalTexture,
    })
  );

  earth.rotation.set(0, 0, -EARTH_AXIAL_TILT);

  earth.add(new AxesHelper(15));
  earth.add(globe);

  context.scene.add(earth);
}

function addLights() {
  context.scene.add(new AmbientLight(0xffffff, 0.2));

  const directionalLight = new DirectionalLight(0xffffff, 1.5);
  directionalLight.position.set(20, 0, 0);
  context.scene.add(directionalLight);
  context.scene.add(new DirectionalLightHelper(directionalLight, 10));
}

function addHelpers() {
  context.scene.add(new AxesHelper(3));
}

const timer = new Timer();
function tick() {
  timer.update();

  earth.rotation.set(
    earth.rotation.x,
    (timer.getElapsed() * 0.25 * -1) % (2 * Math.PI),
    earth.rotation.z,
  );

  context.renderer.render(context.scene, context.camera);

  requestAnimationFrame(tick);
}
</script>
<template>
  <scene-viewer />
</template>
