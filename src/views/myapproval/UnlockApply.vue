<!--  -->
<template>
  <div class="unlock-apply">
    <div class="unlock-apply-title">
      <span class="unlock-apply-title-go1">我的审批</span>
      <span class="unlock-apply-title-separator">/</span>
      <span class="unlock-apply-title-go2">债权处理</span>
    </div>
    <div class="unlock-apply-list">
      <div class="public-tabs">
        <el-tabs v-model="activeTabs"
                 @tab-click="() => null">
          <el-tab-pane :label="item.SelectName"
                       :name="item.SelectName"
                       v-for="item in SelectOption"
                       :key="item.SelectName"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="unlock-apply-list-search">
        <div class="unlock-apply-list-search-form">
          <el-form ref="form">
            <el-form-item>
              <span>债事人:</span>
              <el-input></el-input>
            </el-form-item>
            <el-form-item>
              <span>录入编号:</span>
              <el-input v-model="tableQuery.debtNo"></el-input>
            </el-form-item>
            <el-form-item @click="searchTbaleData()">
              <el-button class='button-search'>搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="unlock-apply-list-content">
        <!-- 正常显示模板 -->
        <template>
          <div class="unlock-apply-list-content-title">
            <span>序号</span>
            <span>录入号</span>
            <span>录入编号</span>
            <span>服务协议ID</span>
            <span>债权处理编号</span>
            <span>审核状态</span>
            <span>债事人</span>
            <span>操作</span>
          </div>
          <div class="unlock-apply-list-content-tab">
            <div class="unlock-apply-list-content-tab-item"
                 v-for="(item, index) in UnlockMsg"
                 :key="index">
              <span>{{ index + 1 }}</span>
              <span>{{ item.reportId }}</span>
              <span>{{ item.reportNo }}</span>
              <span>{{ item.debtId }}</span>
              <span>{{ item.debtNo }}</span>
              <span :class="[
                  item.status === '2' ||
                  item.status === '6' ||
                  item.status === '9'
                    ? 'pass'
                    : item.status === '1' ||
                      item.status === '5' ||
                      item.status === '8'
                    ? 'unpass'
                    : 'hassubmit',
                ]">{{
                  item.statusStr
                 
                }}</span>
              <span>{{ item.personName }}</span>
              <span>
                <button type="button"
                        v-show="
                    item.status === '6' && roleId === '7992691295821774848'
                  "
                        @click="GoUnlockPayment(index, item)">
                  缴费
                </button>
                <button type="button"
                        v-show="
                    item.status === '0' && roleId === '7992691214771044352'
                  "
                        @click="CheckData(index, item)">
                  调查报告审批
                </button>
                <button type="button"
                        v-show="
                    item.status === '4' && roleId === '7992691214771044352'
                  "
                        @click="CheckUnlockData(index, item)">
                  债权信息审核
                </button>
              </span>
            </div>
          </div>
        </template>
      </div>

      <div style="text-align: right; margin-top: 25px">
        <el-pagination background
                       @current-change="searchTbaleData"
                       layout="prev, pager, next"
                       :total="tablePage.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { UnlockStatus } from "@/util/publicJson"
export default {
  data () {
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
        debtId: '',
        companyType: window.sessionStorage.getItem('companyType'),
        comId: window.sessionStorage.getItem('companyId'),
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
      // 解锁信息列表数据源
      UnlockMsg: [],
      // 确定选用正常模板还是多选模板
      isNormal: false,
      roleId: window.sessionStorage.getItem('roleId'),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            },
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
    }
  },
  computed: {
     
  },
  methods: {
    HandleSelect (item) {
      this.SelectOption.forEach((v) => {
        v.isSelect = false
      })
      item.isSelect = true
    },

    // 搜索表格数据
    async searchTbaleData (page) {
      this.tablePage.pageNum = page || 1
      const queryData = Object.assign(this.tableQuery, this.tablePage)
      const formData = new FormData()
      for (const key in queryData)
      {
        formData.append(key, queryData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/selectDebtListShow',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      let UnlockMsg = result.data.list
      console.log(UnlockStatus)
      UnlockMsg.forEach(item => {
     
        const statusData = UnlockStatus.find(a => a.value === item.status) || {};
        item.statusStr = statusData.label || '-';

      }) 

      this.UnlockMsg = UnlockMsg
      this.tablePage.total = result.data.total
      console.log(this.UnlockMsg)
    },

    // 调查报告审批
    CheckData (index, item) {
      this.$router.push({
        path: '/ExamineReportFormApprove',
        query: {
          reportId: item.reportId,
          debtId: item.debtId,
        },
      })
    },
    // 解债信息审批
    CheckUnlockData (index, item) {
      this.$router.push({
        path: '/UnlockApplyApprove',
        query: {
          reportId: item.reportId,
          debtId: item.debtId,
          relativePerId: item.relativePerId,
        },
      })
    },
    GoUnlockPayment (index, item) {
      const queryData = {
        debtId: item.debtId,
        reportId: item.reportId,
        payId: item.payId,
        thisPlanMoney: item.thisPlanMoney
      }
      this.$router.push({
        path: '/UnlockPayment',
        query: queryData,
      })
    },
  },
  created () {
    this.searchTbaleData()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.unlock-apply {
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
      line-height: px2rem(16);
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
            .el-date-editor {
              width: 200px;
            }
            .button-search {
              padding: 8px 15px;
              background-color: #616789;
              color: #fff;
              margin-left: 10px;
            }
            .el-input {
              width: 200px;
            }
            .el-select {
              width: 200px;
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
          flex: 3;
          text-align: center;
          color: #fff;
          border: 1px solid #fff;
          display: inline-block;
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(2),
        :nth-child(4) {
          flex: 4.5;
        }
        :nth-child(6) {
          flex: 5;
        }
        :last-child {
          flex: 4;
        }
      }

      &-tab {
        display: flex;
        flex-direction: column;
        font-size: px2rem(3);
        &-item {
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
        div:nth-child(odd) {
          display: flex;
          height: px2rem(10);
          line-height: px2rem(10);
          span {
            height: px2rem(10);
            line-height: px2rem(10);
            flex: 3;
            text-align: center;
            color: #272a39;
            border: 1px solid #fff;
            display: inline-block;
            border: none;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2),
          :nth-child(4) {
            flex: 4.5;
          }
          :nth-child(6) {
            flex: 5;
          }
          :last-child {
            flex: 4;
            button {
              font-size: px2rem(2);
              padding: px2rem(1) px2rem(3);
              border: none;
              border-radius: px2rem(1);
              color: #fff;
            }
            :first-child {
              background-color: #616789;
            }
            :nth-child(2) {
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
          span {
            background-color: #e0e3f8;
            height: px2rem(10);
            line-height: px2rem(10);
            flex: 3;
            text-align: center;
            color: #272a39;
            display: inline-block;
            border: none;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2),
          :nth-child(4) {
            flex: 4.5;
          }
          :nth-child(6) {
            flex: 5;
          }
          :last-child {
            flex: 4;
            button {
              font-size: px2rem(2);
              padding: px2rem(1) px2rem(3);
              border: none;
              border-radius: px2rem(1);
              color: #fff;
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
