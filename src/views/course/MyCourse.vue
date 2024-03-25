<template>
  <div class="parent_container">
    <div class="course_container">
      <!--选择框-->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="6" :offset="12">
          <div class="grid-content">
            <el-select v-model="value" placeholder="请选择">
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
      <!--全部课程列表-->
      <div class="discipline_list">
        <div class="discipline_class" @click="gotoCourseDetail()">
          <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
               alt="">
          <div class="about_course">
            <div class="avatar">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="course_name_teacher">
              <div class="course_name">数据结构</div>
              <div class="course_teacher">王富贵</div>
            </div>
          </div>
          <div class="process_on">
            <el-progress :percentage="18"></el-progress>
          </div>
        </div>

        <div class="discipline_class" @click="gotoCourseDetail()">
          <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
               alt="">
          <div class="about_course">
            <div class="avatar">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="course_name_teacher">
              <div class="course_name">计算机组成原理</div>
              <div class="course_teacher">张有财</div>
            </div>
          </div>
          <div class="process_on">
            <el-progress :percentage="18"></el-progress>
          </div>
        </div>

        <div class="discipline_class" @click="gotoCourseDetail()">
          <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
               alt="">
          <div class="about_course">
            <div class="avatar">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="course_name_teacher">
              <div class="course_name">计算机组成原理</div>
              <div class="course_teacher">张有财</div>
            </div>
          </div>
          <div class="process_on">
            <el-progress :percentage="18"></el-progress>
          </div>
        </div>

        <div class="discipline_class" @click="gotoCourseDetail()">
          <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
               alt="">
          <div class="about_course">
            <div class="avatar">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="course_name_teacher">
              <div class="course_name">计算机网络</div>
              <div class="course_teacher">李来钱</div>
            </div>
          </div>
          <div class="process_on">
            <el-progress :percentage="18"></el-progress>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCourse",
  data() {
    return {
      inputDate: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
      value: ''
    }
  },
  methods: {
    gotoCourseDetail() {
      this.$router.push('/courseDetail')
    }
  }
}
</script>

<style lang="less" scoped>
.parent_container {
  display: flex;
  justify-content: center;
  align-items: center; // 如果需要垂直居中也加上这句

  .course_container {
    width: 1240px;
    height: 1000px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    .grid-content {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
    }

    .discipline_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 30px 0 30px;

      .discipline_class {
        width: calc((100% / 4) - 20px); /* 计算每个课程单元格的宽度，假设20px是左右内边距 */
        flex-basis: calc((100% / 4) - 20px); /* 添加这一行，确保在弹性布局中的基础宽度 */
        height: 300px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;

        img {
          width: 100%;
          border-radius: 8px 8px 0 0;
        }

        .about_course {
          display: flex;
          margin: 10px 10px 0 10px;

          .course_name_teacher {
            margin-left: 10px;

            .course_name {
              font-size: 16px;
              font-family: HanSansBold;
            }

            .course_teacher {
              font-size: 14px;
            }
          }
        }

        .process_on {
          margin-left: 10px;
          margin-top: 10px;
        }
      }

    }
  }
}

</style>
