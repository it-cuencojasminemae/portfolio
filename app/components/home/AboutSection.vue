<script setup lang="ts">
import { languages, profile, softSkills, stats, techLogos } from '~/data/portfolio'
</script>

<template>
  <section id="about" class="py-16 sm:py-24 lg:py-28">
    <UContainer>
      <SectionHeading
        index="01"
        eyebrow="About"
        title="Practical by habit, curious by default."
        description="I learned to code in class and learned to work behind a store counter. Both taught me to build things people can actually use."
      />

      <!-- bento grid -->
      <div class="grid gap-4 md:grid-cols-6 lg:grid-cols-12 lg:gap-5">
        <!-- profile -->
        <article v-reveal class="relative overflow-hidden rounded-[1.25rem] bg-strong p-6 text-on-strong ring-1 ring-white/5 sm:p-8 md:col-span-6 lg:col-span-7 lg:row-span-2 lg:p-10">
          <div aria-hidden="true" class="blob -top-24 -right-24 size-72 bg-brand/30" />
          <div class="relative flex h-full flex-col">
            <UIcon name="i-lucide-quote" class="size-8 text-strong-accent" />
            <p class="mt-5 text-lg leading-relaxed font-medium text-pretty sm:mt-6 sm:text-xl lg:text-2xl">
              {{ profile.summary }}
            </p>
            <div class="mt-auto pt-8 sm:pt-10">
              <p class="eyebrow text-on-strong-muted">What I bring</p>
              <ul class="mt-4 flex flex-wrap gap-2">
                <li
                  v-for="skill in softSkills"
                  :key="skill"
                  class="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-on-strong"
                >
                  {{ skill }}
                </li>
              </ul>
            </div>
          </div>
        </article>

        <!-- stats -->
        <article v-reveal="0.08" class="rounded-[1.25rem] bg-brand p-6 text-on-brand sm:p-8 md:col-span-6 lg:col-span-5">
          <dl class="grid grid-cols-2 gap-x-5 gap-y-7 sm:gap-x-6 sm:gap-y-8">
            <div v-for="stat in stats" :key="stat.label" class="flex flex-col-reverse">
              <dt class="mt-1 text-sm font-semibold">{{ stat.label }}</dt>
              <dd class="text-4xl font-extrabold tracking-tighter sm:text-5xl"><CountUp :value="stat.value" /></dd>
            </div>
          </dl>
        </article>

        <!-- location + local time -->
        <article v-reveal="0.12" class="tile relative overflow-hidden p-6 sm:p-8 md:col-span-3 lg:col-span-5">
          <!-- dotted map texture -->
          <div
            aria-hidden="true"
            class="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--ui-border-accented)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_left,black,transparent_75%)]"
          />
          <div class="relative flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-end md:flex-col md:items-start lg:flex-row lg:items-end">
            <div>
              <p class="eyebrow text-muted">Based in</p>
              <p class="mt-2 text-2xl font-bold tracking-tight text-highlighted">{{ profile.location }}</p>
              <p class="text-muted">{{ profile.country }}</p>
            </div>
            <div class="sm:text-right md:text-left lg:text-right">
              <p class="eyebrow text-muted">Local time</p>
              <p class="mt-2 text-2xl font-bold text-highlighted">
                <LocalTime :timezone="profile.timezone" />
              </p>
              <p class="text-muted">PHT · UTC+8</p>
            </div>
          </div>
        </article>

        <!-- languages -->
        <article v-reveal class="tile p-6 sm:p-8 md:col-span-3 lg:col-span-4">
          <UIcon name="i-lucide-languages" class="size-7 text-primary" />
          <p class="eyebrow mt-6 text-muted">I speak</p>
          <ul class="mt-3 space-y-1.5">
            <li v-for="lang in languages" :key="lang" class="flex items-center justify-between text-lg font-semibold text-highlighted">
              {{ lang }}
              <span class="text-xs font-medium text-muted">Fluent</span>
            </li>
          </ul>
        </article>

        <!-- education quick -->
        <article v-reveal="0.08" class="tile p-6 sm:p-8 md:col-span-3 lg:col-span-4">
          <UIcon name="i-lucide-graduation-cap" class="size-7 text-primary" />
          <p class="eyebrow mt-6 text-muted">Studying</p>
          <p class="mt-3 text-lg font-semibold text-highlighted">BS Information Technology</p>
          <p class="text-muted">St. Nicolas College of Business and Technology</p>
          <UBadge color="primary" variant="soft" class="mt-4">Class of 2027</UBadge>
        </article>

        <!-- currently -->
        <article v-reveal="0.16" class="tile p-6 sm:p-8 md:col-span-3 lg:col-span-4">
          <UIcon name="i-lucide-rocket" class="size-7 text-primary" />
          <p class="eyebrow mt-6 text-muted">Right now</p>
          <p class="mt-3 text-lg font-semibold text-highlighted">My thesis, IMAPSU, is finished and live</p>
          <p class="text-muted">Next up: an IT internship where I can ship real features.</p>
        </article>

        <!-- tech marquee -->
        <article v-reveal class="tile overflow-hidden py-6 md:col-span-6 lg:col-span-12">
          <p class="eyebrow px-6 text-muted sm:px-8">Tools I work with</p>
          <UMarquee pause-on-hover :overlay="true" class="mt-4" :ui="{ root: '[--gap:--spacing(10)] [--duration:35s] motion-reduce:[--duration:0s]' }">
            <div
              v-for="logo in techLogos"
              :key="logo.label"
              class="flex items-center gap-2.5 text-lg font-semibold whitespace-nowrap text-toned"
            >
              <UIcon :name="logo.icon" class="size-6" aria-hidden="true" />
              {{ logo.label }}
            </div>
          </UMarquee>
        </article>
      </div>
    </UContainer>
  </section>
</template>
