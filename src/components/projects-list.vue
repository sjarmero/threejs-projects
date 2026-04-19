<script setup lang="ts">
import { ROUTE_NAMES } from '@/router/route-names.ts';
</script>
<template>
  <h1>Project List</h1>

  <ul>
    <li>
      <router-link :to="{name: ROUTE_NAMES.PROJECT_EARTH}">
        Earth
      </router-link>
    </li>
    <li>
      <router-link :to="{name: ROUTE_NAMES.PROJECT_GALAXY_GENERATOR}">
        Galaxy Generator
      </router-link>
    </li>
  </ul>
</template>
