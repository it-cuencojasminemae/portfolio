// Tracks which page section is currently in the middle of the screen,
// so the header can highlight the matching link.
export function useActiveSection(ids: string[]) {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    for (const id of ['home', ...ids]) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
