<template>
  <div class="customScrollbar col-span-3 p-8 bg-green-700 shadow-xl overflow-auto">
    <div class="flex items-center justify-between">
      <h5 class="text-2xl font-extrabold">
        Online Users
      </h5>
      <i class="fas fa-2x fa-sign-out-alt" />
    </div>
    <div class="-mx-8 px-8 border-b-2 border-green-200">
      <UserStripe />
    </div>
    <template v-for="prop in 10" :key="prop">
      <div>
        <UserStripe />
      </div>
    </template>
  </div>
</template>

<script>
import UserStripe from '@/components/UI/UserStripe.vue';

export default {
  components: {
    UserStripe,
  },
};
</script>
