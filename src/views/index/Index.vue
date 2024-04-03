<template>
  <div class="index_container">
    <div class="basic_container">
      <!--海报图-->
      <img src="@/assets/index/index_ai .png" alt="">
      <!--ai聊天-->
      <chat-example></chat-example>
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
          <div
              class="discipline_class"
              v-for="(course, index) in courses"
              :key="index"
              @click="gotoCourseIntroduction()"
          >
            <!-- 课程图片 -->
            <img :src="course.imageSrc" alt="">

            <div class="about_course">
              <!-- 头像 -->
              <div class="avatar">
                <el-avatar :size="50" :src="course.circleUrl"></el-avatar>
              </div>

              <!-- 课程名及教师名 -->
              <div class="course_name_teacher">
                <div class="course_name">{{ course.name }}</div>
                <div class="course_teacher">{{ course.teacher }}</div>
              </div>
            </div>

            <!-- 课程描述，使用 CSS 控制省略号显示 -->
            <div class="course_description" :title="course.description">
              {{ course.description }}
            </div>

            <!-- 学习人数 -->
            <div class="studying_count">{{ course.studyingCount }}人正在学习</div>
          </div>
        </div>
      </div>

      <div class="hot_class">
        <div class="hot_class_title">
          热门课程
        </div>
        <div class="hot_class_concrete" v-for="(item,index) in hotCourses" @click="gotoCourseIntroduction()">
          <div class="hot_class_num">{{ index + 1 }}</div>
          <img :src="item.circleUrl"
               alt="">
          <div class="hot_class_container">
            <div class="hot_class_name">{{ item.name }}</div>
            <div class="hot_class_teacher">{{ item.teacher }}</div>
            <div class="hot_class_description">{{ item.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatExample from "@/components/chat/ChatExample.vue";

export default {
  name: "Index",
  components: {
    ChatExample
  },
  data() {
    return {
      courses: [
        {
          imageSrc: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          circleUrl: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          name: "数据结构",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学……",
          studyingCount: 8888,
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          circleUrl: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          name: "数据结构",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学规律，是解决自然科学、工程技术等领域实际问题的重要工具。",
          studyingCount: 8888,
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img430164da758808.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img430164da758808.jpeg",
          name: "计算机组成原理",
          teacher: "张有财",
          description: "计算机组成原理课程深入探讨计算机硬件系统的构成原理，包括处理器设计、存储系统、输入输出设备及其接口技术等核心内容。",
          studyingCount: 888,
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          name: "操作系统",
          teacher: "赵智慧",
          description: "操作系统课程系统讲解进程管理、内存管理、文件系统、设备管理、并发与同步控制等关键概念，以及Linux等主流操作系统的内部机制。",
          studyingCount: 6666,
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img282164da731af0.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img282164da731af0.jpg",
          name: "计算机网络",
          teacher: "李来钱",
          description: "计算机网络课程涵盖网络体系结构、物理层、数据链路层、网络层、传输层、应用层的原理和技术，以及网络安全、网络管理等相关主题。",
          studyingCount: 5555,
        }
      ],
      hotCourses: [
        {
          imageSrc: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          circleUrl: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          name: "数据结构",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学……",
          studyingCount: 8888,
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          circleUrl: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          name: "数据结构",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学规律，是解决自然科学、工程技术等领域实际问题的重要工具。",
          studyingCount: 8888,
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img430164da758808.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img430164da758808.jpeg",
          name: "计算机组成原理",
          teacher: "张有财",
          description: "计算机组成原理课程深入探讨计算机硬件系统的构成原理，包括处理器设计、存储系统、输入输出设备及其接口技术等核心内容。",
          studyingCount: 888,
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          name: "操作系统",
          teacher: "赵智慧",
          description: "操作系统课程系统讲解进程管理、内存管理、文件系统、设备管理、并发与同步控制等关键概念，以及Linux等主流操作系统的内部机制。",
          studyingCount: 6666,
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img282164da731af0.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img282164da731af0.jpg",
          name: "计算机网络",
          teacher: "李来钱",
          description: "计算机网络课程涵盖网络体系结构、物理层、数据链路层、网络层、传输层、应用层的原理和技术，以及网络安全、网络管理等相关主题。",
          studyingCount: 5555,
        }
      ],
      inquireKey: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      selectedCategory: 0,
      categoryNames: ['全部', '计算机', '数学', '文学', '教育学', '心理学']
    }
  },
  methods: {
    gotoCourseIntroduction() {
      this.$router.push('/introduction')
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

  img {
    margin-right: 20px;
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
          height: 54%;
          border-radius: 8px 8px 0 0;
        }

        .about_course {
          display: flex;
          margin: 10px;

          .course_name_teacher {
            margin-left: 10px;

            .course_name {
              font-size: 16px;
              font-family: HanSansBold, serif;
            }

            .course_teacher {
              font-size: 14px;
            }
          }


        }

        .course_description {
          margin: 0 10px;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .studying_count {
          margin: 0 10px;
          //align-self: flex-end; /* 在交叉轴（水平方向）上底部对齐 */
        }
      }

    }
  }

  .hot_class {
    width: 300px;
    background-color: @primaryBackgroundColor;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding: 0 10px;

    .hot_class_title {
      font-family: HanSansBold, serif;
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
        font-size: 20px;
      }

      img {
        width: 80px;
        height: 96px;
        border-radius: 4px;
        object-fit: cover;
      }

      .hot_class_container {
        margin: 0 10px;
        max-width: calc(100% - 80px - 20px);

        .hot_class_name {
          font-family: HanSansBold, serif;
        }

        .hot_class_description {
          margin-top: 6px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

</style>
