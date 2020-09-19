<!--  -->
<template>
    <div class='payment-info'>
        <div class='payment-info-title'>
            <span class='payment-info-title-go1'>我的审批</span>
            <span class='payment-info-title-separator'> / </span>
            <span class='payment-info-title-go2'>报备缴费</span>
        </div>
        <div class='payment-info-content'>
            <div class='payment-info-content-title'>您新增的报备信息总部公司已经审核通过，请根据下面所给信息线下支付报备费用。</div>
            <div>汇款账户：</div>
            <div><input type="text" v-model='PamentMsg.CardNum' disabled='true'></div>
            <div><input type="text" v-model='PamentMsg.AccountName' disabled='true'></div>
            <div><input type="text" v-model='PamentMsg.OpeningBank' disabled='true'></div>
            <div><input type="text" v-model='PamentMsg.FeePayable' disabled='true'></div>
            <div class='payment-info-content-update'>
                上传凭证：
                <div class='payment-info-content-update-box'>
                    <div class='payment-info-content-update-box-container'>
                        <img :src="item" v-for='(item,index) in UpdataVoucherList' :key='index'>
                    </div>
                </div>
                <button class='payment-info-content-update-button'>点击上传</button>
                <input @change='UpdataVoucher' type="file" ref='Voucher'>
            </div>
            <div class='payment-info-content-payer'>
                合同人姓名：
                <input type="text" placeholder="请输入" v-model='SubmitData.contractName'>
            </div>
            <div class='payment-info-content-payer'>打款人姓名：
                <input type="text" placeholder="请输入" v-model='SubmitData.payertName'>
            </div>
            <button class='payment-info-content-submit' @click='SubmitPayment'>提交</button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            PamentMsg: {
                CardNum: '收款卡号：4785124845218451',
                AccountName: '开户名：默默',
                OpeningBank: '开户行：中国建设银行',
                FeePayable: '应缴费用：880（元）',
                Contractor: ''
            },
            SubmitData: {
                reportId: '',
                contractName: '',
                payertName: '',
                voucher: [],
                cost: '880',
                flag: '1',
                status: '0'
            },
            UpdataVoucherList: []
        }
    },
    methods: {
        InitData () {
            this.SubmitData.reportId = window.sessionStorage.getItem('reportId')
        },
        async SubmitPayment () {
            // 提交缴费
            this.SubmitData.voucher = this.UpdataVoucherList
            const formData = new FormData()
            for (const key in this.SubmitData) {
                formData.append(key, this.SubmitData[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busPayDetailController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            //  根据返回payId修改缴费状态
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.UpdatePayStatus(0, result)
            // 调用状态改变接口
            const UpdateStatusFormData = new FormData()
            UpdateStatusFormData.append('reportId', this.SubmitData.reportId)
            UpdateStatusFormData.append('status', '4')
            const { data: StatusResult } = await this.$http({
                method: 'post',
                url: '/api/api/busReportController/updateStatus',
                data: UpdateStatusFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (StatusResult.resultCode !== '200') return this.$message.error('提交错误, 请重试')
            this.$message.success(StatusResult.resultMessage)
        },
        UpdataVoucher () {
            const file = this.$refs.Voucher.files[0]
            this.$UpdateFile(file).then(result => {
                this.UpdataVoucherList.push(result)
            })
        },
        UpdatePayStatus (status, payId) {
            const formData = new FormData()
            this.UpdatePay.status = status
            this.UpdatePay.payId = payId
            for (const key in this.UpdatePay) {
                formData.append(key, this.UpdatePay[key])
            }
            this.$http({
                method: 'post',
                url: '/api/api/busPayDetailController/updateStatus',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    },
    created () {
        this.InitData()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.payment-info {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 0 px2rem(4);
    &-title {
        height: px2rem(12);
        line-height: px2rem(12);
        font-size: px2rem(4);
        color: #FC7F89;
        &-go1 {
            color: #616789;
        }
        &-separator {
            color: #616789
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
            background: #F0F2FD;
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
            position: relative;
            height: px2rem(16);
            display: flex;
            margin: px2rem(4) 0;
            &-box {
                width: px2rem(140);
                border: 1px solid #E8EAEC;
                margin: 0 px2rem(4);
                display: flex;
                align-items: center;

                &-container {
                    margin: 0 px2rem(2);
                    display: flex;
                    align-items: center;
                    margin: 0 px2rem(1);
                    height: px2rem(10);
                    img {
                        width: px2rem(16);
                        height: px2rem(10);
                        margin: 0 px2rem(1);
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
            input[type=file] {
                height: px2rem(9);
                width: px2rem(20);
                position: absolute;
                left: px2rem(166);
                bottom: px2rem(6);
                opacity: 0;
            }
        }
        &-payer {
            margin-top: px2rem(2);
            input {
                width: px2rem(80);
                height: px2rem(8);
                background-color: #fff;
                border: 1px solid #E8EAEC;
            }
            input::-webkit-input-placeholder{
                font-size: px2rem(3.5);
            }
            input::-moz-placeholder{   /* Mozilla Firefox 19+ */
                font-size: px2rem(3.5);
            }
            input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                font-size: px2rem(3.5);
            }
            input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
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
