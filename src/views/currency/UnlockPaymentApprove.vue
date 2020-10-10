<!--  -->
<template>
  <div class="payment-civil">
    <div class="payment-civil-title">
      <span class="payment-civil-title-go1">我的审批</span>
      <span class="payment-civil-title-separator">/</span>
      <span class="payment-civil-title-go2">债权处理信息缴费审批</span>
    </div>
    <div class="payment-civil-content">
      <div>汇款账户：</div>
      <div>
        <input type="text" v-model="receiveMoney.userName" disabled="true" />
      </div>
      <div>
        <input type="text" v-model="receiveMoney.cardNum" disabled="true" />
      </div>
      <div>
        <input type="text" v-model="receiveMoney.openAddr" disabled="true" />
      </div>
      <div>
        <input type="text" disabled="true" :value="'应缴费用：' + PamentMsg.FeePayable" />
      </div>
      <div class="payment-civil-content-update">
        上传凭证：
        <div class="payment-civil-content-update-box">
          <div class="payment-civil-content-update-box-container">
            <img :src="SubmitData.voucher" alt />
          </div>
        </div>
      </div>
      <div class="payment-civil-content-payer">
        合同人姓名：
        <input type="text" v-model="SubmitData.contractName" :disabled="true" />
      </div>
      <div class="payment-civil-content-payer">
        打款人姓名：
        <input type="text" :disabled="true" v-model="SubmitData.payertName" />
      </div>
    </div>
    <div class="payment-civil-check">
      <div class="payment-civil-check-reason">
        <span>审批原因</span>
        <textarea
          maxlength="141"
          v-model="SubmitApproveData.checkReason"
        ></textarea>
      </div>
      <div class="payment-civil-check-button">
        <button type="button" @click="RejectCheck">审核驳回</button>
        <button type="button" @click="PassCheck">审核通过</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
        PamentMsg: {
            CardNum: '收款卡号：',
            AccountName: '开户名：',
            OpeningBank: '开户行：',
            FeePayable: this.$route.query.cost,
            Contractor: '',
        },
        SubmitData: {
            voucher: '',
        },
        SubmitApproveData: {
            checkReason: '',
            status: '',
            debtId: '',
        },
        // 新增资产信息所需参数
        AddPropertyMsg: {
            relativePerId: '',
            reportId: '',
            civilId: '',
            debtId: '',
            createId: '',
            status: '0',
        },
        payId: '',
        reportId: '',
        debtId: '',
        // 更新支付明细状态接口
        UpdatePay: {
            status: '',
            payId: '',
        },
        AddSealData: {
            reportId: this.$route.query.reportId,
            parta: '邓丽清',
            partaCard: '440981198801011427',
            partaTel: '15218801056'
        }
    }
  },
  computed: { ...mapState(['receiveMoney']) },
  methods: {
    async InitData() {
      const { payId, reportId, debtId } = this.$route.query
      this.payId = payId
      this.reportId = reportId
      this.debtId = debtId
      const formData = new FormData()
      formData.append('payId', this.payId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busPayDetailController/selectByPrimaryKey',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.SubmitData = result.data
    },
    RejectCheck() {
      if (!this.SubmitApproveData.checkReason)
        return this.$message.error('请先填写审核原因')
      this.UpdatePayStatus('1')
      this.UpdateCheckStatus('8')
    },
    async PassCheck() {
        await this.UpdatePayStatus('2')
        // 生成发票及公章
        const AddSealFormData = new FormData()
        for (const key in this.AddSealData) {
            AddSealFormData.append(key, this.AddSealData[key])
        }
        const { data: result } = await this.$http({
            method: 'post',
            url: '/api/wordConversion/fillInWordAndSaveAsSpecifyFormatdvisory',
            data: AddSealFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        await this.UpdateCheckStatus('9').then(() => {
            // 通过解债ID查询信息
            const formData = new FormData()
            const debtId = this.debtId
            console.log(debtId)
            formData.append('debtId', debtId)
            this.$http({
            method: 'post',
            url: '/api/api/pubDebtController/selectByPrimaryKey',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            }).then((result) => {
            this.AddPropertyMsg.relativePerId = result.data.data.relativePerId
            this.AddPropertyMsg.reportId = result.data.data.reportId
            this.AddPropertyMsg.civilId = result.data.data.civilId
            this.AddPropertyMsg.debtId = this.debtId
            this.AddPropertyMsg.createId = window.sessionStorage.getItem('userId')
            const formData = new FormData()
            for (const key in this.AddPropertyMsg) {
                formData.append(key, this.AddPropertyMsg[key])
            }
            this.$http({
                method: 'post',
                url: '/api/api/busPropertController/insertSelective',
                data: formData,
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            }).then((AddResult) => {
                if (AddResult.data.resultCode !== '200')
                this.$message.error('新增资产信息错误')
                // 调用stage改变接口
                const StageUpdateformData = new FormData()
                StageUpdateformData.append('reportId', this.reportId)
                StageUpdateformData.append('stage', '4')
                this.$http({
                method: 'post',
                url: '/api/api/busReportController/updateDebtStage',
                data: StageUpdateformData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                }).then((StageUpdateResult) => {
                if (StageUpdateResult.data.resultCode !== '200')
                    return this.$message.error(StageUpdateResult.data.resultMessage)
                this.$message.success('进入资产阶段，新增资产信息成功')
            })
            // 调用报备状态更改的接口
          })
        })
      })
    },
    // 提交审批状态
    async UpdateCheckStatus(status) {
      const formData = new FormData()
      this.SubmitApproveData.status = status
      this.SubmitApproveData.debtId = this.debtId
      for (const key in this.SubmitApproveData) {
        formData.append(key, this.SubmitApproveData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (result.data !== '0' && result.resultCode === '200') {
        this.$message.success(result.resultMessage)
      } else {
        this.$message.error('操作失败, 请重试')
      }
      return result
    },
    UpdatePayStatus(status) {
      const formData = new FormData()
      this.UpdatePay.status = status
      this.UpdatePay.payId = this.payId
      for (const key in this.UpdatePay) {
        formData.append(key, this.UpdatePay[key])
      }
      this.$http({
        method: 'post',
        url: '/api/api/busPayDetailController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
  },
  created() {
    this.InitData()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.payment-civil {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 px2rem(4);
  &-title {
    height: px2rem(12);
    line-height: px2rem(12);
    font-size: px2rem(4);
    color: #fc7f89;
    &-go1 {
      color: #616789;
    }
    &-separator {
      color: #616789;
    }
  }
  &-content {
    background-color: #fff;
    border-radius: px2rem(2);
    height: 100%;
    font-size: px2rem(3.5);
    padding: px2rem(4);
    box-sizing: border-box;
    line-height: px2rem(8);
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    input {
      width: px2rem(115);
      padding-left: px2rem(5);
      background: #f0f2fd;
      border: none;
      height: px2rem(10);
      line-height: px2rem(10);
      margin: px2rem(1) 0;
      border-radius: px2rem(1);
    }
    &-title {
      font-weight: 600;
    }
    &-update {
      height: px2rem(16);
      display: flex;
      margin: px2rem(4) 0;
      &-box {
        width: px2rem(140);
        height: px2rem(16);
        border: 1px solid #e8eaec;
        margin: 0 px2rem(4);
        display: flex;
        align-items: center;

        &-container {
          border: 1px solid #e8e8e8;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 px2rem(1);
          height: px2rem(10);
          width: px2rem(14);
          img {
            width: px2rem(14);
            height: px2rem(8);
          }
        }
      }
      &-button {
        height: px2rem(9);
        width: px2rem(25);
        border: none;
        background-color: #616789;
        color: #fff;
        border-radius: px2rem(2);
      }
    }
    &-payer {
      margin-top: px2rem(2);
      input {
        width: px2rem(80);
        height: px2rem(8);
        background-color: #fff;
        border: 1px solid #e8eaec;
      }
      input::-webkit-input-placeholder {
        font-size: px2rem(3.5);
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: px2rem(3.5);
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: px2rem(3.5);
      }
      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        font-size: px2rem(3.5);
      }
    }
    &-submit {
      width: px2rem(60);
      height: px2rem(10);
      background-color: #616789;
      color: #fff;
      border: none;
      border-radius: px2rem(1);
      margin-top: px2rem(4);
    }
  }
  &-check {
    align-items: center;
    height: px2rem(60);
    background-color: #fff;
    width: px2rem(160);
    margin: px2rem(4) auto;
    border-radius: px2rem(2);
    &-reason {
      margin: px2rem(10) 0;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-size: px2rem(5);
        margin-right: px2rem(4);
      }
      textarea {
        width: px2rem(100);
        height: px2rem(20);
        border-radius: px2rem(1);
        font-size: px2rem(4);
        resize: none;
        border: 1px solid #e0e3f8;
        line-height: px2rem(6);
      }
    }
    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        margin: 0 px2rem(4);
        padding: px2rem(1.4) px2rem(4);
        height: px2rem(10);
        font-size: px2rem(3.2);
        border-radius: px2rem(1);
        color: #fff;
        border: none;
        font-size: px2rem(4);
      }
      :nth-child(1) {
        background-color: #616789;
      }
      :nth-child(2) {
        background-color: #fc7f89;
      }
    }
  }
}
</style>
