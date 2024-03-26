<template>
  <div class="detail_container">
    <div class="menu_click_operation">
      <div class="menu_tab">
        <el-menu :default-active="currentMenuIndex" @select="handleSelect">
          <el-menu-item index="1">
            <i class="el-icon-odometer"></i>
            <span slot="title">学习情况</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-custom"></i>
            <span slot="title">个人信息</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-key"></i>
            <span slot="title">账户安全</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="menu_click_view">
        <!--学习情况开始-->
        <div class="study_situation" v-if="currentMenuIndex==='1'">
          <div class="study_situation_top">
            <div class="situation_top_left">
              <el-select v-model="value" placeholder="请选择学学期">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
              <div class="course" v-for="(number, index) in 3" :key="index">毛泽东思想概论</div>
            </div>
            <div class="situation_top_right">
              <div class="star_level">课程星级</div>
              <div class="star_level_chart">
                <v-chart :option="option"/>
              </div>
              <div class="start_commit">
                <div class="start_commit_left">
                  <div class="commit_left_content">您好像对第七章：微生物 中</div>
                  <div class="commit_left_content">第七章：微生物 中的微生物的生态环境一节很不熟悉呢。您这一节的平均</div>
                  <div class="commit_left_content">第七章：微生物 中的微生物的生态环境一节很不熟悉呢。您这一节的平均</div>
                </div>
                <div class="start_commit_left">
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下8-9章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下8-9章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下8-9章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="study_situation_bottom">
            <div class="course_process">
              <div class="course_title">课程总体进度</div>
              <v-chart :option="processOption"/>
            </div>
            <div class="course_process">
              <div class="course_title">课程评价</div>
              <v-chart :option="commitOption"></v-chart>
            </div>
          </div>
        </div>
        <!--学习情况结束-->
        <!--个人信息开始-->
        <div class="person_information" v-if="currentMenuIndex==='2'">
          <el-button type="primary">编辑</el-button>
          <div style="display: flex">
            <div class="avatar_box">
              <el-avatar :size="150" shape="square" :src="url"></el-avatar>
            </div>
            <div class="information_list">
              <div class="information">
                <div class="account_id">账号</div>
                <div class="account_name">13315397985</div>
              </div>
              <div class="information">
                <div class="account_id">姓名</div>
                <div class="account_name">朱泽丹</div>
              </div>
              <div class="information">
                <div class="account_id">昵称</div>
                <div class="account_name">阿瓦达啃大瓜</div>
              </div>
              <div class="information">
                <div class="account_id">性别</div>
                <div class="account_name">女</div>
              </div>
              <div class="information">
                <div class="account_id">出生年份</div>
                <div class="account_name">2001</div>
              </div>
            </div>
          </div>
        </div>
        <!--个人信息结束-->
        <!--账户安全开始-->
        <div class="account_security" v-if="currentMenuIndex==='3'">
          <div class="update_password_box">
            <div class="password_top_container">
              <i class="el-icon-lock"></i>
              <div class="change_pwd">修改密码</div>
            </div>
            <el-input placeholder="请输入原密码"></el-input>
            <el-input placeholder="请输入新密码"></el-input>
            <el-input placeholder="请确认新密码"></el-input>
            <el-button type="primary">确认修改</el-button>
          </div>

          <div class="update_password_box">
            <div class="password_top_container">
              <i class="el-icon-mobile-phone"></i>
              <div class="change_pwd">修改关联手机号</div>
            </div>
            <div class="input_phone_box">
              <el-input placeholder="请输入手机号"></el-input>
              <div class="authentication_code" style="width: 100px">获取验证码</div>
            </div>

            <el-input placeholder="请输入验证码"></el-input>
            <el-button type="primary">确认修改</el-button>
          </div>
        </div>
        <!--账户安全结束-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Personal",
  data() {
    return {
      commitOption: {
        title: [
        ],
        polar: {
          radius: [30, '80%']
        },
        angleAxis: {
          max: 4,
          startAngle: 75
        },
        radiusAxis: {
          type: 'category',
          data: ['a', 'b', 'c', 'd']
        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [2, 1.2, 2.4, 3.6],
          coordinateSystem: 'polar',
          label: {
            show: true,
            position: 'middle',
            formatter: '{b}: {c}'
          }
        }
      },
      processOption: {
        xAxis: {
          data: ['数据结构', '毛概', '母猪的产后护理', '如何摸鱼', '上班三要素']
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            data: [23, 24, 183, 24, 18]
          }
        ]
      },
      option: {
        title: {
          left: 'center',
          top: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: '1星'
              },
              {
                value: 234,
                name: '2星'
              },
              {
                value: 1548,
                name: '3星'
              }
            ],
            radius: ['50%', '87%']
          }
        ]
      },
      currentMenuIndex: '1',
      url: 'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      srcList: [
        'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      ],
      options: [{
        value: '选项1',
        label: '2023-2024第一学期'
      }, {
        value: '选项2',
        label: '2023-2024第二学期'
      }, {
        value: '选项3',
        label: '2022-2023第一学期'
      }, {
        value: '选项4',
        label: '2022-2023第二学期'
      }],
      value: '',
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
                  label: '错题',
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
                  label: '错题',
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
                  label: '错题',
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
    handleSelect(index) {
      // 这里你可以保存或处理 index 值
      this.currentMenuIndex = index;
    },
    handleNodeClick(data) {
      console.log(data.label);
      if (data.label === '视频') {
        this.$router.push('/courseDetail/videoCourse')
      }
      if (data.label === '习题') {
        this.$router.push('/courseDetail/homework')
      }
      if (data.label === '错题') {
        this.$router.push('/courseDetail/wrongTitle')
      }
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
.detail_container {
  display: flex;
  justify-content: center;
  align-items: center; // 如果需要垂直居中也加上这句
  flex-direction: column;

  .menu_click_operation {
    display: flex;
    margin-top: 20px;

    .menu_tab {
      width: 260px;
      padding-right: 20px;
    }

    .menu_click_view {
      width: 900px;
      height: auto;
      background-color: #fff;
      border-radius: 8px;

      .study_situation {
        .study_situation_top {
          display: flex;
          height: 550px;

          .situation_top_left {
            padding: 10px;
            width: 210px;
            background-color: @primaryBackgroundColor;
            overflow-y: auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

            .course {
              height: 38px;
              position: relative;
              display: flex;
              padding-left: 10px;
              flex-direction: column;
              border-radius: 4px;
              //background-color: #fff;
              justify-content: center;
            }
          }

          .situation_top_right {
            display: flex;
            flex-direction: column;
            padding: 10px 10px 0 10px;
            position: relative;
            width: 100%;

            .star_level {
              font-size: 16px;
            }

            .star_level_chart {
              height: 200px;
              //background-color: #3165F6;
              width: auto;
            }

            .start_commit {
              display: flex;

              .start_commit_left {
                height: 310px;
                width: 48%;
                background-color: @primaryBackgroundColor;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
                padding: 10px;
                margin: 10px 10px 0 10px;

                .commit_left_content {
                  margin-bottom: 10px;
                }

                .improve_box {
                  margin-bottom: 10px;
                  display: flex;
                  position: relative;
                  align-items: center;
                }
              }
            }
          }
        }

        .study_situation_bottom {
          margin-top: 10px;
          display: flex;
          height: 400px;
          justify-content: center;
          margin-bottom: 20px;

          .course_process {
            width: 45%;
            background-color: #fff;
            border-radius: 8px;
            padding: 10px;
            margin: 0 10px 0 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);

            .course_title {
              font-size: 16px;
              font-family: HanSansBold;
            }
          }
        }
      }

      .person_information {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;

        .el-button {
          width: 70px;
          margin-left: 20px;
        }

        .avatar_box {
          border-right: 1px solid #e1e1e1;
          width: 200px;
          flex-direction: column;
          height: 200px;
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;

          .avatar_setting {
            color: @primaryColor;
          }
        }

        .information_list {
          display: flex;
          flex-direction: column;

          .information {
            display: flex;
            height: 40px;
            align-items: center;
            margin-left: 40px;

            .account_id {
              width: 100px;
              color: #666;
            }

            .account_name {
            }
          }
        }

      }

      .course_list {
        margin-top: 20px;
      }

    }

    .account_security {
      .update_password_box {
        margin: 20px;
        padding: 20px;
        border-bottom: 1px solid #e1e1e1;
        display: flex;
        flex-direction: column;

        .password_top_container {
          display: flex;
          position: relative;
          height: 50px;
          text-align: center;
          align-items: center;

          i {
            font-size: 30px;
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
          }

          .change_pwd {
            margin-left: 10px;
          }
        }

        .input_phone_box {
          display: flex;
          position: relative;
          align-items: center;

          .authentication_code {
            margin-left: 10px;
            color: @primaryNoSelected;
          }
        }

        .el-input {
          margin: 10px 0;
          width: 400px;
        }

        /deep/ .el-input__inner {
          height: 30px;
          // 设置字号
          font-size: 14px;
          // 设置输入字体的颜色
          color: #2c2c2c;
        }

        .el-button {
          width: 100px;
          margin-top: 10px;
        }
      }
    }

  }

  .el-menu {
    border-radius: 8px;
  }
}
</style>
