<!--  -->
<template>
  <div class="payment-info">
    <div class="payment-info-title">
      <span class="payment-info-title-go1">我的审批</span>
      <span class="payment-info-title-separator">/</span>
      <span class="payment-info-title-go2">{{this.$route.path === '/EditReportPayment'?'录入缴费编辑':'录入缴费'}}</span>
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
          <div class="payment-info-content-update-box-container">
            <div class='payment-info-content-update-box-container-item' v-for="(item, index) in SubmitData.voucher" :key="index">
                <img :src="item" @click="openImgToLink(item)"/>
                <img class='payment-info-content-update-box-container-item-delete' src="@imgs/other/delete.png" alt="" @click='DelectVocher(index)'>
            </div>
          </div>
        </div>
        <div class='payment-info-content-update-button'>
            <button type="button"
            class="payment-info-content-update-button-form">
            点击上传
            </button>
            <input @change="UpdataVoucher"
                type="file"
                ref="Voucher" />
        </div>
      </div>
      <div class="payment-info-content-payer">
        合同人姓名：
        <input
          type="text"
          placeholder="请输入"
          v-model="SubmitData.contractName"
        />
      </div>
      <div class="payment-info-content-payer">
        打款人姓名：
        <input
          type="text"
          placeholder="请输入"
          v-model="SubmitData.payertName"
        />
      </div>
      <button
        type="button"
        class="payment-info-content-submit"
        @click="SubmitPayment"
      >
        提交
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      PamentMsg: {
        CardNum: '收款卡号：810101201421046328',
        AccountName: '开户名：山东盛世天泽公关顾问有限公司', //账号名称
        OpeningBank: '开户行：日照银行股份有限公司银海支行',
        FeePayable: '应缴费用：880（元）',
        Contractor: '',
      },
      UpdatePay: {
        status: '',
        payId: '',
      },
      SubmitData: {
        reportId: '',
        contractName: '',
        payertName: '',
        voucher: [],
        cost: '880',
        flag: '1',
        status: '0'
      }
    }
  },
  methods: {
    // 编辑情况数据初始化
    async InitData() {
        const formData = new FormData()
        formData.append('reportId', this.$route.query.reportId)
        const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busPayDetailController/selectByReportId',
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
    },
    async SubmitPayment() {
      // 提交缴费
      if (this.$route.path === '/EditReportPayment') {
          const formData = new FormData()
            this.$delete(this.SubmitData, 'propertId')
            this.$delete(this.SubmitData, 'debtId')
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
            this.UpdatePayStatus(0, this.SubmitData.payId)
      } else {
            const formData = new FormData()
            this.SubmitData.reportId = this.$route.query.reportId
            for (const key in this.SubmitData) {
                formData.append(key, this.SubmitData[key])
            }
            const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busPayDetailController/insertSelective',
            data: formData,
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
            //  根据返回payId修改缴费状态
            this.UpdatePayStatus(0, result.data)
        }
        // 调用状态改变接口
        const UpdateStatusFormData = new FormData()
        UpdateStatusFormData.append('reportId', this.SubmitData.reportId)
        UpdateStatusFormData.append('status', '4')
        const { data: StatusResult } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/updateStatus',
            data: UpdateStatusFormData,
            headers: {
            'Content-Type': 'multipart/form-data',
            }
        })
        this.$message.success('操作成功')
        this.$router.push('/ReportInfo')
    },
    
    UpdataVoucher() {
      const file = this.$refs.Voucher.files[0]
      this.$UpdateFile(file).then((result) => {
        this.SubmitData.voucher.push(result)
      })
    },
    UpdatePayStatus(status, payId) {
      const formData = new FormData()
      const UpdatePay = {
        status,
        payId,
      }
      this.UpdatePay = UpdatePay
      for (const key in UpdatePay) {
        formData.append(key, this.UpdatePay[key])
      }
      this.$http(
        {
          method: 'post',
          url: '/api/api/busPayDetailController/updateStatus',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
        (res) => {
          if (res.resultCode === '200') {
            this.$router.push('/ReportInfo')
          }
        }
      )
    },
  },
  created() {
    if (this.$route.path === '/EditReportPayment') {
        this.InitData()
    }
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
      position: relative;
      display: flex;
      margin: px2rem(4) 0;
      &-box {
        border: 1px solid #e8eaec;
        height: 160px;
        margin: 0 px2rem(4);
        &-container {
            width: px2rem(180.5);
            display: flex;
            flex-wrap: wrap;
            &-item {
                position: relative;
                img {
                    margin: 0 px2rem(2);
                    width: px2rem(18);
                    height: 75px;
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
            height: px2rem(9);
            width: px2rem(25);
            border: none;
            background-color: #616789;
            color: #fff;
            border-radius: px2rem(2);
            font-size: 16px;
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
      font-size: 18px;
    }
  }
}
</style>
