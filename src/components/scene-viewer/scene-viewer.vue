<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {use3DContext} from '@/components/scene-viewer/use3DContext.ts';
import {PerspectiveCamera, WebGLRenderer} from 'three';

let width = window.innerWidth;
let height = window.innerHeight;

const canvas = ref<HTMLElement>();
const state = use3DContext();

onMounted(()=> {
  state.renderer = new WebGLRenderer({
    canvas: canvas.value,
  });

  updateCanvasSize();
  window.addEventListener('resize', ()=> {
    updateCanvasSize();
  });
});

function updateCanvasSize() {
  width = window.innerWidth;
  height = window.innerHeight;
  state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (state.camera instanceof PerspectiveCamera) {
    state.camera.aspect = width / height;
    state.camera.updateProjectionMatrix();
  }

  state.renderer.setSize(width, height);
  state.renderer.render(state.scene, state.camera);
}
</script>
<template>
  <canvas ref="canvas" />
</template>
<style lang="scss" scoped>
canvas {
  outline: none;
}
</style>