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
          name: "高度数学",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学……",
          studyingCount: 888616
        },
        {
          imageSrc: "https://img.js.design/assets/img/644676529a0f8509b36394c6.jfif#6444ebbeb5a77a6f8ae1e12c0d332798",
          circleUrl: "https://img.js.design/assets/smartFill/img228164da709e38.jpeg",
          name: "临床医学",
          teacher: "秦怡芳",
          description: "  临床医学是研究疾病的病因、诊断、治疗和预后，提高临床治疗…",
          studyingCount: 880561
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f545e8e61fb8515f81fac8.png#280890fa034393cbfa2a5f2671e6e8d4",
          circleUrl: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          name: "生物学",
          teacher: "郑若梁",
          description: "   生物学（biology）是探索生命现象和生命活动规律的科学…",
          studyingCount: 888
        },
        {
          imageSrc: "https://img.js.design/assets/img/6584ffe728ad689a8641b72d.jpg#c44bfa91bf2ce339668037cf61ed9b5b",
          circleUrl: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          name: "农学",
          teacher: "蔡鹏飞",
          description: "   农学专业培养具有坚实的现代生物学基础知识",
          studyingCount: 862068
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          circleUrl: "https://img.js.design/assets/smartFill/img231164da709e38.jpg",
          name: "植物学",
          teacher: "刘昊",
          description: "植物学对于人类认识和利用植物资源，保护生态环境，促进可持……",
          studyingCount: 8222058
        },
        {
          imageSrc: "https://img.js.design/assets/img/652e30ae564287587691b982.png#a3f2dbaa6d8e7cd5a981fe394616038c",
          circleUrl: "https://img.js.design/assets/smartFill/img309164da746310.jpg",
          name: "地理通感",
          teacher: "易文龙",
          description: "  地理遥感是一种利用卫星、飞机或其他遥感平台获取地球表面信息…",
          studyingCount: 800200
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54a508c356b3ffe9ec0f3.jpg#8892b5e3fdaa4bc6898356f623c7f227",
          circleUrl: "https://img.js.design/assets/smartFill/img272164da72e058.jpg",
          name: "航空航天",
          teacher: "锤子敏",
          description: "   航空航天是指航空和航天两个领域的总称，涉及到飞行器的设计…",
          studyingCount: 800002
        },
        {
          imageSrc: "https://img.js.design/assets/img/65eff988c357779d4b02cc0d.jpg#4e892f3ba14b0cbc0f2b273c4e9e15af",
          circleUrl: "https://img.js.design/assets/smartFill/img245164da709e38.jpg",
          name: "体育与健康",
          teacher: "李豪豪",
          description: "   体育与健康是指通过参与体育活动和运动，促进个体身体健康……",
          studyingCount: 800001
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img271164da72e058.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img396164da755928.jpg",
          name: "植物保护",
          teacher: "叶秀宣",
          description: "     植物保护是指对植物进行保护和管理，以预防、控制和减轻病虫害…",
          studyingCount: 808881
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54612c8f37103090edeed.jpg#6264e077c7446b07367d37f2961811c4",
          circleUrl: "https://img.js.design/assets/smartFill/img405164da755928.jpeg",
          name: "哲学",
          teacher: "傅小燕",
          description: "  哲学是一门探讨根本问题、探索普遍真理和价值的学科…",
          studyingCount: 866881
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f54b5307d33fd12231c0c1.png#64ae563ccc9db67ba72b283d89f0c03f",
          circleUrl: "https://img.js.design/assets/smartFill/img418164da758808.jpg",
          name: "法学",
          teacher: "张小秋",
          description: "   法学是研究法律的学科，主要涉及法律的形成、实施和变革…",
          studyingCount: 800051
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f5488159921ca256b1ccc2.jpg#76abaed317fb34c15c157190997812fa",
          circleUrl: "https://img.js.design/assets/smartFill/img249164da709e38.jpg",
          name: "心理学",
          teacher: "丁天梅",
          description: "   心理学是研究人类心理活动和行为的科学领域……",
          studyingCount: 800004
        },
        {
          imageSrc: "https://img.js.design/assets/img/65f5488e2706d057da2e2d36.jpg#49cee002028f51e9b14d8446a02c08d2",
          circleUrl: "https://img.js.design/assets/smartFill/img435164da758808.jpg",
          name: "会计",
          teacher: "徐泽强",
          description: "    会计是一门管理财务信息的学科，旨在记录、分析和报告组织或…",
          studyingCount: 808888
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img250164da709e38.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img319164da746310.jpg",
          name: "建筑学",
          teacher: "秦洪北",
          description: "   建筑学是研究建筑设计、建造和使用的学科领域，涉及到建筑物的…",
          studyingCount: 808888
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img235164da709e38.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img263164da72e058.jpeg",
          name: "室内设计",
          teacher: "魏迪",
          description: "   室内设计是一门关注室内空间美学、功能性和人类行为的艺术…",
          studyingCount: 808456
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img240164da709e38.png",
          circleUrl: "https://img.js.design/assets/smartFill/img412164da755928.jpg",
          name: "环境设计",
          teacher: "高光芳",
          description: "      环境设计是一个广泛的领域，涉及到设计和规划各种类型的空间……",
          studyingCount: 812556
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img431164da758808.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img376164da74ff50.jpg",
          name: "软件工程",
          teacher: "邹伟",
          description: "    软件工程是一门关注软件开发过程中的方法、工具和技术的学科…",
          studyingCount: 802268
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img431164da758808.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img423164da758808.jpg",
          name: "电子通信",
          teacher: "雷浩夏",
          description: "  电子通信是利用电子设备和技术进行信息传输和交流的过程。…",
          studyingCount: 80235
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img263164da72e058.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img288164da731af0.jpg",
          name: "水利设计",
          teacher: "吴恩慧",
          description: "   水利设计是指根据地理环境、水资源状况以及人类活动需求…",
          studyingCount: 88222
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img262164da72e058.png",
          circleUrl: "https://img.js.design/assets/smartFill/img338164da748e08.jpg",
          name: "土木工程",
          teacher: "李楠",
          description: "   土木工程是一门工程学科，涉及设计、建造和维护土地上的建筑物……",
          studyingCount: 82065
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img419164da758808.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img394164da755928.jpeg",
          name: "程序设计基础",
          teacher: "江晖",
          description: "     程序设计基础是指计算机程序设计的基本概念、原理和技术，…",
          studyingCount: 82855
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img327164da748e08.jpeg",
          circleUrl: "https://img.js.design/assets/smartFill/img244164da709e38.jpg",
          name: "艺术史",
          teacher: "刘钰",
          description: "  艺术史是研究艺术作品、艺术家和艺术发展历程的学科领域…",
          studyingCount: 82855
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img320164da746310.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img371164da74ff50.jpeg",
          name: "音乐鉴赏",
          teacher: "丁怡丹",
          description: "   音乐鉴赏是指欣赏、理解和评价音乐作品的过程…",
          studyingCount: 82811
        },
        {
          imageSrc: "https://img.js.design/assets/smartFill/img331164da748e08.jpg",
          circleUrl: "https://img.js.design/assets/smartFill/img351164da74c4b8.jpg",
          name: "媒体作品赏析",
          teacher: "朱成逸",
          description: "    媒体作品赏析涉及对电影、电视剧、文学作品、绘画、摄影等各种……",
          studyingCount: 8200
        },
      ],
      hotCourses: [
        {
          circleUrl: "https://img.js.design/assets/img/65af2d2237097e231dfa80dc.webp#cbb5198478492695b7a2299d015d1d3b",
          name: "高等数学",
          teacher: "王富贵",
          description: "高等数学以微积分为主要内容。微积分是研究运动和变化的数学……",
          studyingCount: 8888
        },
        {
          circleUrl: "https://img.js.design/assets/img/644676529a0f8509b36394c6.jfif#6444ebbeb5a77a6f8ae1e12c0d332798",
          name: "临床医学",
          teacher: "秦怡芳",
          description: "临床医学是研究疾病的病因、诊断、治疗和预后，提……",
          studyingCount: 8888
        },
        {
          circleUrl: "https://img.js.design/assets/img/65f545e8e61fb8515f81fac8.png#280890fa034393cbfa2a5f2671e6e8d4",
          name: "生物学",
          teacher: "郑若梁",
          description: "生物学（biology）是探索生命现象和生命活动规律的学……",
          studyingCount: 888
        },
        {
          circleUrl: "https://img.js.design/assets/img/652e30ae564287587691b982.png#a3f2dbaa6d8e7cd5a981fe394616038c",
          name: "地理通感",
          teacher: "易文龙",
          description: "  地理遥感是一种利用卫星、飞机或其他遥感平台获取地球表面信息…",
          studyingCount: 800200
        },
        {
          circleUrl: "https://img.js.design/assets/img/65f54aaa07d33fd122319f4b.jpg#60a54b641fad1dbff4b29aea4d558583",
          name: "植物学",
          teacher: "刘昊",
          description: "植物学对于人类认识和利用植物资源，保护生态环境，促进可持……",
          studyingCount: 8222058
        },
        {
          circleUrl: "https://img.js.design/assets/img/65f54612c8f37103090edeed.jpg#6264e077c7446b07367d37f2961811c4",
          name: "哲学",
          teacher: "傅小燕",
          description: "  哲学是一门探讨根本问题、探索普遍真理和价值的学科…",
          studyingCount: 866881
        },
        {
          circleUrl: "https://img.js.design/assets/img/65f54a508c356b3ffe9ec0f3.jpg#8892b5e3fdaa4bc6898356f623c7f227",
          name: "航空航天",
          teacher: "锤子敏",
          description: "   航空航天是指航空和航天两个领域的总称，涉及到飞行器的设计…",
          studyingCount: 800002
        },
        {
          circleUrl: "https://img.js.design/assets/img/65f54b5307d33fd12231c0c1.png#64ae563ccc9db67ba72b283d89f0c03f",
          name: "法学",
          teacher: "张小秋",
          description: "   法学是研究法律的学科，主要涉及法律的形成、实施和变革…",
          studyingCount: 800051
        },
        {
          circleUrl: "https://img.js.design/assets/img/65f5488159921ca256b1ccc2.jpg#76abaed317fb34c15c157190997812fa",
          name: "心理学",
          teacher: "丁天梅",
          description: "   心理学是研究人类心理活动和行为的科学领域……",
          studyingCount: 800004
        },
        {
          circleUrl: "https://img.js.design/assets/img/65eff988c357779d4b02cc0d.jpg#4e892f3ba14b0cbc0f2b273c4e9e15af",
          name: "体育与健康",
          teacher: "李豪豪",
          description: "   体育与健康是指通过参与体育活动和运动，促进个体身体健康……",
          studyingCount: 800001
        },
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
