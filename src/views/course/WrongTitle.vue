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
            <div class="analysis">《永劫无间》S12淬炼赛季即将于4月11日开始，为您带来全新的战斗体验。以下是相关前瞻信息：
              　　- 天赋系统经过重新设计，现在有四大分支可供选择，玩家可以自由组合来展示自己独特的战斗风格。这项改动将于4月3日在测试服上线。
              　　- 新英雄司南星·刘炼将在4月19日进入测试服。
              　　- 赛季中将会有哈迪和天海两位英雄进行调整；而岳山和玉玲珑在赛季末会有所改动。
              　　- 在娱乐方面，游戏将新增两种玩法：热血斗振球（4月3日上线测试服）和变身英雄大乱斗（目前处于制作阶段）。
              　　- 对于天人模式进行了多处调整，例如落物堆道具品质降为良品、货郎上新品等，同时地脉仪也将代替飓风客出现。这些改动都将使战斗更加激烈。
              　　- 水节期间会出现一窝“水”特色玩法，在落物堆和飓风客都可获取。一起来玩夏日水仗吧！
              　　此外，在S12淬炼赛季中还将推出主题时装、青花瓷妖刀姬等新内容。更多详细资讯，请关注《永劫无间》专区。
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
                <el-button type="primary" @click="handleCommit()">发送</el-button>
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
        {label: '选项一', value: 'option1'},
        {label: '选项二', value: 'option2'},
        {label: '选项三', value: 'option3'},
      ],
    }
  },
  methods: {
    selectType(type) {
      this.selectedType = type;
    },
    unOrUpload() {
      console.log('点击了图表')
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
  margin-top: 20px;
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
        width: 1100px;

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

        ::v-deep .el-textarea__inner {
          background-color: @primaryBackgroundColor;
        }


        //评论
        .course_commit_list {
          padding: 20px;
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
            }
          }
        }
      }
    }
  }


}
</style>
