<script setup lang="ts">
import { profile } from '~/data/portfolio'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="pb-10">
    <UContainer>
      <div class="flex flex-col items-center justify-between gap-4 border-t border-default pt-8 text-sm text-muted sm:flex-row">
        <p>© {{ year }} {{ profile.name }}</p>
        <p class="flex items-center gap-1.5">
          Built with
          <UIcon name="i-simple-icons-nuxt" class="size-4 text-primary" />
          Nuxt 4 &amp; Nuxt UI
        </p>
        <div class="flex items-center gap-1">
          <UButton
            v-for="s in profile.socials"
            :key="s.to"
            :to="s.to"
            target="_blank"
            :icon="s.icon"
            color="neutral"
            variant="ghost"
            size="sm"
            :aria-label="`${s.label}: ${s.handle}`"
          />
          <UButton to="#home" color="neutral" variant="ghost" size="sm" trailing-icon="i-lucide-arrow-up">
            Back to top
          </UButton>
        </div>
      </div>
    </UContainer>
  </footer>
</template>
