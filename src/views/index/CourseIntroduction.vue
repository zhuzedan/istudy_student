<template>
  <div class="parent_container">
    <div class="course_container">
      <div class="course_intro">
        <img src="https://img.js.design/assets/img/65f545e8e61fb8515f81fac8.png#280890fa034393cbfa2a5f2671e6e8d4"
             alt="">
        <div class="course_about">
          <div class="course_name">生物学</div>
          <div class="course_teacher">沈长庆、张长弓、李四</div>
          <div class="course_description">生物学（biology）是探索 生命现象 和 生命活动规律 的科学，是 自然科学 中的一门 基础学科 。 其研究对象是生物（包括 植物 、 动物 和 微生物
            ）的结构功能、发生和发展规律。 其目的在于阐明和控制 生命活动
            ，改造自然，为农业、工业和医学等实践服务。本课程不仅为同学们展示了动物发育过程的动态美，植物生命活动的绿色美，微生物世界的微观美，还探讨了生命的分子及细胞基础，生命的起源及演化。
          </div>
        </div>
      </div>
      <div class="course_action">
        <div class="student_count">8888人正在学习</div>
        <el-button type="primary">添加课程</el-button>
      </div>
    </div>

    <div class="course_outline">
      <div class="course_title">
        <div class="course_dialog" :class="{ active: activeTab === 'dialog' }" @click="toggleActive('dialog')">课程大纲
        </div>
        <div class="course_commit" :class="{ active: activeTab === 'commit' }" @click="toggleActive('commit')">课程评价
        </div>
      </div>
      <div class="course_dialog_list" v-if="activeTab === 'dialog'">
        <el-tree
            :data="treeData"
            :default-expand-all=true
            :props="defaultProps"
            node-key="id"
            :render-content="renderTreeNode"
        />
      </div>
      <div class="course_commit_list" v-if="activeTab === 'commit'">
        <div class="commit_detail">
          <img src="https://img.js.design/assets/smartFill/img264164da72e058.jpeg" alt="">
          <div class="commit_detail_box">
            <div style="display: flex">
              <div class="commentator_name">张大伟</div>
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
              </el-rate>
            </div>
            <div class="commit_content">
              分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上是业的营销成本。现在很多APP在用户截图时会自动提示用户是否要进行分享。这个时机确实抓的很棒，一般来说，用户截图大多数时候都是为了分享给他人，少部分是为了留底备份。
            </div>
            <div class="commit_date">2024年3月24日13:25:00</div>
          </div>
        </div>
        <div class="commit_detail">
          <img src="https://img.js.design/assets/smartFill/img264164da72e058.jpeg" alt="">
          <div class="commit_detail_box">
            <div style="display: flex">
              <div class="commentator_name">张大伟</div>
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
              </el-rate>
            </div>
            <div class="commit_content">
              分享时机，在不同的时机分析用户是否有分享的意愿，提供给他们合适的分享内容，能让分享的效果更好。为了借助社交产品的流量，让用户主动分享APP中的内容到社交平台来达到拉新和促活的目的，市场上是业的营销成本。现在很多APP在用户截图时会自动提示用户是否要进行分享。这个时机确实抓的很棒，一般来说，用户截图大多数时候都是为了分享给他人，少部分是为了留底备份。
            </div>
            <div class="commit_date">2024年3月24日13:25:00</div>
          </div>
        </div>
        <!-- 添加操作区域 -->
        <div class="commit_operation">

          <el-input
              ref="textareaInput"
              type="textarea"
              placeholder="请输入评论"
              v-model="textarea"
              autosize
              minRows="2"
              maxRows="6">
          </el-input>
          <el-rate
              v-model="commitRating"
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>

          <el-button type="primary" @click="handleCommit()">发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CourseIntroduction",
  data() {
    return {
      textarea: '',
      activeTab: 'dialog',
      value: 3.7,
      commitRating: 5,
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
    };
  },

  methods: {
    toggleActive(tabName) {
      this.activeTab = tabName;
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
    handleCommit() {
      console.log('发送一条评论')
    }
  }
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
        color: rgba(153, 153, 153, 1);
        cursor: pointer;

        &.active {
          font-family: HanSansBold;
          color: #000;
        }
      }

      .course_commit {
        color: rgba(153, 153, 153, 1);
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
      //background-color: @primaryBackgroundColor;
      //box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
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
            color: rgba(153, 153, 153, 1);
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
