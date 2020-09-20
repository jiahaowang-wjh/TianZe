<!--  -->
<template>
  <div class='civil-media'>
        <div class='civil-media-title'>
            <span class='civil-media-title-go1'>我的债行</span>
            <span class='civil-media-title-separator'> / </span>
            <span class='civil-media-title-go2'>调解</span>
        </div>
        <div class='civil-media-container'>
            <div class='civil-media-container-form'>
                <el-collapse>
                    <!-- 调查报告 -->
                    <el-collapse-item title="调解资料" name="1">
                        <div class='civil-media-container-form-new'>
                            <button>新增调解</button>
                        </div>
                        <div class='civil-media-container-form-table-1-title'>
                            <span>序号</span>
                            <span>录入号</span>
                            <span>调解协议号</span>
                            <span>债务人</span>
                            <span>状态</span>
                        </div>
                        <div class='civil-media-container-form-table-1'>
                            <div class='civil-media-container-form-table-1-item' v-for='(item,index) in MediateMsg' :key='item.Id'>
                                <span>{{index+1}}</span>
                                <span>{{item.reportId}}</span>
                                <span>{{item.civilno}}</span>
                                <span>{{item.personName}}</span>
                                <span>{{item.status === '0' ? '调解信息未审核' : item.status === '1' ? '调解信息审核未通过' : '调解信息审核通过' }}</span>
                            </div>
                        </div>
                        <div class='civil-media-container-form-submit'>
                        </div>
                        <h3>新增调解</h3>
                        <div>选择化解方式：双方化解</div>
                        <h3>债权人信息</h3>
                        <div class='civil-media-container-form-debtor-1'>
                            <div>
                                甲方（债权人名称/姓名）：<input type="text" disabled='true' :value='MediaUserMsg.debtName'>
                            </div>
                            <div>
                                法定代表人/负责人：<input type="text" disabled='true' :value='MediaUserMsg.debtLegalName'>
                            </div>
                            <div>
                                身份证号码/信用代码：<input type="text" disabled='true' :value='MediaUserMsg.debtIdCardCode'>
                            </div>
                        </div>
                        <div class='civil-media-container-form-debtor-2'>
                            <div>
                                所住地：：<input type="text" disabled='true' :value='MediaUserMsg.debtAdd'>
                            </div>
                            <div>
                                联系电话：<input type="text" disabled='true' :value='MediaUserMsg.debtPhone'>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>债务人信息</h3>
                        <div class='civil-media-container-form-relative-1'>
                            <div>
                                乙方（债务人名称/姓名）：<input type="text" disabled='true' :value='MediaUserMsg.personalName'>
                            </div>
                            <div>
                                法定代表人/负责人：<input type="text" disabled='true' :value='MediaUserMsg.personalLegalName'>
                            </div>
                            <div>
                                身份证号码/信用代码：<input type="text" disabled='true' :value='MediaUserMsg.personalIdCardCode'>
                            </div>
                        </div>
                        <div class='civil-media-container-form-relative-2'>
                            <div>
                                所住地：<input type="text" disabled='true' :value='MediaUserMsg.personalAdd'>
                            </div>
                            <div>
                                联系电话：<input type="text" disabled='true' :value='MediaUserMsg.personalPhone'>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>担保人信息</h3>
                        <div class='civil-media-container-form-new-guarantor'>
                            <button @click='AddGuarantee'>新增担保人</button>
                        </div>
                        <!-- 表单2 担保人表单 -->
                        <div class='civil-media-container-form-table-2-title'>
                            <span>序号</span>
                            <span>单位类型</span>
                            <span>担保人（姓名/企业名称）</span>
                            <span>身份证号码/信用代码</span>
                            <span>联系电话</span>
                            <span>所住地</span>
                            <span>操作</span>
                        </div>
                        <div class='civil-media-container-form-table-2'>
                            <div class='civil-media-container-form-table-2-item' v-for='(item,index) in GuaranteesList' :key='index'>
                                <span>{{index+1}}</span>
                                <span>{{item.unitType}}</span>
                                <span>{{item.authname}}</span>
                                <span>{{item.card}}</span>
                                <span>{{item.tel}}</span>
                                <span>{{item.address}}</span>
                                <span>
                                    <button @click='DeleteGuaranteesList(index)'>删除</button>
                                </span>
                            </div>
                        </div>
                        <h3>甲方、乙方、担保人共同对债权债务类型、本息的确认</h3>
                        <div>债券债务类型:
                            <label for="debt-type">
                                <input type="radio" name="debt-type" id='debt-type' value='1' v-model="SubmitData.civilType">借款
                            </label>
                            <label for="debt-type">
                                <input type="radio" name="debt-type" id='debt-type' value='2' v-model="SubmitData.civilType">贷款
                            </label>
                            <label for="debt-type">
                                <input type="radio" name="debt-type" id='debt-type' value='3' v-model="SubmitData.civilType">工程款
                            </label>
                            <label for="debt-type">
                                <input type="radio" name="debt-type" id='debt-type' value='4' v-model="SubmitData.civilType">其他款项
                            </label>
                        </div>
                        <h3>乙方尚欠甲方款项金额：</h3>
                        <!-- 欠款金额 -->
                        <div class='civil-media-container-form-own-amount'>
                            <div class='civil-media-container-form-own-amount-item-1'>
                                <span>欠款总额（小写）：<input type="text" v-model='SubmitData.amountTotal'></span>
                                <span>欠款总额（大写）：<input type="text" disabled='true' :value='SubmitData.amountTotal | Uppercase'></span>
                            </div>
                            <div class='civil-media-container-form-own-amount-item'>
                                <span>欠款总额中包含本金（小写）：<input type="text" v-model='SubmitData.amountPrincipal'></span>
                                <span>欠款总额中包含本金（大写）：<input type="text"  disabled='true' :value='SubmitData.amountPrincipal | Uppercase'></span>
                            </div>
                            <div>
                                <span>欠款总额中包含利息（小写）：<input type="text" v-model='SubmitData.amountInterest'></span>
                                <span>欠款总额中包含利息（大写）：<input type="text" disabled='true' :value='SubmitData.amountInterest | Uppercase'></span>
                            </div>
                            <div>
                                <span>欠款总额中包含违约（小写）：<input type="text" v-model='SubmitData.amountBreach'></span>
                                <span>欠款总额中包含违约（大写）：<input type="text" disabled='true' :value='SubmitData.amountBreach | Uppercase'></span>
                            </div>
                        </div>
                        <!-- 支付利息 -->
                        <h3>乙方向甲方支付款利息：</h3>
                        <div class='civil-media-container-form-interest'>
                            <div class='civil-media-container-form-interest-row1'>
                                <span>约定月利率标准：<input type="text" v-model='SubmitData.monthInterest'> </span>
                                <span>时间段：
                                    <el-date-picker align="left" type="date" placeholder="请选择开始日期" :picker-options="pickerOptions" v-model="SubmitData.starDate" value-format="yyyy-MM-dd"></el-date-picker>
                                    <span class='civil-media-container-form-interest-row1-separator'>—</span>
                                    <el-date-picker align="left" type="date" placeholder="请选择结束日期"  v-model="SubmitData.endDate"  :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker>
                                </span>
                                <span>利息：<input type="text" v-model='SubmitData.interest'> </span>
                            </div>
                            <div class='civil-media-container-form-interest-row2'>
                                <span>已支付利息：<input type="text" v-model='SubmitData.interestPayment'></span>
                                <span>违约截止时间：<el-date-picker align="left" type="date" placeholder="请选择结束日期"  v-model="SubmitData.breachDate" :picker-options="pickerOptions1" value-format="yyyy-MM-dd"></el-date-picker></span>
                                <span>已支付违约金额：<input type="text" v-model='SubmitData.breachMoney'></span>
                            </div>
                        </div>
                        <!-- 担保人担保方式： -->
                        <div>
                            担保人担保方式：
                            <label for="6">
                                <input type="radio" name="guarantee-type" id='6' value='1' v-model="SubmitData.guaranteeMeth">保证
                            </label>
                            <label for="7">
                                <input type="radio" name="guarantee-type" id='7' value='2' v-model="SubmitData.guaranteeMeth">质押
                            </label>
                            <label for="8">
                                <input type="radio" name="guarantee-type" id='8' value='3' v-model="SubmitData.guaranteeMeth">留置
                            </label>
                            <label for="9">
                                <input type="radio" name="guarantee-type" id='9' value='4' v-model="SubmitData.guaranteeMeth">定金
                            </label>
                        </div>
                        <h3>甲方、乙方、担保人经协商一致约定信息</h3>
                        <div class='civil-media-container-form-appoint'>
                            <div class='civil-media-container-form-appoint-row1'>
                                <span>确认债权债务本息金额合计（小写）：<input type="text" v-model='SubmitData.interestAll'></span>
                                <span>确认债权债务本息金额合计（大写）：<input type="text" disabled='true' :value='SubmitData.interestAll | Uppercase'></span>
                            </div>
                            <div class='civil-media-container-form-appoint-row2'>
                                <span>债事人自愿放弃的内容：<input type="text" v-model='SubmitData.abandonContent'></span>
                                <span>债务处理方式：
                                    <el-select v-model="DebtTreatment" placeholder="请选择">
                                        <el-option label="共同委托第三方处理" value="third-party"></el-option>
                                    </el-select>
                                </span>
                                <span></span>
                            </div>
                        </div>
                        <!-- 双方短信验证 -->
                        <h3>手机验证码认证</h3>
                        <div class='civil-media-container-form-phonecheck'>
                            <div>
                                <span>债权人手机号码：</span>
                                <el-input v-input-num maxlength="11" v-model='PhoneNumber[0]'></el-input>
                            </div>
                            <div>
                                <span>手机验证码：</span>
                                <el-input maxlength="4" v-model='SendPhoneAndChekno[0].checkNo'></el-input>
                                <button @click='SendCreditorPhoneCheck'>点击获取</button>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class='civil-media-container-form-phonecheck'>
                            <div>
                                <span>债务人手机号码：</span>
                                <el-input v-input-num maxlength="11" v-model='PhoneNumber[1]'></el-input>
                            </div>
                            <div>
                                <span>手机验证码：</span>
                                <el-input maxlength="4" v-model='SendPhoneAndChekno[1].checkNo'></el-input>
                                <button @click='SendDebtorPhoneCheck'>点击获取</button>
                            </div>
                            <div>
                            </div>
                        </div>
                        <h3>选择调解员</h3>
                        <div class='civil-media-container-form-add-conciliator'>
                            <button @click='OpenAddConciliator'>新增调解员</button>
                        </div>
                        <!-- 新增调解员表格 -->
                        <div class='civil-media-container-form-table-3-title'>
                            <span>序号</span>
                            <span>调解员</span>
                            <span>操作</span>
                        </div>
                        <div class='civil-media-container-form-table-3'>
                            <div class='civil-media-container-form-table-3-item' v-for='(item,index) in ConciliatorMsg' :key='item.userId'>
                                <span>{{index+1}}</span>
                                <span>{{item.personName}}</span>
                                <span>
                                    <button @click='DeleteConciliator(index)'>删除</button>
                                </span>
                            </div>
                        </div>
                        <!-- 上传凭证 -->
                        <div class='civil-media-container-form-update-imgs'>
                            <span>上传凭证：</span>
                            <div class='civil-media-container-form-update-imgs-list'>
                                <img v-for='(item,index) in VoucherList' :key='index' :src="item" alt="">
                            </div>
                            <input type="file" @change="UpdateVoucher" ref="Voucher" class='civil-media-container-form-update-imgs-form' value='点击上传'>
                            <button>点击上传</button>
                        </div>
                        <div class='civil-media-container-form-determine'>
                            <button @click='SubmitMessage'>确定</button>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!-- 选择调解员 -->
        <div class='civil-media-add-mediator-pop' v-if='IsSelect'>
            <div class='civil-media-add-mediator-pop-box'>
                <div class='civil-media-add-mediator-pop-box-header'>
                    <span>新增调解员</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAddConciliator'>
                </div>
                <div class='civil-media-add-mediator-pop-box-body'>
                    <form>
                        <div class="civil-media-add-mediator-pop-box-body-item" v-for='(item,index) in MediatorList' :key='index'>
                            <input type="radio" name="sex" :id='item.value' class="radio_type" @click='GetMediator(index)' />
                            <label :for="item.value">{{item.name}}</label>
                        </div>
                    </form>
                </div>
                <div class='civil-media-add-mediator-pop-box-footer'>
                    <button @click='CloseAddConciliator'>取消</button>
                    <button @click='SelectMediator'>确认</button>
                </div>
            </div>
        </div>
        <!-- 查看调解员详细信息 -->
        <div class='civil-media-add-mediator-content-pop' v-if='IsAddConciliatorContent'>
            <div class='civil-media-add-mediator-content-pop-box'>
                <div class='civil-media-add-mediator-content-pop-box-header'>
                    <span>调解员信息</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAddGuaranteeList'>
                </div>
                <div class='civil-media-add-mediator-content-pop-box-body'>
                    <div class='civil-media-add-mediator-content-pop-box-body-title'>
                        <span>选择</span>
                        <span>姓名</span>
                        <span>性别</span>
                        <span>年龄</span>
                        <span>电话号码</span>
                        <span>公司ID</span>
                        <span>备注</span>
                    </div>
                    <div class='civil-media-add-mediator-content-pop-box-body-tabel'>
                        <div class='civil-media-add-mediator-content-pop-box-body-tabel-item' v-for='(item,index) in MediatorListDetailContent' :key='index'>
                            <span><input type="checkbox" v-model='item.IsCheck'></span>
                            <span>{{item.personName}}</span>
                            <span>{{item.sex}}</span>
                            <span>{{item.age}}</span>
                            <span>{{item.tel}}</span>
                            <span>{{item.companyId}}</span>
                            <span>{{item.note}}</span>
                        </div>
                    </div>
                </div>
                <div class='civil-media-add-mediator-content-pop-box-footer'>
                    <button @click='CloseAddGuaranteeList'>取消</button>
                    <button @click='AddMediatorContent'>添加调解员</button>
                </div>
            </div>
        </div>
        <!-- 新增担保人 -->
        <div class='civil-media-add-guarantor-pop' v-if='IsAddConciliator'>
            <div class='civil-media-add-guarantor-pop-box'>
                <div class='civil-media-add-guarantor-pop-box-header'>
                    <span>新增担保人</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAddGuarantee'>
                </div>
                <div class='civil-media-add-guarantor-pop-box-body'>
                    <div class='civil-media-add-guarantor-pop-box-body-item'>
                        担保人（姓名/企业名称）: <input type="text" v-model='GuaranteeContent.authname'>
                    </div>
                    <div class='civil-media-add-guarantor-pop-box-body-item'>
                        身份证号码/信用代码: <input type="text" v-model='GuaranteeContent.card'>
                    </div>
                    <div class='civil-media-add-guarantor-pop-box-body-item'>
                        单位类型: <input type="text" v-model='GuaranteeContent.unitType'>
                    </div>
                    <div class='civil-media-add-guarantor-pop-box-body-item'>
                        联系电话: <input type="text" v-model='GuaranteeContent.tel'>
                    </div>
                    <div class='civil-media-add-guarantor-pop-box-body-item'>
                        所住地: <input type="text" v-model='GuaranteeContent.address'>
                    </div>
                </div>
                <div class='civil-media-add-guarantor-pop-box-footer'>
                    <button @click='CloseAddGuarantee'>取消</button>
                    <button @click='AddGuaranteeContent'>添加担保人</button>
                </div>
            </div>
        </div>
        <!-- 选择相对人 -->
        <div class='civil-media-pop-relative' v-if='IsPopSelectiveList'>
            <div class='civil-media-pop-relative-box'>
                <div class='civil-media-pop-relative-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseRelativeList'>
                </div>
                <div class='civil-media-pop-relative-box-body'>
                    选择对应相对人：
                    <el-select v-model='RelativeName' @change="getValue">
                        <el-option v-for='(item,index) in RelativeList' :key='index' :label="item.personalName" :value="index"></el-option>
                    </el-select>
                </div>
                <div class='civil-media-pop-relative-box-footer'>
                    <button @click='CloseRelativeList'>取消</button>
                    <button @click='SelectRelative'>确认</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 是否展示选择相对人列表
            IsPopSelectiveList: true,
            // 是否展示担保人添加
            IsAddConciliator: false,
            UserMsg: [
                {
                    IsCoordinate: 'true',
                    Type: 'debtor',
                    Properties: 'person'
                }
            ],
            MediatorList: [
                {
                    name: '调解员',
                    value: '3'
                },
                {
                    name: '债事处理专家',
                    value: '4'
                },
                {
                    name: '律师',
                    value: '5'
                }
            ],
            IsSelect: false,
            RelativeMsg: [
                {
                    IsCoordinate: 'true',
                    Type: 'debtor',
                    Properties: 'person'
                }
            ],
            MediateMsg: [],
            // 担保人信息
            GuarantorMsg: [],
            // 相对人数据源
            RelativeList: [],
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
            // 没有限制一定要之前时间
            pickerOptions1: {
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
            MediaIndex: 1,
            // 新增民事调解信息源
            SubmitData: {
                // 报备ID
                reportId: '',
                // 相对人ID
                relativePerId: '',
                // 化解方式
                solutions: '',
                // 债券债务类型
                civilType: '',
                // 欠款总客额
                amountTotal: '',
                // 欠款总客额本金
                amountPrincipal: '',
                // 欠款总客额利息
                amountInterest: '',
                // 欠款总客额违约
                amountBreach: '',
                // 月利率
                monthInterest: '',
                // 时间段-开始
                starDate: '',
                // 时间段-结束
                endDate: '',
                // 利息
                interest: '',
                // 已支付利息
                interestPayment: '',
                // 违约截止时间
                breachDate: '',
                // 已支付违约金额
                breachMoney: '',
                // 担保方式
                guaranteeMeth: '',
                // 本息金额合计
                interestAll: '',
                // 债事人自愿放弃内容
                abandonContent: '',
                // 债务处理方式
                treatmentMethod: '',
                // 状态
                status: '0',
                // 审核原因
                checkReason: '审核原因',
                // 调解员UserID列表
                longs: []
            },
            // 相对人名称
            RelativeName: '',
            // 相对人ID
            relativePerId: '',
            // 获取返回的相对人、债事人信息
            MediaUserMsg: {},
            // 担保人添加内容数据源
            GuaranteeContent: {
                authname: '',
                card: '',
                unitType: '',
                tel: '',
                address: ''
            },
            // 担保人数据列表
            GuaranteesList: [],
            // 查看调解员详细信息
            IsAddConciliatorContent: false,
            // 调解员详细信息展示列表
            MediatorListDetailContent: [],
            // 调解员页面展示列表
            ConciliatorMsg: [],
            PhoneNumber: ['', ''],
            SendPhoneAndChekno: [
                // 债权人
                {
                    tel: '',
                    checkNo: ''
                },
                // 债务人
                {
                    tel: '',
                    checkNo: ''
                }
            ],
            IsSendPhoneCheckMsg: [
                '',
                ''
            ],
            // 上传图片列表
            VoucherList: []
        }
    },
    methods: {
        // 关闭相对人列表
        // 关闭推荐人界面
        CloseRelativeList () {
            // 退回主页
            this.$message.error('请先选择相对人')
            this.$router.push({path: '/MyDebt'})
            this.IsPopSelectiveList = false
        },
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        // 新增调解员
        OpenAddConciliator () {
            this.IsSelect = true
        },
        CloseAddConciliator () {
            // 退回主页
            this.IsSelect = false
        },
        // 选择调解员
        async SelectMediator () {
            const formData = new FormData()
            formData.append('personType', this.MediatorList[this.MediaIndex].value)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubPersonController/selectByType',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.MediatorListDetailContent = result.data
            this.MediatorListDetailContent.forEach(v => {
                v.IsCheck = false
            })
            this.IsAddConciliatorContent = true
        },
        GetMediator (index) {
            this.MediaIndex = index
        },
        // 调解信息初始化
        async InitData (relativePerId) {
            const formData = new FormData()
            formData.append('relativePerId', relativePerId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busRelativePersonController/selectByRelativePerId',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.MediaUserMsg = result.data
        },
        // 数据提交及状态更改
        async SubmitMessage () {
            // 先进行双方手机验证
            // 债务人手机验证
            const CreditorPhoneCheckFormData = new FormData()
            for (const key in this.SendPhoneAndChekno[0]) {
                CreditorPhoneCheckFormData.append(key, this.SendPhoneAndChekno[0][key])
            }
            const { data: CreditorPhoneCheckResult } = await this.$http({
                method: 'post',
                url: '/api/api/smsSend/checkNO',
                data: CreditorPhoneCheckFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (CreditorPhoneCheckResult.resultCode !== '200') return this.$message.error('债权人短信验证码输入错误,请重新输入')
            // 债务人手机验证
            const DebtorPhoneCheckFormData = new FormData()
            for (const key in this.SendPhoneAndChekno[1]) {
                DebtorPhoneCheckFormData.append(key, this.SendPhoneAndChekno[1][key])
            }
            const { data: DebtorPhoneCheckResult } = await this.$http({
                method: 'post',
                url: '/api/api/smsSend/checkNO',
                data: DebtorPhoneCheckFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (DebtorPhoneCheckResult.resultCode !== '200') return this.$message.error('债务人短信验证码输入错误,请重新输入')
            // 数据提交
            this.SubmitData.reportId = this.$route.query.reportId
            this.SubmitData.relativePerId = this.relativePerId
            this.GuaranteesList.map((v, i) => {
                for (const key in v) {
                    this.$set(this.SubmitData, `busGuarantee[${i}].${key}`, v[key])
                }
            })
            this.SubmitData.longs = this.ConciliatorMsg.map(v => {
                return v.userId
            })
            const formData = new FormData()
            console.log(this.SubmitData)
            for (const key in this.SubmitData) {
                formData.append(key, this.SubmitData[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busCivilController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            // 修改信息阶段,  如果返回结果
            if (result.resultCode === '200') {
                // 调用status改变接口
                const StatusUpdateformData = new FormData()
                // 获取返回ID
                StatusUpdateformData.append('civilId', result.data)
                StatusUpdateformData.append('status', '0')
                const { data: StatusUpdateResult } = await this.$http({
                    method: 'post',
                    url: '/api/api/busCivilController/updateStatus',
                    data: StatusUpdateformData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                if (StatusUpdateResult.resultCode === '200') {
                    this.GetMediaHistory()
                    return this.$message.success('新增调解信息成功')
                } else {
                    return this.$message.error('新增调解信息状态失败')
                }
            } else {
                this.$message.error(result.resultMessage)
            }
        },
        // 获取相对人的index及相对人ID
        getValue (index) {
            // 获取推荐人ID
            this.relativePerId = this.RelativeList[index].relativePerId
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
        // 查询相对人信息
        async SearchRelative () {
            const reportId = this.$route.query.reportId
            const formData = new FormData()
            formData.append('reportId', reportId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busRelativePersonController/selectByreportId',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.RelativeList = result.data
        },
        AddGuarantee () {
            this.IsAddConciliator = true
        },
        CloseAddGuarantee () {
            this.IsAddConciliator = false
        },
        // 添加担保人
        AddGuaranteeContent () {
            this.GuaranteesList.push(this.GuaranteeContent)
            this.GuaranteeContent = {}
            this.IsAddConciliator = false
        },
        // 删除担保人
        DeleteGuaranteesList (index) {
            this.GuaranteesList.splice(index, 1)
        },
        // 关闭调解员详情列表
        CloseAddGuaranteeList () {
            this.IsAddConciliatorContent = false
        },
        // 添加调解员信息到列表
        AddMediatorContent () {
            const AddContent = this.MediatorListDetailContent.filter(v => {
                return v.IsCheck === true
            })
            this.ConciliatorMsg = this.ConciliatorMsg.concat(AddContent)
            this.IsAddConciliatorContent = false
            this.IsSelect = false
        },
        // 删除调解员
        DeleteConciliator (index) {
            this.ConciliatorMsg.splice(index, 1)
        },
        // 发送债权人短信
        async SendCreditorPhoneCheck () {
            // 发送短信验证码
            const tel = this.PhoneNumber[0]
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
            console.log(result)
            if (result.resultCode !== '200') this.$message.error('手机验证失败, 请重试')
            this.$message({
                message: '手机验证码发送成功, 请填写正确的验证码',
                type: 'success'
            })
            // 存储发送成功的电话号码
            this.SendPhoneAndChekno[0].tel = tel
            this.IsSendPhoneCheckMsg[0] = true
        },
        // 发送债权人短信
        async SendDebtorPhoneCheck () {
            // 发送短信验证码
            const tel = this.PhoneNumber[1]
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
            this.SendPhoneAndChekno[1].tel = tel
            this.IsSendPhoneCheckMsg[1] = true
            console.log(this.IsSendPhoneCheckMsg)
        },
        UpdateVoucher () {
            const file = this.$refs.Voucher.files[0]
            this.$UpdateFile(file).then(result => {
                this.VoucherList.push(result)
            })
        },
        // 获取民事调解记录
        async GetMediaHistory () {
            const formData = new FormData()
            formData.append('reportId', this.$route.query.reportId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busCivilController/selectByReportId',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(result)
            this.MediateMsg = result.data
        }
    },
    created () {
        // this.InitData()
        this.SearchRelative()
        this.GetMediaHistory()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.civil-media {
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
            input[type=radio] {
                width: px2rem(4)!important;
                height: px2rem(4)!important;
                line-height: px2rem(4)!important;
                margin: px2rem(1)!important;
                vertical-align: middle;
                background-color: #fff
            }
            input {
                border:1px solid #E8EAEC;
                border-radius: px2rem(1);
                height: px2rem(6);
                padding-left: px2rem(2);
                margin: px2rem(2);
            }
            input:disabled {
                background-color: #E0E3F8;
            }
            &-new {
                button {
                    font-size: px2rem(3.5);
                    border: none;
                    background-color: #FC7F89;
                    color: #fff;
                    padding: px2rem(1) px2rem(2);
                    border-radius: px2rem(1);
                }
            }
            // civil-media-container-form-table-1-item
            &-table-1-title {
                margin-top: px2rem(4);
                display: flex;
                height: px2rem(6)I;
                span {
                    flex: 3;
                    text-align: center;
                    color:#fff;
                    background-color: #616789;
                    border: 0.5px solid #fff;
                    box-sizing: border-box;
                }
                :nth-child(1) {
                    flex: 1;
                }
            }
            &-table-1 {
                &-item {
                    display: flex;
                    justify-content: space-around;
                    line-height: px2rem(7);
                    span {
                        flex: 3;
                        text-align: center;
                        border: 0.5px solid #fff;
                        box-sizing: border-box;
                    }
                    :nth-child(1) {
                        flex: 1;
                    }
                    :nth-child(6) {
                        button {
                            flex:1 ;
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
                        border: 0.5px solid #E0E3F8;
                    }
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
                        width: px2rem(77);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(74);
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
                        border: 0.5px solid #fff;
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
                        border: 0.5px solid #E0E3F8;
                    }
                }
            }
            &-own-amount {
                div {
                    display: flex;
                    span:nth-child(1) {
                        flex: 1;
                        input {
                            width: px2rem(45);
                        }
                    }
                    span:nth-child(2) {
                        flex: 2;
                        input {
                            width: px2rem(94);
                        }
                    }
                }
                div:nth-child(1) {
                    display: flex;
                    span:nth-child(1) {
                        flex: 1;
                        input {
                            width: px2rem(61);
                        }
                    }
                    span:nth-child(2) {
                        flex: 2;
                        input {
                            width: px2rem(110);
                        }
                    }
                }
            }
            &-interest {
                &-row1 {
                    display: flex;
                    span {
                        flex: 1;
                    }
                    span:nth-child(1) {
                        input {
                            width: px2rem(65);
                        }
                    }
                    span:nth-child(3) {
                        input {
                            width: px2rem(80);
                        }
                    }
                }
                &-row2 {
                    display: flex;
                    span {
                        flex: 1
                    }
                    span:nth-child(1) {
                        input {
                            width: px2rem(71.3);
                        }
                    }
                    span:nth-child(2) {
                        input {
                            width: px2rem(68.3);
                        }
                    }
                    span:nth-child(3) {
                        input {
                            width: px2rem(64);
                        }
                    }
                }
            }
            &-appoint {
                &-row1 {
                    display: flex;
                    span:nth-child(1) {
                        flex: 1;
                        input {
                            width: px2rem(36);
                        }
                    }
                    span:nth-child(2) {
                        flex: 2;
                        input {
                            width: px2rem(84.3);
                        }
                    }
                }
                &-row2 {
                    display: flex;
                    align-items: center;
                    span:nth-child(1) {
                        flex: 1;
                        input {
                            width: px2rem(55);
                        }
                    }
                    span:nth-child(2) {
                        flex: 2;
                        .el-select {
                            width: px2rem(74);
                        }
                    }
                }
            }
            &-phonecheck {
                margin: px2rem(2) 0;
                display: flex;
                align-items: center;
                justify-content: space-around;
                font-size: px2rem(3);
                height: px2rem(8);
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
                        width: px2rem(26);
                    }
                    .el-input {
                        width: px2rem(66);
                    }
                }
                :nth-child(2) {
                    span {
                        width: px2rem(18);
                    }
                    .el-input {
                        width: px2rem(77);
                    }
                    button {
                        left: px2rem(179.5);
                        position: absolute;
                        height: px2rem(8);
                        margin-left: px2rem(2);
                        background-color: #616789;
                        border: none;
                        border-radius: px2rem(1);
                        color: #fff;
                        font-size: px2rem(3.2);
                    }
                }
                :nth-child(3) {
                }
            }
            &-add-conciliator {
                button {
                    border: none;
                    font-size: px2rem(3.5);
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
                }
                :nth-child(1) {
                    flex: 1;
                }
                :nth-child(2){
                    flex: 10;
                }
                :nth-child(3){
                    flex: 3
                }
            }
            &-table-3 {
                &-item {
                    display: flex;
                    height: px2rem(8);
                    justify-content: space-around;
                    line-height: px2rem(8);
                    span {
                        flex: 3;
                        text-align: center;
                        border: 0.5px solid #fff;
                        box-sizing: border-box;
                    }
                    :nth-child(1) {
                        flex: 1;
                    }
                    :nth-child(2){
                        flex: 10;
                    }
                    :nth-child(3){
                        flex: 3
                    }
                    button {
                        background-color: #FC7F89;
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
                }
            }
            &-update-imgs {
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
            &-determine {
                margin-top: px2rem(6);
                button {
                    font-size: px2rem(3.5);
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
    &-add-mediator-pop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(100);
            height: px2rem(45);
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
                margin: px2rem(4);
                display: flex;
                align-items: center;
                font-size: px2rem(4);
                &-item {
                    display: flex;
                    align-items: center;
                    height: px2rem(6);
                    label {
                        margin-left: px2rem(2);
                    }
                    .radio_type:checked {
                        color: ''
                    }
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
    &-add-guarantor-pop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(120);
            height: px2rem(70);
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
                margin: px2rem(4);
                font-size: px2rem(4);
                padding-left: px2rem(4);

                &-item {
                    margin: px2rem(1);
                    display: flex;
                    align-items: center;
                    height: px2rem(7);
                    input {
                        border: 1px solid #E8EAEC;
                        margin-left: px2rem(2);
                        padding-left: px2rem(2);
                        height: px2rem(5);
                    }
                }
                :nth-child(1) {
                    input {
                        width: px2rem(50);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(57.8);
                    }
                }
                :nth-child(3) {
                    input {
                        width: px2rem(79.5);
                    }
                }
                :nth-child(4) {
                    input {
                        width: px2rem(79.5);
                    }
                }
                :nth-child(5) {
                    input {
                        width: px2rem(83.5);
                    }
                }
            }
            &-footer {
                display: flex;
                justify-content: space-around;
                button {
                    padding: px2rem(1.5) px2rem(6);
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
    &-add-mediator-content-pop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(240);
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
                margin: px2rem(4);
                font-size: px2rem(4);
                &-title {
                    margin-top: px2rem(4);
                    display: flex;
                    span {
                        flex: 3;
                        text-align: center;
                        color:#fff;
                        background-color: #616789;
                        border: 0.5px solid #fff;
                        box-sizing: border-box;
                    }
                    :nth-child(1) {
                        flex: 2;
                    }
                }
                &-tabel {
                    &-item {
                        display: flex;
                        line-height: px2rem(8);
                        span {
                            flex: 3;
                            text-align: center;
                        }
                        :nth-child(1) {
                            flex: 2;
                        }
                    }
                    div:nth-child(odd) {
                        background-color: #fff;
                    }
                    div:nth-child(even) {
                        background-color: #E0E3F8;
                    }
                }
            }
            &-footer {
                display: flex;
                justify-content: space-around;
                padding: px2rem(6) 0;
                button {
                    padding: px2rem(1.5) px2rem(6);
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
