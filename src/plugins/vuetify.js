import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
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