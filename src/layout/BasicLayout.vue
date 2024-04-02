<template>
  <div class="container">
    <header-layout></header-layout>
    <div class="content-wrap">
      <router-view></router-view>
    </div>
<!--    <footer-layout></footer-layout>-->
  </div>
</template>

<script>
import HeaderLayout from './HeaderLayout.vue'
import FooterLayout from "@/layout/FooterLayout";

export default {
  name: "BasicLayout",
  components: {
    HeaderLayout,
    FooterLayout
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.content-wrap {
  flex: 1;
  overflow-y: auto; // 如果需要的话，确保内容区域可以滚动
}

</style>
