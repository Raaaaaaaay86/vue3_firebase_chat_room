<template>
    <form
      class="mt-4 py-4 px-16 min-w-100 min-h-75 flex flex-col items-center border-4 border-white rounded-xl font-semibold text-white shadow-2xl"
      @submit.prevent="signIn"
    >
        <h1 class="-mx-16 mb-2 text-3xl font-bold text-center">
          PLEASE SIGN IN<br>To The Chat Room
        </h1>
        <div class="w-full">
          <label for="email" class="block">
            Email
          </label>
          <input v-model="email" type="email" name="email" class="text-green-900 w-full h-8 rounded shadow">
        </div>
        <div class="w-full">
          <label for="password" class="block">
            Password
          </label>
          <input v-model="password" type="password" name="password" class="text-green-900 w-full h-8 rounded shadow">
        </div>
        <div class="w-full flex justify-evenly">
          <v-button
            class="mt-4 rounded shadow"
            @click.prevent="changeToSignUp"
          >
            Create User
          </v-button>
          <v-button
            class="mt-4 rounded shadow"
            @click.prevent="signIn"
          >
            SIGN IN
          </v-button>
        </div>
    </form>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup(props, { emit }) {
    const { dispatch } = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const changeToSignUp = () => {
      emit('toggle-form', true);
    };

    const signIn = () => {
      const data = {
        email: email.value,
        password: password.value,
      };
      dispatch('auth/logIn', data)
        .then(() => router.push('/room'))
        .catch((err) => {
          alert(err);
        });
    };
    return {
      signIn,
      changeToSignUp,
      email,
      password,
    };
  },
};
</script>
