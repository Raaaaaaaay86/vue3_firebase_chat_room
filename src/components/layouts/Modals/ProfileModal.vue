<template>
  <div class="mb-2 flex justify-evenly items-center">
    <div
      class="min-w-16 min-h-16 w-16 h-16 bg-white rounded-full bg-cover bg-center border border-black cursor-pointer"
      :style="{'backgroundImage': 'url(' + previewImage + ')'}"
      @click.prevent="$refs.Profile.click()"
    />
    <div class="flex flex-col">
      <label for="name">
        Nickname
      </label>
      <input v-model="loginUser.nickName" type="text" name="name" class="border-2 border-green-500 rounded">
    </div>
  </div>
  <div class="flex item-center justify-evenly">
    <v-button
      class="text-green-400 border border-green-500 rounded"
      @click.prevent="closeModal"
    >
      Close
    </v-button>
    <v-button
      class="text-green-400 border border-green-500 rounded"
      @click.prevent="updateProfile"
    >
      Save
    </v-button>
    <input type="file" ref="Profile" hidden @change.prevent="preview">
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const { commit, getters, dispatch } = useStore();
    const loginUser = computed(() => getters['auth/loginUser']);
    const previewImage = ref(loginUser.value.profileURL);
    // eslint-disable-next-line prefer-const
    let readyfile = ref(loginUser.value.profileURL);

    const closeModal = () => {
      commit('modal/CLOSE_MODAL');
    };

    const preview = (e) => {
      // eslint-disable-next-line prefer-destructuring
      readyfile.value = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        previewImage.value = reader.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    };

    const updateProfile = () => {
      const updateData = {
        name: loginUser.value.nickName,
        profileFile: readyfile.value,
        uid: loginUser.value.uid,
        registeredRef: loginUser.value.registeredRef,
      };
      return dispatch('updateProfile', updateData)
        .then(() => {
          closeModal();
          dispatch('auth/refreshLoginUser');
        });
    };
    return {
      preview,
      previewImage,
      closeModal,
      loginUser,
      updateProfile,
    };
  },
};
</script>
