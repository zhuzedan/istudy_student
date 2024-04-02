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
        <wrong-title style="width: 900px"></wrong-title>
      </div>
    </div>

  </div>
</template>
<script>
import WrongTitle from "@/views/course/WrongTitle.vue";

export default {
  name: "MistakeNoteDetail",
  components: {
    WrongTitle
  },
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
