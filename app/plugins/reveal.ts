import type { Directive } from 'vue'
import { animate, inView } from 'motion-v'

// v-reveal: fade + rise + un-blur when an element scrolls into view (Motion).
// Usage: <div v-reveal> or <div v-reveal="0.1"> for a delay in seconds.
// Server-rendered HTML is always fully visible; elements are only hidden on the client
// if they start below the fold, so nothing on screen ever flashes away.
type RevealEl = HTMLElement & { _revealStop?: () => void }

const ease = [0.22, 1, 0.36, 1] as const

const reveal: Directive<RevealEl, number | undefined> = {
  getSSRProps: () => ({}),

  mounted(el, binding) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(28px) scale(0.985)'
    el.style.filter = 'blur(6px)'

    el._revealStop = inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' },
          { duration: 0.8, delay: binding.value ?? 0, ease }
        ).then(() => {
          // hand transform back to CSS so hover lifts (.tile-hover) keep working
          el.style.transform = ''
          el.style.filter = ''
        })
        el._revealStop?.()
      },
      { margin: '0px 0px -10% 0px' }
    )
  },

  unmounted(el) {
    el._revealStop?.()
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
})
