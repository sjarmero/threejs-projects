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
  SphereGeometry
} from 'three';
import SceneViewer from '@/components/scene-viewer/scene-viewer.vue';
import {OrbitControls} from 'three/addons/controls/OrbitControls';
import {onMounted} from 'vue';

// 1 unit: 1000 KM

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

  const globe = new Mesh(
    new SphereGeometry(6, 64, 64),
    new MeshStandardMaterial()
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