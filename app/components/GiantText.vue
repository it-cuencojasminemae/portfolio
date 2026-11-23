<script setup lang="ts">
// Oversized decorative word. Letters rise in one by one when scrolled into view
// (split-text effect), and fade softly toward the bottom instead of being cut off.
const props = withDefaults(defineProps<{ text: string, onStrong?: boolean }>(), { onStrong: false })

const letters = computed(() => Array.from(props.text))
const ease = [0.22, 1, 0.36, 1] as const
</script>

<template>
  <p aria-hidden="true" class="giant flex justify-center whitespace-nowrap select-none">
    <template v-for="(ch, i) in letters" :key="i">
      <!-- a plain space collapses between inline-blocks, so spaces get a fixed gap -->
      <span v-if="ch === ' '" class="inline-block w-[0.3em]" />
      <Motion
        v-else
        as="span"
        class="giant-letter"
        :class="onStrong && 'on-strong'"
        :initial="{ opacity: 0, y: '35%', filter: 'blur(10px)' }"
        :while-in-view="{ opacity: 1, y: '0%', filter: 'blur(0px)' }"
        :in-view-options="{ once: true, amount: 0.3 }"
        :transition="{ duration: 1, delay: i * 0.055, ease }"
      >
        {{ ch }}
      </Motion>
    </template>
  </p>
</template>
