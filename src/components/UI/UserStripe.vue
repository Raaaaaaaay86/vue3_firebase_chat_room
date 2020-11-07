<template>
  <div class="flex items-center justify-between py-4">
    <div
      class="min-w-16 min-h-16 bg-white rounded-full bg-cover bg-center"
      :style="{'backgroundImage': 'url(' + user.profileURL + ')'}"
    />
    <h6 class="ml-4 mr-auto">
      {{ user.nickName }}
    </h6>
    <div class="w-4 h-4 bg-green-100 rounded-full" />
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: false,
      default() {
        return {
          email: 'nomail@email.cc',
          nickName: 'None',
          uid: 'n',
          profileURL: 'https://firebasestorage.googleapis.com/v0/b/vue3chat.appspot.com/o/logo.png?alt=media&token=e821f1bb-8c54-4250-80e0-35fd05c4ddd1',
        };
      },
    },
  },
};
</script>
