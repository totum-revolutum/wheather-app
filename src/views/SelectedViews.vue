<script setup>
import { ref } from 'vue'
import WeatherCard from '../components/WeatherCard.vue'
import ConfirmationModal from '../components/modal/ConfirmationModal.vue'

const isModalVisible = ref(false)
const cityToRemove = ref('')
const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])

const removeFromFavorites = (city) => {
  favorites.value = favorites.value.filter((fav) => fav.city !== city)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}
const openModal = (city) => {
  cityToRemove.value = city
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
  cityToRemove.value = ''
}

const confirmDelete = (city) => {
  removeFromFavorites(city)
  closeModal()
}

const cancelDelete = () => {
  closeModal()
}
</script>

<template>
  <div>
    <h3>Обрані міста:</h3>
    <div class="not-selected" v-if="favorites.length === 0">Обране не вибране</div>
    <div class="weather" v-else>
      <WeatherCard
        v-for="favorite in favorites"
        :key="favorite.city"
        :city="favorite.city"
        :temperature="favorite.data.temperature"
        :description="favorite.data.description"
        :humidity="favorite.data.humidity"
        :speed="favorite.data.speed"
        :iconUrl="favorite.data.iconUrl"
        :hourlyLabels="favorite.data.hourlyLabels"
        :hourlyTemperatures="favorite.data.hourlyTemperatures"
        :forecast5Days="favorite.data.forecast5Days"
      >
        <template #delete-button>
          <button @click="openModal(favorite.city)">Видалити з обраного</button>
        </template>
      </WeatherCard>
    </div>

    <ConfirmationModal
      :isVisible="isModalVisible"
      :city="cityToRemove"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>

<style scoped>
.weather {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}
button {
  padding: 10px 15px;
  background-color: #af4c4c;
  border-radius: 5%;
  color: white;
  border: none;
  cursor: pointer;
  flex: 1;
}

button:hover {
  background-color: #a04545;
}

button:active {
  background-color: #471f1f;
}

.not-selected {
  color: #471f1f;
  border: 1px solid #ff0000;
  border-radius: 5px;
  padding: 5px;
  width: fit-content;
}
</style>
