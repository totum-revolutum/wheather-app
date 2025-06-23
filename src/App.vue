<script setup>
import { ref, computed } from 'vue'
import WeatherView from './views/WeatherView.vue'
import SelectedViews from './views/SelectedViews.vue'
import NotFound from './views/NotFound.vue'

const routes = {
  '/': WeatherView,
  '/selectedviews': SelectedViews,
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})
</script>

<template>
  <div id="app">
    <nav>
      <a class="cloud-button" href="#/">Погода</a> 
      <a class="cloud-button" href="#/selectedviews">Вибране</a>
    </nav>
    <component :is="currentView" />
  </div>
</template>

<style scoped>
#app {
  margin: 5%;
  font-family: Arial, sans-serif;
}

nav {
  display: flex;
  justify-content: center;
  gap: 3%;
}

a {
  text-decoration: none;
  font-weight: 700;
}

.cloud-button {
  background-color: #87ceeb;
  color: white;
  border: none;
  padding: 10px 38px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  border-radius: 50px;
  transition: background-color 0.5s ease;
}

.cloud-button:hover {
  background-color: #486c7a;
}

.cloud-button:hover::before,
.cloud-button:hover::after {
  background-color: #486c7a;
}
.cloud-button::before,
.cloud-button::after {
  content: '';
  background-color: #87ceeb;
  border-radius: 50%;
  position: absolute;
  transition: background-color 0.5s ease;
}

.cloud-button::before {
  width: 77px;
  height: 66px;
  top: -18px;
  right: 21px;
  z-index: -1;
}

.cloud-button::after {
  width: 57px;
  height: 56px;
  top: -10px;
  left: 11px;
  z-index: -1;
}
</style>
