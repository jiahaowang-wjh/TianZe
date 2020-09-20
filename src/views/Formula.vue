<!--  -->
<template>
  <div class='formula'>
        <div class='formula-title'>
            <span class='formula-title-go1'>我的审批</span>
            <span class='formula-title-separator'> / </span>
            <span class='formula-title-go2'>公式配置</span>
        </div>
        <div class='formula-list'>
            <div class='formula-list-search'>
                <div class='formula-list-search-form'>
                    <span>公示编号:</span>
                    <input type="text">
                </div>
                <button>搜索</button>
                <button @click='OpenAdd'>新增公式</button>
            </div>
            <div class='formula-list-content'>
                <!-- 正常显示模板 -->
                <template>
                    <div class='formula-list-content-title'>
                        <span>序号</span>
                        <span>公式类型</span>
                        <span>公式编号</span>
                        <span>公式</span>
                        <span>参数</span>
                        <span>操作</span>
                    </div>
                    <div class='formula-list-content-tab'>
                        <div class='formula-list-content-tab-item' v-for='(item,index) in FormulaMsg' :key='index'>
                            <span>{{index+1}}</span>
                            <span>{{item.expType === '1' ? '寄售': '非寄售'}}</span>
                            <span>{{item.expCode}}</span>
                            <span>{{item.exp}}</span>
                            <span>{{item.paramter}}</span>
                            <span>
                                <button @click='OpenEdit(index)'>编辑</button>
                                <button @click='OpenDel(index)'>删除</button>
                            </span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <!-- 是否显示添加页面 -->
        <div class='formula-add' v-if='IsAddFormula'>
            <div class='formula-add-box'>
                <div class='formula-add-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAdd'>
                </div>
                <div class='formula-add-box-body'>
                    <div>
                        公式类型：
                        <el-select v-model='AddFomulaMsg.expType'>
                            <el-option :value='1' label='寄售'></el-option>
                            <el-option :value='2' label='非寄售'></el-option>
                        </el-select>
                    </div>
                    <div>
                        公式编号：<input type="text" v-model='AddFomulaMsg.expCode'>
                    </div>
                    <div>
                        公式：<input type="text" v-model='AddFomulaMsg.exp'>
                    </div>
                    <div>
                        参数：<input type="text" v-model='AddFomulaMsg.paramter'>
                    </div>
                </div>
                <div class='formula-add-box-footer'>
                    <button @click='CloseAdd'>取消</button>
                    <button @click='SubmitAddFomula'>确认</button>
                </div>
            </div>
        </div>
        <!-- 是否显示编辑页面 -->
        <div class='formula-add' v-if='IsEditFormula'>
            <div class='formula-add-box'>
                <div class='formula-add-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseEdit'>
                </div>
                <div class='formula-add-box-body'>
                    <div>
                        公式类型：
                        <el-select v-model='EditFomulaMsg.expType'>
                            <el-option :value='1' label='寄售'></el-option>
                            <el-option :value='2' label='非寄售'></el-option>
                        </el-select>
                    </div>
                    <div>
                        公式编号：<input type="text" v-model='EditFomulaMsg.expCode'>
                    </div>
                    <div>
                        公式：<input type="text" v-model='EditFomulaMsg.exp'>
                    </div>
                    <div>
                        参数：<input type="text" v-model='EditFomulaMsg.paramter'>
                    </div>
                </div>
                <div class='formula-add-box-footer'>
                    <button @click='CloseEdit'>取消</button>
                    <button @click='SubmitEditFomula'>确认</button>
                </div>
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
            IsAddFormula: false,
            IsEditFormula: false,
            // 用户信息列表数据源
            FormulaMsg: [],
            // 确定选用正常模板还是多选模板
            isNormal: false,
            AddFomulaMsg: {
                expType: '',
                expCode: '',
                exp: '',
                paramter: ''
            },
            EditFomulaMsg: {
                expId: '',
                expType: '',
                expCode: '',
                exp: '',
                paramter: ''
            }
        }
    },
    methods: {
        handleCurrentChange (e) {
        },
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        async FormulaListtInit () {
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubExpController/queryExpList'
            })
            console.log(result)
            this.FormulaMsg = result.data
        },
        OpenAdd () {
            this.IsAddFormula = true
        },
        CloseAdd () {
            this.IsAddFormula = false
        },
        OpenEdit (index) {
            this.EditFomulaMsg.expId = this.FormulaMsg[index].expId
            this.IsEditFormula = true
        },
        CloseEdit () {
            this.IsEditFormula = false
        },
        async SubmitAddFomula () {
            const formData = new FormData()
            for (const key in this.AddFomulaMsg) {
                formData.append(key, this.AddFomulaMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubExpController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('新增公式成功')
        },
        async SubmitEditFomula () {
            const formData = new FormData()
            for (const key in this.EditFomulaMsg) {
                formData.append(key, this.EditFomulaMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubExpController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('修改公式成功')
        },
        async OpenDel (index) {
            const formData = new FormData()
            formData.append('expId', this.FormulaMsg[index].expId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubExpController/deleteByPrimaryKey',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('删除公式成功')
        }
    },
    created () {
        this.FormulaListtInit()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.formula {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    position: relative;
    &-title {
        height: px2rem(10);
        line-height: px2rem(10);
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

    &-list {
        height: 100%;
        background-color: #fff;
        margin:0 px2rem(4);
        padding: px2rem(4);
        &-search {
            display: flex;
            align-items: center;
            height: px2rem(14);
            button {
                margin-left: px2rem(4);
                font-size: px2rem(3.5);
                background-color: #616789;
                border-radius: px2rem(1);
                color: #fff;
                margin: 0 px2rem(2);
                border: none;
                padding: px2rem(1.3) px2rem(3)
            }
            &-form {
                display: flex;
                align-items: center;
                font-size: px2rem(3.5);
                justify-content: space-around;
                input {
                    border: 1px solid #DCDFE6;
                    font-size: px2rem(3.5);
                    width: px2rem(45);
                    height: px2rem(6);
                    margin-left: px2rem(4);
                    border-radius: px2rem(1);
                }
                span {
                    display: inline-block;
                    margin-right: px2rrem(4);
                }
            }
            button:last-child {
                background-color: #FC7F89;
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
                    font-size: px2rem(4);
                    background-color: #616789;
                    flex:3;
                    text-align: center;
                    color:#fff;
                    border: 1px solid #fff;
                    display: inline-block;
                }
                :nth-child(1) {
                    flex: 1;
                }
                :nth-child(2) {
                    flex: 2;
                }
                :nth-child(3) {
                    flex: 3;
                }
                :nth-child(4) {
                    flex: 4;
                }
                :nth-child(5) {
                    flex: 3;
                }
                :nth-child(6) {
                    flex: 2;
                }
            }

            &-tab {
                display: flex;
                flex-direction: column;
                div:nth-child(odd) {
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #fff;
                        height: px2rem(12);
                        line-height: px2rem(12);
                        font-size: px2rem(3.2);
                        flex:3;
                        text-align: center;
                        color:#000;
                        display: inline-block;

                        img {
                            width: px2rem(2.5);
                            height: px2rem(2.5)
                        }
                    }
                    :nth-child(1) {
                        flex: 1
                    }
                    :nth-child(2) {
                        flex: 2;
                    }
                    :nth-child(3) {
                        flex: 3;
                    }
                    :nth-child(4) {
                        flex: 4;
                    }
                    :nth-child(5) {
                        flex: 3;
                    }
                    :nth-child(6) {
                        flex: 2;
                        button {
                            border: none;
                            margin: px2rem(2);
                            padding: px2rem(1) px2rem(3);
                            border-radius: px2rem(1);
                            color: #ffffff;
                            font-size: px2rem(3);
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
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #E0E3F8;
                        height: px2rem(12);
                        line-height: px2rem(12);
                        font-size: px2rem(3.2);
                        flex:3;
                        text-align: center;
                        color:#000;
                        display: inline-block;
                        img {
                            width: px2rem(2.5);
                            height: px2rem(2.5)
                        }
                    }
                    :nth-child(1) {
                        flex: 1
                    }
                    :nth-child(2) {
                        flex: 2;
                    }
                    :nth-child(3) {
                        flex: 3;
                    }
                    :nth-child(4) {
                        flex: 4;
                    }
                    :nth-child(5) {
                        flex: 3;
                    }
                    :nth-child(6) {
                        flex: 2;
                        button {
                            border: none;
                            margin: px2rem(2);
                            padding: px2rem(1) px2rem(3);
                            border-radius: px2rem(1);
                            color: #ffffff;
                            font-size: px2rem(3);
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
        }
    }
    &-add {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(100);
            height: px2rem(80);
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            border-radius: px2rem(2);
            font-size: px2rem(3.5);
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
                flex-direction: column;
                align-items: center;
                font-size: px2rem(3.5);
                .el-select {
                    width: px2rem(60);
                    margin: px2rem(1) 0;
                }
                input {
                    width: px2rem(60);
                    border: 1px solid #E8EAEC;
                    height: px2rem(7);
                }
                :nth-child(3),:nth-child(4) {
                    input {
                        width: px2rem(67);
                    }
                }
                div {
                    margin: px2rem(1) 0;
                }
            }
            &-footer {
                display: flex;
                justify-content: space-around;
                margin: px2rem(6) 0 ;
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
