<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{ chinese: boolean }>()
const demoUrl = computed(() => `/gearui-kit/demo/?lang=${props.chinese ? 'zh-Hans' : 'en-US'}`)
const frame = ref<HTMLIFrameElement | null>(null)
const ready = ref(false)
let observer: MutationObserver | null = null

function stopObserving() {
  observer?.disconnect()
  observer = null
}

function onFrameLoad() {
  stopObserving()
  const root = frame.value?.contentDocument?.getElementById('root')
  if (!root) return

  function revealWhenRendered() {
    if (root?.textContent?.trim()) {
      ready.value = true
      stopObserving()
    }
  }

  revealWhenRendered()
  if (!ready.value) {
    observer = new MutationObserver(revealWhenRendered)
    observer.observe(root, { childList: true, characterData: true, subtree: true })
  }
}

watch(demoUrl, () => {
  stopObserving()
  ready.value = false
})
onBeforeUnmount(stopObserving)
</script>

<template>
  <div class="gearui-demo">
    <div class="gearui-demo-device">
      <div class="gearui-demo-screen" :aria-busy="!ready">
        <iframe
          ref="frame"
          :src="demoUrl"
          :title="chinese ? 'GearUI Kit 可交互 Web 演示' : 'GearUI Kit interactive Web demo'"
          loading="lazy"
          allow="clipboard-write"
          @load="onFrameLoad"
        />
        <div v-if="!ready" class="gearui-demo-loading" role="status" aria-live="polite">
          {{ chinese ? '加载中...' : 'Loading...' }}
        </div>
      </div>
    </div>
    <a class="gearui-demo-link" :href="demoUrl" target="_blank" rel="noopener noreferrer">
      {{ chinese ? '体验开发版 Web sample ↗' : 'Try the development Web sample ↗' }}
    </a>
  </div>
</template>
