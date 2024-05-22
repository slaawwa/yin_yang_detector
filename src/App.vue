<script setup>
import { computed, onMounted, ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import api from './utils/api'

const SEX_KEY = 'mySex'
const SEX_MALE = '1'
const SEX_FAMALE = '0'

const version = ref('🕒')

const getSex = () => {
  let sex = SEX_MALE
  if (localStorage.getItem(SEX_KEY)) {
    sex = localStorage.getItem(SEX_KEY)
  } else {
    // sex = Math.random() > 0.5 ? SEX_MALE : SEX_FAMALE
    sex = `${parseInt(Math.random().toString()[2], 10) % 2}`
    localStorage.setItem(SEX_KEY, sex)
  }
  return sex === SEX_FAMALE ? SEX_FAMALE : SEX_MALE
}

const LOADING = 0
const BAD = 1
const GOOD = 2
const MSG = [
  'detecting...',
  'Looks like you\'re a potential maniac 😈',
  'Oh, you must be a good person 😇',
]

const sex = ref(getSex())
const status = ref(LOADING)
const msg = computed(() => {
  return MSG[status.value] || ''
})

const setTheme = (isDarkTheme = false) => {
  status.value = isDarkTheme ? GOOD : BAD
  document.body.classList.remove('no')
  if (isDarkTheme) {
    document.body.classList.remove('w')
  } else {
    document.body.classList.add('w')
  }
}

onMounted(() => {
  const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
  const isDarkTheme = darkThemeMq.matches
  setTimeout(() => {
    setTheme(isDarkTheme);
  }, 1500)
})

onMounted(() => {
  api.version().then(v => {
    version.value = v
  })
})

const toggleSex = () => {
  sex.value = sex.value === SEX_FAMALE ? SEX_MALE : SEX_FAMALE
  localStorage.setItem(SEX_KEY, sex.value)
}

const toggleMood = () => {
  const isDarkTheme = status.value === GOOD 
  setTheme(!isDarkTheme);
}

</script>

<template>
  <div>
    <a v-if="status === 0" href="#">
      <img src="/static/logo.jpg" class="logoLoading" alt="logo" />
    </a>
    <a v-else-if="status === 1" href="#">
      <img :src="`static/badly${sex}.jpg`" class="logo bad" alt="logo1" @dblclick="toggleSex" />
    </a>
    <a v-else href="#">
      <img :src="`static/goodness${sex}.jpg`" class="logo" alt="logo2" @dblclick="toggleSex" />
    </a>
  </div>
  <HelloWorld :msg="msg" :version="version" @toggleMood="toggleMood" />
</template>

<style scoped>
a {
  cursor: default;
}
.logo, .logoLoading {
  height: 16em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  box-shadow: 0 0 0 0 rgb(255, 255, 255);
	transform: scale(1);
  border-radius: 10%;
}
.logo {
  /* filter: drop-shadow(0 0 2em #646cffaa); */
  animation: pulseGood 2s infinite;
}
.logo.bad {
  /* filter: drop-shadow(0 0 2em #42b883aa); */
  animation: pulseBad 2s infinite;
}
.logoLoading {
  border-radius: 50%;
  animation: pulseGood 2s infinite;
}

@keyframes pulseGood {
	0% {
		/* transform: scale(0.95); */
		/* box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); */
    filter: drop-shadow(0 0 2em #42b883aa);
	}
  
	70% {
    /* transform: scale(1); */
    filter: drop-shadow(0 0 2em #42b88300);
		/* box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); */
	}
  
	100% {
    /* transform: scale(0.95); */
    filter: drop-shadow(0 0 2em #42b883aa);
		/* box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); */
	}
}
@keyframes pulseBad {
	0% {
		/* transform: scale(0.95); */
		/* box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7); */
    filter: drop-shadow(0 0 2em #ff0909aa);
	}
  
	70% {
    /* transform: scale(1); */
    filter: drop-shadow(0 0 2em #42b88300);
		/* box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); */
	}
  
	100% {
    /* transform: scale(0.95); */
    filter: drop-shadow(0 0 2em #ff0909aa);
		/* box-shadow: 0 0 0 0 rgba(0, 0, 0, 0); */
	}
}
</style>
