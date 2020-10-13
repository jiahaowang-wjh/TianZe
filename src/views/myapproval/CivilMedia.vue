<!--  -->
<template>
  <div class="civil-media">
    <div class="civil-media-title">
      <span class="civil-media-title-go1">我的审批</span>
      <span class="civil-media-title-separator">/</span>
      <span class="civil-media-title-go2">调解信息</span>
    </div>
    <div class="civil-media-list">
      <div class="public-tabs">
        <el-tabs v-model="activeTabs" @tab-click="() => null">
          <el-tab-pane
            :label="item.SelectName"
            :name="item.SelectName"
            v-for="item in SelectOption"
            :key="item.SelectName"
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="civil-media-list-search">
        <div class="civil-media-list-search-form">
          <el-form ref="form">
            <el-form-item>
              <span>录入编号：</span>
              <el-input v-model="tableQuery.reportNo"></el-input>
            </el-form-item>
            <el-form-item>
              <span>调解编号:</span>
              <el-input v-model="tableQuery.debtNo"></el-input>
            </el-form-item>
            <el-form-item placeholder="审核状态">
              <span>审核状态:</span>
              <el-select v-model="tableQuery.status">
                <el-option label="全部" value></el-option>
                <el-option label="审核通过" value="1"></el-option>
                <el-option label="审核驳回" value="2"></el-option>
                <el-option label="审核已提交" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
                <span>时间:</span>
                <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择开始日期"
                    :picker-options="pickerOptions"
                    v-model="tableQuery.beginDate"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span class="civil-media-list-search-time-select-separator">—</span>
                <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择结束日期"
                    :picker-options="pickerOptions"
                    v-model="tableQuery.endDate"
                    value-format="yyyy-MM-dd"
                ></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button class='button-search' @click="searchTbaleData()">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="civil-media-list-content">
        <!-- 正常显示模板 -->
        <template>
          <div class="civil-media-list-content-title">
            <span>序号</span>
            <span>录入编号</span>
            <span>调解编号</span>
            <span>相对人</span>
            <span>审核状态</span>
            <span>操作</span>
          </div>
          <div class="civil-media-list-content-tab">
            <div
              class="civil-media-list-content-tab-item"
              v-for="(item, index) in MediateMsg"
              :key="index"
            >
              <span>{{ index + 1 }}</span>
              <span>{{ item.reportNo }}</span>
              <span>{{ item.civilno }}</span>
              <span>{{ item.personName }}</span>
              <span
                :class="
                  item.status === '2'
                    ? 'pass'
                    : item.status === '1'
                    ? 'unpass'
                    : ' '
                "
                >{{
                  item.status === '0'
                    ? '调解信息待审核'
                    : item.status === '2'
                    ? '调解信息审核通过'
                    : '调解信息审核未通过'
                }}</span
              >
              <span>
                <button
                  v-show="
                    item.status === '0' && roleId === '7992691214771044352'
                  "
                  @click="CheckMediaMsg(index, item)"
                >
                  审核
                </button>
                <button
                  v-show="
                    item.status === '1' && roleId === '7992691295821774848'
                  "
                  @click="EditMediaMsg(index, item)"
                >
                  编辑
                </button>
              </span>
            </div>
          </div>
        </template>
      </div>

      <div style="text-align: right; margin-top: 25px">
        <el-pagination
          background
          @current-change="searchTbaleData"
          layout="prev, pager, next"
          :total="tablePage.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabs: '全部',
      //表格分页
      tablePage: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      //表格查询
      tableQuery: {
        debtNo: '',
        reportNo: '',
        status: '',
        beginDate: '',
        endDate: '',
        companyType: window.sessionStorage.getItem('companyType'),
      },
      // 选项卡
      SelectOption: [
        {
          SelectName: '全部',
          isSelect: true,
        },
        {
          SelectName: '待审核',
          isSelect: false,
        },
        {
          SelectName: '审核通过',
          isSelect: false,
        },
        {
          SelectName: '审核驳回',
          isSelect: false,
        },
      ],
      // 查询数据的数据源
      SearchData: {
        // 民事调解编号
        debtNo: '',
        pageSize: '10',
        pageNum: '1',
        status: '1',
        beginDate: '',
        endDate: '',
      },
      // 调解信息列表数据源
      MediateMsg: [],
      // 确定选用正常模板还是多选模板
      isNormal: false,
      roleId: window.sessionStorage.getItem('roleId'),
      TimeSelect: {
        TimeStart: '2020-02-30',
        TimeEnd: '2020-04-28',
      },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange(e) {},
    SelectMore() {
      this.isNormal = !this.isNormal
    },
    HandleSelect(item) {
      this.SelectOption.forEach((v) => {
        v.isSelect = false
      })
      item.isSelect = true
    },

    // 搜索表格数据
    async searchTbaleData(page) {
      this.tablePage.pageNum = page || 1
      const queryData = Object.assign(this.tableQuery, this.tablePage)
      const formData = new FormData()
      formData.append('comId', window.sessionStorage.getItem('companyId'))
      for (const key in queryData) {
        formData.append(key, queryData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busCivilController/selectBusList',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result)
      this.MediateMsg = result.data.list
      this.tablePage.total = result.data.total
    },

    CheckMediaMsg(index, item) {
      this.$router.push({
        path: '/MediaApprove',
        query: {
          relativePerId: item.relativePerId,
          reportId: item.reportId,
          civilId: item.civilId,
        },
      })
    },
    addDate() {
      let nowDate = new Date()
      let date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      this.tableQuery.endDate = date.year + '-' + date.month + '-' + date.date
      let nowDateTime = nowDate - 3600 * 1000 * 24 * 7
      nowDate.setTime(nowDateTime)
      date = {
        year: nowDate.getFullYear(),
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate(),
      }
      this.tableQuery.beginDate = date.year + '-' + date.month + '-' + date.date
    },
    EditMediaMsg (index, item) {
        this.$router.push({path:'/EditCivilMedia', query: {civilId: item.civilId,reportId:item.reportId}})
    }
  },
  created() {
    this.searchTbaleData()
    this.addDate()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.civil-media {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  &-title {
    height: px2rem(12);
    line-height: px2rem(12);
    font-size: px2rem(4);
    color: #fc7f89;
    margin: 0 px2rem(4);
    &-go1 {
      color: #616789;
    }
    &-separator {
      color: #616789;
    }
  }

  &-list {
    height: 100%;
    background-color: #ffffff;
    margin: 0 px2rem(4);
    padding: px2rem(4);

    &-select {
      display: flex;
      height: px2rem(8);
      border-bottom: px2rem(0.1) solid #dfe0e7;
      span {
        display: inline-block;
        font-size: px2rem(4);
        color: #999999;
        margin: 0 px2rem(4);
        height: px2rem(8);
        line-height: px2rem(8);
        width: px2rem(22);
        text-align: center;
      }
      span:hover,
      span:active {
        background-color: #efeff3;
      }
      .active {
        border-bottom: px2rem(0.4) solid #616789;
      }
    }
    &-search {
      display: flex;
      align-items: center;
      height: px2rem(16);
      &-form {
        display: flex;
        height: px2rem(14);
        line-height: px2rem(14);
        margin-left: px2rem(2);
        .el-form {
          display: flex;
          height: 100%;
          align-items: center;
          margin-bottom: 0;
          .el-form-item {
            display: flex;
            align-items: center;
            height: px2rem(10);
            line-height: px2rem(10);
            span {
              flex-shrink: 0;
              font-size: px2rem(3.2);
              display: inline-block;
              margin: 0 5px;
            }
            .el-date-editor{
                width: 160px;
            }
            .button-search {
                padding: 8px 15px;
                background-color: #616789;
                color: #fff;
                margin-left: 10px;
            }
            .el-input {
                width: 160px;
            }
            .el-select {
                width: 160px;
            }
            .button-add {
                padding: 10px 15px;
                background-color: #fc7f89;
                color: #fff;
            }
          }
        }
      }
    }

    &-content {
      display: flex;
      flex-direction: column;
      &-title {
        display: flex;
        height: px2rem(8);
        span {
          height: px2rem(8);
          line-height: px2rem(8);
          font-size: px2rem(3.2);
          background-color: #616789;
          flex: 2.5;
          text-align: center;
          color: #fff;
          border: 0.5px solid #fff;
          display: inline-block;
        }
        :nth-child(1) {
          flex: 1.2;
        }
        :nth-child(2) {
          flex: 5;
        }
        :nth-child(3) {
          flex: 10;
        }
        :nth-child(4) {
          flex: 4;
        }
        :nth-child(5) {
          flex: 8;
        }
        :last-child {
          flex: 4;
        }
      }

      &-tab {
        display: flex;
        flex-direction: column;
        font-size: px2rem(3);
        div:nth-child(odd) {
          display: flex;
          height: px2rem(10);
          line-height: px2rem(10);
          .pass {
            color: #17c67a !important;
          }
          .unpass {
            color: #ff0000 !important;
          }
          span {
            flex: 3;
            text-align: center;
            color: #272a39;
            border: 0.5px solid #fff;
            display: inline-block;
            border: none;
          }
          :nth-child(1) {
            flex: 1.2;
          }
          :nth-child(2) {
            flex: 5;
          }
          :nth-child(3) {
            flex: 10;
          }
          :nth-child(4) {
            flex: 4;
          }
          :nth-child(5) {
            flex: 8;
          }
          :nth-child(6) {
            flex: 4;
            button {
              flex: 1;
              font-size: px2rem(3);
              border: none;
              border-radius: px2rem(1);
              color: #fff;
              padding: px2rem(0.8) px2rem(3);
            }
            :first-child {
              background-color: #616789;
            }
            :last-child {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(even) {
          display: flex;
          height: px2rem(10);
          line-height: px2rem(10);
          font-size: px2rem(3);
          background-color: #e0e3f8;
          .pass {
            color: #17c67a !important;
          }
          .unpass {
            color: #ff0000 !important;
          }
          span {
            height: px2rem(10);
            line-height: px2rem(10);
            flex: 2.5;
            text-align: center;
            color: #272a39;
            border: 0.5px solid #fff;
            display: inline-block;
            border: none;
          }
          :nth-child(1) {
            flex: 1.2;
          }
          :nth-child(2) {
            flex: 5;
          }
          :nth-child(3) {
            flex: 10;
          }
          :nth-child(4) {
            flex: 4;
          }
          :nth-child(5) {
            flex: 8;
          }
          :last-child {
            flex: 4;
            button {
              flex: 1;
              font-size: px2rem(3);
              border: none;
              border-radius: px2rem(1);
              color: #fff;
              padding: px2rem(0.8) px2rem(3);
            }
            :first-child {
              background-color: #616789;
            }
            :last-child {
              background-color: #fc7f89;
            }
          }
        }
      }
    }
  }
}
</style>
