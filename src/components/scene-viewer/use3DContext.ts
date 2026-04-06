import {SB_3D_CONTEXT} from '@/symbols.ts';
import {inject, provide} from 'vue';
import type {Camera, Scene, WebGLRenderer} from 'three';

type State3DContext = {
  renderer: WebGLRenderer,
  camera: Camera,
  scene: Scene,
};

export function provide3DContext() {
  const state = {} as State3DContext;
  provide(SB_3D_CONTEXT, state);
  return state;
}

export function use3DContext() {
  return inject(SB_3D_CONTEXT) as State3DContext;
}