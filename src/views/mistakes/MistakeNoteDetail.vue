<template>
  <div class="note_detail_container">
    <div class="detail_container">
      <!--左边栏笔记目录-->
      <div class="left_category">
        <div class="category_name">目录</div>
        <el-tree
            :data="noteDirectory"
            :default-expand-all="true"
            :props="directoryTreeProps"
            node-key="passageId"
            :current-node-key="currentPassageId"
            ref="treeSelect"
            :highlight-current="true"
            :render-content="renderTreeNode"
            @node-click="onNodeClick"
        />
      </div>
      <!--右边栏笔记-->
      <div class="right_note">
        <!--题型选择栏-->
        <div class="title_type">
          <div v-for="item in wrongListByPassageResp"
               class="type_name"
               v-bind:class="{ 'selected': selectedType === item.questionType }"
               @click="selectTypeBtn(item.questionType)"
          >{{ item.questionTypeName }}
          </div>
        </div>
        <!--可伸缩题号栏-->
        <div class="title_num_box">
          <div @click="selectQuestion(index)" v-if="unfoldStatus" class="title_num"
               v-bind:class="{ 'selected': selectedWrong === index }"
               v-for="(wrong, index) in wrongInfoList" :key="wrong.questionId">
            {{ index + 1 }}
          </div>
          <div @click="unOrUpload">
            <i :class="iconClass"></i>
          </div>
        </div>
        <div>
          <!--题目-->
          <div class="homework_list">
            <div class="answer_questions">
              <div class="title_name">{{ wrongInfo.questionContent }}</div>
              <div class="answer_area">
                <div class="analysis_name">解析</div>
                <div class="analysis">{{ wrongInfo.questionAnalysis }}</div>
              </div>
              <div class="answer_area">
                <!--课程讨论-->
                <div class="analysis_name">讨论</div>
                <div class="course_commit_list">
                  <div class="commit_detail" v-for="item in wrongDiscussList">
                    <img :src="item.avatar" alt="">
                    <div class="commit_detail_box">
                      <div style="display: flex">
                        <div class="commentator_name">{{ item.nickName }}</div>
                      </div>
                      <div class="commit_content">{{ item.discussContent }}</div>
                      <div class="commit_date">{{ formatCommitDate(item.pushTime) }}</div>
                    </div>
                  </div>
                  <!-- 添加操作区域 -->
                  <div class="commit_operation">

                    <el-input
                        ref="textareaInput"
                        type="textarea"
                        placeholder="请输入评论"
                        v-model="insertDiscussReq.discussContent"
                        autosize
                        minRows="2"
                        maxRows="6">
                    </el-input>
                    <el-button type="primary" @click="handleQuestionDiscuss()">发送</el-button>
                  </div>
                </div>
              </div>
              <div class="answer_area">
                <div class="analysis_name">相关习题</div>
                <div>
                  <div class="analysis">已知向量a1，a2，a3线性无关，b1=a1+a2，b2=a2+a3，b3=a3+a1，证明b1，b2，b3线性无关。</div>
                  <div class="input_answer">
                    <el-input type="textarea" :rows="4" placeholder="作答区域"></el-input>
                  </div>
                  <div class="submit_one_about_question">
                    <el-button type="primary">提交</el-button>
                  </div>
                </div>
                <div>
                  <div class="analysis">
                    一批零件共100个，次品率为0.1，接连两次从这批零件中任取一个零件，第一次取出的零件不再放回，求第二次才取得正品的概率。
                  </div>
                  <div class="input_answer">
                    <el-input type="textarea" :rows="4" placeholder="作答区域"></el-input>
                  </div>
                  <div class="submit_one_about_question">
                    <el-button type="primary">提交</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import WrongTitle from "@/views/course/WrongTitle.vue";
import {queryNoteDirectory} from "@/api/note";
import {insertQuestionDiscuss, queryAllWrongList, queryQuestionDiscuss} from "@/api/mistake";
import {formatTimestamp} from '@/utils/time'

