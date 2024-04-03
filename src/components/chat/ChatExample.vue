<template>
  <div class="chat_frame">

    <div class="talk_show">
      <div :class="[(i.person === 'A') ? 'atalk' : 'btalk']" v-for="(i, index) in list1" :key="index">
        <span>{{ i.say }}</span>
      </div>
    </div>

    <!--消息发送-->
    <div class="send_msg">
      <el-input
          placeholder="请输入内容"
          v-model="sendMsg"
      >
        <img @click="sendMessage"
             slot="append"
             src="@/assets/index/send.png"
             alt=""
        />
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list1: [
        {person: 'A', say: '如果您不知道如何选择适合自己的课程的话，可以尝试与我对话，听听我的建议哦！'},
        {person: 'B', say: '好的'},
      ],
      sel1: 1,
      sendMsg: '',
    }
  },
  methods: {
    sendMessage() {
      if (this.sendMsg === '') {
        this.$message('请输入内容');
        return;
      }
      this.list1.push({person: (this.sel1 === 0) ? 'A' : 'B', say: this.sendMsg});
      if (this.sendMsg.includes('为什么')) {
        this.list1.push({person: 'A', say: '可以试着将这两个向量放进坐标系哦，或许您会对平行四边形法则产生不同的理解。'})
      }
      if (this.sendMsg.includes('不明白')) {
        this.list1.push({person: 'A', say: '您试试对向量坐标进行加减，再将得到的结果画在坐标系上呢？'})
      }
      this.sendMsg = '';
    },
  }
}
</script>


<style scoped lang="less">
.chat_frame {
  width: 320px;
  height: 411px;
  background-color: #fff;
  box-shadow: @primaryBoxShadow;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;

  .talk_show {
    width: 100%;
    height: 100%;
    margin: auto 0;
    overflow-y: auto;

    .atalk {
      margin: 10px;
    }

    .atalk span {
      display: inline-block;
      border-radius: 4px;
      background: rgba(245, 247, 254, 1);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
      padding: 5px 10px;
    }

    .btalk {
      margin: 10px;
      text-align: right;
    }

    .btalk span {
      display: inline-block;
      background: #409EFE; /* 自定义发送者消息背景色 */
      color: #fff;
      border-radius: 4px;
      padding: 5px 10px;
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
</style>
