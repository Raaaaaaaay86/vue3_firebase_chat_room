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
    </form>
    <div class="flex-grow flex justify-evenly">
      <div
        class="w-16 h-16 border-2 border-green-200 flex justify-center items-center rounded-full hover:bg-green-800 shadow-2xl hover:shadow-md"
        @click="sendMessage"
      >
        <i class="fas fa-1x fa-paper-plane mr-1"></i>
      </div>
      <div class="w-16 h-16 border-2 border-green-200 flex justify-center items-center rounded-full hover:bg-green-800 shadow-2xl hover:shadow-md">
        <i class="fas fa-1x fa-file-upload" />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
  setup() {
    const { dispatch } = useStore();
    const text = ref('');
    const sendMessage = () => {
      const data = {
        message: text.value,
      };
      dispatch('sendMessage', data);
      text.value = '';
    };

    return {
      text,
      sendMessage,
    };
  },
};
</script>
