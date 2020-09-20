<!--  -->
<template>
    <div class='my-debt'>
        <div class='my-debt-title'>
            我的债行
        </div>
        <div class='my-debt-list'>
            <div class='my-debt-list-select'>
                <span @click='HandleSelect(item)' v-for='(item,index) in SelectOption' :key='index' :class="item.isSelect? 'active':'' ">{{item.SelectName}}</span>
            </div>
            <div class='my-debt-list-search'>
                <div class='my-debt-list-search-form'>
                    <el-form ref="form">
                        <el-form-item>
                            <span class='item1'>债权人/债务人:</span>
                            <el-input v-model="SelectForm.SearchName"></el-input>
                        </el-form-item>
                        <el-form-item >
                            <span>录入编号:</span>
                            <el-input v-model="SelectForm.ReportNum"></el-input>
                        </el-form-item>
                        <el-form-item placeholder="审核状态">
                            <span>审核状态:</span>
                            <el-select v-model='SelectForm.AuditState'>
                                <el-option label="审核通过" value='pass'></el-option>
                                <el-option label="审核驳回" value='reject'></el-option>
                                <el-option label="审核已提交" value='submit'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class='my-debt-list-search-time-select'>
                    <span>时间: </span>
                    <el-date-picker align="left" type="date" placeholder="请选择开始日期" :picker-options="pickerOptions" v-model="TimeSelect.TimeStart">
                    </el-date-picker>
                    <span class='my-debt-list-search-time-select-separator'>—</span>
                    <el-date-picker align="left" type="date" placeholder="请选择结束日期" :picker-options="pickerOptions" v-model="TimeSelect.TimeEnd">
                    </el-date-picker>
                </div>
                <div class='my-debt-list-search-button-search'>搜索</div>
                <div class='my-debt-list-search-button-add' @click='GoAddReportForm'>新增录入</div>
            </div>
            <div class='my-debt-list-content'>
                <!-- 正常显示模板 -->
                <div class='my-debt-list-content-title'>
                    <span>序号</span>
                    <span>债事信息</span>
                    <span>债权处理次数</span>
                    <span>债权处理编号</span>
                    <span>债权处理金额</span>
                    <span>提交时间</span>
                    <span>审核时间</span>
                    <span>审批内容</span>
                    <span>审核阶段</span>
                    <span>审核状态</span>
                    <span>操作</span>
                </div>
                <div class='my-debt-list-content-tab'>
                    <div class='my-debt-list-content-tab-item' v-for='(item,index) in MyDebtMsg' :key='index'>
                        <span>{{index+1}}</span>
                        <div>
                            <ul>
                                <li>录入编号: {{item.reportNo}}</li>
                                <li>债事人: {{item.debtName}}</li>
                                <li>相对人数: {{item.busRelativeCount}}</li>
                                <li>录入人: {{item.inputName}}</li>
                                <li>推荐人: {{item.recommendName}}</li>
                            </ul>
                        </div>
                        <span>{{item.resolveCount ? item.resolveCount : '/'}}</span>
                        <span>{{item.resolveNum ? item.resolveNum : '/'}}</span>
                        <span>{{item.cumulativeSum ? item.cumulativeSum : '/'}}</span>
                        <div>
                            <span>{{item.submitDate ? item.submitDate : '/'}}</span>
                        </div>
                        <div>
                            <span>{{item.checkDate ? item.checkDate : '/'}}</span>
                        </div>
                        <div>
                            <span>{{item.checkReason ? item.checkReason : '/'}}</span>
                        </div>
                        <div>
                            <span>{{item.stage === '1' ? ('报备阶段') : item.stage === '2' ? ('调解阶段') : item.stage === '3' ? ('债权处理阶段') : item.stage === '3' ? ('债权处理阶段'): item.stage === '4' ? ('资产处理阶段') : '/' }}</span>
                        </div>
                        <div>
                            <span :class="[item.status === '2' || item.status === '5'? ('pass') : item.status === '1' || item.status === '6'? 'unpass': 'hassubmit']" v-if="item.stage === '1'">
                                {{item.status === '0' ? ('报备数据未审核') : item.status === '1' ? ('报备数据审核未通过') : item.status === '2' ? ('报备数据审核通过') : item.status === '3' ? (' 请缴费'): item.status === '4' ? ('财务信息未审核') : item.status === '5' ? ('进入调解阶段') : item.status === '6' ? ('财务信息审核未通过') : '/'}}
                            </span>
                        </div>
                        <span>
                            <button @click.stop="GoCivilMediaForm(index)" v-show="item.stage === '2'">调解</button>
                            <button @click='GoInvestigation(index)' v-show="item.status === '2'&& item.stage === '1'">暨尽调协议</button>
                            <button @click='GoUnlockApplyForm(index)' v-show="item.stage === '3'">债权处理</button>
                            <button @click="dialogTableVisible = true" v-show="item.status === '5'">下载</button>
                            <button v-show="item.status === '2' || item.status === '4'">查看</button>
                            <button v-show="item.status === '1' || item.status === '6'" @click='EditMsg(index)'>编辑</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class='my-debt-pop-download'>
            <el-dialog title="下载" :visible.sync="dialogTableVisible">
                    <el-table :data="gridData">
                        <el-table-column property="Order" label="序号"></el-table-column>
                        <el-table-column property="WordName" label="文件名"></el-table-column>
                        <el-table-column property="WordType" label="类型"></el-table-column>
                        <el-table-column width="247" label="操作">
                            <button>查看</button>
                            <button>下载</button>
                        </el-table-column>
                    </el-table>
                </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            // 分页器结构数据源
            bgc: true,
            // 选项卡
            SelectOption: [
                {
                    SelectName: '全部',
                    isSelect: true
                },
                {
                    SelectName: '待审核',
                    isSelect: false
                },
                {
                    SelectName: '审核通过',
                    isSelect: false
                },
                {
                    SelectName: '审核驳回',
                    isSelect: false
                }
            ],
            // 调解信息列表数据源
            MyDebtMsg: [],
            // 确定选用正常模板还是多选模板
            isNormal: false,
            // 是否显示相对人面板
            IsShowRelativePage: true,
            TimeSelect: {
                TimeStart: '2020-02-30',
                TimeEnd: '2020-04-28'
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
            // 下载弹出窗的数据源
            gridData: [
                {
                    Order: '1',
                    WordName: '《债务人基本信息登记表》',
                    WordType: 'word'
                },
                {
                    Order: '2',
                    WordName: '《附件》',
                    WordType: 'excel'
                },
                {
                    Order: '3',
                    WordName: '《债务人身份证正面附件》',
                    WordType: 'mp3'
                },
                {
                    Order: '4',
                    WordName: '《债务人身份证反面附件》',
                    WordType: 'mp3'
                },
                {
                    Order: '5',
                    WordName: '王小虎',
                    WordType: 'mp3'
                },
                {
                    Order: '6',
                    WordName: '王小虎',
                    WordType: 'mp3'
                },
                {
                    Order: '7',
                    WordName: '王小虎',
                    WordType: 'mp3'
                },
                {
                    Order: '8',
                    WordName: '王小虎',
                    WordType: 'mp3'
                },
                {
                    Order: '9',
                    WordName: '王小虎',
                    WordType: 'mp3'
                },
                {
                    Order: '10',
                    WordName: '王小虎',
                    WordType: 'mp3'
                }
            ],
            dialogTableVisible: false,
            // 选择表单的数据源
            SelectForm: {
                // 查询人名
                SearchName: '',
                // 审核状态
                AuditState: '',
                // 选择相对人
                Relevant: '',
                // 录入编号
                ReportNum: ''
            }
        }
    },
    methods: {
        EnterContract () {
            this.$router.push({name: 'Assignment', params: {reportId: this.MyDebtMsg[index].reportId}})
        },
        // 前往新增报备
        GoAddReportForm () {
            this.$router.push({name: 'AddReportForm'})
        },
        // 前往解锁申请界面
        GoUnlockApplyForm (index) {
            this.$router.push({name: 'UnlockApplyForm', params: {reportId: this.MyDebtMsg[index].reportId}})
        },
        // 前往民事调解界面
        GoCivilMediaForm (index) {
            this.$router.push({name: 'CivilMediaForm', params: {reportId: this.MyDebtMsg[index].reportId}})
        },
        GoInvestigation (index) {
            this.$router.push({name: 'Investigation', params: {reportId: this.MyDebtMsg[index].reportId}})
        },
        SelectRelative () {
            // window.sessionStorage.setItem('reportId', this.MyDebtMsg[index].reportId)
            this.$router.push({name: 'ExamineReportForm'})
        },
        CloseSelectRelative () {
            this.IsShowRelativePage = false
        },
        EditMsg (index) {
            this.$router.push({name: 'EditReport', params: {reportId: this.MyDebtMsg[index].reportId}})
        },
        // 页面初始化
        async InitData () {
            const formData = new FormData()
            const DataList = {
                pageSize: '20',
                pageNum: '1',
                companyType: window.sessionStorage.getItem('companyType')
            }
            for (const key in DataList) {
                formData.append(key, DataList[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/busReportController/selectDebtInfos',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.MyDebtMsg = result.data.list
            console.log(this.MyDebtMsg)
        }
    },
    created () {
        this.InitData()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.my-debt {
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
    }

    &-list {
        height: 100%;
        background-color: #ffffff;
        margin: 0 px2rem(4);
        padding: px2rem(4);

        &-select {
            display: flex;
            height: px2rem(8);
            border-bottom: px2rem(0.1) solid #DFE0E7;
            span {
                display: inline-block;
                font-size: px2rem(4);
                color: #999999;
                margin: 0 px2rem(4);
                height: px2rem(8);
                line-height: px2rem(8);
                width: px2rem(22);
                text-align: center;
            }
            span:hover,span:active {
                background-color: #EFEFF3;
            }
            .active {
                border-bottom: px2rem(0.4) solid #616789;
            }
        }
        &-search {
            display: flex;
            align-items: center;
            height: px2rem(16);

            &-form {
                display: flex;
                height: px2rem(14);
                line-height: px2rem(14);
                margin-left: px2rem(2);
                .item1 {
                    width: px2rem(36)!important;
                }
                .el-form {
                    display: flex;
                    height: 100%;
                    align-items: center;
                    margin-bottom: 0;
                    .el-form-item {
                        display: flex;
                        align-items: center;
                        height: px2rem(10);
                        line-height: px2rem(10);
                        width: px2rem(55)!important;
                        span {
                            font-size: px2rem(3.2);
                            display: inline-block;
                            width: px2rem(20);
                            padding-right: px2rem(1);
                        }
                    }
                }
            }

            &-time-select {
                display: flex;
                align-items: center;
                margin-left: px2rem(2);
                height: px2rem(10);
                line-height: px2rem(10);
                .el-date-picker {
                    width: px2rem(51);
                }
                span {
                    font-size: px2rem(3.2);
                    width: px2rem(10);
                }

                &-separator {
                    width: px2rem(6);
                    text-align: center;
                }
            }

            &-button-search {
                margin-left: px2rem(2);
                width: px2rem(14);
                height: px2rem(7);
                line-height: px2rem(7);
                font-size: px2rem(3);
                text-align: center;
                background-color: #616789;
                border-radius: px2rem(2);
                color: #fff;
            }
            &-button-add {
                margin-left: px2rem(2);
                width: px2rem(14);
                height: px2rem(7);
                line-height: px2rem(7);
                font-size: px2rem(3);
                text-align: center;
                background-color: #FC7F89;
                border-radius: px2rem(2);
                color: #fff;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            &-title {
                display: flex;
                height: px2rem(8);
                span {
                    height: px2rem(8);
                    line-height: px2rem(8);
                    font-size: px2rem(3.2);
                    background-color: #616789;
                    flex: 2.1;
                    text-align: center;
                    color:#fff;
                    display: inline-block;
                    box-sizing: border-box;
                    border-left: 0.5px solid #fff;
                    border-right: 0.5px solid #fff;
                }
                :nth-child(1) {
                    flex: 1;
                }
                :nth-child(2){
                    flex: 4;
                }
                :nth-child(8),:nth-child(4) {
                    flex: 3.5;
                }
                :nth-child(3),:nth-child(5) {
                    flex: 2.5;
                }
                :nth-child(9) {
                    flex: 2.8
                }
                :nth-child(10) {
                    flex: 4;
                }
                :last-child {
                    flex: 5;
                }
            }

            &-tab {
                display: flex;
                flex-direction: column;
                font-size: px2rem(3);
                div:nth-child(odd) {
                    display: flex;
                    height: px2rem(28);
                    line-height: px2rem(28);
                    background-color: #fff;
                    text-align: center;
                    font-size: px2rem(2);
                    .pass {
                        color: #17C67A !important
                    }
                    .unpass {
                        color: #FF0000 !important
                    }
                    .hassubmit {
                        color: #272A39 !important
                    }
                    span {
                        font-size: px2rem(2.8);
                        flex: 2.1;
                        text-align: center;
                        color:#000;
                        display: inline-block;
                        margin: 0 0.5px;
                    }
                    :nth-child(1) {
                        flex: 1;
                    }
                    :nth-child(2) {
                        flex: 4;
                        ul {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            padding: px2rem(5) 0;
                            background-color: #fff;
                        }
                        li {
                            flex:1;
                            height: px2rem(4);
                            line-height: px2rem(4);
                            border: none;
                            padding: none;
                        }
                    }
                    :nth-child(8),:nth-child(4) {
                        flex: 3.5;
                        border: 1px solid #fff;
                        background-color: #fff;
                        ul {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            padding: px2rem(5) 0;
                            background-color: #fff;
                        }
                        li {
                            flex:1;
                            height: px2rem(2);
                            line-height: px2rem(2);
                            border: none;
                            padding: none;
                            font-size: px2rem(3);
                            color: #4699FF;
                        }
                    }
                    :nth-child(3),:nth-child(5) {
                        flex: 2.5;
                    }
                    :nth-child(6){
                        flex: 2.1;
                        background-color: #fff;
                        span {
                            text-align: center;
                        }
                    }
                    :nth-child(7) {
                        flex: 2.1;
                        background-color: #fff;
                        span {
                            text-align: center;
                        }
                    }
                    :nth-child(9) {
                        flex: 2.8;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        span {
                            margin: 0 px2rem(3);
                            height: px2rem(3);
                            line-height: px2rem(3);
                        }
                    }
                    :nth-child(10) {
                        flex: 4;
                        margin: 0 auto;
                        background: #fff;
                    }
                    :nth-child(11) {
                        flex: 5;
                        margin: 0 auto;
                        button {
                            font-size: px2rem(3);
                            color: #fff;
                            border: none;
                            border-radius: px2rem(1);
                            margin: 0 px2rem(0.8);
                            padding: px2rem(1.2) px2rem(3);
                        }
                        button:nth-child(1) {
                            background-color: #AD94E2;
                        }
                        button:nth-child(2) {
                            background-color: #ECC87F;
                        }
                        button:nth-child(3) {
                            background-color: #616789;
                        }
                        button:nth-child(4) {
                            background-color: #B3BCF2;
                        }
                        button:nth-child(5), button:nth-child(6), button:nth-child(7) {
                            background-color: #FC7F89;
                        }
                    }
                }
                div:nth-child(even) {
                    display: flex;
                    height: px2rem(28);
                    line-height: px2rem(28);
                    background-color: #E0E3F8;
                    text-align: center;
                    font-size: px2rem(2);
                    .pass {
                        color: #17C67A !important
                    }
                    .unpass {
                        color: #FF0000 !important
                    }
                    .hassubmit {
                        color: #272A39 !important
                    }
                    span {
                        font-size: px2rem(2.8);
                        flex: 2.1;
                        text-align: center;
                        color:#000;
                        display: inline-block;
                    }
                    :nth-child(1) {
                        flex: 1;
                    }
                    :nth-child(2) {
                        flex: 4;
                        ul {
                            padding: px2rem(5) 0;
                        }
                        li {
                            flex:1;
                            height: px2rem(4);
                            line-height: px2rem(4);
                            border: none;
                            padding: none;
                        }
                    }
                    :nth-child(8),:nth-child(4) {
                        flex: 3.5;
                        border: 1px solid #E0E3F8;
                        ul {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            padding: px2rem(5) 0;
                        }
                        li {
                            flex:1;
                            height: px2rem(2);
                            line-height: px2rem(2);
                            border: none;
                            padding: none;
                            font-size: px2rem(3);
                            color: #4699FF;
                        }
                    }
                    :nth-child(3),:nth-child(5) {
                        flex: 2.5;
                    }
                    :nth-child(6){
                        flex: 2.1;
                        background-color: #E0E3F8;
                        span {
                            text-align: center;
                        }
                    }
                    :nth-child(7) {
                        flex: 2.1;
                        background-color: #E0E3F8;
                        span {
                            text-align: center;
                        }
                    }
                    :nth-child(9) {
                        flex: 2.8;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #E0E3F8;
                        span {
                            margin: 0 px2rem(3);
                            height: px2rem(3);
                            line-height: px2rem(3);
                        }
                        .pass {
                            color: #17C67A !important
                        }
                        .unpass {
                            color: #FF0000 !important
                        }
                        .hassubmit {
                            color: #272A39 !important
                        }
                    }
                    :nth-child(10) {
                        flex: 4;
                        margin: 0 auto;
                        background:#E0E3F8;
                    }
                    :nth-child(11) {
                        flex: 5;
                        button {
                            font-size: px2rem(3);
                            color: #fff;
                            border: none;
                            border-radius: px2rem(1);
                            margin: 0 px2rem(0.8);
                            padding: px2rem(1.2) px2rem(3)
                        }
                        button:nth-child(1) {
                            background-color: #AD94E2;
                        }
                        button:nth-child(2) {
                            background-color: #ECC87F;
                        }
                        button:nth-child(3) {
                            background-color: #616789;
                        }
                        button:nth-child(4) {
                            background-color: #B3BCF2;
                        }
                        button:nth-child(5), button:nth-child(6), button:nth-child(7) {
                            background-color: #FC7F89;
                        }
                    }
                }
            }
        }
    }

    &-pop-select-relative {
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

                    input {}
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
}
</style>
