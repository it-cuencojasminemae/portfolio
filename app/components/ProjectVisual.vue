<script setup lang="ts">
// Illustrated stand-ins for project screenshots.
// When you have real screenshots, swap this for <NuxtImg src="/projects/imapsu.png" />.
defineProps<{ variant: 'stalls' | 'routes' }>()

// stall grid for IMAPSU: 1 = occupied, 0 = vacant, 2 = selected
const stalls = [
  [1, 1, 0, 1, 1, 0],
  [1, 0, 1, 1, 2, 1],
  [0, 1, 1, 0, 1, 1]
]
</script>

<template>
  <div aria-hidden="true" class="relative isolate h-full min-h-80 overflow-hidden bg-gradient-to-br from-brand/15 via-muted to-brand/25">
    <div class="absolute inset-0 opacity-50 [background-image:linear-gradient(var(--ui-border)_1px,transparent_1px),linear-gradient(90deg,var(--ui-border)_1px,transparent_1px)] [background-size:32px_32px]" />

    <!-- IMAPSU: campus stall map -->
    <template v-if="variant === 'stalls'">
      <div class="absolute inset-0 grid place-items-center p-8">
        <div class="panel w-full max-w-md rounded-3xl p-5">
          <div class="mb-4 flex items-center justify-between">
            <span class="eyebrow text-muted">Food court · Block B</span>
            <span class="flex gap-1.5">
              <span class="size-2.5 rounded-full bg-accented" />
              <span class="size-2.5 rounded-full bg-accented" />
              <span class="size-2.5 rounded-full bg-brand" />
            </span>
          </div>
          <div class="space-y-2">
            <div v-for="(row, r) in stalls" :key="r" class="grid grid-cols-6 gap-2">
              <div
                v-for="(s, c) in row"
                :key="c"
                class="relative aspect-square rounded-lg"
                :class="{
                  'bg-inverted/80': s === 1,
                  'border-2 border-dashed border-accented': s === 0,
                  'bg-brand ring-4 ring-brand/30': s === 2
                }"
              >
                <UIcon v-if="s === 2" name="i-lucide-map-pin" class="absolute -top-5 left-1/2 size-6 -translate-x-1/2 text-primary drop-shadow" />
              </div>
            </div>
            <div class="h-6 rounded-lg bg-accented/50" />
          </div>
        </div>
      </div>
      <div class="panel absolute right-5 bottom-5 rounded-2xl px-4 py-3 text-sm sm:right-8 sm:bottom-8">
        <p class="font-bold text-highlighted">Stall B-12</p>
        <p class="text-xs text-muted">Occupied · Lease on file</p>
      </div>
      <div class="panel absolute top-5 left-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-highlighted sm:top-8 sm:left-8">
        <UIcon name="i-lucide-scan-text" class="size-4 text-primary" />
        OCR scan complete
      </div>
    </template>

    <!-- PAMANA: journey planner -->
    <template v-else>
      <svg viewBox="0 0 400 300" class="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice">
        <path d="M-10 230 C 80 220, 110 150, 190 140 S 300 80, 410 60" fill="none" class="stroke-(--ui-border-accented)" stroke-width="18" stroke-linecap="round" />
        <path d="M40 300 C 70 240, 140 210, 190 140" fill="none" class="stroke-(--ui-border-accented)" stroke-width="12" stroke-linecap="round" />
        <path d="M30 225 C 90 215, 120 152, 190 140 S 290 90, 350 72" fill="none" class="stroke-brand" stroke-width="5" stroke-linecap="round" />
        <path d="M350 72 L 372 40" fill="none" class="stroke-brand" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round" />
        <g class="fill-(--ui-bg) stroke-brand" stroke-width="4">
          <circle cx="30" cy="225" r="8" />
          <circle cx="190" cy="140" r="7" />
          <circle cx="350" cy="72" r="8" />
        </g>
        <circle cx="372" cy="40" r="9" class="fill-(--ui-bg-inverted)" />
      </svg>
      <div class="panel absolute top-5 left-5 w-60 rounded-2xl p-4 sm:top-8 sm:left-8">
        <p class="eyebrow text-muted">Trip plan</p>
        <div class="mt-3 flex items-center gap-2 text-sm font-semibold text-highlighted">
          <UIcon name="i-lucide-bus" class="size-4 text-primary" /> Jeepney · 3 stops
        </div>
        <div class="mt-1.5 flex items-center gap-2 text-sm text-muted">
          <UIcon name="i-lucide-footprints" class="size-4" /> Walk 4 min to destination
        </div>
      </div>
      <div class="panel absolute right-5 bottom-5 flex max-w-64 gap-2.5 rounded-2xl p-3.5 text-sm sm:right-8 sm:bottom-8">
        <UIcon name="i-lucide-sparkles" class="mt-0.5 size-4 shrink-0 text-primary" />
        <p class="text-toned">“Ride to the second stop, then walk straight ahead. Your stop is on the left.”</p>
      </div>
    </template>
  </div>
</template>
