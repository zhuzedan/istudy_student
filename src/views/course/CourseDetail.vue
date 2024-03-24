<template>
  <div class="detail_container">
    <div class="course_correlation">
      <div class="course_box">
        <i class="el-icon-arrow-left"></i>
        <img class="course_pic"
             src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b">
        <div class="course_about">
          <div class="course_name">生物学</div>
          <div class="course_teacher">网易 张二 李三</div>
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
          <div class="notification_box">
            <div class="notification-content">
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
            </div>
            <div class="notification_date">2024-03-23 12:23:34 张老师</div>
          </div>
          <div class="notification_box">
            <div class="notification-content">
              师提醒您第七章：微生物 > 作业：微生物的生态环境截止时间快到啦！请尽快完成！
            </div>
            <div class="notification_date">2024-03-23 12:23:34 张老师</div>
          </div>
          <div class="notification_box">
            <div class="notification-content">
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
            </div>
            <div class="notification_date">2024-03-23 12:23:34 张老师</div>
          </div>
          <div class="notification_box">
            <div class="notification-content">
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
            </div>
            <div class="notification_date">2024-03-23 12:23:34 张老师</div>
          </div>
          <div class="notification_box">
            <div class="notification-content">
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
            </div>
            <div class="notification_date">2024-03-23 12:23:34 张老师</div>
          </div>

          <div class="notification_box">
            <div class="notification-content">
              请同学在规定时间内完成如下任务：
              1、观看教学视频6.4-6.7
              2、完成课前任务23.1
            </div>
            <div class="notification_date">2024-03-23 12:23:34 张老师</div>
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
              :data="treeData"
              :default-expand-all=true
              :props="defaultProps"
              node-key="id"
              :render-content="renderTreeNode"
          />
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
            <div class="chapter">1.1节 顺序查找</div>
            <div class="chapter_notes">
              下面我们会从不同维度来分析一下APP的社交分享功能设计，看看这里面有哪些值得探讨之处。尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。用户主动点击分享 绝大多数APP都是在详...
            </div>
          </div>
          <div class="chapter_box">
            <div class="chapter">1.1节 顺序查找</div>
            <div class="chapter_notes">
              下面我们会从不同维度来分析一下APP的社交分享功能设计，看看这里面有哪些值得探讨之处。尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。用户主动点击分享 绝大多数APP都是在详...
            </div>
          </div>
          <div class="chapter_box">
            <div class="chapter">1.1节 顺序查找</div>
            <div class="chapter_notes">
              下面我们会从不同维度来分析一下APP的社交分享功能设计，看看这里面有哪些值得探讨之处。尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。用户主动点击分享 绝大多数APP都是在详...
            </div>
          </div>
          <div class="chapter_box">
            <div class="chapter">1.1节 顺序查找</div>
            <div class="chapter_notes">
              下面我们会从不同维度来分析一下APP的社交分享功能设计，看看这里面有哪些值得探讨之处。尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。用户主动点击分享 绝大多数APP都是在详...
            </div>
          </div>
          <div class="chapter_box">
            <div class="chapter">1.1节 顺序查找</div>
            <div class="chapter_notes">
              下面我们会从不同维度来分析一下APP的社交分享功能设计，看看这里面有哪些值得探讨之处。尤其是刚上线的产品，很难通过产品的内部体系来实现快速的用户增长，所以会更加依赖于分享来达到广泛的传播，获取目标用户。分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。用户主动点击分享 绝大多数APP都是在详...
            </div>
          </div>
          <el-button type="primary">更多笔记</el-button>
        </div>
        <!--笔记本结束-->
        <!--错题本开始-->
        <div class="recently_wrong_title_book" v-if="currentMenuIndex==='6'">
          <div class="recent_wrong_title">最新错题</div>
          <div class="wrong_title_name">设0 < X1 <3 , Xn+1=Xn(3-Xn)^1/2 (n=1、2...) 证明数列{Xn} 的极限存在，并求此极限.</div>
          <div class="answer">解析</div>
          <div class="answer_detail">
            为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上绝大多数APP都有第三方分享的功能，它是内容分发的最有效途径，并且大大降低了企业的营销成本。
            用户分享内容到社交媒体或好友，不应该是一种粗暴的强制行为，我们应该在保证产品本身内容有吸引力的核心前提下，仔细揣摩用户心理，结合产品本身的特色，在不同情境下提供给用户最合适的分享平台及方式，让用户分享成为一种水到渠成的自然行为，甚至在某些时候还能给用户带来一些小的惊喜就更棒了。
            分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。
            所以监听用户的截图操作，提示用户进行分享，既缩短了以前分享截图的操作路径，避免了在之前长路径中的行为流失（比如截...
          </div>
          <el-button type="primary">更多错题</el-button>
        </div>
        <!--错题本结束-->

      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "CourseDetail",
  data() {
    return {
      currentMenuIndex: '1',
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
          id: 1,
          label: '第一章：生命之美',
          children: [
            {
              id: 74,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '视频',
                },
                {
                  id: 10,
                  label: '习题',
                },
                {
                  id: 11,
                  label: '资料',
                },
                {
                  id: 12,
                  label: '错题重做',
                },
              ],
            },
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '视频',
                },
                {
                  id: 10,
                  label: '习题',
                },
                {
                  id: 11,
                  label: '资料',
                },
                {
                  id: 12,
                  label: '错题重做',
                },
              ],
            }
            // 更多第二级节点...
          ],
        },
        {
          id: 61,
          label: '第一章：生命之美',
          children: [
            {
              id: 64,
              label: '二级 1-1',
              children: [
                {
                  id: 69,
                  label: '视频',
                },
                {
                  id: 610,
                  label: '习题',
                },
                {
                  id: 611,
                  label: '资料',
                },
                {
                  id: 612,
                  label: '错题重做',
                },
              ],
            },
            // 更多第二级节点...
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    handleSelect(index) {
      console.log('Selected menu index:', index);
      // 这里你可以保存或处理 index 值
      this.currentMenuIndex = index;
    },
    renderTreeNode(h, {node, data, store}) {
      const hasChildren = node.childNodes && node.childNodes.length;

      return (
          <span>
          {node.level === 2 && (
              <i class="el-icon-folder-opened"></i>
          )}
            {node.level === 3 && (
                <i class="el-icon-document"></i>
            )}
            {node.label}
        </span>
      );
    },
  }
}
</script>

<style lang="less" scoped>
.detail_container {
  display: flex;
  justify-content: center;
  align-items: center; // 如果需要垂直居中也加上这句
  flex-direction: column;

  .course_correlation {
    margin-top: 26px;
    width: 1500px;
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
          font-family: HanSansBold;
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
    margin-top: 20px;

    .menu_tab {
      width: 300px;
      padding-right: 20px;
    }

    .menu_click_view {
      width: 900px;
      height: auto;
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
