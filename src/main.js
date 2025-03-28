import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.withCredentials = true;
import './index.css'

import {languages} from './i18n'
import {defaultLocale} from './i18n'
import {createI18n, useI18n} from 'vue-i18n'
import setupEcho from "./echo/setupEcho.js";

const messages = Object.assign(languages)

const savedLocale = localStorage.getItem('appLocale') || defaultLocale;

const i18n = createI18n({
  legacy: true,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
setupEcho();
app.use(router)
app.use(store)
app.use(i18n)
app.use(VueAxios, axios);

app.mount('#app')
