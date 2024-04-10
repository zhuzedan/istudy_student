<template>
  <div class="detail_container">
    <!--顶部的一条课程加导师-->
    <div class="course_correlation">
      <div class="course_box">
        <i class="el-icon-arrow-left" @click="goBack"></i>
        <img class="course_pic"
             :src="courseDetail.courseImg"
             alt="">
        <div class="course_about">
          <div class="course_name">{{ courseDetail.courseName }}</div>
          <div class="course_teacher">{{ courseDetail.teacherName }}</div>
        </div>
        <img class="course_teacher_ai" src="@/assets/course/course_teacher_ai.png" alt="">
      </div>
    </div>
    <div class="menu_click_operation">
      <div class="menu_tab">
        <el-menu :default-active="currentMenuIndex" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-bell"></i>
            <span slot="title">公告</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-star-off"></i>
            <span slot="title">评分标准</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">课件</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">知识图谱</span>
          </el-menu-item>
          <el-menu-item index="5">
            <i class="el-icon-collection-tag"></i>笔记本
          </el-menu-item>
          <el-menu-item index="6">
            <i class="el-icon-thumb"></i>错题本
          </el-menu-item>
        </el-menu>
      </div>
      <div class="menu_click_view">
        <!--公告开始-->
        <div class="notice" v-if="currentMenuIndex==='1'">
          <div class="notification_box" v-for="item in remindList">
            <div class="notification-content">{{ item.remindMsg }}</div>
            <div class="notification_date">{{ formatCommitDate(item.pushTime) }} {{ courseDetail.teacherName }}</div>
          </div>
        </div>
        <!--公告结束-->
        <!--评分开始-->
        <div class="scoring_standard" v-if="currentMenuIndex==='2'">
          本课程本学期的评分标准为单元测验占40%，讨论题占10%，期末线上考试占50%。
          请注意：
          单元测验由6个单元测验组成，均为客观题。
          讨论题指在学习中，课堂交流区中的思考讨论题（由老师分布的讨论题）。每位同学需完成5个以上思考题。
          期末线上考试有一套试卷：客观题（40-60道选择题），主观题（2-4道问答题）。
        </div>
        <!--评分结束-->
        <!--课程开始-->
        <div class="course_list" v-if="currentMenuIndex==='3'">
          <!--选择框-->
          <el-row :gutter="20">
            <el-col :span="6" :offset="18">
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
          <el-tree
              :data="courseProgress"
              :default-expand-all=true
              :props="courseProps"
              node-key="id"
              :render-content="renderCourseTreeNode"
          ></el-tree>
        </div>
        <!--课程结束-->
        <!--知识图谱开始-->
        <div class="mind_map" v-if="currentMenuIndex==='4'">
          <el-image
              style="width: 800px; height: 800px"
              :src="url"
              :preview-src-list="srcList">
          </el-image>
        </div>
        <!--知识图谱结束-->
        <!--笔记本开始-->
        <div class="recently_notebook" v-if="currentMenuIndex==='5'">
          <div class="recent">最近笔记</div>
          <div class="chapter_box">
            <div class="chapter">{{ newNote.passageTitle }}</div>
            <div class="chapter">{{ newNote.noteName }}</div>
            <div class="chapter_notes">
              {{ newNote.noteContent }}
            </div>
          </div>
          <el-button @click.native="gotoNoteDetail(selectionId)" type="primary">更多笔记</el-button>
        </div>
        <!--笔记本结束-->
        <!--错题本开始-->
        <div class="recently_wrong_title_book" v-if="currentMenuIndex==='6'">
          <div class="recent_wrong_title">最新错题</div>
          <div class="wrong_title_name">{{ newWrong.questionContent }}
          </div>
          <div class="answer">解析</div>
          <div class="answer_detail">
            {{newWrong.questionAnalysis}}
          </div>
          <el-button type="primary" @click.native="moreMistakes(selectionId)">更多错题</el-button>
        </div>
        <!--错题本结束-->
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryCourseProgress,
  queryMyCourseDetail,
  queryNewNoteList,
  queryNewWrongList,
  queryRemindList
} from "@/api/course";
import {formatTimestamp} from '@/utils/time'

