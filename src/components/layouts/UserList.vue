<template>
  <div
    id="sideMenu"
    class="customScrollbar userList col-span-3 p-8 fixed sm:relative bg-green-700 shadow-xl overflow-auto"
  >
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
      <v-button
        class="mb-4 font-semibold rounded"
        @click.prevent="openProfileModal"
      >
        Edit Profile
      </v-button>
    </div>
    <template v-for="user in onlineUsers" :key="user.uid">
      <div>
        <UserStripe
          :user="user"
          v-if=" new Date().getTime() < user.expire"
        />
      </div>
    </template>
  </div>
</template>

<script>
import UserStripe from '@/components/UI/UserStripe.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { computed } from 'vue';

export default {
  components: {
    UserStripe,
  },
  setup() {
    const router = useRouter();
    const { dispatch, getters, commit } = useStore();
    const loginUser = computed(() => getters['auth/loginUser']);
    const onlineUsers = computed(() => getters.onlineUsers);

    const signOut = () => {
      dispatch('auth/logOut')
        .then(() => {
          commit('CLEAN_ONLINE_USER');
          router.push('/');
        });
    };

    const openProfileModal = () => {
      const modalType = {
        type: 'editProfile',
        modalTopic: 'Edit Profile',
      };
      commit('modal/PROFILE_MODAL', modalType);
    };
    return {
      signOut,
      loginUser,
      onlineUsers,
      openProfileModal,
    };
  },
};
</script>

<style lang="scss" scoped>
  .userList {
    @media (max-width: 640px) {
      height: 100%;
      width: 80%;
      transform: translateX(-100%);
      transition: all 0.3s;
      &.active {
        transform: translateX(0%);
      }
    }
  }
</style>
