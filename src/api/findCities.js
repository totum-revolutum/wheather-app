let cities = []

export const loadCities = async () => {
  if (cities.length) return cities

  const response = await fetch('/data/cities.json')
  cities = await response.json()
  return cities
}

export const searchCitiesLocal = async (query) => {
  const list = await loadCities()
  const lowerQuery = query.toLowerCase()

  const filtered = list.filter(
    (city) => city.name.toLowerCase().startsWith(lowerQuery) && city.country === 'UA',
  )

  return filtered.slice(0, 5)
}
