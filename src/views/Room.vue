<template>
  <div>
    <div id="hambergur" class="fixed w-full h-16 px-8 flex items-center bg-green-900 text-white">
      <h1 class="text-2xl font-semibold">
        The Vue Chat
      </h1>
      <div class="ml-auto block sm:hidden">
        <i class="fas fa-2x fa-bars" />
      </div>
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
    const { dispatch } = useStore();
    onMounted(() => {
      dispatch('realTimeMessages');
      dispatch('realTimeOnlineUsers');
      const hambergur = document.getElementById('hambergur');
      const sideMenu = document.getElementById('sideMenu');
      hambergur.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
      });
    });
  },
};
</script>
