<template>
  <div class="homework_container">
    <div class="title_num_box">
      <div v-if="unfoldStatus" class="title_num" v-for="(number, index) in 12" :key="index">{{ number }}</div>
      <div @click="unOrUpload">
        <i :class="iconClass"></i>
      </div>
    </div>
    <div class="homework_title">
      <div class="title_name">1.在单链表指针为p的结点之后插入指针为s的结点，正确的操作是：（ ）。</div>
      <el-radio-group v-model="selectedOption">
        <div style="display: flex; flex-direction: column">
          <el-radio v-for="option in options" :key="option.value" :label="option.value">
            {{ option.label }}
          </el-radio>
        </div>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
export default {
  name: "Homework",
  data() {
    return {
      unfoldStatus: true,
      iconClass: 'el-icon-arrow-up',
      selectedOption: '', // 初始选择为空或预设值
      options: [
        {label: '选项一', value: 'option1'},
        {label: '选项二', value: 'option2'},
        {label: '选项三', value: 'option3'},
      ],
    }
  },
  methods: {
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
  height: 700px;
  display: flex;
  flex-direction: column;

  .title_num_box {
    background-color: @primaryColor;
    border-radius: 0 0 12px 12px;
    display: flex;
    align-items: center;
    padding: 0 50px;
    flex-wrap: wrap;

    .title_num {
      margin: 10px;
      display: flex;
      background-color: #fff;
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

}
</style>
