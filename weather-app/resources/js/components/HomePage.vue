<template>
  <div class="container mx-auto p-4 flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-4xl font-bold mb-4 text-blue-600 animate-pulse">Weather Forecast Home</h1>

    <div class="flex flex-col space-y-4 sm:space-y-0 sm:flex-row justify-around mt-8 w-4/5 sm:w-2/3 lg:w-1/2 sm:space-x-4">
      <router-link :to="{ name: 'WeatherUI' }" class="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition duration-300 ease-in-out w-full text-center">
        Daily Forecast
      </router-link>

      <router-link :to="{ name: 'HourlyWeatherUI' }" class="px-6 py-3 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg transition duration-300 ease-in-out w-full text-center">
        Hourly Forecast
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage"
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
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.router-link-exact-active {
  transform: scale(1.05);
}
</style>



