<!--  -->
<template>
  <div class="payment-civil">
    <div class="payment-civil-title">
      <span class="payment-civil-title-go1">我的审批</span>
      <span class="payment-civil-title-separator">/</span>
      <span class="payment-civil-title-go2">{{this.$route.path === '/EditDebtVoucher'?'债权缴费信息编辑':'债权处理信息缴费'}}</span>
    </div>
    <div class="payment-civil-content">
      <div class="payment-civil-content-title">
        您提交的债权处理信息缴费总部公司已经审核通过，请根据下面所给信息线下支付策划方案服务费用。
      </div>
      <div>汇款账户：</div>
      <div>
        <input type="text"
               v-model="PamentMsg.CardNum"
               disabled="true" />
      </div>
      <div>
        <input type="text"
               v-model="PamentMsg.AccountName"
               disabled="true" />
      </div>
      <div>
        <input type="text"
               v-model="PamentMsg.OpeningBank"
               disabled="true" />
      </div>
      <div>
        <input type="text"
               :value="'应缴费用：' + PamentMsg.FeePayable"
               disabled="true" />
      </div>
      <div class="payment-civil-content-update">
        上传凭证：
        <div class="payment-civil-content-update-box">
          <div class="payment-civil-content-update-box-container">
            <div class='payment-civil-content-update-box-container-item' v-for="(item, index) in SubmitData.voucher" :key="index">
                <img :src="item" @click="openImgToLink(item)" />
                <img class='payment-civil-content-update-box-container-item-delete' src="@imgs/other/delete.png" alt="" @click='DelectVocher(index)'>
            </div>
          </div>
        </div>
        <div class='payment-civil-content-update-button'>
            <button type="button"
            class="payment-civil-content-update-button-form">
            点击上传
            </button>
            <input @change="UpdataVoucher"
                type="file"
                ref="Voucher" />
        </div>
      </div>
      <div class="payment-civil-content-payer">
        合同人姓名：
        <input type="text"
               v-model="SubmitData.contractName" />
      </div>
      <div class="payment-civil-content-payer">
        打款人姓名：
        <input type="text"
               placeholder="请输入"
               v-model="SubmitData.payertName" />
      </div>
      <button type="button"
              class="payment-civil-content-submit"
              @click="SubmitPayment">
        提交
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      PamentMsg: {
        CardNum: '收款卡号：810101201421046328',
        AccountName: '开户名：山东盛世天泽公关顾问有限公司',
        OpeningBank: '开户行：日照银行股份有限公司银海支行',
        FeePayable: this.$route.query.thisPlanMoney,
        Contractor: '',
      },
      SubmitData: {
        reportId: '',
        contractName: '',
        payertName: '',
        voucher: [],
        cost: this.$route.query.thisPlanMoney,
        flag: '3',
        status: '0',
        debtId: '',
      },
      UpdatePay: {
        status: '',
        payId: '',
      },
    }
  },
  methods: {
    async SubmitPayment () {
      // 提交缴费
      // this.SubmitData.reportId = ''
      if (this.$route.path === '/EditDebtVoucher') {
            const formData = new FormData()
            this.$delete(this.SubmitData, 'propertId')
            console.log(this.SubmitData)
            for (const key in this.SubmitData)
            {
                formData.append(key, this.SubmitData[key])
            }
            await this.$http({
                method: 'post',
                url: '/api/api/busPayDetailController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                'Content-Type': 'multipart/form-data',
                }
            })
            await this.UpdatePayStatus(this.SubmitData.payId)
      } else {
        this.SubmitData.reportId = this.$route.query.reportId
        this.SubmitData.debtId = this.$route.query.debtId
        const formData = new FormData()
        for (const key in this.SubmitData)
        {
            formData.append(key, this.SubmitData[key])
        }
        const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busPayDetailController/insertSelective',
            data: formData,
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        })
        this.UpdatePayStatus(result.data)
      }
      // 调用状态接口更改缴费状态
      // 调用状态改变接口
      const UpdateStatusFormData = new FormData()
      UpdateStatusFormData.append('debtId', this.SubmitData.debtId)
      UpdateStatusFormData.append('status', '7')
      const { data: StatusResult } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/updateStatus',
        data: UpdateStatusFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      this.$message.success(StatusResult.resultMessage)
      this.$router.push({ path: '/UnlockApply' })
    },
    UpdataVoucher () {
      const file = this.$refs.Voucher.files[0]
      this.$UpdateFile(file).then((result) => {
        this.SubmitData.voucher.push(result)
      })
    },
    async UpdatePayStatus (data) {
      const formData = new FormData()
      this.UpdatePay.status = '0'
      this.UpdatePay.payId = data
      for (const key in this.UpdatePay)
      {
        formData.append(key, this.UpdatePay[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busPayDetailController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result)
    },
    // 编辑情况下信息初始化
    async InitVoucher () {
        const formData = new FormData()
        formData.append('reportId', this.$route.query.reportId)
        formData.append('debtId', this.$route.query.debtId)
        const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busPayDetailController/selectByReportIdAndDebtId',
            data: formData,
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        })
        this.SubmitData = result.data[0]
        console.log(this.SubmitData)
        this.SubmitData.voucher = this.SubmitData.voucher.split(',')
    },
    // 删除凭证
    DelectVocher (index) {
        this.SubmitData.voucher.splice(index,1)
    }
  },
  created () {
      if (this.$route.path === '/EditDebtVoucher') {
          this.InitVoucher()
      }
  }
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
      font-size: 16px;
    }
    &-title {
      font-weight: 600;
    }
    &-update {
      position: relative;
      display: flex;
      margin: px2rem(4) 0;
      &-box {
        margin: 10px 0;
        display: flex;
        height: 180px;
        &-container {
            width: 800px;
            border: 1px solid #e8eaec;
            display: flex;
            flex-wrap: wrap;
            margin: 0 10px;
            &-item {
                position: relative;
                img {
                    margin: 0 px2rem(2);
                    width: px2rem(18);
                    height: px2rem(12.5);
                }
                &-delete{
                    position: absolute;
                    left: px2rem(15);
                    top: px2rem(-2);
                    width: 25px!important;
                    height: 25px!important;
                }
            }
        }
      }
      &-button {
          position: relative;
          &-form {
            padding: 10px 30px;
            font-size: 16px;
            border: none;
            background-color: #616789;
            color: #fff;
            border-radius: px2rem(2);
          }
          input[type='file'] {
              height: px2rem(9);
              width: px2rem(20);
              position: absolute;
              left: 0;
              top: -4px;
              opacity: 0;
          }
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
}
</style>
