import {LoadingManager} from 'three';
import {inject, provide} from 'vue';
import {SB_LOADING_MANAGER} from '@/symbols.ts';

export function provideLoadingManager() {
  const loadingManager = new LoadingManager();
  provide(SB_LOADING_MANAGER, loadingManager);
  return loadingManager;
}

export function useLoadingManager() {
  return inject(SB_LOADING_MANAGER) as LoadingManager;
}