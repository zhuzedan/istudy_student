<template>
  <div class="parent_container">
    <div class="course_container">
      <div class="course_intro">
        <img :src="courseContent.courseImg"
             alt="">
        <div class="course_about">
          <div class="course_name">{{ courseContent.courseName }}</div>
          <div class="course_teacher">{{ courseContent.teacherName }}</div>
          <div class="course_description">{{ courseContent.courseDesc }}
          </div>
        </div>
      </div>
      <div class="course_action">
        <div class="student_count">{{ courseContent.learnCount }}人正在学习</div>
        <el-button type="primary" @click.native="addCourse">添加课程</el-button>
      </div>
    </div>

    <div class="course_outline">
      <div class="course_title">
        <div class="course_dialog" :class="{ active: activeTab === 'dialog' }" @click="toggleActive('dialog')">课程大纲
        </div>
        <div class="course_commit" :class="{ active: activeTab === 'commit' }" @click="toggleActive('commit')">课程评价
        </div>
      </div>
      <!--课程大纲-->
      <div class="course_dialog_list" v-if="activeTab === 'dialog'">
        <el-tree
            :data="passageList"
            :default-expand-all=true
            :props="defaultProps"
            node-key="id"
            :render-content="renderTreeNode"
        />
      </div>
      <!--课程评价-->
      <div class="course_commit_list" v-if="activeTab === 'commit'">
        <!--评论列表-->
        <div class="commit_detail" v-for="(item, index) in courseCommitList">
          <img :src="item.avatar" alt="">
          <div class="commit_detail_box">
            <div style="display: flex">
              <div class="commentator_name">{{ item.nickName }}</div>
              <el-rate
                  v-model="item.starLevel"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
              </el-rate>
            </div>
            <div class="commit_content">{{ item.commentContent }}</div>
            <div class="commit_date"> {{ formatCommitDate(item.createTime) }}</div>
          </div>
        </div>
        <!-- 发布评论 -->
        <div class="commit_operation">
          <el-input
              ref="textareaInput"
              type="textarea"
              placeholder="请输入评论"
              v-model="commentData.commentContent"
              autosize
              minRows="2"
              maxRows="6">
          </el-input>
          <el-rate
              v-model="commentData.starLevel"
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>

          <el-button type="primary" @click="handleCommit(commentData)">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  insertComment,
  insertSelectionForOpenCourse,
  queryOpenCourseComment,
  queryOpenCourseDetail,
  queryPassageList
} from "@/api"
import {formatTimestamp} from '@/utils/time'

