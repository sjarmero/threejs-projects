import {LoadingManager} from 'three';
import {inject, provide, type Ref, ref} from 'vue';
import {SB_LOADING_MANAGER} from '@/symbols.ts';

type LoadingManagerState = {
  isLoading: Ref<boolean>,
  hasLoadingError: Ref<boolean>,
  loadingProgress: Ref<number>,
  loadingManager: LoadingManager,
};

export function provideLoadingManager() {
  const state = {
    isLoading: ref(false),
    hasLoadingError: ref(false),
    loadingProgress: ref(0),
    loadingManager: new LoadingManager(),
  } as LoadingManagerState;

  state.loadingManager.onStart = ()=> {
    state.isLoading.value = true;
  };

  state.loadingManager.onLoad = ()=> {
    state.isLoading.value = false;
  };

  state.loadingManager.onProgress = (_, loaded, total) => {
    state.loadingProgress.value = Math.ceil((loaded / total) * 100);
  };

  state.loadingManager.onError = ()=> {
    state.hasLoadingError.value = true;
  };

  provide(SB_LOADING_MANAGER, state);
  return state;
}

export function useLoadingManager() {
  return inject(SB_LOADING_MANAGER) as LoadingManagerState;
}