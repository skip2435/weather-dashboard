<template>
  <div class="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4 text-blue-600 animate-pulse">5-Day Weather Forecast</h1>

    <div class="flex items-center mb-4 space-x-4 w-4/5 sm:w-2/3 lg:w-1/2">
      <input v-model="city" placeholder="Enter city name" class="p-2 border rounded w-full">
      <button v-on:click="getForecast" class="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded transition duration-300 ease-in-out">
        Get Forecast
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" v-if="forecast">
      <div class="day-forecast transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110" v-for="(day, index) in forecast" :key="index">
        <div class="card bg-blue-100 p-6 rounded-lg shadow-2xl">
          <h2 class="text-2xl font-bold mb-2">{{index === 0 ? 'Today' : day.date}}</h2>

          <div class="weather-info flex items-center justify-center">
            <i class="wi wi-day-sunny text-6xl"></i> <!-- Replace with appropriate class -->
            <div class="ml-4">
              <h3 class="text-lg font-semibold">Temperature:</h3>
              <p class="text-xl font-semibold">{{day.temp}}°C</p>
              <h3 class="text-lg font-semibold">Feels Like:</h3>
              <p class="text-sm text-gray-500">{{day.feelsLike}}°C</p>
              <h3 class="text-lg font-semibold">Conditions:</h3>
              <p class="text-sm text-gray-500">{{day.conditions}}</p>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-lg font-semibold">Precipitation:</h3>
            <p class="text-sm text-gray-600">{{day.precipitation}}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "WeatherUI",
  data() {
    return {
      city: '',
      forecast: null
    };
  },
  methods: {
    async getForecast() {
      const response = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${this.city}?key=${import.meta.env.VITE_VISUAL_CROSSING_API_KEY}`);

      this.forecast = response.data.days.map(day => ({
        date: day.datetime,
        temp: day.temp,
        feelsLike: day.feelslike,
        conditions: day.description,
        precipitation: day.precipprob,
      }));
    }
  }
};
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

.container {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(to right, #a1c4fd, #c2e9fb);
}

h1 {
  text-shadow:
  2px 2px 4px rgba(0, 0, 0, 0.5);
}

.day-forecast {
  min-width: 200px;
}

button {
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}

button:active {
  transform: translateY(0);
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
}

input {
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
}
</style>
