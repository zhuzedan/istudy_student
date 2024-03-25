<template>
  <div class="footer_container">
    <div class="description">
      <div style="display: flex">
        <img src="@/assets/nation_emblem.png" alt="">
        <div> 浙公网安备 11010802020877号 京ICP备 12020869号-2</div>
      </div>
      <div class="description">©2014-2024 icourse163.org</div>
      <div class="description"> 地址：浙江省宁波市海曙区学院路899号宁波财经学院 联系电话：400-008-1078</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterLayout"
}
</script>

<style lang="less" scoped>
.footer_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #fff;
  position: relative;
  margin-top: 20px;
}
</style>
