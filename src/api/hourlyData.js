const API_KEY = '5b9492dc5c68adef606be1945f54b3c5'

export const fetchWeatherData = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ua`,
  )
  if (!res.ok) throw new Error('Не вдалося завантажити поточну погоду')
  return await res.json()
}

export const fetchForecastData = async (city) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ua`,
  )
  if (!res.ok) throw new Error('Не вдалося завантажити прогноз')
  const data = await res.json()

  const now = new Date().getDate()

  const todayItems = data.list.filter((item) => new Date(item.dt_txt).getDate() === now)
  const hourlyLabels = todayItems.map((item) =>
    new Date(item.dt_txt).toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' }),
  )
  const hourlyTemperatures = todayItems.map((item) => item.main.temp)

  const daysMap = {}
  data.list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]
    if (!daysMap[date]) daysMap[date] = []
    daysMap[date].push(item.main.temp)
  })

  const forecast5Days = Object.entries(daysMap)
    .slice(0, 5)
    .map(([date, temps]) => ({
      date,
      avgTemp: +(temps.reduce((sum, t) => sum + t, 0) / temps.length).toFixed(1),
    }))

  return {
    hourlyLabels,
    hourlyTemperatures,
    forecast5Days,
  }
}
