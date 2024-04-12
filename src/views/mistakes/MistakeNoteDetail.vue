<template>
  <div class="note_detail_container">
    <div class="detail_container">
      <!--左边栏笔记目录-->
      <div class="left_category">
        <div class="category_name">目录</div>
        <el-tree
            :data="noteDirectory"
            :default-expand-all="true"
            :props="directoryTreeProps"
            node-key="passageId"
            :current-node-key="currentPassageId"
            ref="treeSelect"
            :highlight-current="true"
            :render-content="renderTreeNode"
            @node-click="onNodeClick"
        />
      </div>
      <!--右边栏笔记-->
      <div class="right_note">
        <wrong-title style="width: 900px"></wrong-title>
      </div>
    </div>

  </div>
</template>
<script>
import WrongTitle from "@/views/course/WrongTitle.vue";
import {queryNoteDirectory} from "@/api/note";
import {queryAllWrongList} from "@/api/mistake";

export default {
  name: "MistakeNoteDetail",
  components: {
    WrongTitle
  },
  data() {
    return {
      noteDirectory: [],
      selectionId:'',
      currentPassageId: '',  // 当前选中的小节
      currentPassageTitle: '', //当前选中的小节名称
      wrongListByPassage: [],
      directoryTreeProps: {
        children: 'subPassageList',
        label: 'passageTitle'
      },
      drawer: false,
    }
  },
  created() {
    this.selectionId = this.$route.query.selectionId
    this.inquireNoteDirectory().then(() => this.inquireWrongListByPassage());
  },
  methods: {
    // 目录
    inquireNoteDirectory() {
      return new Promise((resolve, reject) => {
        queryNoteDirectory(this.selectionId).then((res) => {
          this.noteDirectory = res.data;
          this.currentPassageId = res.data[0].subPassageList[0].passageId;
          this.currentPassageTitle = res.data[0].subPassageList[0].passageTitle;
          //把当前选择的key设置到el-tree中
          this.$nextTick(function () {
            this.$refs['treeSelect'].setCurrentKey(this.currentPassageId)
          })
          resolve();
        }).catch(reject);
      });
    },
    // 查看章节错题
    inquireWrongListByPassage() {
      queryAllWrongList(this.currentPassageId, this.selectionId).then((res) => {
        this.wrongListByPassage = res.data
      })
    },
    // 点击左侧章小节
    onNodeClick(node) {
      this.currentPassageId = node.passageId;
      this.inquireWrongListByPassage()
    },
    // 目录树渲染
    renderTreeNode(h, {node}) {
      return (
        <span>
          {node.level === 1 && (<i class="el-icon-folder-opened"/>)}
          {node.level === 2 && (<i class="el-icon-document"/>)}
          {node.label}
        </span>
      );
    }
  }
}
</script>

<style scoped lang="less">
.note_detail_container {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  .detail_container {
    display: flex;
    width: 1200px;
    padding: 20px;

    .left_category {
      width: 280px;
      background-color: #fff;

      .category_name {
        font-size: 16px;
        margin: 10px;
        font-family: HanSansBold, serif;
      }

      // tree 的高度和宽度重新定义
      ::v-deep.el-tree .el-tree-node > .el-tree-node__content {
        height: 34px;
      }
    }

    .right_note {
      width: 920px;
      padding: 0 10px;

      .el-button {
        margin: 10px 0;
      }

      .one_note_operation {
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;

        .one_note_bottom {
          display: flex;
          margin-top: 8px;

          .release_time {
            color: @primaryNoSelected;
          }

          .icon_button {
            margin-left: auto;

            i {
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

}
</style>
