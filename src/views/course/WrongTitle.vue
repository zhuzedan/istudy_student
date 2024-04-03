<template>
  <div class="homework_container">
    <!--题目类别选择-->
    <div class="title_type">
      <div
          class="type_name"
          v-bind:class="{ 'selected': selectedType === '选择题' }"
          @click="selectType('选择题')"
      >选择题
      </div>
      <div
          class="type_name"
          v-bind:class="{ 'selected': selectedType === '简答题' }"
          @click="selectType('简答题')"
      >简答题
      </div>
    </div>
    <div v-if="selectedType === '选择题'">
      <!--可伸缩题号栏-->
      <div class="title_num_box">
        <div v-if="unfoldStatus" class="title_num" v-for="(number, index) in 1" :key="index">{{ number }}</div>
        <div @click="unOrUpload">
          <i :class="iconClass"></i>
        </div>
      </div>
      <!--题目-->
      <div class="homework_list">
        <div class="homework_box" v-for="(number, index) in 1" :key="index">
          <div class="title_name">1.在单链表指针为p的结点之后插入指针为s的结点，正确的操作是：（ ）。</div>
          <el-radio-group v-model="selectedOption">
            <div class="radio_box">
              <el-radio v-for="option in options" :key="option.value" :label="option.value">
                {{ option.label }}
              </el-radio>
            </div>
          </el-radio-group>
          <i class="el-icon-star-off star-off"></i>
        </div>
      </div>
    </div>
    <div v-if="selectedType === '简答题'">
      <!--可伸缩题号栏-->
      <div class="title_num_box">
        <div v-if="unfoldStatus" class="title_num" v-for="(number, index) in 12" :key="index">{{ number }}</div>
        <div @click="unOrUpload">
          <i :class="iconClass"></i>
        </div>
      </div>
      <!--题目-->
      <div class="homework_list" v-for="(number, index) in 1" :key="index">
        <div class="answer_questions" v-for="(number, index) in 1" :key="index">
          <div class="title_name"> 设0< X1 <3 , Xn+1=Xn(3-Xn)^1/2 (n=1、2...) 证明数列{Xn} 的极限存在，并求此极限.</div>
          <div class="answer_area">
            <div class="analysis_name">解析</div>
            <div class="analysis">由题干易知数列有界，因此可使用单调有界数列必有极限来证明数列极限存在，再将题干求极限即可得到数列极限．
            </div>
          </div>
          <div class="answer_area">
            <div class="analysis_name">讨论</div>
            <div class="course_commit_list">
              <div class="commit_detail">
                <img src="https://img.js.design/assets/smartFill/img264164da72e058.jpeg" alt="">
                <div class="commit_detail_box">
                  <div style="display: flex">
                    <div class="commentator_name">张大伟</div>
                  </div>
                  <div class="commit_content">
                    本题考查数列极限的判定及求解．对于给出递推关系的数列，一般利用“单调有界数列必有极限”来判断极限的存在性．
                  </div>
                  <div class="commit_date">2024年3月24日13:25:00</div>
                </div>
              </div>
              <div class="commit_detail">
                <img src="https://img.js.design/assets/smartFill/img264164da72e058.jpeg" alt="">
                <div class="commit_detail_box">
                  <div style="display: flex">
                    <div class="commentator_name">张大伟</div>
                  </div>
                  <div class="commit_content">
                    函数极限存在性的判别和证明综合．
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
                <el-button type="primary" @click="handleCommit()">发送</el-button>
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
              <div class="analysis">一批零件共100个，次品率为0.1，接连两次从这批零件中任取一个零件，第一次取出的零件不再放回，求第二次才取得正品的概率。</div>
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
</template>
<script>
export default {
  name: "WrongTitle",
  data() {
    return {
      textarea: '',
      selectedType: '简答题',
      unfoldStatus: true,
      iconClass: 'el-icon-arrow-up',
      selectedOption: 'option1', // 初始选择为空或预设值
      options: [
        {label: 'A = E', value: 'option1'},
        {label: 'B = E', value: 'option2'},
        {label: 'A = B', value: 'option3'},
      ],
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
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
  border-radius: 4px;
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

        .el-radio {
          margin-top: 10px;
        }
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
          padding: 20px;
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

            //.el-input {
            //  width: calc(100% - 100px); /* 确保输入框宽度减去按钮宽度 */
            //  flex-grow: 1;
            //}


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


}
</style>
