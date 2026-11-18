import LayoutGridIcon from '~/components/icons/layout/LayoutGridIcon.vue'
import GlobeIcon from '~/components/icons/layout/GlobeIcon.vue'
import PageIcon from '~/components/icons/layout/PageIcon.vue'
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
  {
    icon: PageIcon,
    name: 'Generic FAQs',
    path: '/faqs/categories',
  },
]

export const othersItems: NavItem[] = [

]
