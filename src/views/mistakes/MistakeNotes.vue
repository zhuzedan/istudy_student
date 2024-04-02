<template>
  <div class="parent_container">
    <div class="course_container">
      <!--选择器-->
      <el-row :gutter="20">
        <el-col :span="6" :offset="18">
          <div class="grid-content">
            <el-select v-model="value" placeholder="请选择学学期">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!--全部笔记列表-->
      <div class="discipline_list">
        <div class="discipline_class" @click="gotoMistakeDetail">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <!-- 新增的文字描述div -->
          <div class="discipline_title">操作系统</div>
        </div>

        <div class="discipline_class" @click="gotoMistakeDetail">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">数据结构与算法</div>
        </div>

        <div class="discipline_class" @click="gotoMistakeDetail">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">数据库原理和应用</div>
        </div>

        <div class="discipline_class" @click="gotoMistakeDetail">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">计算机组成原理</div>
        </div>
        <div class="discipline_class" @click="gotoMistakeDetail">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">软件工程</div>
        </div>
        <div class="discipline_class" @click="gotoMistakeDetail">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">Android课程设计</div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MistakeNotes",
  data() {
    return {
      options: [{
        value: '选项1',
        label: '2023-2024第一学期'
      }, {
        value: '选项2',
        label: '2023-2024第二学期'
      }, {
        value: '选项3',
        label: '2022-2023第一学期'
      }, {
        value: '选项4',
        label: '2022-2023第二学期'
      }],
      value:
          ''
    }
  },
  methods: {
    gotoMistakeDetail() {
      this.$router.push('/mistakeDetail')
    }
  }
}
</script>

<style lang="less" scoped>
.parent_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center; // 如果需要垂直居中也加上这句

  .course_container {
    width: 1240px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    .el-row {
      margin-top: 20px;
    }

    .discipline_list {
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      padding: 30px;

      .discipline_class {
        width: 236px;
        height: 240px;
        background-color: #fff;
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;

        img {
          width: 200px;
          height: 236px;
        }

        .discipline_title {
          width: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          padding-left: 60px;
          padding-right: 30px;
          padding-top: 30px;
        }
      }

    }
  }
}
</style>
