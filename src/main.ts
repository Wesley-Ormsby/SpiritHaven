import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import Tooltip from 'primevue/tooltip'
import FocusTrap from 'primevue/focustrap';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
    
    colorScheme: {
      light: {
        surface: {
          0: '#ffffff',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
        },
        content: {
          background: '{zinc.50}',
          borderColor: '{zinc.100}',
        },
        navigation: { item: { focus: { background: '{zinc.200}' } } },
      },
      dark: {
        surface: {
          0: '#000000',
          50: '{zinc.950}',
          100: '{zinc.900}',
          200: '{zinc.800}',
          300: '{zinc.700}',
          400: '{zinc.600}',
          500: '{zinc.500}',
          600: '{zinc.400}',
          700: '{zinc.300}',
          800: '{zinc.200}',
          900: '{zinc.100}',
          950: '{zinc.50}',
        },
        content: {
          background: '#000',
          borderColor: '{zinc.800}',
          color:"{zinc.200}",
          shadow: "0.4px 6px -1px rgba(255,255,255,0.1), 0 2px 4px -2px rgba(255,255,255,0.1)",
          hover: {
            background: '{zinc.900}',
            color: '{zinc.100}',
          }
        },
        navigation: {
          item: { focus: { background: '{zinc.800}', color: '{zinc.100}' }, color: '{zinc.300}' },
          submenu:{
            label: {
              color:'{zinc.200}'
            }
          }
        },
        overlay: {
          modal: {
            background: '{zinc.900}',
            borderColor: '{zinc.900}',
            color:'#ffffff'
          },
          select: {
            background: '{zinc.900}',
            borderColor: '{zinc.800}',
            color:'#ffffff',
            shadow: "0.4px 6px -1px rgba(255,255,255,0.1), 0 2px 4px -2px rgba(255,255,255,0.1)"
          },
          popover: {
            background: '{zinc.900}',
            color:"{zinc.100}",
            borderColor: "{zinc.700}"
          },
        },
        form: {
          field: {
            background: '{zinc.900}',
            color: '{zinc.100}',
            borderColor: '{zinc.500}',
            hover: {
              borderColor: '{zinc.300}'
            }
          }
        },
        list: {
          option: {
            color:"{zinc.100}",
            focus: {
              background:'{zinc.800}',
              color:"{zinc.50}",
            }
          },
        },
        // add new ones here
      },
    },
  },
})
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: '.my-app-dark',
    },
  },
})

app.use(router)
app.directive('tooltip', Tooltip)
app.directive('focustrap', FocusTrap);
app.mount('#app')
