<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SpiritAvatar from './components/SpiritAvatar.vue'
import {
  Moon,
  Sun,
  SunMoon,
  Menu as IconMenu,
  Search,
  FileSearch,
  UserSearch,
} from 'lucide-vue-next'
import Menu from 'primevue/menu'
import { computed, onMounted, ref } from 'vue'
import type { Display } from './scripts/types'
import { updateTheme, updateDisplay, display, theme } from './scripts/themeDisplay'
import { elementLongForm, SYMBOL_DATA } from './scripts/data'
import { signInWithDiscord, setupUser, signOut, user, userData } from './scripts/auth'
import router from './router'
import FaviconSVG from './components/svgs/FaviconSVG.vue'

const elementMenu = ref()
const navDropdownMenu = ref()
const searchDropdownMenu = ref()
const profileDropdownMenu = ref()
const elementMenuItems = ref([
  {
    label: 'Theme',
    items: [
      {
        label: 'sun',
        type: 'element',
        command: () => {
          updateTheme('s')
        },
      },
      {
        label: 'moon',
        type: 'element',
        command: () => {
          updateTheme('m')
        },
      },
      {
        label: 'fire',
        type: 'element',
        command: () => {
          updateTheme('f')
        },
      },
      {
        label: 'air',
        type: 'element',
        command: () => {
          updateTheme('a')
        },
      },
      {
        label: 'water',
        type: 'element',
        command: () => {
          updateTheme('w')
        },
      },
      {
        label: 'earth',
        type: 'element',
        command: () => {
          updateTheme('e')
        },
      },
      {
        label: 'plant',
        type: 'element',
        command: () => {
          updateTheme('p')
        },
      },
      {
        label: 'animal',
        type: 'element',
        command: () => {
          updateTheme('n')
        },
      },
    ],
  },
])
const dropdownMenuItems = computed(() => [
  {
    label: 'Profile',
    items:
      user.value == null
        ? [
            {
              label: 'Sign In / Sign Up',
              command: signInWithDiscord,
            },
          ]
        : profileDropdownItems.value,
  },
  {
    label: 'Search',
    items: searchDropdownItems.value,
  },
])
const searchDropdownItems = ref([
  {
    label: 'Articles',
    link: { name: 'searchArticle' }
  },
  {
    label: 'Users',
    link: { name: 'searchUser' }
  },
])
const profileDropdownItems = computed(()=>[
  {
    label: 'Profile',
    link: userData.value ? { name: 'profile', params: { id: userData.value.id } } : ""
  },
  {
    label: 'Logout',
    command: signOut,
  },
])

function changeDisplay() {
  const circleSwap: Record<Display, Display> = {
    light: 'dark',
    dark: 'system',
    system: 'light',
  }
  updateDisplay(circleSwap[display.value])
}

const toggle = (event: Event) => {
  elementMenu.value.toggle(event)
}
const toggleDropdown = (event: Event) => {
  navDropdownMenu.value.toggle(event)
}
const toggleSearchDropdown = (event: Event) => {
  searchDropdownMenu.value.toggle(event)
}
const toggleProfileDropdown = (event: Event) => {
  profileDropdownMenu.value.toggle(event)
}

// AUTH
onMounted(setupUser)
</script>

