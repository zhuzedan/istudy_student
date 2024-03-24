<template>
  <div class="parent_container">
    <div class="course_container">
      <!--全部笔记列表-->
      <div class="discipline_list">
        <div class="discipline_class">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <!-- 新增的文字描述div -->
          <div class="discipline_title">笔记标题</div>
        </div>

        <div class="discipline_class">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">数据结构与算法俗人afafs </div>
        </div>

        <div class="discipline_class">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">笔记标题</div>
        </div>

        <div class="discipline_class">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">笔记标题</div>
        </div>
        <div class="discipline_class">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">笔记标题</div>
        </div>
        <div class="discipline_class">
          <img src="@/assets/notes/book_ground.png"
               alt="">
          <div class="discipline_title">笔记标题</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyNotes"
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
