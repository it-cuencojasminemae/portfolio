// Theme for every Nuxt UI component.
// "glacier" and "basalt" are the custom palettes defined in assets/css/main.css.
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'glacier',
      neutral: 'basalt'
    },
    button: {
      slots: {
        base: 'rounded-full font-semibold'
      },
      compoundVariants: [
        // Solid primary buttons keep the true Glacier Blue with Black Basalt text (6.7:1)
        {
          color: 'primary',
          variant: 'solid',
          class: 'bg-brand text-on-brand hover:bg-glacier-400 active:bg-glacier-400 disabled:bg-brand aria-disabled:bg-brand'
        }
      ]
    },
    badge: {
      slots: {
        base: 'rounded-full'
      }
    }
  }
})
