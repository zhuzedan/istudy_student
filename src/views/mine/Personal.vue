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
              <semester-selector :initial-semester-id="semesterId" @semester-change="onSemesterChangeFromComponent"/>
              <div class="course" v-for="(item, index) in courseList" :key="index">{{ item.courseName }}</div>
            </div>
            <div class="situation_top_right">
              <div class="star_level">课程星级</div>
              <div class="star_level_box">
                <!--图表-->
                <div class="star_level_chart">
                  <v-chart :option="starOption"/>
                </div>
                <!--星星介绍-->
                <div class="star_level_introduction">
                  <div class="star_container">
                    <div class="star_line"></div>
                    <div>
                      <div class="star_star">
                        <el-rate
                            disabled
                            :max="3"
                            :value="3"
                            show-score
                            text-color="#ff9900">
                        </el-rate>
                      </div>
                      <div class="star_percent">百分比%</div>
                    </div>
                  </div>
                  <div class="star_container">
                    <div class="star_line" style="background-color: #6BD8BA"></div>
                    <div>
                      <div class="star_star">
                        <el-rate
                            disabled
                            :max="2"
                            :value="2"
                            show-score
                            text-color="#ff9900">
                        </el-rate>
                      </div>
                      <div class="star_percent">百分比%</div>
                    </div>
                  </div>
                  <div class="star_container">
                    <div class="star_line" style="background-color: #F2BB25"></div>
                    <div>
                      <div class="star_star">
                        <el-rate
                            disabled
                            :max="1"
                            :value="1"
                            show-score
                            text-color="#ff9900">
                        </el-rate>
                      </div>
                      <div class="star_percent">百分比%</div>
                    </div>
                  </div>
                  <div class="star_container">
                    <div class="star_line" style="background-color: #A8A8FF"></div>
                    <div>
                      <div class="star_star">
                        <el-rate
                            disabled
                            :max="0"
                            :value="0"
                            show-score
                            text-color="#ff9900">
                        </el-rate>
                      </div>
                      <div class="star_percent">百分比%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="start_commit">
                <div class="start_commit_left">
                  <div class="commit_left_content">您好像对第一章：行列式 中的计算行列式的常见题型与方法一节很不熟悉呢。您这一节的平均星级为1.56，少于您其他课程平均星级。</div>
                  <div class="commit_left_content">您好像对第一章：行列式 中的行列式按行（列）展开一节很不熟悉呢。您这一节的平均星级为1.89，少于您其他课程平均星级。</div>
                  <div class="commit_left_content">您好像对第二章：矩阵 中的矩阵的概念一节很不熟悉呢。您这一节的平均星级为1.39，少于您其他课程平均星级。</div>
                </div>
                <div class="start_commit_left">
                  <div class="improve_box">
                    <div class="commit_improve">第一章第四节真的不再争取一下吗</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <div class="improve_box">
                    <div class="commit_improve">快来提高一下第一章的完成度吧</div>
                    <i class="el-icon-arrow-right"></i>
                  </div>
                  <div class="improve_box">
                    <div class="commit_improve">第二章第一节真的不再争取一下吗</div>
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
              <v-chart :option="evaluateOption"></v-chart>
            </div>
          </div>
        </div>
        <!--学习情况结束-->
        <!--个人信息开始-->
        <div class="person_information" v-if="currentMenuIndex==='2'">
          <div style="display: flex">
            <el-button type="primary" @click.native="editOneAccount" v-if="!editTheAccount">编辑</el-button>
            <el-button @click.native="cancelOneAccount" v-if="editTheAccount">取消</el-button>
            <el-button @click.native="saveOneAccount(userInfo)" v-if="editTheAccount">保存</el-button>
          </div>
          <div style="display: flex">
            <div class="avatar_box">
              <el-tooltip effect="dark" content="点击更换头像" placement="top">
                <!--<el-upload-->
                class="avatar-uploader"
                :show-file-list="false"
                >
                <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" alt=""/>
                <i v-else class="el-icon-plus avatar-uploader-icon"/>
                <!--</el-upload>-->
              </el-tooltip>
            </div>
            <div class="information_list">
              <div class="information">
                <div class="account_id">手机号</div>
                <div class="account_name" v-if="!editTheAccount">{{ userInfo.connectTel }}</div>
                <div class="account_name" v-if="editTheAccount">
                  <el-input v-model="userInfo.connectTel" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="information">
                <div class="account_id">姓名</div>
                <div class="account_name" v-if="!editTheAccount">{{ userInfo.realName }}</div>
                <div class="account_name" v-if="editTheAccount">
                  <el-input v-model="userInfo.realName" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="information">
                <div class="account_id">昵称</div>
                <div class="account_name" v-if="!editTheAccount">{{ userInfo.nickName }}</div>
                <div class="account_name" v-if="editTheAccount">
                  <el-input v-model="userInfo.nickName" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="information">
                <div class="account_id">介绍</div>
                <div class="account_name" v-if="!editTheAccount">{{ userInfo.introduction }}</div>
                <div class="account_name" v-if="editTheAccount">
                  <el-input v-model="userInfo.introduction" type="textarea" placeholder="请输入内容"></el-input>
                </div>
              </div>
              <div class="information">
                <div class="account_id">性别</div>
                <div class="account_name" v-if="!editTheAccount">{{ userInfo.gender === 1 ? '男' : '女' }}</div>
                <div class="account_name" v-if="editTheAccount">
                  <el-select v-model="userInfo.gender" placeholder="请选择">
                    <el-option
                        v-for="item in sexList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="information">
                <div class="account_id">出生年份</div>
                <div class="account_name">{{ formatCommitDate(userInfo.birthday) }}</div>
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
            <el-input placeholder="请输入原密码" v-model="updatePwd.oldPwd" show-password></el-input>
            <el-input placeholder="请输入新密码" v-model="updatePwd.newPwd" show-password></el-input>
            <el-input placeholder="请确认新密码" v-model="updatePwd.againNewPwd" show-password></el-input>
            <el-button type="primary" @click.native="confirmUpdatePwd(updatePwd)">确认修改</el-button>
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
import {
  queryCourseBySemester,
  queryCourseEvaluate,
  queryCourseProgress,
  queryCourseStar,
  queryUserInfo,
  updatePassword,
  updateUserInfo
} from "@/api/user";
import SemesterSelector from "@/components/selector/SemesterSelector";
import {formatDate} from '@/utils/time'

