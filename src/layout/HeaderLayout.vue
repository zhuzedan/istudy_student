<template>
  <div>
    <div class="general_header">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt=""/>
        <div class="logo_text">iStudy</div>
      </router-link>
      <div class="header_tab_bar">
        <router-link :to="{ name: 'index' }" class="header_tab_name" active-class="header_tab_name_active" exact>首页</router-link>
        <router-link to="/myCourses" class="header_tab_name" active-class="header_tab_name_active">我的课程</router-link>
        <router-link to="/notebooks" class="header_tab_name" active-class="header_tab_name_active">笔记全集</router-link>
        <router-link to="/mistakes" class="header_tab_name" active-class="header_tab_name_active">错题小本</router-link>
      </div>
      <div class="other">
        <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="inquireKey">
        </el-input>
        <div class="avatar" @click="gotoLogin" v-if="this.$root.loginFlag === false">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <el-dropdown v-if="this.$root.loginFlag === true">
          <div class="avatar">
            <el-avatar :size="50" :src="loginAvatarUrl"></el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="gotoPersonal">个人</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderLayout",
  data() {
    return {
      inquireKey: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      loginAvatarUrl: 'https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b'
    }
  },
  methods: {
    gotoLogin() {
      this.$router.push('/login')
    },
    logout() {
      this.$confirm('确定要退出吗', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            this.$message.success('成功退出')
          })
          .catch(() => {
            this.$message.info('取消退出登录')
          })
      this.$root.loginFlag = false
      console.log(this.$root.loginFlag)
    },
    gotoPersonal() {
      this.$router.push('/mine')
    }
  }
}
</script>

<style lang="less" scoped>
.general_header {
  height: 70px;
  background-color: #fff;
  display: flex;
  //justify-content: center; /* 添加这一行使得子元素在主轴（默认是横轴）上居中 */
  align-items: center; /* 保留此行，使子元素在交叉轴（默认是纵轴）上居中 */
  padding-left: 100px;
  padding-right: 100px;

  a {
    text-decoration: none;
    color: inherit; /* 使用继承的颜色，防止链接颜色变化 */

    &.active:after {
      background-color: @primaryColor;
    }
  }

  .logo {
    display: flex;
    align-items: center; /* 保留此行，使子元素在交叉轴（默认是纵轴）上居中 */

    img {
      width: 56px;
    }

    .logo_text {
      color: @primaryColor;
      font-family: HanSansBold;
      margin-left: 10px;
      font-size: 40px;
      font-weight: bold;
      text-decoration: none; /* 移除下划线 */
    }

    // 阻止:hover 和 :focus 状态下的颜色和下划线变化
    .logo_text:hover,
    .logo_text:focus {
      color: @primaryColor; /* 继承父元素的颜色 */
      text-decoration: none; /* 保持无下划线 */
    }
  }

  .other {
    display: flex;
    align-items: center;
    margin-left: auto;

    .avatar {
      width: 100px;
    }

    .el-avatar {
      width: 80px;
      margin-left: 20px;
    }
  }

  .header_tab_bar {
    display: flex;
    font-size: 16px;
    margin-left: 60px;

    .header_tab_name {
      width: 100px;
      text-align: center;
      color: grey;
    }

    .header_tab_name_active {
      /* 当router-link被激活时的颜色 */
      color: black;
    }

  }

}
</style>