export default {
  name: "CourseDetail",
  data() {
    return {
      selectionId: '',
      courseDetail: {},
      remindList: [],  // 公告提醒
      courseProgress: [], // 课程目录全的
      courseProps: {
        children: 'subPassageList',
        label: 'passageTitle'
      },
      currentMenuIndex: '3',
      url: 'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      srcList: [
        'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      ],
      options: [{
        value: '选项1',
        label: '待完成'
      }, {
        value: '选项2',
        label: '待提高'
      }],
      value: '',
      newNote: {},  //最新笔记
      newWrong: {}  //最新错题
    }
  },
  created() {
    this.selectionId = this.$route.query.selectionId
    this.inquireCourseDetail(this.selectionId)
    this.inquireCourseProgress()
  },
  methods: {
    // 日期格式转换
    formatCommitDate(timestamp) {
      return formatTimestamp(timestamp);
    },
    // 课程详情
    inquireCourseDetail(selectionId) {
      queryMyCourseDetail(selectionId).then((res) => {
        this.courseDetail = res.data
      })
    },
    // 课程公告提醒
    inquireRemindList() {
      queryRemindList(this.courseDetail.teacherId, this.selectionId).then((res) => {
        this.remindList = res.data
      })
    },
    // 课程目录全（包含资源、视频、作业、错题、考试）
    inquireCourseProgress() {
      queryCourseProgress(this.selectionId).then((res) => {
        const courseProgressData = res.data
        // 格式化出参，保证树结构
        courseProgressData.forEach((passage) => {
          if (passage.subPassageList) {
            passage.subPassageList = passage.subPassageList.map(subPassage => {
              if (subPassage.resourceInfoList) {
                subPassage.subPassageList = subPassage.resourceInfoList.map(resource => ({
                  ...resource,
                  passageTitle: resource.name,
                }));
                delete subPassage.resourceInfoList;
              }
              return subPassage;
            });
          }
        });
        this.courseProgress = courseProgressData
      })
    },
    // 课程树的显示
    renderCourseTreeNode(h, {node, data}) {
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
          <span style={{display: 'flex', alignItems: 'center'}}>
            {node.level === 1 && (
                <i class="el-icon-folder-opened"/>
            )}
            <i class={iconClass}/>
            {iconTitle}&nbsp;&nbsp;{data.passageTitle}
            {/* 如果节点级别为3，插入评分组件 */}
            {node.level === 3 && (
                <el-rate disabled max={3} value={data.star || 0} style={{marginLeft: '8px'}}/>
            )}
          </span>
      );
    },
    //最新笔记
    inquireNewNoteList() {
      queryNewNoteList(this.selectionId).then((res) => {
        this.newNote = res.data
      })
    },
    //最新错题
    inquireNewWrongList() {
      queryNewWrongList(this.selectionId).then((res) => {
        this.newWrong = res.data
      })
    },
    goBack() {
      this.$router.back();
    },
    moreMistakes(selectionId) {
      this.$router.push({
        path:'/mistakeDetail',
        query: {selectionId}
      })
    },
    gotoNoteDetail(selectionId) {
      this.$router.push({
        path:'/noteDetail',
        query: {selectionId}
      })
    },
    handleSelect(index) {
      // 这里你可以保存或处理 index 值
      this.currentMenuIndex = index;
      if (index === '1') {
        this.inquireRemindList()
      }
      if (index === '5') {
        this.inquireNewNoteList()
      }
      if (index === '6') {
        this.inquireNewWrongList()
      }
    },
    handleNodeClick(data) {
      if (data.type === 'video') {
        this.$router.push('/courseDetail/videoCourse')
      }
      if (data.type === 'homework') {
        this.$router.push('/courseDetail/homework')
      }
      if (data.type === 'wrongTitle') {
        this.$router.push('/courseDetail/wrongTitle')
      }
      if (data.type === 'recourses') {
        window.open('https://view.xdocin.com/view?src=' + data.tenantId)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.detail_container {
  display: flex;
  justify-content: center;
  align-items: center; // 如果需要垂直居中也加上这句
  flex-direction: column;

  .course_correlation {
    margin: 20px 0;
    width: 1200px;
    height: 120px;
    //opacity: 0.55;
    border-radius: 8px;
    background: linear-gradient(143.9deg, rgba(94, 177, 253, 0.36) 5%, rgba(94, 177, 253, 0) 100%), rgba(107, 216, 186, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    .course_box {
      display: flex;
      align-items: center; // 如果需要垂直居中也加上这句

      .el-icon-arrow-left {
        font-size: 20px;
      }

      .course_pic {
        width: 80px;
        height: 80px;
        margin-left: 20px;
      }

      .course_about {
        margin-left: 20px;

        .course_name {
          font-family: HanSansBold, serif;
          font-size: 16px;
        }

        .course_teacher {
          margin-top: 10px;
        }
      }

      .course_teacher_ai {
        margin-left: auto;
      }
    }

  }

  .menu_click_operation {
    display: flex;

    .menu_tab {
      width: 260px;
      padding-right: 20px;
    }

    .menu_click_view {
      width: 900px;
      background-color: #fff;
      border-radius: 8px;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;

      .notice {

        .notification_box {
          background-color: #f5f5f5;
          margin-top: 16px;
          padding: 10px;
          line-height: 1.8;
        }
      }

      .scoring_standard {
        margin-top: 20px;
      }

      .course_list {
        margin-top: 20px;
      }

      .mind_map {
        img {
          width: 900px;
          height: 600px;
        }
      }

      .recently_notebook {
        .recent {
          margin-top: 26px;
          font-size: 16px;
        }

        .chapter_box {
          margin-top: 20px;

          .chapter {
            font-size: 16px;
            margin-bottom: 10px;
          }

          .chapter_notes {
            line-height: 1.8;
          }
        }

        .el-button {
          display: flex;
          margin-left: auto;
          margin-top: 10px;
        }
      }

      .recently_wrong_title_book {
        width: 860px;
        margin-top: 20px;
        background-color: @primaryBackgroundColor;
        padding: 20px;

        .recent_wrong_title {
          font-size: 16px;
        }

        .wrong_title_name {
          margin-top: 20px;
          background-color: rgba(232, 236, 250, 1);
          padding: 20px;
          height: 192px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .answer {
          margin-top: 20px;
          font-size: 16px;
        }

        .answer_detail {
          padding: 20px;
          margin-top: 10px;
          background-color: rgba(232, 236, 250, 1);
          height: 192px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        }

        .el-button {
          display: flex;
          margin-left: auto;
          margin-top: 20px;
        }
      }
    }

  }

  .el-menu {
    border-radius: 8px;
  }
}
</style>
