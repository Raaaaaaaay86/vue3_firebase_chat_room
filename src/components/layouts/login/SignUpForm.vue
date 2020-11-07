<template>
    <form
    class="mt-4 py-4 px-16 min-w-100 min-h-75 flex flex-col items-center border-4 border-white rounded-xl font-semibold text-white shadow-2xl"
    @submit.prevent="signUp"
    >
        <h1 class="-mx-16 mb-2 text-3xl font-bold text-center">
          Create Account
        </h1>
        <div class="w-full">
          <label for="nickName" class="block">
            Nickname
          </label>
          <input v-model="nickName" type="text" name="nickName" class="text-green-900 w-full h-8 rounded shadow">
        </div>
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
            @click.prevent="toSignIn"
          >
            BACK
          </v-button>
          <v-button
            class="mt-4 rounded shadow"
            @click.prevent="signUp"
          >
            SIGN UP
          </v-button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup(props, { emit }) {
    const { dispatch } = useStore();
    const nickName = ref('');
    const email = ref('');
    const password = ref('');

    const toSignIn = () => {
      emit('toggle-form', false);
    };

    const signUp = async () => {
      const data = {
        nickName: nickName.value,
        email: email.value,
        password: password.value,
      };
      console.log('eee');
      dispatch('auth/signUp', data)
        .then(() => toSignIn())
        .catch((err) => alert(err.message));
    };
    return {
      toSignIn,
      signUp,
      nickName,
      email,
      password,
    };
  },
};
</script>
