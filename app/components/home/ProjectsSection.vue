<script setup lang="ts">
import { projects, type Project } from '~/data/portfolio'

const selected = ref<Project | null>(null)
const open = computed({
  get: () => selected.value !== null,
  set: (v) => { if (!v) selected.value = null }
})
</script>

<template>
  <section id="work" class="py-16 sm:py-24 lg:py-28">
    <UContainer>
      <SectionHeading
        index="02"
        eyebrow="Selected work"
        title="Projects that solve local problems."
        description="Two full-stack systems built around maps and real users: a university office and commuters in Pampanga."
      />

      <div class="space-y-5 sm:space-y-8">
        <article
          v-for="(project, i) in projects"
          :key="project.slug"
          v-reveal
          class="tile tile-hover grid overflow-hidden lg:grid-cols-2"
        >
          <div class="relative" :class="i % 2 === 1 && 'lg:order-2'">
            <ProjectShot v-if="project.screenshot" :shot="project.screenshot" />
            <ProjectVisual v-else :variant="project.visual" />
          </div>

          <div class="flex flex-col p-6 sm:p-10 xl:p-12">
            <div class="flex flex-wrap items-center gap-2">
              <span class="eyebrow text-primary">0{{ i + 1 }}</span>
              <UBadge color="neutral" variant="subtle">{{ project.context }}</UBadge>
            </div>

            <h3 class="giant mt-6 text-5xl text-highlighted sm:mt-8 sm:text-7xl">{{ project.name }}</h3>
            <p class="mt-4 text-lg font-semibold text-pretty text-highlighted sm:text-xl">{{ project.tagline }}</p>
            <p class="mt-3 text-pretty text-muted">{{ project.summary }}</p>

            <ul class="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
              <li v-for="t in project.tech" :key="t">
                <UBadge color="primary" variant="soft" size="lg">{{ t }}</UBadge>
              </li>
            </ul>

            <div class="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8 sm:pt-10">
              <p class="text-sm text-muted">
                <span class="font-semibold text-highlighted">Role:</span> {{ project.role }}
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <UButton
                  v-for="link in project.links"
                  :key="link.to"
                  :to="link.to"
                  target="_blank"
                  :icon="link.icon"
                  color="neutral"
                  variant="outline"
                >
                  {{ link.label }}
                </UButton>
                <UButton
                  color="neutral"
                  class="shrink-0"
                  trailing-icon="i-lucide-arrow-up-right"
                  :aria-label="`Read the ${project.name} case study`"
                  @click="selected = project"
                >
                  Case study
                </UButton>
              </div>
            </div>
          </div>
        </article>
      </div>
    </UContainer>

    <UModal
      v-model:open="open"
      :title="selected?.name"
      :description="selected?.tagline"
      :ui="{ content: 'sm:max-w-2xl rounded-3xl', title: 'text-2xl font-extrabold tracking-tight' }"
    >
      <template #body>
        <div v-if="selected" class="space-y-8">
          <div class="overflow-hidden rounded-2xl">
            <ProjectShot v-if="selected.screenshot" :shot="selected.screenshot" class="min-h-0" />
            <ProjectVisual v-else :variant="selected.visual" class="min-h-64" />
          </div>

          <dl class="grid gap-4 sm:grid-cols-2">
            <div class="rounded-2xl bg-elevated p-4">
              <dt class="eyebrow text-muted">Role</dt>
              <dd class="mt-1 font-semibold text-highlighted">{{ selected.role }}</dd>
            </div>
            <div class="rounded-2xl bg-elevated p-4">
              <dt class="eyebrow text-muted">Context</dt>
              <dd class="mt-1 font-semibold text-highlighted">{{ selected.context }}</dd>
            </div>
          </dl>

          <!-- story: problem → what I built → result -->
          <ol class="relative space-y-8 border-l border-default pl-6">
            <li class="relative">
              <span class="absolute top-1 -left-[1.95rem] grid size-4 place-items-center rounded-full bg-default ring-2 ring-(--ui-border-accented)" aria-hidden="true" />
              <h4 class="eyebrow text-muted">The problem</h4>
              <p class="mt-2 text-pretty text-highlighted">{{ selected.problem }}</p>
            </li>
            <li class="relative">
              <span class="absolute top-1 -left-[1.95rem] grid size-4 place-items-center rounded-full bg-default ring-2 ring-primary" aria-hidden="true" />
              <h4 class="eyebrow text-muted">What I built</h4>
              <ul class="mt-3 space-y-3">
                <li v-for="h in selected.highlights" :key="h" class="flex gap-3 text-toned">
                  <UIcon name="i-lucide-check" class="mt-1 size-4 shrink-0 text-primary" />
                  {{ h }}
                </li>
              </ul>
            </li>
            <li class="relative">
              <span class="absolute top-1 -left-[1.95rem] size-4 rounded-full bg-brand" aria-hidden="true" />
              <h4 class="eyebrow text-muted">Result</h4>
              <p class="mt-2 text-pretty text-highlighted">{{ selected.outcome }}</p>
            </li>
          </ol>

          <div>
            <h4 class="eyebrow text-muted">Built with</h4>
            <ul class="mt-3 flex flex-wrap gap-2">
              <li v-for="t in selected.tech" :key="t">
                <UBadge color="primary" variant="soft">{{ t }}</UBadge>
              </li>
            </ul>
          </div>

          <div v-if="selected.links.length" class="flex flex-wrap gap-2">
            <UButton
              v-for="link in selected.links"
              :key="link.to"
              :to="link.to"
              target="_blank"
              :icon="link.icon"
              color="neutral"
            >
              {{ link.label }}
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </section>
</template>
