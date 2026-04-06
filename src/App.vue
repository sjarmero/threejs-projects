<script setup lang="ts">
import {provide3DContext} from '@/components/scene-viewer/use3DContext.ts';
import {provideLoadingManager} from '@/components/scene-viewer/useLoadingManager.ts';

provide3DContext();
provideLoadingManager();
</script>
<template>
  <RouterView />
</template>
