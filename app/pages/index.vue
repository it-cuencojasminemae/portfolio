<script setup lang="ts">
import { profile } from '~/data/portfolio'

useSeoMeta({
  title: `${profile.name} · ${profile.role}`,
  description: `${profile.title} from Pampanga, Philippines, building full-stack web apps with Nuxt, Strapi and PostgreSQL. ${profile.status}.`,
  ogTitle: `${profile.name} · ${profile.role}`,
  ogDescription: 'Full-stack web projects built with Nuxt, Strapi and PostgreSQL.',
  ogType: 'website'
})
</script>

<template>
  <div>
    <!-- first thing keyboard users reach: jumps past the nav -->
    <a
      href="#main"
      class="sr-only rounded-full bg-inverted px-5 py-3 font-semibold text-inverted focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
    >
      Skip to content
    </a>
    <AppHeader />
    <main id="main" tabindex="-1" class="outline-none">
      <HomeHeroSection />
      <HomeAboutSection />
      <HomeProjectsSection />
      <HomeSkillsSection />
      <HomeJourneySection />
      <HomeContactSection />
    </main>
    <AppFooter />
  </div>
</template>
