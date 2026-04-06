<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {use3DContext} from '@/components/scene-viewer/use3DContext.ts';
import {PerspectiveCamera, WebGLRenderer} from 'three';
import {useLoadingManager} from '@/components/scene-viewer/useLoadingManager.ts';

let width = window.innerWidth;
let height = window.innerHeight;

const canvas = ref<HTMLElement>();
const context = use3DContext();

onMounted(()=> {
  context.renderer = new WebGLRenderer({
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
  context.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  if (context.camera instanceof PerspectiveCamera) {
    context.camera.aspect = width / height;
    context.camera.updateProjectionMatrix();
  }

  context.renderer.setSize(width, height);
  context.renderer.render(context.scene, context.camera);
}

const isLoading = ref(false);
const loadingError = ref(false);
const loadingProgress = ref(0);

const loadingManager = useLoadingManager();
loadingManager.onStart = ()=> {
  isLoading.value = true;
};
loadingManager.onLoad = ()=> {
  isLoading.value = false;
};
loadingManager.onProgress = (_, loaded, total) => {
  loadingProgress.value = Math.ceil(loaded / total);
};
loadingManager.onError = ()=> {
  loadingError.value = true;
};
</script>
<template>
  <div class="scene-viewer">
    <canvas
      ref="canvas"
      class="scene-viewer__canvas"
    />

    <div
      v-if="isLoading"
      class="scene-viewer__loader"
    >
      Loading... ({{ loadingProgress }}%)

      <p v-if="loadingError">
        Error while loading!
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.scene-viewer {
  &__canvas {
    outline: none;
  }

  &__loader {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: #0c0c0c;

    display: flex;
    align-items: center;
    justify-content: center;
    color: #f0f0f0;
  }
}
</style>