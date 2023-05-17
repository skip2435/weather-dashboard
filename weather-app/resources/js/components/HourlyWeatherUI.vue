<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-4 text-center text-shadow">Hourly Weather Forecast</h1>

    <div class="flex justify-between items-center mb-4">
      <input v-model="city" placeholder="Enter city name" class="p-2 border rounded w-2/3">
      <button v-on:click="getForecast" class="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ease-in-out">
        Get Forecast
      </button>
    </div>

    <div id="map" style="width: 100%; height: 400px"></div>

    <div class="grid grid-cols-5 gap-4 mt-4" v-if="forecast">
      <div class="hour-forecast transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" v-for="(hour, index) in forecast" :key="index">
        <div class="card bg-white p-6 rounded-lg shadow-2xl">
          <h2 class="text-2xl font-bold mb-2">{{ new Date(hour.time).toLocaleTimeString() }}</h2>

          <div class="weather-info flex items-center justify-center">
            <font-awesome-icon :icon="['fas', getWeatherIcon(hour.conditions)]" class="text-6xl"/>
            <div class="ml-4">
              <h3 class="text-lg font-semibold">Temperature:</h3>
              <p class="text-xl font-semibold">{{hour.temp}}°C</p>
              <h3 class="text-lg font-semibold">Feels Like:</h3>
              <p class="text-sm text-gray-500">{{hour.feelsLike}}°C</p>
              <h3 class="text-lg font-semibold">Conditions:</h3>
              <p class="text-sm text-gray-500">{{hour.conditions}}</p>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-lg font-semibold">Precipitation:</h3>
            <p class="text-sm text-gray-600">{{hour.precipitation}}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

const mapboxAccessToken = import.meta.env.VITE_VUE_APP_MAPBOX_ACCESS_TOKEN;

export default {
  name: "HourlyWeatherUI",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      city: '',
      forecast: null,
      lon: null,
      lat: null
    };
  },
  methods: {
    getWeatherIcon(condition) {
      condition = condition.toLowerCase();
      if (condition.includes('clear')) {
        return 'sun';
      } else if (condition.includes('rain')) {
        return 'cloud-rain';
      } else if (condition.includes('cloudy')) {
        return 'cloud';
      } else if (condition.includes('snow')) {
        return 'snowflake';
      } else if (condition.includes('overcast')) {
        return 'cloud';
      } else {
        return 'question-circle'; // Fallback icon
      }
    },
    async getForecast() {
      const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.city}?key=${import.meta.env.VITE_VISUAL_CROSSING_API_KEY}`);
    
      this.forecast = response.data.days[0].hours.map(hour => ({
        time: new Date('1970-01-01T' + hour.datetime + 'Z'),
        temp: hour.temp,
        feelsLike: hour.feelslike,
        conditions: hour.conditions,
        precipitation: hour.precipprob,
      }));
    
      const mapboxResponse = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.city}.json?access_token=${mapboxAccessToken}`);
      if (mapboxResponse.data.features.length > 0) {
        this.lon = mapboxResponse.data.features[0].center[0];
        this.lat = mapboxResponse.data.features[0].center[1];
      }
      this.initMap();
    },
    initMap() {
      mapboxgl.accessToken = mapboxAccessToken;
      const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [this.lon, this.lat], // starting position [lng, lat]
        zoom: 9 // starting zoom
      });
    }
  }
};
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1.text-shadow {
  text-shadow: 0 3px 10px rgba(0,0,0,0.15);
  color: #ffffff;
}

.hour-forecast {
  min-width: 200px;
}

input {
  background-color: white;
  border: none;
  box-shadow: 0px 2px 5px rgba(0,0,0,0.15);
}

button {
  cursor: pointer;
  width: 200px;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0px 2px 5px rgba(0,0,0,0.15);
}

button:active {
  transform: translateY(1px);
  box-shadow: 0px 1px 2px rgba(0,0,0,0.15);
}

.card {
  border-radius: 15px;
  background-color: white;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  transition: 0.4s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 30px 30px -10px rgba(0, 0, 0, 0.3);
}
</style>

