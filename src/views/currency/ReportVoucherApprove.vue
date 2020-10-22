<!--  -->
<template>
  <div class="payment-info">
    <div class="payment-info-title">
      <span class="payment-info-title-go1">我的审批</span>
      <span class="payment-info-title-separator">/</span>
      <span class="payment-info-title-go2">录入缴费</span>
    </div>
    <div class="payment-info-content">
      <div class="payment-info-content-title">
        您新增的录入信息总部公司已经审核通过，请根据下面所给信息线下支付录入费用。
      </div>
      <div>汇款账户：</div>
      <div>
        <input type="text" v-model="PamentMsg.CardNum" disabled="true" />
      </div>
      <div>
        <input type="text" v-model="PamentMsg.AccountName" disabled="true" />
      </div>
      <div>
        <input type="text" v-model="PamentMsg.OpeningBank" disabled="true" />
      </div>
      <div>
        <input type="text" v-model="PamentMsg.FeePayable" disabled="true" />
      </div>
      <div class="payment-info-content-update">
        上传凭证：
        <div class="payment-info-content-update-box">
          <div
            class="payment-info-content-update-box-container"
            v-for="(item, index) in VoucherData.voucher"
            :key="index"
            @click="openImgToLink(item)"
          >
            <img :src="item" alt />
          </div>
        </div>
      </div>
      <div class="payment-info-content-payer">
        合同人姓名：
        <input type="text" v-model="VoucherData.contractName" disabled="true" />
      </div>
      <div class="payment-info-content-payer">
        打款人姓名：
        <input type="text" v-model="VoucherData.payertName" disabled="true" />
      </div>
      <div class="payment-info-content-check-reason">
        审批原因：
        <textarea v-model="SubmitData.CheckReason"></textarea>
      </div>
      <div class="payment-info-content-submit">
        <button type="button" @click="RejectPayment">审批驳回</button>
        <button type="button" @click="PassPayment">审批通过</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        PamentMsg: {
            CardNum: '收款卡号：810101201421046328',
            AccountName: '开户名：山东盛世天泽公关顾问有限公司',
            OpeningBank: '开户行：日照银行股份有限公司银海支行',
            FeePayable: '应缴费用：880（元）',
            Contractor: '',
        },
        VoucherData: {},
        SubmitData: {
            CheckReason: '',
            reportId: '',
            status: '',
        },
        payId: '',
        reportId: '',
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
  methods: {
    async InitData() {
      const { payId, reportId } = this.$route.query
      this.payId = payId
      this.reportId = reportId
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
      this.VoucherData = result.data
      this.VoucherData.voucher = this.VoucherData.voucher.split(',')
    },
    async PassPayment() {
        await this.UpdatePayStatus('2')
        // 调用公章和发票生成接口
        const AddSealFormData = new FormData()
        for (const key in this.AddSealData) {
            AddSealFormData.append(key, this.AddSealData[key])
        }
        const { data: result } = await this.$http({
            method: 'post',
            url: '/api/wordConversion/fillInWordAndSaveAsSpecifyFormatReportFee',
            data: AddSealFormData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log(result)
        await this.UpdateStatus('5').then((result) => {
            if (result.resultCode !== '200')
            return this.$message.error(result.resultMessage)
            this.$message.success('数据审批完成')
            // 调用stage改变接口
            const StageUpdateformData = new FormData()
            StageUpdateformData.append('reportId', this.reportId)
            StageUpdateformData.append('stage', '2')
            this.$http({
            method: 'post',
            url: '/api/api/busReportController/updateDebtStage',
            data: StageUpdateformData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            }).then((StageUpdateResult) => {
                if (StageUpdateResult.data.resultCode !== '200') {
                    return this.$message.error(StageUpdateResult.data.resultMessage)
                }
                this.$message.success('进入调解阶段')
                this.$router.push({
                    path: '/PaymentVoucher',
                })
            })
        })
        this.$router.push('/PaymentVoucher')
    },
    RejectPayment() {
        if (!this.SubmitData.CheckReason.trim())
            return this.$message.error('请先填写审批原因')
        this.UpdateStatus('6').then((result) => {
            if (result.resultCode !== '200')
            return this.$message.error(result.resultMessage)
            this.$message.success('数据审批完成')
        })
        this.UpdatePayStatus('1')
        this.$router.push('/PaymentVoucher')
    },
    async UpdateStatus(status) {
      const formData = new FormData()
      this.SubmitData.reportId = this.reportId
      this.SubmitData.status = status
      for (const key in this.SubmitData) {
        formData.append(key, this.SubmitData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busReportController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
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
        }
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
.payment-info {
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
      font-size: 16px;
    }
    &-title {
      font-weight: 600;
    }
    &-update {
      display: flex;
      margin: px2rem(4) 0;
      &-box {
        border: 1px solid #e8eaec;
        height: 160px;
        margin: 0 px2rem(4);
        width: px2rem(180.5);
        display: flex;
        flex-wrap: wrap;
        img {
            margin: 0 px2rem(2);
            width: px2rem(18);
            height: 75px;
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
        width: px2rem(92);
        height: px2rem(8);
        background-color: #f0f2fd;
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
    &-check-reason {
      display: flex;
      align-items: center;
      margin: px2rem(6) 0;
      textarea {
        font-size: 20px;
        width: px2rem(100);
        height: px2rem(20);
        resize: none;
        line-height: px2rem(4);
        border: 1px solid #e8eaec;
      }
    }
    &-submit {
      width: px2rem(120);
      display: flex;
      justify-content: space-around;
      button {
        width: px2rem(30);
        height: px2rem(10);
        color: #fff;
        border: none;
        font-size: 20px;
        border-radius: px2rem(1);
        margin-top: px2rem(4);
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
