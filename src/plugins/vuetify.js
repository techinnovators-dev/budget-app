import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import colors from 'vuetify/util/colors'

const myCustomTheme = {
  dark: false,
  // defaults: {
  // },
  colors: {
    // background: '#FFFF00',
    surface: colors.yellow.lighten3,
    // 'surface-bright': '#FFFFFF',
    // 'surface-light': '#EEEEEE',
    // 'surface-variant': '#424242',
    // 'on-surface-variant': '#EEEEEE',
    // primary: '#1867C0',
    // 'primary-darken-1': '#1F5592',
    // secondary: '#48A9A6',
    // 'secondary-darken-1': '#018786',
    // error: '#B00020',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FB8C00',
  },
  variables: {
    // 'card-border-radius': 10
    // 'border-color': '#000000',
    // 'border-opacity': 0.12,
    // 'high-emphasis-opacity': 0.87,
    // 'medium-emphasis-opacity': 0.60,
    // 'disabled-opacity': 0.38,
    // 'idle-opacity': 0.04,
    // 'hover-opacity': 0.04,
    // 'focus-opacity': 0.12,
    // 'selected-opacity': 0.08,
    // 'activated-opacity': 0.12,
    // 'pressed-opacity': 0.12,
    // 'dragged-opacity': 0.08,
    // 'theme-kbd': '#212529',
    // 'theme-on-kbd': '#FFFFFF',
    // 'theme-code': '#F5F5F5',
    // 'theme-on-code': '#000000',
  }
}

export default createVuetify({
  // theme: {
  //   defaultTheme: 'myCustomTheme',
  //   themes: {
  //     myCustomTheme
  //   }
  // },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  display: {
    mobileBreakpoint: 'md'
  },
  defaults: {
    VTextField: { variant: 'underlined', density: 'comfortable', hideDetails: 'auto' },
    VSelect: { variant: 'underlined', density: 'comfortable', hideDetails: 'auto' },
    VRadioGroup: { density: 'comfortable', hideDetails: 'auto' },
    VCheckbox: { density: 'comfortable', hideDetails: 'auto' },
    VBtn: { density: 'comfortable' },
    VForm: { validateOn: 'blur'}
  }
})