export default {
  name: "CourseIntroduction",
  data() {
    return {
      scheduleId: '',
      courseContent: {},
      passageList: [],
      courseCommitList: [],
      commentData: {
        scheduleId: '',
        commentContent: '',
        starLevel: 5
      },
      activeTab: 'dialog',
      defaultProps: {
        children: 'subPassageList',
        label: 'passageTitle',
      },
    };
  },
  created() {
    const scheduleId = this.$route.query.scheduleId;
    this.scheduleId = scheduleId
    this.inquireCourseDetail(scheduleId)
    this.inquirePassageList(scheduleId)
    this.inquireCourseCommit(scheduleId)
  },
  methods: {
    // 课程详情
    inquireCourseDetail(scheduleId) {
      queryOpenCourseDetail(scheduleId).then((res) => {
        this.courseContent = res.data
      })
    },
    // 课程大纲
    inquirePassageList(scheduleId) {
      queryPassageList(scheduleId).then((res) => {
        // 格式化出参，方便el-tree解析
        const passageListData = res.data
        passageListData.forEach((passage) => {
          if (passage.subPassageList) {
            passage.subPassageList = passage.subPassageList.map(subPassage => {
              if (subPassage.resourceInfo) {
                subPassage.subPassageList = subPassage.resourceInfo.map(resource => ({
                  ...resource,
                  passageTitle: resource.correspondName,
                }));
                delete subPassage.resourceInfo;
              }
              return subPassage;
            });
          }
        });
        this.passageList = passageListData
        console.log('passageListData', passageListData)
      })
    },
    renderTreeNode(h, {node, data, store}) {
      const iconNameMap = {
        exam: 'school',
        video: 'video-play',
        information: 'document',
        homework: 'edit',
        wrong: 'warning',
      };
      const iconName = iconNameMap[data.type];
      const iconClass = `el-icon-${iconName}`;

      const iconTitleMap = {
        exam: '测验',
        video: '视频',
        information: '资料',
        homework: '作业',
        wrong: '错题',
      }
      const iconTitle = iconTitleMap[data.type]
      return (
          <span>
            <i class={iconClass}/>
            {iconTitle}&nbsp;&nbsp;{data.passageTitle}
          </span>
      );
    },
    // 课程评论
    inquireCourseCommit(scheduleId) {
      queryOpenCourseComment(scheduleId).then((res) => {
        this.courseCommitList = res.data.commentInfoList
      })
    },
    // 新增评论
    insertCourseComment(commentData) {
      insertComment(commentData)
    },
    // 发送评论
    handleCommit(commentData) {
      commentData.scheduleId = this.scheduleId;
      this.insertCourseComment(commentData)
      this.inquireCourseCommit(this.scheduleId)
      this.$forceUpdate();
      this.commentData.commentContent = ''
    },
    // 添加课程
    insertCourse(scheduleId) {
      insertSelectionForOpenCourse(scheduleId)
    },
    addCourse() {
      this.$confirm('是否添加本课程', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
          .then(() => {
            this.insertCourse(this.scheduleId)
            this.$message.success('添加成功')
            this.$router.push('/myCourse')
          })
          .catch(() => {
            this.$message.info('取消添加')
          })
    },
    toggleActive(tabName) {
      this.activeTab = tabName;
    },
    formatCommitDate(timestamp) {
      return formatTimestamp(timestamp);
    },
  },
  computed: {}
}
</script>

<style lang="less" scoped>
.parent_container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .course_container {
    width: 1240px;
    height: 384px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;

    .course_intro {
      display: flex;
      height: 280px;
      padding: 20px;
      align-items: center;

      img {
        width: 426px;
        height: 240px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      }

      .course_about {
        margin-left: 50px;

        .course_name {
          font-size: 24px;
          margin-bottom: 16px;
          font-family: HanSansBold;
        }

        .course_teacher {
          color: rgba(68, 68, 68, 1);
          margin-bottom: 16px;
        }
      }
    }

    .course_action {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      padding: 0 20px;
    }
  }

  .course_outline {
    width: 1240px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

    .course_title {
      display: flex;
      font-size: 18px;
      width: 1240px;
      height: 50px;
      //background-color: #C4F3ED;
      position: relative;
      align-items: center;

      .course_dialog {
        margin-left: 20px;
        color: @primaryNoSelected;
        cursor: pointer;

        &.active {
          font-family: HanSansBold;
          color: #000;
        }
      }

      .course_commit {
        color: @primaryNoSelected;
        margin-left: 20px;
        cursor: pointer;

        &.active {
          font-family: HanSansBold;
          color: #000;
        }
      }
    }

    .course_dialog_list {
      width: 1100px;
      padding: 20px;
      margin-bottom: 40px;
      background-color: @primaryBackgroundColor;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      display: flex;
    }

    .course_commit_list {
      width: 1100px;
      padding: 20px;
      margin-bottom: 40px;
      display: flex;
      position: relative;
      flex-direction: column;

      .commit_detail {
        display: flex;
        margin-top: 20px;

        img {
          width: 50px;
          height: 50px;
          border-radius: 90px;
        }

        .commit_detail_box {
          margin-left: 20px;

          .commentator_name {
            font-size: 16px;
            margin-right: 10px;
          }

          .commit_content {
            margin-top: 8px;
          }

          .commit_date {
            margin-top: 10px;
            color: @primaryNoSelected;
          }
        }
      }

      .commit_operation {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 20px;
        width: 100%;

        .el-rate {
          margin-right: 10px;
        }

        .el-input {
          width: calc(100% - 100px); /* 确保输入框宽度减去按钮宽度 */
          flex-grow: 1;
          margin-right: 10px; /* 添加间距 */
        }


        .input-with-rating-container {
          display: flex;
          align-items: center;
          width: 100%;
        }

        .el-textarea {
          display: inline-block;
          width: 80%;
        }
      }
    }
  }
}

.el-tree {
  background-color: @primaryBackgroundColor;
}

</style>
