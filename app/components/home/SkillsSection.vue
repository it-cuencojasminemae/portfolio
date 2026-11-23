<script setup lang="ts">
import { skillTiers } from '~/data/portfolio'

const [core, comfortable, familiar] = skillTiers

const coreLogos = [
  { label: 'Nuxt', icon: 'i-simple-icons-nuxt' },
  { label: 'Vue.js', icon: 'i-simple-icons-vuedotjs' },
  { label: 'TypeScript', icon: 'i-simple-icons-typescript' },
  { label: 'Strapi', icon: 'i-simple-icons-strapi' },
  { label: 'Node.js', icon: 'i-simple-icons-nodedotjs' },
  { label: 'PostgreSQL', icon: 'i-simple-icons-postgresql' }
]
</script>

<template>
  <section id="skills" class="py-16 sm:py-24 lg:py-28">
    <UContainer>
      <SectionHeading
        index="03"
        eyebrow="Toolkit"
        title="What I work with."
        description="Grouped by how well I know it, from the stack I build with to tools I've used in coursework."
      />

      <div class="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <!-- core stack: the one dark feature card -->
        <article v-if="core" v-reveal class="relative flex flex-col overflow-hidden rounded-[1.25rem] bg-strong p-6 text-on-strong ring-1 ring-white/5 sm:p-8 lg:col-span-7 lg:p-10">
          <div aria-hidden="true" class="blob -right-20 -bottom-24 size-72 bg-brand/25" />
          <div class="relative flex items-center gap-3">
            <span class="grid size-11 place-items-center rounded-2xl bg-brand text-on-brand">
              <UIcon :name="core.icon" class="size-5" />
            </span>
            <div>
              <h3 class="text-xl font-bold tracking-tight">{{ core.title }}</h3>
              <p class="text-sm text-on-strong-muted">{{ core.description }}</p>
            </div>
          </div>
          <div class="relative mt-7 grid gap-6 sm:mt-8 sm:grid-cols-2">
            <div v-for="group in core.groups" :key="group.label">
              <p class="eyebrow text-strong-accent">{{ group.label }}</p>
              <ul class="mt-3 flex flex-wrap gap-2">
                <li
                  v-for="item in group.items"
                  :key="item"
                  class="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm font-medium"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
          <ul class="relative mt-auto grid grid-cols-3 gap-2.5 pt-8 sm:grid-cols-6 sm:gap-3 sm:pt-10" aria-label="Core stack logos">
            <li
              v-for="logo in coreLogos"
              :key="logo.label"
              class="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-4 text-xs font-medium text-on-strong-muted transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10 motion-reduce:hover:translate-y-0"
            >
              <UIcon :name="logo.icon" class="size-7 text-on-strong" aria-hidden="true" />
              {{ logo.label }}
            </li>
          </ul>
        </article>

        <!-- comfortable with -->
        <article v-if="comfortable" v-reveal="0.08" class="tile p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div class="flex items-center gap-3">
            <span class="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UIcon :name="comfortable.icon" class="size-5" />
            </span>
            <div>
              <h3 class="text-xl font-bold tracking-tight text-highlighted">{{ comfortable.title }}</h3>
              <p class="text-sm text-muted">{{ comfortable.description }}</p>
            </div>
          </div>
          <div class="mt-7 space-y-5 sm:mt-8">
            <div v-for="group in comfortable.groups" :key="group.label">
              <p class="eyebrow text-muted">{{ group.label }}</p>
              <ul class="mt-2.5 flex flex-wrap gap-2">
                <li v-for="item in group.items" :key="item" class="rounded-full bg-elevated px-3 py-1.5 text-sm font-medium text-toned">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- also familiar -->
        <article v-if="familiar" v-reveal class="tile p-6 sm:p-8 lg:col-span-12 lg:p-10">
          <div class="flex items-center gap-3">
            <span class="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
              <UIcon :name="familiar.icon" class="size-5" />
            </span>
            <div>
              <h3 class="text-xl font-bold tracking-tight text-highlighted">{{ familiar.title }}</h3>
              <p class="text-sm text-muted">{{ familiar.description }}</p>
            </div>
          </div>
          <div class="mt-7 grid gap-6 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="group in familiar.groups" :key="group.label">
              <p class="eyebrow text-muted">{{ group.label }}</p>
              <ul class="mt-2.5 flex flex-wrap gap-2">
                <li v-for="item in group.items" :key="item" class="rounded-full bg-elevated px-3 py-1.5 text-sm font-medium text-toned">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </UContainer>
  </section>
</template>