export default {
  name: "Personal",
  components: {
    SemesterSelector
  },
  data() {
    return {
      userInfo: {},
      updatePwd: {
        oldPwd: '',
        newPwd: '',
        againNewPwd: ''
      },
      semesterId: '',
      editTheAccount: false,
      sexList: [
        {
          value: 1,
          label: '男'
        },
        {
          value: 2,
          label: '女'
        },
      ],
      courseList: [],
      evaluateOption: {
        title: [],
        polar: {
          radius: [30, '80%']
        },
        angleAxis: {
          max: 4,
          startAngle: 75
        },
        radiusAxis: {
          type: 'category',
          data: []
        },
        tooltip: {},
        series: {
          type: 'bar',
          data: [],
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
          type: 'category',
          data: [] // 接口返回
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [], //接口返回
            type: 'bar'
          }
        ]
      },
      starOption: {
        title: {
          left: 'center',
          top: 'center'
        },
        color: ['#A8A8FF', '#6BD8BA', '#F2BB25', '#3A5BF0'],
        series: [
          {
            type: 'pie',
            data: [
              {
                value: '', // 接口返回
                name: '0星'
              },
              {
                value: '', // 接口返回
                name: '1星'
              },
              {
                value: '', // 接口返回
                name: '2星'
              },
              {
                value: '', // 接口返回
                name: '3星'
              }
            ],
            radius: ['70%', '90%']
          }
        ]
      },
      currentMenuIndex: '1',
      srcList: [
        'https://img.js.design/assets/img/65fec789481fe963e222601a.png#7ca7746083cb3f239cd65645345e1591',
      ],
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
    }
  },
  created() {
    this.inquireCourseProgress()
    this.inquireCourseEvaluate()
    this.inquireMyUserInfo()
  },
  methods: {
    // 生日格式转换
    formatCommitDate(timestamp) {
      return formatDate(timestamp);
    },
    onSemesterChangeFromComponent(newSemesterId) {
      this.semesterId = newSemesterId;
      this.inquireCourseBySemester(this.semesterId)
      this.inquireCourseStar(this.semesterId)
    },
    // 所上课程列表
    inquireCourseBySemester(semesterId) {
      queryCourseBySemester(semesterId).then((res) => {
        this.courseList = res.data
      })
    },
    // 课程星级分析
    inquireCourseStar(semesterId) {
      queryCourseStar(semesterId).then((res) => {
        this.starOption.series[0].data[0].value = res.data.zeroStarCount
        this.starOption.series[0].data[1].value = res.data.oneStarCount
        this.starOption.series[0].data[2].value = res.data.twoStarCount
        this.starOption.series[0].data[3].value = res.data.threeStarCount
      })
    },
    // 课程总体进度
    inquireCourseProgress() {
      queryCourseProgress().then((res) => {
        const progressesName = [];
        const progressPercent = [];
        res.data.forEach(item => {
          progressesName.push(item.courseName);
          progressPercent.push(item.currentProgress);
        });
        this.processOption.xAxis.data = progressesName
        this.processOption.series[0].data = progressPercent
      })
    },
    // 课程综合评价
    inquireCourseEvaluate() {
      queryCourseEvaluate().then((res) => {
        const evaluateName = [];
        const evaluateLevel = [];
        res.data.forEach(item => {
          evaluateName.push(item.courseName);
          evaluateLevel.push(item.avgStarLevel)
        })
        this.evaluateOption.radiusAxis.data = evaluateName
        this.evaluateOption.series.data = evaluateLevel
      })
    },
    // 查询个人信息
    inquireMyUserInfo() {
      queryUserInfo().then((res) => {
        this.userInfo = res.data.userInfo
      })
    },
    // 更新个人信息
    updateMyUserInfo(userInfo) {
      updateUserInfo(userInfo);
    },
    // 更新密码
    confirmUpdatePwd(updatePwd) {
      this.$confirm('确定更新密码吗', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            updatePassword(updatePwd);
            this.$message.success('成功保存')
            this.editTheAccount = false
          })
          .catch(() => {
            this.$message.info('取消保存')
          })
    },
    editOneAccount() {
      this.editTheAccount = true
    },
    cancelOneAccount() {
      this.editTheAccount = false
    },
    saveOneAccount(userInfo) {
      this.$confirm('确定保存当前信息吗', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
          .then(() => {
            this.updateMyUserInfo(userInfo);
            this.inquireMyUserInfo();
            this.$message.success('成功保存')
            this.editTheAccount = false
          })
          .catch(() => {
            this.$message.info('取消保存')
          })
    },
    handleSelect(index) {
      // 这里你可以保存或处理 index 值
      this.currentMenuIndex = index;
      if (this.currentMenuIndex === '2') {
        this.inquireMyUserInfo()
      }
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
          //height: 550px;

          .situation_top_left {
            padding: 10px;
            width: 30%;
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
              background-color: #fff;
              justify-content: center;
              margin-top: 10px;
              box-shadow: 0 2.67px 5.33px rgba(0, 0, 0, 0.25);
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
              font-family: HanSansBold;
            }

            .star_level_box {
              display: flex;

              .star_level_chart {
                width: 50%;
                height: 200px;
              }

              .star_level_introduction {
                width: 50%;
                height: 200px;
                display: flex;
                flex-wrap: wrap;

                .star_container {
                  display: flex;
                  width: 50%;
                  height: 50%;
                  position: relative;
                  align-items: center;

                  .star_line {
                    width: 5px;
                    height: 60px;
                    opacity: 1;
                    border-radius: 133.33px;
                    background: rgba(22, 93, 255, 1);
                    display: flex;
                    margin-right: 10px;
                    margin-left: 20%;
                  }

                  .star_percent {
                  }
                }
              }
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
            margin-bottom: 10px;

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
          height: 40px;
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
