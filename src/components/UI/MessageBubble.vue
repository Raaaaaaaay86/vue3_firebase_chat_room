<template>
  <div class="py-2 px-4">
    <div class="flex flex-col">
      <p
        class="mx-2 mb-1 font-semibold select-none"
        :class=" message.uid === loginUser.uid ? 'text-right' : ''"
      >
        {{ message.name || 'Jaack' }} {{ $filters.timestamp(message.ts) }}
      </p>
      <div
        style="max-width: 60%"
        class="whitespace-pre-wrap break-words px-4 py-2 rounded-2xl inline text-green-900 bg-white"
        :class=" message.uid === loginUser.uid ? 'ml-auto' : 'mr-auto'"
      >
        <p v-if="message.type === 'msg'">
          {{ message.message }}
        </p>
        <div
          class="w-48 h-40 bg-cover bg-center bg-no-repeat rounded"
          :style="{'backgroundImage': 'url(' + message.fileURL + ')'}"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { getters } = useStore();
    const loginUser = computed(() => getters['auth/loginUser']);

    return {
      loginUser,
    };
  },
};
</script>
