<!--  -->
<template>
  <div class='examine-report'>
        <div class='examine-report-title'>
            <span class='examine-report-title-go1'>我的债行</span>
            <span class='examine-report-title-separator'> / </span>
            <span class='examine-report-title-go2'>调查报告审批</span>
        </div>
        <div class='examine-report-container'>
            <div class='examine-report-container-form'>
                <el-collapse>
                    <!-- 调查报告 -->
                    <el-collapse-item title="调查报告" name="1">
                        <div class='examine-report-container-form-title'>
                            <div>XXXXXXX有限公司</div>
                            <div>调查报告</div>
                        </div>
                        <div class='examine-report-container-form-header'>
                           <span>申请单位名称：</span>
                            <input type="text">
                        </div>
                        <div class='examine-report-container-form-header'>
                            <span>客户经理：</span>
                            <input type="text">
                        </div>
                        <div class='examine-report-container-form-header'>
                            <span>报告完成日期：</span>
                            <input type="text">
                        </div>
                        <div class='examine-report-container-form-item-1'>
                            <h3>一、申请客户名称：</h3>
                            <input type="text">
                        </div>
                        <h3>二、申请客户基本情况调查</h3>
                        <div class='examine-report-container-form-item-2'>
                            <div>
                                （1）注册资金：<input type="text" class='examine-report-container-form-input200'>元
                            </div>
                            <div>
                                <span>（2）成立时间：</span>
                                <input type="text" class='examine-report-container-form-input200'>
                            </div>
                            <div>
                                （3）经营地址：<input type="text">省<input type="text">市<input type="text">区<input type="text">镇<input type="text">号
                            </div>
                            <div>
                                （4）经营范围：从事<input type="text">相关业务。取得从事该行业必备的有效的经营资质（经营许可证、建筑资质等）<input type="radio" name="result" checked >是<input type="radio" name="result" >否  取得从事该行业必备的有效的经营资质（经营许可证、建筑资质等）
                            </div>
                            <div>（5）法定代表人（实际控制人）简介：</div>
                            <div>
                                法人：<input type="text">性别：<input type="text">年龄：<input type="text">学历：<input type="text">婚否：<input type="text">电话：<input type="text">公司占股：<input type="text">
                            </div>
                            <div>
                                股东：<input type="text">性别：<input type="text">年龄：<input type="text">学历：<input type="text">婚否：<input type="text">电话：<input type="text">公司占股：<input type="text">
                            </div>
                            <div>
                                股东：<input type="text">性别：<input type="text">年龄：<input type="text">学历：<input type="text">婚否：<input type="text">电话：<input type="text">公司占股：<input type="text">
                            </div>
                            <div>（6）债务构成：</div>
                            <div>公司总负债<input type="text">元人民币、总负债率<input type="text">%</div>
                            <div>合计银行<input type="text">元</div>
                            <div>
                                其中<input type="text" class='examine-report-container-form-input200'>银行<input type="text">元、<input type="text" class='examine-report-container-form-input200'>银行<input type="text">元；
                            </div>
                            <div>
                                合计民营金融机构<input type="text">元
                            </div>
                            <div>
                                其中小贷公司<input type="text">元、担保公司<input type="text">元、投资公司<input type="text">元、基金公司<input type="text">元；
                            </div>
                            <div>
                                民间借贷合计<input type="text">元人民币：<input type="radio" name="result" checked >是<input type="radio" name="result" checked >否 涉及非法集资；
                            </div>
                            <div>
                                5万以下<input type="text">人、20万以下<input type="text">人、50万以下<input type="text">人、100万以下<input type="text">人、100万以上<input type="text">人；
                            </div>
                            <div>
                                项目施工欠款<input type="text">元
                            </div>
                            <div>
                                拖欠税款<input type="text">元,拖欠工资<input type="text">元,拖欠社保金<input type="text">元；
                            </div>
                            <div>
                                应收账款<input type="text">元,应付帐<input type="text">元；
                            </div>
                            <div>
                                涉及司法<input type="text">个、公司股权是否质押<input type="radio" name="result" checked >是<input type="radio" name="result" >否
                            </div>
                        </div>
                        <h3>三、申请客户经营情况调查</h3>
                        <div class='examine-report-container-form-item-3'>
                            <div>
                                （1）经营模式：
                                <input type="radio" name="result1" >批发
                                <input type="radio" name="result1" >配套
                                <input type="radio" name="result1" >出口
                                <input type="radio" name="result1" >贸易型
                                <input type="radio" name="result1" >生产型；
                                <input type="radio" name="result2" >有
                                <input type="radio" name="result2" >无 自有品牌；
                            </div>
                            <div>
                                （2）经营规模：<input type="text">年<input type="text">元、产品毛利<input type="text">%、纯<input type="text">利<input type="text">%；<input type="text">年<input type="text">元、产品毛利
                            </div>
                            <div>（3）主要产品行业：</div>
                            <div>
                                朝阳行业<input type="radio" name="result3" >是
                                <input type="radio" name="result3" >否
                            </div>
                            <div>
                                是否属产能过剩行业：<input type="radio" name="result4" >是<input type="radio" name="result4" >否；生产工艺是否属国家政策限制和淘汰类：<input type="radio" name="result5" >是<input type="radio" name="result5" >否；
                            </div>
                        </div>
                        <h3>四、企业固定资产情况</h3>
                        <div class='examine-report-container-form-item-4'>
                            <div>
                                （1）土地<input type="text">
                                亩、土地性质<input type="text">
                                出让、划拨、流转、租赁;购买价
                                <input type="text">元/亩、评估价值
                                <input type="text">元/亩;
                                是否质押<input type="radio" name="result6" >是
                                <input type="radio" name="result6" >否、
                                是否进入司法诉讼<input type="radio" name="result7" >是
                                <input type="radio" name="result7" >否、
                                是否进入查封<input type="radio" name="result8" >是<input type="radio" name="result8" >否；
                            </div>
                            <div>详细地址:<input type="text" class='examine-report-container-form-input450'></div>
                            <div>
                                （2）房产<input type="text">平方米、房产性质:住宅<input type="radio" name="result9" >是<input type="radio" name="result9" >否、商业<input type="radio" name="result10" >是<input type="radio" name="result10" >否、商住<input type="radio" name="result11" >是<input type="radio" name="result11" >否、商服<input type="radio" name="result12" >是<input type="radio" name="result12" >否；
                            </div>
                            <div>详细地址:<input type="text" class='examine-report-container-form-input450'></div>
                            <div>
                                评估价值<input type="text">元; 是否质押<input type="radio" name="result13" >是<input type="radio" name="result13" >否、是否进入司法诉讼<input type="radio" name="result14" >是<input type="radio" name="result14" >否、是否进入查封<input type="radio" name="result15" >是<input type="radio" name="result15" >否；
                            </div>
                            <div>
                                其中住宅<input type="text">平方米、评估价值<input type="text">元; 是否质押<input type="radio" name="result16" >是<input type="radio" name="result16" >否、是否进入司法诉讼<input type="radio" name="result17" >是<input type="radio" name="result17" >否、是否进入查封<input type="radio" name="result18" >是<input type="radio" name="result18" >否；
                            </div>
                            <div>
                                商业<input type="text">平方米、评估价值<input type="text">元; 是否质押<input type="radio" name="result19" >是<input type="radio" name="result19" >否、是否进入司法诉讼<input type="radio" name="result20" >是<input type="radio" name="result20" >否、是否进入查封<input type="radio" name="result21" >是<input type="radio" name="result21" >否；
                            </div>
                            <div>
                                厂房<input type="text">平方米、评估价值<input type="text">元; 是否质押<input type="radio" name="result22" >是<input type="radio" name="result22" >否、是否进入司法诉讼<input type="radio" name="result23" >是<input type="radio" name="result23" >否、是否进入查封<input type="radio" name="result24" >是<input type="radio" name="result24" >否；
                            </div>
                            <div>
                                设备<input type="text">台/套、评估价值<input type="text">元; 专业设备<input type="radio" name="result25" >是<input type="radio" name="result25" >否、通用设备<input type="radio" name="result26" >是<input type="radio" name="result26" >否；
                            </div>
                            <div>
                                其它无型资产:专利技术、老字号品牌等无型资产,评估价值<input type="text">元; 是否质押<input type="radio" name="result27" >是<input type="radio" name="result27" >否、是否进入司法诉讼<input type="radio" name="result28" >是<input type="radio" name="result28" >否、是否进入查封<input type="radio" name="result29" >是<input type="radio" name="result29" >否；
                            </div>
                        </div>
                        <h3>五、项目(生产)证照</h3>
                        <div class='examine-report-container-form-item-5'>
                            建设用地规划许可证
                            <input type="radio" name="result30" >是<input type="radio" name="result30" >否、
                            建设工程规划许可证
                            <input type="radio" name="result31" >是<input type="radio" name="result31" >否、
                            建设工程施工许可证
                            <input type="radio" name="result32" >是<input type="radio" name="result32" >否、
                            投资项目备案证
                            <input type="radio" name="result33" >是<input type="radio" name="result33" >否、
                            项目预售房许可证
                            <input type="radio" name="result34" >是<input type="radio" name="result34" >否、
                            项目建设合同
                            <input type="radio" name="result35" >是<input type="radio" name="result35" >否、
                            项目建设公司资质
                            <input type="radio" name="result36" >是<input type="radio" name="result36" >否、
                            营业执照是否年检
                            <input type="radio" name="result37" >是<input type="radio" name="result37" >否、
                            税务申报是否正常
                            <input type="radio" name="result38" >是<input type="radio" name="result38" >否；
                        </div>
                        <h3>六、企业工商报告</h3>
                        <div class='examine-report-container-form-item-5'>
                            <textarea name="textarea1"></textarea>
                        </div>
                        <h3>七、企业产调证明</h3>
                        <div class='examine-report-container-form-item-6'>
                            <textarea name="textarea1"></textarea>
                        </div>
                        <h3>八、简介项目情况</h3>
                        <div>
                            （1）项目优势（独特性、政策支持予否）：<input type="text" class='examine-report-container-form-item-8-input'>
                        </div>
                        <div>
                            （2）项目弱点（困难）存在一定瑕疵说明：<input type="text" class='examine-report-container-form-item-8-input'>
                        </div>
                        <div class='examine-report-container-form-item-8'>
                            （3）你对项目总体评价：<input type="radio" name="result40" >完全满足本公司要求<input type="radio" name="result40" >基本满足公司要求<input type="text" class='examine-report-container-form-item-8-input3'>
                        </div>
                        <h3>九、你对债事人评价</h3>
                            <input type="radio" name="result41" >诚信<input type="radio" name="result41" >精明会经营<input type="radio" name="result41" >能干懂管理<input type="text" class='examine-report-container-form-item-9-input'>
                        <h3>十、其它补充情况</h3>
                        <textarea name="textarea1"></textarea>
                        <h3>十一、调查结论</h3>
                        <div class='examine-report-container-form-item-11'>
                            <span>你的建议方案：</span>
                            <textarea></textarea>
                        </div>
                        <h3>十二、调查报告的真实性调查人保证</h3>
                        <div>保证调查报告内容的真实、准确、完整，不存在虚假记载、误导性陈述或重大遗漏，并承担连带法律责任。</div>
                        <div class='examine-report-container-form-sign-1'>
                            <h3>调查人：由网点盖章确认</h3>
                        </div>
                        <div class='examine-report-container-form-sign-2'>
                            <h3>时间：<input type="text" class='examine-report-container-form-input200'></h3>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <div class='examine-report-check'>
            <div class='examine-report-check-reason'>
                <span>审批原因</span>
                <textarea maxlength='141' v-model='SubmitApproveData.checkReason'></textarea>
            </div>
            <div class='examine-report-check-button'>
                <button @click='RejectCheck'>审核驳回</button>
                <button @click='PassCheck'>审核通过</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 分页器结构数据源
            bgc: true,
            queryInfo: {
                pageSize: 10
            },
            UserMsg: [
                {
                    IsCoordinate: 'true',
                    Type: 'debtor',
                    Properties: 'person'
                }
            ],
            RelativeMsg: [
                {
                    IsCoordinate: 'true',
                    Type: 'debtor',
                    Properties: 'person'
                }
            ],
            // 相对人数据源
            RelativeList: [
                {
                    Id: '1',
                    Name: '姓名1',
                    DebtType: '相对人',
                    DebtNature: '个人',
                    Phone: '15121221443'
                },
                {
                    Id: '2',
                    Name: '姓名2',
                    DebtType: '相对人',
                    DebtNature: '个人',
                    Phone: '15121221443'
                },
                {
                    Id: '3',
                    Name: '姓名3',
                    DebtType: '相对人',
                    DebtNature: '个人',
                    Phone: '15121221443'
                }
            ],
            // 确定选用正常模板还是多选模板
            isNormal: false,
            // 调查报告提交数据源
            SubmitDataMsg: {},
            // 提交审批数据源
            SubmitApproveData: {
                status: '',
                debtId: '',
                checkReason: ''
            }
        }
    },
    methods: {
        async InitData () {
            const formData = new FormData()
            formData.append('reportId', window.sessionStorage.getItem('reportId'))
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busInvestigateReportController/selectByPrimaryKey',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.SubmitDataMsg = result.data
        },
        // 通过审批
        RejectCheck () {
            if (!this.SubmitApproveData.checkReason) return this.$message.error('请先填写审核原因')
            this.UpdateCheckStatus('1')
        },
        PassCheck () {
            this.UpdateCheckStatus('4')
        },
        // 提交审批状态
        async UpdateCheckStatus (status) {
            const formData = new FormData()
            this.SubmitApproveData.status = status
            this.SubmitApproveData.debtId = window.sessionStorage.getItem('debtId')
            for (const key in this.SubmitApproveData) {
                formData.append(key, this.SubmitApproveData[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDebtController/updateStatus',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.data !== '0' && result.resultCode === '200') {
                this.$message.success(result.resultMessage)
            } else {
                this.$message.error('操作失败, 请重试')
            }
        }
    },
    created () {
        this.InitData()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.examine-report {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    &-title {
        height: px2rem(12);
        line-height: px2rem(12);
        font-size: px2rem(4);
        color: #FC7F89;
        margin: 0 px2rem(4);
        &-go1 {
            color: #616789;
        }
        &-separator {
            color: #616789
        }
    }

    &-container {
        margin: px2rem(1) px2rem(4);
        &-form {
            border-radius: px2rem(2);
            background-color: #fff;
            padding: px2rem(2) px2rem(6);
            font-size: px2rem(3.2);
            // 统一的表单样式,宽度自定
            input {
                border:1px solid #E8EAEC;
                border-radius: px2rem(1);
                height: px2rem(7);
                padding-left: px2rem(2);
                margin: px2rem(2);
                width: px2rem(20);
            }
            // 长表单200
            &-input200 {
                width: px2rem(40)!important;
            }
            // 特殊表单450
            &-input450 {
                width: px2rem(80)!important;
            }
            textarea {
                height: px2rem(15);
                resize: none;
                line-height: px2rem(5);
                font-size: px2rem(3.5);
                width: px2rem(300);
            }
            input[type=radio] {
                width: px2rem(4)!important;
                height: px2rem(4)!important;
                line-height: px2rem(4)!important;
                margin: px2rem(1)!important;
                vertical-align: middle;
                background-color: #fff
            }
            &-title {
                border-top: 1px solid #D9D9D9;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height: px2rem(18);
                font-size: px2rem(3.5);
                font-weight: 600;
            }
            &-header {
                height: px2rem(12);
                line-height: px2rem(12);
                span {
                    width: px2rem(25);
                    display: inline-block;;
                }
                input {
                    margin-left: 0;
                    width: px2rem(80);
                }
            }
            &-item-1 {
                h3 {
                    display: inline-block;
                }
                input {
                    width: px2rem(80);
                }
            }
            &-item-2 {
                // input默认宽度100
                input {
                    width: px2rem(20);
                }
                h3 {
                    display: inline-block;
                }
            }
            &-item-5 {
                width: 100%;
            }
            &-item-8 {
                &-input {
                    width: px2rem(233.5)!important;
                }
                &-input3 {
                    width: px2rem(193)!important;
                }
            }
            &-item-9-input {
                width: px2rem(240)!important;
            }
            &-item-11{
                display: flex;
                span {
                    width: px2rem(23);
                }
                textarea {
                    width: px2rem(277);
                }
            }
            &-sign-1 {
                margin-top: px2rem(14);
                h3 {
                    display: inline-block;
                    height: px2rem(6);
                    line-height: px2rem(6);
                    margin-left: px2rem(240);
                }
            }
            &-sign-2 {
                margin-bottom: px2rem(14);
                margin-left: px2rem(240);
                h3 {
                    height: px2rem(6);
                    line-height: px2rem(6);
                    display: inline-block;
                }
            }
            &-submit {
                text-align: center;
                button {
                    width: px2rem(50);
                    height: px2rem(8);
                    background-color: #616789;
                    color: #fff;
                    border: none;
                    border-radius: px2rem(1);
                    font-size: px2rem(3.5);
                }
            }
        }
    }
    &-check {
        align-items: center;
        height: px2rem(60);
        background-color: #fff;
        width: px2rem(160);
        margin: px2rem(6) auto;
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
                border: 1px solid #E0E3F8;
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
                background-color: #FC7F89;
            }
        }
    }
}
</style>
