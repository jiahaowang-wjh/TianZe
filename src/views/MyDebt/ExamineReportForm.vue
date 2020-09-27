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
                            <input type="text" v-model='SubmitDataMsg.unitName'>
                        </div>
                        <div class='examine-report-container-form-header'>
                            <span>客户经理：</span>
                            <input type="text" v-model='SubmitDataMsg.accountManager'>
                        </div>
                        <div class='examine-report-container-form-header'>
                            <span>报告完成日期：</span>
                            <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions"  v-model="SubmitDataMsg.reportFinashDate"
                            value-format="yyyy-MM-dd"
                            ></el-date-picker>
                        </div>
                        <div class='examine-report-container-form-item-1'>
                            <h3>一、申请客户名称：</h3>
                            <input type="text" v-model='SubmitDataMsg.accountName'>
                        </div>
                        <h3>二、申请客户基本情况调查</h3>
                        <div class='examine-report-container-form-item-2'>
                            <div>
                                （1）注册资金：<input type="text" class='examine-report-container-form-input200' v-model='SubmitDataMsg.registeredCapital'>元
                            </div>
                            <div>
                                <span>（2）成立时间：</span>
                                <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions"  v-model="SubmitDataMsg.foundTime"
                                value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </div>
                            <div>
                                （3）经营地址：<input type="text" v-model='SubmitDataMsg.managementAddr'  class='examine-report-container-form-input200'>
                            </div>
                            <div>
                                （4）经营范围：从事<input type="text" v-model='SubmitDataMsg.business'>相关业务。取得从事该行业必备的有效的经营资质（经营许可证、建筑资质等）
                                <input type="radio" name="management" value='1' v-model='SubmitDataMsg.management'>是
                                <input type="radio" name="management" value='2' v-model='SubmitDataMsg.management'>否  
                                取得从事该行业必备的有效的经营资质（经营许可证、建筑资质等）
                            </div>
                            <div>（5）法定代表人（实际控制人）简介：</div>
                            <div>
                                法人：<input type="text" v-model='SubmitDataMsg.legalpersonName'>
                                性别：<input type="text" v-model='SubmitDataMsg.legalpersonSex'>
                                年龄：<input type="text" v-model='SubmitDataMsg.legalpersonAge'>
                                学历：<input type="text" v-model='SubmitDataMsg.legalpersonEdu'>
                                婚否：<input type="text" v-model='SubmitDataMsg.legalpersonMirr'>
                                电话：<input type="text" v-model='SubmitDataMsg.legalpersonTel'>
                                公司占股：<input type="text" v-model='SubmitDataMsg.legalpersonStock'>
                            </div>
                            <div>
                                股东：<input type="text" v-model='SubmitDataMsg.stockName'>
                                性别：<input type="text" v-model='SubmitDataMsg.stockSex'>
                                年龄：<input type="text" v-model='SubmitDataMsg.stockAge'>
                                学历：<input type="text" v-model='SubmitDataMsg.stockEdu'>
                                婚否：<input type="text" v-model='SubmitDataMsg.stockMirr'>
                                电话：<input type="text" v-model='SubmitDataMsg.stockTel'>
                                公司占股：<input type="text" v-model='SubmitDataMsg.stockStock'>
                            </div>
                            <div>
                                股东：<input type="text" v-model='SubmitDataMsg.stock1Name'>
                                性别：<input type="text" v-model='SubmitDataMsg.stock1Sex'>
                                年龄：<input type="text" v-model='SubmitDataMsg.stock1Age'>
                                学历：<input type="text" v-model='SubmitDataMsg.stock1Edu'>
                                婚否：<input type="text" v-model='SubmitDataMsg.stock1Mirr'>
                                电话：<input type="text" v-model='SubmitDataMsg.stock1Tel'>
                                公司占股：<input type="text" v-model='SubmitDataMsg.stock1Stock'>
                            </div>
                            <div>（6）债务构成：</div>
                            <div>公司总负债<input type="text" v-model='SubmitDataMsg.companyTotalLiab'>元人民币、总负债率<input type="text" v-model='SubmitDataMsg.totalLiabRate'>%</div>
                            <div>合计银行<input type="text" v-model='SubmitDataMsg.totalBank'>元</div>
                            <div>
                                其中<input type="text" class='examine-report-container-form-input200' v-model='SubmitDataMsg.bank1'>银行
                                <input type="text" v-model='SubmitDataMsg.amount1'>元、
                                <input type="text" class='examine-report-container-form-input200' v-model='SubmitDataMsg.bank2'>
                                银行<input type="text" v-model='SubmitDataMsg.amount2'>元、
                                <input type="text" class='examine-report-container-form-input200' v-model='SubmitDataMsg.bank3'>
                                银行<input type="text" v-model='SubmitDataMsg.amount3'>元；
                            </div>
                            <div>
                                合计民营金融机构<input type="text" v-model='SubmitDataMsg.privateFinance'>元
                            </div>
                            <div>
                                其中小贷公司
                                <input type="text" v-model='SubmitDataMsg.smallCompany'>元、
                                担保公司<input type="text" v-model='SubmitDataMsg.guaranteeCompany'>元、
                                基金公司<input type="text" v-model='SubmitDataMsg.fundCompany'>元；
                            </div>
                            <div>
                                民间借贷合计<input type="text" v-model='SubmitDataMsg.toloanCount'>元人民币：
                                <input type="radio" name="isIllFund" value='1' v-model='SubmitDataMsg.isIllFund'>是
                                <input type="radio" name="isIllFund" value='2' v-model='SubmitDataMsg.isIllFund'>否 
                                涉及非法集资；
                            </div>
                            <div>
                                5万以下<input type="text" v-model='SubmitDataMsg.fiftyThousand'>人、
                                20万以下<input type="text" v-model='SubmitDataMsg.twoHundredThousand'>人、
                                50万以下<input type="text" v-model='SubmitDataMsg.fiveHundredThousand'>人、
                                100万以下<input type="text" v-model='SubmitDataMsg.oneMillion'>人、
                                100万以上<input type="text" v-model='SubmitDataMsg.oneMillionAbove'>人；
                            </div>
                            <div>
                                项目施工欠款<input type="text" v-model='SubmitDataMsg.projectArrears'>元
                            </div>
                            <div>
                                拖欠税款<input type="text" v-model='SubmitDataMsg.defaultTaxes'>元,
                                拖欠工资<input type="text" v-model='SubmitDataMsg.defaultWages'>元,
                                拖欠社保金<input type="text" v-model='SubmitDataMsg.defaultSocialsecurity'>元；
                            </div>
                            <div>
                                应收账款<input type="text" v-model='SubmitDataMsg.receivableAccount'>元,
                                应付帐<input type="text" v-model='SubmitDataMsg.copewith'>元；
                            </div>
                            <div>
                                涉及司法<input type="text" v-model='SubmitDataMsg.involvingJustice'>
                                个、公司股权是否质押
                                <input type="radio" name="stockIspledge" v-model='SubmitDataMsg.stockIspledge' value='1'>是
                                <input type="radio" name="stockIspledge" v-model='SubmitDataMsg.stockIspledge' value='2'>否
                            </div>
                        </div>
                        <h3>三、申请客户经营情况调查</h3>
                        <div class='examine-report-container-form-item-3'>
                            <div>
                                （1）经营模式：
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='1'>批发
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='2'>配套
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='3'>出口
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='4'>贸易型
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='5'>生产型；
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='6'>有
                                <input type="radio" name="managModel" v-model='SubmitDataMsg.managModel' value='7'>无 自有品牌；
                            </div>
                            <div>
                                （2）经营规模：
                                <input type="text" v-model='SubmitDataMsg.managModelYear1'>年
                                <input type="text" v-model='SubmitDataMsg.managModelMoney1'>元、
                                产品毛利<input type="text" v-model='SubmitDataMsg.prodousGrossprofit1'>%
                                纯利<input type="text" v-model='SubmitDataMsg.netprofit1'>
                                <input type="text" v-model='SubmitDataMsg.managModelYear2'>年
                                <input type="text" v-model='SubmitDataMsg.managModelMoney2'>元、
                                产品毛利<input type="text" v-model='SubmitDataMsg.prodousGrossprofit2'>%；
                                纯利<input type="text" v-model='SubmitDataMsg.netprofit2'>
                            </div>
                            <div>（3）主要产品行业：</div>
                            <div>
                                朝阳行业
                                <input type="radio" name="sunriseIndustry" value='1' v-model='SubmitDataMsg.sunriseIndustry'>是
                                <input type="radio" name="sunriseIndustry" value='2' v-model='SubmitDataMsg.sunriseIndustry'>否
                            </div>
                            <div>
                                夕阳行业
                                <input type="radio" name="sunsetIndustry" value='1' v-model='SubmitDataMsg.sunsetIndustry'>是
                                <input type="radio" name="sunsetIndustry" value='2' v-model='SubmitDataMsg.sunsetIndustry'>否
                            </div>
                            <div>
                                新型行业
                                <input type="radio" name="newIndustry" value='1' v-model='SubmitDataMsg.newIndustry'>是
                                <input type="radio" name="newIndustry" value='2' v-model='SubmitDataMsg.newIndustry'>否
                            </div>
                            <div>
                                未来行业
                                <input type="radio" name="futureIndustry" value='1' v-model='SubmitDataMsg.futureIndustry'>是
                                <input type="radio" name="futureIndustry" value='2' v-model='SubmitDataMsg.futureIndustry'>否
                            </div>
                            <div>
                                是否属产能过剩行业：
                                <input type="radio" name="surplusIndustry" value='1' v-model='SubmitDataMsg.surplusIndustry'>是
                                <input type="radio" name="surplusIndustry" value='2' v-model='SubmitDataMsg.surplusIndustry'>否；
                                生产工艺是否属国家政策限制和淘汰类：
                                <input type="radio" name="elimination" value='1' v-model='SubmitDataMsg.elimination'>是
                                <input type="radio" name="elimination" value='2' v-model='SubmitDataMsg.elimination'>否；
                            </div>
                        </div>
                        <h3>四、企业固定资产情况</h3>
                        <div class='examine-report-container-form-item-4'>
                            <div>
                                （1）土地<input type="text" v-model="SubmitDataMsg.land">
                                亩、土地性质<input type="text" v-model="SubmitDataMsg.landNature">
                                出让、划拨、流转、租赁;
                                购买价<input type="text" v-model="SubmitDataMsg.purchasePrice">元/亩、
                                评估价值<input type="text" v-model="SubmitDataMsg.priceAccessValue">元/亩;
                                是否质押
                                <input type="radio" name="priceIspledge" value='1' v-model="SubmitDataMsg.priceIspledge">是
                                <input type="radio" name="priceIspledge" value='2' v-model="SubmitDataMsg.priceIspledge">否、
                                是否进入司法诉讼
                                <input type="radio" name="priceIsjudicial" value='1' v-model="SubmitDataMsg.priceIsjudicial">是
                                <input type="radio" name="priceIsjudicial" value='2' v-model="SubmitDataMsg.priceIsjudicial">否、
                                是否进入查封
                                <input type="radio" name="priceIsseizure" value='1' v-model="SubmitDataMsg.priceIsseizure">是
                                <input type="radio" name="priceIsseizure" value='2' v-model="SubmitDataMsg.priceIsseizure">否；
                            </div>
                            <div>详细地址:<input type="text" class='examine-report-container-form-input450' v-model="SubmitDataMsg.priceAddr"></div>
                            <div>
                                （2）房产<input type="text" v-model="SubmitDataMsg.houseProperty">
                                平方米、房产性质:
                                住宅<input type="radio" name="result9" value='1' v-model="SubmitDataMsg.residence">是<input type="residence" name="result9" value='2' v-model="SubmitDataMsg.residence">否、

                                商业<input type="radio" name="busines" value='1' v-model="SubmitDataMsg.busines">是<input type="radio" name="busines" value='2' v-model="SubmitDataMsg.busines">否、

                                商服<input type="radio" name="businesService" value='1' v-model="SubmitDataMsg.businesService">是<input type="radio" name="businesService" value='2' v-model="SubmitDataMsg.businesService">否；
                            </div>
                            <div>详细地址:<input type="text" class='examine-report-container-form-input450' v-model="SubmitDataMsg.houseAddr"></div>
                            <div>
                                评估价值<input type="text" v-model="SubmitDataMsg.houseAccessValue">元; 
                                是否质押<input type="radio" name="houseIspledge" value='1' v-model="SubmitDataMsg.houseIspledge">是<input type="radio" name="houseIspledge" value='2' v-model="SubmitDataMsg.houseIspledge">否、
                                是否进入司法诉讼
                                <input type="radio" name="houseIsjudicial" value='1' v-model="SubmitDataMsg.houseIsjudicial">是
                                <input type="radio" name="houseIsjudicial" value='2' v-model="SubmitDataMsg.houseIsjudicial">否、
                                是否进入查封<input type="radio" name="houseIsseizure" value='1' v-model="SubmitDataMsg.houseIsseizure">是<input type="radio" name="houseIsseizure" value='2' v-model="SubmitDataMsg.houseIsseizure">否；
                            </div>
                            <div>
                                其中住宅<input type="text" v-model="SubmitDataMsg.residence1">平方米、评估价值<input type="text" v-model="SubmitDataMsg.residenceAccessValue">元; 
                                是否质押<input type="radio" name="residenceIspledge" v-model="SubmitDataMsg.residenceIspledge" value='1'>是<input type="radio" name="residenceIspledge" v-model="SubmitDataMsg.residenceIspledge" value='2'>否、
                                是否进入司法诉讼<input type="radio" name="residenceIsjudicial" value='1' v-model="SubmitDataMsg.residenceIsjudicial">是<input type="radio" name="residenceIsjudicial" value='2' v-model="SubmitDataMsg.residenceIsjudicial">否、
                                是否进入查封<input type="radio" name="residenceIsseizure" value='1' v-model="SubmitDataMsg.residenceIsseizure" >是<input type="radio" name="residenceIsseizure" value='2' v-model="SubmitDataMsg.residenceIsseizure">否；
                            </div>
                            <div>
                                商业<input type="text" v-model="SubmitDataMsg.busines1" >平方米、评估价值<input type="text" v-model="SubmitDataMsg.businesAccessValue" >元; 

                                是否质押<input type="radio" name="businesIspledge" value='1' v-model="SubmitDataMsg.businesIspledge" >是<input type="radio" name="businesIspledge" value='2' v-model="SubmitDataMsg.businesIspledge" >否、

                                是否进入司法诉讼<input type="radio" name="businesIsjudicial" value='1' v-model="SubmitDataMsg.businesIsjudicial" >是<input type="radio" name="businesIsjudicial" value='2' v-model="SubmitDataMsg.businesIsjudicial"  >否、

                                是否进入查封<input type="radio" name="businesIsseizure" value='1' v-model="SubmitDataMsg.businesIsseizure">是<input type="radio" value='2' name="businesIsseizure" v-model="SubmitDataMsg.businesIsseizure">否；
                            </div>
                            <div>
                                厂房<input type="text" v-model="SubmitDataMsg.workshop">平方米、评估价值<input type="text" v-model="SubmitDataMsg.workshopAccessValue">元; 
                                是否质押<input type="radio" name="workshopIspledge" value='1' v-model="SubmitDataMsg.workshopIspledge">是<input type="radio" name="workshopIspledge" value='2' v-model="SubmitDataMsg.workshopIspledge">否、
                                是否进入司法诉讼<input type="radio" name="workshopIsjudicial" value='1' v-model="SubmitDataMsg.workshopIsjudicial">是<input type="radio" name="workshopIsjudicial" value='2' v-model="SubmitDataMsg.workshopIsjudicial">否、
                                是否进入查封<input type="radio" name="workshopIsseizure" value='1' v-model="SubmitDataMsg.workshopIsseizure">是<input type="radio" name="workshopIsseizure" value='2' v-model="SubmitDataMsg.workshopIsseizure">否
                            </div>
                            <div>
                                设备<input type="text"  v-model="SubmitDataMsg.device">台/套、评估价值<input type="text"  v-model="SubmitDataMsg.deviceAccessValue">元; 
                                专业设备<input type="radio" name="majorDevice" value='1' v-model="SubmitDataMsg.majorDevice">是<input type="radio" name="majorDevice" value='2' v-model="SubmitDataMsg.majorDevice">否
                                通用设备<input type="radio" name="commonDevice" value='1' v-model="SubmitDataMsg.commonDevice">是<input type="radio" name="commonDevice" value='2' v-model="SubmitDataMsg.commonDevice">否
                            </div>
                            <div>
                                其它无型资产:专利技术、老字号品牌等无型资产,评估价值<input type="text"  v-model="SubmitDataMsg.oterAccessValue">元; 
                                是否质押<input type="radio" name="oterIspledge" value='1' v-model="SubmitDataMsg.oterIspledge">是<input type="radio" name="oterIspledge" value='2' v-model="SubmitDataMsg.oterIspledge">否
                                是否进入司法诉讼<input type="radio" name="oterIsjudicial" value='1' v-model="SubmitDataMsg.oterIsjudicial">是<input type="radio" name="oterIsjudicial" value='2' v-model="SubmitDataMsg.oterIsjudicial">否
                                是否进入查封<input type="radio" name="oterIsseizure" value='1' v-model="SubmitDataMsg.oterIsseizure">是<input type="radio" name="oterIsseizure" value='2' v-model="SubmitDataMsg.oterIsseizure">否
                            </div>
                        </div>
                        <h3>五、项目(生产)证照</h3>
                        <div class='examine-report-container-form-item-5'>
                            建设用地规划许可证<input type="radio" name="buildUselandLicence" value='1' v-model="SubmitDataMsg.buildUselandLicence">是<input type="radio" name="buildUselandLicence" value='2' v-model="SubmitDataMsg.buildUselandLicence">否
                            建设工程规划许可证<input type="radio" name="buildEnginLicence" value='1' v-model="SubmitDataMsg.buildEnginLicence">是<input type="radio" name="buildEnginLicence" value='2' v-model="SubmitDataMsg.buildEnginLicence">否
                            建设工程施工许可证<input type="radio" name="enginConstrucLicence" value='1' v-model="SubmitDataMsg.enginConstrucLicence">是<input type="radio" name="enginConstrucLicence" value='2' v-model="SubmitDataMsg.enginConstrucLicence">否
                            投资项目备案证<input type="radio" name="investmentProjectRecord" value='1' v-model="SubmitDataMsg.investmentProjectRecord">是<input type="radio" name="investmentProjectRecord" value='2' v-model="SubmitDataMsg.investmentProjectRecord">否
                            项目预售房许可证<input type="radio" name="projectPrehouseLicence" value='1' v-model="SubmitDataMsg.projectPrehouseLicence">是<input type="radio" name="projectPrehouseLicence" value='2' v-model="SubmitDataMsg.projectPrehouseLicence">否
                            项目建设合同<input type="radio" name="projectBuildContract" value='1' v-model="SubmitDataMsg.projectBuildContract">是<input type="radio" name="projectBuildContract" value='2' v-model="SubmitDataMsg.projectBuildContract">否
                            项目建设公司资质<input type="radio" name="projectBuildCompany" value='1' v-model="SubmitDataMsg.projectBuildCompany">是<input type="radio" name="projectBuildCompany" value='2' v-model="SubmitDataMsg.projectBuildCompany">否
                            营业执照是否年检<input type="radio" name="businessLicense" value='1' v-model="SubmitDataMsg.businessLicense">是<input type="radio" name="businessLicense" value='2' v-model="SubmitDataMsg.businessLicense">否
                            税务申报是否正常<input type="radio" name="taxDeclaration" value='1' v-model="SubmitDataMsg.taxDeclaration">是<input type="radio" name="taxDeclaration" value='2' v-model="SubmitDataMsg.taxDeclaration">否
                        </div>
                        <h3>六、企业工商报告</h3>
                        <div class='examine-report-container-form-item-5'>
                            <textarea name="textarea1" v-model='SubmitDataMsg.enterpriseBusReport'></textarea>
                        </div>
                        <h3>七、企业产调证明</h3>
                        <div class='examine-report-container-form-item-6'>
                            <textarea name="textarea1" v-model='SubmitDataMsg.enterpriseProducProve'></textarea>
                        </div>
                        <h3>八、简介项目情况</h3>
                        <div>
                            （1）项目优势（独特性、政策支持予否）：<input type="text" class='examine-report-container-form-item-8-input'  v-model='SubmitDataMsg.projectAdvantage'>
                        </div>
                        <div>
                            （2）项目弱点（困难）存在一定瑕疵说明：<input type="text" class='examine-report-container-form-item-8-input'  v-model='SubmitDataMsg.projectWeakness'>
                        </div>
                        <div class='examine-report-container-form-item-8'>
                            （3）你对项目总体评价：<input type="text" name="projectPopulation" v-model='SubmitDataMsg.projectPopulation'>
                            完全满足本公司要求<input type="radio" name="projectIspopulation" value='1' v-model='SubmitDataMsg.projectIspopulation'>
                            基本满足公司要求<input type="radio" name='projectIspopulation' class='examine-report-container-form-item-8-input3' value='2' v-model='SubmitDataMsg.projectIspopulation'>
                        </div>
                        <h3>九、你对债事人评价</h3>
                            <input type="radio" name="debtorEvaluate" value='1' v-model='SubmitDataMsg.debtorEvaluate'>诚信
                            <input type="radio" name="debtorEvaluate" value='2' v-model='SubmitDataMsg.debtorEvaluate'>精明会经营
                            <input type="radio" name="debtorEvaluate" value='3'>能干懂管理
                            <input type="text" class='examine-report-container-form-item-9-input' value='1' v-model='SubmitDataMsg.debtorEvaluate'>
                        <h3>十、其它补充情况</h3>
                        <textarea name="textarea1" v-model='SubmitDataMsg.otherSupplement'></textarea>
                        <h3>十一、调查结论</h3>
                        <div class='examine-report-container-form-item-11'>
                            <span>你的建议方案：</span>
                            <textarea v-model='SubmitDataMsg.investigationConclusion'></textarea>
                        </div>
                        <h3>十二、调查报告的真实性调查人保证</h3>
                        <div>保证调查报告内容的真实、准确、完整，不存在虚假记载、误导性陈述或重大遗漏，并承担连带法律责任。</div>
                        <div class='examine-report-container-form-sign-1'>
                            <h3>调查人：由网点盖章确认</h3>
                        </div>
                        <div class='examine-report-container-form-sign-2'>
                            <el-date-picker
                            align="left"
                            type="date"
                            placeholder="请选择日期"
                            :picker-options="pickerOptions"
                            v-model="SubmitDataMsg.investigationDate"
                            value-format="yyyy-MM-dd"
                            ></el-date-picker>
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
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() > Date.now()
                },
                shortcuts: [
                {
                    text: '今天',
                    onClick(picker) {
                    picker.$emit('pick', new Date())
                    },
                },
                {
                    text: '昨天',
                    onClick(picker) {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24)
                    picker.$emit('pick', date)
                    },
                },
                {
                    text: '一周前',
                    onClick(picker) {
                    const date = new Date()
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                    picker.$emit('pick', date)
                    },
                },
                ],
            },
            // 调查报告提交数据源
            SubmitDataMsg: {
                // 解债ID
                debtId: '',
                // 申请单位名称
                unitName: '',
                // 客户经理
                accountManager: '',
                // 报告完成日期
                reportFinashDate: '',
                // 申请客户名称
                accountName: '',
                // 注册资金
                registeredCapital: '',
                // 成立时间
                foundTime: '',
                // 经营地址
                managementAddr: '',
                // 经营
                management: '',
                // 业务
                business: '',
                // 法人名称
                legalpersonName: '',
                // 法人性别
                legalpersonSex: '',
                // 法人学历
                legalpersonEdu: '',
                // 法人婚否
                legalpersonMirr: '',
                // 法人电话
                legalpersonTel: '',
                // 法人公司占股
                legalpersonStock: '',
                // 股东名称
                stockName: '',
                // 股东性别
                stockSex: '',
                // 股东年龄
                stockAge: '',
                // 股东学历
                stockEdu: '',
                // 股东婚否
                stockMirr: '',
                // 股东电话
                stockTel: '',
                // 股东公司占股
                stockStock: '',
                // 股东名称1
                stock1Name: '',
                // 股东性别1
                stock1Sex: '',
                // 股东年龄1
                stock1Age: '',
                // 股东学历1
                stock1Edu: '',
                // 股东婚否1
                stock1Mirr: '',
                // 股东电话1
                stock1Tel: '',
                // 股东公司占股1
                stock1Stock: '',
                // 公司总负债
                companyTotalLiab: '',
                // 总负债率
                totalLiabRate: '',
                // 合计银行
                totalBank: '',
                // 银行1
                bank1: '',
                // 金额1
                amount1: '',
                // 银行2
                bank2: '',
                // 金额2
                amount2: '',
                // 银行3
                bank3: '',
                // 金额3
                amount3: '',
                // 民营金融机构
                privateFinance: '',
                // 小贷公司
                smallCompany: '',
                // 担保公司
                guaranteeCompany: '',
                // 基金公司
                fundCompany: '',
                // 借贷合计
                toloanCount: '',
                // 是否涉及非法集资
                isIllFund: '',
                // 5万
                fiftyThousand: '',
                // 20万
                twoHundredThousand: '',
                // 50万
                fiveHundredThousand: '',
                // 100万
                oneMillion: '',
                // 100万+
                oneMillionAbove: '',
                // 项目施工欠款
                projectArrears: '',
                // 拖欠税款
                defaultTaxes: '',
                // 拖欠工资
                defaultWages: '',
                // 拖欠社保金
                defaultSocialsecurity: '',
                // 应收帐款
                receivableAccount: '',
                // 应付
                copewith: '',
                // 涉及司法
                involvingJustice: '',
                // 股权是否质押
                stockIspledge: '',
                // 经营模式
                managModel: '',
                // 经营规模年1
                managModelYear1: '',
                // 经营规模元1
                managModelMoney1: '',
                // 产品毛利1
                prodousGrossprofit1: '',
                // 纯利1
                netprofit1: '',
                // 经营规模年2
                managModelYear2: '',
                // 经营规模元2
                managModelMoney2: '',
                // 产品毛利2
                prodousGrossprofit2: '',
                // 纯利2
                netprofit2: '',
                // 朝阳行业
                sunriseIndustry: '',
                // 夕阳行业
                sunsetIndustry: '',
                // 新型行业
                newIndustry: '',
                // 未来行业
                futureIndustry: '',
                // 过剩行业
                surplusIndustry: '',
                // 淘汰类
                elimination: '',
                // 土地
                land: '',
                // 土地性质
                landNature: '',
                // 购买价
                purchasePrice: '',
                // 土地-评估价值
                priceAccessValue: '',
                // 土地-是否质押
                priceIspledge: '',
                // 土地-是否司法诉讼
                priceIsjudicial: '',
                // 土地-是否查封
                priceIsseizure: '',
                // 土地-详细地址
                priceAddr: '',
                // 房产
                houseProperty: '',
                // 住宅
                residence: '',
                // 商业
                busines: '',
                // 商服
                businesService: '',
                // 房产详细地址
                houseAddr: '',
                // 房产-评估价值
                houseAccessValue: '',
                // 房产-是否质押
                houseIspledge: '',
                // 房产-是否司法诉讼
                houseIsjudicial: '',
                // 房产-是否查封
                houseIsseizure: '',
                // 住宅1
                residence1: '',
                // 住宅-评估价值
                residenceAccessValue: '',
                // 住宅-是否质押
                residenceIspledge: '',
                // 住宅-是否司法诉讼
                residenceIsjudicial: '',
                // 住宅-是否查封
                residenceIsseizure: '',
                // 商业1
                busines1: '',
                // 商业-评估价值
                businesAccessValue: '',
                // 商业-是否质押
                businesIspledge: '',
                // 商业-是否司法诉讼
                businesIsjudicial: '',
                // 商业-是否查封
                businesIsseizure: '',
                // 厂房
                workshop: '',
                // 厂房-评估价值
                workshopAccessValue: '',
                // 厂房-是否质押
                workshopIspledge: '',
                // 厂房-是否司法诉讼
                workshopIsjudicial: '',
                // 厂房-是否查封
                workshopIsseizure: '',
                // 设备
                device: '',
                // 设备-评估价值
                deviceAccessValue: '',
                // 专业设备
                majorDevice: '',
                // 通用设备
                commonDevice: '',
                // 其它-评估价值
                oterAccessValue: '',
                // 其它-是否质押
                oterIspledge: '',
                // 其它-是否司法诉讼
                oterIsjudicial: '',
                // 其它-是否查封
                oterIsseizure: '',
                // 建设用地规划许可证
                buildUselandLicence: '',
                // 建设工程规划许可证
                buildEnginLicence: '',
                // 建设工程施工许可证
                enginConstrucLicence: '',
                // 投资项目备案证
                investmentProjectRecord: '',
                // 项目预售房许可证
                projectPrehouseLicence: '',
                // 项目建设合同
                projectBuildContract: '',
                // 项目建设公司资质
                projectBuildCompany: '',
                // 营业执照
                businessLicense: '',
                // 税务申报
                taxDeclaration: '',
                // 企业工商报告
                enterpriseBusReport: '',
                // 企业产调证明
                enterpriseProducProve: '',
                // 项目优势
                projectAdvantage: '',
                // 项目弱点
                projectWeakness: '',
                // 项目总体评价
                projectPopulation: '',
                // 债事人评价
                debtorEvaluate: '',
                // 其它补充情况
                otherSupplement: '',
                // 调查结论
                investigationConclusion: '',
                // 调查人
                investigationPerson: '',
                // 日期
                investigationDate: '',
                // 项目总体评价完全满足/基本满足
                projectIspopulation: '',
                // 法人年龄
                legalpersonAge: ''
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
            this.SubmitDataMsg.debtId = this.$route.query.debtId
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
                    this.$router.push({path: '/MyDebt'})
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
                width: 1200px;
                border: 1px solid #E8EAEC;
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
                width: 900px!important;
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
