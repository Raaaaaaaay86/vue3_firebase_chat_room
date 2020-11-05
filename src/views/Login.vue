<template>
  <div class="h-screen flex flex-col justify-center items-center bg-gradient-to-tl from-green-700 to-green-500">
    <img width="250" :src="require('@/assets/imgs/logo.png')" alt="logo">
    <form class="mt-4 py-4 px-16 w-100 h-75 flex flex-col items-center border-4 border-white rounded-xl font-semibold text-white shadow-2xl">
        <h1 class="-mx-16 mb-2 text-3xl font-bold text-center">
          You're Invited<br>To The Chat Room
        </h1>
        <div class="w-full">
          <label for="email" class="block">
            Email
          </label>
          <input type="email" name="email" class="w-full h-8 rounded shadow">
        </div>
        <div class="w-full">
          <label for="password" class="block">
            Password
          </label>
          <input type="password" name="password" class="w-full h-8 rounded shadow">
        </div>
        <div class="w-full flex justify-evenly">
          <router-link to="/room">
            <v-button class="mt-4 rounded shadow">
              SIGN IN
            </v-button>
          </router-link>
          <router-link to="/room">
            <v-button class="mt-4 rounded shadow">
              SIGN UP
            </v-button>
          </router-link>
        </div>
    </form>
  </div>
</template>

<script>
export default {

};
</script>
