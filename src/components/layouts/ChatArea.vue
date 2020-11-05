<template>
  <div class="col-span-9 -mt-16 grid grid-cols-12 grid-rows-12 bg-green-800 max-h-screen">
    <div class="customScrollbar col-span-full row-span-10 overflow-auto">
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
      <MessageBubble />
    </div>
    <TextArea />
  </div>
</template>

<script>
import MessageBubble from '@/components/UI/MessageBubble.vue';
import TextArea from '@/components/layouts/TextArea.vue';

export default {
  components: {
    MessageBubble,
    TextArea,
  },
};
</script>
