<template>
  <div class="index_container">
    <div class="basic_container">
      <!--海报图-->
      <img src="@/assets/index/index_ai .png" alt="">
      <!--ai聊天-->
      <chat-example></chat-example>
    </div>
    <div class="other_school_course">
      <div class="recommend_class">
        <div class="discipline_category">
          <div
              v-for="(name, index) in categoryList"
              :key="index"
              class="category_name"
              :class="{ 'selected': selectedCategory === index }"
              @click="handleCategoryClick(index, name.courseCategoryId)">
            {{ name.categoryName }}
          </div>
        </div>
        <!--空状态-->
        <el-empty v-if="queryCoursePageResp.list && queryCoursePageResp.list.length === 0"
                  description="暂无数据"></el-empty>
        <!--课程数据-->
        <div class="discipline_list">
          <div
              class="discipline_class"
              v-for="(course, index) in queryCoursePageResp.list"
              :key="index"
              @click="gotoCourseIntroduction(course.scheduleId)"
          >
            <!-- 课程图片 -->
            <img :src="course.courseImg" alt="">

            <div class="about_course">
              <!-- 头像 -->
              <div class="avatar">
                <el-avatar :size="50" :src="course.courseImg"></el-avatar>
              </div>

              <!-- 课程名及教师名 -->
              <div class="course_name_teacher">
                <div class="course_name">{{ course.courseName }}</div>
                <div class="course_teacher">{{ course.teacherName }}</div>
              </div>
            </div>

            <!-- 课程描述，使用 CSS 控制省略号显示 -->
            <div class="course_description" :title="course.courseDesc">
              {{ course.courseDesc }}
            </div>

            <!-- 学习人数 -->
            <div class="studying_count">{{ course.learnCount }}人正在学习</div>
          </div>
        </div>
        <!--分页-->
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="queryCoursePageReq.current"
            :page-size="queryCoursePageReq.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="queryCoursePageResp.totalRecords"
        >
        </el-pagination>
      </div>

      <div class="hot_class">
        <div class="hot_class_title">
          热门课程
        </div>
        <div class="hot_class_concrete" v-for="(item,index) in hotCourseList"
             @click="gotoCourseIntroduction(item.scheduleId)">
          <div class="hot_class_num">{{ index + 1 }}</div>
          <img :src="item.courseImg"
               alt="">
          <div class="hot_class_container">
            <div class="hot_class_name">{{ item.courseName }}</div>
            <div class="hot_class_teacher">{{ item.teacherName }}</div>
            <div class="hot_class_description">{{ item.courseDesc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatExample from "@/components/chat/ChatExample.vue";
import {queryOpenCourseCategory, queryOpenCourseList, queryOpenCourseListTop10} from "@/api";

export default {
  name: "Index",
  components: {
    ChatExample
  },
  data() {
    return {
      // 课程分页入参
      queryCoursePageReq: {
        courseCategoryId: '',
        current: 1,
        pageSize: 10,
      },
      // 课程分页出参
      queryCoursePageResp: {},
      //课程分类
      categoryList: [
        {
          courseCategoryId: '',
          categoryName: "全部"
        }
      ],
      hotCourseList: [],
      inquireKey: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      selectedCategory: 0,
    }
  },
  created() {
    this.inquireCourseCategory()
    this.inquireCourseList();
    this.inquireHotCourse()
  },
  methods: {
    // 课程类别
    inquireCourseCategory() {
      queryOpenCourseCategory().then((res) => {
        const {data} = res
        this.categoryList = this.categoryList.concat(data);
      })
    },
    // 全部课程数据
    inquireCourseList() {
      queryOpenCourseList(this.queryCoursePageReq).then((res) => {
        const {current, pageSize, totalRecords, list} = res.data
        Object.assign(this.queryCoursePageReq, {current, pageSize})
        this.queryCoursePageResp = {totalRecords, list}
      })
    },
    // 课程翻页
    handleCurrentChange(val) {
      this.queryCoursePageReq.current = val
      this.inquireCourseList()
    },
    // 热门课程
    inquireHotCourse() {
      queryOpenCourseListTop10().then((res) => {
        const {data} = res
        this.hotCourseList = data
      })
    },
    // 跳转到课程详情
    gotoCourseIntroduction(scheduleId) {
      this.$router.push({
        path: '/introduction', // 替换为您的目标路由路径
        query: { scheduleId }
      });
    },
    // 课程分类切换
    handleCategoryClick(index, courseCategoryId) {
      this.selectedCategory = index;
      this.queryCoursePageReq.courseCategoryId = courseCategoryId;
      this.queryCoursePageReq.current = 1;
      queryOpenCourseList(this.queryCoursePageReq).then((res) => {
        const {current, pageSize, totalRecords, list} = res.data
        Object.assign(this.queryCoursePageReq, {current, pageSize})
        this.queryCoursePageResp = {totalRecords, list}
      })
    },
  }
}
</script>

<style lang="less" scoped>

.basic_container {
  display: flex;
  justify-content: center;
  margin-top: 30px;

  img {
    margin-right: 20px;
  }

}

.other_school_course {
  width: 1240px;
  border-radius: 8px;
  display: flex;
  margin: 20px auto; // 修改顶部外边距为“margin: 20px auto”，这样它会自动在容器中水平居中

  .recommend_class {
    width: 900px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 8px;

    .discipline_category {
      display: flex;
      height: 46px;
      margin: 0 20px;
      align-items: center;
      width: 100%;

      .category_name {
        padding: 0 10px 0 10px;
        font-size: 16px;
        color: @primaryNoSelected;
        transition: all 0.3s;
        cursor: pointer;

        &.selected {
          color: black; /* 变为黑色 */
          font-weight: bold; /* 加粗 */
        }
      }
    }

    .discipline_list {
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      padding: 0 20px 0 20px;

      .discipline_class {
        //width: calc((100% / 4) - 20px); /* 计算每个课程单元格的宽度，假设20px是左右内边距 */
        //flex-basis: calc((100% / 4) - 20px); /* 添加这一行，确保在弹性布局中的基础宽度 */
        width: 200px;
        height: 280px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        margin-left: 7.5px;
        margin-right: 7.5px;
        margin-bottom: 20px;
        flex-direction: column;

        img {
          width: 100%;
          height: 54%;
          border-radius: 8px 8px 0 0;
        }

        .about_course {
          display: flex;
          margin: 10px;

          .course_name_teacher {
            margin-left: 10px;

            .course_name {
              font-size: 16px;
              font-family: HanSansBold, serif;
            }

            .course_teacher {
              font-size: 14px;
            }
          }


        }

        .course_description {
          margin: 0 10px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .studying_count {
          margin: 0 10px;
          //align-self: flex-end; /* 在交叉轴（水平方向）上底部对齐 */
        }
      }

    }

    .el-pagination {
      padding-left: 24px;
      padding-bottom: 10px;
    }
  }

  .hot_class {
    width: 300px;
    background-color: @primaryBackgroundColor;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 10px;

    .hot_class_title {
      font-family: HanSansBold, serif;
      font-size: 16px;
      height: 46px;
      align-items: center;
      display: flex;
      width: 100%;
    }

    .hot_class_concrete {
      display: flex;
      margin-bottom: 10px;

      .hot_class_num {
        display: flex;
        position: relative;
        align-items: center;
        margin-right: 10px;
        color: rgba(227, 60, 100, 1);
        font-size: 20px;
      }

      img {
        width: 80px;
        height: 96px;
        border-radius: 4px;
        object-fit: cover;
      }

      .hot_class_container {
        margin: 0 10px;
        max-width: calc(100% - 80px - 20px);

        .hot_class_name {
          font-family: HanSansBold, serif;
        }

        .hot_class_description {
          margin-top: 6px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

</style>
