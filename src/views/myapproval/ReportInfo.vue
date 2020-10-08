<!--  -->
<template>
  <div class="report-info">
    <div class="report-info-title">
      <span class="report-info-title-go1">我的审批</span>
      <span class="report-info-title-separator">/</span>
      <span class="report-info-title-go2">录入信息</span>
    </div>
    <div class="report-info-list">
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
      <div class="report-info-list-search">
        <div class="report-info-list-search-form">
          <el-form ref="form">
            <el-form-item class="report-info-list-search-form-item1">
              <span>债权人/债务人：</span>
              <el-input v-model="tableQuery.debtName"></el-input>
            </el-form-item>
            <el-form-item>
              <span>录入编号:</span>
              <el-input v-model="tableQuery.reportNo"></el-input>
            </el-form-item>
            <el-form-item placeholder="审核状态">
              <span>审核状态:</span>
              <el-select v-model="tableQuery.status">
                <el-option label="全部" value></el-option>
                <el-option label="审核通过" value="2"></el-option>
                <el-option label="审核驳回" value="1"></el-option>
                <el-option label="审核已提交" value="0"></el-option>
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
                <span class="report-info-list-search-time-select-separator">—</span>
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
                    <el-button class='button-search' @click="searchTbaleData()">
                        搜索
                    </el-button>
                </el-form-item>
          </el-form>
        </div>
        <div class="report-info-list-search-time-select">
        </div>
      </div>
      <div class="report-info-list-content">
        <!-- 正常显示模板 -->
        <div class="report-info-list-content-title">
          <span>序号</span>
          <span>债事信息</span>
          <span>债权处理次数</span>
          <span>债权处理编号</span>
          <span>债权处理金额</span>
          <span>提交时间</span>
          <span>审核时间</span>
          <span>审批内容</span>
          <span>审核状态</span>
          <span>操作</span>
        </div>
        <div class="report-info-list-content-tab">
          <div
            class="report-info-list-content-tab-item"
            v-for="(item, index) in ReportInfoMsg"
            :key="index"
          >
            <span>{{ index + 1 }}</span>
            <div>
              <ul>
                <li>录入编号: {{ item.reportNo ? item.reportNo : '/' }}</li>
                <li>债事人: {{ item.debtName ? item.debtName : '/' }}</li>
                <li>
                  相对人:
                  {{ item.busRelativeCount ? item.busRelativeCount : '/' }}
                </li>
                <li>录入人: {{ item.inputName ? item.inputName : '/' }}</li>
                <li>
                  推荐人: {{ item.recommendName ? item.recommendName : '/' }}
                </li>
              </ul>
            </div>
            <span>{{ item.MeltTimes ? item.MeltTimes : '/' }}</span>
            <span>{{ item.MeltNumber ? item.MeltNumber : '/' }}</span>
            <span>{{ item.MeltMoney ? item.MeltMoney : '/' }}</span>
            <div>
              <span>{{ item.submitDate ? item.submitDate : '/' }}</span>
            </div>
            <div>
              <span>{{ item.checkDate ? item.checkDate : '/' }}</span>
            </div>
            <div>
              <ul>
                <li>{{ item.checkReason ? item.checkReason : '/' }}</li>
              </ul>
            </div>
            <div>
              <span
                :class="[
                  item.status === '2' || item.status === '5'
                    ? 'pass'
                    : item.status === '1' || item.status === '6'
                    ? 'unpass'
                    : 'hassubmit',
                ]"
                >{{
                  item.status === '0'
                    ? '未审核'
                    : item.status === '1'
                    ? '审核未通过'
                    : item.status === '2'
                    ? '审核通过'
                    : item.status === '3'
                    ? '暨尽调协议'
                    : item.status === '4'
                    ? '财务未审核'
                    : item.status === '5'
                    ? '财务审核通过'
                    : '财务审核未通过'
                }}</span
              >
            </div>
            <span>
              <button
                v-if="item.status === '0' && roleId === '7992691214771044352'"
                @click="CheckData(index, item)"
              >
                审核
              </button>
              <button
                v-if="item.status === '3' && roleId === '7992691295821774848'"
                @click="GoReportPayment(index, item)"
              >
                缴费
              </button>
              <button
                v-if="item.status === '1' && roleId === '7992691295821774848'"
                @click="
                  () => {
                    $router.push({
                      path: '/EditReport',
                      query: { reportId: item.reportId },
                    })
                  }
                "
              >
                编辑
              </button>
            </span>
          </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 调解信息列表数据源
      ReportInfoMsg: [],
      //表格分页
      tablePage: {
        pageSize: 10,
        pageNum: 1,
        total: 0,
      },
      //表格查询
      tableQuery: {
        debtName: '',
        beginDate: '',
        endDate: '',
        reportNo: '',
        status: '',
        companyType: window.sessionStorage.getItem('companyType'),
        comId: window.sessionStorage.getItem('companyId'),
      },
      // 确定选用正常模板还是多选模板
      isNormal: false,
      roleId: window.sessionStorage.getItem('roleId'),
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
            },
          },
        ],
      },
      dialogTableVisible: false,

      activeTabs: '全部',
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
      IsCheckData: false,
      // 获取当前用户审批的数据
      UserCheckData: {
        reportId: '',
        status: '',
        checkReason: '',
      },
    }
  },
  methods: {
    GoInfoPayment() {
      this.$emit('onChangeFragment', 'InfoPayment')
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
      for (const key in queryData) {
        formData.append(key, queryData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busReportController/selectDebtInfos',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.ReportInfoMsg = result.data.list
      this.tablePage.total = result.data.total
    },

    CheckData(index, item) {
      const { stage, status } = item
      // 如果当前用户处于报备待审批状态 status === '0', stage === '1'
      if ((status === '0' || status === '5') && stage === '1') {
        // 获取当前用户点击的报备ID
        this.$router.push({
          path: '/ReportApprove',
          query: { reportId: item.reportId },
        })
      } else if (status === '4' && stage === '1') {
        // 当前用户处于报备支付凭证待审批 status === '4' , stage === '1'
        // 获取当前用户点击的报备ID
        this.$router.push({
          path: '/ReportVoucherApprove',
          query: { reportId: item.reportId },
        })
      }
    },
    CloseCheckPage() {
      this.UserCheckData.reportId = ''
      this.UserCheckData.status = ''
      this.UserCheckData.checkReason = ''
      this.IsCheckData = false
    },
    GoReportPayment(index, item) {
      this.$router.push({
        path: '/ReportPayment',
        query: { debtId: item.debtId, reportId: item.reportId },
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
  },
  created() {
    this.searchTbaleData()
    this.addDate()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.report-info {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  &-title {
    height: px2rem(12);
    line-height: px2rem(12);
    font-size: px2rem(4);
    color: #616789;
    margin: 0 px2rem(4);
    &-go2 {
      color: #fc7f89;
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
          flex: 3;
          height: px2rem(8);
          line-height: px2rem(8);
          font-size: px2rem(3.2);
          background-color: #616789;
          text-align: center;
          color: #fff;
          display: inline-block;
          border-left: 0.5px solid #fff;
          border-right: 0.5px solid #fff;
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(9),
        :nth-child(10) {
          flex: 4;
        }
        :nth-child(8) {
          flex: 5;
        }
        :nth-child(2) {
          flex: 6;
        }
      }

      &-tab {
        display: flex;
        flex-direction: column;
        font-size: px2rem(3);
        div:nth-child(odd) {
          display: flex;
          height: px2rem(28);
          line-height: px2rem(28);
          background-color: #fff;
          text-align: center;
          font-size: px2rem(2);
          span {
            flex: 3;
            font-size: px2rem(2.8);
            text-align: center;
            color: #000;
            display: inline-block;
            margin: 0 1px;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 6;
            margin: 0 1px;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: px2rem(5) 0;
              background-color: #fff;
            }
            li {
              flex: 1;
              line-height: px2rem(3);
              border: none;
              padding: none;
            }
          }
          :nth-child(8) {
            font-size: px2rem(3.2);
            flex: 5;
            border: 1px solid #fff;
            background-color: #fff;
          }
          :nth-child(6),
          :nth-child(7) {
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            padding: 0 px2rem(1);
            margin: 0 1px;
            box-sizing: border-box;
            span {
              text-align: center;
              height: px2rem(3);
              line-height: px2rem(3);
            }
          }
          :nth-child(9) {
            flex: 4;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              margin: 0 px2rem(3);
              height: px2rem(3);
              line-height: px2rem(3);
            }
            .pass {
              color: #17c67a !important;
            }
            .unpass {
              color: #ff0000 !important;
            }
            .hassubmit {
              color: #272a39 !important;
            }
          }
          :nth-child(10) {
            flex: 4;
            button {
              font-size: px2rem(3.2);
              color: #fff;
              border: none;
              padding: px2rem(0.5) px2rem(2);
              border-radius: px2rem(1);
              margin: 0 px2rem(0.8);
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(even) {
          display: flex;
          height: px2rem(28);
          line-height: px2rem(28);
          background-color: #e0e3f8;
          text-align: center;
          font-size: px2rem(2);
          span {
            font-size: px2rem(2.8);
            flex: 3;
            text-align: center;
            color: #000;
            display: inline-block;
            margin: 0 0.5px;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 6;
            ul {
              display: flex;
              flex-direction: column;
              justify-content: center;
              padding: px2rem(5) 0;
              box-sizing: border-box;
            }
            li {
              flex: 1;
              line-height: px2rem(3);
              border: none;
              padding: none;
            }
          }
          :nth-child(8) {
            font-size: px2rem(3.2);
            flex: 5;
            border: 1px solid #e0e3f8;
          }
          :nth-child(6),
          :nth-child(7) {
            flex: 3;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e0e3f8;
            padding: 0 px2rem(1);
            box-sizing: border-box;
            span {
              text-align: center;
              height: px2rem(3);
              line-height: px2rem(3);
              display: inline-block;
            }
          }
          :nth-child(9) {
            flex: 4;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #e0e3f8;
            span {
              margin: 0 px2rem(3);
              height: px2rem(3);
              line-height: px2rem(3);
            }
            .pass {
              color: #17c67a !important;
            }
            .unpass {
              color: #ff0000 !important;
            }
            .hassubmit {
              color: #272a39 !important;
            }
          }
          :nth-child(10) {
            flex: 4;
            button {
              font-size: px2rem(3.2);
              color: #fff;
              border: none;
              padding: px2rem(0.5) px2rem(2);
              border-radius: px2rem(1);
              margin: 0 px2rem(0.8);
              background-color: #fc7f89;
            }
          }
        }
      }
    }
  }
}
</style>
