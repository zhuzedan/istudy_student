<template>
  <div class="note_detail_container">
    <div class="detail_container">
      <!--左边栏笔记目录-->
      <div class="left_category">
        <div class="category_name">目录</div>
        <el-tree
            :data="treeData"
            :default-expand-all=true
            :props="defaultProps"
            node-key="id"
            :render-content="renderTreeNode"
        />
      </div>
      <!--右边栏笔记-->
      <div class="right_note">
        <el-button size="small" type="primary" @click="dialogFormVisible = true">新增本节笔记</el-button>
        <div class="one_note_operation" v-for=" index in 3" :key="index">
          <div class="note_title">行列式的形式和意义</div>
          <div class="note_content">
            1、行列式的形式和意义
            1）形式：将n2个数排成一个n行n列的表格，两边界以竖线，就成为一个n阶 行列式:
            2）意义：行列式是一个算式，即把这n2个元素按一定法则运算，得到的数值称为这个行列式的值
          </div>
          <div class="one_note_bottom">
            <div class="release_time">2024-02-02 11:11:11</div>
            <div class="icon_button">
              <el-tooltip class="item" effect="dark" content="精彩笔记" placement="top-start">
                <i @click="drawer = true" class="el-icon-s-opportunity"/>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="分享笔记" placement="top-start">
                <i @click="shareNote" class="el-icon-share"></i>
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
        <div class="drawer_title">数据结构1-1精彩笔记</div>
        <div class="note-container">
          <div class="avatar-note-row">
            <div class="note_avatar">
              <el-avatar :size="50" :src="circleUrl"></el-avatar>
            </div>
            <div class="good_note">
              下面我们会从不同维度来分产品的内部体系来实现快速的用户增长，所以户是否有分享的意愿，提...
              下面我们会从不同维度来分产品的内部体系来实现快速的用户增长，所以户是否有分享的意愿，提...
              下面我们会从不同维度来分产品的内部体系来实现快速的用户增长，所以户是否有分享的意愿，提...
              下面我们会从不同维度来分产品的内部体系来实现快速的用户增长，所以户是否有分享的意愿，提...
            </div>
          </div>
          <div class="action-button">
            <i class="el-icon-cold-drink"></i>
          </div>
        </div>
      </el-drawer>
      <!--新增笔记弹窗-->
      <el-dialog title="新增当前小节笔记" :visible.sync="dialogFormVisible">
        <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea">
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
export default {
  name: "NoteDetail",
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      textarea: '',
      formLabelWidth: '120px',
      drawer: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      treeData: [
        {
          "id": 1,
          "label": "第一章：线性方程组与矩阵",
          "children": [
            {
              "id": 11,
              "label": "1.1 线性方程组的基本概念与解法",
              "children": []
            },
            {
              "id": 12,
              "label": "1.2 矩阵的概念与运算",
              "children": [
                {
                  "id": 121,
                  "label": "1.2.1 矩阵的加法与数乘",
                  "children": []
                },
                {
                  "id": 122,
                  "label": "1.2.2 矩阵的乘法与转置",
                  "children": []
                }
              ]
            },
            // 更多第一级小节...
          ]
        },
        {
          "id": 2,
          "label": "第二章：行列式",
          "children": [
            {
              "id": 21,
              "label": "2.1 二阶与三阶行列式的定义与计算",
              "children": []
            },
            {
              "id": 22,
              "label": "2.2 n阶行列式的定义与性质",
              "children": [
                {
                  "id": 221,
                  "label": "2.2.1 行列式的展开定理",
                  "children": []
                },
                {
                  "id": 222,
                  "label": "2.2.2 行列式的性质与计算技巧",
                  "children": []
                }
              ]
            },
            // 更多第二级小节...
          ]
        },
        // 更多章节...
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    }
  },
  methods: {
    shareNote() {
      this.$confirm('此操作将会把笔记分享给其他用户，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
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
      padding: 20px;

      .category_name {
        font-size: 16px;
        margin-bottom: 10px;
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
        align-items: center;

        .note_avatar {
          width: 100px;
          margin-right: 10px;
        }
      }

      .action-button {
        display: flex;
        margin-left: auto;
      }
    }
  }

}
</style>
