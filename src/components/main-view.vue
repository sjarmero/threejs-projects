<script setup lang="ts">
import * as THREE from 'three';
import {onMounted, ref} from 'vue';

const width = 800;
const height = 600;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0xff0000});
const mesh = new THREE.Mesh(geometry, material);

const scene = new THREE.Scene();
scene.add(mesh);

const camera = new THREE.PerspectiveCamera(75, width / height);
camera.position.z = 3;
scene.add(camera);

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(()=> {
  if (canvas.value) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas.value,
    });

    renderer.setSize(width, height);
    renderer.render(scene, camera);
  }
});
</script>
<template>
  <div>
    <canvas
      ref="canvas"
      class="webgl"
    />
  </div> 
</template>