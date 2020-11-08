<template>
  <div class="px-4 py-2 flex items-center col-span-full row-span-2 bg-green-600 text-white">
    <form
      class="w-10/12 h-full"
      @keydown.enter.exact.prevent="sendMessage"
    >
      <textarea
        v-model="text"
        class="resize-none px-4 py-2 h-full w-full rounded-md text-green-900 shadow-md outline-none"
        placeholder="Say Something...."
      />
      <input ref="fileInput" type="file" accept="image/*" @change="uploadFile" hidden>
    </form>
    <div class="flex-grow flex justify-evenly">
      <div
        class="w-16 h-16 border-2 border-green-200 flex justify-center items-center rounded-full hover:bg-green-800 shadow-2xl hover:shadow-md cursor-pointer"
        @click="sendMessage"
      >
        <i class="fas fa-2x fa-paper-plane mr-1"></i>
      </div>
      <div
        class="w-16 h-16 border-2 border-green-200 flex justify-center items-center rounded-full hover:bg-green-800 shadow-2xl hover:shadow-md cursor-pointer"
        @click.prevent="$refs.fileInput.click()"
      >
        <i class="fas fa-2x fa-file-upload" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

export default {
  setup() {
    const { dispatch, getters, commit } = useStore();
    const text = ref('');
    const loginUser = computed(() => getters['auth/loginUser']);

    const sendMessage = () => {
      const data = {
        message: text.value,
        user: {
          uid: loginUser.value.uid,
          name: loginUser.value.nickName,
        },
      };
      dispatch('sendMessage', data);
      text.value = '';
    };

    const uploadFile = (e) => {
      dispatch('sendFile', { e, loginUser: loginUser.value })
        .catch(() => {
          const modal = {
            type: 'alert',
            message: 'Only Accpet File Type: "Image"',
            topic: 'ALERT',
          };
          commit('modal/ALERT_MODAL', modal);
        });
    };

    return {
      text,
      sendMessage,
      uploadFile,
      loginUser,
    };
  },
};
</script>
