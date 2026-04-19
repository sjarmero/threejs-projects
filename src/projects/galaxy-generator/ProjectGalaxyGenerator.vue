<script setup lang="ts">
import GUI from 'lil-gui';
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Group, PerspectiveCamera, Points, PointsMaterial, Scene, TextureLoader, Timer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onMounted } from 'vue';
import SceneViewer from '~/src/components/scene-viewer/scene-viewer.vue';
import { use3DContext } from '~/src/components/scene-viewer/use3DContext';
import { useLoadingManager } from '~/src/components/scene-viewer/useLoadingManager';

import starTexturePath from '~/assets/galaxy-generator/star.png';

const ONE_REV = 2 * Math.PI;

const gui = new GUI();

const {loadingManager} = useLoadingManager();
const textureLoader = new TextureLoader(loadingManager);
const starTexture = textureLoader.load(starTexturePath);

const context = use3DContext();
context.scene = new Scene();
context.camera = new PerspectiveCamera();

const galaxySettings = {
  starsCount: 20000,
  starSize: 0.03,
  height: 0.2,
  size: 12,
  spin: 1.2,
  scale: 1,
  branches: 3,
  randomness: 0.3,
  squeeze: 0.8,
  centerColor: '#ff6030',
  outsideColor: '#1b3984',

  bulbStarsCount: 60000,
  bulbSize: 1.2,
  bulbSqueeze: 0.15,
  bulbColor: '#ff6030',
  bulbRandomness: 1.5,

  backgroundStarsCount: 2000,

  spiralsRotationSpeed: 0.2,
  bulbRotationSpeed: 0.15,
};

const galaxyFolder = gui.addFolder('galaxy');
galaxyFolder.add(galaxySettings, 'starsCount').min(100).max(1000000).step(10);
galaxyFolder.add(galaxySettings, 'starSize').min(0.01).max(1).step(0.01);
galaxyFolder.add(galaxySettings, 'height').min(0.01).max(3).step(0.01);
galaxyFolder.add(galaxySettings, 'size').min(1).max(100).step(1);
galaxyFolder.add(galaxySettings, 'scale').min(1).max(100).step(1);
galaxyFolder.add(galaxySettings, 'branches').min(2).max(10).step(1);
galaxyFolder.add(galaxySettings, 'randomness').min(0.001).max(1).step(0.001);
galaxyFolder.add(galaxySettings, 'spin').min(0.001).max(10).step(0.001);
galaxyFolder.add(galaxySettings, 'squeeze').min(0.001).max(2).step(0.001);
galaxyFolder.addColor(galaxySettings, 'centerColor');
galaxyFolder.addColor(galaxySettings, 'outsideColor');

const bulbFolder = gui.addFolder('bulb');
bulbFolder.add(galaxySettings, 'bulbStarsCount').min(100).max(100000).step(10);
bulbFolder.add(galaxySettings, 'bulbSize').min(0.01).max(100).step(0.01);
bulbFolder.add(galaxySettings, 'bulbSqueeze').min(0.001).max(2).step(0.001);
bulbFolder.add(galaxySettings, 'bulbRandomness').min(0.001).max(3).step(0.001);
bulbFolder.addColor(galaxySettings, 'bulbColor');

const rotationFolder = gui.addFolder('rotation');
rotationFolder.add(galaxySettings, 'spiralsRotationSpeed').min(0.01).max(1).step(0.01);
rotationFolder.add(galaxySettings, 'bulbRotationSpeed').min(0.01).max(1).step(0.01);

const backgroundFolder = gui.addFolder('background');
backgroundFolder.add(galaxySettings, 'backgroundStarsCount').min(1).max(1000).step(1);

gui.onChange(generate);

const galaxy = new Group();

let galaxyMaterial: PointsMaterial;
let galaxyGeometry: BufferGeometry;
let galaxySpirals: Points;

function computeSpiralCoordinates(growthAngle: number, branchAngle: number): [x: number, z: number] {
  const spiralRadius = galaxySettings.scale * Math.pow(galaxySettings.spin, growthAngle);

  return [
    spiralRadius * Math.cos(growthAngle + branchAngle),
    spiralRadius * Math.sin(growthAngle + branchAngle),
  ];
}

function prepareGalaxyGeometry() {
  galaxyGeometry = new BufferGeometry();

  const radsPerBranch = ONE_REV / galaxySettings.branches;

  const baseCenterColor = new Color(galaxySettings.centerColor);
  const baseOutsideColor = new Color(galaxySettings.outsideColor);

  const starsPositions = new Float32Array(galaxySettings.starsCount * 3);
  const starsColors = new Float32Array(galaxySettings.starsCount * 3);

  for (let i = 0; i < galaxySettings.starsCount; i++) {
    const attributeIndex = i * 3;

    const starAngle = galaxySettings.size * Math.random();
    const starBranchAngle = radsPerBranch * (i % galaxySettings.branches);

    const [x, z] = computeSpiralCoordinates(starAngle, starBranchAngle);
    const randomnessFactor = (1 + (galaxySettings.randomness * Math.random()));
    starsPositions[attributeIndex] = x * randomnessFactor;
    starsPositions[attributeIndex + 1] = galaxySettings.height * Math.random();
    starsPositions[attributeIndex + 2] = galaxySettings.squeeze * z * randomnessFactor;

    const lerpColor = baseCenterColor.clone().lerp(baseOutsideColor, starAngle / galaxySettings.size);
    starsColors[attributeIndex] = lerpColor.r;
    starsColors[attributeIndex + 1] = lerpColor.g;
    starsColors[attributeIndex + 2] = lerpColor.b;
  }

  galaxyGeometry.setAttribute('position', new BufferAttribute(starsPositions, 3));
  galaxyGeometry.setAttribute('color', new BufferAttribute(starsColors, 3));
}

