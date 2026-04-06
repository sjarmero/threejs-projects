<script setup lang="ts">
import {use3DContext} from '@/components/scene-viewer/use3DContext.ts';
import {
  AmbientLight,
  AxesHelper,
  DirectionalLight, DirectionalLightHelper,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry, SRGBColorSpace, TextureLoader
} from 'three';
import SceneViewer from '@/components/scene-viewer/scene-viewer.vue';
import {OrbitControls} from 'three/addons/controls/OrbitControls';
import {onMounted} from 'vue';
import {useLoadingManager} from '@/components/scene-viewer/useLoadingManager.ts';

import earthColorTexturePath from '~/assets/earth/8k_earth_daymap.jpg';
import earthNormalTexturePath from '~/assets/earth/8k_earth_normal_map.tif?url';
import {TIFFLoader} from 'three/addons/loaders/TIFFLoader';

// 1 unit: 1000 KM

const {loadingManager} = useLoadingManager();
const textureLoader = new TextureLoader(loadingManager);
const tiffLoader = new TIFFLoader(loadingManager);

const context = use3DContext();
context.scene = new Scene();
context.camera = new PerspectiveCamera();

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
  const earth = new Group();

  const earthColorTexture = textureLoader.load(earthColorTexturePath);
  earthColorTexture.colorSpace = SRGBColorSpace;
  const earthNormalTexture = tiffLoader.load(earthNormalTexturePath);

  const globe = new Mesh(
    new SphereGeometry(6, 128, 512),
    new MeshStandardMaterial({
      map: earthColorTexture,
      normalMap: earthNormalTexture,
    })
  );
  earth.add(globe);

  context.scene.add(earth);
}

function addLights() {
  context.scene.add(new AmbientLight(0xffffff, 0.3));

  const directionalLight = new DirectionalLight();
  directionalLight.position.set(10, 10, 0);
  context.scene.add(directionalLight);
  context.scene.add(new DirectionalLightHelper(directionalLight, 10));
}

function addHelpers() {
  context.scene.add(new AxesHelper(3));
}

function tick() {
  context.renderer.render(context.scene, context.camera);

  requestAnimationFrame(tick);
}
</script>
<template>
  <scene-viewer />
</template>