<!--  -->
<template>
  <div class='report-approve'>
    <div class='report-approve-title'>
      <span class='report-approve-title-go1'>我的审批</span>
      <span class='report-approve-title-separator'> / </span>
      <span class='report-approve-title-go2'>录入审核</span>
    </div>
    <div class='report-approve-container'>
      <div class='report-approve-container-form'>
        <el-collapse>
          <!-- 债务人基本信息登记表 -->
          <el-collapse-item title="债权人基本信息登记表"
                            name="1">
            <!-- 第一行表单 -->
            <div class='report-approve-container-form-first'>
              <div class='report-approve-container-form-first-item'>
                <span>债事人是否配合：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.iscoordinate === '1' ? ('是') : ReportMsg.iscoordinate === '2' ? ('否') : ' ' "></el-input>
              </div>
              <div class='report-approve-container-form-first-item'>
                <span>类型：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.reportType === '1' ? ('债权人'): ReportMsg.reportType === '2' ? ('债务人'): ReportMsg.reportType === '3' ?('债权债务人'): ' '"></el-input>
              </div>
              <div class='report-approve-container-form-first-item'>
                <span>性质：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.reportPropert === '1' ? ('个人'): ReportMsg.reportPropert === '2' ? ('企业'): ReportMsg.reportPropert === '3' ?('银行'): ' '"></el-input>
              </div>
            </div>
            <!-- 个人 -->
            <template v-if="ReporterProperties === 'person'">
              <h3>个人:</h3>
              <div class='report-approve-container-form-person-item-1'>
                <div>
                  <span>是否从业：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.ifWork === '1' ? '是': ReportMsg.ifWork === '1' ? '否':''"></el-input>
                </div>
                <div>
                  <span>姓名：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.personalName"></el-input>
                </div>
                <div>
                  <span>手机号码：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.phone"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-person-item-2'>
                <div>
                  <span>身份证号码：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.idCard"></el-input>
                </div>
                <div>
                  <span>性别：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.sex === '1' ? '男': '女'"></el-input>
                </div>
                <div>
                  <span>所在地区：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.area"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-person-item-3'>
                <div>
                  <span>电子邮箱：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.email"></el-input>
                </div>
                <div>
                  <span>资产总价值（元）：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.assets"></el-input>
                </div>
                <div>
                  <span>资产项数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.assetsNumber"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-person-item-4'>
                <span>可流通资产价值(元)：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.circulationAssets"></el-input>
              </div>
              <h3>身份证信息</h3>
              <div class='report-approve-container-form-person-upload-idcard'>
                <img :src="ReportMsg.cardJust ? ReportMsg.cardJust : IDCardDefaultSrc.JustSrc"
                     alt=""
                     @click="openImgToLink(ReportMsg.cardJust)">
                <img :src="ReportMsg.cardBack ? ReportMsg.cardBack : IDCardDefaultSrc.JustSrc"
                     alt=""
                     @click="openImgToLink(ReportMsg.cardBack)">
              </div>
              <div class='report-approve-container-form-person-item-5'>
                <div>
                  <span>债权(元)：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatRight"></el-input>
                </div>
                <div>
                  <span>债权笔数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatRightNo"></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatTime"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-person-item-6'>
                <div>
                  <span>本金：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.capital"></el-input>
                </div>
                <div>
                  <span>利息：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.interest"></el-input>
                </div>
                <div>
                  <span>利率：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.interestRate"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-person-item-7'>
                <div>
                  <span>债务(元)：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debt"></el-input>
                </div>
                <div>
                  <span>债务笔数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debtNo"></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debtTime"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-person-item-8'>
                <span>债事凭证：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.debtCertificate"></el-input>
              </div>
              <div class='report-approve-container-form-person-update-imgs'>
                <span>债事凭证信息：</span>
                <div class='report-approve-container-form-person-update-imgs-list'>
                  <img v-for='(item,index) in ReportMsg.uploadDebtCertificate'
                       :key='index'
                       :src="item"
                       alt=""
                       @click="openImgToLink(item)">
                </div>
              </div>
              <div class='report-approve-container-form-person-lawsuit'>
                <span>是否诉讼及结果：</span>
                <textarea disabled='true'
                          :value="ReportMsg.isResult"></textarea>
              </div>
              <div class='report-approve-container-form-person-economic'>
                <span>目前经济情况：</span>
                <textarea disabled='true'
                          :value="ReportMsg.economics"></textarea>
              </div>
              <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
              <div class='report-approve-container-form-person-item-9'>
                <span>项目负责人：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.prjectManager"></el-input>
              </div>
            </template>
            <!-- 企业 -->
            <template v-else-if="ReporterProperties === 'business'">
              <h3>企业:</h3>
              <div class='report-approve-container-form-business-item-1'>
                <div>
                  <span>企业名称：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.CompanyName"></el-input>
                </div>
                <div>
                  <span>社会统一信用代码：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.CreditCode"></el-input>
                </div>
                <div>
                  <span>行业属性：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.industryAttributes"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-business-item-2'>
                <div>
                  <span>法定代表人名称：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.LegalName"></el-input>
                </div>
                <div>
                  <span>法定代表人联系电话：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.LegalPhone"></el-input>
                </div>
                <div>
                  <span>法定代表人身份证号：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.LegalIdCard"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-business-item-3'>
                <div>
                  <span>注册地址：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.address"></el-input>
                </div>
                <div>
                  <span>企业联系人：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.ContactPerson"></el-input>
                </div>
                <div>
                  <span>联系电话：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.ContactPhone"></el-input>
                </div>
              </div>
              <h3>身份证信息</h3>
              <div class='report-approve-container-form-business-upload-idcard'>
                <img :src="ReportMsg.cardJust ? ReportMsg.cardJust:IDCardDefaultSrc.JustSrc"
                     alt=""
                     @click="openImgToLink(ReportMsg.cardJust)">
                <img :src="ReportMsg.cardBack ? ReportMsg.cardBack:IDCardDefaultSrc.BackSrc"
                     alt=""
                     @click="openImgToLink(ReportMsg.cardBack)">
              </div>
              <div class='report-approve-container-form-business-item-5'>
                <div>
                  <span>债权(元)：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatRight"></el-input>
                </div>
                <div>
                  <span>债权笔数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatRightNo"></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatTime"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-business-item-6'>
                <div>
                  <span>本金：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.capital"></el-input>
                </div>
                <div>
                  <span>利息：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.interest"></el-input>
                </div>
                <div>
                  <span>利率：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.interestRate"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-business-item-7'>
                <div>
                  <span>债务(元)：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debt"></el-input>
                </div>
                <div>
                  <span>债务笔数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debtNo"></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debtTime"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-business-item-8'>
                <span>债事凭证：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.debtCertificate"></el-input>
              </div>
              <div class='report-approve-container-form-business-update-imgs'>
                <span>债事凭证信息：</span>
                <div class='report-approve-container-form-person-update-imgs-list'>
                  <img v-for='(item,index) in ReportMsg.uploadDebtCertificate'
                       :key='index'
                       :src="item"
                       alt=""
                       @click="openImgToLink(item)">
                </div>
              </div>
              <div class='report-approve-container-form-business-lawsuit'>
                <span>是否诉讼及结果：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.isResult"></el-input>
              </div>
              <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
              <div class='report-approve-container-form-business-item-9'>
                <span>项目负责人：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.prjectManager"></el-input>
              </div>
            </template>
            <!-- 银行 -->
            <template v-else>
              <h3>银行:</h3>
              <div class='report-approve-container-form-bank-item-1'>
                <div>
                  <span>企业名称：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.companyName"></el-input>
                </div>
                <div>
                  <span>社会统一信用代码：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.creditCode"></el-input>
                </div>
                <div>
                  <span>行业属性：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.industryAttributes"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-bank-item-2'>
                <div>
                  <span>法定代表人名称：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.legalName"></el-input>
                </div>
                <div>
                  <span>法定代表人联系电话：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.legalPhone"></el-input>
                </div>
                <div>
                  <span>法定代表人身份证号：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.legalIdCard"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-bank-item-3'>
                <div>
                  <span>注册地址：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.address"></el-input>
                </div>
                <div>
                  <span>企业联系人：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.contactPerson"></el-input>
                </div>
                <div>
                  <span>联系电话：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.contactPhone"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-bank-item-5'>
                <div>
                  <span>债权(元)：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatRight"></el-input>
                </div>
                <div>
                  <span>债权笔数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatRightNo"></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.obligatTime"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-bank-item-6'>
                <div>
                  <span>本金：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.capital"></el-input>
                </div>
                <div>
                  <span>利息：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.interest"></el-input>
                </div>
                <div>
                  <span>利率：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.interestRate"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-bank-item-7'>
                <div>
                  <span>债务(元)：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debt"></el-input>
                </div>
                <div>
                  <span>债务笔数：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debtNo"></el-input>
                </div>
                <div>
                  <span>借款发生时间：</span>
                  <el-input :disabled="true"
                            :value="ReportMsg.debtTime"></el-input>
                </div>
              </div>
              <div class='report-approve-container-form-bank-item-8'>
                <span>债事凭证：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.debtCertificate"></el-input>
              </div>
              <div class='report-approve-container-form-bank-update-imgs'>
                <span>债事凭证信息：</span>
                <div class='report-approve-container-form-person-update-imgs-list'>
                  <img v-for='(item,index) in ReportMsg.uploadDebtCertificate'
                       :key='index'
                       :src="item"
                       alt=""
                       @click="openImgToLink(item)">
                </div>
              </div>
              <div class='report-approve-container-form-bank-lawsuit'>
                <span>是否诉讼及结果：</span>
                <textarea disabled='true'
                          :value='ReportMsg.isResult'></textarea>
              </div>
              <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
              <div class='report-approve-container-form-bank-item-9'>
                <span>项目负责人：</span>
                <el-input :disabled="true"
                          :value="ReportMsg.prjectManager"></el-input>
              </div>
            </template>
          </el-collapse-item>
          <!-- 相对人基本信息表 -->
          <el-collapse-item title="相对人基本信息表"
                            name="2">
            <div class='report-approve-container-relative'>
              <div class='report-approve-container-relative-list-title'>
                <span>序号</span>
                <span>相对人</span>
                <span>债事类型</span>
                <span>债事性质</span>
                <span>联系电话</span>
                <span>操作</span>
              </div>
              <div class='report-approve-container-relative-list'>
                <div class='report-approve-container-relative-list-item'
                     v-for='(item,index) in RelativeList'
                     :key='item.id'>
                  <span>{{index+1}}</span>
                  <span>{{item.personalName ? item.personalName : item.companyName}}</span>
                  <span>{{(item.reportType === '债权人')? ('个人'): (item.reportType === '2')?('债务人'):('债权债务人')}}</span>
                  <span>{{(item.reportPropert === '1')? ('个人'): (item.reportPropert === '2')?('企业'):('银行')}}</span>
                  <span>{{item.phone ? item.phone: item.contactPhone}}</span>
                  <span>
                    <button @click='GetDetailMsg(index)'>查看详细信息</button>
                  </span>
                </div>
              </div>
              <h3>相对人信息登记表</h3>
              <!-- 第一行表单 -->
              <div class='report-approve-container-relative-form-first'>
                <div class='report-approve-container-form-first-item'>
                  <span>债事人是否配合：</span>
                  <el-input :disabled="true"
                            :value="RelativeMsg.iscoordinate === '1' ? ('是') : RelativeMsg.iscoordinate === '2' ? ('否') : ' ' "></el-input>
                </div>
                <div class='report-approve-container-form-first-item'>
                  <span>类型：</span>
                  <el-input :disabled="true"
                            :value="RelativeMsg.reportType === '1' ? ('债权人'): RelativeMsg.reportType === '2' ? ('债务人'): RelativeMsg.reportType === '3' ?('债权债务人'): ' '"></el-input>
                </div>
                <div class='report-approve-container-form-first-item'>
                  <span>性质：</span>
                  <el-input :disabled="true"
                            :value="RelativeMsg.reportPropert === '1' ? ('个人'): RelativeMsg.reportPropert === '2' ? ('企业'): RelativeMsg.reportPropert === '3' ?('银行'): ' '"></el-input>
                </div>
              </div>
              <!-- 个人 -->
              <template v-if="RelativeProperties === 'person'">
                <h3>个人:</h3>
                <div class='report-approve-container-relative-form-person-item-1'>
                  <div>
                    <span>是否从业：</span>
                    <el-input :disabled="true"
                              :value="RelativeMsg.ifWork === '1' ? ('是') : RelativeMsg.ifWork === '2' ? ('否') : ' ' "></el-input>
                  </div>
                  <div>
                    <span>姓名：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.personalName'></el-input>
                  </div>
                  <div>
                    <span>手机号码：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.phone'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-item-2'>
                  <div>
                    <span>身份证号码：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.idCard'></el-input>
                  </div>
                  <div>
                    <span>性别：</span>
                    <el-input :disabled="true"
                              :value="RelativeMsg.sex === '1' ? ('男') : RelativeMsg.ifWork === '2' ? ('女') : ' ' "></el-input>
                  </div>
                  <div>
                    <span>所在地区：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.area'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-item-3'>
                  <div>
                    <span>电子邮箱：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.email'></el-input>
                  </div>
                  <div>
                    <span>资产总价值（元）：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.assets'></el-input>
                  </div>
                  <div>
                    <span>资产项数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.assetsNumber'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-item-4'>
                  <span>可流通资产价值(元)：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.circulationAssets'></el-input>
                </div>
                <h3>上传身份证</h3>
                <div class='report-approve-container-relative-form-person-upload-idcard'>
                  <img :src="RelativeMsg.cardJust ? RelativeMsg.cardJust : IDCardDefaultSrc.JustSrc"
                       alt=""
                       @click="openImgToLink(RelativeMsg.cardJust)">
                  <img :src="RelativeMsg.cardBack ? RelativeMsg.cardBack : IDCardDefaultSrc.BackSrc"
                       alt=""
                       @click="openImgToLink(RelativeMsg.cardBack)">
                </div>
                <div class='report-approve-container-relative-form-person-item-5'>
                  <div>
                    <span>债权(元)：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatRight'></el-input>
                  </div>
                  <div>
                    <span>债权笔数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatRightNo'></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatTime'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-item-6'>
                  <div>
                    <span>本金：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.capital'></el-input>
                  </div>
                  <div>
                    <span>利息：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.interest'></el-input>
                  </div>
                  <div>
                    <span>利率：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.interestRate'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-item-7'>
                  <div>
                    <span>债务(元)：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debt'></el-input>
                  </div>
                  <div>
                    <span>债务笔数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debtNo'></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debtTime'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-item-8'>
                  <span>债事凭证：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.debtCertificate'></el-input>
                </div>
                <div class='report-approve-container-relative-form-person-update-imgs'>
                  <span>债事凭证信息：</span>
                  <div class='report-approve-container-form-person-update-imgs-list'>
                    <img v-for='(item,index) in RelativeMsg.uploadDebtCertificate'
                         :key='index'
                         :src="item"
                         alt=""
                         @click="openImgToLink(item)">
                  </div>
                </div>
                <div class='report-approve-container-relative-form-person-lawsuit'>

                  <span>是负债经济使用用途：</span>

                  <textarea disabled='true'
                            :value='RelativeMsg.usage'></textarea>
                </div>
                <div class='report-approve-container-relative-form-person-economic'>
                  <span>目前经济情况：</span>
                  <textarea disabled='true'
                            :value='RelativeMsg.economics'></textarea>
                </div>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <div class='report-approve-container-form-person-item-9'>
                  <span>项目负责人：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.prjectManager'></el-input>
                </div>
              </template>
              <!-- 企业 -->
              <template v-else-if="RelativeProperties === 'business'">
                <h3>企业:</h3>
                <div class='report-approve-container-relative-form-business-item-1'>
                  <div>
                    <span>企业名称：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.companyName'></el-input>
                  </div>
                  <div>
                    <span>社会统一信用代码：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.creditCode'></el-input>
                  </div>
                  <div>
                    <span>行业属性：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.industryAttributes'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-business-item-2'>
                  <div>
                    <span>法定代表人名称：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.legalName'></el-input>
                  </div>
                  <div>
                    <span>法定代表人联系电话：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.legalPhone'></el-input>
                  </div>
                  <div>
                    <span>法定代表人身份证号：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.legalIdCard'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-business-item-3'>
                  <div>
                    <span>注册地址：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.address'></el-input>
                  </div>
                  <div>
                    <span>企业联系人：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.contactPerson'></el-input>
                  </div>
                  <div>
                    <span>联系电话：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.contactPhone'></el-input>
                  </div>
                </div>
                <h3>上传身份证</h3>
                <div class='report-approve-container-relative-form-business-upload-idcard'>
                  <img :src="RelativeMsg.cardJust ? RelativeMsg.cardJust : IDCardDefaultSrc.JustSrc"
                       alt=""
                       @click="openImgToLink(RelativeMsg.cardJust)">
                  <img :src="RelativeMsg.cardBack ? RelativeMsg.cardBack : IDCardDefaultSrc.BackSrc"
                       alt=""
                       @click="openImgToLink(RelativeMsg.cardBack)">
                </div>
                <div class='report-approve-container-relative-form-business-item-5'>
                  <div>
                    <span>债权(元)：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatRight'></el-input>
                  </div>
                  <div>
                    <span>债权笔数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatRightNo'></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatTime'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-business-item-6'>
                  <div>
                    <span>本金：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.capital'></el-input>
                  </div>
                  <div>
                    <span>利息：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.interest'></el-input>
                  </div>
                  <div>
                    <span>利率：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.interestRate'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-business-item-7'>
                  <div>
                    <span>债务(元)：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debt'></el-input>
                  </div>
                  <div>
                    <span>债务笔数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debtNo'></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debtTime'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-business-item-8'>
                  <span>债事凭证：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.debtCertificate'></el-input>
                </div>
                <div class='report-approve-container-relative-form-business-update-imgs'>
                  <span>债事凭证信息：</span>
                  <div class='report-approve-container-form-person-update-imgs-list'>
                    <img v-for='(item,index) in RelativeMsg.uploadDebtCertificate'
                         :key='index'
                         :src="item"
                         alt=""
                         @click="openImgToLink(item)">
                  </div>

                </div>
                <div class='report-approve-container-relative-form-business-lawsuit'>

                  <span>是负债经济使用用途：</span>

                  <textarea disabled='true'
                            :value='RelativeMsg.usage'></textarea>
                </div>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <div class='report-approve-container-relative-form-business-item-9'>
                  <span>项目负责人：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.prjectManager'></el-input>
                </div>
              </template>
              <!-- 银行 -->
              <template v-else>
                <h3>银行:</h3>
                <div class='report-approve-container-relative-form-bank-item-1'>
                  <div>
                    <span>企业名称：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.companyName'></el-input>
                  </div>
                  <div>
                    <span>社会统一信用代码：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.creditCode'></el-input>
                  </div>
                  <div>
                    <span>行业属性：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.industryAttributes'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-item-2'>
                  <div>
                    <span>法定代表人名称：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.legalName'></el-input>
                  </div>
                  <div>
                    <span>法定代表人联系电话：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.legalPhone'></el-input>
                  </div>
                  <div>
                    <span>法定代表人身份证号：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.legalIdCard'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-item-3'>
                  <div>
                    <span>注册地址：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.address'></el-input>
                  </div>
                  <div>
                    <span>企业联系人：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.contactPerson'></el-input>
                  </div>
                  <div>
                    <span>联系电话：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.contactPhone'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-item-5'>
                  <div>
                    <span>债权(元)：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatRight'></el-input>
                  </div>
                  <div>
                    <span>债权笔数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatRightNo'></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.obligatTime'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-item-6'>
                  <div>
                    <span>本金：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.capital'></el-input>
                  </div>
                  <div>
                    <span>利息：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.interest'></el-input>
                  </div>
                  <div>
                    <span>利率：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.interestRate'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-item-7'>
                  <div>
                    <span>债务(元)：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debt'></el-input>
                  </div>
                  <div>
                    <span>债务笔数：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debtNo'></el-input>
                  </div>
                  <div>
                    <span>借款发生时间：</span>
                    <el-input :disabled="true"
                              :value='RelativeMsg.debtTime'></el-input>
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-item-8'>
                  <span>债事凭证：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.debtCertificate'></el-input>
                </div>
                <div class='report-approve-container-relative-form-bank-update-imgs'>
                  <span>债事凭证信息：</span>
                  <div class='report-approve-container-form-person-update-imgs-list'>
                    <img v-for='(item,index) in RelativeMsg.uploadDebtCertificate'
                         :key='index'
                         :src="item"
                         alt=""
                         @click="openImgToLink(item)">
                  </div>
                </div>
                <div class='report-approve-container-relative-form-bank-lawsuit'>

                  <span>是负债经济使用用途</span>

                  <textarea disabled='true'
                            :value='RelativeMsg.usage'></textarea>
                </div>
                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                <div class='report-approve-container-relative-form-bank-item-9'>
                  <span>项目负责人：</span>
                  <el-input :disabled="true"
                            :value='RelativeMsg.prjectManager'></el-input>
                </div>
              </template>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <div class='report-approve-check'>
      <div class='report-approve-check-reason'>
        <span>审批原因</span>
        <textarea maxlength='141'
                  v-model='CommitApproveData.checkReason'></textarea>
      </div>
      <div class='report-approve-check-button'>
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
      // 身份证默认图片源
      IDCardDefaultSrc: {
        JustSrc: require('@imgs/home/IDcard.png'),
        BackSrc: require('@imgs/home/IDcard-back.png')
      },
      // 报备人的属性 个人/企业/银行
      ReporterProperties: '',
      // 报备信息源
      ReportMsg: [],
      // 相对人信息列表信息源
      RelativeList: [],
      // 相对人信息源
      RelativeMsg: {},
      // 相对人的属性 个人/企业/银行
      RelativeProperties: '',
      CommitApproveData: {
        reportId: '',
        status: '',
        checkReason: ''
      }
    }
  },
  methods: {
    // 初始化债事人, 相对人信息列表
    async InitData () {
      // 获取当前用户的reportId
      this.CommitApproveData.reportId = this.$route.query.reportId;
      const reportId = this.CommitApproveData.reportId
      // 获取债事人信息
      const formData = new FormData()
      formData.append('reportId', reportId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busReportController/selectByPrimaryKey',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.ReportMsg = result.data
      console.log(this.ReportMsg)
      // 处理债事凭证信息
      this.ReportMsg.uploadDebtCertificate = this.ReportMsg.uploadDebtCertificate.split(',')
      if (this.ReportMsg.reportPropert === '1')
      {
        this.ReporterProperties = 'person'
      } else if (this.ReportMsg.reportPropert === '2')
      {
        this.ReporterProperties = 'business'
      } else
      {
        this.ReporterProperties = 'bank'
      }
      // 通过报备ID查询相对人信息列表
      const { data: RelativeListresult } = await this.$http({
        method: 'post',
        url: '/api/api/busRelativePersonController/selectByRepId',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      this.RelativeList = RelativeListresult.data
    },
    async GetDetailMsg (index) {
      this.RelativeMsg = this.RelativeList[index]
      // 首次点击为','分隔的字符串 因此需要用split分割, 再次点击时此时已为数组, 因此不需要处理
      if (this.RelativeMsg.uploadDebtCertificate.indexOf(',') !== -1 && (!(this.RelativeMsg.uploadDebtCertificate instanceof Array)))
      {
        this.RelativeMsg.uploadDebtCertificate = this.RelativeMsg.uploadDebtCertificate.split(',')
      }
      if (this.RelativeMsg.reportPropert === '1')
      {
        this.RelativeProperties = 'person'
      } else if (this.RelativeMsg.reportPropert === '2')
      {
        this.RelativeProperties = 'business'
      } else
      {
        this.RelativeProperties = 'bank'
      }
    },
    RejectCheck () {
      if (!this.CommitApproveData.checkReason) return this.$message.error('请先填写审核原因')
      this.CommitApproveData.status = '1'
      this.UpdateCheckStatus()
      this.$router.push({ path: 'ReportInfo' })
    },
    PassCheck () {
      this.CommitApproveData.status = '2'
      this.UpdateCheckStatus()
      this.$router.push({ path: 'ReportInfo' })
    },
    // 调用报备状态更改接口
    async UpdateCheckStatus () {
      const formData = new FormData()
      const CommitApproveData = this.CommitApproveData
      for (const key in CommitApproveData)
      {
        formData.append(key, CommitApproveData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busReportController/updateStatus',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (result.data !== '0' && result.resultCode === '200')
      {
        this.$message.success(result.resultMessage)
        this.$router.push({
          path: '/ReportInfo',
        })
      } else
      {
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
.report-approve {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;
  textarea:disabled {
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
        .el-input {
          width: px2rem(80);
        }
        :nth-child(1) {
          span {
            display: inline-block;
            width: px2rem(24);
          }
          .el-input {
            width: px2rem(66);
          }
        }
        :nth-child(3) {
          span {
            display: inline-block;
            width: px2rem(10);
          }
          .el-input {
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
          .el-input {
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
            border-radius: px2rem(1);
            box-sizing: border-box;
            margin: 0 px2rem(2);
            padding: px2rem(1) px2rem(2);
            right: px2rem(6);
            top: px2rem(1);
          }
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
      &-certification {
        width: px2rem(40);
        height: px2rem(8);
        background-color: #616789;
        border: none;
        border-radius: px2rem(1);
        color: #fff;
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
        .el-input {
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
        .el-input {
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
          .el-input {
            width: px2rem(80);
          }
          :nth-child(1) {
            span {
              display: inline-block;
              width: px2rem(24);
            }
            .el-input {
              width: px2rem(66);
            }
          }
          :nth-child(3) {
            span {
              display: inline-block;
              width: px2rem(10);
            }
            .el-input {
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
            .el-input {
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
        // 实名验证按钮
        &-certification {
          width: px2rem(40);
          height: px2rem(8);
          background-color: #616789;
          border: none;
          border-radius: px2rem(1);
          color: #fff;
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
          .el-input {
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
          .el-input {
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
        border: 1px solid #e0e3f8;
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
        background-color: #fc7f89;
      }
    }
  }
}
</style>
