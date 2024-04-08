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
            <div class="chapter">排列和逆序数</div>
            <div class="chapter_notes">
              1、排列：将n个不同元素按一定顺序排成一列，叫做这n个元素的全排列，简称
              排列.比如354216就是这6个元素的一个排列
            </div>
            <div class="chapter_notes">
              2、逆序数的计算方法：数出每个数的逆序个数,所有数的逆序个数求和就是排列逆
              序数.
            </div>
            <div class="chapter_notes">
              3、奇排列和偶排列：逆序数为偶数的排列称为偶排列，逆序数为奇数的排列为奇排列
            </div>

          </div>
          <el-button @click.native="gotoNoteDetail" type="primary">更多笔记</el-button>
        </div>
        <!--笔记本结束-->
        <!--错题本开始-->
        <div class="recently_wrong_title_book" v-if="currentMenuIndex==='6'">
          <div class="recent_wrong_title">最新错题</div>
          <div class="wrong_title_name">设0 < X1 <3 , Xn+1=Xn(3-Xn)^1/2 (n=1、2...) 证明数列{Xn} 的极限存在，并求此极限.
          </div>
          <div class="answer">解析</div>
          <div class="answer_detail">
            为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径，并且大大降低了企业的营销成本。
            用户分享内容到社交媒体或好友，不应该是一种粗暴的强制行为，我们应该在保证产品本身内容有吸引力的核心前提下，仔细揣摩用户心理，结合产品本身的特色，在不同情境下提供给用户最合适的分享平台及方式，让用户分享成为一种水到渠成的自然行为，甚至在某些时候还能给用户带来一些小的惊喜就更棒了。
            分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。
            所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截...
          </div>
          <el-button type="primary" @click.native="moreMistakes">更多错题</el-button>
        </div>
        <!--错题本结束-->
      </div>
    </div>
  </div>
</template>

<script>
import {queryCourseProgress, queryMyCourseDetail, queryRemindList} from "@/api/course";
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
      treeData: [
        {
          "id": "chapter1-id",
          "name": "第一章 课程导论与概述",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "section1-1-id",
              "name": "1.1 章节背景与目标",
              "parentId": "chapter1-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": true,
              "tenantId": 0,
              "type": "section",
              "children": [
                {
                  "id": "video1-1-1-id",
                  "name": "1.1.1 视频：课程简介",
                  "parentId": "section1-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 0,
                  "type": "video",
                  "children": null,
                  "star": 3
                },
                // 其他资源...
              ]
            },
            // 更多小节...
          ]
        },
        {
          "id": "chapter2-id",
          "name": "第二章 数据结构基础",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "section2-1-id",
              "name": "2.1 数组与链表",
              "parentId": "chapter2-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": true,
              "tenantId": 0,
              "type": "section",
              "children": [
                // 相关资源...
                {
                  "id": "video1-1-1-id",
                  "name": "2.1.1 视频：课程简介",
                  "parentId": "section1-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 0,
                  "type": "video",
                  "children": null,
                  "star": 3
                },
                {
                  "id": "video1--id",
                  "name": "2.1.2 资源",
                  "parentId": "section1-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 'https://zzd-picgo.oss-cn-hangzhou.aliyuncs.com/0402test.pptx',
                  "type": "recourses",
                  "children": null,
                  "star": 3
                }, {
                  "id": "video1id",
                  "name": "2.1.3 PPT资源",
                  "parentId": "section1-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 'https://zzd-picgo.oss-cn-hangzhou.aliyuncs.com/0403test%20-%20%E5%89%AF%E6%9C%AC.pptx',
                  "type": "recourses",
                  "children": null,
                  "star": 3
                }
              ]
            },
          ]
        },
        {
          "id": "chapter3-id",
          "name": "第三章 树与图",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": []
        },
        {
          "id": "chapter4-id",
          "name": "第四章 堆栈与队列",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": []
        },
        {
          "id": "chapter5-id",
          "name": "第五章 排序与搜索算法",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "section5-1-id",
              "name": "5.1 快速排序与归并排序",
              "parentId": "chapter5-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": true,
              "tenantId": 0,
              "type": "section",
              "children": [
                {
                  "id": "video5-1-1-id",
                  "name": "5.1.1 快速排序原理与实现视频",
                  "parentId": "section5-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 0,
                  "type": "video",
                  "children": null,
                  "star": 3
                },
                {
                  "id": "homework5-1-1-id",
                  "name": "5.1.2 快速排序相关习题",
                  "parentId": "section5-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 0,
                  "type": "homework",
                  "children": null,
                  "star": 3
                },
                {
                  "id": "wrong-1-1-id",
                  "name": "5.1.2 快速排序相关错题",
                  "parentId": "section5-1-id",
                  "showStatus": 0,
                  "lockStatus": 0,
                  "hasChildren": false,
                  "tenantId": 0,
                  "type": "wrongTitle",
                  "children": null,
                  "star": 3
                },
              ]
            },
          ]
        }
      ],

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
        this.courseProgress = res.data
      })
    },
    goBack() {
      this.$router.back();
    },
    moreMistakes() {
      this.$router.push('/mistakeDetail')
    },
    gotoNoteDetail() {
      this.$router.push('/noteDetail')
    },
    handleSelect(index) {
      // 这里你可以保存或处理 index 值
      this.currentMenuIndex = index;
      if (index === '1') {
        this.inquireRemindList()
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
