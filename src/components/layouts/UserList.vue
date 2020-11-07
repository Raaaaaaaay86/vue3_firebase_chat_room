<template>
  <div class="customScrollbar col-span-3 p-8 bg-green-700 shadow-xl overflow-auto">
    <div class="flex items-center justify-between">
      <h5 class="text-2xl font-extrabold">
        Online Users
      </h5>
      <div @click.prevent="signOut" class="cursor-pointer">
        <i class="fas fa-2x fa-sign-out-alt"/>
      </div>
    </div>
    <div class="-mx-8 px-8 border-b-2 border-green-200">
      <UserStripe :user="loginUser"/>
    </div>
    <template v-for="user in onlineUsers" :key="user.uid">
      <div>
        <UserStripe :user="user" v-if=" new Date().getTime() < user.expire" />
      </div>
    </template>
  </div>
</template>

<script>
import UserStripe from '@/components/UI/UserStripe.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  components: {
    UserStripe,
  },
  setup() {
    const { dispatch, getters } = useStore();
    const loginUser = computed(() => getters['auth/loginUser']);
    const onlineUsers = computed(() => getters.onlineUsers);
    const signOut = () => {
      dispatch('auth/logOut');
    };
    return {
      signOut,
      loginUser,
      onlineUsers,
    };
  },
};
</script>
