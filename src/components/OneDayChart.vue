<script setup>
import { ref, watchEffect, onBeforeUnmount, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  hourlyLabels: {
    type: Array,
    default: () => [],
  },
  hourlyTemperatures: {
    type: Array,
    default: () => [],
  },
})

const chartRef = ref(null)
let chartInstance = null

const renderChart = async () => {
  await nextTick()

  const canvas = chartRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.hourlyLabels,
      datasets: [
        {
          label: 'Температура (°C)',
          data: props.hourlyTemperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
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

watchEffect(() => {
  if (chartRef.value && props.hourlyLabels.length && props.hourlyTemperatures.length) {
    renderChart()
  }
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
})
</script>

<template>
  <div>
    <canvas ref="chartRef" width="400" height="200"></canvas>
  </div>
</template>
