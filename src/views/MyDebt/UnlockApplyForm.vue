<!--  -->
<template>
  <div class='unlock-apply'>
        <div class='unlock-apply-title'>
            <span class='unlock-apply-title-go1'>我的债行</span>
            <span class='unlock-apply-title-separator'> / </span>
            <span class='unlock-apply-title-go2'>债权处理</span>
        </div>
        <div class='unlock-apply-container'>
            <div class='unlock-apply-container-form'>
                <el-collapse>
                    <!-- 关系绑定 -->
                    <el-collapse-item title="关系绑定" name="1">
                        <div class='unlock-apply-container-form-new'>
                            <button>新增</button>
                        </div>
                        <div class='unlock-apply-container-form-table-1-title'>
                            <span>序号</span>
                            <span>报备号</span>
                            <span>民事调解协议号</span>
                            <span>服务协议ID</span>
                            <span>服务协议号</span>
                            <span>债务人</span>
                            <span>操作</span>
                        </div>
                        <div class='unlock-apply-container-form-table-1'>
                            <div class='unlock-apply-container-form-table-1-item' v-for='(item,index) in UnlockApplyMsg' :key='index'>
                                <span>{{index+1}}</span>
                                <span>{{item.reportNo}}</span>
                                <span>{{item.civilno}}</span>
                                <span>{{item.debtId}}</span>
                                <span>{{item.debtNo}}</span>
                                <span>{{item.personName}}</span>
                                <span>
                                    <button @click='GoInvestigationReport(index)'>填写调查报告</button>
                                </span>
                            </div>
                        </div>
                        <h3>调解书信息</h3>
                        <div class='unlock-apply-container-form-select'>
                            选择调解书：
                            <el-select v-model='MediaIndex' @change="GetMediaMsg">
                                <el-option :label="`${item.civilno} 债务人: ${item.personName}`" :value="item.value" v-for='(item,index) in MediaSrc' :key='index'></el-option>
                            </el-select>
                        </div>
                        <h3>债事人信息</h3>
                        <div class='unlock-apply-container-form-debtor-1'>
                            <div>
                                甲方（债事人名称/姓名）：<input type="text" :value='UnlockUserMsg.debtName' :disabled='true'>
                            </div>
                            <div>
                                法定代表人/负责人：<input type="text" :value='UnlockUserMsg.debtLegalName' :disabled='true'>
                            </div>
                            <div>
                                身份证号码/信用代码：<input type="text" :value='UnlockUserMsg.debtIdCardCode' :disabled='true'>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-debtor-2'>
                            <div>
                                所住地：：<input type="text" :value='UnlockUserMsg.debtAdd' :disabled='true'>
                            </div>
                            <div>
                                联系电话：<input type="text" :value='UnlockUserMsg.debtPhone' :disabled='true'>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>相对人信息</h3>
                        <div class='unlock-apply-container-form-relative-1'>
                            <div>
                                乙方（相对人名称/姓名）：<input type="text" :value='UnlockUserMsg.personalName' :disabled='true'>
                            </div>
                            <div>
                                法定代表人/负责人：<input type="text" :value='UnlockUserMsg.personalLegalName' :disabled='true'>
                            </div>
                            <div>
                                身份证号码/信用代码：<input type="text"  :value='UnlockUserMsg.personalIdCardCode' :disabled='true'>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-relative-2'>
                            <div>
                                所住地：：<input type="text" :value='UnlockUserMsg.personalAdd' :disabled='true'>
                            </div>
                            <div>
                                联系电话：<input type="text" :value='UnlockUserMsg.personalPhone' :disabled='true'>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>担保人信息</h3>
                        <!-- 表单2 担保人表单 -->
                        <div class='unlock-apply-container-form-table-2-title'>
                            <span>序号</span>
                            <span>单位类型</span>
                            <span>担保人（姓名/企业名称）</span>
                            <span>身份证号码/信用代码</span>
                            <span>联系电话</span>
                            <span>所住地</span>
                        </div>
                        <div class='unlock-apply-container-form-table-2'>
                            <div class='unlock-apply-container-form-table-2-item' v-for='(item,index) in GuarantorMsg' :key='index'>
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
                        <div class='unlock-apply-container-form-defuse-1'>
                            <div>
                                债权总金额：<input type="text" v-model='SubmitData.amountTotal'>
                            </div>
                            <div>
                                累计已转让债权金额：<input type="text" v-model='SubmitData.amountCumulative'>
                            </div>
                            <div>
                                注：请确定金额无误后在输入，输入后不可更改
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-defuse-2'>
                            <div>
                                本次申请转让债权金额（小写）：<input type="text" v-model='SubmitData.amountThis'>
                            </div>
                            <div>
                                本次申请转让债权金额（大写）：<input type="text" :disabled='true' :value='SubmitData.amountThis|Uppercase'>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>手机验证码认证</h3>
                        <div class='unlock-apply-container-form-phonecheck'>
                            <div>
                                <span>手机号码：</span>
                                <el-input v-input-num maxlength="11" v-model='PhoneNumber'></el-input>
                            </div>
                            <div>
                                <span>手机验证码：</span>
                                <el-input maxlength="4" v-model='SendPhoneAndChekno.checkNo'></el-input>
                                <button @click='SendPhoneCheck'>点击获取</button>
                            </div>
                            <div>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="债权处理方式" name="2">
                        <div class='unlock-apply-container-form-relative-3'>
                            <div>
                                债权处理类型：
                                <el-select v-model="SubmitData.debtType" placeholder="请选择">
                                    <el-option label="寄售" value="1"></el-option>
                                    <el-option label="积分" value="2"></el-option>
                                </el-select>
                            </div>
                            <div>
                                债权处理年限：
                                <el-select v-model="SubmitData.debtYaer" placeholder="请选择">
                                    <el-option label="一年" value="1"></el-option>
                                    <el-option label="二年" value="2"></el-option>
                                    <el-option label="三年" value="3"></el-option>
                                </el-select>
                            </div>
                            <div></div>
                        </div>
                    </el-collapse-item>
                    <!-- 债事咨询服务协议 -->
                    <el-collapse-item title="咨询服务协议" name="3">
                        <h3>甲方信息</h3>
                        <div class='unlock-apply-container-form-serve-agreement-debtor-1'>
                            <div>
                                甲方（债权人）：<input type="text" :value='UnlockUserMsg.debtName' :disabled='true'>
                            </div>
                            <div>
                                身份证号码/统一社会信用代码：<input type="text" :value='UnlockUserMsg.debtIdCardCode' :disabled='true'>
                            </div>
                            <div>
                                法定/联系地址：<input type="text" :value='UnlockUserMsg.debtAdd' :disabled='true'>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-serve-agreement-debtor-2'>
                            <div>
                                联系电话：<input type="text" :value='UnlockUserMsg.debtPhone' :disabled='true'>
                            </div>
                            <div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>乙方信息</h3>
                        <div class='unlock-apply-container-form-serve-agreement-relative-1'>
                            <div>
                                乙方（债务人）：<input type="text" :value='UnlockUserMsg.personalName' :disabled='true'>
                            </div>
                            <div>
                                身份证号码/统一社会信用代码：<input type="text" :value='UnlockUserMsg.personalIdCardCode' :disabled='true'>
                            </div>
                            <div>
                                法定/联系地址：<input type="text" :value='UnlockUserMsg.personalAdd' :disabled='true'>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-serve-agreement-relative-2'>
                            <div>
                                联系电话：<input type="text" :value='UnlockUserMsg.personalPhone' :disabled='true'>
                            </div>
                            <div>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>委托事项</h3>
                        <div class='unlock-apply-container-form-serve-agreement-commitment-1'>
                            <div>
                                甲方身份情况：<input type="text" v-model='SubmitData.partyaIdentity' placeholder="债权人">
                            </div>
                            <div>
                                (1)债权人，无法收回确定的债权; (2)债务人，无法清偿自身所欠债务
                            </div>
                            <div>
                                债权处理申请：
                                <el-select v-model="SubmitData.servicePlan" placeholder="请选择">
                                    <el-option label="易物卡" :value="1"></el-option>
                                    <el-option label="否" :value="2"></el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-serve-agreement-commitment-2'>
                            <div>
                                乙方身份情况：<input type="text" v-model='SubmitData.partybIdentity' placeholder="债务人">
                            </div>
                            <div>
                                (1)债权人，无法收回确定的债权; (2)债务人，无法清偿自身所欠债务
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-serve-agreement-commitment-3'>
                            <div>
                                本次债权处理申请金额（小写）：<input type="text" v-model='SubmitData.amountThis' >
                            </div>
                            <div>
                                本次债权处理申请金额（大写）：<input type="text" :value='SubmitData.amountThis | Uppercase' :disabled='true'>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>三方约定策划方案服务费</h3>
                        <div class='unlock-apply-container-form-serve-agreement-service-charge-1'>
                            <div>
                                策划方案服务费率：<input type="text" v-model='SubmitData.serviceInterest'>
                            </div>
                            <div>
                                本次策划方案服务费（小写）：<input type="text" v-model='SubmitData.servicePrincipal'>
                            </div>
                            <div>
                                本次策划方案服务费（大写）：<input type="text" :value='SubmitData.servicePrincipal | Uppercase' :disabled='true'>
                            </div>
                        </div>
                        <h3>其他约定事项</h3>
                        <div class='unlock-apply-container-form-serve-agreement-mailing-address-1'>
                            <div>
                                甲方确认送达地址：<input type="text" v-model='SubmitData.partyaAddr'>
                            </div>
                            <div>
                                甲方确认送达联系人：<input type="text" v-model='SubmitData.partyaPerson'>
                            </div>
                            <div>
                                甲方确认送达联系电话：<input type="text" v-model='SubmitData.partyaTel'>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-serve-agreement-mailing-address-2'>
                            <div>
                                乙方确认送达地址：<input type="text" v-model='SubmitData.partybAddr'>
                            </div>
                            <div>
                                乙方确认送达联系人：<input type="text" v-model='SubmitData.partybPerson'>
                            </div>
                            <div>
                                乙方确认送达联系电话：<input type="text" v-model='SubmitData.partybTel'>
                            </div>
                        </div>
                        <h3>附件信息</h3>
                        <div class='unlock-apply-container-form-updata'>
                            <button>点击上传</button>
                        </div>
                        <!-- 上传信息 -->
                        <div class='unlock-apply-container-form-table-3-title'>
                            <span>序号</span>
                            <span>文件名称</span>
                            <span>文件地址</span>
                            <span>操作</span>
                        </div>
                        <div class='unlock-apply-container-form-table-3'>
                            <div class='unlock-apply-container-form-table-3-item' v-for='(item,index) in UpdataMsg' :key='index'>
                                <span>{{index+1}}</span>
                                <span>{{item.FileName}}</span>
                                <span>{{item.FileAddress}}</span>
                                <span>
                                    <button>删除</button>
                                </span>
                            </div>
                        </div>
                    </el-collapse-item>
                    <!-- 策划方案服务协义 -->
                    <el-collapse-item title="策划方案服务协义" name="4">
                        <div class='unlock-apply-container-form-plan-agreement'>
                            <div class='unlock-apply-container-form-plan-agreement-title'>
                                策划方案服务协义
                            </div>
                            <div class='unlock-apply-container-form-plan-agreement-introduce-part-a'>
                                <div>甲方(委托方)：<input type="text" placeholder="债权人" disabled :value='UnlockUserMsg.debtName'></div>
                                <div>身份证号码统一社会信用代码：<input type="text" placeholder="债权人身份证号码" disabled :value='UnlockUserMsg.debtIdCardCode'></div>
                                <div>法定联系地址：<input type="text" placeholder="债权人报备时填的地址" disabled :value='UnlockUserMsg.debtAdd'></div>
                                <div>联系电话：<input type="text" placeholder="债权人电话号码" disabled :value='UnlockUserMsg.debtPhone'></div>
                            </div>
                            <div class='unlock-apply-container-form-plan-agreement-introduce-part-b'>
                                乙方(受托方)：山东盛世天泽公关顾问有限公司<br>
                                统一社会信用代码：91371100MA3TA2E083<br>
                                联系地址：日照市经济开发区天津路99号五楼501室<br>
                                联系电话：15523336111<br>
                            </div>
                            <div>甲方因无法解决自身债权债务,自愿委托乙方为其提供处理债权债务方案咨询服务,依据《中华人民共和国合同法》和国家有关法律、法规,甲乙双方经友好协商,签订本合同以共同遵守。</div>
                            <div>
                                <h3>第一条释义</h3>
                                1.1债事:是指基于合法的原因产生的债权债务关系,在不同的语境中可能特指债权或债务或债权债务。<br>
                                1.2处理债权债务咨询:是指乙方企业经营范围许可的经营活动,主要针对具有合法债权债务的客户群体进行调解安抚,结合其实际情况给予分析判断,提供具有建议性、可操作性、合法合理性的咨询方案<br>
                                1.3债权人:特指本协议中确定的具体债权债务关系中享有债权的一方<br>
                                1.4债务人:特指本协议中确定的具体债权债务关系中负有债务的一方。<br>
                                <h3>第二条委托事项</h3>
                                2.1甲方身份属于下列第1种情况<br>
                                (1)债权人,无法收回本协议确定的债权<br>
                                (2)债务人,无法清偿自身所欠债务<br>
                                2.2甲方因无法解决自身债权债务,在完全知晓和认可乙方处理债权债务咨询方式的情况下,委托乙方提供处理债权债务的咨询意见并支付策划方案服务费。为保障甲方策划方案服务费款的安全,乙方愿意就甲方策划方案服务费款项提供等额担保供甲方选择,甲方选择如下第<input type="text">种方式：<br>
                                （1）无需担保<br>
                                （2）同等价值资产包质押<br>
                                若甲方选择（2）,乙方有权向甲方额外收取3%的服务费。<br>
                                选择（2）同等价值资产包质押具体细节详见《服务费担保合同》<br>
                                2.3甲方本次咨询乙方进行处理的债权债务金额<input type="text" placeholder="解锁金额小写" :value='SubmitData.amountThis'> 元,（大写：<input type="text" placeholder="解锁金额大写" :value='SubmitData.amountThis | Uppercase'> 元整）。其中包括本金<input type="text" >元,利息<input type="text" >元；<br>
                                2.4乙方接受甲方委托,为甲方提供处理债权债务咨询服务(以下简称“本项目”),具体包括；<br>
                                (1)收集、查阅本项目相关的借款协议、担保协议等协议文件,以及交易凭证、担保登记凭证等<br>
                                (2)在分析本项目相关协议文件及各类凭证资料的基础上,就甲方本次债事咨询提供处置方案<br>
                                (3)与本协议确定的债权债务关系相对人沟通债事处置服务方案:如甲方系债务人,相对方债权人不接受该方案,本协议自动终止:如甲方系债权人,相对方债务人不接受该方案的,不影响本协议的履行:<br>
                                (4)对本项目相关的其他债事问题,解答甲方的咨询,向甲方提供有关协助。<br>
                                <h3>第三条策划方案服务费及支付方式</h3>
                                3.1甲方按照本协议2.3条约定的处理债权债务金额<input type="text" placeholder="解锁金额小写" :value='SubmitData.amountThis'> 整,大写<input type="text" placeholder="解锁金额大写" :value='SubmitData.amountThis | Uppercase'> 圆整）的10%向乙方支付策划方案服务费,策划方案服务费<input type="text" placeholder="人民币小写" >元（大写：<input type="text" placeholder="人民币大写" >圆整）。<br>
                                3.2甲方须将策划方案服务费支付至乙方指定的银行账户:<br>
                                户名：山东盛世天泽公关顾问有限公司<br>
                                账号：810101201421046328<br>
                                开户行：日照银行股份有限公司银海支行<br>
                                3.3支付时间:本协议签订之日,甲方一次性支付<br>
                                3.4乙方收到策划方案服务费后须向甲方开具合法发票服务项目工作要求<br>
                                <h3>第四条 服务项目工作要求</h3>
                                4.1乙方应按照甲方委托合理安排工作步骤,以完成甲方的委托事务。<br>
                                4.2为确保本项目顺利进行,甲方须全力配合乙方工作,包括及时向乙方提供本项目相关的协议文件和凭证资料,并给予乙方必要的工作时间等<br>
                                4.3乙方向甲方提供本项目咨询服务方案,或以书面、邮件等方式为甲方提供本项目服务方案咨询视为乙方己完成本协议约定的服务内容,甲方不得以任何理由要求乙方退还策划方案服务费。<br>
                                <h3>第五条双方的陈述和保证</h3>
                                5.1甲方的陈述和保证<br>
                                (1)完全知晓和认可乙方咨询服务方式,自愿将本项目全权委托给乙方提供咨询服务:<br>
                                (2)本协议内容乙方已向甲方充分告知、说明并与甲方协商一致,甲方已充分理解并同意本协议的全部内容,愿意遵守各项规则及本协议的所有内容<br>
                                (3)本协议述及的债权债务关系真实且合法<br>
                                (4)本项目咨询服务指定乙方作为其唯一咨询服务方,不得再委托他人:<br>
                                (5)与乙方诚信合作,为乙方开展工作提供便利,向乙方提供与服务事项相关的情况和资料,并保证其真实、合法、有效<br>
                                (6)如本项目有关的情况和事实发生变化,应及时告知乙方:<br>
                                (7)按照本协议约定支付策划方案服务费<br>
                                (8)对本项目相关的全部内容保密,不得向任何第三方透露<br>
                                5.2乙方的陈述和保证<br>
                                (1)遵守职业道德和执业纪律<br>
                                (2)勤勉尽职,依法在协议约定范围内为甲方提供咨询服务<br>
                                (3)对本项目相关的全部内容保密,不得向任何第三方透露<br>
                                <h3>第六条协议的变更和解除</h3>
                                6.1本协议履行期间,发生特殊情况时,任何一方需变更本协议的,要求变更一方应及时书面通知对方,征得对方同意后,双方签订书面变更协议,该协议将成为本合同不可分割的部分。未经双方签署书面文件,任何一方无权变更本协议,否则由此造成对方的经济损失,由责任方承担<br>
                                6.2因客观情况发生变化,甲乙双方可协商解除本协议<br>
                                6.3甲方自本协议签订后,应当积极配合乙方工作,不得阻碍或拒绝履行协议,否则乙方有权单方解除本协议,且策划方案服务费不予退还<br>
                                6.4甲方未依照本协议约定支付策划方案服务费,逾期超过一个月的,乙方有权解除本协议,并依据本协议7.1条的约定主张违约金
                                <h3>第七条违约责任</h3>
                                7.1任何一方违约的,违约方按照策划方案服务费金额的10%向守约方支付违约金。<br>
                                <h3>第八条其他事项</h3>
                                <div>
                                    8.1为联络和送达方便,双方确认送达地址如下:<br>
                                    <div class='unlock-apply-container-form-plan-agreement-address'>
                                        <div>甲方地址: <input type="text"  v-model='SubmitData.partyaAddrInfo' ></div>
                                        <div>联系人: <input type="text" v-model='SubmitData.partyaPersonInfo' ></div>
                                        <div>联系电话: <input type="text" v-model='SubmitData.partyaTelInfo' ></div>
                                    </div>
                                    乙方地址: 日照市经济开发区天津路99号5路501室<br>
                                    联系人: 黄希<br>
                                    联系电话: 15523336111<br>
                                    按上述地址送达均视为有效送达,地址发生变更的的一方应在变更后五日内书面通知对方,否则依上述地址的送达仍为有效送达<br>
                                    8.2甲乙双方如发生争执,应当友好协商解决,协商不成的双方同意向乙方住所地人民法院提起诉讼<br>
                                    8.3本协议未尽事宜,由甲乙双方另行签订补充协议,补充协议与本协议具有同等的法律效力<br>
                                    8.4本协议自双方签字盖章之日起生效,本协议壹式叁份,甲方留存壹份,乙方留存贰份,具有同等的法律效力<br>
                                    8.5其他约定事项: 无<br>
                                </div>
                            </div>
                            <div class='unlock-apply-container-form-plan-agreement-sign'>
                                <div class='unlock-apply-container-form-plan-agreement-sign-left'>
                                    <div>授权代表人：<input type="text" v-model='SubmitData.partyaDeputy'></div>
                                    <div>
                                        甲方(签字盖章捺印)：
                                        <button>上传电子章</button>
                                        <input type="file" ref='PartASeal' @change="UpdatePartASeal" class='unlock-apply-container-form-plan-agreement-sign-left-seal'>
                                    </div>
                                    <div>签约日期：<el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="SubmitData.partyaDate" value-format="yyyy-MM-dd"></el-date-picker></div>
                                    <img :src="SubmitData.partyaSeal? SubmitData.partyaSeal : SealSrc" alt="">
                                </div>
                                <div class='unlock-apply-container-form-plan-agreement-sign-right'>
                                    <div>授权代表人：<input type="text" v-model='SubmitData.partybDeputy'></div>
                                    <div>
                                        乙方(签字盖章捺印)：
                                        <button @click='UpdatePartBSeal' >上传电子章</button>
                                        <input type="file" ref='PartBSeal' @change="UpdatePartBSeal" class='unlock-apply-container-form-plan-agreement-sign-right-seal'>
                                    </div>
                                    <div>签约日期：<el-date-picker align="left" type="date" placeholder="请选择日期" :picker-options="pickerOptions" v-model="SubmitData.partybDate" value-format="yyyy-MM-dd"></el-date-picker></div>
                                    <div>合同签约地：<input type="text" v-model='SubmitData.contractPlace'></div>
                                    <img :src="SubmitData.partybSeal? SubmitData.partybSeal : SealSrc" alt="">
                                </div>
                            </div>
                        </div>
                        <div class='unlock-apply-container-form-determine3'>
                            <button @click='SubmitMessage' :disabled='!IsSendPhoneCheckMsg'>确定</button>
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
            // 甲乙双方印章默认数据源
            SealSrc: require('@imgs/home/company.png'),
            RelativeName: '',
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
            // 解债表单 1数据源,
            UnlockApplyMsg: [],
            // 担保人信息
            GuarantorMsg: [],
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
            TimeSelect: {
                TimeStart: '',
                TimeEnd: '',
                ClosingTime: ''
            },
            DebtTreatment: '',
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
                    text: '今天',
                    onClick (picker) {
                        picker.$emit('pick', new Date())
                    }
                }, {
                    text: '昨天',
                    onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                    }
                }, {
                    text: '一周前',
                    onClick (picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', date)
                    }
                }]
            },
            // 解债年份：
            DebtReliefYear: '',
            // 解债类型
            DebtReliefType: '',
            // 债事化解咨询服务方案：
            ServicePlan: '',
            UpdataMsg: [
                {
                    Id: '1',
                    FileName: '文件名1',
                    FileAddress: '地址1'
                },
                {
                    Id: '2',
                    FileName: '文件名2',
                    FileAddress: '地址2'
                },
                {
                    Id: '3',
                    FileName: '文件名3',
                    FileAddress: '地址3'
                }
            ],
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
                // 是否黄金做质押
                isPledge: '1',
                // 债事化解咨询服务方案
                servicePlan: '',
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
                // 策划方案服务本金
                servicePrincipal: '',
                // 策划方案服务利息
                serviceInterest: '',
                // 甲方受权代表人
                partyaDeputy: '',
                // 甲方印章
                partyaSeal: '',
                // 甲方签约日期
                partyaDate: '',
                // 乙方受权代表人
                partybDeputy: '',
                // 乙方印章
                partybSeal: '',
                // 乙方签约日期
                partybDate: '',
                // 合同签约地点
                contractPlace: '',
                // 状态
                status: '0',
                // 审核原因
                checkReason: '无',
                // 审核时间
                checkDate: '2020-03-04',
                // 甲方身份
                partyaIdentity: '',
                // 乙方身份
                partybIdentity: '',
                // 甲方地址
                partyaAddrInfo: '',
                // 甲方联系人
                partyaPersonInfo: '',
                // 甲方电话
                partyaTelInfo: ''
            },
            // 民事调解书数据源
            MediaSrc: [],
            // 当前用户选择的民事调解书
            MediaIndex: '',
            //
            IsSendUnlockPhonecheck: false,
            // 发送验证的手机号码
            PhoneNumber: '',
            SendPhoneAndChekno: {
                tel: '',
                checkNo: ''
            },
            IsSendPhoneCheckMsg: false
        }
    },
    methods: {
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        async UpdateFile (file) {
            const formData = new FormData()
            formData.append('file', file)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/fileUploading/uploading',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            return 'http://113.204.236.218:8989/' + result.data.split('\\')[3]
        },
        UpdatePartASeal () {
            this.UpdateFile(this.$refs.PartASeal.files[0]).then(result => {
                this.SubmitData.partyaSeal = result
            })
        },
        UpdatePartBSeal () {
            this.UpdateFile(this.$refs.PartBSeal.files[0]).then(result => {
                console.log(result)
                this.SubmitData.partybSeal = result
            })
        },
        ViewContract () {
            this.$router.push({name: 'PledgedContract'})
        },
        // 解债申请信息初始化
        async InitData (relativePerId) {
            const formData = new FormData()
            formData.append('relativePerId', relativePerId) // relativePerId
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busRelativePersonController/selectByRelativePerId',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.UnlockUserMsg = result.data
        },
        // 提交解债信息
        async SubmitMessage () {
            // 先进行手机号码验证
            const PhoneCheckFormData = new FormData()
            for (const key in this.SendPhoneAndChekno) {
                PhoneCheckFormData.append(key, this.SendPhoneAndChekno[key])
            }
            const { data: PhoneCheckResult } = await this.$http({
                method: 'post',
                url: '/api/api/smsSend/checkNO',
                data: PhoneCheckFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (PhoneCheckResult.resultCode !== '200') return this.$message.error('短信验证码输入错误,请重新输入')
            // 数据提交
            this.SubmitData.reportId = this.$route.query.reportId
            this.SubmitData.relativePerId = this.relativePerId
            const formData = new FormData()
            for (const key in this.SubmitData) {
                formData.append(key, this.SubmitData[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDebtController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode === '200') {
                // 调用status改变接口
                const StatusUpdateformData = new FormData()
                StatusUpdateformData.append('debtId', result.data)
                StatusUpdateformData.append('status', '4')
                const { data: StatusUpdateResult } = await this.$http({
                    method: 'post',
                    url: '/api/api/pubDebtController/updateStatus',
                    data: StatusUpdateformData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (StatusUpdateResult.resultCode === '200') {
                    this.GetMsgList()
                    return this.$message.success('新增解债信息成功')
                } else {
                    return this.$message.error('修改调解信息状态失败')
                }
            }
            const StageUpdateformData = new FormData()
            StageUpdateformData.append('reportId', this.$route.query.reportId)
            StageUpdateformData.append('stage', '3')
            this.$http({
                method: 'post',
                url: '/api/api/busReportController/updateDebtStage',
                data: StageUpdateformData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(StageUpdateResult => {
                if (StageUpdateResult.data.resultCode !== '200') return this.$message.error(StageUpdateResult.data.resultMessage)
                this.$message.success('进入债权处理阶段')
            })
            this.$message.error(result.resultMessage)
        },
        CloseRelativeList () {
            // 退回主页
            this.$message.error('请先选择相对人')
            this.$router.push({path: '/MyDebt'})
            this.IsPopSelectiveList = false
        },
        // 确定选择相对人页面 并 通过relativePerId查询得到报备人及相对人信息
        SelectRelative () {
            // 未选择相对人, 提示错误信息
            if (!this.relativePerId) {
                return this.$message.error('请先选择相对人')
            }
            // 选择成功, 关闭面板, 发送选择成功信息
            this.$message({
                message: '选择相对人成功',
                type: 'success'
            })
            this.InitData(this.relativePerId)
            this.IsPopSelectiveList = false
        },
        // 获取相对人的index及相对人ID
        GetMediaMsg (index) {
            // 获取推荐人ID
            this.relativePerId = this.MediaSrc[this.MediaIndex].relativePerId
            this.InitData(this.relativePerId)
            const civilId = this.MediaSrc[this.MediaIndex].civilId
            this.SubmitData.civilId = this.MediaSrc[this.MediaIndex].civilId
            this.Getguarantor(civilId)
        },
        // 进入调查报告页面
        GoInvestigationReport (index) {
            const debtId = this.$router.query.debtId
            this.$router.push({name: 'MyDebt', query: {debtId: debtId}})
        },
        // 查询担保人信息
        async Getguarantor (civilId) {
            const formData = new FormData()
            formData.append('civilId', civilId) // 修改
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busGuaranteeController/selectByPrimaryKey',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.GuarantorMsg = result.data
        },
        // 查询调解书信息
        async SearchConciliation () {
            const reportId = this.$route.query.reportId
            const formData = new FormData()
            formData.append('reportId', reportId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busCivilController/selectCivi',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.MediaSrc = result.data
            this.MediaSrc.forEach((v, i) => {
                v.value = i
                // v.overViewContent = ``
            })
            console.log(this.MediaSrc)
            // this.RelativeList = result.data
            // 策划方案数据获取
            const AgreemenFormData = new FormData()
            AgreemenFormData.append('reportId', reportId)
            const { data: AgreemenResult } = await this.$http({
                method: 'post',
                url: '/api/api/busCivilController/initializePlan',
                data: AgreemenFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(AgreemenResult)
        },
        // 获取解债信息列表
        async GetMsgList () {
            const formData = new FormData()
            const reportId = this.$route.query.reportId
            formData.append('reportId', reportId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDebtController/selectByReportIds',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.UnlockApplyMsg = result.data
        },
        async SendPhoneCheck () {
            // 发送短信验证码
            const tel = this.PhoneNumber
            if (!(/^1[3456789]\d{9}$/.test(tel))) return this.$message.error('填写手机号码格式不正确,请重新填入')
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
            if (result.resultCode !== '200') this.$message.error('手机验证失败, 请重试')
            this.$message({
                message: '手机验证码发送成功, 请填写正确的验证码',
                type: 'success'
            })
            // 存储发送成功的电话号码
            this.SendPhoneAndChekno.tel = tel
            this.IsSendPhoneCheckMsg = true
        }
    },
    created () {
        this.SearchConciliation()
        this.GetMsgList()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.unlock-apply {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    input:disabled {
        background-color: #E0E3F8;
    }
    &-title {
        height: px2rem(12);
        line-height: px2rem(12);
        font-size: px2rem(4);
        color: #FC7F89;
        margin: px2rem(1) px2rem(4);
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
            input[type=radio] {
                width: px2rem(4)!important;
                height: px2rem(4)!important;
                line-height: px2rem(4)!important;
                margin: px2rem(1)!important;
                vertical-align: middle;
                background-color: #fff
            }
            input {
                font-size: px2rem(3.5);
                border:1px solid #E8EAEC;
                border-radius: px2rem(1);
                height: px2rem(6);
                padding-left: px2rem(2);
                margin: px2rem(2);
            }
            &-new {
                width: 100%;
                button {
                    width: px2rem(18);
                    font-size: px2rem(3.5);
                    border: none;
                    background-color: #FC7F89;
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
                    color:#fff;
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
                :nth-child(3),:nth-child(4),:nth-child(5) {
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
                    :nth-child(3),:nth-child(4),:nth-child(5) {
                        flex: 5.5;
                    }
                    :nth-child(7) {
                        flex: 4;
                        button {
                            flex:1 ;
                            font-size: px2rem(3.2);
                            border: none;
                            border-radius: px2rem(1);
                            color: #fff;
                            margin: 0 px2rem(3);
                            padding: px2rem(1) px2rem(2.5);
                        }
                        :last-child {
                            background-color: #FC7F89;
                        }
                    }
                }
                div:nth-child(odd) {
                    background-color: #fff;
                }
                div:nth-child(even) {
                    background-color: #E0E3F8;
                    span {
                        border: 1px solid #E0E3F8;
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
            &-debtor-1 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(50);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(60);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(58);
                    }
                }
            }
            &-debtor-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(73.7);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(74);
                    }
                }
            }
            &-relative-1 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(50);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(60);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(58);
                    }
                }
            }
            &-relative-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(73.7);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(74);
                    }
                }
            }
            &-relative-3 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1),:nth-child(2) {
                    .el-select {
                        width: px2rem(71);
                    }
                }
                :nth-child(3) {
                    .el-select {
                        width: px2rem(49);
                        margin: 0 px2rem(2);
                    }
                }
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
                height: px2rem(6)I;
                span {
                    text-align: center;
                    color:#fff;
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
                :nth-child(2),:nth-child(5),:nth-child(6) {
                    flex: 2;
                }
                :nth-child(3),:nth-child(4),:nth-child(7) {
                    flex: 3
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
                    :nth-child(2),:nth-child(5),:nth-child(6) {
                        flex: 2;
                    }
                    :nth-child(3),:nth-child(4),:nth-child(7) {
                        flex: 3
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
                            background-color: #FC7F89;
                        }
                    }
                }
                div:nth-child(odd) {
                    background-color: #fff;
                }
                div:nth-child(even) {
                    background-color: #E0E3F8;
                    span {
                        border: 1px solid #E0E3F8;
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
                    border: 1px solid #E8EAEC;
                }
                div {
                    flex: 1;
                }
                span {
                    display: inline-block;
                    width: px2rem(18);
                    margin-right: px2rem(2)
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
                    flex: 1
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
                    color:#FF0000;
                    line-height: px2rem(8);
                }
            }
            &-defuse-2 {
                display: flex;
                div {
                    flex: 1
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
            &-serve-agreement-debtor-1 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(64);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(44);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(67.5);
                    }
                }
            }
            &-serve-agreement-debtor-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(73.7);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(74);
                    }
                }
            }
            &-serve-agreement-relative-1 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(64);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(44);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(67.5);
                    }
                }
            }
            &-serve-agreement-relative-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(73.7);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(74);
                    }
                }
            }
            &-serve-agreement-commitment-1 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(67.5);
                    }
                }
                :nth-child(2) {
                    box-sizing: border-box;
                    padding-right: px2rem(3.5);
                    font-size: px2rem(3);
                    height: px2rem(8);
                    line-height: px2rem(8);
                    input {
                        width: px2rem(44);
                    }
                }
                :nth-child(3) {
                    .el-select {
                        width: px2rem(58.5);
                    }
                }
            }
            &-serve-agreement-commitment-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(67.5);
                    }
                }
                :nth-child(2) {
                    box-sizing: border-box;
                    padding-right: px2rem(3.5);
                    font-size: px2rem(3);
                    height: px2rem(8);
                    line-height: px2rem(8);
                    input {
                        width: px2rem(44);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(67.5);
                    }
                }
            }
            &-serve-agreement-commitment-3 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(42);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(42);
                    }
                }
            }
            &-serve-agreement-service-charge-1{
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(60.3);
                    }
                }
                :nth-child(2),:nth-child(3) {
                    input {
                        width: px2rem(45.7);
                    }
                }
            }
            &-serve-agreement-service-charge-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(54.5);
                    }
                }
                :nth-child(2),:nth-child(3) {
                    input {
                        width: px2rem(58.5);
                    }
                }
            }
            &-serve-agreement-mailing-address-1{
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(60.5);
                    }
                }
                :nth-child(2){
                    input {
                        width: px2rem(58.5);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(55.5);
                    }
                }
            }
            &-serve-agreement-mailing-address-2 {
                display: flex;
                div {
                    flex: 1
                }
                :nth-child(1) {
                    input {
                        width: px2rem(60.5);
                    }
                }
                :nth-child(2){
                    input {
                        width: px2rem(58.5);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(55.5);
                    }
                }
            }
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
                height: px2rem(6)I;
                span {
                    text-align: center;
                    color:#fff;
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
                :nth-child(2),:nth-child(4) {
                    flex: 3;
                }
                :nth-child(3) {
                    flex: 8
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
                    :nth-child(2){
                        flex: 3;
                    }
                    :nth-child(3){
                        flex: 8
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
                            background-color: #FC7F89;
                        }
                    }
                }
                div:nth-child(odd) {
                    background-color: #fff;
                }
                div:nth-child(even) {
                    background-color: #E0E3F8;
                    span {
                        border: 1px solid #E0E3F8;
                    }
                }
            }
            // 策划方案服务协义
            &-plan-agreement {
                // 默认表单宽度 为200
                input{
                    width: px2rem(40);
                    background-color: #F2F6F9;
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
                    width: px2rem(20)!important;
                }
                &-title {
                    border-top: 1px solid #F2F2F2;
                    text-align: center;
                    font-size: px2rem(4);
                    height: px2rem(20);
                    line-height: px2rem(20);
                    font-weight: 600;
                }
                &-introduce-part-a {
                    input::-ms-input-placeholder {
                        text-align: left!important;
                    }
                    input::-webkit-input-placeholder {
                        text-align: left!important;
                    }
                    height: px2rem(42);
                    line-height: px2rem(10);
                    margin-bottom: px2rem(4);
                    input {
                        margin: px2rem(1);
                    }
                    div:nth-child(1) {
                        input {
                            width: px2rem(80);
                        }
                    }
                    div:nth-child(2) {
                        input {
                            width: px2rem(56.5);
                        }
                    }
                    div:nth-child(3) {
                        input {
                            width: px2rem(78.8);
                        }
                    }
                    div:nth-child(4) {
                        input {
                            width: px2rem(85.2);
                        }
                    }
                }
                &-introduce-part-b {
                    height: px2rem(22);
                    line-height: px2rem(5);
                }
                &-address {
                    input {
                        background-color: #fff!important;
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
                            width: px2rem(22)!important;
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
                            width: px2rem(22)!important;
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
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(100);
            height: px2rem(40);
            top: 45%;
            left: 45%;
            transform: translate(-50%,-50%);
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
