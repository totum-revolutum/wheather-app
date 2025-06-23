<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import { getWeather } from '../api/weather'
import { fetchForecastData } from '../api/hourlyData'

import WeatherCard from './WeatherCard.vue'
import CityAutocomplete from './CityAutocomplete.vue'
import AlertModal from './modal/AlertModal.vue'
import Loader from './PreLoader.vue'

const props = defineProps({
  id: Number,
})

const emit = defineEmits(['delete', 'save'])

const city = ref('')
const weatherData = ref(null)
const iconUrl = ref('')
const loading = ref(false)
const error = ref(null)

const hourlyLabels = ref([])
const hourlyTemperatures = ref([])
const forecast5Days = ref([])

const isModalVisible = ref(false)

const closeModal = () => {
  isModalVisible.value = false
}

const fetchWeather = async () => {
  if (!city.value) return
  loading.value = true
  weatherData.value = null
  error.value = null

  try {
    const data = await getWeather(city.value)
    weatherData.value = data
    iconUrl.value = `http://openweathermap.org/img/wn/${data.icon}@2x.png`

    const forecast = await fetchForecastData(city.value)
    hourlyLabels.value = forecast.hourlyLabels
    hourlyTemperatures.value = forecast.hourlyTemperatures
    forecast5Days.value = forecast.forecast5Days
  } catch (err) {
    console.error('Error fetching weather data:', err)
    error.value = err
  } finally {
    loading.value = false
  }
}

const addToFavorites = () => {
  if (!weatherData.value) return
  emit('save', city.value, {
    ...weatherData.value,
    iconUrl: iconUrl.value,
    hourlyLabels: hourlyLabels.value,
    hourlyTemperatures: hourlyTemperatures.value,
    forecast5Days: forecast5Days.value,
  })
}

const handleDelete = () => {
  emit('delete', props.id)
}

watch(city, fetchWeather)
</script>

<template>
  <div class="weather">
    <CityAutocomplete v-model:city="city" />
    <h1>Погода в місті</h1>

    <div v-if="weatherData">
      <WeatherCard
        :city="weatherData.name"
        :description="weatherData.description"
        :temperature="weatherData.temperature"
        :humidity="weatherData.humidity"
        :speed="weatherData.speed"
        :iconUrl="iconUrl"
        :hourlyLabels="hourlyLabels"
        :hourlyTemperatures="hourlyTemperatures"
        :forecast5Days="forecast5Days"
      >
        <template #add-button>
          <button @click="addToFavorites">Додати в обране</button>
        </template>
      </WeatherCard>
    </div>

    <div v-else-if="loading">
      <p>Завантаження погоди...</p>
      <Loader />
    </div>

    <div v-else>
      <p>Виберіть місто</p>
    </div>

    <button @click="handleDelete">Видалити</button>

    <AlertModal :isVisible="isModalVisible" @close="closeModal" />
  </div>
</template>

<style scoped>
.weather {
  width: 444px;
  margin-bottom: 20px;
}

button {
  margin-top: 15px;
  padding: 10px 15px;
  background-color: #4caf50;
  border-radius: 5px;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #2f6b32;
}
</style>
