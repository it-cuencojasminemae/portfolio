<script setup lang="ts">
import { animate } from 'motion-v'

// Counts the leading number of a value like "8+" or "3/3" up from 0 when it scrolls into view.
// The server renders the final value, so it's correct without JavaScript.
const props = defineProps<{ value: string }>()

const match = computed(() => props.value.match(/^(\d+)(.*)$/))
const target = computed(() => Number(match.value?.[1] ?? 0))
const suffix = computed(() => match.value?.[2] ?? '')

const el = ref<HTMLElement | null>(null)
const shown = ref<number | null>(null)
const inView = useInView(el, { once: true, amount: 0.6 })
const reduced = useReducedMotion()

onMounted(() => {
  if (!match.value || reduced.value) return
  shown.value = 0
})

watch(inView, (v) => {
  if (!v || shown.value === null) return
  animate(0, target.value, {
    duration: 1.4,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: n => (shown.value = Math.round(n))
  })
})
</script>

<template>
  <span ref="el" class="tabular-nums">
    <template v-if="match">{{ shown ?? target }}{{ suffix }}</template>
    <template v-else>{{ value }}</template>
  </span>
</template>
