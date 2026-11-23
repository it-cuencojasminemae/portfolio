<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <!-- reduced-motion "user": Motion skips movement for people who ask for less motion -->
    <MotionConfig reduced-motion="user">
      <NuxtPage />
    </MotionConfig>
  </UApp>
</template>