export default {
  name: "MistakeNoteDetail",
  components: {
    WrongTitle
  },
  computed: {},
  data() {
    return {
      noteDirectory: [],
      selectionId: '',
      currentPassageId: '',  // 当前选中的小节
      currentPassageTitle: '', //当前选中的小节名称
      wrongListByPassageResp: [], //错题列表出参
      directoryTreeProps: {
        children: 'subPassageList',
        label: 'passageTitle'
      },
      drawer: false,
      textarea: '',
      selectedType: 1, //当前选中的错题类型
      wrongInfoList: [], //当前类型对应的错题列表
      wrongInfo: {}, //当前类型第一道错题
      selectedWrong: 0,
      unfoldStatus: true,
      iconClass: 'el-icon-arrow-up',
      insertDiscussReq: {
        discussContent: ''
      }, //添加讨论入参
      wrongDiscussList: []  //错题讨论
    }
  },
  created() {
    this.selectionId = this.$route.query.selectionId
    this.inquireNoteDirectory().then(() => this.inquireWrongListByPassage());
  },
  methods: {
    formatCommitDate(timestamp) {
      return formatTimestamp(timestamp);
    },
    // 目录
    inquireNoteDirectory() {
      return new Promise((resolve, reject) => {
        queryNoteDirectory(this.selectionId).then((res) => {
          this.noteDirectory = res.data;
          this.currentPassageId = res.data[0].subPassageList[0].passageId;
          this.currentPassageTitle = res.data[0].subPassageList[0].passageTitle;
          //把当前选择的key设置到el-tree中
          this.$nextTick(function () {
            this.$refs['treeSelect'].setCurrentKey(this.currentPassageId)
          })
          resolve();
        }).catch(reject);
      });
    },
    // 查看章节错题
    inquireWrongListByPassage() {
      queryAllWrongList(this.currentPassageId, this.selectionId).then((res) => {
        this.wrongListByPassageResp = res.data
        for (const obj of res.data) {
          if (obj.questionType === this.selectedType) {
            // 当前题目类型的错题
            this.wrongInfoList = obj.wrongInfoList;
            //当前题目类型下的第一道错题
            this.wrongInfo = obj.wrongInfoList[0]
            const info = obj.wrongInfoList[0]
            if (info.questionType === 1) {
              this.wrongInfo.options = info.option.split(";")
            }
            //错题讨论接口
            this.inquireQuestionDiscus();
          }
        }
      })
    },
    //添加错题讨论
    handleQuestionDiscuss() {
      this.$confirm('是否发送讨论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
          .then(() => {
            insertQuestionDiscuss(this.insertDiscussReq.discussContent, this.wrongInfo.questionId, this.wrongInfo.wrongId).then((res) => {
              if (res.success) {
                this.$message.success('发送成功')
                this.insertDiscussReq.discussContent = ''
              }
            })
          })
          .then(this.inquireQuestionDiscus)
          .catch(() => {
            this.$message.info('取消发送')
          })
    },
    //错题讨论接口查询
    inquireQuestionDiscus() {
      queryQuestionDiscuss(this.wrongInfo.questionId, this.wrongInfo.wrongId).then((res) => {
        this.wrongDiscussList = res.data
      })
    },
    // 点击左侧章小节
    onNodeClick(node) {
      this.currentPassageId = node.passageId;
      this.inquireWrongListByPassage()
    },
    // 目录树渲染
    renderTreeNode(h, {node}) {
      return (
          <span>
          {node.level === 1 && (<i class="el-icon-folder-opened"/>)}
            {node.level === 2 && (<i class="el-icon-document"/>)}
            {node.label}
        </span>
      );
    },
    // 选择错题类型
    selectTypeBtn(type) {
      this.selectedWrong = 0
      this.selectedType = type;
      this.inquireWrongListByPassage()
    },
    // 选择具体错题
    selectQuestion(index) {
      this.selectedWrong = index
      this.wrongInfo = this.wrongInfoList[index]
      this.inquireQuestionDiscus()
    },
    unOrUpload() {
      this.unfoldStatus = !this.unfoldStatus;
      this.iconClass = this.unfoldStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
    }
  }
}
</script>

<style scoped lang="less">
.note_detail_container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  .detail_container {
    display: flex;
    width: 1200px;
    padding: 20px;

    .left_category {
      width: 280px;
      background-color: #fff;

      .category_name {
        font-size: 16px;
        margin: 10px;
        font-family: HanSansBold, serif;
      }

      // tree 的高度和宽度重新定义
      ::v-deep.el-tree .el-tree-node > .el-tree-node__content {
        height: 34px;
      }
    }

    .right_note {
      width: 900px;
      margin-left: 10px;
      background-color: #fff;
      border-radius: 4px;

      .title_type {
        display: flex;
        font-size: 16px;

        .type_name {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 10px 20px;
          border-radius: 8px 8px 0 0;
          margin-right: 10px;
          background-color: @primaryBackgroundColor;
          cursor: pointer;

          &.selected {
            background-color: @primaryColor;
            color: @primaryBackgroundColor;
          }

        }
      }

      .title_num_box {
        background-color: @primaryBackgroundColor;
        border-radius: 0 0 12px 12px;
        display: flex;
        align-items: center;
        padding: 0 50px;
        flex-wrap: wrap;
        margin-bottom: 20px;

        .title_num {
          margin: 10px;
          display: flex;
          cursor: pointer;
          background-color: #fff;
          border: 1px solid @primaryColor;
          justify-content: center;
          border-radius: 4px;
          align-items: center;
          width: 30px;
          height: 30px;

          &.selected {
            background-color: @primaryColor;
            color: @primaryBackgroundColor;
          }
        }

        i {
          font-size: 20px;
          margin: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .homework_list {
        .homework_box {
          margin: 10px 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: 1px solid @primaryBackgroundColor;

          .radio_box {
            display: flex;
            flex-direction: column;
            margin-bottom: 10px;

            .el-radio {
              margin-top: 10px;
            }
          }

          .title_name {
            margin-bottom: 10px;
          }

          .star-off {
            display: flex;
            margin-left: auto;
            margin-bottom: 10px;
          }
        }

        //  简答题样式
        .answer_questions {
          border-radius: 0 0 12px 12px;
          display: flex;
          padding: 0 50px;
          flex-wrap: wrap;
          margin-bottom: 20px;
          flex-direction: column;

          .title_name {
            margin-bottom: 20px;
          }

          .answer_area {
            margin-bottom: 20px;
            border-radius: 8px;
            background-color: @primaryBackgroundColor;
            padding: 10px;

            .analysis_name {
              font-size: 16px;
            }

            .analysis {
              margin-top: 10px;
            }

            .input_answer {
              margin-top: 10px;
            }

            .submit_one_about_question {
              .el-button {
                display: flex;
                margin-left: auto;
              }
            }

            ::v-deep .el-textarea__inner {
              background-color: @primaryBackgroundColor;
            }


            //评论
            .course_commit_list {
              display: flex;
              position: relative;
              justify-content: center;
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
                text-align: center;

                .el-button {
                  margin: 0 !important;
                  background-color: @primaryColor;
                  border-color: @primaryColor;
                }

                .input-with-rating-container {
                  display: flex;
                  align-items: center;
                  width: 100%;
                }

                .el-textarea {
                  display: inline-block;
                }
              }
            }
          }
        }
      }

      .el-button {
        margin: 10px 0;
      }

      .one_note_operation {
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;

        .one_note_bottom {
          display: flex;
          margin-top: 8px;

          .release_time {
            color: @primaryNoSelected;
          }

          .icon_button {
            margin-left: auto;

            i {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

}
</style>
