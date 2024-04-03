<template>
  <div class="video_course">
    <!--视频播放-->
    <div class="left_layout">
      <div class="chapter">第一章 线性代数基础 > 1.1 向量与向量空间</div>
      <div class="teacher_and_date">
        <div class="teacher">发布日期：2024 年 03 月 27日</div>
      </div>

      <div class="input_video">
        <video-player
            class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
            @ended="onVideoEnded"
        ></video-player>

        <!-- 新增蒙版和评分组件 -->
        <div v-if="isVideoEnded" class="completion-overlay">
          <div class="close_video"><i class="el-icon-circle-close" @click="hideCompletionOverlay"></i></div>
          <el-rate v-model="rating" :max="3" :colors="['#F7BA2A', '#F7BA2A', '#F7BA2A']"></el-rate>
          <p class="completion-text">本节课知识掌握很好</p>
          <div class="next_video"><i class="el-icon-right"></i></div>
        </div>
      </div>
    </div>
    <!--目录笔记提问小测-->
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
      <!--目录-->
      <div class="course_category" v-if="selectedCategory === 0">
        <el-tree
            :data="treeData"
            :default-expand-all=true
            :props="defaultProps"
            node-key="id"
            :render-content="renderTreeNode"
        />
      </div>
      <!--笔记-->
      <div class="course_note_ai" v-if="selectedCategory === 1">

        <div>{{ displayedNotes }}
        </div>

        <!-- 新增输入框和发送按钮 -->
        <div class="note_input_container">
          <el-input
              placeholder="请输入笔记内容"
              v-model="manualNoteContent"
              size="small"
              clearable
              @keydown.enter.native="sendManualNote"
          ></el-input>
          <el-button type="primary" size="small" @click="sendManualNote">发送</el-button>
        </div>
      </div>
      <!--提问-->
      <div class="chat_frame" v-if="selectedCategory === 2">
        <chat-example></chat-example>
      </div>
      <!--小测-->
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
      isVideoEnded: false,
      rating: 3,
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
          "id": "linearAlgebraChapter1-id",
          "name": "第一章 线性代数基础",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "linearAlgebraSection1-1-id",
              "name": "1.1 向量与向量空间",
              "parentId": "linearAlgebraChapter1-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": false,
              "tenantId": 0,
              "type": "section",
              "children": []
            },
            {
              "id": "linearAlgebraSection1-2-id",
              "name": "1.2 矩阵与行列式",
              "parentId": "linearAlgebraChapter1-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": false,
              "tenantId": 0,
              "type": "section",
              "children": []
            }
            // 更多小节...
          ]
        },
        {
          "id": "linearAlgebraChapter2-id",
          "name": "第二章 线性方程组",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "linearAlgebraSection2-1-id",
              "name": "2.1 高斯消元法与矩阵运算",
              "parentId": "linearAlgebraChapter2-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": false,
              "tenantId": 0,
              "type": "section",
              "children": []
            },
            {
              "id": "linearAlgebraSection2-2-id",
              "name": "2.2 矩阵的秩与线性方程组解的存在性",
              "parentId": "linearAlgebraChapter2-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": false,
              "tenantId": 0,
              "type": "section",
              "children": []
            }
            // 更多小节...
          ]
        },
        {
          "id": "linearAlgebraChapter3-id",
          "name": "第三章 特征值与特征向量",
          "parentId": null,
          "showStatus": 0,
          "lockStatus": 0,
          "hasChildren": true,
          "tenantId": 0,
          "type": "chapter",
          "children": [
            {
              "id": "linearAlgebraSection3-1-id",
              "name": "3.1 特征值与特征向量的概念",
              "parentId": "linearAlgebraChapter3-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": false,
              "tenantId": 0,
              "type": "section",
              "children": []
            },
            {
              "id": "linearAlgebraSection3-2-id",
              "name": "3.2 对角化与相似变换",
              "parentId": "linearAlgebraChapter3-id",
              "showStatus": 0,
              "lockStatus": 0,
              "hasChildren": false,
              "tenantId": 0,
              "type": "section",
              "children": []
            }
            // 更多小节...
          ]
        }
        // 更多章节...
      ],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      manualNoteContent: '', // 存储手动输入的笔记内容:
      displayedNotes: '1、排列：将n个不同元素按一定顺序排成一列，叫做这n个元素的全排列，简称排列.2、逆序数的计算方法：数出每个数的逆序个数,所有数的逆序个数求和就是排列逆序数.'
    };
  },
  methods: {
    // 视频播放完成弹窗
    onVideoEnded() {
      this.isVideoEnded = true;
      console.log('播放完成')
    },
    // 关闭弹窗
    hideCompletionOverlay() {
      this.isVideoEnded = false;
    },
    // 发送手写笔记
    sendManualNote() {
      const newNote = this.manualNoteContent.trim(); // 获取并去除前后空格

      if (newNote) { // 如果有内容
        // 在此处编写保存笔记到数据库或其他相应逻辑的代码
        console.log('发送手动笔记:', newNote);
        this.displayedNotes += `${newNote}\n\n`;
        // 清空输入框内容
        this.manualNoteContent = '';
      }
    },
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
      position: relative;
      width: 860px;
      height: 484px;
      //margin: 0 auto;
    }

    .completion-overlay {
      width: 860px;
      height: 484px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7); /* 黑色半透明蒙版 */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 1; /* 确保蒙版在视频之上 */

      .close_video {
        i {
          position: absolute; /* 添加绝对定位 */
          top: 10px; /* 调整为合适的距离，可根据实际需求更改 */
          right: 10px; /* 调整为合适的距离，可根据实际需求更改 */
          cursor: pointer; /* 更改为手形光标，表明可点击 */
          font-size: 18px; /* 调整图标大小，可根据实际需求更改 */
          color: #fff; /* 设置白色文字颜色 */
        }
      }


      .completion-text {
        color: #fff;
        margin-top: 10px;
        font-size: 16px;
        text-align: center;
      }

      .next_video {
        i {
          font-size: 20px;
          color: #fff;
        }
      }

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
      margin-bottom: 20px;

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
      height: 560px;
      display: flex;
      flex-direction: column;

      .note_input_container {
        display: flex;
        margin-top: auto;
      }

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
