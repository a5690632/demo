<template>
  <div @click="fn">1</div>
</template>

<script>
import { inject, setup } from "@vue/composition-api";
export default {
  name: "test",
  setup() {
    const fn = inject("btn");

    return {
      fn
    };
  }
};
</script>

<style lang="less" scoped>
</style>