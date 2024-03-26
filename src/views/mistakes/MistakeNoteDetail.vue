<template>
  <div class="note_detail_container">
    <div class="detail_container">
      <!--左边栏笔记目录-->
      <div class="left_category">
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
