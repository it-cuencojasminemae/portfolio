<script setup lang="ts">
import { profile } from '~/data/portfolio'

const toast = useToast()
const copied = ref(false)

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
    toast.add({ title: 'Email copied', description: profile.email, icon: 'i-lucide-check', color: 'primary' })
  }
  catch {
    toast.add({ title: 'Could not copy', description: profile.email, icon: 'i-lucide-x', color: 'error' })
  }
}

const rowClass = 'flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 transition-colors duration-300 hover:border-white/20 hover:bg-white/10 sm:gap-4 sm:p-4'
const linkClass = 'rounded font-medium underline-offset-4 hover:text-strong-accent hover:underline'
</script>

<template>
  <section id="contact" class="py-16 sm:py-24 lg:py-28">
    <UContainer>
      <div v-reveal class="@container relative isolate overflow-hidden rounded-[2rem] bg-strong px-5 pt-10 pb-4 text-on-strong ring-1 ring-white/5 sm:rounded-[2.5rem] sm:px-10 sm:pt-16 sm:pb-6 lg:px-14 lg:pt-20">
        <!-- still glow, no animation -->
        <div aria-hidden="true" class="blob -top-32 right-0 -z-10 size-[28rem] bg-brand/30" />

        <div class="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-7">
            <p class="eyebrow flex items-center gap-3 text-strong-accent">
              <span>05</span><span class="h-px w-10 bg-current" aria-hidden="true" /><span>Contact</span>
            </p>
            <h2 class="mt-5 text-[2.15rem] leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl">
              Looking for an intern who ships? Let's talk.
            </h2>
            <p class="mt-5 max-w-lg text-base text-pretty text-on-strong-muted sm:text-lg">
              I'm open to IT internships in web and full-stack development. Send me an email and I'll get back to you.
            </p>

            <div class="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:mt-10 sm:flex sm:flex-wrap">
              <UButton :to="`mailto:${profile.email}`" size="xl" icon="i-lucide-mail" class="justify-center">
                Email me
              </UButton>
              <UButton
                size="xl"
                color="neutral"
                variant="ghost"
                class="justify-center bg-white/5 text-on-strong ring-1 ring-white/20 ring-inset hover:bg-white/15 active:bg-white/15"
                :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
                @click="copyEmail"
              >
                {{ copied ? 'Copied' : 'Copy email' }}
              </UButton>
            </div>
          </div>

          <ul class="space-y-3 self-end lg:col-span-5">
            <li :class="rowClass">
              <UIcon name="i-lucide-mail" class="size-5 shrink-0 text-strong-accent" />
              <a :href="`mailto:${profile.email}`" class="truncate" :class="linkClass">{{ profile.email }}</a>
            </li>
            <li :class="rowClass">
              <UIcon name="i-lucide-map-pin" class="size-5 shrink-0 text-strong-accent" />
              <span class="font-medium">{{ profile.location }}, {{ profile.country }}</span>
            </li>
            <li :class="rowClass">
              <UIcon name="i-lucide-file-text" class="size-5 shrink-0 text-strong-accent" />
              <span class="flex flex-wrap gap-x-4">
                <a :href="profile.resume" target="_blank" :class="linkClass">Resume (PDF)</a>
                <a :href="profile.cv" target="_blank" :class="linkClass">CV (PDF)</a>
              </span>
            </li>
            <li v-for="s in profile.socials" :key="s.to" :class="rowClass">
              <UIcon :name="s.icon" class="size-5 shrink-0 text-strong-accent" />
              <a :href="s.to" target="_blank" rel="noopener" class="truncate" :class="linkClass">
                {{ s.label }} <span class="text-on-strong-muted">/ {{ s.handle }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- sized to the card (container units) so the whole phrase always fits -->
        <GiantText text="Let's talk" on-strong class="mt-12 text-[19cqw] sm:mt-16" />
      </div>
    </UContainer>
  </section>
</template>
