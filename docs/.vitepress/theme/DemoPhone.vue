<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ chinese: boolean }>()
const demoUrl = computed(() => `/gearui-kit/demo/?lang=${props.chinese ? 'zh-Hans' : 'en-US'}`)
</script>

<template>
  <div class="gearui-demo">
    <div class="gearui-demo-device">
      <div class="gearui-demo-screen">
        <iframe
          :src="demoUrl"
          :title="chinese ? 'GearUI Kit 可交互 Web 演示' : 'GearUI Kit interactive Web demo'"
          loading="lazy"
          allow="clipboard-write"
        />
      </div>
    </div>
    <a class="gearui-demo-link" :href="demoUrl" target="_blank" rel="noopener noreferrer">
      {{ chinese ? '体验开发版 Web sample ↗' : 'Try the development Web sample ↗' }}
    </a>
  </div>
</template>
