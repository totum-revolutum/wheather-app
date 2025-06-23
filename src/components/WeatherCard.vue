<script setup>
import { defineProps, ref } from 'vue'
import FiveDaysChart from './FiveDaysChart.vue'
import OneDayChart from './OneDayChart.vue'

defineProps({
  city: String,
  description: String,
  temperature: Number,
  humidity: Number,
  speed: Number,
  iconUrl: String,
  hourlyLabels: {
    type: Array,
    default: () => [],
  },
  hourlyTemperatures: {
    type: Array,
    default: () => [],
  },
  forecast5Days: {
    type: Array,
    default: () => [],
  },
})

const activeTab = ref('one')
</script>

<template>
  <div class="weather-card">
    <div class="title">
      <h2>{{ city }}</h2>
      <img :src="iconUrl" alt="weather icon" v-if="iconUrl" />
    </div>
    <p>{{ description }}</p>
    <p><strong>Температура:</strong> {{ Math.round(temperature) }} °C</p>
    <p><strong>Вологість:</strong> {{ humidity }}%</p>
    <p><strong>Вітер:</strong> {{ speed }} м/с</p>

    <div class="tabs">
      <button :class="{ active: activeTab === 'one' }" @click="activeTab = 'one'" type="button">
        1 день
      </button>
      <button :class="{ active: activeTab === 'five' }" @click="activeTab = 'five'" type="button">
        5 днів
      </button>
    </div>

    <div v-if="activeTab === 'one' && hourlyLabels.length && hourlyTemperatures.length">
      <OneDayChart :hourly-labels="hourlyLabels" :hourly-temperatures="hourlyTemperatures" />
    </div>
    <div v-else-if="activeTab === 'five' && forecast5Days.length">
      <FiveDaysChart :forecast5Days="forecast5Days" />
    </div>

    <slot name="delete-button"></slot>
    <slot name="add-button"></slot>
  </div>
</template>

<style scoped>
.weather-card {
  text-align: center;
  background-color: #acdff1;
  width: 300px;
  padding: 15px;
  border-radius: 5%;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  margin: 0 20px;
}

p {
  font-size: 1.2em;
}

.tabs {
  display: flex;
  gap: 10px;
  margin: 15px 0;
  justify-content: center;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background: #eee;
  transition: background-color 0.3s;
}

button.active {
  background: #cdeffd;
  font-weight: bold;
}
</style>
