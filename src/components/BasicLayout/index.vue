<template>
  <div class="basic-layout">
    <div class="head">head</div>
    <div class="main">
      <router-view :key="$route.path" />
    </div>
    <div class="footer">footer</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
