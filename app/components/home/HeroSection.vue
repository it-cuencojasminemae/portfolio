<script setup lang="ts">
import { profile } from '~/data/portfolio'

const chips = [
  { label: 'Nuxt 4', icon: 'i-simple-icons-nuxt', class: 'left-0 top-10 -translate-x-1/4 lg:-translate-x-1/3' },
  { label: 'Strapi 5', icon: 'i-simple-icons-strapi', class: 'right-0 top-1/3 translate-x-1/4 lg:translate-x-1/3' },
  { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql', class: 'bottom-28 left-0 -translate-x-1/5 lg:-translate-x-1/4' }
]

const ease = [0.22, 1, 0.36, 1] as const

// shared "blur up" entrance; each element just passes its own delay
const enter = (delay = 0, y = 18) => ({
  initial: { opacity: 0, y, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease }
})

// headline words animate one at a time (blur-text effect); the highlight is one unit
const lead = 'I build web apps for'.split(' ')
const tail = 'and the people who use them.'.split(' ')
const wordDelay = (i: number) => 0.2 + i * 0.06
const highlightDelay = wordDelay(lead.length)
const tailStart = lead.length + 1
</script>

<template>
  <section id="home" class="relative isolate overflow-hidden pt-28 sm:pt-36 lg:pt-40">
    <!-- soft color blobs behind the glass: the only moving decoration on the page -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="blob blob-float top-[8%] -left-[8%] size-[22rem] bg-primary/25 sm:size-[26rem]" />
      <div class="blob blob-float top-0 right-[-6%] size-[24rem] bg-brand/15 [animation-delay:-6s] sm:size-[30rem]" />
      <div class="blob bottom-[10%] left-[40%] size-[18rem] bg-accented/70 sm:size-[22rem]" />
    </div>

    <UContainer>
      <div class="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div class="lg:col-span-7">
          <Motion
            v-bind="enter(0)"
            class="panel inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-3 text-sm font-medium text-highlighted"
          >
            <span class="relative flex size-2.5" aria-hidden="true">
              <span class="absolute inset-0 animate-ping rounded-full bg-success/60 motion-reduce:hidden" />
              <span class="relative size-2.5 rounded-full bg-success" />
            </span>
            {{ profile.status }}
          </Motion>

          <Motion as="p" v-bind="enter(0.1)" class="eyebrow mt-7 text-muted sm:mt-8">
            <span>{{ profile.role }}</span>
            <span class="hidden sm:inline"> · </span>
            <span class="mt-1 block sm:mt-0 sm:inline">{{ profile.title }}</span>
          </Motion>

          <h1 class="mt-4 text-[2.6rem] leading-[1.04] font-extrabold tracking-tight text-balance text-highlighted sm:text-6xl lg:text-7xl">
            <template v-for="(word, i) in lead" :key="`l${i}`">
              <Motion as="span" class="inline-block" v-bind="enter(wordDelay(i), 24)">{{ word }}</Motion>{{ ' ' }}
            </template>
            <Motion as="span" class="relative inline-block whitespace-nowrap text-primary" v-bind="enter(highlightDelay, 24)">
              real places
              <svg aria-hidden="true" viewBox="0 0 300 14" class="absolute -bottom-2 left-0 h-3 w-full text-brand/60" preserveAspectRatio="none">
                <path
                  d="M2 10 C 80 2, 220 2, 298 9"
                  pathLength="1"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="5"
                  stroke-linecap="round"
                  class="draw-in"
                  :style="{ animationDelay: `${highlightDelay + 0.35}s` }"
                />
              </svg>
            </Motion>{{ ' ' }}
            <template v-for="(word, i) in tail" :key="`t${i}`">
              <Motion as="span" class="inline-block" v-bind="enter(wordDelay(tailStart + i), 24)">{{ word }}</Motion>{{ ' ' }}
            </template>
          </h1>

          <Motion as="p" v-bind="enter(0.75)" class="mt-6 max-w-xl text-base text-pretty text-muted sm:mt-8 sm:text-lg">
            Hi, I'm {{ profile.firstName }}. I'm a fourth-year IT student from Pampanga building full-stack systems
            with Nuxt, Strapi and PostgreSQL, from campus stall maps to rural commute planners.
          </Motion>

          <Motion v-bind="enter(0.9)" class="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <div class="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:flex">
              <UButton to="#work" size="xl" trailing-icon="i-lucide-arrow-right" class="justify-center">
                See my work
              </UButton>
              <UButton :to="profile.resume" target="_blank" size="xl" color="neutral" variant="outline" icon="i-lucide-file-down" class="justify-center">
                <span class="sm:hidden">Resume</span>
                <span class="hidden sm:inline">Download resume</span>
              </UButton>
            </div>
            <div class="flex items-center justify-center gap-1 sm:justify-start">
              <span class="mx-1 hidden h-6 w-px bg-(--ui-border-accented) sm:block" aria-hidden="true" />
              <UTooltip v-for="s in profile.socials" :key="s.to" :text="`${s.label} / ${s.handle}`">
                <UButton
                  :to="s.to"
                  target="_blank"
                  :icon="s.icon"
                  size="xl"
                  color="neutral"
                  variant="ghost"
                  class="rounded-full"
                  :aria-label="`${s.label}: ${s.handle}`"
                />
              </UTooltip>
            </div>
          </Motion>
        </div>

        <!-- portrait in a liquid-glass frame -->
        <div class="lg:col-span-5">
          <Motion
            class="relative mx-auto w-full max-w-[19rem] sm:max-w-[22rem]"
            :initial="{ opacity: 0, scale: 0.94, y: 24 }"
            :animate="{ opacity: 1, scale: 1, y: 0 }"
            :transition="{ duration: 1, delay: 0.35, ease }"
          >
            <div class="glass rounded-[1.5rem] p-2.5">
              <div class="relative overflow-hidden rounded-[1rem] bg-muted">
                <NuxtImg
                  :src="profile.photo"
                  :alt="`Portrait of ${profile.name}`"
                  width="704"
                  height="880"
                  sizes="304px sm:352px"
                  fit="cover"
                  format="webp"
                  preload
                  fetchpriority="high"
                  class="aspect-[4/5] w-full object-cover object-top"
                />
                <div class="panel absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl px-4 py-3">
                  <div class="min-w-0">
                    <p class="truncate text-sm font-bold text-highlighted">{{ profile.name }}</p>
                    <p class="truncate text-xs text-muted">{{ profile.location }}</p>
                  </div>
                  <UIcon name="i-lucide-map-pin" class="size-5 shrink-0 text-primary" />
                </div>
              </div>
            </div>

            <!-- floating tech chips: pop in, then drift gently -->
            <div
              v-for="(chip, i) in chips"
              :key="chip.label"
              aria-hidden="true"
              class="absolute hidden sm:block"
              :class="chip.class"
            >
              <Motion
                :initial="{ opacity: 0, scale: 0.6 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ type: 'spring', bounce: 0.4, duration: 0.8, delay: 0.9 + i * 0.12 }"
              >
                <Motion
                  class="panel flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold whitespace-nowrap text-highlighted"
                  :animate="{ y: [0, -8, 0] }"
                  :transition="{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }"
                >
                  <UIcon :name="chip.icon" class="size-4 text-primary" />
                  {{ chip.label }}
                </Motion>
              </Motion>
            </div>
          </Motion>
        </div>
      </div>
    </UContainer>

    <!-- giant name: whole word visible, fading softly toward the next section -->
    <GiantText text="Jasmine" class="mt-16 px-2 text-[clamp(4.25rem,19vw,20rem)] sm:mt-20" />
  </section>
</template>
