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
      <el-empty v-if="noteList && noteList.length === 0" description="暂无数据"></el-empty>
      <!--全部笔记列表-->
      <div class="discipline_list" v-if="noteList">
        <div class="discipline_class" v-for="item in noteList" @click="gotoNoteDetail(item.selectionId)">
          <img src="@/assets/notes/book_ground.png" alt="">
          <!-- 文字描述div -->
          <div class="discipline_title">{{ item.courseName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {queryCollectNotes} from "@/api/note";
import SemesterSelector from "@/components/selector/SemesterSelector";

export default {
  name: "MyNotes",
  components: {
    SemesterSelector
  },
  data() {
    return {
      semesterId: '',
      noteList: []
    }
  },
  created() {
    this.inquireCollectNotes(this.semesterId)
  },
  methods: {
    // 新增处理 SemesterSelector 组件传出的 semester-change 事件的方法
    onSemesterChangeFromComponent(newSemesterId) {
      this.semesterId = newSemesterId;
      this.inquireCollectNotes(this.semesterId)
    },
    // 查询笔记本列表
    inquireCollectNotes(semesterId) {
      queryCollectNotes(semesterId).then((res) => {
        this.noteList = res.data
      })
    },
    gotoNoteDetail(selectionId) {
      this.$router.push({
        path: '/noteDetail',
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
