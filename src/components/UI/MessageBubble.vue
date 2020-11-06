<template>
  <div class="py-2 px-4">
    <div class="flex flex-col">
      <p class="mx-2 mb-1 font-semibold select-none">
        {{ message.user || 'Jaack' }} {{ message.ts }}
      </p>
      <div style="max-width: 60%" class="mr-auto whitespace-pre-wrap break-words px-4 py-2 rounded-2xl inline text-green-900 bg-white">
        {{ message.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>
