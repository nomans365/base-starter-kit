<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRTL } from '@/composables/useRTL'
import {
  ChevronDownIcon,
  GearIcon,
  GlobeIcon,
  InfoCircleIcon,
  LogOutIcon,
  UserCircleIcon,
} from '@/icons/layout'
import { cn } from '@/utils/cn'

interface Language {
  id: string
  name: string
  shortName: string
  flag: string
  dir: 'ltr' | 'rtl'
  badge?: string
}

const languages: Language[] = [
  { id: 'en', name: 'English', shortName: 'English', flag: 'flag-us.svg', dir: 'ltr' },
  {
    id: 'ar',
    name: 'Arabic (Saudi)',
    shortName: 'Arabic',
    flag: 'flag-sa.svg',
    dir: 'rtl',
    badge: 'RTL',
  },
  { id: 'es', name: 'Español', shortName: 'Español', flag: 'flag-es.svg', dir: 'ltr' },
  { id: 'de', name: 'Deutsch', shortName: 'Deutsch', flag: 'flag-de.svg', dir: 'ltr' },
]

const { isRtl, setRTL } = useRTL()
const isOpen = ref(false)
const currentLocale = ref<string>(isRtl.value ? 'ar' : 'en')
const currentLang = computed<Language>(
  () => languages.find((l) => l.id === currentLocale.value) ?? languages[0],
)

const handleSelectLanguage = (id: string) => {
  const language = languages.find((l) => l.id === id)
  if (!language) return
  currentLocale.value = id
  setRTL(language.dir === 'rtl')
}
</script>

<template>
  <DropdownMenu :open="isOpen" @update:open="isOpen = $event">
    <DropdownMenuTrigger class="dropdown-toggle flex items-center text-gray-700 dark:text-gray-400">
      <span class="me-3 h-11 w-11 overflow-hidden rounded-lg">
        <img width="44" height="44" src="/images/user/owner.png" alt="User" />
      </span>

      <span class="me-1 block text-sm font-medium">Musharof</span>

      <ChevronDownIcon
        :class="
          cn(
            'size-5 text-gray-500 duration-200 dark:text-gray-400',
            isOpen ? 'rotate-180' : 'rotate-0',
          )
        "
      />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" :side-offset="12" class="w-65 p-3">
      <div class="px-3 py-2">
        <span class="block text-sm font-medium text-gray-700 dark:text-gray-400">
          Musharof Chowdhury
        </span>
        <span class="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">
          randomuser@pimjo.com
        </span>
      </div>

      <DropdownMenuSeparator />

      <DropdownMenuItem variant="destructive" to="/signin">
        <LogOutIcon />
        Sign out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