function prepareGalaxyMaterial() {
  galaxyMaterial = new PointsMaterial({
    alphaMap: starTexture,
    size: galaxySettings.starSize,
    blending: AdditiveBlending,
    vertexColors: true,
    sizeAttenuation: true,
    depthWrite: false,
  });
}

function generateGalaxy() {
  galaxyMaterial?.dispose();
  galaxyGeometry?.dispose();
  galaxy.remove(galaxySpirals);

  prepareGalaxyGeometry();
  prepareGalaxyMaterial();

  galaxySpirals = new Points(galaxyGeometry, galaxyMaterial);
  galaxy.add(galaxySpirals);
}

let galaxyBulbMaterial: PointsMaterial;
let galaxyBulbGeometry: BufferGeometry;
let galaxyBulb: Points;

function generateGalaxyBulbMaterial() {
  galaxyBulbMaterial = new PointsMaterial({
    alphaMap: starTexture,
    size: galaxySettings.starSize,
    blending: AdditiveBlending,
    vertexColors: true,
    sizeAttenuation: true,
    depthWrite: false,
  });
}

function generateGalaxyBulbGeometry() {
  const starsPositions = new Float32Array(galaxySettings.bulbStarsCount * 3);
  const starColors = new Float32Array(galaxySettings.bulbStarsCount * 3);

  const baseBulbColor = new Color(galaxySettings.bulbColor);

  for (let i = 0; i < galaxySettings.bulbStarsCount; i++) {
    const attributeIndex = i * 3;

    const randomnessFactor = (1 + (galaxySettings.bulbRandomness * Math.random()));
    const radius = galaxySettings.bulbSize * Math.pow(Math.random(), galaxySettings.randomness);
    const omega = Math.random() * ONE_REV;
    const phi = Math.random() * Math.PI;

    starsPositions[attributeIndex] =  radius * Math.cos(omega) * Math.sin(phi) * randomnessFactor;
    starsPositions[attributeIndex + 1] = 0.1 + (galaxySettings.bulbSqueeze * radius * Math.sin(omega) * Math.sin(phi));
    starsPositions[attributeIndex + 2] = radius * Math.cos(phi) * randomnessFactor;

    starColors[attributeIndex] = baseBulbColor.r;
    starColors[attributeIndex + 1] = baseBulbColor.g;
    starColors[attributeIndex + 2] = baseBulbColor.b;
  }

  galaxyBulbGeometry = new BufferGeometry();
  galaxyBulbGeometry.setAttribute('position', new BufferAttribute(starsPositions, 3));
  galaxyBulbGeometry.setAttribute('color', new BufferAttribute(starColors, 3));
}

function generateGalaxyBulb() {
  galaxyBulbMaterial?.dispose();
  galaxyBulbGeometry?.dispose();
  galaxy.remove(galaxyBulb);

  generateGalaxyBulbMaterial();
  generateGalaxyBulbGeometry();

  galaxyBulb = new Points(galaxyBulbGeometry, galaxyBulbMaterial);
  galaxy.add(galaxyBulb);
}

let backgroundMaterial: PointsMaterial;
let backgroundGeometry: BufferGeometry;
let background: Points;

function generateBackground() {
  backgroundMaterial?.dispose();
  backgroundGeometry?.dispose();
  context.scene.remove(background);

  backgroundMaterial = new PointsMaterial({
    transparent: true,
    alphaMap: starTexture,
    sizeAttenuation: true,
    depthWrite: false,
    size: 0.3,
  });
  backgroundGeometry = new BufferGeometry();

  const positions = new Float32Array(galaxySettings.backgroundStarsCount * 3);

  for (let i = 0; i < galaxySettings.backgroundStarsCount; i++) {
    const attributeIndex = i * 3;

    positions[attributeIndex] = Math.random() - 0.5;
    positions[attributeIndex + 1] = Math.random() - 0.5;
    positions[attributeIndex + 2] = Math.random() - 0.5;
  }

  backgroundGeometry.setAttribute('position', new BufferAttribute(positions, 3));

  background = new Points(backgroundGeometry, backgroundMaterial);
  background.scale.setScalar(200);

  context.scene.add(background);
}

function generate() {
  context.scene.remove(galaxy);

  generateGalaxy();
  generateGalaxyBulb();
  generateBackground();

  context.scene.add(galaxy);

  context.camera.position.set(0, 10, 18);
  context.camera.lookAt(galaxy.position);
}

generate();

onMounted(()=> {
  tick();
  new OrbitControls(context.camera, context.renderer.domElement);
});

const timer = new Timer();
function tick() {
  timer.update();

  galaxy.rotation.z = -0.05 * ONE_REV;

  galaxyBulb.rotation.y = (galaxySettings.bulbRotationSpeed * timer.getElapsed()) % ONE_REV;
  galaxySpirals.rotation.y = (galaxySettings.spiralsRotationSpeed * timer.getElapsed()) % ONE_REV;

  context.renderer.render(context.scene, context.camera);

  requestAnimationFrame(tick);
}
</script>
<template>
  <scene-viewer />
</template>
