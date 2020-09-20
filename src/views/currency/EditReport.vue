<template>
  <div class='report-approve'>
        <div class='report-approve-title'>
            <span class='report-approve-title-go1'>我的审批</span>
            <span class='report-approve-title-separator'> / </span>
            <span class='report-approve-title-go2'>报备审核</span>
        </div>
        <div class='report-approve-container'>
            <div class='report-approve-container-form'>
                <el-collapse>
                    <!-- 债务人基本信息登记表 -->
                    <el-collapse-item title="债权人基本信息登记表" name="1">
                        <!-- 第一行表单 -->
                        <div class='report-approve-container-form-first'>
                            <div class='report-approve-container-form-first-item'>
                                <span>债事人是否配合：</span>
                                <el-select v-model="ReportMsg.iscoordinate" placeholder="是">
                                    <el-option label="是" value="1"></el-option>
                                    <el-option label="否" value="2"></el-option>
                                </el-select>
                            </div>
                            <div class='report-approve-container-form-first-item'>
                                <span>类型：</span>
                                <el-select v-model="ReportMsg.reportType" placeholder="债务人">
                                    <el-option label="债权人" value="1"></el-option>
                                    <el-option label="债务人" value="2"></el-option>
                                    <el-option label="债权债务人" value="3"></el-option>
                                </el-select>
                            </div>
                            <div class='report-approve-container-form-first-item'>
                                <span>性质：</span>
                                <el-select v-model="ReportMsg.reportPropert" placeholder="个人">
                                    <el-option label="个人" value="1"></el-option>
                                    <el-option label="企业" value="2"></el-option>
                                    <el-option label="银行" value="3"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <!-- 个人 -->
                        <template v-if="ReportMsg.reportPropert === '1'">
                            <h3>个人:</h3>
                            <div class='report-approve-container-form-person-item-1'>
                                <div>
                                    <span>是否从业：</span>
                                    <el-select placeholder="是" v-model='ReportMsg.ifWork'>
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label="否" value="2"></el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <span>姓名：</span>
                                    <el-input v-model="ReportMsg.personalName"></el-input>
                                </div>
                                <div>
                                    <span>手机号码：</span>
                                    <el-input  v-model="ReportMsg.phone" v-input-num maxlength="11"></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-person-item-2'>
                                <div>
                                    <span>身份证号码：</span>
                                    <el-input v-model="ReportMsg.idCard" maxlength="20"></el-input>
                                </div>
                                <div>
                                    <span>性别：</span>
                                    <el-select v-model="ReportMsg.sex">
                                        <el-option label="男" value="1"></el-option>
                                        <el-option label="女" value="2"></el-option>
                                    </el-select>
                                </div>
                                <div>
                                    <span>所在地区：</span>
                                    <el-input v-model="ReportMsg.area"></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-person-item-3'>
                                <div>
                                    <span>电子邮箱：</span>
                                    <el-input v-model="ReportMsg.email" maxlength='32'></el-input>
                                </div>
                                <div>
                                    <span>资产总价值（元）：</span>
                                    <el-input v-model="ReportMsg.assets" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>资产项数：</span>
                                    <el-input v-model="ReportMsg.assetsNumber" maxlength='5' v-input-num></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-person-item-4'>
                                <span>可流通资产价值(元)：</span>
                                <el-input v-model="ReportMsg.circulationAssets"></el-input>
                            </div>
                            <h3>身份证信息</h3>
                            <div class='report-approve-container-form-person-upload-idcard'>
                                <img :src="PersonalReportMsg.cardJust ? PersonalReportMsg.cardJust: IDCardDefaultSrc.JustSrc" alt="">
                                <input type="file" @change="UpdateReportJustIDCard" ref="PersonReportJustIdCard" class='report-approve-container-form-person-upload-idcard-just' value='点击上传'>
                                <button>点击上传</button>
                                <img :src="PersonalReportMsg.cardBack ? PersonalReportMsg.cardBack: IDCardDefaultSrc.BackSrc" alt="">
                                <input type="file" @change="UpdateReportBackIDCard" ref="PersonReportBackIdCard" class='report-approve-container-form-person-upload-idcard-back' value='点击上传'>
                                <button>点击上传</button>
                            </div>
                            <div class='report-approve-container-form-person-item-5'>
                                <div>
                                    <span>债权(元)：</span>
                                    <el-input v-model="ReportMsg.obligatRight" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>债权笔数：</span>
                                    <el-input v-model="ReportMsg.obligatRightNo" maxlength='6' v-input-num></el-input>
                                </div>
                                <div>
                                    <span>借款发生时间：</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="ReportMsg.obligatTime" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class='report-approve-container-form-person-item-6'>
                                <div>
                                    <span>本金：</span>
                                    <el-input v-model="ReportMsg.capital" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>利息：</span>
                                    <el-input v-model="ReportMsg.interest" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>利率：</span>
                                    <el-input v-model="ReportMsg.interestRate" maxlength='10' v-input-num-2></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-person-item-7'>
                                <div>
                                    <span>债务(元)：</span>
                                    <el-input v-model="ReportMsg.debt" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>债务笔数：</span>
                                    <el-input v-model="ReportMsg.debtNo" maxlength='10' v-input-num></el-input>
                                </div>
                                <div>
                                    <span>借款发生时间：</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="ReportMsg.debtTime" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class='report-approve-container-form-person-item-8'>
                                <span>债事凭证：</span>
                                <el-input  v-model="ReportMsg.debtCertificate"></el-input>
                            </div>
                            <div class='report-approve-container-form-person-update-imgs'>
                                <span>上传债事凭证：</span>
                                <div class='report-approve-container-form-person-update-imgs-list'>
                                    <img v-for='(item,index) in PersonalReportMsg.uploadDebtCertificate' :key='index' :src="item" alt="">
                                </div>
                                <input type="file" @change="UpdateReportVoucher" ref="PersonReportVoucher" class='report-approve-container-form-person-update-imgs-form' value='点击上传'>
                                <button>点击上传</button>
                            </div>
                            <div class='report-approve-container-form-person-lawsuit'>
                                <span>是否诉讼及结果：</span>
                                <textarea v-model="ReportMsg.isResult"></textarea>
                            </div>
                            <div class='report-approve-container-form-person-economic'>
                                <span>目前经济情况：</span>
                                <textarea  v-model="ReportMsg.economics"></textarea>
                            </div>
                            <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                            <div class='report-approve-container-form-person-item-9'>
                                <span>项目负责人：</span>
                                <el-input v-model="ReportMsg.prjectManager"></el-input>
                            </div>
                        </template>
                        <!-- 企业 -->
                        <template v-else-if="ReportMsg.reportPropert === '2'">
                            <h3>企业:</h3>
                            <div class='report-approve-container-form-business-item-1'>
                                <div>
                                    <span>企业名称：</span>
                                    <el-input v-model="ReportMsg.CompanyName"></el-input>
                                </div>
                                <div>
                                    <span>社会统一信用代码：</span>
                                    <el-input v-model="ReportMsg.CreditCode" maxlength='19'></el-input>
                                </div>
                                <div>
                                    <span>行业属性：</span>
                                    <el-input v-model="ReportMsg.industryAttributes"></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-business-item-2'>
                                <div>
                                    <span>法定代表人名称：</span>
                                    <el-input v-model="ReportMsg.LegalName"></el-input>
                                </div>
                                <div>
                                    <span>法定代表人联系电话：</span>
                                    <el-input v-model="ReportMsg.LegalPhone" maxlength="14"></el-input>
                                </div>
                                <div>
                                    <span>法定代表人身份证号：</span>
                                    <el-input v-model="ReportMsg.LegalIdCard" maxlength="20"></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-business-item-3'>
                                <div>
                                    <span>注册地址：</span>
                                    <el-input v-model="ReportMsg.address"></el-input>
                                </div>
                                <div>
                                    <span>企业联系人：</span>
                                    <el-input v-model="ReportMsg.ContactPerson"></el-input>
                                </div>
                                <div>
                                    <span>联系电话：</span>
                                    <el-input v-model="ReportMsg.ContactPhone" maxlength="14"></el-input>
                                </div>
                            </div>
                            <h3>身份证信息</h3>
                            <div class='report-approve-container-form-business-upload-idcard'>
                                <img :src="BusinessReportMsg.cardJust ? BusinessReportMsg.cardJust: IDCardDefaultSrc.JustSrc" alt="">
                                <input type="file" @change="UpdateReportJustIDCard" ref="BusinessReportJustIdCard" class='report-approve-container-form-business-upload-idcard-just' value='点击上传'>
                                <button>点击上传</button>
                                <img :src="BusinessReportMsg.cardBack ? BusinessReportMsg.cardBack: IDCardDefaultSrc.BackSrc" alt="">
                                <input type="file" @change="UpdateReportBackIDCard" ref="BusinessReportBackIdCard" class='report-approve-container-form-business-upload-idcard-back' value='点击上传'>
                                <button>点击上传</button>
                            </div>
                            <div class='report-approve-container-form-business-item-5'>
                                <div>
                                    <span>债权(元)：</span>
                                    <el-input v-model="ReportMsg.obligatRight" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>债权笔数：</span>
                                    <el-input v-model="ReportMsg.obligatRightNo" maxlength='10' v-input-num></el-input>
                                </div>
                                <div>
                                    <span>借款发生时间：</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="ReportMsg.obligatTime" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class='report-approve-container-form-business-item-6'>
                                <div>
                                    <span>本金：</span>
                                    <el-input v-model="ReportMsg.capital" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>利息：</span>
                                    <el-input v-model="ReportMsg.interest" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>利率：</span>
                                    <el-input v-model="ReportMsg.interestRate" maxlength='6' v-input-num-2></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-business-item-7'>
                                <div>
                                    <span>债务(元)：</span>
                                    <el-input v-model="ReportMsg.debt" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>债务笔数：</span>
                                    <el-input v-model="ReportMsg.debtNo" maxlength='10' v-input-num></el-input>
                                </div>
                                <div>
                                    <span>借款发生时间：</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="ReportMsg.debtTime" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class='report-approve-container-form-business-item-8'>
                                <span>债事凭证：</span>
                                <el-input v-model="ReportMsg.debtCertificate"></el-input>
                            </div>
                            <div class='report-approve-container-form-business-update-imgs'>
                                <span>上传债事凭证：</span>
                                <div class='report-approve-container-form-person-update-imgs-list'>
                                    <img v-for='(item,index) in BusinessReportMsg.uploadDebtCertificate' :key='index' :src="item" alt="">
                                </div>
                                <input type="file" @change="UpdateReportVoucher" ref="BusinessReportVoucher" class='report-approve-container-form-business-update-imgs-form' value='点击上传'>
                                <button>点击上传</button>
                            </div>
                            <div class='report-approve-container-form-business-lawsuit'>
                                <span>是否诉讼及结果：</span>
                                <el-input v-model="ReportMsg.isResult"></el-input>
                            </div>
                            <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                            <div class='report-approve-container-form-business-item-9'>
                                <span>项目负责人：</span>
                                <el-input v-model="ReportMsg.prjectManager"></el-input>
                            </div>
                        </template>
                        <!-- 银行 -->
                        <template v-else>
                            <h3>银行:</h3>
                            <div class='report-approve-container-form-bank-item-1'>
                                <div>
                                    <span>企业名称：</span>
                                    <el-input  v-model="ReportMsg.companyName"></el-input>
                                </div>
                                <div>
                                    <span>社会统一信用代码：</span>
                                    <el-input  v-model="ReportMsg.creditCode" maxlength='19'></el-input>
                                </div>
                                <div>
                                    <span>行业属性：</span>
                                    <el-input  v-model="ReportMsg.industryAttributes"></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-bank-item-2'>
                                <div>
                                    <span>法定代表人名称：</span>
                                    <el-input  v-model="ReportMsg.legalName"></el-input>
                                </div>
                                <div>
                                    <span>法定代表人联系电话：</span>
                                    <el-input  v-model="ReportMsg.legalPhone" maxlength="14"></el-input>
                                </div>
                                <div>
                                    <span>法定代表人身份证号：</span>
                                    <el-input  v-model="ReportMsg.legalIdCard"  maxlength="20"></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-bank-item-3'>
                                <div>
                                    <span>注册地址：</span>
                                    <el-input  v-model="ReportMsg.address"></el-input>
                                </div>
                                <div>
                                    <span>企业联系人：</span>
                                    <el-input  v-model="ReportMsg.contactPerson"></el-input>
                                </div>
                                <div>
                                    <span>联系电话：</span>
                                    <el-input  v-model="ReportMsg.contactPhone" maxlength='14'></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-bank-item-5'>
                                <div>
                                    <span>债权(元)：</span>
                                    <el-input  v-model="ReportMsg.obligatRight" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>债权笔数：</span>
                                    <el-input  v-model="ReportMsg.obligatRightNo" maxlength='10' v-input-num></el-input>
                                </div>
                                <div>
                                    <span>借款发生时间：</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="ReportMsg.obligatTime" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class='report-approve-container-form-bank-item-6'>
                                <div>
                                    <span>本金：</span>
                                    <el-input  v-model="ReportMsg.capital" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>利息：</span>
                                    <el-input  v-model="ReportMsg.interest" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>利率：</span>
                                    <el-input  v-model="ReportMsg.interestRate" maxlength='6'></el-input>
                                </div>
                            </div>
                            <div class='report-approve-container-form-bank-item-7'>
                                <div>
                                    <span>债务(元)：</span>
                                    <el-input  v-model="ReportMsg.debt" maxlength='14' v-input-num-2></el-input>
                                </div>
                                <div>
                                    <span>债务笔数：</span>
                                    <el-input  v-model="ReportMsg.debtNo" maxlength='10' v-input-num></el-input>
                                </div>
                                <div>
                                    <span>借款发生时间：</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="ReportMsg.debtTime" value-format="yyyy-MM-dd"></el-date-picker>
                                </div>
                            </div>
                            <div class='report-approve-container-form-bank-item-8'>
                                <span>债事凭证：</span>
                                <el-input  v-model="ReportMsg.debtCertificate"></el-input>
                            </div>
                            <div class='report-approve-container-form-bank-update-imgs'>
                                <span>上传债事凭证：</span>
                                <div class='report-approve-container-form-person-update-imgs-list'>
                                    <img v-for='(item,index) in BankReportMsg.uploadDebtCertificate' :key='index' :src="item" alt="">
                                </div>
                                <input type="file" @change="UpdateReportVoucher" ref="BankReportVoucher" class='report-approve-container-form-bank-update-imgs-form' value='点击上传'>
                                <button>点击上传</button>
                            </div>
                            <div class='report-approve-container-form-bank-lawsuit'>
                                <span>是否诉讼及结果：</span>
                                <textarea  v-model='ReportMsg.isResult'></textarea>
                            </div>
                            <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                            <div class='report-approve-container-form-bank-item-9'>
                                <span>项目负责人：</span>
                                <el-input  v-model="ReportMsg.prjectManager"></el-input>
                            </div>
                        </template>
                    </el-collapse-item>
                    <!-- 相对人基本信息表 -->
                    <el-collapse-item title="相对人基本信息表" name="2">
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
                                <div class='report-approve-container-relative-list-item' v-for='(item,index) in RelativeList' :key='item.id'>
                                    <span>{{index+1}}</span>
                                    <span>{{item.personalName ? item.personalName : item.companyName}}</span>
                                    <span>{{(item.reportType === '1')? '债权人': '债务人' }}</span>
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
                                    <el-select v-model="RelativeMsg.iscoordinate">
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label="否" value="2"></el-option>
                                    </el-select>
                                </div>
                                <div class='report-approve-container-form-first-item'>
                                    <span>类型：</span>
                                    <el-select v-model="RelativeMsg.reportType">
                                        <el-option label="债权人" value="1"></el-option>
                                        <el-option label="债务人" value="2"></el-option>
                                    </el-select>
                                </div>
                                <div class='report-approve-container-form-first-item'>
                                    <span>性质：</span>
                                    <el-select v-model="RelativeMsg.reportPropert" placeholder="个人">
                                        <el-option label="个人" value="1"></el-option>
                                        <el-option label="企业" value="2"></el-option>
                                        <el-option label="银行" value="3"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <!-- 个人 -->
                            <template v-if="RelativeMsg.reportPropert === '1'">
                                <h3>个人:</h3>
                                <div class='report-approve-container-relative-form-person-item-1'>
                                    <div>
                                        <span>是否从业：</span>
                                        <el-select v-model='RelativeMsg.ifWork' placeholder="是">
                                            <el-option label="是" value="1"></el-option>
                                            <el-option label="否" value="2"></el-option>
                                        </el-select>
                                    </div>
                                    <div>
                                        <span>姓名：</span>
                                        <el-input v-model='RelativeMsg.personalName'></el-input>
                                    </div>
                                    <div>
                                        <span>手机号码：</span>
                                        <el-input v-model='RelativeMsg.phone' v-input-num maxlength="11"></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-2'>
                                    <div>
                                        <span>身份证号码：</span>
                                        <el-input v-model='RelativeMsg.idCard'></el-input>
                                    </div>
                                    <div>
                                        <span>性别：</span>
                                        <el-select v-model="RelativeMsg.sex" placeholder="男">
                                            <el-option label="男" value="1"></el-option>
                                            <el-option label="女" value="2"></el-option>
                                        </el-select>
                                    </div>
                                    <div>
                                        <span>所在地区：</span>
                                        <el-input v-model='RelativeMsg.area'></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-3'>
                                    <div>
                                        <span>电子邮箱：</span>
                                        <el-input v-model='RelativeMsg.email' maxlength='32'></el-input>
                                    </div>
                                    <div>
                                        <span>资产总价值（元）：</span>
                                        <el-input v-model='RelativeMsg.assets' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>资产项数：</span>
                                        <el-input v-model='RelativeMsg.assetsNumber' maxlength='10' v-input-num></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-4'>
                                    <span>可流通资产价值(元)：</span>
                                    <el-input v-model='RelativeMsg.circulationAssets' maxlength='14' v-input-num-2></el-input>
                                </div>
                                <h3>上传身份证</h3>
                                <div class='report-approve-container-relative-form-person-upload-idcard'>
                                    <img :src="PersonalRelativeMsg.cardJust ? PersonalRelativeMsg.cardJust: IDCardDefaultSrc.JustSrc"  alt="">
                                    <input type="file" @change="UpdateRelativeJustIDCard" ref="PersonRelativeJustIdCard" class='report-approve-container-relative-form-person-upload-idcard-just' value='点击上传'>
                                    <button>点击上传</button>
                                    <img :src="PersonalRelativeMsg.cardBack ? PersonalRelativeMsg.cardBack: IDCardDefaultSrc.BackSrc" alt="">
                                    <input type="file" @change="UpdateRelativeBackIDCard" ref="PersonRelativeBackIdCard" class='report-approve-container-relative-form-person-upload-idcard-back'  value='点击上传'>
                                    <button>点击上传</button>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-5'>
                                    <div>
                                        <span>债权(元)：</span>
                                        <el-input v-model='RelativeMsg.obligatRight' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>债权笔数：</span>
                                        <el-input v-model='RelativeMsg.obligatRightNo' maxlength='10' v-input-num></el-input>
                                    </div>
                                    <div>
                                        <span>借款发生时间：</span>
                                        <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="RelativeMsg.obligatTime" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-6'>
                                    <div>
                                        <span>本金：</span>
                                        <el-input v-model='RelativeMsg.capital' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>利息：</span>
                                        <el-input v-model='RelativeMsg.interest' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>利率：</span>
                                        <el-input v-model='RelativeMsg.interestRate' maxlength='6'></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-7'>
                                    <div>
                                        <span>债务(元)：</span>
                                        <el-input v-model='RelativeMsg.debt' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>债务笔数：</span>
                                        <el-input v-model='RelativeMsg.debtNo' maxlength='10' v-input-num></el-input>
                                    </div>
                                    <div>
                                        <span>借款发生时间：</span>
                                        <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="RelativeMsg.debtTime" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-person-item-8'>
                                    <span>债事凭证：</span>
                                    <el-input v-model='RelativeMsg.debtCertificate'></el-input>
                                </div>
                                <div class='report-approve-container-relative-form-person-update-imgs'>
                                    <span>上传债事凭证：</span>
                                    <div class='report-approve-container-form-person-update-imgs-list'>
                                        <img v-for='(item,index) in PersonalRelativeMsg.uploadDebtCertificate' :key='index' :src="item" alt="">
                                    </div>
                                    <input type="file" @change="UpdateRelativeVoucher" ref="PersonRelativeVoucher" class='report-approve-container-form-business-update-imgs-form' value='点击上传'>
                                    <button>点击上传</button>
                                </div>
                                <div class='report-approve-container-relative-form-person-lawsuit'>
                                    <span>是否诉讼及结果：</span>
                                    <textarea v-model='RelativeMsg.isResult'></textarea>
                                </div>
                                <div class='report-approve-container-relative-form-person-economic'>
                                    <span>目前经济情况：</span>
                                    <textarea v-model='RelativeMsg.economics'></textarea>
                                </div>
                                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                                <div class='report-approve-container-form-person-item-9'>
                                    <span>项目负责人：</span>
                                    <el-input v-model='RelativeMsg.prjectManager'></el-input>
                                </div>
                            </template>
                            <!-- 企业 -->
                            <template v-else-if="RelativeMsg.reportPropert === '2'">
                                <h3>企业:</h3>
                                <div class='report-approve-container-relative-form-business-item-1'>
                                    <div>
                                        <span>企业名称：</span>
                                        <el-input v-model='RelativeMsg.companyName'></el-input>
                                    </div>
                                    <div>
                                        <span>社会统一信用代码：</span>
                                        <el-input v-model='RelativeMsg.creditCode' maxlength='19'></el-input>
                                    </div>
                                    <div>
                                        <span>行业属性：</span>
                                        <el-input v-model='RelativeMsg.industryAttributes'></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-business-item-2'>
                                    <div>
                                        <span>法定代表人名称：</span>
                                        <el-input v-model='RelativeMsg.legalName'></el-input>
                                    </div>
                                    <div>
                                        <span>法定代表人联系电话：</span>
                                        <el-input v-model='RelativeMsg.legalPhone'></el-input>
                                    </div>
                                    <div>
                                        <span>法定代表人身份证号：</span>
                                        <el-input v-model='RelativeMsg.legalIdCard'></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-business-item-3'>
                                    <div>
                                        <span>注册地址：</span>
                                        <el-input v-model='RelativeMsg.address'></el-input>
                                    </div>
                                    <div>
                                        <span>企业联系人：</span>
                                        <el-input v-model='RelativeMsg.contactPerson' maxlength="14"></el-input>
                                    </div>
                                    <div>
                                        <span>联系电话：</span>
                                        <el-input v-model='RelativeMsg.contactPhone' maxlength="20"></el-input>
                                    </div>
                                </div>
                                <h3>上传身份证</h3>
                                <div class='report-approve-container-relative-form-business-upload-idcard'>
                                    <img :src="BusinessRelativeMsg.cardJust ? BusinessRelativeMsg.cardJust: IDCardDefaultSrc.JustSrc"  alt="">
                                    <input type="file" @change="UpdateRelativeJustIDCard" ref="BusinessRelativeJustIdCard" class='report-approve-container-relative-form-business-upload-idcard-just' value='点击上传'>
                                    <button>点击上传</button>
                                    <img :src="BusinessRelativeMsg.cardBack ? BusinessRelativeMsg.cardBack: IDCardDefaultSrc.BackSrc"  alt="">
                                    <input type="file" @change="UpdateRelativeBackIDCard" ref="BusinessRelativeBackIdCard" class='report-approve-container-relative-form-business-upload-idcard-back' value='点击上传'>
                                    <button>点击上传</button>
                                </div>
                                <div class='report-approve-container-relative-form-business-item-5'>
                                    <div>
                                        <span>债权(元)：</span>
                                        <el-input v-model='RelativeMsg.obligatRight' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>债权笔数：</span>
                                        <el-input v-model='RelativeMsg.obligatRightNo' maxlength='10' v-input-num></el-input>
                                    </div>
                                    <div>
                                        <span>借款发生时间：</span>
                                        <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="RelativeMsg.obligatTime" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-business-item-6'>
                                    <div>
                                        <span>本金：</span>
                                        <el-input v-model='RelativeMsg.capital' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>利息：</span>
                                        <el-input v-model='RelativeMsg.interest' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>利率：</span>
                                        <el-input v-model='RelativeMsg.interestRate' maxlength='6' v-input-num-2></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-business-item-7'>
                                    <div>
                                        <span>债务(元)：</span>
                                        <el-input v-model='RelativeMsg.debt' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>债务笔数：</span>
                                        <el-input v-model='RelativeMsg.debtNo' maxlength='10' v-input-num></el-input>
                                    </div>
                                    <div>
                                        <span>借款发生时间：</span>
                                        <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="RelativeMsg.debtTime" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-business-item-8'>
                                    <span>债事凭证：</span>
                                    <el-input v-model='RelativeMsg.debtCertificate'></el-input>
                                </div>
                                <div class='report-approve-container-relative-form-business-update-imgs'>
                                    <span>上传债事凭证：</span>
                                    <div class='report-approve-container-form-person-update-imgs-list'>
                                        <img v-for='(item,index) in BusinessRelativeMsg.uploadDebtCertificate' :key='index' :src="item" alt="">
                                    </div>
                                    <input type="file" @change="UpdateRelativeVoucher" ref="BusinessRelativeVoucher" class='report-approve-container-form-business-update-imgs-form' value='点击上传'>
                                    <button>点击上传</button>
                                </div>
                                <div class='report-approve-container-relative-form-business-lawsuit'>
                                    <span>是否诉讼及结果：</span>
                                    <textarea v-model='RelativeMsg.isResult'></textarea>
                                </div>
                                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                                <div class='report-approve-container-relative-form-business-item-9'>
                                    <span>项目负责人：</span>
                                    <el-input v-model='RelativeMsg.prjectManager'></el-input>
                                </div>
                            </template>
                            <!-- 银行 -->
                            <template v-else>
                                <h3>银行:</h3>
                                <div class='report-approve-container-relative-form-bank-item-1'>
                                    <div>
                                        <span>企业名称：</span>
                                        <el-input v-model='RelativeMsg.companyName'></el-input>
                                    </div>
                                    <div>
                                        <span>社会统一信用代码：</span>
                                        <el-input v-model='RelativeMsg.creditCode' maxlength='19'></el-input>
                                    </div>
                                    <div>
                                        <span>行业属性：</span>
                                        <el-input v-model='RelativeMsg.industryAttributes'></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-bank-item-2'>
                                    <div>
                                        <span>法定代表人名称：</span>
                                        <el-input v-model='RelativeMsg.legalName'></el-input>
                                    </div>
                                    <div>
                                        <span>法定代表人联系电话：</span>
                                        <el-input v-model='RelativeMsg.legalPhone' maxlength="14"></el-input>
                                    </div>
                                    <div>
                                        <span>法定代表人身份证号：</span>
                                        <el-input v-model='RelativeMsg.legalIdCard' maxlength="20"></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-bank-item-3'>
                                    <div>
                                        <span>注册地址：</span>
                                        <el-input v-model='RelativeMsg.address'></el-input>
                                    </div>
                                    <div>
                                        <span>企业联系人：</span>
                                        <el-input v-model='RelativeMsg.contactPerson'></el-input>
                                    </div>
                                    <div>
                                        <span>联系电话：</span>
                                        <el-input v-model='RelativeMsg.contactPhone' maxlength='14'></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-bank-item-5'>
                                    <div>
                                        <span>债权(元)：</span>
                                        <el-input v-model='RelativeMsg.obligatRight' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>债权笔数：</span>
                                        <el-input v-model='RelativeMsg.obligatRightNo' maxlength='10' v-input-num></el-input>
                                    </div>
                                    <div>
                                        <span>借款发生时间：</span>
                                        <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="RelativeMsg.obligatTime" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-bank-item-6'>
                                    <div>
                                        <span>本金：</span>
                                        <el-input v-model='RelativeMsg.capital' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>利息：</span>
                                        <el-input v-model='RelativeMsg.interest' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>利率：</span>
                                        <el-input v-model='RelativeMsg.interestRate' maxlength='6' v-input-num-2></el-input>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-bank-item-7'>
                                    <div>
                                        <span>债务(元)：</span>
                                        <el-input v-model='RelativeMsg.debt' maxlength='14' v-input-num-2></el-input>
                                    </div>
                                    <div>
                                        <span>债务笔数：</span>
                                        <el-input v-model='RelativeMsg.debtNo' maxlength='14' v-input-num></el-input>
                                    </div>
                                    <div>
                                        <span>借款发生时间：</span>
                                        <el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="RelativeMsg.debtTime" value-format="yyyy-MM-dd"></el-date-picker>
                                    </div>
                                </div>
                                <div class='report-approve-container-relative-form-bank-item-8'>
                                    <span>债事凭证：</span>
                                    <el-input v-model='RelativeMsg.debtCertificate'></el-input>
                                </div>
                                <div class='report-approve-container-relative-form-bank-update-imgs'>
                                    <span>上传债事凭证：</span>
                                    <div class='report-approve-container-form-person-update-imgs-list'>
                                        <img v-for='(item,index) in BankRelativeMsg.uploadDebtCertificate' :key='index' :src="item" alt="">
                                    </div>
                                    <input type="file" @change="UpdateRelativeVoucher" ref="BankRelativeVoucher" class='report-approve-container-form-business-update-imgs-form' value='点击上传'>
                                    <button>点击上传</button>
                                </div>
                                <div class='report-approve-container-relative-form-bank-lawsuit'>
                                    <span>是否诉讼及结果：</span>
                                    <textarea v-model='RelativeMsg.isResult'></textarea>
                                </div>
                                <h3>本人认真履行了对该债事的尽职调查义务，以上所填报信息真实、有效、并愿意承担相应责任。</h3>
                                <div class='report-approve-container-relative-form-bank-item-9'>
                                    <span>项目负责人：</span>
                                    <el-input v-model='RelativeMsg.prjectManager'></el-input>
                                </div>
                            </template>
                            <div class='report-approve-container-form-person-button'>
                                <button>确认</button>
                            </div>
                        </div>
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
            },
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
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
                }]
            },
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
                economics: '良好',
                // 项目责任人
                prjectManager: '',
                // 状态(1.正常2.异常)
                status: '0',
                // 阶段
                stage: '1',
                // 创建人Id(录入人)
                createUserId: '7969107472849379328',
                // 更新人Id
                updateUserId: '7969107472849379328',
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
                createUserId: '7969107472849379328',
                // 更新人Id
                updateUserId: '7969107472849379328',
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
                createUserId: '7969107472849379328',
                // 更新人Id
                updateUserId: '7969107472849379328',
                // 项目责任人
                prjectManager: '',
                // 状态(1.正常2.异常)
                status: '0',
                // 阶段
                stage: '1',
                // 经济状况, (原定没有该项,测试用)
                economics: '良好'
            },
            PersonalRelativeMsg: {
                // 报备id
                reportId: '',
                // 是否配合(1配合,2不配合)
                iscoordinate: '',
                // 类型(1:债权人 2:债务人 3:债权债务人)
                reportType: '',
                // 是否从业
                ifWork: '',
                // 姓名(私人性质)
                personalName: '',
                // 手机号码
                phone: '',
                // 身份证号码
                IdCard: '',
                // 性别
                sex: '',
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
                agreementNo: '7969107472849373213',
                usage: '1'
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
                createUserId: '',
                // 更新人Id
                updateUserId: '',
                // 项目责任人
                prjectManager: '',
                // 状态(1.正常2.异常)
                status: '0',
                // 阶段
                stage: '1',
                // 经济状况, (原定没有该项,测试用)
                economics: '',
                agreementNo: '7969107472849373213',
                usage: '1'
            }
        }
    },
    methods: {
        // 初始化债事人, 相对人信息列表
        async InitData () {
            // 获取当前用户的reportId
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
            // 处理债事凭证信息
            this.ReportMsg.uploadDebtCertificate = this.ReportMsg.uploadDebtCertificate.split(',')
            if (this.ReportMsg.reportPropert === '1') {
                this.ReporterProperties = '1'
            } else if (this.ReportMsg.reportPropert === '2') {
                this.ReporterProperties = '2'
            } else {
                this.ReporterProperties = '3'
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
            console.log('RelativeListresult', RelativeListresult)
            this.RelativeList = RelativeListresult.data
        },
        async GetDetailMsg (index) {
            this.RelativeMsg = this.RelativeList[index]
            this.RelativeMsg.uploadDebtCertificate = this.RelativeMsg.uploadDebtCertificate.split(',')
            if (this.RelativeMsg.reportPropert === '1') {
                this.RelativeProperties = 'person'
            } else if (this.RelativeMsg.reportPropert === '2') {
                this.RelativeProperties = 'business'
            } else {
                this.RelativeProperties = 'bank'
            }
        },
        async UpdateReportJustIDCard () {
            let file = {}
            if (this.ReporterProperties === 'person') {
                file = this.$refs.PersonReportJustIdCard.files[0]
            } else {
                file = this.$refs.BusinessReportJustIdCard.files[0]
            }
            this.$UpdateFile(file).then(result => {
                if (this.ReporterProperties === 'person') {
                    this.PersonalReportMsg.cardJust = result
                } else {
                    this.BusinessReportMsg.cardJust = result
                }
            })
        },
        // 上传报备反面身份证
        async UpdateReportBackIDCard () {
            let file = {}
            if (this.ReporterProperties === 'person') {
                file = this.$refs.PersonReportBackIdCard.files[0]
            } else {
                file = this.$refs.BusinessReportBackIdCard.files[0]
            }
            this.$UpdateFile(file).then(result => {
                if (this.ReporterProperties === 'person') {
                    this.PersonalReportMsg.cardBack = result
                } else {
                    this.BusinessReportMsg.cardBack = result
                }
            })
        },
        // 上传相对人正面身份证
        async UpdateRelativeJustIDCard () {
            let file = {}
            if (this.RelativeProperties === 'person') {
                file = this.$refs.PersonRelativeJustIdCard.files[0]
            } else {
                file = this.$refs.BusinessRelativeJustIdCard.files[0]
            }
            this.$UpdateFile(file).then(result => {
                if (this.RelativeProperties === 'person') {
                    this.PersonalRelativeMsg.cardJust = result
                } else {
                    this.BusinessRelativeMsg.cardJust = result
                }
            })
        },
        // 上传相对人反面身份证
        async UpdateRelativeBackIDCard () {
            let file = {}
            if (this.RelativeProperties === '1') {
                file = this.$refs.PersonRelativeBackIdCard.files[0]
            } else {
                file = this.$refs.BusinessRelativeBackIdCard.files[0]
            }
            this.$UpdateFile(file).then(result => {
                if (this.RelativeProperties === '2') {
                    this.PersonalRelativeMsg.cardBack = result
                } else {
                    this.BusinessRelativeMsg.cardBack = result
                }
            })
        },
        // 上传报备凭证
        UpdateReportVoucher () {
            let file = {}
            if (this.ReporterProperties === '1') {
                file = this.$refs.PersonReportVoucher.files[0]
            } else if (this.ReporterProperties === '2') {
                file = this.$refs.BusinessReportVoucher.files[0]
            } else {
                file = this.$refs.BankReportVoucher.files[0]
            }
            this.$UpdateFile(file).then(result => {
                if (this.ReporterProperties === '1') {
                    this.PersonalReportMsg.uploadDebtCertificate.push(result)
                } else if (this.ReporterProperties === '2') {
                    this.BusinessReportMsg.uploadDebtCertificate.push(result)
                } else {
                    this.BankReportMsg.uploadDebtCertificate.push(result)
                }
            })
        },
        // 上传相对人凭证
        UpdateRelativeVoucher () {
            let file = {}
            if (this.RelativeProperties === '1') {
                file = this.$refs.PersonRelativeVoucher.files[0]
            } else if (this.RelativeProperties === '2') {
                file = this.$refs.BusinessRelativeVoucher.files[0]
            } else {
                file = this.$refs.BankRelativeVoucher.files[0]
            }
            this.$UpdateFile(file).then(result => {
                if (this.RelativeProperties === '1') {
                    this.PersonalRelativeMsg.uploadDebtCertificate.push(result)
                } else if (this.RelativeProperties === '2') {
                    this.BusinessRelativeMsg.uploadDebtCertificate.push(result)
                } else {
                    this.BankRelativeMsg.uploadDebtCertificate.push(result)
                }
            })
        },
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
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    .el-date-editor{
        width: px2rem(67)!important;
    }
    input {
        width: px2rem(75);
        border: 1px solid #DCDFE6;
        border-radius: px2rem(1);
        box-sizing: border-box;
        color: #606266;
        height: px2rem(8)!important;
        line-height: px2rem(8)!important;
        font-size: px2rem(3.5)!important;
        padding: 0 px2rem(3)!important;
    }
    input:disabled {
        background-color: #F5F7FA;
    }
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
                border-top: 1px solid #D9D9D9;
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
                    margin:0 px2rem(2);
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
                    margin: 0 px2rem(2)
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
                    margin: 0 px2rem(2)
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
                    border: 1px solid #E8EAEC;
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
                    margin:0 px2rem(2);
                    padding: px2rem(1) px2rem(2);
                }
            }
            &-person-lawsuit{
                margin-top: px2rem(6);
                display: flex;
                height: px2rem(20);
                box-sizing: border-box;
                span {
                    margin:0 px2rem(2);
                }
                textarea {
                    border: 1px solid #E8EAEC;
                    width: px2rem(177);
                    display: flex;
                    align-items: center;
                    resize:none;
                    font-size: px2rem(3.5);
                }
            }
            &-person-economic {
                display: flex;
                height: px2rem(20);
                box-sizing: border-box;
                margin-top: px2rem(6);
                span {
                    margin:0 px2rem(2);
                }
                textarea {
                    margin: 0 px2rem(4);
                    font-size: px2rem(3.5);
                    border: 1px solid #E8EAEC;
                    width: px2rem(180);
                    display: flex;
                    align-items: center;
                    line-height: px2rem(5);
                    resize:none
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
                    margin: 0 px2rem(2)
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
                position: relative;
                div {
                    flex: 1;
                }
                span {
                    display: inline-block;
                    width: px2rem(18);
                    margin: 0 px2rem(2)
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
                    span {
                        width: px2rem(18);
                    }
                    .el-input {
                        width: px2rem(68);
                    }
                    button {
                        left: px2rem(277);
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
                    margin: 0 px2rem(2)
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
                        margin:0 px2rem(2);
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
                    margin:px2rem(4) px2rem(2);
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
                    margin:0 px2rem(2);
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
                    margin: 0 px2rem(2)
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
                    margin: 0 px2rem(2)
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
                    margin:0 px2rem(2);
                }
                &-list {
                    margin: 0 px2rem(4);
                    border: 1px solid #E8EAEC;
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
                    margin:0 px2rem(2);
                    padding: px2rem(1) px2rem(2);
                }
            }
            &-business-lawsuit{
                margin-top: px2rem(6);
                display: flex;
                height: px2rem(20);
                box-sizing: border-box;
                span {
                    margin:0 px2rem(2);
                }
                textarea {
                    border: 1px solid #E8EAEC;
                    width: px2rem(177);
                    display: flex;
                    align-items: center;
                    resize:none;
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
                    margin: 0 px2rem(2)
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
                position: relative;
                div {
                    flex: 1;
                }
                span {
                    display: inline-block;
                    width: px2rem(18);
                    margin: 0 px2rem(2)
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
                    span {
                        width: px2rem(18);
                    }
                    .el-input {
                        width: px2rem(68);
                    }
                    button {
                        left: px2rem(277);
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
                    margin: 0 px2rem(2)
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
                        margin:0 px2rem(2);
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
                margin:px2rem(4) px2rem(2);
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
                    margin: 0 px2rem(2)
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
                    margin: 0 px2rem(2)
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
                    margin:0 px2rem(2);
                }
                &-list {
                    margin: 0 px2rem(4);
                    border: 1px solid #E8EAEC;
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
                    margin:0 px2rem(2);
                    padding: px2rem(1) px2rem(2);
                }
            }
            &-bank-lawsuit{
                margin-top: px2rem(6);
                display: flex;
                height: px2rem(20);
                box-sizing: border-box;
                span {
                    margin:0 px2rem(2);
                }
                textarea {
                    border: 1px solid #E8EAEC;
                    width: px2rem(177);
                    display: flex;
                    align-items: center;
                    resize:none;
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
                border-top: 1px solid #D9D9D9;

                button {
                    box-sizing: border-box;
                    border: none;
                    background: #FC7F89;
                    color: #fff;
                    font-size: px2rem(3);
                    width: px2rem(24);
                    height: px2rem(7);
                    border-radius: px2rem(1);
                    box-sizing: border-box;
                    margin:px2rem(4) 0;
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
                    flex:3;
                }
                :nth-child(1) {
                    flex: 1
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
                        flex: 1
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
                            background-color: #FC7F89;
                        }
                    }
                }
                div:nth-child(even) {
                    background-color: #E0E3F8;
                    display: flex;
                    height: px2rem(8);
                    font-size: px2rem(3.2);
                    align-items: center;
                    span {
                        flex: 3;
                        text-align: center;
                    }
                    :nth-child(1) {
                        flex: 1
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
                            background-color: #FC7F89;
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
                    border-top: 1px solid #D9D9D9;
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
                        margin:0 px2rem(2);
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
                        margin: 0 px2rem(2)
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
                        margin: 0 px2rem(2)
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
                        border: 1px solid #E8EAEC;
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
                        margin:0 px2rem(2);
                        padding: px2rem(1) px2rem(2);
                    }
                }
                &-person-lawsuit{
                    margin-top: px2rem(6);
                    display: flex;
                    height: px2rem(20);
                    box-sizing: border-box;
                    span {
                        margin:0 px2rem(2);
                    }
                    textarea {
                        border: 1px solid #E8EAEC;
                        width: px2rem(177);
                        display: flex;
                        align-items: center;
                        resize:none;
                        font-size: px2rem(3.5);
                    }
                }
                &-person-economic {
                    display: flex;
                    height: px2rem(20);
                    box-sizing: border-box;
                    margin-top: px2rem(6);
                    span {
                        margin:0 px2rem(2);
                    }
                    textarea {
                        margin: 0 px2rem(4);
                        font-size: px2rem(3.5);
                        border: 1px solid #E8EAEC;
                        width: px2rem(180);
                        display: flex;
                        align-items: center;
                        line-height: px2rem(5);
                        resize:none
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
                        margin: 0 px2rem(2)
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
                        margin: 0 px2rem(2)
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
                            margin:0 px2rem(2);
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
                    margin:px2rem(4) px2rem(2);
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
                        margin:0 px2rem(2);
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
                        margin: 0 px2rem(2)
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
                        margin: 0 px2rem(2)
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
                        margin:0 px2rem(2);
                    }
                    &-list {
                        margin: 0 px2rem(4);
                        border: 1px solid #E8EAEC;
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
                        margin:0 px2rem(2);
                        padding: px2rem(1) px2rem(2);
                    }
                }
                &-business-lawsuit{
                    margin-top: px2rem(6);
                    display: flex;
                    height: px2rem(20);
                    box-sizing: border-box;
                    span {
                        margin:0 px2rem(2);
                    }
                    textarea {
                        border: 1px solid #E8EAEC;
                        width: px2rem(177);
                        display: flex;
                        align-items: center;
                        resize:none;
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
                        margin: 0 px2rem(2)
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
                        margin: 0 px2rem(2)
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
                            margin:0 px2rem(2);
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
                        margin: 0 px2rem(2)
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
                        margin: 0 px2rem(2)
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
                        margin:0 px2rem(2);
                    }
                    &-list {
                        margin: 0 px2rem(4);
                        border: 1px solid #E8EAEC;
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
                        margin:0 px2rem(2);
                        padding: px2rem(1) px2rem(2);
                    }
                }
                &-bank-lawsuit{
                    margin-top: px2rem(6);
                    display: flex;
                    height: px2rem(20);
                    box-sizing: border-box;
                    span {
                        margin:0 px2rem(2);
                    }
                    textarea {
                        border: 1px solid #E8EAEC;
                        width: px2rem(177);
                        display: flex;
                        align-items: center;
                        resize:none;
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
}
</style>
