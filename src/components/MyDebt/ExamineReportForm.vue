<!--  -->
<template>
  <div class='examine-report'>
        <div class='examine-report-title'>
            <span class='examine-report-title-go1'>我的债行</span>
            <span class='examine-report-title-separator'> / </span>
            <span class='examine-report-title-go2'>调查报告</span>
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
                        <div class='examine-report-container-form-submit'><button @click='SubmitData'>提交</button></div>
                    </el-collapse-item>
                </el-collapse>
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
            SubmitDataMsg: {
                // 解债ID
                debtId: '7991157936871374848',
                // 申请单位名称
                unitName: '重庆术才有限公司',
                // 客户经理
                accountManager: '王三',
                // 报告完成日期
                reportFinashDate: '2020-01-02',
                // 申请客户名称
                accountName: '王琪琪',
                // 注册资金
                registeredCapital: '400000',
                // 成立时间
                foundTime: '2019-10-11',
                // 经营地址
                managementAddr: '重庆市巴南区',
                // 经营
                management: '互联网',
                // 业务
                business: '1',
                // 法人名称
                legalpersonName: '王尔尔',
                // 法人性别
                legalpersonSex: '2',
                // 法人学历
                legalpersonEdu: '本科',
                // 法人婚否
                legalpersonMirr: '1',
                // 法人电话
                legalpersonTel: '15087761234',
                // 法人公司占股
                legalpersonStock: '20%',
                // 股东名称
                stockName: '王一思',
                // 股东性别
                stockSex: '1',
                // 股东年龄
                stockAge: '43',
                // 股东学历
                stockEdu: '研究生',
                // 股东婚否
                stockMirr: '1',
                // 股东电话
                stockTel: '15012340987',
                // 股东公司占股
                stockStock: '30%',
                // 股东名称1
                stock1Name: '万千万',
                // 股东性别1
                stock1Sex: '1',
                // 股东年龄1
                stock1Age: '65',
                // 股东学历1
                stock1Edu: '本科',
                // 股东婚否1
                stock1Mirr: '1',
                // 股东电话1
                stock1Tel: '15012344321',
                // 股东公司占股1
                stock1Stock: '20%',
                // 公司总负债
                companyTotalLiab: '4000000',
                // 总负债率
                totalLiabRate: '12%',
                // 合计银行
                totalBank: '90000',
                // 银行1
                bank1: '招商银行',
                // 金额1
                amount1: '20000',
                // 银行2
                bank2: '工商银行',
                // 金额2
                amount2: '30000',
                // 银行3
                bank3: '中国银行',
                // 金额3
                amount3: '40000',
                // 民营金融机构
                privateFinance: '0.15',
                // 小贷公司
                smallCompany: '0.14',
                // 担保公司
                guaranteeCompany: '0.13',
                // 基金公司
                fundCompany: '0.12',
                // 借贷合计
                toloanCount: '300000',
                // 是否涉及非法集资
                isIllFund: '2',
                // 5万
                fiftyThousand: '50',
                // 20万
                twoHundredThousand: '40',
                // 50万
                fiveHundredThousand: '30',
                // 100万
                oneMillion: '20',
                // 100万+
                oneMillionAbove: '10',
                // 项目施工欠款
                projectArrears: '90000',
                // 拖欠税款
                defaultTaxes: '80000',
                // 拖欠工资
                defaultWages: '70000',
                // 拖欠社保金
                defaultSocialsecurity: '60000',
                // 应收帐款
                receivableAccount: '50000',
                // 应付
                copewith: '40000',
                // 涉及司法
                involvingJustice: '2',
                // 股权是否质押
                stockIspledge: '2',
                // 经营模式
                managModel: '1',
                // 经营规模年1
                managModelYear1: '1',
                // 经营规模元1
                managModelMoney1: '10000',
                // 产品毛利1
                prodousGrossprofit1: '40000',
                // 纯利1
                netprofit1: '1',
                // 经营规模年2
                managModelYear2: '1',
                // 经营规模元2
                managModelMoney2: '120000',
                // 产品毛利2
                prodousGrossprofit2: '320000',
                // 纯利2
                netprofit2: '20000',
                // 朝阳行业
                sunriseIndustry: '1',
                // 夕阳行业
                sunsetIndustry: '1',
                // 新型行业
                newIndustry: '1',
                // 未来行业
                futureIndustry: '1',
                // 过剩行业
                surplusIndustry: '1',
                // 淘汰类
                elimination: '1',
                // 土地
                land: '1',
                // 土地性质
                landNature: '国有土地',
                // 购买价
                purchasePrice: '2100000',
                // 土地-评估价值
                priceAccessValue: '1000000',
                // 土地-是否质押
                priceIspledge: '1',
                // 土地-是否司法诉讼
                priceIsjudicial: '1',
                // 土地-是否查封
                priceIsseizure: '1',
                // 土地-详细地址
                priceAddr: '重庆江北',
                // 房产
                houseProperty: '1',
                // 住宅
                residence: '互联网产业园二期8栋',
                // 商业
                busines: '1',
                // 商服
                businesService: '1',
                // 房产详细地址
                houseAddr: '重庆',
                // 房产-评估价值
                houseAccessValue: '300000',
                // 房产-是否质押
                houseIspledge: '2',
                // 房产-是否司法诉讼
                houseIsjudicial: '2',
                // 房产-是否查封
                houseIsseizure: '2',
                // 住宅1
                residence1: '1',
                // 住宅-评估价值
                residenceAccessValue: '200000',
                // 住宅-是否质押
                residenceIspledge: '1',
                // 住宅-是否司法诉讼
                residenceIsjudicial: '1',
                // 住宅-是否查封
                residenceIsseizure: '2',
                // 商业1
                busines1: '1',
                // 商业-评估价值
                businesAccessValue: '100000',
                // 商业-是否质押
                businesIspledge: '1',
                // 商业-是否司法诉讼
                businesIsjudicial: '1',
                // 商业-是否查封
                businesIsseizure: '1',
                // 厂房
                workshop: '1',
                // 厂房-评估价值
                workshopAccessValue: '100000',
                // 厂房-是否质押
                workshopIspledge: '1',
                // 厂房-是否司法诉讼
                workshopIsjudicial: '1',
                // 厂房-是否查封
                workshopIsseizure: '1',
                // 设备
                device: '1',
                // 设备-评估价值
                deviceAccessValue: '10000',
                // 专业设备
                majorDevice: '1',
                // 通用设备
                commonDevice: '1',
                // 其它-评估价值
                oterAccessValue: '100',
                // 其它-是否质押
                oterIspledge: '1',
                // 其它-是否司法诉讼
                oterIsjudicial: '1',
                // 其它-是否查封
                oterIsseizure: '1',
                // 建设用地规划许可证
                buildUselandLicence: '1',
                // 建设工程规划许可证
                buildEnginLicence: '1',
                // 建设工程施工许可证
                enginConstrucLicence: '1',
                // 投资项目备案证
                investmentProjectRecord: '1',
                // 项目预售房许可证
                projectPrehouseLicence: '1',
                // 项目建设合同
                projectBuildContract: '1',
                // 项目建设公司资质
                projectBuildCompany: '1',
                // 营业执照
                businessLicense: '1',
                // 税务申报
                taxDeclaration: '1',
                // 企业工商报告
                enterpriseBusReport: '有',
                // 企业产调证明
                enterpriseProducProve: '正面',
                // 项目优势
                projectAdvantage: '无',
                // 项目弱点
                projectWeakness: '无',
                // 项目总体评价
                projectPopulation: '项目总体评价',
                // 债事人评价
                debtorEvaluate: '债事人评价',
                // 其它补充情况
                otherSupplement: '其它补充情况',
                // 调查结论
                investigationConclusion: '调查结论',
                // 调查人
                investigationPerson: '王九二',
                // 日期
                investigationDate: '2019-10-10',
                // 项目总体评价完全满足/基本满足
                projectIspopulation: '1',
                // 法人年龄
                legalpersonAge: '52'
            }
        }
    },
    methods: {
        handleCurrentChange (e) {
        },
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        HandleSelect (item) {
            this.SelectOption.forEach(v => {
                v.isSelect = false
            })
            item.isSelect = true
        },
        async SubmitData () {
            const formData = new FormData()
            for (const key in this.SubmitDataMsg) {
                formData.append(key, this.SubmitDataMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busInvestigateReportController/insert',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode === '200') {
                const StatusUpdateformData = new FormData()
                StatusUpdateformData.append('debtId', this.SubmitDataMsg.debtId)
                StatusUpdateformData.append('status', '0')
                const { data: StatusUpdateResult } = await this.$http({
                    method: 'post',
                    url: '/api/api/pubDebtController/updateStatus',
                    data: StatusUpdateformData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (StatusUpdateResult.resultCode === '200') {
                    this.$emit('onChangeFragment', 'MyDebt')
                    return this.$message.success('新增调查报告信息成功')
                } else {
                    return this.$message.error('新增调查报告信息失败')
                }
            }
        }
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
}
</style>
