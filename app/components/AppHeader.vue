<script setup lang="ts">
import { navLinks, profile } from '~/data/portfolio'

const active = useActiveSection(navLinks.map(l => l.id))
const menuOpen = ref(false)
const ease = [0.22, 1, 0.36, 1] as const
</script>

<template>
  <header class="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-4">
    <Motion
      as="nav"
      aria-label="Main"
      class="glass mx-auto flex max-w-4xl items-center justify-between gap-2 rounded-full py-1.5 pr-1.5 pl-2 sm:py-2 sm:pr-2"
      :initial="{ opacity: 0, y: -20 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.7, ease }"
    >
      <NuxtLink to="#home" class="group flex items-center gap-2.5 rounded-full pr-2" :aria-label="`${profile.name}, back to top`">
        <!-- monogram: one inline run so "J." sits dead center (no stacked grid items) -->
        <span
          class="flex size-9 shrink-0 items-center justify-center rounded-full bg-inverted text-[0.95rem] leading-none font-extrabold tracking-tight text-inverted transition-transform duration-300 group-hover:-rotate-6"
          aria-hidden="true"
        >
          <span class="translate-x-[0.08em]">J<span class="text-brand">.</span></span>
        </span>
        <span class="font-bold tracking-tight whitespace-nowrap text-highlighted">Jasmine Mae</span>
      </NuxtLink>

      <ul class="hidden items-center gap-0.5 md:flex lg:gap-1">
        <li v-for="link in navLinks" :key="link.id">
          <NuxtLink
            :to="`#${link.id}`"
            class="relative isolate block rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 lg:px-3.5"
            :class="active === link.id ? 'text-inverted' : 'text-toned hover:text-highlighted'"
            :aria-current="active === link.id ? 'true' : undefined"
          >
            <!-- the dark pill slides between links instead of jumping -->
            <Motion
              v-if="active === link.id"
              layout-id="nav-active-pill"
              class="absolute inset-0 -z-10 rounded-full bg-inverted"
              :transition="{ type: 'spring', bounce: 0.18, duration: 0.55 }"
            />
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

      <div class="flex items-center gap-1">
        <UColorModeButton color="neutral" variant="ghost" size="lg" class="rounded-full" />
        <!-- dark, so the hero's blue "See my work" stays the one primary action -->
        <UButton to="#contact" color="neutral" trailing-icon="i-lucide-arrow-up-right" class="hidden sm:inline-flex">
          Let's talk
        </UButton>
        <UButton
          icon="i-lucide-menu"
          color="neutral"
          variant="ghost"
          size="lg"
          class="rounded-full md:hidden"
          aria-label="Open menu"
          @click="menuOpen = true"
        />
      </div>
    </Motion>

    <USlideover v-model:open="menuOpen" side="right" title="Menu" :ui="{ content: 'max-w-xs' }">
      <template #body>
        <ul class="flex flex-col gap-1">
          <Motion
            v-for="(link, i) in navLinks"
            :key="link.id"
            as="li"
            :initial="{ opacity: 0, x: 24 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.45, delay: 0.08 + i * 0.05, ease }"
          >
            <NuxtLink
              :to="`#${link.id}`"
              class="flex items-center gap-3 rounded-2xl px-3 py-3 text-2xl font-bold tracking-tight hover:bg-elevated"
              :class="active === link.id ? 'text-primary' : 'text-highlighted'"
              @click="menuOpen = false"
            >
              <span class="font-mono text-xs text-primary">0{{ i + 1 }}</span>
              {{ link.label }}
              <UIcon name="i-lucide-arrow-up-right" class="ml-auto size-5 text-muted" />
            </NuxtLink>
          </Motion>
        </ul>
        <Motion
          class="mt-6 space-y-2"
          :initial="{ opacity: 0, y: 12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.45, delay: 0.4, ease }"
        >
          <UButton to="#contact" block size="lg" color="neutral" trailing-icon="i-lucide-arrow-up-right" @click="menuOpen = false">
            Let's talk
          </UButton>
          <UButton :to="profile.resume" target="_blank" block size="lg" variant="outline" color="neutral" icon="i-lucide-file-down">
            Download resume
          </UButton>
        </Motion>
      </template>
    </USlideover>
  </header>
</template>
