<template>
  <div class="parent_container">
    <div class="course_container">
      <!--选择器-->
      <el-row :gutter="20">
        <el-col :span="6" :offset="18">
          <div class="grid-content">
            <semester-selector :initial-semester-id="semesterId" @semester-change="onSemesterChangeFromComponent"/>
          </div>
        </el-col>
      </el-row>
      <!--空状态-->
      <el-empty v-if="wrongList && wrongList.length === 0" description="暂无数据"></el-empty>
      <!--全部笔记列表-->
      <div class="discipline_list">
        <div class="discipline_class" @click="gotoMistakeDetail(item.selectionId)" v-for="item in wrongList">
          <img src="@/assets/notes/book_ground.png" alt="">
          <div class="discipline_title">{{ item.courseName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SemesterSelector from "@/components/selector/SemesterSelector";
import {queryCollectWrongs} from "@/api/mistake";

export default {
  name: "MistakeNotes",
  components: {
    SemesterSelector
  },
  data() {
    return {
      semesterId: '',
      wrongList: []
    }
  },
  methods: {
    onSemesterChangeFromComponent(newSemesterId) {
      this.semesterId = newSemesterId;
      this.inquireCollectWrongs()
    },
    // 查询错题本列表
    inquireCollectWrongs() {
      queryCollectWrongs(this.semesterId).then((res) => {
        this.wrongList = res.data
        console.log(this.wrongList)
      })
    },
    gotoMistakeDetail(selectionId) {
      this.$router.push({
        path:'/mistakeDetail',
        query: {selectionId}
      })
    }
  }
}
</script>

<style lang="less" scoped>
.parent_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center; // 如果需要垂直居中也加上这句

  .course_container {
    width: 1240px;
    background-color: #fff;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    .el-row {
      margin-top: 20px;
    }

    .discipline_list {
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      padding: 30px;

      .discipline_class {
        width: 236px;
        height: 240px;
        background-color: #fff;
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;

        img {
          width: 200px;
          height: 236px;
        }

        .discipline_title {
          width: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: absolute;
          font-size: 16px;
          font-weight: bold;
          text-align: center;
          padding-left: 60px;
          padding-right: 30px;
          padding-top: 30px;
        }
      }

    }
  }
}
</style>
