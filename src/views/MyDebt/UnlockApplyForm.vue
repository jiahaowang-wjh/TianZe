<!--  -->
<template>
  <div class="unlock-apply">
    <div class="unlock-apply-title">
      <span class="unlock-apply-title-go1">我的债行</span>
      <span class="unlock-apply-title-separator">/</span>
      <span class="unlock-apply-title-go2">债权处理</span>
    </div>
    <div class="unlock-apply-container">
      <div class="unlock-apply-container-form">
        <el-collapse :value="collapseActive" accordion>
          <!-- 关系绑定 -->
          <el-collapse-item title="关系绑定" name="1">
            <div class="unlock-apply-container-form-new">
              <button @click="collapseActive = '4'">新增</button>
            </div>
            <div class="unlock-apply-container-form-table-1-title">
              <span>序号</span>
              <span>报备号</span>
              <span>民事调解协议号</span>
              <span>服务协议ID</span>
              <span>服务协议号</span>
              <span>相对人</span>
              <span>操作</span>
            </div>
            <div class="unlock-apply-container-form-table-1">
              <div
                class="unlock-apply-container-form-table-1-item"
                v-for="(item,index) in UnlockApplyMsg"
                :key="index"
              >
                <span>{{index+1}}</span>
                <span>{{item.reportNo}}</span>
                <span>{{item.civilno}}</span>
                <span>{{item.debtId}}</span>
                <span>{{item.debtNo}}</span>
                <span>{{item.personName}}</span>
                <span>
                  <button type='button' @click="GoInvestigationReport(index,item)">填写调查报告</button>
                </span>
              </div>
            </div>
            <h3>调解书信息</h3>
            <div class="unlock-apply-container-form-select">
              选择调解书：
              <el-select v-model="MediaIndex" @change="GetMediaMsg">
                <el-option
                  :label="`${item.civilno} 债务人: ${item.personName}`"
                  :value="item.value"
                  v-for="(item,index) in MediaSrc"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <el-form label-width="">
                <h3>债事人信息</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">甲方（债事人名称/姓名）：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">法定代表人/负责人：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtLegalName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">身份证号码/信用代码：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtIdCardCode" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">所住地：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtAdd" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtPhone" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <h3>相对人信息</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">乙方（相对人名称/姓名）：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.personalName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">法定代表人/负责人：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.personalLegalName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">身份证号码/信用代码：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.personalIdCardCode" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">所住地：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.personalAdd" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.personalPhone" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <h3>担保人信息</h3>
            <!-- 表单2 担保人表单 -->
            <div class="unlock-apply-container-form-table-2-title">
              <span>序号</span>
              <span>单位类型</span>
              <span>担保人（姓名/企业名称）</span>
              <span>身份证号码/信用代码</span>
              <span>联系电话</span>
              <span>所住地</span>
            </div>
            <div class="unlock-apply-container-form-table-2">
              <div
                class="unlock-apply-container-form-table-2-item"
                v-for="(item,index) in GuarantorMsg"
                :key="index"
              >
                <span>{{index+1}}</span>
                <span>{{item.unitType}}</span>
                <span>{{item.authname}}</span>
                <span>{{item.card}}</span>
                <span>{{item.tel}}</span>
                <span>{{item.address}}</span>
              </div>
            </div>
            <!-- 手机号码验证 -->
            <!-- 本次债权处理信息 -->
            <h3>本次债权处理信息</h3>
            <el-form label-width="0" class="pub-row-box page-row-box1"  :model="SubmitData"   >
              <el-row>
                <el-col :span="8">
                  <span class="col-label">债权总金额：</span>
                  <el-form-item  :rules="[  { required: true, message: '请输入债权总金额', trigger: 'blur' }]" prop="amountTotal" >
                    <el-input type="text" v-model="UnlockUserMsg.amountTotal" :disabled='true' />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">累计已转让债权金额：</span>
                  <el-form-item>
                    <el-input type="text" v-model="transfeAmount" :disabled='true' />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <span class="col-label">本次申请转让债权金额（小写）：</span>
                  <el-form-item>
                    <el-input type="text" v-model="SubmitData.amountThis" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">本次申请转让债权金额（大写）：</span>
                  <el-form-item>
                    <el-input type="text" class='mini-fontsize' :disabled="true" :value="SubmitData.amountThis | Uppercase" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label" style="color:red">注：请确定金额无误后在输入，输入后不可更改</span>
                </el-col>
                <br />
                <el-col :span="24">
                  <h3>手机验证码认证</h3>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">手机号码：</span>
                  <el-form-item>
                    <el-input type="text" maxlength="11" v-model="PhoneNumber" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <span class="col-label">手机验证码：</span>
                  <el-form-item>
                    <el-input maxlength="4" v-model="SendPhoneAndChekno.checkNo"></el-input>
                    <el-button @click="SendPhoneCheck" class="getVcode" style size="mini" type="primary">点击获取</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-collapse-item>
          <el-collapse-item title="债权处理方式" name="2">
            <el-form label-width="">
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">债权处理类型：</span>
                        <el-form-item label="">
                            <el-select v-model="SubmitData.debtType" placeholder="请选择">
                                <el-option label="一次性提取转让债权等额资产" value="1"></el-option>
                                <el-option label="第三方商贸公司代理销售" value="2"></el-option>
                                <el-option label="第三方电子商务公司线上代理销售" value="3"></el-option>
                                <el-option label="其他" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">债权处理年限：</span>
                        <el-form-item label="">
                            <el-select v-model="SubmitData.debtYaer" placeholder="请选择">
                                <el-option label="一年" value="1"></el-option>
                                <el-option label="二年" value="2"></el-option>
                                <el-option label="三年" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
              </el-form>
          </el-collapse-item>
          <!-- 债事咨询服务协议 -->
          <el-collapse-item title="咨询服务协议" name="3">
            <el-form label-width="">
                <h3>甲方信息</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">甲方（债权人）：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtName" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">身份证号码/统一社会信用代码：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtIdCardCode" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                    <el-col :span="8">
                    <span class="col-label">法定/联系地址：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtAdd" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.debtPhone" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <h3>乙方信息</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">乙方（债务人）：</span>
                        <el-form-item label="">
                            <el-input v-model="UnlockUserMsg.personalName" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">身份证号码/统一社会信用代码：</span>
                        <el-form-item label="">
                            <el-input v-model="UnlockUserMsg.personalIdCardCode" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">法定/联系地址：</span>
                        <el-form-item label="">
                            <el-input v-model="UnlockUserMsg.personalAdd" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                    <span class="col-label">联系电话：</span>
                    <el-form-item label="">
                        <el-input v-model="UnlockUserMsg.personalPhone" :disabled="true"></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                <h3>委托事项</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">甲方身份情况：</span>
                        <el-form-item label="">
                            <el-input v-model="party1Identity" placeholder="债权人" :disabled='true'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        (1)债权人，无法收回确定的债权; (2)债务人，无法清偿自身所欠债务
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">债权处理申请：</span>
                        <el-form-item label="">
                            <el-select :value="SubmitData.debtType" :disabled='true'>
                                <el-option label="一次性提取转让债权等额资产" value="1"></el-option>
                                <el-option label="第三方商贸公司代理销售" value="2"></el-option>
                                <el-option label="第三方电子商务公司线上代理销售" value="3"></el-option>
                                <el-option label="其他" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">乙方身份情况：</span>
                        <el-form-item label="">
                            <el-input v-model="party2Identity" placeholder="债权人" :disabled='true'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        (1)债权人，无法收回确定的债权; (2)债务人，无法清偿自身所欠债务
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">本次债权处理申请金额（小写）：</span>
                        <el-form-item label="">
                            <el-input v-model="SubmitData.amountThis" :disabled='true'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">本次债权处理申请金额（大写）：</span>
                        <el-form-item label="">
                            <el-input class='mini-fontsize' :value="SubmitData.amountThis | Uppercase" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3>三方约定策划方案服务费</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">策划方案服务费率：</span>
                        <el-form-item label="">
                            <el-input :value="'10%'" :disabled='true'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">本次策划方案服务费（小写）：</span>
                        <el-form-item label="">
                            <el-input v-model="thisPlanMoney" :disabled='true'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">本次策划方案服务费（大写）：</span>
                        <el-form-item label="">
                            <el-input class='mini-fontsize' :value='thisPlanMoney | Uppercase' :disabled='true'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3>其他约定事项</h3>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">甲方确认送达地址：</span>
                        <el-form-item label="">
                            <el-input v-model="SubmitData.partyaAddr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">甲方确认送达联系人：</span>
                        <el-form-item label="">
                            <el-input v-model="SubmitData.partyaPerson"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">甲方确认送达联系电话：</span>
                        <el-form-item label="">
                            <el-input v-model='SubmitData.partyaTel'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="8">
                        <span class="col-label">乙方确认送达地址：</span>
                        <el-form-item label="">
                            <el-input v-model="SubmitData.partybAddr"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">乙方确认送达联系人：</span>
                        <el-form-item label="">
                            <el-input v-model="SubmitData.partybPerson"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <span class="col-label">乙方确认送达联系电话：</span>
                        <el-form-item label="">
                            <el-input v-model='SubmitData.partybTel'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <h3>上传资料：</h3>
                <el-row :gutter="24">
                    <el-col :span="16">
                        <div class='update-img-list'>
                            <div class='update-img-list-item' v-for='(item, index) in SubmitData.uploadAnnex':key='index'>
                                <img :src="item">
                                <img class='update-img-list-item-delete' src="@imgs/other/delete.png" alt="" @click='DelectVocher(index)'>
                            </div>
                        </div>
                        <div class='update-img-button'>
                            <input type="file"
                            @change="UpdateVoucher"
                            ref="UpdateMaterialVoucher"
                            value="点击上传" />
                            <button type='button' class='update-voucher-button'>点击上传</button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <div class="unlock-apply-container-form-determine3">
              <button type='button' @click="SubmitMessage" :disabled='HasSubmitDebtMsg'>确定</button>
            </div>
          </el-collapse-item>
          <!-- 策划方案服务协义 -->
          <el-collapse-item title="策划方案服务协议" name="4" v-show='HasSubmitDebtMsg'>
            <div class="unlock-apply-container-form-plan-agreement">
              <div class="unlock-apply-container-form-plan-agreement-title">策划方案服务协议</div>
              <div class="unlock-apply-container-form-plan-agreement-introduce-part-a">
                <div>
                    <span>协议编号：</span>
                    <input type="text" :disabled='true' :value='PlanInitData.serviceNo'>
                </div>
                <div>
                  <span>甲方(委托方)：</span>
                  <input type="text" placeholder="债权人" :value='PlanInitData.debtName' disabled />
                </div>
                <div>
                  <span>身份证号码/统一社会信用代码：</span>
                  <input type="text" placeholder="债权人身份证号码" disabled :value='PlanInitData.personCard' />
                </div>
                <div>
                  <span>通讯地址：</span>
                  <input type="text" placeholder="债权人身份证地址" disabled :value='PlanInitData.priAdd' />
                </div>
                <div>
                  <span>联系人：</span>
                  <input type="text" placeholder="债权人姓名" disabled :value='PlanInitData.debtName' />
                </div>
                <div>
                  <span>联系电话：</span>
                  <input type="text" placeholder="债权人电话号码" disabled :value='PlanInitData.priPhone' />
                </div>
              </div>
              <div class="unlock-apply-container-form-plan-agreement-introduce-part-b">
                乙方(受托方)：山东盛世天泽公关顾问有限公司
                <br />统一社会信用代码：91371100MA3TA2E083
                <br />联系地址：山东省日照市经济开发区贵阳路以东上海路以南（山东纳义斯汽车配件有限公司三楼302）
                <br />联系人：蒋莎莉
                <br />联系电话：023-60946399
                <br />鉴于：
              </div>
              <div>甲方因无法解决自身债权债务,自愿委托乙方为其提供处理债权债务方案咨询服务,依据《中华人民共和国合同法》和国家有关法律、法规,甲乙双方经友好协商,签订本合同以共同遵守。</div>
              <div>
                <h3>第一条释义</h3>(一)债事:是指基于合法的原因产生的债权债务关系,在不同的语境中可能特指债权或债务或债权债务。
                <br />(二)处理债权债务咨询:是指乙方企业经营范围许可的经营活动,主要针对具有合法债权债务的客户群体进行调解安抚,结合其实际情况给予分析判断,提供具有建议性、可操作性、合法合理性的咨询方案
                <br />(三)债权人:特指本协议中确定的具体债权债务关系中享有债权的一方
                <br />(四)债务人:特指本协议中确定的具体债权债务关系中负有债务的一方。
                <br />
                <h3>第二条委托事项</h3>
                （一）甲方身份属于下列第
                <el-select v-model="SubmitPlanData.matters" >
                    <el-option :label="`(1)债权人`" :value="1" ></el-option>
                    <el-option :label="`(2)债务人`" :value="2" ></el-option>
                </el-select>种情况
                <br />(1)债权人,无法收回本协议确定的债权
                <br />(2)债务人,无法清偿自身所欠债务
                <br />（二）甲方因无法解决自身债权债务，在完全知晓和认可乙方处理债权债务咨询方式的情况下，委托乙方提供处理债权债务的咨询意见并支付策划方案服务费。
                <br />2.3甲方本次咨询乙方进行处理的债权债务金额
                <input type="text"  placeholder="解锁金额小写"  :disabled='true' :value='PlanInitData.amountThis'
                /> 元,（大写：
                <input type="text" placeholder="解锁金额大写" :value="PlanInitData.amountThisMax" :disabled='true'
                  class='mini-fontsize'
                /> 元整）。其中包括本金
                <input type="text" v-model='SubmitPlanData.servicePrincipal' />元,利息
                <input type="text" v-model='SubmitPlanData.serviceInterest' />元；
                <br />1.收集、查阅本项目相关的买卖合同、服务合同、借款协议及担保协议等协议文件,以及交易凭证、担保登记凭证等。
                <br />2.在分析本项目相关协议文件及各类凭证资料的基础上，就甲方本次债事咨询提供处置服务方案。
                <br />3.与本协议确定的债权债务关系相对人沟通债事处置服务方案：如甲方系债务人，相对方债权人不接受该方案，本协议自动终止；如甲方系债权人，相对方债务人不接受该方案的,不影响本协议的履行。
                <br />4.对本项目相关的其他债权债务问题，解答甲方的咨询，向甲方提供有关协助。
                <br />
                <h3>三、策划方案服务费及支付方式</h3>
                (一)甲方按照本协议约定的处理债权债务金额的10%向乙方支付策划方案服务费，策划方案服务费总额为人民币
                <input type="text" :disabled='true' :value='PlanInitData.thisPlanMoney' />元（大写：
                <input type="text" :disabled='true' :value='PlanInitData.thisPlanMoneyMax' />圆整）。
                <br />(二)甲方须将策划方案服务费支付至乙方指定的银行账户:
                <br />户名：山东盛世天泽公关顾问有限公司
                <br />账号：810101201421046328
                <br />开户行：日照银行股份有限公司银海支行
                <br />(三)支付时间:本协议签订之日,甲方一次性支付
                <br />(四)乙方收到策划方案服务费后须向甲方开具合法发票服务项目工作要求
                <br />
                <h3>第四条 服务项目工作要求</h3>
                （一）乙方应按照甲方委托合理安排工作步骤,以完成甲方的委托事务。
                <br />（二）为确保本项目顺利进行，甲方须全力配合乙方工作，包括及时向乙方提供本项目相关的协议文件和凭证资料，并给予乙方必要的工作时间等。
                <br />（三）乙方向甲方提供本项目咨询服务方案，或以书面、邮件等方式为甲方提供本项目服务方案咨询视为乙方已完成本协议约定的服务内容，甲方不得以任何理由要求乙方退还策划方案服务费。

                <h3>第五条双方的陈述和保证</h3>
                （一）甲方的陈述和保证
                <br />1.完全知晓和认可乙方咨询服务方式，自愿将本项目全权委托给乙方提供咨询服务；
                <br />2.本协议内容乙方已向甲方充分告知、说明并与甲方协商一致，甲方已充分理解并同意本协议的全部内容，愿意遵守<br />各项规则及本协议的所有内容；
                <br />3.本协议述及的债权债务关系真实且合法；
                <br />4.与乙方诚信合作，为乙方开展工作提供便利，向乙方提供与服务事项相关的情况和资料，并保证其真实、合法、有效；
                <br />5.如本项目有关的情况和事实发生变化，应及时告知乙方；
                <br />6.按照本协议约定支付策划方案服务费；
                <br />7.对本项目相关的全部内容保密,不得向任何第三方透露。
                <br />（二）乙方的陈述和保证
                <br />1.遵守职业道德和执业纪律；
                <br />2.勤勉尽职，依法在协议约定范围内为甲方提供咨询服务；
                <br />3.对本项目相关的全部内容保密，不得向任何第三方透露。
                <h3>第六条协议的变更和解除</h3>
                （一）本协议履行期间，发生特殊情况时，任何一方需变更本协议的，要求变更一方应及时书面通知对方，征得对方同意后，双方签订书面变更协议，该变更协议将成为本协议不可分割的部分。未经双方签署书面文件，任何一方无权变更本协议，否则由此造成相对方的经济损失，由责任方承担。
                <br />（二）因客观情况发生变化，甲乙双方可协商解除本协议。
                <br />（三）甲方自本协议签订后，应当积极配合乙方工作，不得阻碍或拒绝履行协议，否则乙方有权单方解除本协议，且策划方案服务费不予退还。
                <br />（四）甲方未依照本协议约定支付策划方案服务费，逾期超过一个月的，乙方有权解除本协议，并依据本协议的约定主张违约金。
                <h3>第七条违约责任</h3>7.1任何一方违约的,违约方按照策划方案服务费金额的10%向守约方支付违约金。
                <br />
                <h3>八、通知与送达</h3>
                <div>
                  （一）甲乙双方一致确认，本协议首部注明的通讯地址、联系人和联系电话为双方的有效送达地址，其适用范围包括：甲乙双方之间发出的任何通知、联络或争议进入民事诉讼程序后的一审程序、二审程序和执行程序有关司法文书的通知或送达。<br />
                    （二）对于任何通知、联络或司法文书，甲乙双方约定如下日期为正式送达日期：<br />
                    1.直接交付的，在交付时视为送达。<br />
                    2.以短信、微信方式发出的，以发件方发送后系统显示的时间视为送达。<br />
                3.以邮政快递形式发出的，在收件人拒收或者因送达地址、联系人和联系电话错误或不详而被退回时视为送达。<br />
                （三）甲乙双方的送达地址、联系人和联系电话如有变更的，须在变更前十日以书面形式通知相对方，在书面变更通知送达对方之前，视为送达地址、联系人和联系电话未变更。<br />
                </div>
                <h3>九、其他事项</h3>
                （一）因本协议发生争议，甲乙双方应当友好协商解决；协商不成的可向本协议签订地人民法院起诉。<br />
                （二）本协议未尽事宜,由甲乙双方另行签订补充协议,补充协议与本协议具有同等法律效力。<br />
                （三）本协议自甲乙双方签字或盖章后生效。本协议壹式叁份,甲方留存壹份,乙方留存貳份,具有同等法律效力。<br />
              </div>
              <div class='middle-message'>
                  <span>(以下无正文,为签署页)</span>
              </div>
                <el-form label-width="">
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <span class="col-label">甲方：</span>
                            <el-form-item label="">
                                <el-input :value="PlanInitData.debtName" :disabled='true'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <span class="col-label">乙方：</span>
                            <el-form-item label="">
                                <el-input :value="'山东盛世天泽公关顾问有限公司'" :disabled='true'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <span class="col-label">日期：</span>
                            <el-form-item label="">
                                <el-date-picker
                                align="left"
                                type="date"
                                placeholder="请选择日期"
                                :picker-options="pickerOptions"
                                :value="PlanInitData.contractDate"
                                :disabled='true'
                                value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <span class="col-label">乙方(签字盖章捺印)：</span>
                            <el-form-item label="">
                                <button type='button' class='update-voucher-button'>上传电子章</button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <p></p>
                        </el-col>
                        <el-col :span="8">
                            <span class="col-label">日期：</span>
                            <el-form-item label="">
                                <el-date-picker
                                align="left"
                                type="date"
                                placeholder="请选择日期"
                                :value="PlanInitData.contractDate"
                                :disabled='true'
                                :picker-options="pickerOptions"
                                value-format="yyyy-MM-dd"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="8">
                            <p></p>
                        </el-col>
                        <el-col :span="8">
                            <span class="col-label">合同签约地：</span>
                            <el-form-item label="">
                                <el-input type="text" :value="'重庆市渝中区'" :disabled='true'/></el-form-item>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
              <div
            </div>
            <div class="unlock-apply-container-form-determine3">
              <button type='button' @click="SubmitPlanMessage">确定</button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 甲乙双方印章默认数据源
      SealSrc: require('@imgs/home/company.png'),
      RelativeName: '',
      UserMsg: [
        {
          IsCoordinate: 'true',
          Type: 'debtor',
          Properties: 'person',
        },
      ],
      RelativeMsg: [
        {
          IsCoordinate: 'true',
          Type: 'debtor',
          Properties: 'person',
        },
      ],
      // 解债表单 1数据源,
      UnlockApplyMsg: [],
      // 担保人信息
      GuarantorMsg: [],
      // 相对人数据源
      RelativeList: [],
      DebtTreatment: '',
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
      // 解债年份：
      DebtReliefYear: '',
      // 解债类型
      DebtReliefType: '',
      // 债事化解咨询服务方案：
      ServicePlan: '',
      UpdataMsg: [],
      Uppercase: '',
      IsPopSelectiveList: true,
      UnlockUserMsg: {},
      // 提交解债表单
      SubmitData: {
        // 报备ID
        reportId: '',
        // 相对人ID
        relativePerId: '',
        // 民事调解ID
        civilId: '',
        // 债全总金额
        amountTotal: '',
        // 累计化解金额
        amountCumulative: '',
        // 本次化解金额
        amountThis: '',
        // 解债类型(1.寄售2.积分)
        debtType: '',
        // 解债年份
        debtYaer: '',
        // 甲方确认送达地址
        partyaAddr: '',
        // 甲方确认送达联系人
        partyaPerson: '',
        // 甲方确认送达联系电话
        partyaTel: '',
        // 乙方确认送达地址
        partybAddr: '',
        // 乙方确认送达联系人
        partybPerson: '',
        // 乙方确认送达联系电话
        partybTel: '',
        // 状态
        status: '0',
        // 甲方身份
        partyaIdentity: '1',
        // 乙方身份
        partybIdentity: '2',
        // 公司ID
        comId: '',
        // 本次策划方案服务费
        thisPlanMoney: '',
        // 1.易购卡2.否
        debtApply: '',
        // 附件上传
        uploadAnnex: [],
      },
      // 提交策划方案服务协议数据源
      SubmitPlanData: {
        // 身份
        matters: '',
        serviceNo: '',
        // 本金
        servicePrincipal: '',
        // 利息
        serviceInterest: '',
        contractDate: '',
        debtId: '',
      },
      // 民事调解书数据源
      MediaSrc: [],
      // 当前用户选择的民事调解书
      MediaIndex: 0,
      IsSendUnlockPhonecheck: false,
      // 发送验证的手机号码
      PhoneNumber: '',
      // 获取提交解债信息返回的解债ID
      ResponseDebtID: '',
      SendPhoneAndChekno: {
        tel: '',
        checkNo: '',
      },
      IsSendPhoneCheckMsg: false,
      // 是否提交了解债信息
      HasSubmitDebtMsg: false,
      // 策划方案服务协议初始化数据源
      PlanInitData: [],
      collapseActive: '1'
    }
  },
  methods: {
    SelectMore() {
      this.isNormal = !this.isNormal
    },
    // 上传资料
    UpdateVoucher() {
      this.$UpdateFile(this.$refs.UpdateMaterialVoucher.files[0]).then(
        (result) => {
          this.SubmitData.uploadAnnex.push(result)
        }
      )
    },
    // 解债申请信息初始化
    async InitData(relativePerId) {
      const formData = new FormData()
      formData.append('relativePerId', relativePerId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busRelativePersonController/selectByRelativePerId',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.UnlockUserMsg = result.data
    },
    // 提交解债信息
    async SubmitMessage() {
      // 短信验证
      const PhoneCheckFormData = new FormData()
      for (const key in this.SendPhoneAndChekno) {
        PhoneCheckFormData.append(key, this.SendPhoneAndChekno[key])
      }
      const { data: PhoneCheckResult } = await this.$http({
        method: 'post',
        url: '/api/api/smsSend/checkNO',
        data: PhoneCheckFormData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (PhoneCheckResult.resultCode !== '200') {
        return this.$message.error('短信验证码输入错误,请重新输入')
      }
      // 数据提交
      this.SubmitData.reportId = this.$route.query.reportId
      this.SubmitData.relativePerId = this.relativePerId
      this.SubmitData.thisPlanMoney = this.thisPlanMoney
      this.SubmitData.debtApply = this.SubmitData.debtType
      // 总金额
      this.SubmitData.amountTotal = this.UnlockUserMsg.amountTotal
      //  累计化解金额
      this.SubmitData.amountCumulative = this.transfeAmount
      this.SubmitData.comId = window.sessionStorage.getItem('companyId')
      console.log(this.SubmitData)
      const formData = new FormData()
      for (const key in this.SubmitData) {
        formData.append(key, this.SubmitData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/insertSelective',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.ResponseDebtID = result.data
      if (result.resultCode === '200') {
        // 调用status改变接口
        const StatusUpdateformData = new FormData()
        StatusUpdateformData.append('debtId', result.data)
        StatusUpdateformData.append('status', '4')
        StatusUpdateformData.append(
          'comId',
          sessionStorage.getItem('companyId')
        )
        const { data: StatusUpdateResult } = await this.$http({
          method: 'post',
          url: '/api/api/pubDebtController/updateStatus',
          data: StatusUpdateformData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (StatusUpdateResult.resultCode === '200') {
          // 初始化和显示策划方案协议页面
          this.InitPlanData()
          this.HasSubmitDebtMsg = true
          // 重新获取调解记录列表
          this.GetMsgList()
          this.$message.success('新增解债信息成功')
        } else {
          return this.$message.error('修改调解信息状态失败')
        }
      }
      const StageUpdateformData = new FormData()
      StageUpdateformData.append('reportId', this.$route.query.reportId)
      StageUpdateformData.append('stage', '3')
      StageUpdateformData.append('comId', sessionStorage.getItem('companyId'))
      await this.$http({
        method: 'post',
        url: '/api/api/busReportController/updateDebtStage',
        data: StageUpdateformData,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      this.$message.success('进入债权处理阶段,请填写策划方案协议')
      this.collapseActive = '4'
    },
    // 获取相对人的index及相对人ID
    GetMediaMsg(index) {
      // 获取相对人ID
      this.relativePerId = this.MediaSrc[this.MediaIndex].relativePerId
      this.InitData(this.relativePerId)
      const civilId = this.MediaSrc[this.MediaIndex].civilId
      this.SubmitData.civilId = this.MediaSrc[this.MediaIndex].civilId
      // 获取担保人信息列表
      this.Getguarantor(civilId)
    },
    // 进入调查报告页面
    GoInvestigationReport(index, item) {
      this.$router.push({
        path: '/ExamineReportForm',
        query: { debtId: item.debtId },
      })
    },
    // 查询担保人信息
    async Getguarantor(civilId) {
      const formData = new FormData()
      formData.append('civilId', civilId) // 修改
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busGuaranteeController/selectByPrimaryKey',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.GuarantorMsg = result.data
    },
    // 查询调解书信息
    async SearchConciliation() {
      const reportId = this.$route.query.reportId
      console.log(reportId)
      const formData = new FormData()
      formData.append('reportId', reportId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/busCivilController/selectCivi',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(result)
      this.MediaSrc = result.data
      this.MediaSrc.forEach((v, i) => {
        v.value = i
        // v.overViewContent = ``
      })
      this.GetMediaMsg(this.MediaIndex)
    },
    // 获取解债信息列表
    async GetMsgList() {
      const formData = new FormData()
      const reportId = this.$route.query.reportId
      formData.append('reportId', reportId)
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/selectByReportIds',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.UnlockApplyMsg = result.data
      console.log(this.UnlockApplyMsg)
    },
    async SendPhoneCheck() {
      // 发送短信验证码
      const tel = this.PhoneNumber
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
      if (result.resultCode !== '200')
        this.$message.error('手机验证失败, 请重试')
      this.$message({
        message: '手机验证码发送成功, 请填写正确的验证码',
        type: 'success',
      })
      // 存储发送成功的电话号码
      this.SendPhoneAndChekno.tel = tel
      this.IsSendPhoneCheckMsg = true
    },
    // 提交策划方案服务协议
    async SubmitPlanMessage() {
      const formData = new FormData()
      this.SubmitPlanData.debtId = this.PlanInitData.debtId
      this.SubmitPlanData.contractDate = this.PlanInitData.contractDate
      this.SubmitPlanData.serviceNo = this.PlanInitData.serviceNo
      this.SubmitPlanData.matters = this.PlanInitData.reportPropert
      for (const key in this.SubmitPlanData) {
        formData.append(key, this.SubmitPlanData[key])
      }
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/insertPlanInfo',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (result.resultCode === '200') {
        this.$message.success('新增策划方案服务协议信息成功')
        this.$router.push({path: '/MyDebt'})
      }
    },
    // 初始化策划方案服务协议
    async InitPlanData() {
      const formData = new FormData()
      formData.append('debtId', this.ResponseDebtID)
      formData.append('comId', window.sessionStorage.getItem('companyId'))
      const { data: result } = await this.$http({
        method: 'post',
        url: '/api/api/pubDebtController/initializePlan',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      this.PlanInitData = result.data
    },
    DelectVocher(index) {
        this.SubmitData.uploadAnnex.splice(index, 1)
    }
  },
  created() {
    this.SearchConciliation()
    this.GetMsgList()
  },
  computed: {
    thisPlanMoney: function () {
      if (Number(this.SubmitData.amountThis)) {
        return (Number(this.SubmitData.amountThis) * 0.1).toFixed(2)
      }
      return ''
    },
    // 甲方身份加工
    party1Identity: function () {
      return `(${this.SubmitData.partyaIdentity})债权人`
    },
    // 乙方身份加工
    party2Identity: function () {
      return `(${this.SubmitData.partybIdentity})债务人`
    },
    // 累计已转让债权金额：
    transfeAmount: function () {
      return (
        Number(this.UnlockUserMsg.amountCumulative) +
        Number(this.SubmitData.amountThis)
      )
    },
  },
}
</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.mini-fontsize {
  font-size: 12px;
}
.middle-message {
  text-align: center;
  margin: 50px 0;
}
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
.update-img-list {
  width: 800px;
  height: 100px;
  display: flex;
  align-items: center;
  border: 1px solid #e8eaec;
  margin-left: 20px;
  .update-img-list-item {
      position: relative;
      width: 90px;
      margin: 0 5px;
      &-delete {
          position: absolute;
          width: 25px;
          height: 25px;
          left: 80px;
          top: -8px;
      }
  }
  img {
    float: left;
    height: 75px;
    margin: 0 6px;
    width: 100px;
  }
  margin-right: 10px;
}
.update-img-button {
  position: relative;
  width: 90px;
  height: 28px;
  input[type='file'] {
    width: 90px;
    height: 28px;
    position: absolute;
    margin: 0;
    padding: 0;
    opacity: 0;
  }
}
.unlock-apply {
  display: flex;
  flex-direction: column;
  background-color: #e9f0f5;
  height: 100%;
  width: 100%;

  input:disabled {
    background-color: #e0e3f8;
  }
  &-title {
    height: px2rem(12);
    line-height: px2rem(12);
    font-size: px2rem(4);
    color: #fc7f89;
    margin: px2rem(1) px2rem(4);
    &-go1 {
      color: #616789;
    }
    &-separator {
      color: #616789;
    }
  }

  &-container {
    margin: px2rem(1) px2rem(4);
    &-form {
      border-radius: px2rem(2);
      background-color: #fff;
      padding: px2rem(2) px2rem(6);
      font-size: px2rem(3.2);
      input[type='radio'] {
        width: px2rem(4) !important;
        height: px2rem(4) !important;
        line-height: px2rem(4) !important;
        margin: px2rem(1) !important;
        vertical-align: middle;
        background-color: #fff;
      }
      input {
        font-size: px2rem(3.5);
        border: 1px solid #e8eaec;
        border-radius: px2rem(1);
        height: px2rem(6);
        padding-left: px2rem(2);
        margin: px2rem(1);
      }
      &-new {
        width: 100%;
        button {
          width: px2rem(18);
          font-size: px2rem(3.5);
          border: none;
          background-color: #fc7f89;
          color: #fff;
          padding: px2rem(1) px2rem(2);
          border-radius: px2rem(1);
        }
      }
      // unlock-apply-container-form-table-1-item
      &-table-1-title {
        margin-top: px2rem(4);
        display: flex;
        span {
          text-align: center;
          color: #fff;
          background-color: #616789;
          border: 0.5px solid #fff;
          box-sizing: border-box;
          display: inline-block;
          height: px2rem(8);
          line-height: px2rem(8);
        }
        :nth-child(1) {
          flex: 1;
        }
        :nth-child(2) {
          flex: 4;
        }
        :nth-child(6) {
          flex: 2.5;
        }
        :nth-child(3),
        :nth-child(4),
        :nth-child(5) {
          flex: 5.5;
        }
        :nth-child(7) {
          flex: 4;
        }
      }
      &-table-1 {
        &-item {
          display: flex;
          justify-content: space-around;
          line-height: px2rem(7);
          span {
            text-align: center;
            border: 1px solid #fff;
            box-sizing: border-box;
          }
          :nth-child(1) {
            flex: 1;
          }
          :nth-child(2) {
            flex: 4;
          }
          :nth-child(6) {
            flex: 2.5;
          }
          :nth-child(3),
          :nth-child(4),
          :nth-child(5) {
            flex: 5.5;
          }
          :nth-child(7) {
            flex: 4;
            button {
              flex: 1;
              font-size: px2rem(3.2);
              border: none;
              border-radius: px2rem(1);
              color: #fff;
              margin: 0 px2rem(3);
              padding: px2rem(1) px2rem(2.5);
            }
            :last-child {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(odd) {
          background-color: #fff;
        }
        div:nth-child(even) {
          background-color: #e0e3f8;
          span {
            border: 1px solid #e0e3f8;
          }
        }
      }
      &-select {
        .el-select {
          width: px2rem(70);
        }
      }
      &-submit {
        text-align: center;
        margin-top: px2rem(6);
        button {
          font-size: px2rem(3.2);
          width: px2rem(50);
          height: px2rem(8);
          background-color: #616789;
          color: #fff;
          border: none;
          border-radius: px2rem(1);
        }
      }
      h3 {
        margin: px2rem(2) 0;
      }
      &-new-guarantor {
        button {
          border: none;
          font-size: px2rem(3.5);
          background-color: #616789;
          color: #fff;
          padding: px2rem(1) px2rem(2);
          border-radius: px2rem(1);
        }
      }
      &-table-2-title {
        margin-top: px2rem(4);
        display: flex;
        height: px2rem(6) I;
        span {
          text-align: center;
          color: #fff;
          background-color: #616789;
          border: 0.5px solid #fff;
          box-sizing: border-box;
          display: inline-block;
          height: px2rem(8);
          line-height: px2rem(8);
        }
        :nth-child(1) {
          flex: 1.1;
        }
        :nth-child(2),
        :nth-child(5),
        :nth-child(6) {
          flex: 2;
        }
        :nth-child(3),
        :nth-child(4),
        :nth-child(7) {
          flex: 3;
        }
      }
      &-table-2 {
        &-item {
          display: flex;
          justify-content: space-around;
          line-height: px2rem(7);
          span {
            flex: 3;
            text-align: center;
            border: 1px solid #fff;
            box-sizing: border-box;
          }
          :nth-child(1) {
            flex: 1.1;
          }
          :nth-child(2),
          :nth-child(5),
          :nth-child(6) {
            flex: 2;
          }
          :nth-child(3),
          :nth-child(4),
          :nth-child(7) {
            flex: 3;
          }
          :nth-child(7) {
            button {
              font-size: px2rem(2);
              margin: px2rem(6);
              border: none;
              height: px2rem(5);
              line-height: px2rem(5);
              border-radius: px2rem(1);
              color: #fff;
              width: px2rem(12);
              margin: 0 px2rem(3);
            }
            :first-child {
              background-color: #616789;
            }
            :last-child {
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(odd) {
          background-color: #fff;
        }
        div:nth-child(even) {
          background-color: #e0e3f8;
          span {
            border: 1px solid #e0e3f8;
          }
        }
      }
      &-phonecheck {
        margin: px2rem(2) 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: px2rem(3);
        height: px2rem(10);
        position: relative;
        input {
          border: 1px solid #e8eaec;
        }
        div {
          flex: 1;
        }
        span {
          display: inline-block;
          width: px2rem(18);
          margin-right: px2rem(2);
        }
        :nth-child(1) {
          span {
            width: px2rem(16);
          }
          .el-input {
            width: px2rem(76);
          }
        }
        :nth-child(2) {
          span {
            width: px2rem(18);
          }
          .el-input {
            width: px2rem(75);
          }
          button {
            left: px2rem(177);
            position: absolute;
            height: px2rem(8);
            margin-left: px2rem(2);
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
        :nth-child(3) {
          button {
            height: px2rem(8);
            margin-left: px2rem(2);
            background-color: #616789;
            border: none;
            border-radius: px2rem(1);
            color: #fff;
          }
        }
      }
      &-defuse-1 {
        display: flex;
        div {
          flex: 1;
        }
        :nth-child(1) {
          input {
            width: px2rem(70);
          }
        }
        :nth-child(2) {
          input {
            width: px2rem(58.5);
          }
        }
        :nth-child(3) {
          color: #ff0000;
          line-height: px2rem(8);
        }
      }
      &-defuse-2 {
        display: flex;
        div {
          flex: 1;
        }
        :nth-child(1) {
          input {
            width: px2rem(41.5);
          }
        }
        :nth-child(2) {
          input {
            width: px2rem(42.5);
          }
        }
      }
      // form2 债事咨询服务协议
      &-updata {
        button {
          width: px2rem(18);
          font-size: px2rem(3.5);
          border: none;
          background-color: #616789;
          color: #fff;
          padding: px2rem(1) px2rem(2);
          border-radius: px2rem(1);
        }
      }
      &-table-3-title {
        margin-top: px2rem(4);
        display: flex;
        height: px2rem(6) I;
        span {
          text-align: center;
          color: #fff;
          background-color: #616789;
          border: 0.5px solid #fff;
          box-sizing: border-box;
          display: inline-block;
          height: px2rem(8);
          line-height: px2rem(8);
        }
        :nth-child(1) {
          flex: 1.1;
        }
        :nth-child(2),
        :nth-child(4) {
          flex: 3;
        }
        :nth-child(3) {
          flex: 8;
        }
      }
      &-table-3 {
        &-item {
          display: flex;
          justify-content: space-around;
          line-height: px2rem(7);
          span {
            text-align: center;
            border: 1px solid #fff;
            box-sizing: border-box;
          }
          :nth-child(1) {
            flex: 1.1;
          }
          :nth-child(2) {
            flex: 3;
          }
          :nth-child(3) {
            flex: 8;
          }
          :nth-child(4) {
            flex: 3;
            button {
              font-size: px2rem(2);
              margin: px2rem(6);
              border: none;
              height: px2rem(5);
              line-height: px2rem(5);
              border-radius: px2rem(1);
              color: #fff;
              width: px2rem(12);
              margin: 0 px2rem(3);
              background-color: #fc7f89;
            }
          }
        }
        div:nth-child(odd) {
          background-color: #fff;
        }
        div:nth-child(even) {
          background-color: #e0e3f8;
          span {
            border: 1px solid #e0e3f8;
          }
        }
      }
      // 策划方案服务协义
      &-plan-agreement {
        // 默认表单宽度 为200
        input {
          width: px2rem(40);
          background-color: #f2f6f9;
        }
        // placehoder位置居中
        input::-ms-input-placeholder {
          text-align: center;
        }
        input::-webkit-input-placeholder {
          text-align: center;
        }
        // 小型表单宽度
        &-input100 {
          width: px2rem(20) !important;
        }
        &-title {
          border-top: 1px solid #f2f2f2;
          text-align: center;
          font-size: px2rem(4);
          height: px2rem(20);
          line-height: px2rem(20);
          font-weight: 600;
        }
        &-introduce-part-a > div {
          display: flex;
          width: 500px;
          input {
            width: 100%;
          }
          span {
            flex-shrink: 0;
          }
        }
        &-introduce-part-b {
          line-height: px2rem(5);
        }
        &-address {
          input {
            background-color: #fff !important;
          }
          div:nth-child(1) {
            input {
              width: px2rem(60);
            }
          }
          div:nth-child(2) {
            input {
              width: px2rem(63);
            }
          }
          div:nth-child(3) {
            input {
              width: px2rem(60);
            }
          }
        }
        &-sign {
          margin-top: px2rem(10);
          display: flex;
          width: px2rem(220);
          input {
            background-color: #fff;
          }

          button {
            font-size: px2rem(3.2);
            width: px2rem(22);
            height: px2rem(6);
            background-color: #616789;
            color: #fff;
            border: none;
            border-radius: px2rem(1);
          }
          &-left {
            flex: 1;
            position: relative;
            img {
              position: absolute;
              width: px2rem(25);
              left: 0;
              top: 0;
            }
            div:nth-child(1) {
              input {
                width: px2rem(50);
              }
            }
            div:nth-child(3) {
              input {
                width: px2rem(52.4);
              }
            }
            &-seal {
              height: px2rem(7);
              width: px2rem(22) !important;
              position: absolute;
              left: px2rem(30);
              opacity: 0;
              margin: 0 !important;
            }
          }
          &-right {
            flex: 1;
            position: relative;
            img {
              position: absolute;
              width: px2rem(25);
              left: 0;
              top: 0;
            }
            div:nth-child(1) {
              input {
                width: px2rem(50);
              }
            }
            div:nth-child(3) {
              input {
                width: px2rem(52);
              }
            }
            div:nth-child(4) {
              input {
                width: px2rem(50);
              }
            }
            &-seal {
              height: px2rem(7);
              width: px2rem(22) !important;
              position: absolute;
              left: px2rem(30);
              opacity: 0;
              margin: 0 !important;
            }
          }
        }
        // &-plan-agreement-content {
      }
      // }
      &-determine3 {
        margin-top: px2rem(10);
        text-align: center;
        button {
          font-size: px2rem(3.2);
          width: px2rem(50);
          height: px2rem(8);
          background-color: #616789;
          color: #fff;
          border: none;
          border-radius: px2rem(1);
        }
      }
      // 确定按钮
      &-determine {
        margin-top: px2rem(6);
        button {
          font-size: px2rem(3.2);
          width: px2rem(50);
          height: px2rem(8);
          background-color: #616789;
          color: #fff;
          border: none;
          border-radius: px2rem(1);
        }
      }
    }
  }
  &-pop-relative {
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
</style>
