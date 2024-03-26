<template>
  <div class="detail_container">
    <div class="course_correlation">
      <div class="course_box">
        <i class="el-icon-arrow-left"></i>
        <img class="course_pic"
             src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"  alt="">
        <div class="course_about">
          <div class="course_name">生物学</div>
          <div class="course_teacher">网易 张二 李三</div>
        </div>
        <img class="course_teacher_ai" src="@/assets/course/course_teacher_ai.png" alt="">
      </div>
    </div>
    <router-view />

  </div>
</template>

<script>
export default {
  name: "CourseDetail"
}
</script>

<style lang="less" scoped>
.detail_container {
  display: flex;
  justify-content: center;
  align-items: center; // 如果需要垂直居中也加上这句
  flex-direction: column;

  .course_correlation {
    margin: 20px 0;
    width: 1200px;
    height: 120px;
    //opacity: 0.55;
    border-radius: 8px;
    background: linear-gradient(143.9deg, rgba(94, 177, 253, 0.36) 5%, rgba(94, 177, 253, 0) 100%), rgba(107, 216, 186, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    .course_box {
      display: flex;
      align-items: center; // 如果需要垂直居中也加上这句

      .el-icon-arrow-left {
        font-size: 20px;
      }

      .course_pic {
        width: 80px;
        height: 80px;
        margin-left: 20px;
      }

      .course_about {
        margin-left: 20px;

        .course_name {
          font-family: HanSansBold;
          font-size: 16px;
        }

        .course_teacher {
          margin-top: 10px;
        }
      }

      .course_teacher_ai {
        margin-left: auto;
      }
    }

  }

  .el-menu {
    border-radius: 8px;
  }
}
</style>
