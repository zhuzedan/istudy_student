<template>
  <div class="index_container">
    <div class="basic_container">
      <img src="@/assets/index/index_ai .png" alt="">
      <div class="chat_frame">
        <div class="chat_demo">
          <img src="@/assets/teacher_default_avatar.png" alt="">
          <div class="chat_content_left">
            如果您不知道如何选择适合自己的课程的话，可以尝试与我对话，听听我的建议哦！
          </div>
        </div>
        <div class="send_msg">
          <el-input
              placeholder="请输入内容"
              v-model="sendMsg">
            <img slot="append" src="@/assets/index/send.png" alt="">
          </el-input>
        </div>
      </div>
    </div>
    <div class="other_school_course">
      <div class="recommend_class">
        <div class="discipline_category">
          <div
              v-for="(name, index) in categoryNames"
              :key="index"
              class="category_name"
              :class="{ 'selected': selectedCategory === index }"
              @click="handleCategoryClick(index)">
            {{ name }}
          </div>
        </div>
        <div class="discipline_list">
          <div class="discipline_class" @click="gotoCourseIntroduction()">
            <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
                 alt="">
            <div class="about_course">
              <div class="avatar">
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
              <div class="course_name_teacher">
                <div class="course_name">数据结构</div>
                <div class="course_teacher">王富贵</div>
              </div>
            </div>
            <div class="course_description">
              高等数学以微积分为主要内容。微积 分是研究运动和变化的数学……
            </div>
            <div class="studying_count">8888人正在学习</div>
          </div>

          <div class="discipline_class">
            <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
                 alt="">
            <div class="about_course">
              <div class="avatar">
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
              <div class="course_name_teacher">
                <div class="course_name">计算机组成原理</div>
                <div class="course_teacher">张有财</div>
              </div>
            </div>
            <div class="course_description">
              高等数学以微积分为主要内容。微积 分是研究运动和变化的数学……
            </div>
            <div class="studying_count">8888人正在学习</div>
          </div>

          <div class="discipline_class">
            <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
                 alt="">
            <div class="about_course">
              <div class="avatar">
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
              <div class="course_name_teacher">
                <div class="course_name">计算机组成原理</div>
                <div class="course_teacher">张有财</div>
              </div>
            </div>
            <div class="course_description">
              高等数学以微积分为主要内容。微积 分是研究运动和变化的数学……
            </div>
            <div class="studying_count">8888人正在学习</div>
          </div>

          <div class="discipline_class">
            <img src="https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b"
                 alt="">
            <div class="about_course">
              <div class="avatar">
                <el-avatar :size="50" :src="circleUrl"></el-avatar>
              </div>
              <div class="course_name_teacher">
                <div class="course_name">计算机网络</div>
                <div class="course_teacher">李来钱</div>
              </div>
            </div>
            <div class="course_description">
              高等数学以微积分为主要内容。微积 分是研究运动和变化的数学……
            </div>
            <div class="studying_count">8888人正在学习</div>
          </div>

        </div>
      </div>

      <div class="hot_class">
        <div class="hot_class_title">
          热门课程
        </div>
        <div class="hot_class_concrete">
          <div class="hot_class_num">1</div>
          <img src="https://img.js.design/assets/img/6584ffe728ad689a8641b72d.jpg#c44bfa91bf2ce339668037cf61ed9b5b"
               alt="">
          <div class="hot_class_container">
            <div class="hot_class_name">高等数学</div>
            <div class="hot_class_teacher">王国维</div>
            <div class="hot_class_description">农学专业培养具有坚实的现代生物学基础知识</div>
          </div>
        </div>

        <div class="hot_class_concrete">
          <div class="hot_class_num">1</div>
          <img src="https://img.js.design/assets/img/6584ffe728ad689a8641b72d.jpg#c44bfa91bf2ce339668037cf61ed9b5b"
               alt="">
          <div class="hot_class_container">
            <div class="hot_class_name">高等数学</div>
            <div class="hot_class_teacher">王国维</div>
            <div class="hot_class_description">农学专业培养具有坚实的现代生物学基础知识</div>
          </div>
        </div>

        <div class="hot_class_concrete">
          <div class="hot_class_num">1</div>
          <img src="https://img.js.design/assets/img/6584ffe728ad689a8641b72d.jpg#c44bfa91bf2ce339668037cf61ed9b5b"
               alt="">
          <div class="hot_class_container">
            <div class="hot_class_name">高等数学</div>
            <div class="hot_class_teacher">王国维</div>
            <div class="hot_class_description">农学专业培养具有坚实的现代生物学基础知识</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      inquireKey: '',
      sendMsg: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      selectedCategory: 0,
      categoryNames: ['计算机', '外国语', '数学', '文学', '教育学', '心理学']
    }
  },
  methods: {
    gotoCourseIntroduction() {
      this.$router.push('/introduction')
    },
    sendMessage() {
      console.log('发送消息给ai')
    },
    handleCategoryClick(index) {
      this.selectedCategory = index;
    },
  }
}
</script>

