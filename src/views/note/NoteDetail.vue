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
            :render-content="renderTreeNode"
            @node-click="onNodeClick"
        />
      </div>
      <!--右边栏笔记-->
      <div class="right_note">
        <el-button type="primary" @click="addChapterNote()">新增本节笔记</el-button>
        <el-button style="margin-left: 20px; height: 40px" @click="wonderfulNote()">精彩笔记</el-button>
        <div class="one_note_operation" v-for="item in noteListByPassage">
          <div class="note_title">{{ item.noteName }}</div>
          <div class="note_content">
            {{ item.noteContent }}
          </div>
          <div class="one_note_bottom">
            <div class="release_time">{{ formatCommitDate(item.createTime) }}</div>
            <div class="icon_button">
              <el-tooltip class="item" effect="dark" content="分享笔记" placement="top-start">
                <i @click="shareNote(item.id)" class="el-icon-share"></i>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <!--精彩笔记抽屉-->
      <el-drawer
          size="50%"
          :visible.sync="drawer"
          :with-header="false">
        <div class="drawer_title"></div>
        <div class="note-container" v-for="item in wonderfulNoteList">
          <div class="avatar-note-row">
            <!--姓名头像-->
            <div class="note_avatar">
              <el-avatar :size="50" :src="item.avatar"></el-avatar>
              <div class="note_by_name">{{ item.nickName }}</div>
            </div>
            <!--笔记内容-->
            <div class="good_note_container">
              <div class="good_note">
                {{ item.noteListResp.noteName }}
              </div>
              <div class="good_note">
                {{ item.noteListResp.noteContent }}
              </div>
            </div>
          </div>
          <!--点赞按钮-->
          <div class="action-button" @click="likeNoteBtn(item.noteListResp.id)">
            <img src="@/assets/iconfont/unlike.png" alt="">
          </div>
        </div>
      </el-drawer>
      <!--新增笔记弹窗-->
      <el-dialog title="新增当前小节笔记" :visible.sync="dialogFormVisible">
        <el-input
            style="margin-bottom: 20px"
            placeholder="请输入笔记名称"
            v-model="insertNoteData.noteName">
        </el-input>
        <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="insertNoteData.noteContent">
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddNote()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import {
  insertNote,
  likeNote,
  queryAllNoteList,
  queryNoteDirectory,
  queryWonderfulNote,
  updateOpenNote
} from "@/api/note";
import {formatTimestamp} from '@/utils/time'

export default {
  name: "NoteDetail",
  data() {
    return {
      selectionId: '',
      noteDirectory: [],
      directoryTreeProps: {
        children: 'subPassageList',
        label: 'passageTitle'
      },
      noteListByPassage: [],
      currentPassageId: '',  // 当前选中的小节
      currentPassageTitle: '', //当前选中的小节名称
      insertNoteData: {
        noteContent: '',
        noteName: '',
        passageId: '',
        selectionId: ''
      },
      wonderfulNoteList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      textarea: '',
      formLabelWidth: '120px',
      drawer: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  created() {
    this.selectionId = this.$route.query.selectionId
    this.inquireNoteDirectory().then(() => this.inquireNoteListByPassage());
  },
  methods: {
    // 日期格式转换
    formatCommitDate(timestamp) {
      return formatTimestamp(timestamp);
    },
    // 笔记目录
    inquireNoteDirectory() {
      return new Promise((resolve, reject) => {
        queryNoteDirectory(this.selectionId).then((res) => {
          this.noteDirectory = res.data;
          this.currentPassageId = res.data[0].subPassageList[0].passageId;
          this.currentPassageTitle = res.data[0].subPassageList[0].passageTitle;
          resolve();
        }).catch(reject);
      });
    },
    // 查看章节笔记
    inquireNoteListByPassage() {
      queryAllNoteList(this.currentPassageId, this.selectionId).then((res) => {
        this.noteListByPassage = res.data
      })
    },
    // 新增笔记
    addChapterNote() {
      this.dialogFormVisible = true
    },
    // 新增笔记提交按钮
    confirmAddNote() {
      this.$confirm('确定提交笔记吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.insertNoteData.passageId = this.currentPassageId
        this.insertNoteData.selectionId = this.selectionId
        insertNote(this.insertNoteData)
        this.$message({
          type: 'success',
          message: '提交成功!'
        });
        this.inquireNoteListByPassage()
        this.insertNoteData.noteName = ''
        this.insertNoteData.noteContent = ''
        this.dialogFormVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });
    },
    // 精彩笔记按钮
    wonderfulNote() {
      this.drawer = true
      queryWonderfulNote(this.currentPassageId, this.selectionId).then((res) => {
        this.wonderfulNoteList = res.data
        console.log(this.wonderfulNoteList)
      })
    },
    // 点赞按钮
    likeNoteBtn(noteId) {
      likeNote(noteId, this.selectionId)
    },
    // 分享笔记接口方法
    updateNoteToOpen(noteId) {
      updateOpenNote(noteId, this.selectionId);
    },
    shareNote(noteId) {
      this.$confirm('此操作将会把笔记分享给其他用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.updateNoteToOpen(noteId)
        this.$message({
          type: 'success',
          message: '分享成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消分享'
        });
      });
    },
    // 目录树的点击事件
    onNodeClick(node) {
      this.currentPassageId = node.passageId;
      this.inquireNoteListByPassage()
    },
    // 自定义目录树的样式
    renderTreeNode(h, {node}) {
      return (
          <span>
          {node.level === 1 && (
              <i class="el-icon-folder-opened"></i>
          )}
            {node.level === 2 && (
                <i class="el-icon-document"></i>
            )}
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
    //background-color: #C4F3ED;

    .left_category {
      width: 280px;
      background-color: #fff;

      .category_name {
        font-size: 16px;
        margin: 10px;
        font-family: HanSansBold, serif;
      }

      //点击时的样式
      .el-tree ::v-deep.el-tree-node:focus > .el-tree-node__content {
        background-color: @primaryBackgroundColor !important;
        border-radius: 8px;
      }

      // tree 的高度和宽度重新定义
      ::v-deep.el-tree .el-tree-node > .el-tree-node__content {
        height: 34px;
      }
    }

    .right_note {
      width: 920px;
      background-color: @primaryBackgroundColor;
      padding: 0 10px;

      .el-button {
        margin: 10px 0;
      }

      .one_note_operation {
        background-color: #fff;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;

        .note_title {
          font-size: 16px;
        }

        .note_content {
          line-height: 1.8;
        }

        .one_note_bottom {
          display: flex;
          margin-top: 8px;

          .release_time {
            color: @primaryNoSelected;
          }

          .icon_button {
            margin-left: auto;

            i {
              color: #666666;
              font-size: 18px;
              margin-left: 10px;
            }
          }
        }
      }
    }

    .drawer_title {
      font-size: 16px;
      margin-left: 10px;
      margin-top: 10px;
    }

    .note-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 10px;

      .avatar-note-row {
        display: flex;

        .note_avatar {
          width: 100px;
          margin-right: 10px;
          text-align: center;
          align-items: center;
          display: flex;

          .note_by_name {
            margin-left: 10px;
          }
        }
      }

      .action-button {
        display: flex;
        margin-left: auto;
        cursor: pointer;

        img {
          width: 16px;
          height: 16px;
          margin-top: -10px;
        }
      }
    }
  }

}
</style>
