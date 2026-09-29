import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import LandingLayout from './LandingLayout.vue'
import './landing.css'

export default {
  extends: DefaultTheme,
  Layout: LandingLayout,
} satisfies Theme
