<template>
  <div style="height: 100vh">
    <div class="general_header">
      <a href="/" class="logo">
        <img src="@/assets/logo.png" alt=""/>
        <div class="logo_text">iStudy</div>
      </a>
      <div class="other">
        <div>帮助</div>
        <div class="manual">使用手册</div>
      </div>
    </div>
    <div class="login_container">
      <el-row>
        <el-col :span="12"><img src="@/assets/login/first_left_pic.png" alt=""></el-col>
        <el-col :span="12">
          <div class="welcome_title">新同学，欢迎你</div>
          <el-form
              ref="loginForm"
              :model="formData"
              label-position="top"
              label-width="80px"
              :rules="myRoles"
          >
            <div class="login_way">
              <h3 @click="loginWaySelect = '1'" :class="{active: loginWaySelect === '1'}">账号密码登录</h3>
              <h3 @click="loginWaySelect = '2'" :class="{active: loginWaySelect === '2'}">
                学校账号登录</h3>
            </div>
            <div v-if="loginWaySelect === '1'">
              <el-input v-model="formData.connectTel" prefix-icon="el-icon-user"></el-input>
              <el-input show-password prefix-icon="el-icon-lock" v-model="formData.password"></el-input>
              <el-button @click="onSubmit" :loading="isLoading">登 录</el-button>
              <div class="login_bottom">
                <div class="login_forget">忘记密码</div>
              </div>
            </div>
            <div v-if="loginWaySelect === '2'">
              <el-input prefix-icon="el-icon-school" v-model="schoolData.schoolName" placeholder="请输入学校"></el-input>
              <el-input prefix-icon="el-icon-user" v-model="schoolData.username" placeholder="请输入学号"></el-input>
              <el-input show-password prefix-icon="el-icon-lock" v-model="schoolData.password" placeholder="请输入密码"></el-input>
              <el-button @click="loginBySchool" :loading="isLoading">登 录</el-button>
              <div class="login_bottom" style="margin-top: 20px">
                <div class="login_forget">忘记密码</div>
              </div>
            </div>

          </el-form>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script>
import {loginTel,loginSchool} from '@/api/user'
import router from "@/router";
export default {
  data() {
    return {
      loginWaySelect: '1',
      // 表单数据
      formData: {
        connectTel: '18858411412',
        password: 'admin'
      },
      // 学校账号
      schoolData: {
        schoolName: '宁波财经学院',
        username: 'admin',
        password: 'admin'
      },
      myRoles: {
        username: [
          {
            required: true,
            message: '用户名必填',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }
        ]
      },
      // 是否请求中
      isLoading: false
    }
  },
  components: {},
  mounted() {
  },
  methods: {
    onSubmit() {
      this.isLoading = true
      this.$refs.loginForm
          .validate()
          .then(() => {
            return loginTel(this.formData)
          })
          .then((res) => {
            const {data} = res
            if (res.success) {
              this.$message.success('登录成功')
              // token存入缓存中
              window.localStorage.setItem('accessToken', data.token);
              // 头像存储到vuex
              this.$store.commit('SET_USER_AVATAR', data.userInfo.avatar);
              const redirect = router.currentRoute.query.redirect;
              if (redirect) {
                // 存在redirect参数，跳转回之前请求的页面
                router.replace(redirect);
              } else {
                // 不存在redirect参数，跳转至默认首页
                router.replace('/');
              }
            }
          })
          .finally(() => {
            this.isLoading = false
          })
    },
    loginBySchool() {
      this.isLoading = true
      this.$refs.loginForm
          .validate()
          .then(() => {
            return loginSchool(this.schoolData)
          })
          .then((res) => {
            const {data} = res
            if (res.success) {
              this.$message.success('登录成功')
              // token存入缓存中
              window.localStorage.setItem('accessToken', data.token);
              const redirect = router.currentRoute.query.redirect;
              if (redirect) {
                // 存在redirect参数，跳转回之前请求的页面
                router.replace(redirect);
              } else {
                // 不存在redirect参数，跳转至默认首页
                router.replace('/');
              }
            }
          })
          .finally(() => {
            this.isLoading = false
          })
    }
  }
}
</script>
<style scoped lang='less'>
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
    justify-content: center; /* 添加这一行使得子元素在主轴（默认是横轴）上居中 */
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
    align-items: center; /* 保留此行，使子元素在交叉轴（默认是纵轴）上居中 */
    margin-left: auto;

    .manual {
      margin-left: 20px;
    }
  }
}

.login_container {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top right, #FBFFEF, #D1F1FC, #C4F3ED);
  height: calc(100vh - 70px);

  .login_way {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    h3 {
      cursor: pointer;
      transition: background-color 0.3s ease; // 添加过渡动画
      border-bottom: 2px solid transparent;
      margin: 0 20px 0 20px;

      &.active {
        border-bottom-color: @primaryColor;
      }
    }
  }

  img {
    display: flex;
    margin-right: 200px;
  }

  .welcome_title {
    font-size: 72px;
    font-family: HanSansBold,serif;
    color: rgba(24, 45, 154, 1);
    text-shadow: 4px 3px 0 rgba(0, 0, 0, 0.25);
    text-align: left;
    vertical-align: top;
    margin-bottom: 20px;
  }

  .login_bottom {
    display: flex;
    justify-content: space-between;

    /* 确保子div不会换行 */

    .login_other,
    .login_forget {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.5);
      flex: 0 0 auto; /* 或者直接设置宽度 width: 你想要的值; */
    }
  }

}

.el-form {
  width: 400px;
  height: 400px;
  padding: 40px;
  border-radius: 10px;
  background: #fff;
}

.el-button {
  margin-top: 30px;
  height: 50px;
  width: 100%;
  color: #ffffff;
  background: linear-gradient(135deg, rgba(49, 101, 246, 1) 0%, rgba(107, 216, 186, 1) 100%);
}

.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.el-input {
  margin-top: 26px;
  height: 50px;
}

</style>
