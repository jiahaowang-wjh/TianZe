<!--  -->
<template>
  <div class="add-report">
    <div class="add-report-title">
      <span class="add-report-title-go1">我的债行</span>
      <span class="add-report-title-separator">/</span>
      <span class="add-report-title-go2">新增录入</span>
    </div>
    <div class="add-report-container">
      <div class="add-report-container-form">
        <el-collapse :value="collapseActive">
          <!-- 债务人基本信息登记表 -->
          <el-collapse-item title="债事人基本信息登记表" name="1">
            <!-- 第一行表单 -->
            <div class="add-report-container-form-first">
              <div class="add-report-container-form-first-item">
                <span>债事人是否配合：</span>
                <el-select v-model="ReportIscoordinate" placeholder="是" @change="GetIsCoordinate">
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </div>
              <div class="add-report-container-form-first-item">
                <span>类型：</span>
                <el-select v-model="reportType" placeholder="债务人" @change="GetReportType">
                  <el-option label="债权人" value="1"></el-option>
                  <el-option label="债务人" value="2"></el-option>
                  <el-option label="债权债务人" value="3"></el-option>
                </el-select>
              </div>
              <div class="add-report-container-form-first-item">
                <span>性质：</span>
                <el-select v-model="ReporterProperties" placeholder="个人">
                  <el-option label="个人" value="person"></el-option>
                  <el-option label="企业" value="business"></el-option>
                  <el-option label="银行" value="bank"></el-option>
                </el-select>
              </div>
            </div>
            <!-- 个人 -->
            <template v-if="ReporterProperties === 'person'">
              <h3>个人:</h3>
              <div class="add-report-container-form-person-item-1">
                <div>
                  <span>是否从业：</span>
                  <el-select placeholder="是" v-model="PersonalReportMsg.ifWork">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </div>
                <div>
                  <span>姓名：</span>
                  <el-input v-model="PersonalReportMsg.personalName"></el-input>
                </div>
                <div>
                  <span>手机号码：</span>
                  <el-input v-model="PersonalReportMsg.phone" v-input-num maxlength="11"></el-input>
                </div>
              </div>
              <div class="add-report-container-form-person-item-2">
                <div>
                  <span>身份证号码：</span>
                  <el-input v-model="PersonalReportMsg.IdCard" maxlength="20"></el-input>
                </div>
                <div>
                  <span>性别：</span>
                  <el-select v-model="PersonalReportMsg.sex" placeholder="男">
                    <el-option label="男" value="1"></el-option>
                    <el-option label="女" value="2"></el-option>
                  </el-select>
                </div>
                <div>
                  <span>所在地区：</span>
                  <el-input v-model="PersonalReportMsg.Area"></el-input>
                </div>
              </div>
              <div class="add-report-container-form-person-item-3">
                <div>
                  <span>电子邮箱：</span>
                  <el-input v-model="PersonalReportMsg.Email" maxlength="32"></el-input>
                </div>
                <div>
                  <span>资产总价值（元）：</span>
                  <el-input v-model="PersonalReportMsg.assets" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>资产项数：</span>
                  <el-input v-model="PersonalReportMsg.assetsNumber" maxlength="5" v-input-num></el-input>
                </div>
              </div>
              <div class="add-report-container-form-person-item-4">
                <span>可流通资产价值(元)：</span>
                <el-input
                  v-model="PersonalReportMsg.CirculationAssets"
                  maxlength="14"
                  v-input-num-2
                ></el-input>
              </div>
              <h3>上传身份证</h3>
              <div class="add-report-container-form-person-upload-idcard">
                <img
                  :src="PersonalReportMsg.cardJust ? PersonalReportMsg.cardJust: IDCardDefaultSrc.JustSrc"
                  @click="openImgToLink(PersonalReportMsg.cardJust)"
                  alt
                />
                <input
                  type="file"
                  @change="UpdateReportJustIDCard"
                  ref="PersonReportJustIdCard"
                  class="add-report-container-form-person-upload-idcard-just"
                  value="点击上传"
                />
                <button>点击上传</button>
                <img
                  :src="PersonalReportMsg.cardBack ? PersonalReportMsg.cardBack: IDCardDefaultSrc.BackSrc"
                  @click="openImgToLink(PersonalReportMsg.cardBack)"
                  alt
                />
                <input
                  type="file"
                  @change="UpdateReportBackIDCard"
                  ref="PersonReportBackIdCard"
                  class="add-report-container-form-person-upload-idcard-back"
                  value="点击上传"
                />
                <button>点击上传</button>
              </div>
              <div class="add-report-container-form-person-item-5">
                <div>
                  <span>债权(元)：</span>
                  <el-input v-model="PersonalReportMsg.obligatRight" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>债权笔数：</span>
                  <el-input v-model="PersonalReportMsg.obligatRightNo" maxlength="6" v-input-num></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions"
                    v-model="PersonalReportMsg.obligatTime"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="add-report-container-form-person-item-6">
                <div>
                  <span>本金：</span>
                  <el-input v-model="PersonalReportMsg.capital" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>利息：</span>
                  <el-input v-model="PersonalReportMsg.interest" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>利率：</span>
                  <el-input v-model="PersonalReportMsg.interestRate" maxlength="10" v-input-num-2></el-input>
                  <span>%</span>
                </div>
              </div>
              <div class="add-report-container-form-person-item-7">
                <div>
                  <span>债务(元)：</span>
                  <el-input v-model="PersonalReportMsg.debt" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>债务笔数：</span>
                  <el-input v-model="PersonalReportMsg.debtNo" maxlength="10" v-input-num></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions"
                    v-model="PersonalReportMsg.debtTime"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="add-report-container-form-person-item-8">
                <span>债事凭证：</span>
                <el-input v-model="PersonalReportMsg.debtCertificate"></el-input>
              </div>
              <div class="add-report-container-form-person-update-imgs">
                <span>上传债事凭证：</span>
                <div class="add-report-container-form-person-update-imgs-list">
                  <img
                    v-for="(item,index) in PersonalReportMsg.uploadDebtCertificate"
                    :key="index"
                    @click="openImgToLink(item)"
                    :src="item"
                    alt
                  />
                </div>
                <input
                  type="file"
                  @change="UpdateReportVoucher"
                  ref="PersonReportVoucher"
                  class="add-report-container-form-person-update-imgs-form"
                  value="点击上传"
                />
                <button>点击上传</button>
              </div>
              <div class="add-report-container-form-person-lawsuit">
                <span>是否诉讼及结果：</span>
                <textarea v-model="PersonalReportMsg.isResult"></textarea>
              </div>
              <div class="add-report-container-form-person-economic">
                <span>目前经济情况：</span>
                <textarea v-model="PersonalReportMsg.economics"></textarea>
              </div>
              <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
              <div class="add-report-container-form-person-item-9">
                <span>项目负责人：</span>
                <el-input v-model="PersonalReportMsg.prjectManager"></el-input>
              </div>
              <h3>实名认证：</h3>
              <div class="add-report-container-form-person-item-10">
                <div>
                  <span>姓名：</span>
                  <el-input
                    v-model="Certification[0].userName"
                    :disabled="this.IsReportPhoneCertification.Person"
                  ></el-input>
                </div>
                <div>
                  <span>身份证号码：</span>
                  <el-input
                    v-model="Certification[0].identifyNum"
                    :disabled="this.IsReportPhoneCertification.Person"
                  ></el-input>
                </div>
                <div>
                  <span>选择银行：</span>
                  <el-select
                    v-model="Certification[0].bank"
                    filterable
                    :disabled="this.IsReportPhoneCertification.Person"
                  >
                    <el-option
                      :label="item.text"
                      :value="item.text"
                      v-for="(item,index) in BankList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="add-report-container-form-person-item-11">
                <div>
                  <span>银行卡号：</span>
                  <el-input
                    v-model="Certification[0].bankCard"
                    :disabled="this.IsReportPhoneCertification.Person"
                    maxlength="28"
                    v-input-num
                  ></el-input>
                </div>
                <div>
                  <span>银行预留手机：</span>
                  <el-input
                    v-model="Certification[0].mobilePhone"
                    :disabled="this.IsReportPhoneCertification.Person"
                    v-input-num
                    maxlength="11"
                  ></el-input>
                </div>
                <div>
                  <span>手机验证码：</span>
                  <el-input
                    v-model="NoteCode[0].PersonReportNodeCode"
                    :disabled="!this.IsReportPhoneCertification.Person"
                    maxlength="4"
                  ></el-input>
                  <button @click="PhoneCheck">点击获取</button>
                </div>
              </div>
            </template>
            <!-- 企业 -->
            <template v-else-if="ReporterProperties === 'business'">
              <h3>企业:</h3>
              <div class="add-report-container-form-business-item-1">
                <div>
                  <span>企业名称：</span>
                  <el-input v-model="BusinessReportMsg.CompanyName"></el-input>
                </div>
                <div>
                  <span>社会统一信用代码：</span>
                  <el-input v-model="BusinessReportMsg.CreditCode" maxlength="19"></el-input>
                </div>
                <div>
                  <span>行业属性：</span>
                  <input v-model="BusinessReportMsg.industryAttributes" />
                </div>
              </div>
              <div class="add-report-container-form-business-item-2">
                <div>
                  <span>法定代表人名称：</span>
                  <el-input v-model="BusinessReportMsg.LegalName"></el-input>
                </div>
                <div>
                  <span>法定代表人联系电话：</span>
                  <el-input v-model="BusinessReportMsg.LegalPhone" maxlength="14"></el-input>
                </div>
                <div>
                  <span>法定代表人身份证号：</span>
                  <el-input v-model="BusinessReportMsg.LegalIdCard" maxlength="20"></el-input>
                </div>
              </div>
              <div class="add-report-container-form-business-item-3">
                <div>
                  <span>注册地址：</span>
                  <el-input v-model="BusinessReportMsg.address"></el-input>
                </div>
                <div>
                  <span>企业联系人：</span>
                  <input v-model="BusinessReportMsg.ContactPerson" />
                </div>
                <div>
                  <span>联系电话：</span>
                  <el-input v-model="BusinessReportMsg.ContactPhone" maxlength="14"></el-input>
                </div>
              </div>
              <h3>上传身份证</h3>
              <div class="add-report-container-form-business-upload-idcard">
                <img
                  :src="BusinessReportMsg.cardJust ? BusinessReportMsg.cardJust: IDCardDefaultSrc.JustSrc"
                  @click="openImgToLink(BusinessReportMsg.cardJust)"
                  alt
                />
                <input
                  type="file"
                  @change="UpdateReportJustIDCard"
                  ref="BusinessReportJustIdCard"
                  class="add-report-container-form-business-upload-idcard-just"
                  value="点击上传"
                />
                <button>点击上传</button>
                <img
                  :src="BusinessReportMsg.cardBack ? BusinessReportMsg.cardBack: IDCardDefaultSrc.BackSrc"
                  @click="openImgToLink(BusinessReportMsg.cardBack)"
                  alt
                />
                <input
                  type="file"
                  @change="UpdateReportBackIDCard"
                  ref="BusinessReportBackIdCard"
                  class="add-report-container-form-business-upload-idcard-back"
                  value="点击上传"
                />
                <button>点击上传</button>
              </div>
              <div class="add-report-container-form-business-item-5">
                <div>
                  <span>债权(元)：</span>
                  <el-input v-model="BusinessReportMsg.obligatRight" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>债权笔数：</span>
                  <el-input v-model="BusinessReportMsg.obligatRightNo" maxlength="10" v-input-num></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions"
                    v-model="BusinessReportMsg.obligatTime"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="add-report-container-form-business-item-6">
                <div>
                  <span>本金：</span>
                  <el-input v-model="BusinessReportMsg.capital" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>利息：</span>
                  <el-input v-model="BusinessReportMsg.interest" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>利率：</span>
                  <el-input v-model="BusinessReportMsg.interestRate" maxlength="6" v-input-num-2></el-input>
                  <span>%</span>
                </div>
              </div>
              <div class="add-report-container-form-business-item-7">
                <div>
                  <span>债务(元)：</span>
                  <el-input v-model="BusinessReportMsg.debt" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>债务笔数：</span>
                  <el-input v-model="BusinessReportMsg.debtNo" maxlength="10" v-input-num></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions"
                    v-model="BusinessReportMsg.debtTime"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="add-report-container-form-business-item-8">
                <span>债事凭证：</span>
                <el-input v-model="BusinessReportMsg.debtCertificate"></el-input>
              </div>
              <div class="add-report-container-form-business-update-imgs">
                <span>上传债事凭证：</span>
                <div class="add-report-container-form-person-update-imgs-list">
                  <img
                    v-for="(item,index) in BusinessReportMsg.uploadDebtCertificate"
                    @click="openImgToLink(item)"
                    :key="index"
                    :src="item"
                    alt
                  />
                </div>
                <input
                  type="file"
                  @change="UpdateReportVoucher"
                  ref="BusinessReportVoucher"
                  class="add-report-container-form-business-update-imgs-form"
                  value="点击上传"
                />
                <button>点击上传</button>
              </div>
              <div class="add-report-container-form-business-lawsuit">
                <span>是否诉讼及结果：</span>
                <textarea v-model="BusinessReportMsg.isResult"></textarea>
              </div>
              <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
              <div class="add-report-container-form-business-item-9">
                <span>项目负责人：</span>
                <el-input v-model="BusinessReportMsg.prjectManager"></el-input>
              </div>
              <h3>实名认证：</h3>
              <div class="add-report-container-form-business-item-10">
                <div>
                  <span>姓名：</span>
                  <input
                    v-model="Certification[1].userName"
                    :disabled="IsReportPhoneCertification.Business"
                  />
                </div>
                <div>
                  <span>身份证号码：</span>
                  <input
                    v-model="Certification[1].identifyNum"
                    :disabled="IsReportPhoneCertification.Business"
                    maxlength="20"
                  />
                </div>
                <div>
                  <span>选择银行：</span>
                  <el-select
                    v-model="Certification[1].bank"
                    filterable
                    :disabled="IsReportPhoneCertification.Business"
                  >
                    <el-option
                      :label="item.text"
                      :value="item.text"
                      v-for="(item,index) in BankList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="add-report-container-form-business-item-11">
                <div>
                  <span>银行卡号：</span>
                  <el-input
                    v-model="Certification[1].bankCard"
                    :disabled="IsReportPhoneCertification.Business"
                    maxlength="28"
                    v-input-num
                  ></el-input>
                </div>
                <div>
                  <span>银行预留手机：</span>
                  <el-input
                    v-model="Certification[1].mobilePhone"
                    :disabled="IsReportPhoneCertification.Business"
                    v-input-num
                    maxlength="11"
                  ></el-input>
                </div>
                <div>
                  <span>手机验证码：</span>
                  <el-input
                    v-model="NoteCode[0].BusinessReportNodeCode"
                    :disabled="!IsReportPhoneCertification.Business"
                    maxlength="4"
                  ></el-input>
                  <button @click="PhoneCheck">点击获取</button>
                </div>
              </div>
            </template>
            <!-- 银行 -->
            <template v-else>
              <h3>银行:</h3>
              <div class="add-report-container-form-bank-item-1">
                <div>
                  <span>企业名称：</span>
                  <el-input v-model="BankReportMsg.CompanyName"></el-input>
                </div>
                <div>
                  <span>社会统一信用代码：</span>
                  <el-input v-model="BankReportMsg.CreditCode" maxlength="19"></el-input>
                </div>
                <div>
                  <span>行业属性：</span>
                  <input v-model="BankReportMsg.industryAttributes" />
                </div>
              </div>
              <div class="add-report-container-form-bank-item-2">
                <div>
                  <span>法定代表人名称：</span>
                  <input v-model="BankReportMsg.LegalName" />
                </div>
                <div>
                  <span>法定代表人联系电话：</span>
                  <el-input v-model="BankReportMsg.LegalPhone" maxlength="14"></el-input>
                </div>
                <div>
                  <span>法定代表人身份证号：</span>
                  <el-input v-model="BankReportMsg.LegalIdCard" maxlength="20"></el-input>
                </div>
              </div>
              <div class="add-report-container-form-bank-item-3">
                <div>
                  <span>注册地址：</span>
                  <el-input v-model="BankReportMsg.address"></el-input>
                </div>
                <div>
                  <span>企业联系人：</span>
                  <input v-model="BankReportMsg.ContactPerson" />
                </div>
                <div>
                  <span>联系电话：</span>
                  <el-input v-model="BankReportMsg.ContactPhone" maxlength="14"></el-input>
                </div>
              </div>
              <div class="add-report-container-form-bank-item-5">
                <div>
                  <span>债权(元)：</span>
                  <el-input v-model="BankReportMsg.obligatRight" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>债权笔数：</span>
                  <el-input v-model="BankReportMsg.obligatRightNo" maxlength="10" v-input-num></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions"
                    v-model="BankReportMsg.obligatTime"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="add-report-container-form-bank-item-6">
                <div>
                  <span>本金：</span>
                  <el-input v-model="BankReportMsg.capital" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>利息：</span>
                  <el-input v-model="BankReportMsg.interest" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>利率：</span>
                  <el-input v-model="BankReportMsg.interestRate" maxlength="6"></el-input>
                  <span>%</span>
                </div>
              </div>
              <div class="add-report-container-form-bank-item-7">
                <div>
                  <span>债务(元)：</span>
                  <el-input v-model="BankReportMsg.debt" maxlength="14" v-input-num-2></el-input>
                </div>
                <div>
                  <span>债务笔数：</span>
                  <el-input v-model="BankReportMsg.debtNo" maxlength="10" v-input-num></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-date-picker
                    align="left"
                    type="date"
                    placeholder="请选择日期"
                    :picker-options="pickerOptions"
                    v-model="BankReportMsg.debtTime"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </div>
              </div>
              <div class="add-report-container-form-bank-item-8">
                <span>债事凭证：</span>
                <el-input v-model="BankReportMsg.debtCertificate"></el-input>
              </div>
              <div class="add-report-container-form-bank-update-imgs">
                <span>上传债事凭证：</span>
                <div class="add-report-container-form-person-update-imgs-list">
                  <img
                    v-for="(item,index) in BankReportMsg.uploadDebtCertificate"
                    :key="index"
                    :src="item"
                    @click="openImgToLink(item)"
                    alt
                  />
                </div>
                <input
                  type="file"
                  @change="UpdateReportVoucher"
                  ref="BankReportVoucher"
                  class="add-report-container-form-bank-update-imgs-form"
                  value="点击上传"
                />
                <button>点击上传</button>
              </div>
              <div class="add-report-container-form-bank-lawsuit">
                <span>是否诉讼及结果：</span>
                <textarea></textarea>
              </div>
              <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
              <div class="add-report-container-form-bank-item-9">
                <span>项目负责人：</span>
                <el-input v-model="BankReportMsg.prjectManager"></el-input>
              </div>
            </template>
            <div class="add-report-container-form-person-button">
              <button @click="SendReporterData" :disabled="HasSubmitDebt">确认</button>
            </div>
          </el-collapse-item>
          <!-- 相对人基本信息表 -->
          <el-collapse-item title="相对人基本信息表" name="2" >  <!-- v-show="ResponseReportId" -->
            <div class="add-report-container-relative">
              <div class="add-report-container-relative-add-button">
                <button @click='ClearRelativeForm'>新增相对人</button>
                <button
                  style="margin-letf:20px"
                  v-if="RelativeList.length"
                  @click="()=>{ 
                                     $message.success('已提交至总公司！')
                                     }"
                >提交至总公司</button>
              </div>
              <div class="add-report-container-relative-list-title">
                <span>序号</span>
                <span>相对人</span>
                <span>债事类型</span>
                <span>债事性质</span>
                <span>联系电话</span>
                <span>操作</span>
              </div>
              <div class="add-report-container-relative-list">
                <div
                  class="add-report-container-relative-list-item"
                  v-for="(item,index) in RelativeList"
                  :key="item.id"
                >
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
              <h3>相对人信息登记表</h3>
              <!-- 第一行表单 -->
              <div class="add-report-container-relative-form-first">
                <div class="add-report-container-form-first-item">
                  <span>债事人是否配合：</span>
                  <el-select
                    v-model="RelativeIscoordinate"
                    placeholder="是"
                    @change="GetRelativeIscoordinate"
                  >
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </div>
                <div class="add-report-container-form-first-item">
                  <span>类型：</span>

                  <el-select v-model="RelativeType" placeholder="债务人" @change="GetRelativeType">
                    <el-option label="债权人" value="1"></el-option>
                    <el-option label="债务人" value="2"></el-option>
                  </el-select>
                </div>
                <div class="add-report-container-form-first-item">
                  <span>性质：</span>
                  <el-select v-model="RelativeProperties" placeholder="个人">
                    <el-option label="个人" value="person"></el-option>
                    <el-option label="企业" value="business"></el-option>
                    <el-option label="银行" value="bank"></el-option>
                  </el-select>
                </div>
              </div>
              <!-- 个人 -->
              <template v-if="RelativeProperties === 'person'">
                <h3>个人:</h3>
                <div class="add-report-container-relative-form-person-item-1">
                  <div>
                    <span>是否从业：</span>
                    <el-select v-model="PersonalRelativeMsg.ifWork" placeholder="是">
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="2"></el-option>
                    </el-select>
                  </div>
                  <div>
                    <span>姓名：</span>
                    <el-input v-model="PersonalRelativeMsg.personalName"></el-input>
                  </div>
                  <div>
                    <span>手机号码：</span>
                    <el-input v-model="PersonalRelativeMsg.phone" v-input-num maxlength="11"></el-input>
                  </div>
                </div>
                <div class="add-report-container-relative-form-person-item-2">
                  <div>
                    <span>身份证号码：</span>
                    <el-input v-model="PersonalRelativeMsg.IdCard" maxlength="20"></el-input>
                  </div>
                  <div>
                    <span>性别：</span>
                    <el-select v-model="PersonalRelativeMsg.sex" placeholder="男">
                      <el-option label="男" value="1"></el-option>
                      <el-option label="女" value="2"></el-option>
                    </el-select>
                  </div>
                  <div>
                    <span>所在地区：</span>
                    <el-input v-model="PersonalRelativeMsg.Area"></el-input>
                  </div>
                </div>
                <div class="add-report-container-relative-form-person-item-3">
                  <div>
                    <span>电子邮箱：</span>
                    <el-input v-model="PersonalRelativeMsg.Email" maxlength="32"></el-input>
                  </div>
                  <div>
                    <span>资产总价值（元）：</span>
                    <el-input v-model="PersonalRelativeMsg.assets" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>资产项数：</span>
                    <el-input v-model="PersonalRelativeMsg.assetsNumber" maxlength="10" v-input-num></el-input>
                  </div>
                </div>
                <div class="add-report-container-relative-form-person-item-4">
                  <span>可流通资产价值(元)：</span>
                  <el-input
                    v-model="PersonalRelativeMsg.CirculationAssets"
                    maxlength="14"
                    v-input-num-2
                  ></el-input>
                </div>
                <h3>上传身份证</h3>
                <div class="add-report-container-relative-form-person-upload-idcard">
                  <img
                    :src="PersonalRelativeMsg.cardJust ? PersonalRelativeMsg.cardJust: IDCardDefaultSrc.JustSrc"
                    @click="openImgToLink(PersonalRelativeMsg.cardJust)"
                    alt
                  />
                  <input
                    type="file"
                    @change="UpdateRelativeJustIDCard"
                    ref="PersonRelativeJustIdCard"
                    class="add-report-container-relative-form-person-upload-idcard-just"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                  <img
                    :src="PersonalRelativeMsg.cardBack ? PersonalRelativeMsg.cardBack: IDCardDefaultSrc.BackSrc"
                    @click="openImgToLink(PersonalRelativeMsg.cardBack)"
                    alt
                  />
                  <input
                    type="file"
                    @change="UpdateRelativeBackIDCard"
                    ref="PersonRelativeBackIdCard"
                    class="add-report-container-relative-form-person-upload-idcard-back"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                </div>
                <div class="add-report-container-relative-form-person-item-5">
                  <div>
                    <span>债权(元)：</span>
                    <el-input
                      v-model="PersonalRelativeMsg.obligatRight"
                      maxlength="14"
                      v-input-num-2
                    ></el-input>
                  </div>
                  <div>
                    <span>债权笔数：</span>
                    <el-input
                      v-model="PersonalRelativeMsg.obligatRightNo"
                      maxlength="10"
                      v-input-num
                    ></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-date-picker
                      align="left"
                      type="date"
                      placeholder="请选择日期"
                      :picker-options="pickerOptions"
                      v-model="PersonalRelativeMsg.obligatTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <div class="add-report-container-relative-form-person-item-6">
                  <div>
                    <span>本金：</span>
                    <el-input v-model="PersonalRelativeMsg.capital" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>利息：</span>
                    <el-input v-model="PersonalRelativeMsg.interest" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>利率：</span>
                    <el-input v-model="PersonalRelativeMsg.interestRate" maxlength="6"></el-input>
                    <span>%</span>
                  </div>
                </div>
                <div class="add-report-container-relative-form-person-item-7">
                  <div>
                    <span>债务(元)：</span>
                    <el-input v-model="PersonalRelativeMsg.debt" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>债务笔数：</span>
                    <el-input v-model="PersonalRelativeMsg.debtNo" maxlength="10" v-input-num></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-date-picker
                      align="left"
                      type="date"
                      placeholder="请选择日期"
                      :picker-options="pickerOptions"
                      v-model="PersonalRelativeMsg.debtTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <div class="add-report-container-relative-form-person-item-8">
                  <span>债事凭证：</span>
                  <el-input v-model="PersonalRelativeMsg.debtCertificate"></el-input>
                </div>
                <div class="add-report-container-relative-form-person-update-imgs">
                  <span>上传债事凭证：</span>
                  <div class="add-report-container-form-person-update-imgs-list">
                    <img
                      v-for="(item,index) in PersonalRelativeMsg.uploadDebtCertificate"
                      :key="index"
                      @click="openImgToLink(item)"
                      :src="item"
                      alt
                    />
                  </div>
                  <input
                    type="file"
                    @change="UpdateRelativeVoucher"
                    ref="PersonRelativeVoucher"
                    class="add-report-container-form-business-update-imgs-form"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                </div>
                <div class="add-report-container-relative-form-person-lawsuit">
                  <span>是负债资金使用用途：</span>
                  <textarea v-model="PersonalRelativeMsg.usage"></textarea>
                </div>
                <div class="add-report-container-relative-form-person-economic">
                  <span>目前经济情况：</span>
                  <textarea v-model="PersonalRelativeMsg.economics"></textarea>
                </div>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <div class="add-report-container-form-person-item-9">
                  <span>项目负责人：</span>
                  <el-input v-model="PersonalRelativeMsg.prjectManager"></el-input>
                </div>
              </template>
              <!-- 企业 -->
              <template v-else-if="RelativeProperties === 'business'">
                <h3>企业:</h3>
                <div class="add-report-container-relative-form-business-item-1">
                  <div>
                    <span>企业名称：</span>
                    <el-input v-model="BusinessRelativeMsg.CompanyName"></el-input>
                  </div>
                  <div>
                    <span>社会统一信用代码：</span>
                    <el-input v-model="BusinessRelativeMsg.CreditCode" maxlength="19"></el-input>
                  </div>
                  <div>
                    <span>行业属性：</span>
                    <input v-model="BusinessRelativeMsg.industryAttributes" />
                  </div>
                </div>
                <div class="add-report-container-relative-form-business-item-2">
                  <div>
                    <span>法定代表人名称：</span>
                    <el-input v-model="BusinessRelativeMsg.LegalName"></el-input>
                  </div>
                  <div>
                    <span>法定代表人联系电话：</span>
                    <el-input v-model="BusinessRelativeMsg.LegalPhone" maxlength="14"></el-input>
                  </div>
                  <div>
                    <span>法定代表人身份证号：</span>
                    <el-input v-model="BusinessRelativeMsg.LegalIdCard" maxlength="20"></el-input>
                  </div>
                </div>
                <div class="add-report-container-relative-form-business-item-3">
                  <div>
                    <span>注册地址：</span>
                    <el-input v-model="BusinessRelativeMsg.address"></el-input>
                  </div>
                  <div>
                    <span>企业联系人：</span>
                    <input v-model="BusinessRelativeMsg.ContactPerson" />
                  </div>
                  <div>
                    <span>联系电话：</span>
                    <el-input v-model="BusinessRelativeMsg.ContactPhone" maxlength="14"></el-input>
                  </div>
                </div>
                <h3>上传身份证</h3>
                <div class="add-report-container-relative-form-business-upload-idcard">
                  <img
                    :src="BusinessRelativeMsg.cardJust ? BusinessRelativeMsg.cardJust: IDCardDefaultSrc.JustSrc"
                    @click="openImgToLink(BusinessRelativeMsg.cardJust)"
                    alt
                  />
                  <input
                    type="file"
                    @change="UpdateRelativeJustIDCard"
                    ref="BusinessRelativeJustIdCard"
                    class="add-report-container-relative-form-business-upload-idcard-just"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                  <img
                    :src="BusinessRelativeMsg.cardBack ? BusinessRelativeMsg.cardBack: IDCardDefaultSrc.BackSrc"
                    @click="openImgToLink(BusinessRelativeMsg.cardBack)"
                    alt
                  />
                  <input
                    type="file"
                    @change="UpdateRelativeBackIDCard"
                    ref="BusinessRelativeBackIdCard"
                    class="add-report-container-relative-form-business-upload-idcard-back"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                </div>
                <div class="add-report-container-relative-form-business-item-5">
                  <div>
                    <span>债权(元)：</span>
                    <el-input
                      v-model="BusinessRelativeMsg.obligatRight"
                      maxlength="14"
                      v-input-num-2
                    ></el-input>
                  </div>
                  <div>
                    <span>债权笔数：</span>
                    <el-input
                      v-model="BusinessRelativeMsg.obligatRightNo"
                      maxlength="10"
                      v-input-num
                    ></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-date-picker
                      align="left"
                      type="date"
                      placeholder="请选择日期"
                      :picker-options="pickerOptions"
                      v-model="BusinessRelativeMsg.obligatTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <div class="add-report-container-relative-form-business-item-6">
                  <div>
                    <span>本金：</span>
                    <el-input v-model="BusinessRelativeMsg.capital" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>利息：</span>
                    <el-input v-model="BusinessRelativeMsg.interest" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>利率：</span>
                    <el-input
                      v-model="BusinessRelativeMsg.interestRate"
                      maxlength="6"
                      v-input-num-2
                    ></el-input>
                    <span>%</span>
                  </div>
                </div>
                <div class="add-report-container-relative-form-business-item-7">
                  <div>
                    <span>债务(元)：</span>
                    <el-input v-model="BusinessRelativeMsg.debt" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>债务笔数：</span>
                    <el-input v-model="BusinessRelativeMsg.debtNo" maxlength="10" v-input-num></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-date-picker
                      align="left"
                      type="date"
                      placeholder="请选择日期"
                      :picker-options="pickerOptions"
                      v-model="BusinessRelativeMsg.debtTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <div class="add-report-container-relative-form-business-item-8">
                  <span>债事凭证：</span>
                  <el-input v-model="BusinessRelativeMsg.debtCertificate"></el-input>
                </div>
                <div class="add-report-container-relative-form-business-update-imgs">
                  <span>上传债事凭证：</span>
                  <div class="add-report-container-form-person-update-imgs-list">
                    <img
                      v-for="(item,index) in BusinessRelativeMsg.uploadDebtCertificate"
                      :key="index"
                      @click="openImgToLink(item)"
                      :src="item"
                      alt
                    />
                  </div>
                  <input
                    type="file"
                    @change="UpdateRelativeVoucher"
                    ref="BusinessRelativeVoucher"
                    class="add-report-container-form-business-update-imgs-form"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                </div>
                <div class="add-report-container-relative-form-business-lawsuit">
                  <span>是负债资金使用用途：</span>
                  <textarea v-model="BusinessRelativeMsg.usage"></textarea>
                </div>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <div class="add-report-container-relative-form-business-item-9">
                  <span>项目负责人：</span>
                  <el-input v-model="BusinessRelativeMsg.prjectManager"></el-input>
                </div>
              </template>
              <!-- 银行 -->
              <template v-else>
                <h3>银行:</h3>
                <div class="add-report-container-relative-form-bank-item-1">
                  <div>
                    <span>企业名称：</span>
                    <el-input v-model="BankRelativeMsg.CompanyName"></el-input>
                  </div>
                  <div>
                    <span>社会统一信用代码：</span>
                    <el-input v-model="BankRelativeMsg.CreditCode" maxlength="19"></el-input>
                  </div>
                  <div>
                    <span>行业属性：</span>
                    <input v-model="BankRelativeMsg.industryAttributes" />
                  </div>
                </div>
                <div class="add-report-container-relative-form-bank-item-2">
                  <div>
                    <span>法定代表人名称：</span>
                    <el-input v-model="BankRelativeMsg.LegalName"></el-input>
                  </div>
                  <div>
                    <span>法定代表人联系电话：</span>
                    <el-input v-model="BankRelativeMsg.LegalPhone" maxlength="14"></el-input>
                  </div>
                  <div>
                    <span>法定代表人身份证号：</span>
                    <el-input v-model="BankRelativeMsg.LegalIdCard" maxlength="20"></el-input>
                  </div>
                </div>
                <div class="add-report-container-relative-form-bank-item-3">
                  <div>
                    <span>注册地址：</span>
                    <input v-model="BankRelativeMsg.address" />
                  </div>
                  <div>
                    <span>企业联系人：</span>
                    <input v-model="BankRelativeMsg.ContactPerson" />
                  </div>
                  <div>
                    <span>联系电话：</span>
                    <input v-model="BankRelativeMsg.ContactPhone" maxlength="14" />
                  </div>
                </div>
                <div class="add-report-container-relative-form-bank-item-5">
                  <div>
                    <span>债权(元)：</span>
                    <el-input v-model="BankRelativeMsg.obligatRight" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>债权笔数：</span>
                    <el-input v-model="BankRelativeMsg.obligatRightNo" maxlength="10" v-input-num></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-date-picker
                      align="left"
                      type="date"
                      placeholder="请选择日期"
                      :picker-options="pickerOptions"
                      v-model="BankRelativeMsg.obligatTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <div class="add-report-container-relative-form-bank-item-6">
                  <div>
                    <span>本金：</span>
                    <el-input v-model="BankRelativeMsg.capital" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>利息：</span>
                    <el-input v-model="BankRelativeMsg.interest" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>利率：</span>
                    <el-input v-model="BankRelativeMsg.interestRate" maxlength="6" v-input-num-2></el-input>
                    <span>%</span>
                  </div>
                </div>
                <div class="add-report-container-relative-form-bank-item-7">
                  <div>
                    <span>债务(元)：</span>
                    <el-input v-model="BankRelativeMsg.debt" maxlength="14" v-input-num-2></el-input>
                  </div>
                  <div>
                    <span>债务笔数：</span>
                    <el-input v-model="BankRelativeMsg.debtNo" maxlength="10" v-input-num></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-date-picker
                      align="left"
                      type="date"
                      placeholder="请选择日期"
                      :picker-options="pickerOptions"
                      v-model="BankRelativeMsg.debtTime"
                      value-format="yyyy-MM-dd"
                    ></el-date-picker>
                  </div>
                </div>
                <div class="add-report-container-relative-form-bank-item-8">
                  <span>债事凭证：</span>
                  <el-input v-model="BankRelativeMsg.debtCertificate"></el-input>
                </div>
                <div class="add-report-container-relative-form-bank-update-imgs">
                  <span>上传债事凭证：</span>
                  <div class="add-report-container-form-person-update-imgs-list">
                    <img
                      v-for="(item,index) in BankRelativeMsg.uploadDebtCertificate"
                      :key="index"
                      @click="openImgToLink(item)"
                      :src="item"
                      alt
                    />
                  </div>
                  <input
                    type="file"
                    @change="UpdateRelativeVoucher"
                    ref="BankRelativeVoucher"
                    class="add-report-container-form-business-update-imgs-form"
                    value="点击上传"
                  />
                  <button>点击上传</button>
                </div>
                <div class="add-report-container-relative-form-bank-lawsuit">
                  <span>是负债资金使用用途：</span>
                  <textarea v-model="BankRelativeMsg.usage"></textarea>
                </div>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <div class="add-report-container-relative-form-bank-item-9">
                  <span>项目负责人：</span>
                  <el-input v-model="BankRelativeMsg.prjectManager"></el-input>
                </div>
              </template>
              <div class="add-report-container-form-person-button">
                <button @click="SendRelativeData">确认</button>
              </div>
            </div>
          </el-collapse-item>
          <!-- 债市链 -->
          <el-collapse-item title="债事链" name="3" v-show="false">
            <!-- <el-collapse-item title="债事链" name="3" v-show='ResponseReportId'> -->
            <div class="add-report-container-debt-chain">
              <img src="@imgs/home/DebtChain.png" alt class="add-report-container-debt-chain-img" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- 选择推荐人 -->
    <div class="add-report-pop-recommond" v-if="IsPopRecommond">
      <div class="add-report-pop-recommond-box">
        <div class="add-report-pop-recommond-box-header">
          <span>提示</span>
          <img src="@imgs/other/error@2x.png" alt @click="CloseRecommond" />
        </div>
        <div class="add-report-pop-recommond-box-body">
          选择录入推荐人：
          <el-select v-model="ReferrerName" @change="getValue">
            <el-option
              v-for="(item,index) in Referrer"
              :key="index"
              :label="item.personName"
              :value="index"
            ></el-option>
          </el-select>
        </div>
        <div class="add-report-pop-recommond-box-footer">
          <button @click="CloseRecommond">取消</button>
          <button @click="SelectRecommonder">确认</button>
        </div>
      </div>
    </div>
    <!-- 提交时用户确认按钮 -->
    <div class="add-report-pop-confirm" v-if="IsUserConfirm">
      <div class="add-report-pop-confirm-box">
        <div class="add-report-pop-confirm-box-header">
          <span>提示</span>
          <img src="@imgs/other/error@2x.png" alt @click="CloseConfirm" />
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
  data() {
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
        BackSrc: require('@imgs/home/IDcard-back.png'),
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
        Area: '',
        // 邮箱
        Email: '',
        // 资产总价值(私人性质)
        assets: '',
        // 资产项数(私人性质)
        assetsNumber: '',
        // 可流通资产价值(私人性质)
        CirculationAssets: '',
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
        telCheck: '',
      },

      // 企业报备信息源
      BusinessReportMsg: {
        // 公司ID
        companyId: '',
        // 推荐人ID
        userId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 企业名称
        CompanyName: '',
        // 社会统一信用代码
        CreditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        LegalName: '',
        // 法定代表人联系电话
        LegalPhone: '',
        // 法定代表人身份证号
        LegalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        ContactPerson: '',
        // 联系电话
        ContactPhone: '',
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
        telCheck: '',
      },
      // 银行报备信息源
      BankReportMsg: {
        // 公司ID
        companyId: '',
        // 推荐人ID
        userId: '',
        // 是否配合(1配合,2不配合)
        iscoordinate: '1',
        // 类型(1:债权人 2:债务人 3:债权债务人)
        reportType: '1',
        // 企业名称
        CompanyName: '',
        // 社会统一信用代码
        CreditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        LegalName: '',
        // 法定代表人联系电话
        LegalPhone: '',
        // 法定代表人身份证号
        LegalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        ContactPerson: '',
        // 联系电话
        ContactPhone: '',
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
        isResult: '1',
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
      },
      // 手机号码列表
      PhoneList: {
        PersonReportPhone: '',
        BusinessReportPhone: '',
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
        IdCard: '',
        // 性别
        sex: '1',
        // 所属地区
        Area: '',
        // 邮箱
        Email: '',
        // 资产总价值(私人性质)
        assets: '',
        // 资产项数(私人性质)
        assetsNumber: '',
        // 可流通资产价值(私人性质)
        CirculationAssets: '',
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
        usage: '',
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
        CompanyName: '',
        // 社会统一信用代码
        CreditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        LegalName: '',
        // 法定代表人联系电话
        LegalPhone: '',
        // 法定代表人身份证号
        LegalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        ContactPerson: '',
        // 联系电话
        ContactPhone: '',
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
        economics: '良好',
        agreementNo: '7969107472849373213',
        usage: '',
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
        CompanyName: '',
        // 社会统一信用代码
        CreditCode: '',
        // 行业属性
        industryAttributes: '',
        // 法定代表人名称
        LegalName: '',
        // 法定代表人联系电话
        LegalPhone: '',
        // 法定代表人身份证号
        LegalIdCard: '',
        // 注册地址
        address: '',
        // 企业联系人
        ContactPerson: '',
        // 联系电话
        ContactPhone: '',
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
        agreementNo: '7969107472849373213',
        usage: '',
      },
      // 相对人列表数据源
      RelativeList: [],
      // 保存报备发送了短信的电话号码
      SendReportPhoneNumber: '',
      // 手机验证码
      NoteCode: [
        {
          PersonReportNodeCode: '',
          BusinessReportNodeCode: '',
        },
        {
          PersonRelativeNodeCode: '',
          BusinessRelativeNodeCode: '',
        },
      ],
      // 实名验证信息源:
      Certification: [
        // 个人报备
        {
          identifyNum: '',
          mobilePhone: '',
          userName: '',
          bankCard: '',
          bank: '',
        },
        // 企业报备
        {
          identifyNum: '',
          mobilePhone: '',
          userName: '',
          bankCard: '',
          bank: '',
        },
      ],
      // 存储注册债务人获得reportId
      ResponseReportId: '',
      // 添加债事人是否通过实名验证标志
      IsPersonReportCertification: {
        Person: false,
        Business: false,
      },
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
      // 债事人是否通过短信验证
      IsReportPhoneCertification: {
        Person: false,
        Business: false,
      },
      BankList: BankList,
    }
  },
  methods: {
    // 关闭推荐人界面
    CloseRecommond() {
      // 退回主页
      // this.$message.error('请先选择推荐人')
      // this.$emit('onChangeFragment', 'Home')
      // this.IsPopRecommond = false
      this.$router.go(-1)
    },
    // 查询推荐人目录
    async SearchRecommonder() {
      const personType = '2'
      const formData = new FormData()
      formData.append('personType', personType)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubPersonController/selectByType',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.Referrer = result.data
    },
    // 确定选择推荐人页面
    SelectRecommonder() {
      // 未选择推荐人, 提示错误信息
      if (!this.PersonalReportMsg.userId) {
        return this.$message.error('请先选择推荐人')
      }
      // 选择成功, 关闭面板, 发送选择成功信息
      this.$message({
        message: '选择推荐人成功',
        type: 'success',
      })
      this.IsPopRecommond = false
      console.log(this.IsPopRecommond)
      this.$forceUpdate()
    },
    // 获取报备推荐人的index及推荐人ID
    getValue(index) {
      // 获取推荐人ID
      this.PersonalReportMsg.userId = this.Referrer[index].userId
      this.BusinessReportMsg.userId = this.Referrer[index].userId
      this.BankReportMsg.userId = this.Referrer[index].userId
    },
    // 获取债事人是否配合信息
    GetIsCoordinate(value) {
      this.PersonalReportMsg.iscoordinate = value
      this.BusinessReportMsg.iscoordinate = value
      this.BankReportMsg.iscoordinate = value
    },
    // 获取报备人类型
    GetReportType(value) {
      this.PersonalReportMsg.reportType = value
      this.BusinessReportMsg.reportType = value
      this.BankReportMsg.reportType = value
    },
    // 调用接口传入数据(个人,企业,银行)
    async SendReporterData() {
      if (this.ReporterProperties === 'person') {
        if (!this.IsReportPhoneCertification.Person)
          return this.$message.error('请先进行个人实名验证和短信验证')
      } else if (this.ReporterProperties === 'business') {
        // 如果是企业报备页面
        if (!this.IsReportPhoneCertification.Business)
          return this.$message.error('请先进行法定代表人实名验证和短信验证')
      }
      if (
        this.ReporterProperties === 'person' ||
        this.ReporterProperties === 'business'
      ) {
        let tel = ''
        if (this.ReporterProperties === 'person') {
          tel = this.Certification[0].mobilePhone
        } else {
          // 如果是企业报备页面
          tel = this.Certification[1].mobilePhone
        }
        let checkNo = ''
        if (this.ReporterProperties === 'person') {
          // 如果是个人报备
          checkNo = this.NoteCode[0].PersonReportNodeCode
        } else {
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
        if (result.resultCode !== '200') {
          return this.$message.error('短信验证码输入错误,请重新输入')
        }
        this.$message.success('实名验证成功')
      }
      // 报备信息登记
      let Responseresult = {}
      if (this.ReporterProperties === 'person') {
        // 用户个人报备
        // 是否个人实名验证信息
        if (!this.IsReportPhoneCertification.Person)
          return this.$message.error('请先进行个人实名验证和短信验证')
        this.PersonalReportMsg.companyId = window.sessionStorage.getItem(
          'companyId'
        )
        this.PersonalReportMsg.bank = this.Certification[0].bank
        this.PersonalReportMsg.bankCard = this.Certification[0].bankCard
        this.PersonalReportMsg.bankTel = this.Certification[0].mobilePhone
        this.PersonalReportMsg.telCheck = this.NoteCode[0].PersonReportNodeCode
        const formData = new FormData()
        for (const key in this.PersonalReportMsg) {
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
      } else if (this.ReporterProperties === 'business') {
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
        for (const key in this.BusinessReportMsg) {
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
      } else {
        // 当用户选择企业报备时
        this.BankReportMsg.companyId = window.sessionStorage.getItem(
          'companyId'
        )
        const formData = new FormData()
        for (const key in this.BankReportMsg) {
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
      if (Responseresult.resultCode !== '200') {
        return this.$message.error(Responseresult.resultMessage)
      }
      this.$message.success('债事人信息登记成功')
      this.ResponseReportId = Responseresult.data || ''
      this.HasSubmitDebt = true
      this.collapseActive = '2'
    },

    // 上传报备正面身份证
    async UpdateReportJustIDCard() {
      let file = {}
      if (this.ReporterProperties === 'person') {
        file = this.$refs.PersonReportJustIdCard.files[0]
      } else {
        file = this.$refs.BusinessReportJustIdCard.files[0]
      }
      this.$UpdateFile(file).then((result) => {
        if (this.ReporterProperties === 'person') {
          this.PersonalReportMsg.cardJust = result
        } else {
          this.BusinessReportMsg.cardJust = result
        }
      })
    },
    // 上传报备反面身份证
    async UpdateReportBackIDCard() {
      let file = {}
      if (this.ReporterProperties === 'person') {
        file = this.$refs.PersonReportBackIdCard.files[0]
      } else {
        file = this.$refs.BusinessReportBackIdCard.files[0]
      }
      this.$UpdateFile(file).then((result) => {
        if (this.ReporterProperties === 'person') {
          this.PersonalReportMsg.cardBack = result
        } else {
          this.BusinessReportMsg.cardBack = result
        }
      })
    },
    // 编辑相对人
    RelativeEdit(data) {
      this.RelativeMsg.uploadDebtCertificate = this.RelativeMsg.uploadDebtCertificate.split(
        ','
      )
      //相对人类型
      this.RelativeType = data.reportType
      //是否配合
      this.RelativeIscoordinate = data.iscoordinate

      // 性质
      if (data.reportPropert === '1') {
        this.RelativeProperties = 'person'
      } else if (data.reportPropert === '2') {
        this.RelativeProperties = 'business'
      } else {
        this.RelativeProperties = 'bank'
      }
      this.RelativeMsg = data
    },
    // 上传相对人正面身份证
    async UpdateRelativeJustIDCard() {
      let file = {}
      if (this.RelativeProperties === 'person') {
        file = this.$refs.PersonRelativeJustIdCard.files[0]
      } else {
        file = this.$refs.BusinessRelativeJustIdCard.files[0]
      }
      this.$UpdateFile(file).then((result) => {
        if (this.RelativeProperties === 'person') {
          this.PersonalRelativeMsg.cardJust = result
        } else {
          this.BusinessRelativeMsg.cardJust = result
        }
      })
    },
    // 上传相对人反面身份证
    async UpdateRelativeBackIDCard() {
      let file = {}
      if (this.RelativeProperties === 'person') {
        file = this.$refs.PersonRelativeBackIdCard.files[0]
      } else {
        file = this.$refs.BusinessRelativeBackIdCard.files[0]
      }
      this.$UpdateFile(file).then((result) => {
        if (this.RelativeProperties === 'person') {
          this.PersonalRelativeMsg.cardBack = result
        } else {
          this.BusinessRelativeMsg.cardBack = result
        }
      })
    },
    // 上传报备凭证
    UpdateReportVoucher() {
      let file = {}
      if (this.ReporterProperties === 'person') {
        file = this.$refs.PersonReportVoucher.files[0]
      } else if (this.ReporterProperties === 'business') {
        file = this.$refs.BusinessReportVoucher.files[0]
      } else {
        file = this.$refs.BankReportVoucher.files[0]
      }
      this.$UpdateFile(file).then((result) => {
        if (this.ReporterProperties === 'person') {
          this.PersonalReportMsg.uploadDebtCertificate.push(result)
        } else if (this.ReporterProperties === 'business') {
          this.BusinessReportMsg.uploadDebtCertificate.push(result)
        } else {
          this.BankReportMsg.uploadDebtCertificate.push(result)
        }
      })
    },
    // 上传相对人凭证
    UpdateRelativeVoucher() {
      let file = {}
      if (this.RelativeProperties === 'person') {
        file = this.$refs.PersonRelativeVoucher.files[0]
      } else if (this.RelativeProperties === 'business') {
        file = this.$refs.BusinessRelativeVoucher.files[0]
      } else {
        file = this.$refs.BankRelativeVoucher.files[0]
      }
      this.$UpdateFile(file).then((result) => {
        if (this.RelativeProperties === 'person') {
          this.PersonalRelativeMsg.uploadDebtCertificate.push(result)
        } else if (this.RelativeProperties === 'business') {
          this.BusinessRelativeMsg.uploadDebtCertificate.push(result)
        } else {
          this.BankRelativeMsg.uploadDebtCertificate.push(result)
        }
      })
    },
    // 实名认证和短信验证信息发送
    async PhoneCheck() {
      // 实名认证信息填写
      let RequestMsg = []
      if (this.ReporterProperties === 'person') {
        RequestMsg = this.Certification[0]
      } else {
        RequestMsg = this.Certification[1]
      }
      const CertificationformData = new FormData()
      for (const key in RequestMsg) {
        CertificationformData.append(key, RequestMsg[key])
      }
      const { data: Certificationresult } = await this.$http({
        method: 'post',
        url: '/api/api/safrv/safrvCheck',
        data: CertificationformData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (Certificationresult.resultCode !== '200') {
        return this.$message.error('实名认证错误, 请重新填写信息')
      }
      // 发送短信验证码
      let tel = ''
      if (this.ReporterProperties === 'person') {
        tel = this.Certification[0].mobilePhone
      } else {
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
          'Content-Type': 'multipart/form-data',
        },
      })
      if (result.resultCode === '200') {
        this.$message({
          message: '手机验证码发送成功, 请填写正确的验证码',
          type: 'success',
        })
        // 存储发送成功的电话号码
        this.SendReportPhoneNumber = tel
      }
      if (this.ReporterProperties === 'person') {
        this.IsReportPhoneCertification.Person = true
      } else {
        // 如果是企业报备页面
        this.IsReportPhoneCertification.Business = true
      }
    },
    // 查询相对人信息表
    async SearchCounterpartList() {
      const formData = new FormData()
      const reportId = this.ResponseReportId
      formData.append('reportId', reportId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busRelativePersonController/selectByRepId',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      // 数据处理
      this.RelativeList = result.data || []
    },
    // 获取相对人是否配合
    GetRelativeIscoordinate(value) {
      this.PersonalRelativeMsg.iscoordinate = value
      this.BusinessRelativeMsg.iscoordinate = value
      this.BankRelativeMsg.iscoordinate = value
    },
    // 获取相对人类型
    GetRelativeType(value) {
      this.PersonalRelativeMsg.reportType = value
      this.BusinessRelativeMsg.reportType = value
      this.BankRelativeMsg.reportType = value
    },
    //新增/修改相对人 传入相对人信息(个人, 企业, 银行)
    async SendRelativeData() {
      // if (!this.ResponseReportId) return this.$message.error('请先填写债务人信息')
      let Result = {}
      console.log(this.ResponseReportId)
      if (this.RelativeProperties === 'person') {
        // 个人用户
        this.PersonalRelativeMsg.reportId = this.ResponseReportId
        console.log(this.PersonalRelativeMsg)
        const formData = new FormData()
        for (const key in this.PersonalRelativeMsg) {
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
      } else if (this.RelativeProperties === 'business') {
        // 当用户选择企业报备时
        this.BusinessRelativeMsg.reportId = this.ResponseReportId
        console.log(this.BusinessRelativeMsg)
        const formData = new FormData()
        for (const key in this.BusinessRelativeMsg) {
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
      } else {
        this.BankRelativeMsg.reportId = this.ResponseReportId
        console.log(this.BankRelativeMsg)
        const formData = new FormData()
        for (const key in this.BankRelativeMsg) {
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
    },
    // 关闭提交页面
    CloseConfirm() {
      this.IsUserConfirm = false
    },
    // 确定提交按钮
    ConfirmSubmit() {
      this.IsUserConfirm = false
    },
    ClearRelativeForm () {
        for (const key in this.PersonalRelativeMsg) {
            this.PersonalRelativeMsg[key] = ''
            this.PersonalRelativeMsg.iscoordinate = '1'
            this.PersonalRelativeMsg.reportType = '1'
            this.PersonalRelativeMsg.sex = '1'
            this.PersonalRelativeMsg.ifWork = '1'
            this.PersonalRelativeMsg.reportId = this.ResponseReportId
            this.PersonalRelativeMsg.createUserId = window.sessionStorage.getItem('userId')
            this.PersonalRelativeMsg.usage = '1'
            this.PersonalRelativeMsg.uploadDebtCertificate = []
        }
        for (const key in this.BusinessRelativeMsg) {
            this.BusinessRelativeMsg[key] = ''
            this.BusinessRelativeMsg.reportId = this.ResponseReportId
            this.BusinessRelativeMsg.iscoordinate = '1'
            this.BusinessRelativeMsg.reportType = '1'
            this.BusinessRelativeMsg.createUserId = window.sessionStorage.getItem('userId')
            this.BusinessRelativeMsg.usage = '1'
            this.BusinessRelativeMsg.economics = '1'
            this.BusinessRelativeMsg.agreementNo = '111'
            this.BusinessRelativeMsg.uploadDebtCertificate = []
        }
        for (const key in this.BankRelativeMsg) {
            this.BankRelativeMsg[key] = ''
            this.BankRelativeMsg.reportId = this.ResponseReportId
            this.BankRelativeMsg.reportType = '1'
            this.BankRelativeMsg.usage = '1'
            this.BankRelativeMsg.iscoordinate = '1'
            this.BankRelativeMsg.createUserId = window.sessionStorage.getItem('userId')
            this.BankRelativeMsg.economics = '1'
            this.BankRelativeMsg.agreementNo = '111'
            this.BankRelativeMsg.uploadDebtCertificate = []
        }
    }
  },
  created() {
    // 查询推荐人信息
    this.SearchRecommonder()
    // this.SearchCounterpartList()
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.add-report {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  .el-date-editor {
    width: px2rem(67) !important;
  }
  input {
    width: px2rem(75);
    border: 1px solid #dcdfe6;
    border-radius: px2rem(1);
    box-sizing: border-box;
    color: #606266;
    height: px2rem(8) !important;
    line-height: px2rem(8) !important;
    font-size: px2rem(3.5) !important;
    padding: 0 px2rem(3) !important;
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
    &-form {
      height: 100%;
      background-color: #ffffff;
      margin: 0 px2rem(4);
      font-size: px2rem(3.2);
      padding: 0 px2rem(6);
      border-radius: px2rem(2);
      // 首行样式
      &-first {
        border-top: 1px solid #d9d9d9;
        padding-top: px2rem(3);
        display: flex;
        height: px2rem(10);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        .el-select {
            width: px2rem(81);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(24);
          }
          .el-select {
            width: px2rem(66);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(10);
          }
          .el-select {
            width: px2rem(80);
          }
        }
      }
      // 个人信息
      &-person-item-1 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-select {
            width: px2rem(75);
          }
        }
        :nth-child(2) {
          span {
            display: inline-block;
            width: px2rem(10);
          }
          .el-input {
            width: px2rem(80);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
      }
      &-person-item-2 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(20);
          }
          .el-input {
            width: px2rem(70);
          }
        }
        :nth-child(2) {
          span {
            display: inline-block;
            width: px2rem(10);
          }
          .el-select {
            width: px2rem(80);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
      }
      &-person-item-3 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(16);
          }
          .el-input {
            width: px2rem(74);
          }
        }
        :nth-child(2) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(63);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
      }
      &-person-item-4 {
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
          width: px2rem(61);
        }
      }
      &-person-upload-idcard {
        display: flex;
        align-items: flex-start;
        position: relative;
        img {
          margin: 0 px2rem(2);
          width: px2rem(70.2);
          height: px2rem(36);
        }
        button {
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          padding: px2rem(1) px2rem(2);
        }
        &-just {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(74.2);
          opacity: 0;
        }
        &-back {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(168.2);
          opacity: 0;
        }
      }
      &-person-item-5 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(75);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
      }
      &-person-item-6 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(10);
          margin: 0 px2rem(2);
        }
        .el-input {
            width: px2rem(80);
        }
        :nth-child(3) {
            .el-input {
                 width: px2rem(70);
            }
        }
      }
      &-person-item-7 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(15);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(75);
        }
        :nth-child(3) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(66);
          }
        }
      }
      &-person-item-8 {
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
          width: px2rem(75);
        }
      }
      &-person-update-imgs {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        &-list {
          border: 1px solid #e8eaec;
          width: px2rem(180.5);
          display: flex;
          align-items: center;
          img {
            margin: 0 px2rem(2);
            width: px2rem(18);
            height: px2rem(12.5);
          }
        }
        &-form {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(267);
          opacity: 0;
        }
        button {
          margin: 0 px2rem(2);
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: 0 px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
      }
      &-person-lawsuit {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        textarea {
          border: 1px solid #e8eaec;
          width: px2rem(177);
          display: flex;
          align-items: center;
          resize: none;
          font-size: px2rem(3.5);
        }
      }
      &-person-economic {
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        margin-top: px2rem(6);
        span {
          margin: 0 px2rem(2);
        }
        textarea {
          margin: 0 px2rem(4);
          font-size: px2rem(3.5);
          border: 1px solid #e8eaec;
          width: px2rem(180);
          display: flex;
          align-items: center;
          line-height: px2rem(5);
          resize: none;
        }
      }
      &-person-item-9 {
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
      &-person-item-10 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(20);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(70);
        }
        :nth-child(1) {
          span {
            width: px2rem(10);
          }
          .el-input {
            width: px2rem(80);
          }
        }
        :nth-child(3) {
          span {
            width: px2rem(18);
          }
          .el-select {
            width: px2rem(72);
          }
        }
      }
      &-person-item-11 {
        margin: px2rem(4) 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        height: px2rem(10);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(18);
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          .el-input {
            width: px2rem(72);
          }
        }
        :nth-child(2) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
        :nth-child(3) {
          height: px2rem(8);
          position: relative;
          span {
            width: px2rem(18);
          }
          .el-input {
            width: px2rem(68);
          }
          button {
            left: px2rem(75);
            position: absolute;
            padding: px2rem(0.5) px2rem(2);
            margin-left: px2rem(2);
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
      }
      &-person-item-12 {
        margin: px2rem(4) 0;
        display: flex;
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
        display: flex;
        justify-content: center;
        margin-top: px2rem(10);
        button {
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
      }
      // 实名验证按钮
      /* 企业样式 */
      &-business-item-1 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        .el-select {
          width: px2rem(80);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
        :nth-child(2) {
          span {
            display: inline-block;
            width: px2rem(27);
          }
          .el-input {
            width: px2rem(63);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
        }
      }
      &-business-item-2 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        span {
          display: inline-block;
          width: px2rem(30);
        }
        .el-input {
          width: px2rem(60);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(25);
          }
          .el-input {
            width: px2rem(65);
          }
        }
      }
      &-business-item-3 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
        :nth-child(2) {
          span {
            width: px2rem(20);
          }
          .el-input {
            width: px2rem(68);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
      }
      &-business-item-4 {
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
          width: px2rem(61);
        }
      }
      &-business-upload-idcard {
        display: flex;
        align-items: flex-start;
        position: relative;
        img {
          margin: 0 px2rem(2);
          width: px2rem(70.2);
          height: px2rem(36);
        }
        button {
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          padding: px2rem(1) px2rem(2);
        }
        &-just {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(74.2);
          opacity: 0;
        }
        &-back {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(168.2);
          opacity: 0;
        }
      }
      &-business-item-5 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(75);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
      }
      &-business-item-6 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(10);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(80);
        }
        :nth-child(3) {
            .el-input {
                 width: px2rem(70);
            }
        }
      }
      &-business-item-7 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(15);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(75);
        }
        :nth-child(3) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
      }
      &-business-item-8 {
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
          width: px2rem(75);
        }
      }
      &-business-update-imgs {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        &-list {
          margin: 0 px2rem(4);
          border: 1px solid #e8eaec;
          width: px2rem(180.5);
          display: flex;
          align-items: center;
          img {
            margin: 0 px2rem(2);
            width: px2rem(18);
            height: px2rem(12.5);
          }
        }
        &-form {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(267);
          opacity: 0;
        }
        button {
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: 0 px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
      }
      &-business-lawsuit {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        textarea {
          border: 1px solid #e8eaec;
          width: px2rem(177);
          display: flex;
          align-items: center;
          resize: none;
          font-size: px2rem(3.5);
        }
      }
      &-business-item-9 {
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
      &-business-item-10 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(20);
          margin: 0 px2rem(2);
        }
        input {
          width: px2rem(69);
        }
        :nth-child(1) {
          span {
            width: px2rem(10);
          }
          input {
            width: px2rem(80);
          }
        }
        :nth-child(3) {
          span {
            width: px2rem(18);
          }
          .el-select {
            width: px2rem(72);
          }
        }
      }
      &-business-item-11 {
        margin: px2rem(4) 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        height: px2rem(10);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(18);
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          .el-input {
            width: px2rem(72);
          }
        }
        :nth-child(2) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
        :nth-child(3) {
          height: px2rem(8);
          position: relative;
          span {
            width: px2rem(18);
          }
          .el-input {
            width: px2rem(68);
          }
          button {
            left: px2rem(75);
            position: absolute;
            padding: px2rem(0.5) px2rem(2);
            margin-left: px2rem(2);
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
      }
      &-business-item-12 {
        margin: px2rem(4) 0;
        display: flex;
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
      &-business-button {
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
      /* 银行样式 */
      &-bank-item-1 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        .el-select {
          width: px2rem(80);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
        :nth-child(2) {
          span {
            display: inline-block;
            width: px2rem(27);
          }
          .el-input {
            width: px2rem(63);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
      }
      &-bank-item-2 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        span {
          display: inline-block;
          width: px2rem(30);
        }
        .el-input {
          width: px2rem(60);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(25);
          }
          input {
            width: px2rem(65);
          }
        }
      }
      &-bank-item-3 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
        }
        :nth-child(2) {
          span {
            width: px2rem(20);
          }
          .el-input {
            width: px2rem(72);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
          .el-input {
            width: px2rem(75);
          }
          input {
            width: px2rem(75);
          }
        }
      }
      &-bank-item-5 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(75);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(15);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
      }
      &-bank-item-6 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(10);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(80);
        }
        :nth-child(3) {
            .el-input {
                 width: px2rem(70);
            }
        }
      }
      &-bank-item-7 {
        margin: px2rem(4) 0;
        display: flex;
        height: px2rem(6);
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(15);
          margin: 0 px2rem(2);
        }
        .el-input {
          width: px2rem(75);
        }
        :nth-child(3) {
          span {
            width: px2rem(22);
          }
          .el-input {
            width: px2rem(68);
          }
        }
      }
      &-bank-item-8 {
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
          width: px2rem(75);
        }
      }
      &-bank-update-imgs {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        &-list {
          margin: 0 px2rem(4);
          border: 1px solid #e8eaec;
          width: px2rem(180.5);
          display: flex;
          align-items: center;
          img {
            margin: 0 px2rem(2);
            width: px2rem(18);
            height: px2rem(12.5);
          }
        }
        &-form {
          width: px2rem(20);
          height: px2rem(7);
          position: absolute;
          left: px2rem(267);
          opacity: 0;
        }
        button {
          border: none;
          background: #616789;
          color: #fff;
          font-size: px2rem(3.4);
          width: px2rem(20);
          height: px2rem(7);
          border-radius: px2rem(1);
          box-sizing: border-box;
          margin: 0 px2rem(2);
          padding: px2rem(1) px2rem(2);
        }
      }
      &-bank-lawsuit {
        margin-top: px2rem(6);
        display: flex;
        height: px2rem(20);
        box-sizing: border-box;
        span {
          margin: 0 px2rem(2);
        }
        textarea {
          border: 1px solid #e8eaec;
          width: px2rem(177);
          display: flex;
          align-items: center;
          resize: none;
          font-size: px2rem(3.5);
        }
      }
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
        margin: 0 px2rem(4);
        font-size: px2rem(3.2);
        padding: 0 px2rem(6);
        // 首行样式
        &-first {
          border-top: 1px solid #d9d9d9;
          padding-top: px2rem(3);
          display: flex;
          height: px2rem(10);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          .el-select {
            width: px2rem(80);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(24);
            }
            .el-select {
              width: px2rem(66);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(10);
            }
            .el-select {
              width: px2rem(80);
            }
          }
        }
        // 个人信息
        &-person-item-1 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-select {
              width: px2rem(75);
            }
          }
          :nth-child(2) {
            span {
              display: inline-block;
              width: px2rem(10);
            }
            .el-input {
              width: px2rem(80);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-person-item-2 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(20);
            }
            .el-input {
              width: px2rem(70);
            }
          }
          :nth-child(2) {
            span {
              display: inline-block;
              width: px2rem(10);
            }
            .el-input {
              width: px2rem(80);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-person-item-3 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(16);
            }
            .el-input {
              width: px2rem(74);
            }
          }
          :nth-child(2) {
            span {
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(62);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-person-item-4 {
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
            width: px2rem(61);
          }
        }
        &-person-upload-idcard {
          display: flex;
          align-items: flex-start;
          position: relative;
          img {
            margin: 0 px2rem(2);
            width: px2rem(70.2);
            height: px2rem(36);
          }
          button {
            border: none;
            background: #616789;
            color: #fff;
            font-size: px2rem(3.4);
            width: px2rem(20);
            height: px2rem(7);
            border-radius: px2rem(1);
            box-sizing: border-box;
            padding: px2rem(1) px2rem(2);
          }
          &-just {
            width: px2rem(20);
            height: px2rem(7);
            position: absolute;
            left: px2rem(74.2);
            opacity: 0;
          }
          &-back {
            width: px2rem(20);
            height: px2rem(7);
            position: absolute;
            left: px2rem(168.2);
            opacity: 0;
          }
        }
        &-person-item-5 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(75);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
        }
        &-person-item-6 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(10);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(80);
          }
          div:nth-child(3) {
            .el-input {
                width: px2rem(68);
            }
          }
        }
        &-person-item-7 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(15);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(75);
          }
          :nth-child(3) {
            span {
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
        }
        &-person-item-8 {
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
            width: px2rem(75);
          }
        }
        &-person-update-imgs {
          margin-top: px2rem(6);
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          span {
            margin: 0 px2rem(2);
          }
          &-list {
            border: 1px solid #e8eaec;
            width: px2rem(180.5);
            display: flex;
            align-items: center;
            img {
              margin: 0 px2rem(2);
              width: px2rem(18);
              height: px2rem(12.5);
            }
          }
          button {
            margin: 0 px2rem(2);
            border: none;
            background: #616789;
            color: #fff;
            font-size: px2rem(3.4);
            width: px2rem(20);
            height: px2rem(7);
            border-radius: px2rem(1);
            box-sizing: border-box;
            margin: 0 px2rem(2);
            padding: px2rem(1) px2rem(2);
          }
        }
        &-person-lawsuit {
          margin-top: px2rem(6);
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          span {
            margin: 0 px2rem(2);
          }
          textarea {
            border: 1px solid #e8eaec;
            width: px2rem(177);
            display: flex;
            align-items: center;
            resize: none;
            font-size: px2rem(3.5);
          }
        }
        &-person-economic {
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          margin-top: px2rem(6);
          span {
            margin: 0 px2rem(2);
          }
          textarea {
            margin: 0 px2rem(4);
            font-size: px2rem(3.5);
            border: 1px solid #e8eaec;
            width: px2rem(180);
            display: flex;
            align-items: center;
            line-height: px2rem(5);
            resize: none;
          }
        }
        &-person-item-9 {
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
        &-person-item-10 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(20);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(70);
          }
          :nth-child(1) {
            span {
              width: px2rem(10);
            }
            .el-input {
              width: px2rem(80);
            }
          }
          :nth-child(3) {
            span {
              width: px2rem(18);
            }
            .el-input {
              width: px2rem(72);
            }
          }
        }
        &-person-item-11 {
          margin: px2rem(4) 0;
          display: flex;
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
          :nth-child(2) {
            span {
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
          :nth-child(3) {
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
              height: px2rem(6);
              border-radius: px2rem(1);
              box-sizing: border-box;
              margin: 0 px2rem(2);
              padding: px2rem(1) px2rem(2);
              right: px2rem(6);
              top: px2rem(1);
            }
          }
          // 实名验证按钮
          &-certification {
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
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
        &-business-item-1 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          .el-select {
            width: px2rem(80);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
          :nth-child(2) {
            span {
              display: inline-block;
              width: px2rem(27);
            }
            .el-input {
              width: px2rem(63);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-business-item-2 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          span {
            display: inline-block;
            width: px2rem(30);
          }
          .el-input {
            width: px2rem(60);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(25);
            }
            .el-input {
              width: px2rem(65);
            }
          }
        }
        &-business-item-3 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
          :nth-child(2) {
            span {
              width: px2rem(20);
            }
            input {
              width: px2rem(72);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-business-item-4 {
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
            width: px2rem(61);
          }
        }
        &-business-upload-idcard {
          display: flex;
          align-items: flex-start;
          position: relative;
          img {
            margin: 0 px2rem(2);
            width: px2rem(70.2);
            height: px2rem(36);
          }
          button {
            border: none;
            background: #616789;
            color: #fff;
            font-size: px2rem(3.4);
            width: px2rem(20);
            height: px2rem(7);
            border-radius: px2rem(1);
            box-sizing: border-box;
            padding: px2rem(1) px2rem(2);
          }
          &-just {
            width: px2rem(20);
            height: px2rem(7);
            position: absolute;
            left: px2rem(74.2);
            opacity: 0;
          }
          &-back {
            width: px2rem(20);
            height: px2rem(7);
            position: absolute;
            left: px2rem(168.2);
            opacity: 0;
          }
        }
        &-business-item-5 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(75);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
        }
        &-business-item-6 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(10);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(80);
          }
          :nth-child(3) {
            .el-input {
                width: px2rem(68);
            }
          }
        }
        &-business-item-7 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(15);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(75);
          }
          :nth-child(3) {
            span {
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
        }
        &-business-item-8 {
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
            width: px2rem(75);
          }
        }
        &-business-update-imgs {
          margin-top: px2rem(6);
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          span {
            margin: 0 px2rem(2);
          }
          &-list {
            margin: 0 px2rem(4);
            border: 1px solid #e8eaec;
            width: px2rem(180.5);
            display: flex;
            align-items: center;
            img {
              margin: 0 px2rem(2);
              width: px2rem(18);
              height: px2rem(12.5);
            }
          }
          button {
            border: none;
            background: #616789;
            color: #fff;
            font-size: px2rem(3.4);
            width: px2rem(20);
            height: px2rem(7);
            border-radius: px2rem(1);
            box-sizing: border-box;
            margin: 0 px2rem(2);
            padding: px2rem(1) px2rem(2);
          }
        }
        &-business-lawsuit {
          margin-top: px2rem(6);
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          span {
            margin: 0 px2rem(2);
          }
          textarea {
            border: 1px solid #e8eaec;
            width: px2rem(177);
            display: flex;
            align-items: center;
            resize: none;
            font-size: px2rem(3.5);
          }
        }
        &-business-item-9 {
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
        &-business-item-10 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(20);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(70);
          }
          :nth-child(1) {
            span {
              width: px2rem(10);
            }
            .el-input {
              width: px2rem(80);
            }
          }
          :nth-child(3) {
            span {
              width: px2rem(18);
            }
            .el-input {
              width: px2rem(72);
            }
          }
        }
        &-business-item-11 {
          margin: px2rem(4) 0;
          display: flex;
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
          :nth-child(2) {
            span {
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
          :nth-child(3) {
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
              height: px2rem(6);
              border-radius: px2rem(1);
              box-sizing: border-box;
              margin: 0 px2rem(2);
              padding: px2rem(1) px2rem(2);
              right: px2rem(6);
              top: px2rem(1);
            }
          }
        }
        /* 银行样式 */
        &-bank-item-1 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          .el-select {
            width: px2rem(80);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
          :nth-child(2) {
            span {
              display: inline-block;
              width: px2rem(27);
            }
            .el-input {
              width: px2rem(63);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-bank-item-2 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          span {
            display: inline-block;
            width: px2rem(30);
          }
          .el-input {
            width: px2rem(60);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(25);
            }
            .el-input {
              width: px2rem(65);
            }
          }
        }
        &-bank-item-3 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          div:nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
          div:nth-child(2) {
            span {
              width: px2rem(20);
            }
            input {
              width: px2rem(72)!important;
            }
          }
          div:nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
            .el-input {
              width: px2rem(75);
            }
          }
        }
        &-bank-item-5 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(75);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(15);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
        }
        &-bank-item-6 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(10);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(80);
          }
          div:nth-child(3) {
            .el-input {
                width: px2rem(68);
            }
          }
        }
        &-bank-item-7 {
          margin: px2rem(4) 0;
          display: flex;
          height: px2rem(6);
          align-items: center;
          justify-content: space-around;
          font-size: px2rem(3);
          div {
            flex: 1;
          }
          span {
            display: inline-block;
            width: px2rem(15);
            margin: 0 px2rem(2);
          }
          .el-input {
            width: px2rem(75);
          }
          :nth-child(3) {
            span {
              width: px2rem(22);
            }
            .el-input {
              width: px2rem(68);
            }
          }
        }
        &-bank-item-8 {
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
            width: px2rem(75);
          }
        }
        &-bank-update-imgs {
          margin-top: px2rem(6);
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          span {
            margin: 0 px2rem(2);
          }
          &-list {
            margin: 0 px2rem(4);
            border: 1px solid #e8eaec;
            width: px2rem(180.5);
            display: flex;
            align-items: center;
            img {
              margin: 0 px2rem(2);
              width: px2rem(18);
              height: px2rem(12.5);
            }
          }
          button {
            border: none;
            background: #616789;
            color: #fff;
            font-size: px2rem(3.4);
            width: px2rem(20);
            height: px2rem(7);
            border-radius: px2rem(1);
            box-sizing: border-box;
            margin: 0 px2rem(2);
            padding: px2rem(1) px2rem(2);
          }
        }
        &-bank-lawsuit {
          margin-top: px2rem(6);
          display: flex;
          height: px2rem(20);
          box-sizing: border-box;
          span {
            margin: 0 px2rem(2);
          }
          textarea {
            border: 1px solid #e8eaec;
            width: px2rem(177);
            display: flex;
            align-items: center;
            resize: none;
            font-size: px2rem(3.5);
          }
        }
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
