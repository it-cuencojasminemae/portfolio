<script setup lang="ts">
const props = defineProps<{ timezone: string }>()

const now = ref<Date | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  now.value = new Date()
  timer = setInterval(() => (now.value = new Date()), 30_000)
})
onBeforeUnmount(() => clearInterval(timer))

const time = computed(() =>
  now.value
    ? new Intl.DateTimeFormat('en-PH', { hour: 'numeric', minute: '2-digit', timeZone: props.timezone }).format(now.value)
    : '--:--'
)
</script>

<template>
  <span class="whitespace-nowrap tabular-nums">{{ time }}</span>
</template>
