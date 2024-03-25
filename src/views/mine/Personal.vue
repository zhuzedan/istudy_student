<template>
  <div class="detail_container">
    <div class="menu_click_operation">
      <div class="menu_tab">
        <el-menu :default-active="currentMenuIndex" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-odometer"></i>
            <span slot="title">学习情况</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-key"></i>
            <span slot="title">账户安全</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="menu_click_view">
        <!--学习情况开始-->
        <div class="study_situation">
          <div class="study_situation_top">
            <div class="situation_top_left">
              <el-select v-model="value" placeholder="请选择学学期">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <div class="course" v-for="(number, index) in 3" :key="index">毛泽东思想概论</div>
            </div>
            <div class="situation_top_right">
              <div class="star_level">课程星级</div>
              <div class="star_level_chart">星图</div>
              <div class="start_commit">
                <div class="start_commit_left">
                  <div class="commit_left_content">您好像对第七章：微生物 中</div>
                  <div class="commit_left_content">第七章：微生物 中的微生物的生态环境一节很不熟悉呢。您这一节的平均</div>
                  <div class="commit_left_content">第七章：微生物 中的微生物的生态环境一节很不熟悉呢。您这一节的平均</div>
                </div>
                <div class="start_commit_left">
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下8-9章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下8-9章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下8-9章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="study_situation_bottom">
            <div class="course_process">
              <div class="course_title">课程总体进度</div>
            </div>
            <div class="course_process">
              <div class="course_title">课程评价</div>
            </div>
          </div>
        </div>
        <!--学习情况结束-->
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
              @node-click="handleNodeClick"
          />
        </div>
        <!--课程结束-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      currentMenuIndex: '1',
      url: 'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      srcList: [
        'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      ],
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
                  label: '错题',
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
                  label: '错题',
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
                  label: '错题',
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
    handleNodeClick(data) {
      console.log(data.label);
      if (data.label === '视频') {
        this.$router.push('/courseDetail/videoCourse')
      }
      if (data.label === '习题') {
        this.$router.push('/courseDetail/homework')
      }
      if (data.label === '错题') {
        this.$router.push('/courseDetail/wrongTitle')
      }
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

  .menu_click_operation {
    display: flex;
    margin-top: 20px;

    .menu_tab {
      width: 260px;
      padding-right: 20px;
    }

    .menu_click_view {
      width: 900px;
      height: auto;
      background-color: #fff;
      border-radius: 8px;

      .study_situation {
        .study_situation_top {
          display: flex;
          height: 550px;

          .situation_top_left {
            padding: 10px;
            width: 210px;
            background-color: @primaryBackgroundColor;
            overflow-y: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

            .course {
              height: 38px;
              position: relative;
              display: flex;
              padding-left: 10px;
              flex-direction: column;
              border-radius: 4px;
              //background-color: #fff;
              justify-content: center;
            }
          }

          .situation_top_right {
            display: flex;
            flex-direction: column;
            padding: 10px 10px 0 10px;
            position: relative;
            width: 100%;

            .star_level {
              font-size: 16px;
            }

            .star_level_chart {
              height: 200px;
              //background-color: #3165F6;
              width: auto;
            }

            .start_commit {
              display: flex;

              .start_commit_left {
                height: 310px;
                width: 48%;
                background-color: @primaryBackgroundColor;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                padding: 10px;
                margin: 10px 10px 0 10px;

                .commit_left_content {
                  margin-bottom: 10px;
                }

                .improve_box {
                  margin-bottom: 10px;
                  display: flex;
                  position: relative;
                  align-items: center;
                }
              }
            }
          }
        }

        .study_situation_bottom {
          margin-top: 10px;
          display: flex;
          height: 400px;
          justify-content: center;
          margin-bottom: 20px;
          .course_process {
            width: 45%;
            background-color: #fff;
            border-radius: 8px;
            padding: 10px;
            margin: 0 10px 0 10px;
            box-shadow: 0 2px 4px  rgba(0, 0, 0, 0.25);
            .course_title {
              font-size: 16px;
              font-family: HanSansBold;
            }

          }
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
