<template>
  <div>
    <div class="general_header">
      <router-link to="/" class="logo">
        <img src="@/assets/logo.png" alt=""/>
        <div class="logo_text">iStudy</div>
      </router-link>
      <div class="header_tab_bar">
        <router-link :to="{ name: 'index' }" class="header_tab_name" active-class="header_tab_name_active" exact>首页
        </router-link>
        <router-link to="/myCourses" class="header_tab_name" active-class="header_tab_name_active">我的课程</router-link>
        <router-link to="/notebooks" class="header_tab_name" active-class="header_tab_name_active">笔记全集</router-link>
        <router-link to="/mistakes" class="header_tab_name" active-class="header_tab_name_active">错题小本</router-link>
      </div>
      <div class="other">
        <!--        <el-input-->
        <!--            placeholder="请输入内容"-->
        <!--            prefix-icon="el-icon-search"-->
        <!--            v-model="inquireKey">-->
        <!--        </el-input>-->
        <!--未登录状态头像为默认-->
        <div class="avatar" @click="gotoLogin" v-if="!accessTokenExists()">
          <el-avatar :size="50" :src="circleUrl"></el-avatar>
        </div>
        <!--登录后显示当前用户的头像-->
        <el-dropdown v-else>
          <div class="avatar">
            <el-avatar :size="50" :src="loginAvatarUrl"></el-avatar>
          </div>
          <el-dropdown-menu>
            <el-dropdown-item @click.native="gotoPersonal">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: "HeaderLayout",
  data() {
    return {
      inquireKey: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  computed: {
    ...mapState(['userInfo']),
    loginAvatarUrl() {
      return this.userInfo.avatar || this.circleUrl; // 如果Vuex中没有头像，则使用默认头像
    },
  },
  mounted() {
  },
  methods: {
    // 判断登录状态
    accessTokenExists() {
      return !!window.localStorage.getItem("accessToken");
    },
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
            // 移除本地存储中的 accessToken
            window.localStorage.removeItem('accessToken');
            this.$store.commit('SET_USER_ID', null);
            this.$store.commit('SET_USER_AVATAR', null);
            this.$forceUpdate(); // 强制更新视图
            this.$message.success('成功退出');
            this.$router.push('/')
          })
          .catch(() => {
            this.$message.info('取消退出登录');
          });
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
      font-family: HanSansBold,serif;
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
