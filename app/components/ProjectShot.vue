<script setup lang="ts">
import type { ProjectScreenshot } from '~/data/portfolio'

// A real project screenshot inside a simple browser-window frame.
// Light and dark images swap with CSS (dark: classes), so there's no flash on load,
// and the hidden one is never downloaded because both are lazy-loaded.
withDefaults(defineProps<{ shot: ProjectScreenshot, framed?: boolean }>(), { framed: true })
</script>

<template>
  <div
    class="relative isolate h-full min-h-80 overflow-hidden"
    :class="framed && 'grid place-items-center bg-gradient-to-br from-brand/15 via-muted to-brand/25 p-6 sm:p-10'"
  >
    <figure class="panel w-full overflow-hidden rounded-[0.75rem]">
      <!-- browser bar -->
      <div class="flex items-center gap-3 border-b border-default bg-muted px-3.5 py-2.5" aria-hidden="true">
        <span class="flex gap-1.5">
          <span class="size-2.5 rounded-full bg-accented" />
          <span class="size-2.5 rounded-full bg-accented" />
          <span class="size-2.5 rounded-full bg-accented" />
        </span>
        <span v-if="shot.url" class="flex min-w-0 flex-1 items-center justify-center gap-1.5 truncate rounded-md bg-default px-3 py-1 font-mono text-[0.7rem] text-muted">
          <UIcon name="i-lucide-lock" class="size-3 shrink-0" />
          {{ shot.url }}
        </span>
      </div>

      <NuxtImg
        :src="shot.light"
        :alt="shot.alt"
        width="1440"
        height="900"
        sizes="100vw lg:640px"
        format="webp"
        loading="lazy"
        class="aspect-[16/10] w-full object-cover object-top"
        :class="shot.dark && 'dark:hidden'"
      />
      <NuxtImg
        v-if="shot.dark"
        :src="shot.dark"
        :alt="shot.alt"
        width="1440"
        height="900"
        sizes="100vw lg:640px"
        format="webp"
        loading="lazy"
        class="hidden aspect-[16/10] w-full object-cover object-top dark:block"
      />
    </figure>
  </div>
</template>
