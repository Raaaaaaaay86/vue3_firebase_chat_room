<template>
  <div class="col-span-9 -mt-16 grid grid-cols-12 grid-rows-12 bg-green-800 max-h-screen">
    <div id="chatRoom" class="customScrollbar col-span-full row-start-2 row-span-9 overflow-auto">
      <template  v-for="(msg, i) in messages" :key="i">
          <MessageBubble :message="msg" />
      </template>
    </div>
    <TextArea />
  </div>
</template>

<script>
import MessageBubble from '@/components/UI/MessageBubble.vue';
import TextArea from '@/components/layouts/TextArea.vue';
import { useStore } from 'vuex';
import { computed, onUpdated } from 'vue';

export default {
  components: {
    MessageBubble,
    TextArea,
  },
  setup() {
    const { getters } = useStore();
    const messages = computed(() => getters.messages);
    onUpdated(() => {
      const chatRoom = document.getElementById('chatRoom');
      chatRoom.scrollTop = chatRoom.scrollHeight;
    });
    return {
      messages,
    };
  },
};
</script>
