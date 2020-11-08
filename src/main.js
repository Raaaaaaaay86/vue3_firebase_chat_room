/* eslint-disable no-console */
import { createApp } from 'vue';
import TimestampFilter from '@/filters/timestamp';
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

app.config.globalProperties.$filters = {
  timestamp: TimestampFilter,
};

// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     if (store.getters['auth/loginUser'].uid) {
//       next();
//     } else {
//       next('/');
//     }
//   } else {
//     next();
//   }
// });
