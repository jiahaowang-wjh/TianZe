<!--  -->
<template>
  <div class="pay-detail">
    <div class="pay-detail-title">
      <span class="pay-detail-title-go1">我的审批</span>
      <span class="pay-detail-title-separator">/</span>
      <span class="pay-detail-title-go2">支付明细</span>
    </div>
    <div class="pay-detail-list">
      <div class="public-tabs">
        <el-tabs v-model="activeTabs" @tab-click="()=>null">
          <el-tab-pane
            :label="item.SelectName"
            :name="item.SelectName"
            v-for="(item) in SelectOption"
            :key="item.SelectName"
          ></el-tab-pane>
        </el-tabs>
      </div>

      <div class="pay-detail-list-search">
        <div class="pay-detail-list-search-form">
          <el-form ref="form">
            <el-form-item>
              <span>录入编号：</span>
              <el-input v-model="ReportId"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="pay-detail-list-search-button" @click="SearchMsg">搜索</div>
      </div>
      <div class="pay-detail-list-content">
        <!-- 正常显示模板 -->
        <template>
          <div class="pay-detail-list-content-title">
            <span>序号</span>
            <span>录入号</span>
            <span>缴费人</span>
            <span>合同人</span>
            <span>类型</span>
            <span>支付号</span>
            <span>金额</span>
            <span>图片</span>
            <span>审核状态</span>
          </div>
          <div class="pay-detail-list-content-tab">
            <div
              class="pay-detail-list-content-tab-item"
              v-for="(item,index) in PaymentMsg"
              :key="index"
            >
              <span>{{index+1}}</span>
              <span>{{item.reportId}}</span>
              <span>{{item.payertName}}</span>
              <span>{{item.payertName}}</span>
              <span>{{item.payType}}</span>
              <span>{{item.payNo}}</span>
              <span>{{item.cost}}</span>
              <span>{{item.voucher}}</span>
              <span
                :class="[item.status === '2' ? ('pass') : item.status === '1'? 'unpass': 'hassubmit']"
              >{{item.status === '0'?('未审核'):item.status === '1'?('审核未通过'):item.status === '2'?('审核通过'):item.status === '3'?('财务未审核'):('财务审核') }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTabs:'全部',
      SelectOption: [
        {
          SelectName: '全部',
          isSelect: true
        },
        {
          SelectName: '待审核',
          isSelect: false
        },
        {
          SelectName: '审核通过',
          isSelect: false
        },
        {
          SelectName: '审核驳回',
          isSelect: false
        }
      ],
      // 支付信息信息列表数据源
      PaymentMsg: [],
      PageData: {
        pageNum: '1',
        pageSize: '10',
        companyType: window.sessionStorage.getItem('companyType')
      },
      ReportId: ''
    }
  },
  methods: {
    SelectMore() {
      this.isNormal = !this.isNormal
    },
    HandleSelect(item) {
      this.SelectOption.forEach(v => {
        v.isSelect = false
      })
      item.isSelect = true
    },
    // 页面初始化
    async InitPage() {
      const formData = new FormData()
      for (const key in this.PageData) {
        formData.append(key, this.PageData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busPayDetailController/selectPayInfoList',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.PaymentMsg = result.data.list
      console.log(this.PaymentMsg)
    },
    // 根据报备编号查询信息
    async SearchMsg() {
      const formData = new FormData()
      formData.append('reportId', this.ReportId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busPayDetailController/selectByReportId',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(result)
      this.PaymentMsg = result.data
    }
  },
  created() {
    this.InitPage()
  }
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.pay-detail {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: px2rem(4);
  &-title {
    height: px2rem(10);
    line-height: px2rem(10);
    font-size: px2rem(4);
    color: #fc7f89;
    margin: px2rem(1) px2rem(4);
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
    padding: px2rem(2) px2rem(4);
    &-select {
      display: flex;
      height: px2rem(10);
      line-height: px2rem(10);
      border-bottom: px2rem(0.1) solid #dfe0e7;
      span {
        display: inline-block;
        font-size: px2rem(4);
        color: #999999;
        margin: 0 px2rem(4);
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
        margin-left: px2rem(2);
        .el-form {
          display: flex;
          align-items: center;
          .el-form-item {
            height: px2rem(10);
            line-height: px2rem(10);
            span {
              font-size: px2rem(3.2);
              width: px2rem(24);
            }
          }
        }
      }
      &-button {
        margin-left: px2rem(4);
        width: px2rem(14);
        height: px2rem(7);
        line-height: px2rem(7);
        font-size: px2rem(3);
        text-align: center;
        background-color: #616789;
        border-radius: px2rem(2);
        color: #fff;
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
          flex: 4;
          text-align: center;
          color: #fff;
          border: 1px solid #fff;
          display: inline-block;
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(3),
        :nth-child(4) {
          flex: 3;
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
          span {
            height: px2rem(10);
            line-height: px2rem(10);
            flex: 4;
            text-align: center;
            color: #272a39;
            border: 1px solid #fff;
            display: inline-block;
            border: none;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(3),
          :nth-child(4) {
            flex: 3;
          }
        }
        div:nth-child(even) {
          display: flex;
          height: px2rem(10);
          line-height: px2rem(10);
          background-color: #e0e3f8;
          span {
            height: px2rem(10);
            line-height: px2rem(10);
            flex: 4;
            text-align: center;
            color: #272a39;
            display: inline-block;
            border: none;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(3),
          :nth-child(4) {
            flex: 3;
          }
        }

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
      }
    }
  }
}
</style>
