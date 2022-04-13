import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import httphelper from './assets/js/http.js';

const app = createApp(App)
app.config.globalProperties.$http = httphelper
app.use(Vant)
app.use(router)
app.mount('#app')
