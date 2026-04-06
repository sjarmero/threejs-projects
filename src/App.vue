<script setup lang="ts">
import {provide3DContext} from '@/components/scene-viewer/use3DContext.ts';

provide3DContext();
</script>
<template>
  <RouterView />
</template>
