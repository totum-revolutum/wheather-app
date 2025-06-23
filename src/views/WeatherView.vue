<script setup>
import { ref, onMounted } from 'vue'
import WeatherWidget from '@/components/WeatherWidget.vue'

const numberOfCards = ref([Math.random()])
const favorites = ref([])
const maxWidgets = 5

const handleAddCard = () => {
  if (numberOfCards.value.length < maxWidgets) {
    numberOfCards.value.push(Math.random())
  }
}

const handleDeleteCard = (id) => {
  numberOfCards.value = numberOfCards.value.filter((card) => card !== id)
  if (numberOfCards.value.length === 0) {
    numberOfCards.value.push(Math.random())
  }
}

const handleStorage = (city, data) => {
  const exists = favorites.value.some((item) => item.city === city)
  if (favorites.value.length >= 5 || exists) return

  const updated = [...favorites.value, { city, data }]
  favorites.value = updated
  localStorage.setItem('favorites', JSON.stringify(updated))
}

onMounted(() => {
  const data = JSON.parse(localStorage.getItem('favorites')) || []
  favorites.value = data
})
</script>

<template>
  <button class="addNewCity" @click="handleAddCard">Додати ще місто</button>

  <WeatherWidget
    v-for="card in numberOfCards"
    :key="card"
    :id="card"
    @delete="handleDeleteCard"
    @save="handleStorage"
  />
</template>

<style scoped>
.addNewCity {
  margin: 20px 0;
  padding: 10px 15px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
