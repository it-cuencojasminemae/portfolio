<script setup lang="ts">
defineProps<{
  index: string
  eyebrow: string
  title: string
  description?: string
}>()
</script>

<template>
  <div v-reveal class="mb-10 grid gap-4 sm:gap-6 md:mb-14 md:grid-cols-12 md:items-end">
    <div class="md:col-span-7">
      <p class="eyebrow flex items-center gap-3 text-primary">
        <span>{{ index }}</span>
        <span class="h-px w-10 bg-current" aria-hidden="true" />
        <span>{{ eyebrow }}</span>
      </p>
      <h2 class="mt-4 text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-balance text-highlighted sm:text-5xl lg:text-6xl">
        {{ title }}
      </h2>
    </div>
    <p v-if="description" class="text-base text-pretty text-muted sm:text-lg md:col-span-5">
      {{ description }}
    </p>
  </div>
</template>
