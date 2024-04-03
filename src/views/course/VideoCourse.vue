<template>
  <div class="video_course">
    <div class="left_layout">
      <div class="chapter">第一章：程序设计与C语言 > 1.1关于编程语言和计算机</div>
      <div class="teacher_and_date">
        <div class="teacher">本视频讲师：张长弓、李四</div>
        <div class="upload_date">发布日期：2023 年 11 月 27日</div>
      </div>

      <div class="input_video">
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player>
      </div>
    </div>
    <div class="right_layout">
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
      <div class="course_category" v-if="selectedCategory === 0">
        <el-tree
            :data="treeData"
            :default-expand-all=true
            :props="defaultProps"
            node-key="id"
            :render-content="renderTreeNode"
        />
      </div>

      <div class="course_note_ai" v-if="selectedCategory === 1">

        <div>1、排列：将n个不同元素按一定顺序排成一列，叫做这n个元素的全排列，简称排列.
        </div>
        <div>2、逆序数的计算方法：数出每个数的逆序个数,所有数的逆序个数求和就是排列逆序数.
        </div>
      </div>
      <div class="chat_frame" v-if="selectedCategory === 2">
        <chat-example></chat-example>
      </div>

      <div class="course_test" v-if="selectedCategory === 3">
        <div class="title_num" v-for="(number, index) in 12" :key="index">{{ number }}</div>
        <div class="title_description"> A，B均为n阶矩阵，且(A-B)^2=A^2-2AB+B^2，则必有( )</div>
        <div class="question_option">
          <el-radio v-model="radio" label="1">A = E</el-radio>
          <el-radio v-model="radio" label="2">B = E</el-radio>
          <el-radio v-model="radio" label="3">A = B</el-radio>
          <el-radio v-model="radio" label="4">AB = BA</el-radio>
        </div>
        <div class="title_description">
          <div>解析</div>
          选D
          矩阵的乘法运算不满足交换律即在一般情况下，AB不等于BA，(A-B)^2=A^2-2AB+B^2，只有A与B可交换时才成立。
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ChatExample from "@/components/chat/ChatExample.vue";

export default {
  name: "VideoCourse",
  components: {
    ChatExample
  },
  data() {
    return {
      radio: '1',
      selectedCategory: 0,
      categoryNames: ['目录', '笔记', '提问', '小测'],
      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src: "https://v.itheima.net/LapADhV6.mp4", //url地址
          },
        ],
        poster: "https://img.js.design/assets/img/65dda9b6a5ebb5733fbb26f0.jpg#5371dbbe49adb62060e4b6ca06942cd1", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, //当前时间和持续时间的分隔符
          durationDisplay: true, //显示持续时间
          remainingTimeDisplay: false, //是否显示剩余时间功能
          fullscreenToggle: true, //全屏按钮
        },
      },
      treeData: [
        {
          "id": "chapter1-id",
          "name": "第一章 课程导论与概述",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "section1-1-id",
              "name": "1.1 章节背景与目标",
              "parentId": "chapter1-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": true,
              "tenantId": 0,
              "type": "section",
              "children": []
            },
            // 更多小节...
          ]
        },
        {
          "id": "chapter2-id",
          "name": "第二章 数据结构基础",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "section2-1-id",
              "name": "2.1 数组与链表",
              "parentId": "chapter2-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": true,
              "tenantId": 0,
              "type": "section",
              "children": []
            },
            // 更多小节...
          ]
        },
        {
          "id": "chapter3-id",
          "name": "第三章 树与图",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            // 第三章下的小节和资源...
          ]
        },
        {
          "id": "chapter4-id",
          "name": "第四章 堆栈与队列",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            // 第四章下的小节和资源...
          ]
        },
        {
          "id": "chapter5-id",
          "name": "第五章 排序与搜索算法",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "section5-1-id",
              "name": "5.1 快速排序与归并排序",
              "parentId": "chapter5-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": true,
              "tenantId": 0,
              "type": "section",
              "children": []
            },
            // 更多小节...
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    };
  },
  methods: {
    handleCategoryClick(index) {
      this.selectedCategory = index;
    },
    renderTreeNode(h, {node, data, store}) {
      const hasChildren = node.childNodes && node.childNodes.length;

      return (
          <span>
          {node.level === 2 && (
              <i class="el-icon-folder-opened"></i>
          )}
            {node.level === 3 && (
                <i class="el-icon-document"></i>
            )}
            {node.label}
        </span>
      );
    },
  }
}
</script>

<style lang="less" scoped>
.video_course {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 20px;
  width: 1200px;
  //height: 700px;
  display: flex;

  .left_layout {
    width: 860px;
    padding: 20px;

    .chapter {
      font-size: 16px;
      font-family: HanSansBold;
    }

    .teacher_and_date {
      display: flex;
      margin-top: 10px;
      color: @primaryNoSelected;
      margin-bottom: 10px;

      .upload_date {
        display: flex;
        margin-left: auto;
      }
    }

    .input_video {
      width: 860px;
      //margin: 0 auto;
    }
  }

  .right_layout {
    width: 200px;
    padding: 20px;
    flex: 1;
    overflow-y: auto; // 如果需要的话，确保内容区域可以滚动
    .discipline_category {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      margin-bottom: 30px;

      .category_name {
        padding: 0 14px 0 14px;
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

    .course_category {
    }

    .course_note_ai {
      padding: 0 20px;
    }

    .chat_frame {
      width: 260px;
      height: 560px;
      background-color: #fff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: space-between; /* 使子元素在垂直方向两端对齐 */
      overflow-y: auto; /* 添加滚动条 */

    }

    .course_test {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      .title_num {
        margin-top: 10px;
        display: flex;
        margin-left: 10px;
        background-color: @primaryColor;
        justify-content: center;
        border-radius: 4px;
        align-items: center;
        color: #fff;
        width: 30px;
        height: 30px;
      }

      .title_description {
        margin: 20px 0 20px 14px;
      }

      .question_option {
        display: flex;
        flex-direction: column;

        .el-radio {
          margin-top: 10px;
          margin-left: 14px;
        }
      }
    }
  }

}
</style>
