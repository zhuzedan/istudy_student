<template>
  <div class="homework_container">
    <!--题目类别选择-->
    <div class="title_type">
      <div v-for="item in homeworkListResp"
           class="type_name"
           v-bind:class="{ 'selected': selectedType === item.questionType }"
           @click="selectTypeBtn(item.questionType)"
      >{{ item.questionTypeName }}
      </div>
    </div>
    <!--可伸缩题号栏-->
    <div class="title_num_box">
      <div @click="selectQuestion(index)" v-if="unfoldStatus" v-bind:class="{ 'selected': selectedQuestion === index }"
           class="title_num" v-for="(item,index) in homeworkInfoList" :key="item.questionId">
        {{ index + 1 }}
      </div>
      <div @click="unOrUpload">
        <i :class="iconClass"></i>
      </div>
    </div>
    <!--题目-->
    <div class="homework_list">
      <div class="homework_box" v-for="(item, index) in homeworkInfoList" :key="index">
        <div class="title_name">{{ index + 1 }}.{{ item.questionContent }}</div>
        {{ item.options }}
        <!--选择题-->
        <!--<el-radio-group v-if="selectedType === 1">-->
        <!--  <div class="radio_box">-->
        <!--    <el-radio v-for="option in questionOptions(item)" >-->
        <!--      {{ option }}-->
        <!--    </el-radio>-->
        <!--  </div>-->
        <!--</el-radio-group>-->
        <!--简答题-->
        <div class="answer_questions" v-if="selectedType === 4">
          <div class="answer_area">
            <el-input
                type="textarea"
                :rows="10"
                placeholder="请输入内容"
                v-model="textarea">
            </el-input>
            <div class="answer_icon_btn">
              <div class="upload_name">上传附件</div>
              <i class="el-icon-upload"></i>
            </div>
          </div>
        </div>
        <i :class="{ 'el-icon-star-off': !item.favourite, 'el-icon-star-on': item.favourite }"
           @click="toggleStar(item)"></i>
      </div>
    </div>
    <!--提交按钮-->
    <el-button class="summit_btn" type="primary">提交</el-button>
  </div>
</template>
<script>
import {queryQuestionByHid} from "@/api/course";

export default {
  name: "Homework",
  data() {
    return {
      selectionId: '',
      uniqueId: '',
      homeworkListResp: [],
      selectedType: 1, //当前选中的错题类型
      homeworkInfoList: [],
      homeworkInfo: {},
      selectedQuestion: 0,
      isStarActive: false,
      textarea: '',
      unfoldStatus: true,
      iconClass: 'el-icon-arrow-up',
    }
  },
  computed: {
    questionOptions(options) {
      console.log('options', options)
      return options.split(";")
    }
  },
  created() {
    this.selectionId = this.$route.query.selectionId
    this.uniqueId = this.$route.query.uniqueId
    this.inquireQuestionByHid()
  },
  methods: {
    //查询当前类型下的题目
    inquireCurrentQuestion() {
      for (const obj of this.homeworkListResp) {
        if (obj.questionType === this.selectedType) {
          // 当前题目类型的题目
          this.homeworkInfoList = obj.questionBankList;
          //当前题目类型下的第一道题目
          this.homeworkInfo = this.homeworkInfoList[0]
        }
      }
    },
    //查询作业列表
    inquireQuestionByHid() {
      queryQuestionByHid(this.uniqueId).then((res) => {
        this.homeworkListResp = res.data
      }).then(() => {
        this.inquireCurrentQuestion()
      })
    },
    // 题目类型选择
    selectTypeBtn(type) {
      this.selectedQuestion = 0
      this.selectedType = type;
      this.inquireCurrentQuestion()
    },
    // 选择具体题目
    selectQuestion(index) {
      this.selectedQuestion = index
      this.homeworkInfo = this.homeworkInfoList[index]
    },
    toggleStar(item) {
      item.favourite = !item.favourite;
    },
    unOrUpload() {
      this.unfoldStatus = !this.unfoldStatus;
      this.iconClass = this.unfoldStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
    }
  }
}
</script>

<style lang="less" scoped>
.homework_container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  width: 1200px;
  display: flex;
  flex-direction: column;

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
      transition: background-color 0.3s, color 0.3s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
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

      .answer_questions {
        border-radius: 0 12px;
        display: flex;
        padding: 0;
        margin: 10px 0;
        flex-wrap: wrap;
        flex-direction: column;

        .answer_area {
          border-radius: 8px;
          background-color: @primaryBackgroundColor;

          ::v-deep .el-textarea__inner {
            background-color: @primaryBackgroundColor;
          }

          .summit_btn {
            display: flex;
            margin: 20px 50px 20px auto;
          }

          .answer_icon_btn {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin: 0 20px;

            .upload_name {
              color: @primaryNoSelected;
            }

            i {
              font-size: 30px;
              color: @primaryNoSelected;
            }

            .answer_btn {
              margin-left: 20px;
              background-color: @primaryColor;
              border-color: @primaryColor;
            }
          }
        }
      }

      .radio_box {
        display: flex;
        flex-direction: column;
        width: 1100px;

        .el-radio {
          margin-top: 10px;
        }
      }

      i {
        font-size: 18px;
        display: flex;
        margin-left: auto;
        margin-bottom: 10px;
        color: #F7BA2A;
      }
    }

  }

  .el-button {
    display: flex;
    background-color: @primaryColor;
    border-color: @primaryColor;
    margin-left: auto;
    margin-bottom: 10px;
    margin-right: 10px;
  }

}
</style>
