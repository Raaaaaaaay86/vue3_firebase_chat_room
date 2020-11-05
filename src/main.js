import { createApp } from 'vue';
import Button from '@/components/UI/Button.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/index.css';

const app = createApp(App);
app.use(store);
app.use(router);
app.component('v-button', Button);
app.mount('#app');
