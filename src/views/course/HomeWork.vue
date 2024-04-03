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
        <div v-if="unfoldStatus" class="title_num" v-for="(number, index) in homeworkChoice.length" :key="index">
          {{ number }}
        </div>
        <div @click="unOrUpload">
          <i :class="iconClass"></i>
        </div>
      </div>
      <!--题目-->
      <div class="homework_list">
        <div class="homework_box" v-for="(item, index) in homeworkChoice" :key="index">
          <div class="title_name">1.{{ item.title }}</div>
          <el-radio-group v-model="item.selectedOption">
            <div class="radio_box">
              <el-radio v-for="option in item.radioOption" :key="option.value" :label="option.value">
                {{ option.label }}
              </el-radio>
            </div>
          </el-radio-group>
          <i :class="{ 'el-icon-star-off': !item.favourite, 'el-icon-star-on': item.favourite }" @click="toggleStar(item)"></i>
        </div>
      </div>
      <!--提交按钮-->
      <el-button class="summit_btn" type="primary">提交</el-button>
    </div>
    <div v-if="selectedType === '简答题'">
      <!--可伸缩题号栏-->
      <div class="title_num_box">
        <div v-if="unfoldStatus" class="title_num" v-for="(number, index) in 2" :key="index">{{ number }}</div>
        <div @click="unOrUpload">
          <i :class="iconClass"></i>
        </div>
      </div>
      <!--题目-->
      <div class="homework_list">
        <div class="answer_questions" v-for="(number, index) in 2" :key="index">
          <div class="title_name"> 设0< X1 <3 , Xn+1=Xn(3-Xn)^1/2 (n=1、2...) 证明数列{Xn} 的极限存在，并求此极限.</div>
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
              <el-button class="answer_btn" type="primary">提交</el-button>
            </div>

          </div>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  name: "Homework",
  data() {
    return {
      isStarActive: false,
      homeworkChoice: [
        {
          title: '设线性无关的向量组a1,a2,a3,a4可由向量组b1,b2……bs线性突出，则必有（）',
          radioOption: [
            {label: 'A.b1,b2……bs线性相关', value: 'option1'},
            {label: 'B.b1,b2……bs线性无关', value: 'option2'},
            {label: 'C.s>=4', value: 'option3'},
            {label: 'D.s<4', value: 'option4'},
          ],
          selectedOption: '',
          favourite: false
        },
        {
          title: '设a1,a2……as均为n维列向量，A是m*n矩阵，下列正确的是（）',
          radioOption: [
            {label: 'A.若a1,a2……as线性相关，则Aa1,Aa2……Aas线性相关', value: 'option1'},
            {label: 'B.若a1,a2……as线性相关，则Aa1,Aa2……Aas线性无关', value: 'option2'},
            {label: 'C.若a1,a2……as线性无关，则Aa1,Aa2……Aas线性相关', value: 'option3'},
            {label: 'D.若a1,a2……as线性无关，则Aa1,Aa2……Aas线性无关', value: 'option4'},
          ],
          selectedOption: '',
          favourite: false
        }, {
          title: '设线性无关的向量组a1,a2,a3,a4可由向量组b1,b2……bs线性突出，则必有（）',
          radioOption: [
            {label: 'A.b1,b2……bs线性相关', value: 'option1'},
            {label: 'B.b1,b2……bs线性无关', value: 'option2'},
            {label: 'C.s>=4', value: 'option3'},
            {label: 'D.s<4', value: 'option4'},
          ],
          selectedOption: '',
          favourite: false
        }

      ],
      textarea: '',
      selectedType: '选择题',
      unfoldStatus: true,
      iconClass: 'el-icon-arrow-up',
      selectedOption: '', // 初始选择为空或预设值
    }
  },
  methods: {
    toggleStar(item) {
      item.favourite = !item.favourite;
    },
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

      i {
        font-size: 18px;
        display: flex;
        margin-left: auto;
        margin-bottom: 10px;
        color: #F7BA2A;
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
        height: 300px;
        border-radius: 8px;
        background-color: @primaryBackgroundColor;

        ::v-deep .el-textarea__inner {
          background-color: @primaryBackgroundColor;
        }

        .summit_btn {
          display: flex;
          margin: 20px 50px 20px auto;
        }
      }

      .answer_icon_btn {
        display: flex;
        justify-content: flex-end;
        margin: 20px 50px 20px 0;
        align-items: center;

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
