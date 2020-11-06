<template>
  <div class="h-screen flex flex-col justify-center items-center bg-gradient-to-tl from-green-700 to-green-500">
    <img width="250" :src="require('@/assets/imgs/logo.png')" alt="logo">
    <SignUpForm @toggle-form="toggleForm" v-if="isSignUp"/>
    <LoginForm @toggle-form="toggleForm" v-else/>
  </div>
</template>

<script>
import LoginForm from '@/components/layouts/login/LoginForm.vue';
import SignUpForm from '@/components/layouts/login/SignUpForm.vue';
import { ref } from 'vue';

export default {
  components: {
    LoginForm,
    SignUpForm,
  },
  setup() {
    const isSignUp = ref(false);
    const logInForm = ref(null);

    const toggleForm = (emitValue) => {
      isSignUp.value = emitValue;
    };
    return {
      isSignUp,
      logInForm,
      toggleForm,
    };
  },
};
</script>
