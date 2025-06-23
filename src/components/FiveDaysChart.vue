<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  forecast5Days: {
    type: Array,
    default: () => [],
  },
})

const chartRef = ref(null)
const chartInstance = ref(null)
const chartKey = ref(0)

const renderChart = () => {
  if (!chartRef.value || !props.forecast5Days?.length) return

  if (chartInstance.value) {
    chartInstance.value.destroy()
    chartInstance.value = null
  }

  const labels = props.forecast5Days.map(d => d.date)
  const temps = props.forecast5Days.map(d => d.avgTemp)

  const ctx = chartRef.value.getContext('2d')
  chartInstance.value = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Середня температура (°C)',
          data: temps,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: true },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => `${value}°C`,
          },
        },
      },
    },
  })
}

const updateChart = () => {
  nextTick(() => {
    if (props.forecast5Days?.length) {
      renderChart()
    }
  })
}

watch(
  () => props.forecast5Days,
  (newVal) => {
    if (newVal?.length) {
      updateChart()
    }
  },
  { deep: true }
)

onMounted(() => {
  updateChart()
  chartKey.value++
})

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>

<template>
  <div class="chart-container">
    <canvas
      ref="chartRef"
      :key="'chart-' + chartKey"
      width="400"
      height="200"
    ></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 200px;
}
</style>
