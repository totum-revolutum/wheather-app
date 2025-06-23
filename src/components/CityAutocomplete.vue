<script setup>
import { ref, watch, defineEmits } from 'vue'
import { searchCitiesLocal } from '../api/findCities'

const city = ref('')
const suggestions = ref([])
const loading = ref(false)
const citySelection = ref(false)
const emit = defineEmits(['update:city'])

const fetchSuggestions = async () => {
  if (citySelection.value || !city.value || city.value.length < 1) {
    suggestions.value = []
    return
  }

  loading.value = true
  try {
    suggestions.value = await searchCitiesLocal(city.value)
  } catch (err) {
    console.error('Error fetching suggestions:', err)
    suggestions.value = []
  } finally {
    loading.value = false
  }
}

const selectCity = (selectedCity) => {
  citySelection.value = true

  city.value = selectedCity
  suggestions.value = []
  emit('update:city', selectedCity)

  setTimeout(() => {
    citySelection.value = false
  }, 0)
}

watch(city, fetchSuggestions)
</script>

<template>
  <div class="search">
    <div class="search-desktop">
      <input
        v-model="city"
        @keyup.enter="selectCity(city)"
        placeholder="Введіть назву міста латинецею"
      />
      <button @click="selectCity(city)">Отримати погоду</button>
    </div>

    <div v-if="loading" class="loader">Завантаження...</div>

    <ul v-if="suggestions.length && !loading">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.id"
        @click="selectCity(suggestion.name)"
      >
        {{ suggestion.name }}, {{ suggestion.country }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search {
  position: relative;
}

.search-desktop {
  display: flex;
}

input {
  padding: 8px;
  margin-right: 10px;
  flex: 1;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  border-radius: 5%;
  color: white;
  border: none;
  cursor: pointer;
  flex: 1;
}

.loader {
  font-size: 14px;
  color: #666;
  padding: 5px;

  position: absolute;
  z-index: 11;
  background-color: rgba(255, 255, 255, 0.1);
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #2f6b32;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
  width: 50%;

  position: absolute;
  top: 90%;
}

li {
  cursor: pointer;
  padding: 5px;
  text-align: left;

  z-index: 10;
  background-color: rgba(255, 255, 255);
  border: 1px solid #ccc;
}

li:hover {
  background-color: #f0f0f0;
}
</style>
