<script setup lang="ts">
import { certifications, education, experience } from '~/data/portfolio'

const educationItems = education.map(e => ({
  date: e.date,
  title: e.title,
  description: e.place,
  icon: e.icon
}))

const kindIcon: Record<string, string> = {
  Certificate: 'i-simple-icons-cisco',
  Participant: 'i-lucide-bike',
  Hackathon: 'i-lucide-trophy'
}

// certificate viewer
const viewing = ref<number | null>(null)
const current = computed(() => (viewing.value === null ? null : certifications[viewing.value]))
const viewerOpen = computed({
  get: () => viewing.value !== null,
  set: (v) => { if (!v) viewing.value = null }
})
function step(dir: 1 | -1) {
  if (viewing.value === null) return
  viewing.value = (viewing.value + dir + certifications.length) % certifications.length
}
</script>

<template>
  <section id="journey" class="py-16 sm:py-24 lg:py-28">
    <UContainer>
      <SectionHeading
        index="04"
        eyebrow="Journey"
        title="Experience, school & certifications."
      />

      <div class="grid gap-4 lg:grid-cols-12 lg:gap-5">
        <!-- experience -->
        <article v-reveal class="tile p-6 sm:p-8 lg:col-span-7 lg:p-10">
          <p class="eyebrow text-muted">Experience</p>
          <div v-for="job in experience" :key="job.title" class="mt-6">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="flex items-center gap-4">
                <span class="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary sm:size-12">
                  <UIcon :name="job.icon" class="size-6" />
                </span>
                <div>
                  <h3 class="text-lg font-bold tracking-tight text-highlighted sm:text-xl">{{ job.title }}</h3>
                  <p class="text-muted">{{ job.place }}</p>
                </div>
              </div>
              <UBadge color="neutral" variant="subtle" size="lg">{{ job.date }}</UBadge>
            </div>
            <ul class="mt-6 space-y-3">
              <li v-for="p in job.points" :key="p" class="flex gap-3 text-toned">
                <span class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {{ p }}
              </li>
            </ul>
          </div>
        </article>

        <!-- education -->
        <article v-reveal="0.08" class="tile p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <p class="eyebrow text-muted">Education</p>
          <UTimeline
            :items="educationItems"
            :default-value="0"
            color="primary"
            class="mt-6"
            :ui="{ title: 'text-base font-bold text-highlighted', description: 'text-muted', date: 'eyebrow text-[0.7rem]' }"
          />
        </article>

        <!-- certifications -->
        <div class="lg:col-span-12">
          <p class="eyebrow mt-8 mb-4 text-muted sm:mt-10 sm:mb-5">Certifications & events</p>
          <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            <li
              v-for="(cert, i) in certifications"
              :key="cert.title"
              v-reveal="(i % 3) * 0.08"
              class="tile tile-hover group relative flex flex-col overflow-hidden"
            >
              <!-- certificate preview -->
              <div class="bg-muted p-4 pb-0">
                <NuxtImg
                  :src="cert.image"
                  alt=""
                  width="800"
                  height="555"
                  sizes="100vw sm:50vw lg:400px"
                  format="webp"
                  loading="lazy"
                  class="aspect-[3/2] w-full rounded-t-xl object-cover object-top shadow-sm ring-1 ring-default transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none"
                />
              </div>

              <div class="flex flex-1 flex-col p-5 sm:p-6">
                <div class="flex items-center justify-between gap-3">
                  <span class="grid size-9 place-items-center rounded-xl bg-elevated text-primary">
                    <UIcon :name="kindIcon[cert.kind] ?? 'i-lucide-award'" class="size-4" />
                  </span>
                  <span class="eyebrow text-[0.7rem] text-muted">{{ cert.date }}</span>
                </div>
                <h3 class="mt-4 font-bold text-pretty text-highlighted">{{ cert.title }}</h3>
                <p class="mt-1 text-sm text-muted">{{ cert.issuer }}</p>
                <div class="mt-auto flex items-center justify-between gap-3 pt-5">
                  <UBadge :color="cert.kind === 'Certificate' ? 'primary' : 'neutral'" variant="soft">
                    {{ cert.kind }}
                  </UBadge>
                  <!-- the ::after stretches this button over the whole card, so the card is one big click target -->
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 rounded-full text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-[1.25rem] after:content-['']"
                    :aria-label="`View certificate: ${cert.title}`"
                    @click="viewing = i"
                  >
                    View
                    <UIcon name="i-lucide-maximize-2" class="size-3.5" />
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </UContainer>

    <!-- certificate viewer -->
    <UModal
      v-model:open="viewerOpen"
      :title="current?.title"
      :description="current ? `${current.issuer} · ${current.date}` : undefined"
      :ui="{ content: 'sm:max-w-4xl rounded-[1.25rem]', title: 'text-xl font-extrabold tracking-tight text-pretty' }"
    >
      <template #body>
        <div v-if="current" class="space-y-5">
          <div class="overflow-hidden rounded-[0.75rem] bg-muted ring-1 ring-default">
            <NuxtImg
              :key="current.image"
              :src="current.image"
              :alt="`Certificate: ${current.title}, awarded to Jasmine Mae Cuenco`"
              width="1600"
              sizes="100vw lg:900px"
              format="webp"
              class="mx-auto max-h-[58vh] w-auto object-contain"
            />
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <p v-if="current.certId" class="font-mono text-xs text-muted">
              Cert ID: <span class="select-all text-toned">{{ current.certId }}</span>
            </p>
            <span v-else />
            <div class="flex flex-wrap items-center gap-2">
              <UButton
                v-if="current.verify"
                :to="current.verify"
                target="_blank"
                color="neutral"
                variant="outline"
                icon="i-lucide-badge-check"
              >
                Verify
              </UButton>
              <UButton :to="current.pdf" target="_blank" color="neutral" icon="i-lucide-file-text">
                Open PDF
              </UButton>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="flex w-full items-center justify-between">
          <UButton color="neutral" variant="ghost" icon="i-lucide-arrow-left" aria-label="Previous certificate" @click="step(-1)">
            Previous
          </UButton>
          <span class="font-mono text-xs text-muted">{{ (viewing ?? 0) + 1 }} / {{ certifications.length }}</span>
          <UButton color="neutral" variant="ghost" trailing-icon="i-lucide-arrow-right" aria-label="Next certificate" @click="step(1)">
            Next
          </UButton>
        </div>
      </template>
    </UModal>
  </section>
</template>
