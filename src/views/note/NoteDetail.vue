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
        <el-button type="primary" @click="dialogFormVisible = true">新增本节笔记</el-button>
        <el-button style="margin-left: 20px; height: 40px" @click="wonderfulNote()">精彩笔记</el-button>
        <div class="one_note_operation" v-for="item in noteListByPassage">
          <div class="note_title">{{ item.noteName }}</div>
          <div class="note_content">
            {{ item.noteContent }}
          </div>
          <div class="one_note_bottom">
            <div class="release_time">{{ formatCommitDate(item.createTime) }}</div>
            <el-button type="text" @click="updateOneNote(item)">编辑</el-button>
            <el-button type="text" @click="deleteOneNote(item.id)">删除</el-button>
            <div class="icon_button">
              <el-tooltip class="item" effect="dark" content="添加书签" placement="top-start">
                <i @click="updateBookMark(item.id,item.bookmark)" :class="{ 'bookmarked-icon': item.bookmark === 1 }"
                   class="el-icon-s-management"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分享笔记" placement="top-start">
                <i @click="shareNote(item.id,item.open)" class="el-icon-share"></i>
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
          <div class="action-button" @click="likeNoteBtn(item.noteListResp.id,item.noteListResp.hasLike)">
            <img src="@/assets/iconfont/like.png" alt="" v-if="item.noteListResp.hasLike === 1">
            <img src="@/assets/iconfont/unlike.png" alt="" v-if="item.noteListResp.hasLike === 0">
            <div>{{ item.likeCount }}</div>
          </div>
        </div>
      </el-drawer>
      <!--新增笔记弹窗-->
      <el-dialog title="新增当前笔记" :visible.sync="dialogFormVisible">
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
      <!--编辑笔记弹窗-->
      <el-dialog title="编辑当前笔记" :visible.sync="dialogUpdateNoteVisible">
        <el-input
            style="margin-bottom: 20px"
            placeholder="请输入笔记名称"
            v-model="updateNoteData.noteName">
        </el-input>
        <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="updateNoteData.noteContent">
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogUpdateNoteVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmUpdateNote()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import {
  deleteNote,
  insertNote,
  likeNote,
  queryAllNoteList,
  queryNoteDirectory,
  queryWonderfulNote,
  updateBookMarkNote,
  updateNote,
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
      updateNoteData: {},
      wonderfulNoteList: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogUpdateNoteVisible: false,
      textarea: '',
      formLabelWidth: '120px',
      drawer: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    }
  },
  computed: {},
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
          //把当前选择的key设置到el-tree中
          this.$nextTick(function () {
            this.$refs['treeSelect'].setCurrentKey(this.currentPassageId)
          })
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
      }).then(() => {
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
    //编辑笔记按钮
    updateOneNote(item) {
      this.dialogUpdateNoteVisible = true
      this.updateNoteData = {
        noteContent: item.noteContent,
        noteId: item.id,
        noteName: item.noteName,
      }
    },
    //提交编辑的笔记
    confirmUpdateNote() {
      this.$confirm('确定修改当前笔记吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        updateNote(this.updateNoteData)
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.inquireNoteListByPassage()
        this.dialogUpdateNoteVisible = false
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    //删除笔记
    deleteOneNote(id) {
      this.$confirm('确定删除当前笔记吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        deleteNote(id).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
        }).then(() => {
          this.inquireNoteListByPassage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        });
      });
    },
    //添加书签
    updateBookMark(noteId, hasLikeStatus) {
      updateBookMarkNote(noteId, hasLikeStatus, this.selectionId)
          .then(() => {
            this.inquireNoteListByPassage()
          })
    },
    // 精彩笔记按钮
    wonderfulNote() {
      this.drawer = true
      queryWonderfulNote(this.currentPassageId, this.selectionId).then((res) => {
        this.wonderfulNoteList = res.data
      })
    },
    // 点赞按钮
    likeNoteBtn(noteId, hasLikeStatus) {
      likeNote(noteId, this.selectionId, hasLikeStatus)
      this.wonderfulNote()
    },
    // 分享笔记
    shareNote(noteId, openStatus) {
      this.$confirm('此操作将会把笔记分享给其他用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        updateOpenNote(noteId, openStatus).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
            this.inquireNoteListByPassage()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
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
              <i class="el-icon-folder-opened"/>
          )}
            {node.level === 2 && (
                <i class="el-icon-document"/>
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
      //.el-tree ::v-deep.el-tree-node:focus > .el-tree-node__content {
      //  background-color: @primaryBackgroundColor !important;
      //  border-radius: 8px;
      //}

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
            margin-right: 10px;
          }

          .el-button {
            margin: 0 10px 0 0;
            padding: 0;
          }

          .icon_button {
            margin-left: auto;

            .bookmarked-icon {
              color: #3165F6 !important;
            }

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
      border-bottom: 1px solid @primaryBackgroundColor;

      .avatar-note-row {
        display: flex;

        .note_avatar {
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
        margin-top: -10px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

}
</style>
