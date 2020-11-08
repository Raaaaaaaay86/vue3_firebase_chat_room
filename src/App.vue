<template>
<div>
  <Modal v-if="showModal" :modal-name="modalName" />
  <router-view />
</div>
</template>

<script>
import Modal from '@/components/layouts/Modal.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    Modal,
  },
  setup() {
    const { getters } = useStore();
    const showModal = computed(() => getters['modal/showModal']);
    const modalName = computed(() => getters['modal/modalName']);
    return {
      showModal,
      modalName,
    };
  },
};
</script>

<style lang="scss">
.customScrollbar {
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    background-color: #2f855a;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c6f6d5;
    border-radius: 20px;
    border: 3px solid #2f855a;
  }
}
</style>