<template>
  <nav>
    <RouterLink to="/" class="home nav-button">
      <FaviconSVG></FaviconSVG>
      SpiritHaven</RouterLink
    >
    <div class="nav-items">
      <div
        class="nav-button"
        @click="changeDisplay"
        v-tooltip="{
          value: display,
          showDelay: 1000,
          pt: { text: { style: { 'font-size': '10px', padding: '4px' } } },
        }"
        :key="display"
      >
        <Sun v-if="display == 'light'"></Sun>
        <Moon v-else-if="display == 'dark'"></Moon>
        <SunMoon v-else></SunMoon>
      </div>
      <div class="nav-button" @click="toggle" :key="display" aria-controls="element_menu">
        <img :src="SYMBOL_DATA[elementLongForm[theme]]" :key="theme" />
      </div>
      <Menu ref="elementMenu" id="element_menu" :model="elementMenuItems" :popup="true">
        <template #item="{ item }">
          <div class="theme-menu-option">
            <img :alt="item.label as string" :src="SYMBOL_DATA[item.label as string]" />
            <div>{{ item.label }}</div>
          </div>
        </template>
      </Menu>
      <div class="nav-links">
        <div class="nav-button" @click="toggleSearchDropdown" aria-controls="search_dropdown_menu">
          <Search style="fill: none"> </Search>
          <div>Search</div>
        </div>
        <Menu
          ref="searchDropdownMenu"
          id="search_dropdown_menu"
          :model="searchDropdownItems"
          :popup="true"
        >
        <template #item="{item}">
          <RouterLink class="p-menu-item-link" :to="item.link" v-if="item.link">{{ item.label }}</RouterLink>
          <span v-else class="p-menu-item-link">{{ item.label }}</span>
        </template>
        </Menu>
        <div
          v-if="userData == null"
          class="nav-button"
          @click="signInWithDiscord"
          :key="String(user)"
        >
          Sign In / Sign Up
        </div>
        <div
          v-else
          class="nav-button"
          @click="toggleProfileDropdown"
          aria-controls="profile_dropdown_menu"
        >
          <div class="profile-image-container">
            <SpiritAvatar :spirit="userData.spirit"></SpiritAvatar>
          </div>
          Profile
        </div>
        <Menu
          ref="profileDropdownMenu"
          id="profile_dropdown_menu"
          :model="profileDropdownItems"
          :popup="true"
        >
        <template #item="{item}">
          <RouterLink class="p-menu-item-link" :to="item.link" v-if="item.link">{{ item.label }}</RouterLink>
          <span v-else class="p-menu-item-link">{{ item.label }}</span>
        </template>
        </Menu>
      </div>
      <div class="menu-dropdown">
        <div class="nav-button" @click="toggleDropdown" aria-controls="dropdown_menu">
          <IconMenu></IconMenu>
        </div>
        <Menu ref="navDropdownMenu" id="dropdown_menu" :model="dropdownMenuItems" :popup="true">
          <template #submenuheader="{ item }">
            <span
              class="menu-label"
            >
    
              {{item.label == 'Profile' && userData != null ? userData.username : item.label }}
            </span>
          </template>
          <template #item="{item}">
          <RouterLink class="p-menu-item-link" :to="item.link" v-if="item.link">{{ item.label }}</RouterLink>
          <span v-else class="p-menu-item-link">{{ item.label }}</span>
        </template>
        </Menu>
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
a:hover {
  background-color: transparent;
}
nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  background-color: var(--p-surface-200);
  padding: 10px;
  border-bottom: 0.5px solid var(--p-surface-300);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
}
.nav-items,
.nav-links {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: row;
}
.nav-button {
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  background-color: var(--p-surface-200);
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--p-primary-500);
}
.nav-button:hover {
  transition:0.4s;
  background-color: var(--p-surface-300);
}
.nav-button svg {
  stroke-width: 1.5px;
}
.nav-button img,
.nav-button svg {
  width: 25px;
  fill: var(--p-primary-500);
}
.menu-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--p-primary-500);
  max-width: 180px;
  font-weight: bold;
}
.theme-menu-option {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  padding: 5px;
  cursor: pointer;
}
.theme-menu-option img {
  width: 25px;
}
.profile-image-container {
  width: 30px;
  height: 30px;
}
.p-menu-item-link {
  padding:0.3rem 0.6rem;
}

.home {
  display: flex;
  align-items: center;
  * {
    text-decoration: none;
  }
}
.menu-dropdown {
  display: none;
}
@media screen and (max-width: 660px) {
  .menu-dropdown {
    display: block;
  }
  .nav-links {
    display: none;
  }
}
</style>
