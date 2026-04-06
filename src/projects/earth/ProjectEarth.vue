<script setup lang="ts">
import {use3DContext} from '@/components/scene-viewer/use3DContext.ts';
import {AxesHelper, PerspectiveCamera, Scene} from 'three';
import SceneViewer from '@/components/scene-viewer/scene-viewer.vue';

const context = use3DContext();
context.scene = new Scene();
context.camera = new PerspectiveCamera();
context.camera.position.set(0, 0, 3);

context.scene.add(new AxesHelper());
</script>
<template>
  <scene-viewer />
</template>