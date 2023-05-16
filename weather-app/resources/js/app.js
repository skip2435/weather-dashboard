import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import './bootstrap';

import WeatherUI from './components/WeatherUI.vue';
import HomePage from './components/HomePage.vue';
import HourlyWeatherUI from './components/HourlyWeatherUI.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/daily-forecast',
        name: 'WeatherUI',
        component: WeatherUI
    },
    {
        path: '/hourly-forecast',
        name: 'HourlyWeatherUI',
        component: HourlyWeatherUI
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp({});

app.use(router);

app.mount('#app');
