<template>
  <div class="z-50 fixed w-screen h-screen flex items-center justify-center bg-black bg-opacity-75">
    <div class="w-75 h-48 bg-white rounded overflow-hidden">
      <div class="mb-4 flex justify-center items-center h-12 text-xl font-semibold bg-green-500 text-white">
        {{ modalTopic || 'Modal Default Title' }}
      </div>
      <AlertModal v-if="modalType === 'alert'" />
      <ProfileModal v-if="modalType === 'editProfile'" />
    </div>
  </div>
</template>

<script>
import AlertModal from '@/components/layouts/Modals/AlertModal.vue';
import ProfileModal from '@/components/layouts/Modals/ProfileModal.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    AlertModal,
    ProfileModal,
  },
  props: {
    modalName: {
      type: String,
      required: false,
      default: 'none',
    },
  },
  setup() {
    const { getters } = useStore();
    const modalTopic = computed(() => getters['modal/modalTopic']);
    const modalType = computed(() => getters['modal/modalType']);
    return {
      modalTopic,
      modalType,
    };
  },
};
</script>
