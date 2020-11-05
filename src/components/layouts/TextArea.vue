<template>
  <div class="px-4 py-2 flex items-center col-span-full row-span-2 bg-green-600 text-white">
    <textarea
      placeholder="Say Something...."
      class="resize-none px-4 py-2 h-full w-10/12 rounded-md text-green-900 shadow-md outline-none"
    />
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

export default {
  setup() {
    const { dispatch } = useStore();
    const sendMessage = () => {
      dispatch('sendMessage', 'hello');
    };

    return {
      sendMessage,
    };
  },
};
</script>
