<script setup lang="ts">
import { AmbientLight, PerspectiveCamera, Scene, Timer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted } from 'vue';
import SceneViewer from '~/src/components/scene-viewer/scene-viewer.vue';
import { use3DContext } from '~/src/components/scene-viewer/use3DContext';
import { useTable } from './objects/useTable';

const context = use3DContext();
context.scene = new Scene();
context.camera = new PerspectiveCamera();
context.camera.position.set(0, 0, 3);

const ambientLight = new AmbientLight('#ffffff', 1.5);
context.scene.add(ambientLight);

useTable();

onMounted(()=> {
  tick();
  new OrbitControls(context.camera, context.renderer.domElement);
});

const timer = new Timer();
function tick() {
  timer.update();

  context.renderer.render(context.scene, context.camera);

  requestAnimationFrame(tick);
}
</script>
<template>
  <scene-viewer />
</template>
