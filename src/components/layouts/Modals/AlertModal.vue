<template>
  <div class="flex text-center justify-center items-center text-2xl">
    {{ message || '' }}
  </div>
  <div class="pt-1 flex justify-center">
    <v-button
      class=" text-green-400 border border-green-500 rounded"
      @click.prevent="closeModal"
    >
      Close
    </v-button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const { commit, getters } = useStore();
    const message = computed(() => getters['modal/message']);
    const closeModal = () => {
      commit('modal/CLOSE_MODAL');
    };
    return {
      closeModal,
      message,
    };
  },
};
</script>
