<template>
<div>
  <router-view />
</div>
</template>

<script>

export default {
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
