import { html } from 'lit'

import UnlitElement from '../util/unlit-element.js'
import { CloudCover, MoonPhase, Wind } from '../util/weather.js'


export default class SightingDetail extends UnlitElement {

  static properties = {
    sighting: { type: Object }
  }

  render() {

    const moonPhase = new MoonPhase(this.sighting.moonPhase)
    const cloudCover = new CloudCover(this.sighting.cloudCover)
    const wind = new Wind(this.sighting.windSpeed, this.sighting.windBearing)

    const title = this.#formatTitle(this.sighting)
    const date = this.#formatDate(this.sighting)
    const classification = this.sighting.classification
    const summary = this.sighting.summary

    const observed = this.sighting.observed

    const location = this.sighting.locationDetails
    const countyAndState = this.#formatCountyAndState(this.sighting)
    const coordinates = this.#formatCoordinates(this.sighting)
    const mapUrl = this.#formatMapUrl(this.sighting)

    const temperature = this.#formatTemperature(this.sighting.midTemp)
    const weatherIcon = this.#selectWeatherIcon(cloudCover.icon, this.sighting.precipitationType)

    const highLow = this.#formatHighLow(this.sighting)
    const humidity = this.#formatHumidity(this.sighting)
    const pressure = this.#formatPressure(this.sighting)
    const visibility = this.#formatVisibility(this.sighting)
    const dewPoint = this.#formatTemperature(this.sighting.dewPoint)
    const uvIndex = this.#formatUvIndex(this.sighting)

    const precipitationIcon = this.#selectPrecipitationIcon(this.sighting)
    const precipitationChance = this.#formatPrecipitationChance(this.sighting)

    return html`
      <div class="flex flex-row items-top pt-8 pr-64">

        <h1 class="flex-none text-3xl pl-6 pr-12 font-acme">👣 Bigfoot Finder</h1>

        <div class="flex flex-col items-left pb-96">

          <h1 class="text-3xl pr-24 pb-2">${title}</h1>

          <p>
            <span class="font-bold">Date:</span>
            <span>${date}</span>
          </p>
          <p>
            <span class="font-bold ">Classification:</span>
            <span>${classification}</span>
          </p>

          <p class="pt-1">${summary}</p>

          <h2 class="text-xl font-semibold pt-4">Eyewitness Account</h2>

          <p class="pt-1">${observed}</p>

          <h2 class="text-xl font-semibold pt-4">Location</h2>

          <p class="pt-1 pb-2">${location}</p>

          <p>
            <span class="font-bold">Location:</span>
            <span>${countyAndState}</span>
          </p>
          <p>
            <span class="font-bold">Coordinates:</span>
            <span>${coordinates}</span>
            <a href="${mapUrl}" target="_blank">🌎</a>
          </p>

          <h2 class="text-xl font-semibold pt-4">Weather</h2>

          <p class="pt-1">
            <span class="text-3xl pr-1">${temperature}</span>
            <span class="text-3xl pr-1">${weatherIcon}</span>
            <span>${this.sighting.weatherSummary}</span>
          </p>

          <div class="flex flex-row items-top w-1/2 pt-4">

            <div class="flex flex-col items-left w-full">
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">🌡️</p>
                <p class="min-w-24 font-semibold">High/Low</p>
                <p class="w-full text-right">${highLow}</p>
              </div>
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">${precipitationIcon}</p>
                <p class="min-w-24 font-semibold">Precipitation</p>
                <p class="w-full text-right">${precipitationChance}</p>
              </div>
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">💧</p>
                <p class="min-w-24 font-semibold">Humidity</p>
                <p class="w-full text-right">${humidity}</p>
              </div>
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">⏬</p>
                <p class="min-w-24 font-semibold">Pressure</p>
                <p class="w-full text-right">${pressure}</p>
              </div>
              <div class="flex flex-row items-top px-2 py-1">
                <p class="pr-3">👁️</p>
                <p class="min-w-24 font-semibold">Visibility</p>
                <p class="w-full text-right">${visibility}</p>
              </div>
            </div>

            <div class="flex flex-col items-left w-full ml-4">
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">💨</p>
                <p class="min-w-24 font-semibold">Wind</p>
                <p class="w-full text-right">${wind.text}</p>
              </div>
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">${cloudCover.icon}</p>
                <p class="min-w-24 font-semibold">Cloud Cover</p>
                <p class="w-full text-right">${cloudCover.text}</p>
              </div>
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">💧</p>
                <p class="min-w-24 font-semibold">Dew Point</p>
                <p class="w-full text-right">${dewPoint}</p>
              </div>
              <div class="flex flex-row items-top border-b px-2 py-1">
                <p class="pr-3">🧴</p>
                <p class="min-w-24 font-semibold">UV Index</p>
                <p class="w-full text-right">${uvIndex}</p>
              </div>
              <div class="flex flex-row items-top px-2 py-1">
                <p class="pr-3">${moonPhase.icon}</p>
                <p class="min-w-48 font-semibold">Moon Phase</p>
                <p class="w-full text-right">${moonPhase.text}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  }

  #formatTitle({ id, title }) {
    return `Report ${id}: ${title}`
  }

  #formatDate({ timestamp }) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC'
    }).format(new Date(timestamp * 1000))
  }

  #formatCountyAndState({ county, state }) {
    return `${county}, ${state}`
  }

  #formatCoordinates({ latitude, longitude }) {
    return `${latitude}, ${longitude}`
  }

  #formatMapUrl({ latitude, longitude }) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
  }

  #selectWeatherIcon(cloudCoverIcon, precipitationType) {
    if (precipitationType === 'rain') return '🌧️'
    else if (precipitationType === 'snow') return '🌨️'
    return cloudCoverIcon
  }

  #formatTemperature(temperature) {
    return `${Math.round(temperature)}°F`
  }

  #formatHighLow({ lowTemp, highTemp }) {
    return `${this.#formatTemperature(lowTemp)} / ${this.#formatTemperature(highTemp)}`
  }

  #formatHumidity({ humidity }) {
    return this.#formatPercentage(humidity)
  }

  #formatPressure({ pressure }) {
    return `${pressure} mb`
  }

  #formatVisibility({ visibility }) {
    return `${visibility} miles`
  }

  #formatUvIndex({ uvIndex }) {
    return `${uvIndex}`
  }

  #selectPrecipitationIcon({ precipitationType }) {
    return precipitationType === 'snow' ? '🌨️' : '🌧️'
  }

  #formatPrecipitationChance({ precipitationProbability }) {
    return this.#formatPercentage(precipitationProbability)
  }

  #formatPercentage(number) {
    return `${Math.round(number * 100)}%`
  }
}

customElements.define('sighting-detail', SightingDetail)
