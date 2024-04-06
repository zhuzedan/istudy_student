<template>
  <el-select v-model="selectedSemesterId" @change="onSemesterChange" placeholder="请选择">
    <el-option
        v-for="item in semesterList"
        :key="item.semesterId"
        :label="item.openSemester"
        :value="item.semesterId">
    </el-option>
  </el-select>
</template>

<script>
import { querySemester } from '@/api/common';

export default {
  name: 'SemesterSelector',
  props: {
    initialSemesterId: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      semesterList: [
        {
          semesterId: '',
          currentSemester: '',
          openSemester: '全部',
        },
      ],
      selectedSemesterId: this.initialSemesterId,
    };
  },
  created() {
    this.inquireSemester();
  },
  methods: {
    // 学年学期列表
    inquireSemester() {
      querySemester().then((res) => {
        const { data } = res;
        this.semesterList = this.semesterList.concat(data);

        // 如果传入的 initialSemesterId 无效，尝试获取当前学期semesterId
        // if (!this.selectedSemesterId) {
        //   const currentSemesterItem = this.semesterList.find(
        //       (item) => item.currentSemester === 1
        //   );
        //   this.selectedSemesterId = currentSemesterItem?.semesterId || '';
        // }
      });
    },
    // 学期选择器触发
    onSemesterChange(e) {
      this.$emit('semester-change', e);
    },
  },
};
</script>

<style lang="less" scoped>

</style>
