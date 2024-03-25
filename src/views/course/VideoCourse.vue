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
        123123ai生成的##############长剑连招
        1.B S B 升龙松开所有按键 空A 落地后 再W+小跳A
        2.B S B 升龙在最高点前按住W 落地后B A B1.0
        3.B S B A 按住W 小跳A
        4.B S B 升龙 CA 2A
        5.B S B 升龙 人物落地后 跳A 跳A
      </div>

      <div class="chat_frame" v-if="selectedCategory === 2">
        <div class="chat_demo">
          <img src="@/assets/teacher_default_avatar.png" alt="">
          <div class="chat_content_left">
            如果您不知道如何选择适合自己的课程的话，可以尝试与我对话，听听我的建议哦！
          </div>
        </div>
        <div class="send_msg">
          <el-input
              placeholder="请输入内容"
          >
            <img slot="append" src="@/assets/index/send.png" alt="">
          </el-input>
        </div>
      </div>

      <div class="course_test" v-if="selectedCategory === 3">
        <div class="title_num" v-for="(number, index) in 12" :key="index">{{ number }}</div>
        <div class="title_description">深度为5的二叉树至多有 （ ）个节点</div>
        <div class="question_option">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-radio v-model="radio" label="3">备选项</el-radio>
          <el-radio v-model="radio" label="4">备选项</el-radio>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "VideoCourse",
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
          id: 1,
          label: '第一章：生命之美',
          children: [
            {
              id: 74,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '视频',
                },
                {
                  id: 10,
                  label: '习题',
                },
                {
                  id: 11,
                  label: '资料',
                },
                {
                  id: 12,
                  label: '错题重做',
                },
              ],
            },
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '视频',
                },
                {
                  id: 10,
                  label: '习题',
                },
                {
                  id: 11,
                  label: '资料',
                },
                {
                  id: 12,
                  label: '错题重做',
                },
              ],
            }
            // 更多第二级节点...
          ],
        },
        {
          id: 61,
          label: '第一章：生命之美',
          children: [
            {
              id: 64,
              label: '二级 1-1',
              children: [
                {
                  id: 69,
                  label: '视频',
                },
                {
                  id: 610,
                  label: '习题',
                },
                {
                  id: 611,
                  label: '资料',
                },
                {
                  id: 612,
                  label: '错题重做',
                },
              ],
            },
            // 更多第二级节点...
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
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
  margin-top: 20px;
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

    .course_test{
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
        height:30px;
      }

      .title_description{
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