<style lang="less" scoped>

.basic_container {
  display: flex;
  justify-content: center;
  margin-top: 30px;

  .chat_frame {
    width: 300px;
    height: 411px;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    margin-left: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column; /* 将 chat_frame 改为垂直布局 */
    justify-content: space-between; /* 使子元素在垂直方向两端对齐 */
    overflow-y: auto; /* 添加滚动条 */

    .chat_demo {
      display: flex;

      img {
        width: 30px;
        height: 30px;
      }

      .chat_content_left {
        width: 220.88px;
        height: 63px;
        opacity: 1;
        border-radius: 4.44px;
        background: rgba(245, 247, 254, 1);
        box-shadow: 0 px2px4pxrgba(0, 0, 0, 0.25);
        font-size: 14px;
        margin-left: 10px;
      }
    }

    .send_msg {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        align-items: center;
      }
    }

  }
}

.other_school_course {
  width: 1240px;
  border-radius: 8px;
  display: flex;
  margin: 20px auto; // 修改顶部外边距为“margin: 20px auto”，这样它会自动在容器中水平居中

  .recommend_class {
    width: 900px;
    margin-right: 20px;
    background-color: #fff;
    border-radius: 8px;
    .discipline_category {
      display: flex;
      height: 46px;

      align-items: center;
      width: 100%;

      .category_name {
        padding: 0 10px 0 10px;
        font-size: 16px;
        color: @primaryNoSelected;
        transition: all 0.3s;
        cursor: pointer;

        &.selected {
          color: black; /* 变为黑色 */
          font-weight: bold; /* 加粗 */
        }
      }
    }

    .discipline_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 20px 0 20px;

      .discipline_class {
        width: calc((100% / 4) - 20px); /* 计算每个课程单元格的宽度，假设20px是左右内边距 */
        flex-basis: calc((100% / 4) - 20px); /* 添加这一行，确保在弹性布局中的基础宽度 */
        height: 280px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;

        img {
          width: 100%;
          border-radius: 8px 8px 0 0;
        }

        .about_course {
          display: flex;
          margin: 10px 10px 0 10px;

          .course_name_teacher {
            margin-left: 10px;

            .course_name {
              font-size: 16px;
              font-family: HanSansBold;
            }

            .course_teacher {
              font-size: 14px;
            }
          }


        }

        .course_description {
          margin: 0 10px 0 10px;
          font-size: 14px;
        }

        .studying_count {
          margin: 0 10px 0 10px;
          align-self: flex-end; /* 在交叉轴（水平方向）上底部对齐 */
        }
      }

    }
  }

  .hot_class {
    width: 300px;
    background-color: @primaryBackgroundColor;
    box-shadow: 0 2px 4px  rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 10px 0 20px;

    .hot_class_title {
      font-family: HanSansBold;
      font-size: 16px;
      height: 46px;
      align-items: center;
      display: flex;
      width: 100%;
    }

    .hot_class_concrete {
      display: flex;
      margin-bottom: 10px;
      .hot_class_num {
        display: flex;
        position: relative;
        align-items: center;
        margin-right: 10px;
        color: rgba(227, 60, 100, 1);
        font-size:20px;
      }
      img {
        width: 80px;
        height: 96px;
        border-radius: 4px;
      }

      .hot_class_container {
        margin-left: 10px;

        .hot_class_name {
          font-family: HanSansBold;
        }
        .hot_class_description{
          margin-top: 6px;
        }
      }
    }
  }
}

</style>
