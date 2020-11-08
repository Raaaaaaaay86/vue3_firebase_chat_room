<template>
  <div>
    <div class="fixed w-full h-16 px-8 flex items-center bg-green-900 text-white">
      <h1 class="text-2xl font-semibold">
        The Vue Chat
      </h1>
      <p
        class="ml-auto cursor-pointer"
        @click.prevent="openProfileModal"
      >
        Edit Profile
      </p>
    </div>
    <div class="pt-16 h-screen grid grid-cols-12 text-white">
      <UserList />
      <ChatArea />
    </div>
  </div>
</template>

<script>
import UserList from '@/components/layouts/UserList.vue';
import ChatArea from '@/components/layouts/ChatArea.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    UserList,
    ChatArea,
  },
  setup() {
    const { dispatch, commit } = useStore();
    const openProfileModal = () => {
      const modalType = {
        type: 'editProfile',
        modalTopic: 'Edit Profile',
      };
      commit('modal/PROFILE_MODAL', modalType);
    };
    onMounted(() => {
      dispatch('realTimeMessages');
      dispatch('realTimeOnlineUsers');
    });
    return {
      openProfileModal,
    };
  },
};
</script>
