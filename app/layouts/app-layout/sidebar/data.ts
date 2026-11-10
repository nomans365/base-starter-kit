import LayoutGridIcon from '~/components/icons/layout/LayoutGridIcon.vue'
import GlobeIcon from '~/components/icons/layout/GlobeIcon.vue'
import type { NavItem } from './types'

export const navItems: NavItem[] = [
  {
    icon: LayoutGridIcon,
    name: 'Dashboard',
    path: '/',
  },
  {
    icon: GlobeIcon,
    name: 'Country Management',
    path: '/countries',
  },
]

export const othersItems: NavItem[] = [

]
