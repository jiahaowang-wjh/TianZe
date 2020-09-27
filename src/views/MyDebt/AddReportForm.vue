<!--  -->
<template>
  <div class="add-report">
    <div class="add-report-title">
      <span class="add-report-title-go1">我的债行</span>
      <span class="add-report-title-separator">/</span>
      <span class="add-report-title-go2">{{currentPath === 'add' ? '新增录入' : '录入编辑'}}</span>
    </div>
    <div class="add-report-container">
      <div class="add-report-container-form">
        <el-collapse :value="collapseActive">
          <!-- 债务人基本信息登记表 -->
          <el-collapse-item title="债事人基本信息登记表"
                            name="1">
            <el-form label-width=""
                     :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm">
              <el-row>
                <el-col :span="8">
                  <span class="col-label">债事人是否配合：</span>
                  <el-form-item label>
                    <el-select v-model="ReportIscoordinate"
                               placeholder="是">
                      <el-option label="是"
                                 value="1"></el-option>
                      <el-option label="否"
                                 value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">类型：</span>
                  <el-form-item label>
                    <el-select v-model="reportType"
                               placeholder="债务人">
                      <el-option label="债权人"
                                 value="1"></el-option>
                      <el-option label="债务人"
                                 value="2"></el-option>
                      <el-option label="债权债务人"
                                 value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">性质：</span>
                  <el-form-item label>
                    <el-select v-model="ReporterProperties"
                               placeholder="个人">
                      <el-option label="个人"
                                 value="person"></el-option>
                      <el-option label="企业"
                                 value="business"></el-option>
                      <el-option label="银行"
                                 value="bank"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 个人 -->
              <template v-if="ReporterProperties === 'person'">
                <h3>个人:</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">是否从业：</span>
                    <el-form-item label>
                      <el-select v-model="PersonalReportMsg.ifWork"
                                 placeholder="是">
                        <el-option label="是"
                                   value="1"></el-option>
                        <el-option label="否"
                                   value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">姓名：</span>
                    <el-form-item label=""
                                  prop="name">
                      <el-input v-model="PersonalReportMsg.personalName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">手机号码：</span>
                    <el-form-item label>
                      <el-input v-model="PersonalReportMsg.phone" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">身份证号码：</span>
                    <el-form-item label=""
                                  prop='idCard'>
                      <el-input v-model="PersonalReportMsg.idCard"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">性别：</span>
                    <el-form-item label>
                      <el-select v-model="PersonalReportMsg.sex"
                                 placeholder="男">
                        <el-option label="男"
                                   value="1"></el-option>
                        <el-option label="女"
                                   value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">所在地区：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.area"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">电子邮箱：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">资产总价值（元）：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.assets"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">资产项数：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.assetsNumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">可流通资产价值(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.circulationAssets"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>上传身份证</h3>
                <el-row class="add-report-container-upload-idcard">
                  <el-col :span="24">
                    <img :src="PersonalReportMsg.cardJust ? PersonalReportMsg.cardJust: IDCardDefaultSrc.JustSrc"
                         @click="openImgToLink(PersonalReportMsg.cardJust)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportJustIDCard"
                             ref="PersonReportJustIdCard"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>

                    <img :src="PersonalReportMsg.cardBack ? PersonalReportMsg.cardBack: IDCardDefaultSrc.BackSrc"
                         @click="openImgToLink(PersonalReportMsg.cardBack)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportBackIDCard"
                             ref="PersonReportBackIdCard"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债权(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.obligatRight"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.obligatRightNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="PersonalReportMsg.obligatTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">本金：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.capital"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利息：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.interest"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利率：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.interestRate"></el-input>
                    </el-form-item>
                    <span>%</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债务(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.debt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债务笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.debtNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="PersonalReportMsg.debtTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债事凭证：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalReportMsg.debtCertificate"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-update-imgs">
                  <el-col :span="24">
                    <span class="col-label">上传债事凭证：</span>
                    <div class="add-report-container-update-imgs-list">
                      <img v-for="(item,index) in PersonalReportMsg.uploadDebtCertificate"
                           :key="index"
                           @click="openImgToLink(item)"
                           :src="item"
                           alt />
                    </div>
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportVoucher"
                             ref="PersonReportVoucher"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">是否诉讼及结果：</span>
                    <el-form-item label="">
                      <textarea v-model="PersonalReportMsg.isResult"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">目前经济情况：</span>
                    <el-form-item label="">
                      <textarea v-model="PersonalReportMsg.economics"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <el-row class="add-report-container-form-person-lawsuit">
                  <el-col :span="8">
                    <span class="col-label">项目负责人：</span>
                    <el-form-item label>
                      <el-input v-model="PersonalReportMsg.prjectManager" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 v-if="currentPath === 'add'">实名认证：</h3>
                <el-row v-if="currentPath === 'add'">
                  <el-col :span="8">
                    <span class="col-label">姓名：</span>
                    <el-form-item label="">
                      <el-input v-model="Certification[0].userName"
                                :disabled="this.IsReportPhoneCertification.Person"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">身份证号码：</span>
                    <el-form-item label="">
                      <el-input v-model="Certification[0].identifyNum"
                                :disabled="this.IsReportPhoneCertification.Person"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">选择银行：</span>
                    <el-form-item label="">
                      <el-select v-model="Certification[0].bank"
                                 filterable
                                 :disabled="this.IsReportPhoneCertification.Person">
                        <el-option :label="item.text"
                                   :value="item.text"
                                   v-for="(item,index) in BankList"
                                   :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-form-person-item-11"
                        v-if="currentPath === 'add'">
                  <el-col :span="8">
                    <span class="col-label">银行卡号：</span>
                    <el-form-item label="">
                      <el-input v-model="Certification[0].bankCard"
                                :disabled="this.IsReportPhoneCertification.Person"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">银行预留手机：</span>
                    <el-form-item label="">
                      <el-input v-model="Certification[0].mobilePhone"
                                :disabled="this.IsReportPhoneCertification.Person"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">手机验证码：</span>
                    <el-form-item label="">
                      <el-input v-model="NoteCode[0].PersonReportNodeCode"
                                :disabled="!this.IsReportPhoneCertification.Person"></el-input>
                    </el-form-item>
                    <button @click="PhoneCheck">点击获取</button>
                  </el-col>
                </el-row>
              </template>
              <!-- 企业  -->
              <template v-else-if="ReporterProperties === 'business'">
                <h3>企业:</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">企业名称：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessReportMsg.companyName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">社会统一信用代码：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessReportMsg.creditCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">行业属性：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessReportMsg.industryAttributes" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">法定代表人名称：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessReportMsg.legalName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人联系电话：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessReportMsg.legalPhone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人身份证号：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessReportMsg.legalIdCard"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">注册地址：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.address" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">企业联系人：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.contactPerson" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.contactPhone" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>上传身份证</h3>
                <el-row class="add-report-container-upload-idcard">
                  <el-col :span="24">
                    <img :src="BusinessReportMsg.cardJust ? BusinessReportMsg.cardJust: IDCardDefaultSrc.JustSrc"
                         @click="openImgToLink(BusinessReportMsg.cardJust)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportJustIDCard"
                             ref="BusinessReportJustIdCard"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                    <img :src="BusinessReportMsg.cardBack ? BusinessReportMsg.cardBack: IDCardDefaultSrc.BackSrc"
                         @click="openImgToLink(BusinessReportMsg.cardBack)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportBackIDCard"
                             ref="BusinessReportBackIdCard"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债权(元)：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.obligatRight" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.obligatRightNo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label>
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BusinessReportMsg.obligatTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">本金：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.capital" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利息：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.interest" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利率：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.interestRate" />
                      <span>%</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债务(元)：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.debt" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.debtNo" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label>
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BusinessReportMsg.debtTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债事凭证：</span>
                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.debtCertificate" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-update-imgs">
                  <el-col :span="24">
                    <span class="col-label">上传债事凭证：</span>
                    <div class="add-report-container-update-imgs-list">
                      <img v-for="(item,index) in BusinessReportMsg.uploadDebtCertificate"
                           @click="openImgToLink(item)"
                           :key="index"
                           :src="item"
                           alt />
                    </div>
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportVoucher"
                             ref="BusinessReportVoucher"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">是否诉讼及结果：</span>

                    <el-form-item label="">
                      <textarea v-model="BusinessReportMsg.isResult"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <el-row class="add-report-container-form-business-lawsuit">
                  <el-col :span="8">
                    <span class="col-label">项目负责人：</span>

                    <el-form-item label>
                      <el-input v-model="BusinessReportMsg.prjectManager" />

                    </el-form-item>
                  </el-col>
                </el-row>
                <h3 v-if="currentPath === 'add'">实名认证：</h3>
                <el-row v-if="currentPath === 'add'">
                  <el-col :span="8">
                    <span class="col-label">姓名：</span>

                    <el-form-item label>
                      <el-input v-model="Certification[1].userName"
                                :disabled="IsReportPhoneCertification.Business" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">身份证号码：</span>

                    <el-form-item label>
                      <el-input v-model="Certification[1].identifyNum"
                                :disabled="IsReportPhoneCertification.Business" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">选择银行：</span>

                    <el-form-item label>
                      <el-select v-model="Certification[1].bank"
                                 filterable
                                 :disabled="IsReportPhoneCertification.Business">
                        <el-option :label="item.text"
                                   :value="item.text"
                                   v-for="(item,index) in BankList"
                                   :key="index"></el-option>

                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-form-business-item-11"
                        v-if="currentPath === 'add'">
                  <el-col :span="8">
                    <span class="col-label">银行卡号：</span>

                    <el-form-item label>
                      <el-input el-input
                                v-model="Certification[1].bankCard"
                                :disabled="IsReportPhoneCertification.Business" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">银行预留手机：</span>

                    <el-form-item label>
                      <el-input v-model="Certification[1].mobilePhone"
                                :disabled="IsReportPhoneCertification.Business" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">手机验证码：</span>

                    <el-form-item label>
                      <el-input v-model="NoteCode[0].BusinessReportNodeCode"
                                :disabled="!IsReportPhoneCertification.Business" />

                    </el-form-item>
                    <button @click="PhoneCheck">点击获取</button>
                  </el-col>
                </el-row>
              </template>
              <!-- 银行 -->
              <template v-else>
                <h3>银行:</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">企业名称：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.companyName" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">社会统一信用代码：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.creditCode" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">行业属性：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.industryAttributes" />
                    </el-form-item>

                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">法定代表人名称：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.legalName" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人联系电话：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.legalPhone" />

                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人身份证号：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.legalIdCard" />

                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">注册地址：</span>

                    <el-form-item label>
                      <el-input v-model="BankReportMsg.address" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">企业联系人：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.contactPerson" />
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.contactPhone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债权(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.obligatRight"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.obligatRightNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BankReportMsg.obligatTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">本金：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.capital"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利息：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.interest"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利率：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.interestRate"></el-input>
                    </el-form-item>
                    <span>%</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债务(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.debt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债务笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.debtNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BankReportMsg.debtTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债事凭证：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.debtCertificate"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-update-imgs">
                  <el-col :span="24">
                    <span class="col-label">上传债事凭证：</span>
                    <div class="add-report-container-update-imgs-list">
                      <img v-for="(item,index) in BankReportMsg.uploadDebtCertificate"
                           :key="index"
                           :src="item"
                           @click="openImgToLink(item)"
                           alt />
                    </div>
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateReportVoucher"
                             ref="BankReportVoucher"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">是否诉讼及结果：</span>
                    <el-form-item label="">
                      <textarea v-model='BankReportMsg.isResult'></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">项目负责人：</span>
                    <el-form-item label="">
                      <el-input v-model="BankReportMsg.prjectManager"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
            </el-form>
            <div class="add-report-container-form-person-button">
              <button @click.prevent="SendReporterData">确认</button>
            </div>
          </el-collapse-item>
          <!-- 相对人基本信息表 -->
          <el-collapse-item title="相对人基本信息表"
                            name="2"
                            v-show="ResponseReportId || (currentPath === 'edit')">
            <!-- 新增页面相对人表单 -->
            <div class="add-report-container-relative-add-button">
              <button @click='ClearRelativeForm'>新增相对人</button>
              <button style="margin-letf:20px"
                      v-if="RelativeList.length"
                      @click="SubmitDataToHeadCompany">提交至总公司</button>
            </div>
              <template v-if="currentPath === 'add'">
                <div class="add-report-container-relative-list-title">
                  <span>序号</span>
                  <span>相对人</span>
                  <span>债事类型</span>
                  <span>债事性质</span>
                  <span>联系电话</span>
                  <span>操作</span>
                </div>
                <div class="add-report-container-relative-list">
                  <div class="add-report-container-relative-list-item"
                       v-for="(item,index) in RelativeList"
                       :key="item.id">
                    <span>{{index+1}}</span>
                    <span>{{item.personalName ? item.personalName : item.companyName}}</span>
                    <span>{{(item.reportType === '1')? ('债权人'): (item.reportType === '2')?('债务人'): ''}}</span>
                    <span>{{(item.reportPropert === '1')? ('个人'): (item.reportPropert === '2')?('企业'):('银行')}}</span>
                    <span>{{item.phone?item.phone : item.contactPhone}}</span>
                    <span>
                      <button @click="RelativeEdit(item)">编辑</button>
                      <button>删除</button>
                    </span>
                  </div>
                </div>
              </template>
              <!-- 编辑页面相对人表单 -->
              <template v-else>
                <div class="add-report-container-relative">
                  <div class="add-report-container-relative-list-title">
                    <span>序号</span>
                    <span>相对人</span>
                    <span>债事类型</span>
                    <span>债事性质</span>
                    <span>联系电话</span>
                    <span>操作</span>
                  </div>
                  <div class="add-report-container-relative-list">
                    <div class="add-report-container-relative-list-item"
                         v-for="(item,index) in RelativeList"
                         :key="item.id">
                      <span>{{index+1}}</span>
                      <span>{{item.personalName ? item.personalName : item.companyName}}</span>
                      <span>{{(item.reportType === '1')? '债权人': '债务人' }}</span>
                      <span>{{(item.reportPropert === '1')? ('个人'): (item.reportPropert === '2')?('企业'):('银行')}}</span>
                      <span>{{item.phone ? item.phone: item.contactPhone}}</span>
                      <span>
                        <button @click="EditRelativeDetailMsg(index)">编辑该相对人信息</button>
                      </span>
                    </div>
                  </div>
                </div>
              </template>
            <h3>相对人信息登记表</h3>
            <!-- 第一行表单 -->
            <el-form ref="form"
                     label-width>
              <el-row>
                <el-col :span="8">
                  <span class="col-label">债事人是否配合：</span>
                  <el-form-item label>
                    <el-select v-model="RelativeIscoordinate"
                               placeholder="是">
                      <el-option label="是"
                                 value="1"></el-option>
                      <el-option label="否"
                                 value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">类型：</span>
                  <el-form-item label>
                    <el-select v-model="RelativeType"
                               placeholder="债务人">
                      <el-option label="债权人"
                                 value="1"></el-option>
                      <el-option label="债务人"
                                 value="2"></el-option>
                      <el-option label="债权债务人"
                                 value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">性质：</span>
                  <el-form-item label>
                    <el-select v-model="RelativeProperties"
                               placeholder="个人">
                      <el-option label="个人"
                                 value="person"></el-option>
                      <el-option label="企业"
                                 value="business"></el-option>
                      <el-option label="银行"
                                 value="bank"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 个人 -->
              <template v-if="RelativeProperties === 'person'">
                <h3>个人:</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">是否从业：</span>
                    <el-form-item label >
                      <el-select v-model="PersonalRelativeMsg.ifWork"
                                 placeholder="是">
                        <el-option label="是"
                                   value="1"></el-option>
                        <el-option label="否"
                                   value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">姓名：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.personalName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">手机号码：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.phone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">身份证号码：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.idCard"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">性别： </span>
                    <el-form-item label="">
                      <el-select v-model="PersonalRelativeMsg.sex"
                                 placeholder="男">
                        <el-option label="男"
                                   value="1"></el-option>
                        <el-option label="女"
                                   value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">所在地区：</span>
                    <el-form-item label="">
                      ` <el-input v-model="PersonalRelativeMsg.area"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">电子邮箱：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">资产总价值（元）：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.assets"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">资产项数：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.assetsNumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">可流通资产价值(元)：</span>
                    <el-form-item label>
                      <el-input v-model="PersonalRelativeMsg.circulationAssets" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>上传身份证</h3>
                <el-row class="add-report-container-upload-idcard">
                  <el-col :span="24">
                    <img :src="PersonalRelativeMsg.cardJust ? PersonalRelativeMsg.cardJust: IDCardDefaultSrc.JustSrc"
                         @click="openImgToLink(PersonalRelativeMsg.cardJust)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeJustIDCard"
                             ref="PersonRelativeJustIdCard"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                    <img :src="PersonalRelativeMsg.cardBack ? PersonalRelativeMsg.cardBack: IDCardDefaultSrc.BackSrc"
                         @click="openImgToLink(PersonalRelativeMsg.cardBack)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeBackIDCard"
                             ref="PersonRelativeBackIdCard"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债权(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.obligatRight"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.obligatRightNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="PersonalRelativeMsg.obligatTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">本金：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.capital"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利息：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.interest"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利率：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.interestRate"></el-input>
                    </el-form-item>
                    <span>%</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债务(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.debt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债务笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.debtNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="PersonalRelativeMsg.debtTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债事凭证：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.debtCertificate"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-update-imgs">
                  <el-col :span="24">
                    <span class="col-label">上传债事凭证：</span>
                    <div class="add-report-container-update-imgs-list">
                      <img v-for="(item,index) in PersonalRelativeMsg.uploadDebtCertificate"
                           :key="index"
                           @click="openImgToLink(item)"
                           :src="item"
                           alt />
                    </div>
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeVoucher"
                             ref="PersonRelativeVoucher"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">资金使用用途：</span>
                    <el-form-item label="">
                      <textarea v-model="PersonalRelativeMsg.usage"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">目前经济情况：</span>
                    <el-form-item label="">
                      <textarea v-model="PersonalRelativeMsg.economics"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">项目负责人：</span>
                    <el-form-item label="">
                      <el-input v-model="PersonalRelativeMsg.prjectManager"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
              <!-- 企业 -->
              <template v-else-if="RelativeProperties === 'business'">
                <h3>企业:</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">企业名称：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.companyName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">社会统一信用代码：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.creditCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">行业属性：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.industryAttributes" />
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">法定代表人名称：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.legalName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人联系电话：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.legalPhone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人身份证号：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.legalIdCard"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">注册地址：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.address"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">企业联系人：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.contactPerson" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.contactPhone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>上传身份证</h3>
                <el-row class="add-report-container-upload-idcard">
                  <el-col :span="24">
                    <img :src="BusinessRelativeMsg.cardJust ? BusinessRelativeMsg.cardJust: IDCardDefaultSrc.JustSrc"
                         @click="openImgToLink(BusinessRelativeMsg.cardJust)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeJustIDCard"
                             ref="BusinessRelativeJustIdCard"
                             class="add-report-container-upload-idcard-just"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                    <img :src="BusinessRelativeMsg.cardBack ? BusinessRelativeMsg.cardBack: IDCardDefaultSrc.BackSrc"
                         @click="openImgToLink(BusinessRelativeMsg.cardBack)"
                         alt />
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeBackIDCard"
                             ref="BusinessRelativeBackIdCard"
                             class="add-report-container-upload-idcard-back"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债权(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.obligatRight"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.obligatRightNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BusinessRelativeMsg.obligatTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">本金：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.capital"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利息：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.interest"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利率：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.interestRate"></el-input>
                    </el-form-item>
                    <span>%</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债务(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.debt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.debtNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BusinessRelativeMsg.debtTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债事凭证：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.debtCertificate"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-update-imgs">
                  <el-col :span="24">
                    <span class="col-label">上传债事凭证：</span>
                    <div class="add-report-container-update-imgs-list">
                      <img v-for="(item,index) in BusinessRelativeMsg.uploadDebtCertificate"
                           :key="index"
                           @click="openImgToLink(item)"
                           :src="item"
                           alt />
                    </div>
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeVoucher"
                             ref="BusinessRelativeVoucher"
                             class="add-report-container-update-imgs-form"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">资金使用用途：</span>
                    <el-form-item label="">
                      <textarea v-model="BusinessRelativeMsg.usage"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">目前经济情况：</span>
                    <el-form-item label="">
                      <textarea v-model="BusinessRelativeMsg.economics"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <el-row class="add-report-container-form-business-lawsuit">
                  <el-col :span="8">
                    <span class="col-label">项目负责人：</span>
                    <el-form-item label="">
                      <el-input v-model="BusinessRelativeMsg.prjectManager"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
              <!-- 银行 -->
              <template v-else>
                <h3>银行:</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">企业名称：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.companyName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">社会统一信用代码：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.creditCode"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">行业属性：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.industryAttributes" />
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">法定代表人名称：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.legalName"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人联系电话：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.legalPhone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">法定代表人身份证号：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.legalIdCard"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">注册地址：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.address"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">企业联系人：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.contactPerson" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.contactPhone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债权(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.obligatRight"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债权笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.obligatRightNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BankRelativeMsg.obligatTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">本金：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.capital"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利息：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.interest"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">利率：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.interestRate"></el-input>
                    </el-form-item>
                    <span>%</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债务(元)：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.debt"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">债务笔数：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.debtNo"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <span class="col-label">借款发生时间：</span>
                    <el-form-item label="">
                      <el-date-picker align="left"
                                      type="date"
                                      placeholder="请选择日期"
                                      :picker-options="pickerOptions"
                                      v-model="BankRelativeMsg.debtTime"
                                      value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">债事凭证：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.debtCertificate"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-update-imgs">
                  <el-col :span="24">
                    <span class="col-label">上传债事凭证：</span>
                    <div class="add-report-container-update-imgs-list">
                      <img v-for="(item,index) in BankRelativeMsg.uploadDebtCertificate"
                           :key="index"
                           @click="openImgToLink(item)"
                           :src="item"
                           alt />
                    </div>
                    <div class="pub-upload-box">
                      <input type="file"
                             @change="UpdateRelativeVoucher"
                             ref="BankRelativeVoucher"
                             value="点击上传" />
                      <button>点击上传</button>
                    </div>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">资金使用用途：</span>
                    <el-form-item label="">
                      <textarea v-model="BankRelativeMsg.usage"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="add-report-container-lawsuit">
                  <el-col :span="24">
                    <span class="col-label">目前经济情况：</span>
                    <el-form-item label="">
                      <textarea v-model="BankRelativeMsg.economics"></textarea>
                    </el-form-item>
                  </el-col>
                </el-row>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <el-row>
                  <el-col :span="8">
                    <span class="col-label">项目负责人：</span>
                    <el-form-item label="">
                      <el-input v-model="BankRelativeMsg.prjectManager"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </template>
              <div class="add-report-container-form-person-button">
                <button @click="SendRelativeData">确认</button>
              </div>
            </el-form>
          </el-collapse-item>
          <!-- 债市链 -->
          <el-collapse-item title="债事链"
                            name="3"
                            v-show="false">
            <!-- <el-collapse-item title="债事链" name="3" v-show='ResponseReportId'> -->
            <div class="add-report-container-debt-chain">
              <img src="@imgs/home/DebtChain.png"
                   alt
                   class="add-report-container-debt-chain-img" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 选择推荐人 -->
    <div class="add-report-pop-recommond"
         v-if="IsPopRecommond && (currentPath === 'add')">
      <div class="add-report-pop-recommond-box">
        <div class="add-report-pop-recommond-box-header">
          <span>提示</span>
          <img src="@imgs/other/error@2x.png"
               alt
               @click="CloseRecommond" />
        </div>
        <div class="add-report-pop-recommond-box-body">
          选择录入推荐人：
          <el-select v-model="ReferrerName"
                     @change="getValue">
            <el-option v-for="(item,index) in Referrer"
                       :key="index"
                       :label="item.personName"
                       :value="index"></el-option>
          </el-select>
        </div>
        <div class="add-report-pop-recommond-box-footer">
          <button @click="CloseRecommond">取消</button>
          <button @click="SelectRecommonder">确认</button>
        </div>
      </div>
    </div>
    <!-- 提交时用户确认按钮 -->
    <div class="add-report-pop-confirm"
         v-if="IsUserConfirm">
      <div class="add-report-pop-confirm-box">
        <div class="add-report-pop-confirm-box-header">
          <span>提示</span>
          <img src="@imgs/other/error@2x.png"
               alt
               @click="CloseConfirm" />
        </div>
        <div class="add-report-pop-confirm-box-body">确定提交债事录入数据？</div>
        <div class="add-report-pop-confirm-box-footer">
          <button @click="CloseConfirm">取消</button>
          <button @click="ConfirmSubmit">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BankList } from './bank.js'
export default {
  data () {
    return {
      collapseActive: '1',
      // 是否显示推荐人弹窗
      IsPopRecommond: true,
      // 是否显示用户确认界面
      IsUserConfirm: false,
      HasSubmitDebt: false,
      // 身份证默认图片源
      IDCardDefaultSrc: {
        JustSrc: require('@imgs/home/IDcard.png'),
        BackSrc: require('@imgs/home/IDcard-back.png')
      },
      // 推荐人名称
      ReferrerName: '',
      // 推荐人名单
      Referrer: [],
      // 报备推荐人的index
      ReferrerIndex: 0,
      // 报备债市人是否配合
      ReportIscoordinate: '1',
      // 报备人类型(1:债权人 2:债务人 3:债权债务人)
      reportType: '1',
      // 报备人的属性 个人/企业/银行
      ReporterProperties: 'person',
      // 个人报备信息源
      PersonalReportMsg: {
        // 用户编辑页面, 当用户是编辑行为进入到报备表单页面时, 初始化
        reportId: '',
        // 公司ID
        companyId: '',
        // 推荐人ID
        userId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 是否从业
        ifWork: '1',
        // 姓名(私人性质)
        personalName: '',
        // 手机号码
        phone: '',
        // 身份证号码
        IdCard: '',
        // 性别
        sex: '1',
        // 所属地区
        area: '',
        // 邮箱
        email: '',
        // 资产总价值(私人性质)
        assets: '',
        // 资产项数(私人性质)
        assetsNumber: '',
        // 可流通资产价值(私人性质)
        circulationAssets: '',
        // 身份证正
        cardJust: '',
        // 身份证反(银性质不需要输入此参数)
        cardBack: '',
        // 债权
        obligatRight: '',
        // 债权笔数
        obligatRightNo: '',
        // 借款发生时间权
        obligatTime: '',
        // 本金
        capital: '',
        // 利息
        interest: '',
        // 利率
        interestRate: '',
        // 债务
        debt: '',
        // 债务笔数
        debtNo: '',
        // 借款发生时间
        debtTime: '',
        // 债事凭证
        debtCertificate: '',
        // 上传债事凭证
        uploadDebtCertificate: [],
        // 是否诉讼及结果
        isResult: '',
        // 目前经济状况
        economics: '',
        // 项目责任人
        prjectManager: '',
        // 状态(1.正常2.异常)
        status: '0',
        // 阶段
        stage: '1',
        // 创建人Id(录入人)
        createUserId: window.sessionStorage.getItem('userId'),
        // 更新人Id
        updateUserId: window.sessionStorage.getItem('userId'),
        // 银行
        bank: '',
        // 银行卡号
        bankCard: '',
        // 银行预留手机号
        bankTel: '',
        // 手机验证码
        telCheck: ''
      },

      // 企业报备信息源
      BusinessReportMsg: {
        // 用户编辑页面, 当用户是编辑行为进入到报备表单页面时, 初始化
        reportId: '',
        // 公司ID
        companyId: '',
        // 推荐人ID
        userId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 企业名��
        companyName: '',
        // 社会统一信用代码
        creditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        legalName: '',
        // 法定代表人联系电话
        legalPhone: '',
        // 法定代表人身份证号
        legalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        contactPerson: '',
        // 联系电话
        contactPhone: '',
        // 身份证正
        cardJust: '',
        // 身份证反
        cardBack: '',
        // 债权
        obligatRight: '',
        // 债权笔数
        obligatRightNo: '',
        // 借款发生时间权
        obligatTime: '',
        // 本金
        capital: '',
        // 利息
        interest: '',
        // 利率
        interestRate: '',
        // 债务
        debt: '',
        // 债务笔数
        debtNo: '',
        // 借款发生时间
        debtTime: '',
        // 债事凭证
        debtCertificate: '',
        // 上传债事凭证
        uploadDebtCertificate: [],
        // 是否诉讼及结果
        isResult: '',
        // 创建人Id(录入人)
        createUserId: window.sessionStorage.getItem('userId'),
        // 更新人Id
        updateUserId: window.sessionStorage.getItem('userId'),
        // 项目责任人
        prjectManager: '',
        // 状态(1.正常2.异常)
        status: '0',
        // 阶段
        stage: '1',
        // 经济状况, (原定没有该项,测试用)
        economics: '良好',
        // 银行
        bank: '',
        // 银行卡号
        bankCard: '',
        // 银行预留手机号
        bankTel: '',
        // 手机验证码
        telCheck: ''
      },
      // 银行报备信息源
      BankReportMsg: {
        // 用户编辑页面, 当用户是编辑行为进入到报备表单页面时, 初始化
        reportId: '',
        // 公司ID
        companyId: '',
        // 推荐人ID
        userId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 企业名称
        companyName: '',
        // 社会统一信用代码
        creditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        legalName: '',
        // 法定代表人联系电话
        legalPhone: '',
        // 法定代表人身份证号
        legalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        contactPerson: '',
        // 联系电话
        contactPhone: '',
        // 债权
        obligatRight: '',
        // 债权笔数
        obligatRightNo: '',
        // 借款发生时间权
        obligatTime: '',
        // 本金
        capital: '',
        // 利息
        interest: '',
        // 利率
        interestRate: '',
        // 债务
        debt: '',
        // 债务笔数
        debtNo: '',
        // 借款发生时间
        debtTime: '',
        // 债事凭证
        debtCertificate: '',
        // 上传债事凭证
        uploadDebtCertificate: [],
        // 是否诉讼及结果
        isResult: '',
        // 创建人Id(录入人)
        createUserId: window.sessionStorage.getItem('userId'),
        // 更新人Id
        updateUserId: window.sessionStorage.getItem('userId'),
        // 项目责任人
        prjectManager: '',
        // 状态(1.正常2.异常)
        status: '0',
        // 阶段
        stage: '1',
        // 经济状况, (原定没有该项,测试用)
        economics: '良好'
      },
      // 手机号码列表
      PhoneList: {
        PersonReportPhone: '',
        BusinessReportPhone: ''
      },
      // 相对人的属性 个人/企业/银行
      RelativeProperties: 'person',
      // 相对债市人是否配合
      RelativeIscoordinate: '1',
      // 相对人类型(1:债权人 2:债务人 3:债权债务人)
      RelativeType: '1',
      // 个人相对信息源
      PersonalRelativeMsg: {
        // 报备id
        reportId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 是否从业
        ifWork: '1',
        // 姓名(私人性质)
        personalName: '',
        // 手机号码
        phone: '',
        // 身份证号码
        idCard: '',
        // 性别
        sex: '1',
        // 所属地区
        area: '',
        // 邮箱
        email: '',
        // 资产总价值(私人性质)
        assets: '',
        // 资产项数(私人性质)
        assetsNumber: '',
        // 可流通资产价值(私人性质)
        circulationAssets: '',
        // 身份证正
        cardJust: '',
        // 身份证反(银性质不需要输入此参数)
        cardBack: '',
        // 债权
        obligatRight: '',
        // 债权笔数
        obligatRightNo: '',
        // 借款发生时间权
        obligatTime: '',
        // 本金
        capital: '',
        // 利息
        interest: '',
        // 利率
        interestRate: '',
        // 债务
        debt: '',
        // 债务笔数
        debtNo: '',
        // 借款发生时间
        debtTime: '',
        // 债事凭证
        debtCertificate: '',
        // 上传债事凭证
        uploadDebtCertificate: [],
        // 目前经济状况
        economics: '',
        // 项目责任人
        prjectManager: '',
        // 状态(1.正常2.异常)
        status: '0',
        // 阶段
        stage: '1',
        // 创建人Id(录入人)
        createUserId: window.sessionStorage.getItem('userId'),
        // 更新人Id
        updateUserId: window.sessionStorage.getItem('userId'),
        agreementNo: '7969107472849373213',
        // 是负债经济使用用途
        usage: ''
      },
      // 企业相对信息源
      BusinessRelativeMsg: {
        // 报备id
        reportId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 企业名称
        companyName: '',
        // 社会统一信用代码
        creditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        legalName: '',
        // 法定代表人联系电话
        legalPhone: '',
        // 法定代表人身份证号
        legalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        contactPerson: '',
        // 联系电话
        contactPhone: '',
        // 身份证正
        cardJust: '',
        // 身份证反
        cardBack: '',
        // 债权
        obligatRight: '',
        // 债权笔数
        obligatRightNo: '',
        // 借款发生时间权
        obligatTime: '',
        // 本金
        capital: '',
        // 利息
        interest: '',
        // 利率
        interestRate: '',
        // 债务
        debt: '',
        // 债务笔数
        debtNo: '',
        // 借款发生时间
        debtTime: '',
        // 债事凭证
        debtCertificate: '',
        // 上传债事凭证
        uploadDebtCertificate: [],
        // 是否诉讼及结果
        isResult: '',
        // 创建人Id(录入人)
        createUserId: window.sessionStorage.getItem('userId'),
        // 更新人Id
        updateUserId: window.sessionStorage.getItem('userId'),
        // 项目责任人
        prjectManager: '',
        // 状态(1.正常2.异常)
        status: '1',
        // 阶段
        stage: '0',
        // 经济状况, (原定没有该项,测试用)
        economics: '',
        agreementNo: '7969107472849373213',
        usage: ''
      },
      // 银行相对信息
      BankRelativeMsg: {
        // 报备人ID
        reportId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 企业名称
        companyName: '',
        // 社会统一信用代码
        creditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        legalName: '',
        // 法定代表人联系电话
        legalPhone: '',
        // 法定代表人身份证号
        legalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        contactPerson: '',
        // 联系电话
        contactPhone: '',
        // 债权
        obligatRight: '',
        // 债权笔数
        obligatRightNo: '',
        // 借款发生时间权
        obligatTime: '',
        // 本金
        capital: '',
        // 利息
        interest: '',
        // 利率
        interestRate: '',
        // 债务
        debt: '',
        // 债务笔数
        debtNo: '',
        // 借款发生时间
        debtTime: '',
        // 债事凭证
        debtCertificate: '',
        // 上传债事凭证
        uploadDebtCertificate: [],
        // 是否诉讼及结果
        isResult: '',
        // 创建人Id(录入人)
        createUserId: window.sessionStorage.getItem('userId'),
        // 更新人Id
        updateUserId: window.sessionStorage.getItem('userId'),
        // 项目责任人
        prjectManager: '',
        // 状态(1.正常2.异常)
        status: '0',
        // 阶段
        stage: '1',
        // 经济状况, (原定没有该项,测试用)
        economics: '',
        agreementNo: '7969107472849373213',
        usage: ''
      },
      // 相对人列表数据源
      RelativeList: [],
      // 保存报备发送了短信的电话号码
      SendReportPhoneNumber: '',
      // 手机验证码
      NoteCode: [
        {
          PersonReportNodeCode: '',
          BusinessReportNodeCode: ''
        }
      ],
      // 实名验证信息源:
      Certification: [
        // 个人报备
        {
          identifyNum: '',
          mobilePhone: '',
          userName: '',
          bankCard: '',
          bank: ''
        },
        // 企业报备
        {
          identifyNum: '',
          mobilePhone: '',
          userName: '',
          bankCard: '',
          bank: ''
        }
      ],
      // 存储注册债务人获得reportId
      ResponseReportId: '',
      // 添加债事人是否通过实名验证标志
      IsPersonReportCertification: {
        Person: false,
        Business: false
      },
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      // 债事人是否通过短信验证
      IsReportPhoneCertification: {
        Person: false,
        Business: false
      },
      BankList: BankList,
      // element表单验证规则
      ruleForm: {
        userName: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      // 判断当前路径是新增录入还是编辑录入
      currentPath: '',
      // 相对人列表信息
      RelativeList: [],
      // 提交总部信息源
      ToHeadCompanyData: {
        reportId: '',
        status: '0'
      }
    }
  },
  methods: {
    // 关闭推荐人界面
    CloseRecommond () {
      // 退回主页
      //   this.$message.error('请先选择推荐人')
      //   this.$router.push({path: 'Home'})
      //   this.IsPopRecommond = false
      this.$router.go(-1)
    },
    // 查询推荐人目录
    async SearchRecommonder () {
      const personType = '2'
      const formData = new FormData()
      formData.append('personType', personType)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubPersonController/selectByType',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.Referrer = result.data
    },
    // 确定选择推荐人页面
    SelectRecommonder () {
      // 未选择推荐人, 提示错误信息
      if (!this.PersonalReportMsg.userId)
      {
        return this.$message.error('请先选择推荐人')
      }
      // 选择成功, 关闭面板, 发送选择成功信息
      this.$message({
        message: '选择推荐人成功',
        type: 'success'
      })
      this.IsPopRecommond = false
      console.log(this.IsPopRecommond)
      this.$forceUpdate()
    },
    // 获取报备推荐人的index及推荐人ID
    getValue (index) {
      // 获取推荐人ID
      this.PersonalReportMsg.userId = this.Referrer[index].userId
      this.BusinessReportMsg.userId = this.Referrer[index].userId
      this.BankReportMsg.userId = this.Referrer[index].userId
    },
    // 获取债事人是否配合信息
    GetIsCoordinate (value) {
      this.PersonalReportMsg.iscoordinate = value
      this.BusinessReportMsg.iscoordinate = value
      this.BankReportMsg.iscoordinate = value
    },
    // 获取报备人类型
    GetReportType (value) {
      this.PersonalReportMsg.reportType = value
      this.BusinessReportMsg.reportType = value
      this.BankReportMsg.reportType = value
    },
    // 调用接口传入数据(个人,企业,银行)
    async SendReporterData () {
      // 如果当前页面为新增页面, 进行新增处理
      console.log(this.currentPath)
      if (this.currentPath === 'add')
      {
        if (this.ReporterProperties === 'person')
        {
          if (!this.IsReportPhoneCertification.Person)
            return this.$message.error('请先进行个人实名验证和短信验证')
        } else if (this.ReporterProperties === 'business')
        {
          // 如果是企业报备页面
          if (!this.IsReportPhoneCertification.Business)
            return this.$message.error('请先进行法定代表人实名验证和短信验证')
        }
        if (
          this.ReporterProperties === 'person' ||
          this.ReporterProperties === 'business'
        )
        {
          let tel = ''
          if (this.ReporterProperties === 'person')
          {
            tel = this.Certification[0].mobilePhone
          } else
          {
            // 如果是企业报备页面
            tel = this.Certification[1].mobilePhone
          }
          let checkNo = ''
          if (this.ReporterProperties === 'person')
          {
            // 如果是个人报备
            checkNo = this.NoteCode[0].PersonReportNodeCode
          } else
          {
            // 如果是企业报备页面
            checkNo = this.NoteCode[0].BusinessReportNodeCode
          }
          // 验证码
          const formData = new FormData()
          formData.append('tel', tel)
          formData.append('checkNo', checkNo)
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/smsSend/checkNO',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          if (result.resultCode !== '200')
          {
            return this.$message.error('短信验证码输入错误,请重新输入')
          }
          this.$message.success('实名验证成功')
        }
        // 报备信息登记
        let Responseresult = {}
        if (this.ReporterProperties === 'person')
        {
          // 用户个人报备
          // 是否个人实名验证信息
          if (!this.IsReportPhoneCertification.Person)
          {
            return this.$message.error('请先进行个人实名验证和短信验证')
          }
          this.PersonalReportMsg.companyId = window.sessionStorage.getItem(
            'companyId'
          )
          this.PersonalReportMsg.bank = this.Certification[0].bank
          this.PersonalReportMsg.bankCard = this.Certification[0].bankCard
          this.PersonalReportMsg.bankTel = this.Certification[0].mobilePhone
          this.PersonalReportMsg.telCheck = this.NoteCode[0].PersonReportNodeCode
          console.log(this.PersonalReportMsg)
          const formData = new FormData()
          for (const key in this.PersonalReportMsg)
          {
            formData.append(key, this.PersonalReportMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/insertPrivateSelective',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          Responseresult = result

          // 传入当前用户报备ID
        } else if (this.ReporterProperties === 'business')
        {
          // 当用户选择企业报备时
          // 查看用户是否进行企业的实名验证
          if (!this.IsReportPhoneCertification.Business)
            return this.$message.error(
              '请先进行企业法定代表人的实名验证和短信验证'
            )
          this.BusinessReportMsg.companyId = window.sessionStorage.getItem(
            'companyId'
          )
          this.BusinessReportMsg.bank = this.Certification[1].bank
          this.BusinessReportMsg.bankCard = this.Certification[1].bankCard
          this.BusinessReportMsg.bankTel = this.Certification[1].mobilePhone
          this.BusinessReportMsg.telCheck = this.NoteCode[1].PersonReportNodeCode
          const formData = new FormData()
          for (const key in this.BusinessReportMsg)
          {
            formData.append(key, this.BusinessReportMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/insertEterpriseSelective',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          Responseresult = result
        } else
        {
          // 当用户选择企业报备时
          this.BankReportMsg.companyId = window.sessionStorage.getItem(
            'companyId'
          )
          const formData = new FormData()
          for (const key in this.BankReportMsg)
          {
            formData.append(key, this.BankReportMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/insertBankSelective',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          Responseresult = result
        }
        // 如何返回结果成功,传入报备Id
        if (Responseresult.resultCode !== '200')
        {
          return this.$message.error(Responseresult.resultMessage)
        }
        this.$message.success('债事人信息登记成功')
        // 将报备ID放至新增相对人信息源
        this.ResponseReportId = Responseresult.data || ''
        // 当返回报备ID时, 添加报备ID至提价总公司页面
        this.ToHeadCompanyData.reportId = Responseresult.data || ''
        this.HasSubmitDebt = true
        this.collapseActive = '2'
      }
      else
      { // 如果当前是编辑页面进行编辑数据的上传
        let Responseresult = {}
        if (this.ReporterProperties === 'person')
        {
          this.PersonalReportMsg.companyId = window.sessionStorage.getItem('companyId')
          this.PersonalReportMsg.updateUserId = window.sessionStorage.getItem('userId')
          const formData = new FormData()
          for (const key in this.PersonalReportMsg)
          {
            formData.append(key, this.PersonalReportMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/updatePrivateSelective',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          Responseresult = result
          // 传入当前用户报备ID
        } else if (this.ReporterProperties === 'business')
        {
          // 当用户选择企业报备时
          // 查看用户是否进行企业的实名验证
          this.BusinessReportMsg.companyId = window.sessionStorage.getItem('companyId')
          const formData = new FormData()
          for (const key in this.BusinessReportMsg)
          {
            formData.append(key, this.BusinessReportMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/updateEterpriseSelective',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          Responseresult = result
        } else
        {
          // 当用户选择银行报备时
          this.BankReportMsg.companyId = window.sessionStorage.getItem('companyId')
          this.BankReportMsg.createTime = null
          console.log(this.BankReportMsg)
          const formData = new FormData()
          for (const key in this.BankReportMsg)
          {
            formData.append(key, this.BankReportMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busReportController/updateBankSelective',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          Responseresult = result
        }
        this.InitEditData()
        this.$message.success('操作成功')
      }
    },
    // 上传报备正面身份证
    async UpdateReportJustIDCard () {
      let file = {}
      if (this.ReporterProperties === 'person')
      {
        file = this.$refs.PersonReportJustIdCard.files[0]
      } else
      {
        file = this.$refs.BusinessReportJustIdCard.files[0]
      }
      this.$UpdateFile(file).then(result => {
        if (this.ReporterProperties === 'person')
        {
          this.PersonalReportMsg.cardJust = result
        } else
        {
          this.BusinessReportMsg.cardJust = result
        }
      })
    },
    // 上传报备反面身份证
    async UpdateReportBackIDCard () {
      let file = {}
      if (this.ReporterProperties === 'person')
      {
        file = this.$refs.PersonReportBackIdCard.files[0]
      } else
      {
        file = this.$refs.BusinessReportBackIdCard.files[0]
      }
      this.$UpdateFile(file).then(result => {
        if (this.ReporterProperties === 'person')
        {
          this.PersonalReportMsg.cardBack = result
        } else
        {
          this.BusinessReportMsg.cardBack = result
        }
      })
    },
    // 编辑相对人
    RelativeEdit (data) {
      this.RelativeMsg.uploadDebtCertificate = this.RelativeMsg.uploadDebtCertificate.split(
        ','
      )
      //相对人类型
      this.RelativeType = data.reportType
      //是否配合
      this.RelativeIscoordinate = data.iscoordinate

      // 性质
      if (data.reportPropert === '1')
      {
        this.RelativeProperties = 'person'
      } else if (data.reportPropert === '2')
      {
        this.RelativeProperties = 'business'
      } else
      {
        this.RelativeProperties = 'bank'
      }
      this.RelativeMsg = data
    },
    // 上传相对人正面身份证
    async UpdateRelativeJustIDCard () {
      let file = {}
      if (this.RelativeProperties === 'person')
      {
        file = this.$refs.PersonRelativeJustIdCard.files[0]
      } else
      {
        file = this.$refs.BusinessRelativeJustIdCard.files[0]
      }
      console.log(file)
      this.$UpdateFile(file).then(result => {
        if (this.RelativeProperties === 'person')
        {
          this.PersonalRelativeMsg.cardJust = result
        } else
        {
          this.BusinessRelativeMsg.cardJust = result
        }
      })
    },
    // 上传相对人反面身份证
    async UpdateRelativeBackIDCard () {
      let file = {}
      if (this.RelativeProperties === 'person')
      {
        file = this.$refs.PersonRelativeBackIdCard.files[0]
      } else
      {
        file = this.$refs.BusinessRelativeBackIdCard.files[0]
      }
      this.$UpdateFile(file).then(result => {
        if (this.RelativeProperties === 'person')
        {
          this.PersonalRelativeMsg.cardBack = result
        } else
        {
          this.BusinessRelativeMsg.cardBack = result
        }
      })
    },
    // 上传报备凭证
    UpdateReportVoucher () {
      let file = {}
      if (this.ReporterProperties === 'person')
      {
        file = this.$refs.PersonReportVoucher.files[0]
      } else if (this.ReporterProperties === 'business')
      {
        file = this.$refs.BusinessReportVoucher.files[0]
      } else
      {
        file = this.$refs.BankReportVoucher.files[0]
      }
      this.$UpdateFile(file).then(result => {
        if (this.ReporterProperties === 'person')
        {
          this.PersonalReportMsg.uploadDebtCertificate.push(result)
        } else if (this.ReporterProperties === 'business')
        {
          this.BusinessReportMsg.uploadDebtCertificate.push(result)
        } else
        {
          this.BankReportMsg.uploadDebtCertificate.push(result)
        }
      })
    },
    // 上传相对人凭证
    UpdateRelativeVoucher () {
      let file = {}
      if (this.RelativeProperties === 'person')
      {
        file = this.$refs.PersonRelativeVoucher.files[0]
      } else if (this.RelativeProperties === 'business')
      {
        file = this.$refs.BusinessRelativeVoucher.files[0]
      } else
      {
        file = this.$refs.BankRelativeVoucher.files[0]
      }
      this.$UpdateFile(file).then(result => {
        if (this.RelativeProperties === 'person')
        {
          this.PersonalRelativeMsg.uploadDebtCertificate.push(result)
        } else if (this.RelativeProperties === 'business')
        {
          this.BusinessRelativeMsg.uploadDebtCertificate.push(result)
        } else
        {
          this.BankRelativeMsg.uploadDebtCertificate.push(result)
        }
      })
    },
    // 实名认证和短信验证信息发送
    async PhoneCheck () {
      // 实名认证信息填写
      let RequestMsg = []
      if (this.ReporterProperties === 'person')
      {
        RequestMsg = this.Certification[0]
      } else
      {
        RequestMsg = this.Certification[1]
      }
      const CertificationformData = new FormData()
      for (const key in RequestMsg)
      {
        CertificationformData.append(key, RequestMsg[key])
      }
      const { data: Certificationresult } = await this.$http({
        method: 'post',
        url: '/api/api/safrv/safrvCheck',
        data: CertificationformData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (Certificationresult.resultCode !== '200')
      {
        return this.$message.error('实名认证错误, 请重新填写信息')
      }
      // 发送短信验证码
      let tel = ''
      if (this.ReporterProperties === 'person')
      {
        tel = this.Certification[0].mobilePhone
      } else
      {
        // 如果是企业报备页面
        tel = this.Certification[1].mobilePhone
      }
      if (!/^1[3456789]\d{9}$/.test(tel))
        return this.$message.error('填写手机号码格式不正确,请重新填入')
      // 发送验证码
      const formData = new FormData()
      formData.append('tel', tel)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/smsSend/sendCheckNO',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (result.resultCode === '200')
      {
        this.$message({
          message: '手机验证码发送成功, 请填写正确的验证码',
          type: 'success'
        })
        // 存储发送成功的电话号码
        this.SendReportPhoneNumber = tel
      }
      if (this.ReporterProperties === 'person')
      {
        this.IsReportPhoneCertification.Person = true
      } else
      {
        // 如果是企业报备页面
        this.IsReportPhoneCertification.Business = true
      }
    },
    // 查询相对人信息表
    async SearchCounterpartList () {
      const formData = new FormData()
      const reportId = this.ResponseReportId
      formData.append('reportId', reportId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busRelativePersonController/selectByRepId',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      // 数据处理
      this.RelativeList = result.data || []
    },
    // 获取相对人是否配合
    GetRelativeIscoordinate (value) {
      this.PersonalRelativeMsg.iscoordinate = value
      this.BusinessRelativeMsg.iscoordinate = value
      this.BankRelativeMsg.iscoordinate = value
    },
    // 获取相对人类型
    GetRelativeType (value) {
      this.PersonalRelativeMsg.reportType = value
      this.BusinessRelativeMsg.reportType = value
      this.BankRelativeMsg.reportType = value
    },
    //新增/修改相对人 传入相对人信息(个人, 企业, 银行)
    async SendRelativeData () {
      // 当前是新增页面
      if (this.currentPath === 'add')
      {
        let Result = {}
        console.log(this.ResponseReportId)
        if (this.RelativeProperties === 'person')
        {
          // 个人用户
          this.PersonalRelativeMsg.reportId = this.ResponseReportId
          console.log(this.PersonalRelativeMsg)
          const formData = new FormData()
          for (const key in this.PersonalRelativeMsg)
          {
            formData.append(key, this.PersonalRelativeMsg[key])
          }
          const addUrl =
            '/api/api/busRelativePersonController/insertPrivateSelective'
          const updateUrl = ''
          const { data: result } = await this.$http({
            method: 'post',
            url: formData.relativePerId ? updateUrl : addUrl,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          Result = result
        } else if (this.RelativeProperties === 'business')
        {
          // 当用户选择企业报备时
          this.BusinessRelativeMsg.reportId = this.ResponseReportId
          console.log(this.BusinessRelativeMsg)
          const formData = new FormData()
          for (const key in this.BusinessRelativeMsg)
          {
            formData.append(key, this.BusinessRelativeMsg[key])
          }
          const addUrl = '/api/api/busRelativePersonController/insertEnterprise'
          const updateUrl = ''
          const { data: result } = await this.$http({
            method: 'post',
            url: formData.relativePerId ? updateUrl : addUrl,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          Result = result
        } else
        {
          this.BankRelativeMsg.reportId = this.ResponseReportId
          console.log(this.BankRelativeMsg)
          const formData = new FormData()
          for (const key in this.BankRelativeMsg)
          {
            formData.append(key, this.BankRelativeMsg[key])
          }
          const addUrl = '/api/api/busRelativePersonController/insertBank'
          const updateUrl = ''
          const { data: result } = await this.$http({
            method: 'post',
            url: formData.relativePerId ? updateUrl : addUrl,
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          Result = result
        }
        if (Result.resultCode !== '200')
          return this.$message.error(Result.resultMessage)
        this.$message.success('添加相对人信息成功')
        // this.collapseActive='3';
        this.SearchCounterpartList()
        this.ClearRelativeForm()
      }
      else
      { // 如果当前是编辑页面
        let Result = {}
        if (this.RelativeProperties === 'person')
        {
          // 个人用户
          console.log(this.PersonalRelativeMsg)
          const formData = new FormData()
          for (const key in this.PersonalRelativeMsg)
          {
            formData.append(key, this.PersonalRelativeMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busRelativePersonController/updatePrivate',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          Result = result
        }
        else if (this.RelativeProperties === 'business')
        {
          // 当用户选择企业报备时
          console.log(this.BusinessRelativeMsg)
          const formData = new FormData()
          for (const key in this.BusinessRelativeMsg)
          {
            formData.append(key, this.BusinessRelativeMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busRelativePersonController/updateEnterprise',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          Result = result
        }
        else
        {
          console.log(this.BankRelativeMsg)
          const formData = new FormData()
          for (const key in this.BankRelativeMsg)
          {
            formData.append(key, this.BankRelativeMsg[key])
          }
          const { data: result } = await this.$http({
            method: 'post',
            url: '/api/api/busRelativePersonController/updateEnterprise',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
          Result = result
        }
        console.log(Result)
        if (Result.resultCode === '200')
        {
          this.$message.success('相对人数据修改成功')
        }
        // 刷新数据
        this.InitEditData()
      }
    },
    // 关闭提交页面
    CloseConfirm () {
      this.IsUserConfirm = false
    },
    // 确定提交按钮
    ConfirmSubmit () {
      this.IsUserConfirm = false
    },
    ClearRelativeForm () {
      for (const key in this.PersonalRelativeMsg)
      {
        this.PersonalRelativeMsg[key] = ''
        this.PersonalRelativeMsg.iscoordinate = '1'
        this.PersonalRelativeMsg.reportType = '1'
        this.PersonalRelativeMsg.sex = '1'
        this.PersonalRelativeMsg.ifWork = '1'
        this.PersonalRelativeMsg.reportId = this.ResponseReportId
        this.PersonalRelativeMsg.createUserId = window.sessionStorage.getItem(
          'userId'
        )
        this.PersonalRelativeMsg.uploadDebtCertificate = []
      }
      for (const key in this.BusinessRelativeMsg)
      {
        this.BusinessRelativeMsg[key] = ''
        this.BusinessRelativeMsg.reportId = this.ResponseReportId
        this.BusinessRelativeMsg.iscoordinate = '1'
        this.BusinessRelativeMsg.reportType = '1'
        this.BusinessRelativeMsg.createUserId = window.sessionStorage.getItem(
          'userId'
        )
        this.BusinessRelativeMsg.agreementNo = '111'
        this.BusinessRelativeMsg.uploadDebtCertificate = []
      }
      for (const key in this.BankRelativeMsg)
      {
        this.BankRelativeMsg[key] = ''
        this.BankRelativeMsg.reportId = this.ResponseReportId
        this.BankRelativeMsg.reportType = '1'
        this.BankRelativeMsg.iscoordinate = '1'
        this.BankRelativeMsg.createUserId = window.sessionStorage.getItem(
          'userId'
        )
        this.BankRelativeMsg.agreementNo = '111'
        this.BankRelativeMsg.uploadDebtCertificate = []
      }
    },
    async InitEditData () {
      // 判断当前路由是新增路由还是修改路由
      const path = this.$route.path
      // 如果当前路由为
      if (path === '/AddReportForm')
      {
        this.currentPath = 'add'
      } else
      {
        this.currentPath = 'edit'
        // 如果当前是编辑页面, 获取数据
        const reportId = this.$route.query.reportId
        // 获取债事人信息
        const formData = new FormData()
        formData.append('reportId', reportId)
        const { data: result } = await this.$http({
          method: 'post',
          url: '/api/api/busReportController/selectByPrimaryKey',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        const Result = result.data
        // ','分隔的字符串 因此需要用split分割
        if (Result.uploadDebtCertificate.indexOf(',') !== -1)
        {
          Result.uploadDebtCertificate = Result.uploadDebtCertificate.split(',')
        }
        // 判断初始化时,  当前用户的属于哪种属性, 给相应的赋值
        if (result.data.reportPropert === '1')
        {
          this.PersonalReportMsg = Result
          delete this.PersonalReportMsg.createTime
          delete this.PersonalReportMsg.updateTime
        } else if (result.data.reportPropert === '2')
        {
          this.BusinessReportMsg = Result
          delete this.BusinessReportMsg.createTime
          delete this.BusinessReportMsg.updateTime
        } else
        {
          this.BankReportMsg = Result
          delete this.BankReportMsg.createTime
          delete this.BankReportMsg.updateTime
        }
        // 无论当用户类型是哪种, 都将报备ID赋值给页面更新的报备ID赋值给个人/企业/银行
        // 主要用户修改提交时, 可能修改用户
        this.PersonalReportMsg.reportId = Result.reportId
        this.BusinessReportMsg.reportId = Result.reportId
        this.BankReportMsg.reportId = Result.reportId
        this.$forceUpdate()
        // 获取相对人信息
        const { data: RelativeListresult } = await this.$http({
          method: 'post',
          url: '/api/api/busRelativePersonController/selectByRepId',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
        this.RelativeList = RelativeListresult.data
        // 提交总部报备ID
        this.ToHeadCompanyData.reportId = reportId
      }
    },
    EditRelativeDetailMsg (index) {
      // 处理债事凭证
      // 首次点击为','分隔的字符串 因此需要用split分割, 再次点击时此时已为数组, 因此不需要处理
      if (this.RelativeList[index].uploadDebtCertificate.indexOf(',') !== -1 && (!(this.RelativeList[index].uploadDebtCertificate instanceof Array)))
      {
        this.RelativeList[index].uploadDebtCertificate = this.RelativeList[index].uploadDebtCertificate.split(',')
      }
      // 页面显示
      if (this.RelativeList[index].reportPropert === '1')
      {
        this.PersonalRelativeMsg = this.RelativeList[index]
        this.RelativeProperties = 'person'
        delete this.PersonalRelativeMsg.createTime
        delete this.PersonalRelativeMsg.updateTime
      } else if (this.RelativeList[index].reportPropert === '2')
      {
        this.BusinessRelativeMsg = this.RelativeList[index]
        this.RelativeProperties = 'business'
        delete this.BusinessRelativeMsg.createTime
        delete this.BusinessRelativeMsg.updateTime
      } else
      {
        this.BankRelativeMsg = this.RelativeList[index]
        this.RelativeProperties = 'bank'
        delete this.BankRelativeMsg.createTime
        delete this.BankRelativeMsg.updateTime
      }
    },
    async SubmitDataToHeadCompany () {
      if (!this.ToHeadCompanyData.reportId) return this.$message.error('债事人信息不能为空')
      const formData = new FormData()
      for (const key in this.ToHeadCompanyData)
      {
        formData.append(key, this.ToHeadCompanyData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busReportController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      this.$message.success('提交至总公司成功')
      this.$router.push({ path: '/MyDebt' })
    }
  },
  created () {
    // 查询推荐人信息
    this.SearchRecommonder(),
      this.InitEditData()
    // this.SearchCounterpartList()
  }
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';

.el-row {
  .el-col {
    display: flex;
    padding: 0 20px;
    .col-label {
      flex-shrink: 0;
      line-height: 30px;
      height: 30px;
    }
    /deep/.el-form-item {
      width: 100%;
      .el-select {
        width: 100%;
      }
      .el-input {
        width: 100%;
      }
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
input[type='file'] {
  width: 100px;
}
.add-report {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  button {
    cursor: pointer;
  }
  input:disabled {
    background-color: #f5f7fa;
  }
  &-title {
    height: px2rem(12);
    line-height: px2rem(12);
    font-size: px2rem(4);
    color: #fc7f89;
    margin: 0 px2rem(4);
    &-go1 {
      color: #616789;
    }
    &-separator {
      color: #616789;
    }
  }
  &-container {
    // 信息表单填写
    &-upload-idcard {
      margin: 20px 0;
      img {
        margin: 0 10px;
        width: 358px;
        height: 183px;
      }
      &-just {
        width: px2rem(20);
        height: px2rem(7);
        position: absolute;
        left: 350px;
        opacity: 0;
      }
      &-back {
        width: px2rem(20);
        height: px2rem(7);
        position: absolute;
        left: 880px;
        opacity: 0;
      }
    }
    &-update-imgs {
      height: px2rem(20);
      box-sizing: border-box;
      position: relative;
      span {
        margin: 0 px2rem(2);
      }
      &-list {
        border: 1px solid #e8eaec;
        width: px2rem(180.5);
        display: flex;
        align-items: center;
        height: 80px;
        img {
          margin: 0 px2rem(2);
          width: px2rem(20);
          height: px2rem(14);
        }
      }
    }
    &-lawsuit {
      height: px2rem(20);
      box-sizing: border-box;
      span {
        margin: 0 px2rem(2);
      }
      textarea {
        border: 1px solid #e8eaec;
        width: px2rem(177);
        height: 80px;
        display: flex;
        align-items: center;
        resize: none;
        font-size: px2rem(3.5);
      }
    }
    &-form {
      height: 100%;
      background-color: #ffffff;
      margin: 0 px2rem(4);
      font-size: px2rem(3.2);
      padding: 0 px2rem(6);
      border-radius: px2rem(2);
      // 个人信息
      &-person-item-11 {
        div {
          flex: 1;
        }
        :nth-child(3) {
          button {
            height: 40px;
            padding: px2rem(0.5) px2rem(2);
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
      }
      &-person-item-12 {
        margin: px2rem(4) 0;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(18);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(72);
        }
        :nth-child(1) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
        :nth-child(2) {
          position: relative;
          span {
            width: px2rem(20);
          }
          .el-input {
            width: px2rem(70);
          }
          button {
            position: absolute;
            z-index: 2;
            box-sizing: border-box;
            border: none;
            background: #616789;
            color: #fff;
            font-size: px2rem(3.4);
            width: px2rem(20);
            border-radius: px2rem(1);
            box-sizing: border-box;
            margin: 0 px2rem(2);
            padding: px2rem(1) px2rem(2);
            right: px2rem(6);
            top: px2rem(0.5);
          }
        }
        &-phone {
          padding: px2rem(1) px2rem(2);
          margin-left: px2rem(2);
          background-color: #616789;
          border: none;
          border-radius: px2rem(1);
          color: #fff;
        }
      }
      &-person-button {
        text-align: center;
        margin-top: px2rem(10);
        button {
          box-sizing: border-box;
          border: none;
          background: #616789;
          color: #fff;
          cursor: pointer;
          font-size: px2rem(3.4);
          width: px2rem(50);
          height: px2rem(10);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: px2rem(4) px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
      }
      // 实名验证按钮
      /* 企业样式 */
      &-business-item-11 {
        div {
          flex: 1;
        }
        :nth-child(3) {
          button {
            height: 40px;
            padding: px2rem(0.5) px2rem(2);
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
      }
      /* 银行样式 */
      &-bank-item-9 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: flex-start;
        font-size: px2rem(3);
        span {
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(72);
        }
      }
    }
    // 相关人信息
    &-relative {
      padding: 0 px2rem(2);
      &-add-button {
        border-top: 1px solid #d9d9d9;

        button {
          box-sizing: border-box;
          border: none;
          background: #fc7f89;
          color: #fff;
          font-size: px2rem(3);
          width: px2rem(24);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: px2rem(4) 0;
          padding: px2rem(1) px2rem(2);
        }
      }
      &-list-title {
        display: flex;
        justify-content: space-around;
        span {
          background-color: #616789;
          width: 100%;
          display: inline-block;
          box-sizing: border-box;
          border: 1px solid #fff;
          text-align: center;
          font-size: px2rem(3.5);
          color: #fff;
          flex: 3;
        }
        :nth-child(1) {
          flex: 1;
        }
      }
      &-list {
        display: flex;
        flex-direction: column;
        div:nth-child(odd) {
          background-color: #fff;
          display: flex;
          height: px2rem(8);
          font-size: px2rem(3.2);
          align-items: center;
          span {
            flex: 3;
            text-align: center;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(6) {
            button {
              margin: 0 px2rem(2);
              border: none;
              color: #fff;
              padding: px2rem(1) px2rem(2);
              font-size: px2rem(3.2);
            }
            :nth-child(1) {
              background-color: #616789;
            }
            :nth-child(2) {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(even) {
          background-color: #e0e3f8;
          display: flex;
          height: px2rem(8);
          font-size: px2rem(3.2);
          align-items: center;
          span {
            flex: 3;
            text-align: center;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(6) {
            button {
              margin: 0 px2rem(2);
              border: none;
              color: #fff;
              padding: px2rem(1) px2rem(2);
              font-size: px2rem(3.2);
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
      &-submit-button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: px2rem(20);
        button {
          width: px2rem(50);
          height: px2rem(8);
          background-color: #616789;
          color: #fff;
          border: none;
          border-radius: px2rem(1);
        }
      }
      &-form {
        height: 100%;
        background-color: #ffffff;
        margin: 0 20px;
        font-size: 14px;
        padding: 0 30px;
        &-person-button {
          box-sizing: border-box;
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(50);
          height: px2rem(10);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: px2rem(4) px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
        /* 企业样式 */
        /* 银行样式 */
      }
    }
    &-debt-chain {
      text-align: center;
      &-img {
        width: px2rem(280);
      }
    }
  }

  &-pop {
    &-recommond {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      &-box {
        position: absolute;
        background-color: #ffffff;
        width: px2rem(100);
        height: px2rem(40);
        top: 45%;
        left: 45%;
        transform: translate(-50%, -50%);
        border-radius: px2rem(2);
        &-header {
          height: px2rem(10);
          background-color: #616789;
          display: flex;
          justify-content: space-between;
          font-size: px2rem(3.5);
          align-items: center;
          padding: 0 px2rem(4);
          box-sizing: border-box;
          color: #fff;
          img {
            width: px2rem(3);
            height: px2rem(3);
          }
        }
        &-body {
          margin: px2rem(6) px2rem(4);
          display: flex;
          align-items: center;
          font-size: px2rem(4);
          .el-select {
            width: px2rem(55);
          }
        }
        &-footer {
          display: flex;
          justify-content: space-around;
          button {
            padding: px2rem(1) px2rem(4);
            border: 1px solid #616789;
            border-radius: px2rem(1);
          }
          :nth-child(1) {
            color: #616789;
            background-color: #fff;
          }
          :nth-child(2) {
            color: #ffffff;
            background-color: #616789;
          }
        }
      }
    }

    &-confirm {
      position: fixed;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.4);
      &-box {
        position: absolute;
        background-color: #ffffff;
        width: px2rem(100);
        height: px2rem(40);
        top: 45%;
        left: 45%;
        transform: translate(-50%, -50%);
        border-radius: px2rem(2);
        &-header {
          height: px2rem(10);
          background-color: #616789;
          display: flex;
          justify-content: space-between;
          font-size: px2rem(3.5);
          align-items: center;
          padding: 0 px2rem(4);
          box-sizing: border-box;
          color: #fff;
          img {
            width: px2rem(3);
            height: px2rem(3);
          }
        }
        &-body {
          margin: px2rem(6) px2rem(4);
          display: flex;
          align-items: center;
          font-size: px2rem(4);
          .el-select {
            width: px2rem(55);
          }
        }
        &-footer {
          display: flex;
          justify-content: space-around;
          button {
            padding: px2rem(1) px2rem(4);
            border: 1px solid #616789;
            border-radius: px2rem(1);
          }
          :nth-child(1) {
            color: #616789;
            background-color: #fff;
          }
          :nth-child(2) {
            color: #ffffff;
            background-color: #616789;
          }
        }
      }
    }
  }
}
</style>
