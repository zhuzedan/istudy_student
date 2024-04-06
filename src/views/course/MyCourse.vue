<template>
  <div class="parent_container">
    <div class="course_container">
      <!--选择框-->
      <el-row :gutter="20">
        <el-col :span="6" :offset="18">
          <div class="grid-content">
            <!-- 替换为 SemesterSelector 组件 -->
            <semester-selector :initial-semester-id="semesterId" @semester-change="onSemesterChangeFromComponent" />
          </div>
        </el-col>
      </el-row>
      <!--全部课程列表-->
      <div class="discipline_list">
        <div class="discipline_class" v-for="(item,index) in courseList" @click="gotoCourseDetail(item.selectionId)">
          <img :src="item.courseImg" alt="">
          <div class="about_course">
            <div class="avatar">
              <el-avatar :size="50" :src="item.courseImg"></el-avatar>
            </div>
            <div class="course_name_teacher">
              <div class="course_name">{{ item.courseName }}</div>
              <div class="course_teacher">{{ item.teacherName }}</div>
            </div>
          </div>
          <div class="process_on">
            <el-progress :percentage="item.currentProgress"></el-progress>
          </div>
          <div class="class_name">{{ item.className }}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {queryMyCourseList} from "@/api/course";
import SemesterSelector from "@/components/selector/SemesterSelector";
export default {
  name: "MyCourse",
  components: {
    SemesterSelector
  },
  data() {
    return {
      courseList: [],
      semesterId: '',
    }
  },
  created() {
    this.inquireCourseList(this.semesterId)
  },
  methods: {
    // 新增处理 SemesterSelector 组件传出的 semester-change 事件的方法
    onSemesterChangeFromComponent(newSemesterId) {
      this.semesterId = newSemesterId;
      this.inquireCourseList(this.semesterId);
    },
    // 课程列表
    inquireCourseList(semesterId) {
      queryMyCourseList(semesterId).then((res) => {
        this.courseList = res.data
      })
    },
    // 跳转到课程详情
    gotoCourseDetail(selectionId) {
      this.$router.push({
        path: '/courseDetail', // 替换为您的目标路由路径
        query: {selectionId}
      });
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
    border-radius: 8px;
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
      padding: 0 50px;

      .discipline_class {
        height: 300px;
        width: 244px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        margin-bottom: 20px;
        margin-left: 20px;
        margin-right: 20px;
        flex-direction: column;

        img {
          width: 100%;
          height: 54%;
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

        .class_name {
          margin-left: 10px;
        }
      }

    }
  }
}

</style>
