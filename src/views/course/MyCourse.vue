<template>
  <div class="parent_container">
    <div class="course_container">
      <!--选择框-->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content"></div>
        </el-col>
        <el-col :span="6" :offset="12">
          <div class="grid-content">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!--全部课程列表-->
      <div class="discipline_list">
        <div class="discipline_class" v-for="(item,index) in courseList" @click="gotoCourseDetail()">
          <img :src="item.circleUrl" alt="">
          <div class="about_course">
            <div class="avatar">
              <el-avatar :size="50" :src="item.imageSrc"></el-avatar>
            </div>
            <div class="course_name_teacher">
              <div class="course_name">{{ item.name }}</div>
              <div class="course_teacher">{{ item.teacher }}</div>
            </div>
          </div>
          <div class="process_on">
            <el-progress :percentage="item.percent"></el-progress>
          </div>
          <div class="class_name">22媒体技术1</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCourse",
  data() {
    return {
      courseList: [
        {
          imageSrc: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          circleUrl: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          name: "数据结构",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学……",
          studyingCount: 8888,
          percent: 16
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          circleUrl: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          name: "数据结构",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学规律，是解决自然科学、工程技术等领域实际问题的重要工具。",
          studyingCount: 8888,
          percent: 57
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img430164da758808.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img430164da758808.jpeg",
          name: "计算机组成原理",
          teacher: "张有财",
          description: "计算机组成原理课程深入探讨计算机硬件系统的构成原理，包括处理器设计、存储系统、输入输出设备及其接口技术等核心内容。",
          studyingCount: 888,
          percent: 26
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          name: "操作系统",
          teacher: "赵智慧",
          description: "操作系统课程系统讲解进程管理、内存管理、文件系统、设备管理、并发与同步控制等关键概念，以及Linux等主流操作系统的内部机制。",
          studyingCount: 6666,
          percent: 16
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img282164da731af0.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img282164da731af0.jpg",
          name: "计算机网络",
          teacher: "李来钱",
          description: "计算机网络课程涵盖网络体系结构、物理层、数据链路层、网络层、传输层、应用层的原理和技术，以及网络安全、网络管理等相关主题。",
          studyingCount: 5555,
          percent: 16
        }
      ],
      inputDate: '',
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      options: [{
        value: '选项1',
        label: '2023-2024第一学期'
      }, {
        value: '选项2',
        label: '2023-2024第二学期'
      }, {
        value: '选项3',
        label: '2022-2023第一学期'
      }, {
        value: '选项4',
        label: '2022-2023第二学期'
      }],
      value: ''
    }
  },
  methods: {
    gotoCourseDetail() {
      this.$router.push('/courseDetail')
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
    height: 1000px;
    background-color: #fff;
    border-radius: 8px;
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

    .grid-content {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 80px;
    }

    .discipline_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 30px 0 30px;

      .discipline_class {
        width: calc((100% / 5) - 20px); /* 计算每个课程单元格的宽度，假设20px是左右内边距 */
        flex-basis: calc((100% / 5) - 20px); /* 添加这一行，确保在弹性布局中的基础宽度 */
        height: 300px;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        display: flex;
        margin-bottom: 20px;
        flex-direction: column;

        img {
          width: 100%;
          height: 50%;
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

        .process_on {
          margin-left: 10px;
          margin-top: 10px;
        }

        .class_name {
          margin-left: 10px;
        }
      }

    }
  }
}

</style>
