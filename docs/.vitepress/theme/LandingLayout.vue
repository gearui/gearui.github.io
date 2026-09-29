<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { computed } from 'vue'
import DemoPhone from './DemoPhone.vue'

const route = useRoute()
const chinese = computed(() => route.path.startsWith('/zh-Hans/'))
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-hero-image>
      <DemoPhone :chinese="chinese" />
    </template>
  </DefaultTheme.Layout>
</template>
