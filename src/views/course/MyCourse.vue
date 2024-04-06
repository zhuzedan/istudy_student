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
            <el-select v-model="semesterId" @change="onSemesterChange" placeholder="请选择">
              <el-option
                  v-for="item in semesterList"
                  :key="item.semesterId"
                  :label="item.openSemester"
                  :value="item.semesterId">
              </el-option>
            </el-select>
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
import {querySemester} from "@/api/common";
import {queryMyCourseList} from "@/api/course";

export default {
  name: "MyCourse",
  data() {
    return {
      courseList: [],
      semesterList: [
        {
          semesterId: '',
          currentSemester: '',
          openSemester: '全部'
        }
      ],
      semesterId: '',
    }
  },
  created() {
    this.inquireSemester()
    this.inquireCourseList(this.semesterId)
  },
  methods: {
    // 学期选择器触发
    onSemesterChange(e) {
      this.semesterId = e
      this.inquireCourseList(this.semesterId)
    },
    // 学年学期列表
    inquireSemester() {
      querySemester().then((res) => {
        const {data} = res
        this.semesterList = this.semesterList.concat(data)
        // 获取当前学期semesterId
        const currentSemesterItem = this.semesterList.find(item => item.currentSemester === 1);
        this.semesterId = currentSemesterItem ? currentSemesterItem.semesterId : null;
      })
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
