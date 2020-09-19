<!--  -->
<template>
    <div class='payment-info'>
        <div class='payment-info-title'>
            <span class='payment-info-title-go1'>我的审批</span>
            <span class='payment-info-title-separator'> / </span>
            <span class='payment-info-title-go2'>录入缴费</span>
        </div>
        <div class='payment-info-content'>
            <div class='payment-info-content-title'>您新增的报备信息总部公司已经审核通过，请根据下面所给信息线下支付录入费用。</div>
            <div>汇款账户：</div>
            <div><input type="text" v-model='PamentMsg.CardNum' disabled='true'></div>
            <div><input type="text" v-model='PamentMsg.AccountName' disabled='true'></div>
            <div><input type="text" v-model='PamentMsg.OpeningBank' disabled='true'></div>
            <div><input type="text" v-model='PamentMsg.FeePayable' disabled='true'></div>
            <div class='payment-info-content-update'>
                上传凭证：
                <div class='payment-info-content-update-box'>
                    <div class='payment-info-content-update-box-container' v-for="(item,index) in VoucherData.voucher" :key='index'>
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>
            <div class='payment-info-content-payer'>
                合同人姓名：
                <input type="text"  v-model='VoucherData.contractName' disabled='true'>
            </div>
            <div class='payment-info-content-payer'>打款人姓名：
                <input type="text"  v-model='VoucherData.payertName' disabled='true'>
            </div>
            <div class='payment-info-content-check-reason'>
                审批原因：
                <textarea v-model='SubmitData.CheckReason'></textarea>
            </div>
            <div class='payment-info-content-submit'>
                <button @click='RejectPayment'>审批驳回</button>
                <button @click='PassPayment'>审批通过</button>
            </div>
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
            VoucherData: {},
            SubmitData: {
                CheckReason: '',
                reportId: '',
                status: ''
            },
            // 更新支付明细状态接口
            UpdatePay: {
                status: '',
                payId: ''
            }
        }
    },
    methods: {
        async InitData () {
            const payId = window.sessionStorage.getItem('payId')
            const formData = new FormData()
            formData.append('payId', payId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busPayDetailController/selectByPrimaryKey',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.VoucherData = result.data
            this.VoucherData.voucher = this.VoucherData.voucher.split(',')
        },
        async PassPayment () {
            await this.UpdatePayStatus('2')
            await this.UpdateStatus('5').then(result => {
                if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
                this.$message.success('数据审批完成')
                // 调用stage改变接口
                const StageUpdateformData = new FormData()
                StageUpdateformData.append('reportId', window.sessionStorage.getItem('reportId'))
                StageUpdateformData.append('stage', '2')
                this.$http({
                    method: 'post',
                    url: '/api/api/busReportController/updateDebtStage',
                    data: StageUpdateformData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(StageUpdateResult => {
                    if (StageUpdateResult.data.resultCode !== '200') return this.$message.error(StageUpdateResult.data.resultMessage)
                    this.$message.success('进入调解阶段')
                })
            })
        },
        RejectPayment () {
            if (!this.SubmitData.CheckReason.trim()) return this.$message.error('请先填写审批原因')
            this.UpdateStatus('6').then(result => {
                if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
                this.$message.success('数据审批完成')
            })
            this.UpdatePayStatus('1')
        },
        async UpdateStatus (status) {
            const formData = new FormData()
            this.SubmitData.reportId = window.sessionStorage.getItem('reportId')
            this.SubmitData.status = status
            for (const key in this.SubmitData) {
                formData.append(key, this.SubmitData[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busReportController/updateStatus',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return result
        },
        UpdatePayStatus (status) {
            const formData = new FormData()
            this.UpdatePay.status = status
            this.UpdatePay.payId = window.sessionStorage.getItem('payId')
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
            height: px2rem(16);
            display: flex;
            margin: px2rem(4) 0;
            &-box {
                width: px2rem(140);
                height: px2rem(16);
                border: 1px solid #E8EAEC;
                margin: 0 px2rem(4);
                display: flex;
                align-items: center;

                &-container {
                    border: 1px solid #E8E8E8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 px2rem(1);
                    height: px2rem(10);
                    width: px2rem(14);
                    img {
                        width: px2rem(14);
                        height: px2rem(8)
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
                width: px2rem(92);
                height: px2rem(8);
                background-color: #F0F2FD;
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
        &-check-reason {
            display: flex;
            align-items: center;
            margin: px2rem(6) 0;
            textarea {
                width: px2rem(100);
                height: px2rem(20);
                resize: none;
                line-height: px2rem(4);
                border: 1px solid #E8EAEC;
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
                border-radius: px2rem(1);
                margin-top: px2rem(4);
            }
            :nth-child(1) {
                background-color: #616789;
            }
            :nth-child(2) {
                background-color: #FC7F89;
            }
        }
    }
}
</style>
