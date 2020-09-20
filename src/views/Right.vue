<!--  -->
<template>
  <div class='right'>
        <div class='right-title'>
            权限管理
        </div>
        <div class='right-list'>
            <div class='right-list-button'>
            <el-button class='right-list-button-add' @click='OpenAdd'>新增权限</el-button>
            </div>
            <div class='right-list-content'>
                <!-- 正常显示模板 -->
                <template v-if='isNormal'>
                    <div class='right-list-content-title'>
                        <span>序号</span>
                        <span>权限项</span>
                        <span>权限名称</span>
                        <span>权限标识</span>
                        <span>操作</span>
                    </div>
                    <div class='right-list-content-tab'>
                        <div class='right-list-content-tab-item' v-for='(item,index) in RightMsg' :key='index'>
                            <span>{{index+1}}</span>
                            <span>{{item.authname}}</span>
                            <span>{{item.interfacename}}</span>
                            <span>{{item.note}}</span>
                            <span>
                                <button @click='OpenEdit(index)'>编辑</button>
                                <button @click='DelRight(index)'>删除</button>
                            </span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <!-- 新增页面 -->
        <div class='right-add' v-if='IsAddRight'>
            <div class='right-add-box'>
                <div class='right-add-box-header'>
                    <span>新增</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAdd'>
                </div>
                <div class='right-add-box-body'>
                    <div>
                        权限项：<input type="text" v-model='AddRightMsg.authname'>
                    </div>
                    <div>
                        权限名称：<input type="text" v-model='AddRightMsg.interfacename'>
                    </div>
                    <div>
                        备注：<input type="text" v-model='AddRightMsg.note'>
                    </div>
                </div>
                <div class='right-add-box-footer'>
                    <button @click='CloseAdd'>取消</button>
                    <button @click='SubmitAddRight'>确认</button>
                </div>
            </div>
        </div>
        <!-- 修改页面 -->
        <div class='right-add' v-if='IsEditRight'>
            <div class='right-add-box'>
                <div class='right-add-box-header'>
                    <span>编辑</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseEdit'>
                </div>
                <div class='right-add-box-body'>
                    <div>
                        权限项：<input type="text" v-model='EditRightMsg.authname'>
                    </div>
                    <div>
                        权限名称：<input type="text" v-model='EditRightMsg.interfacename'>
                    </div>
                    <div>
                        备注：<input type="text" v-model='EditRightMsg.note'>
                    </div>
                </div>
                <div class='right-add-box-footer'>
                    <button @click='CloseEdit'>取消</button>
                    <button @click='SubmitEditRight'>确认</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            // 用户信息列表数据源
            rightMsg: [],
            // 确定选用正常模板还是多选模板
            isNormal: true,
            RightMsg: [],
            IsAddRight: false,
            IsEditRight: false,
            AddRightMsg: {
                authname: '',
                interfacename: '',
                note: ''
            },
            EditRightMsg: {
                authId: '',
                authname: '',
                interfacename: '',
                note: ''
            }
        }
    },
    methods: {
        async InRightData () {
            const { data: UserResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/selectUserAuth'
            })
            const { data: DebtResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/selectDebtAuth'
            })
            const { data: PropertyResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/selectAssetsAuth'
            })
            this.RightMsg = [...UserResult.data, ...DebtResult.data, ...PropertyResult.data]
        },
        // 新增页面
        async SubmitAddRight () {
            const formData = new FormData()
            for (const key in this.AddRightMsg) {
                formData.append(key, this.AddRightMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('新增权限成功')
        },
        CloseAdd () {
            this.IsAddRight = false
        },
        OpenAdd () {
            this.IsAddRight = true
        },
        // 编辑页面
        CloseEdit () {
            this.IsEditRight = false
        },
        OpenEdit (index) {
            this.EditRightMsg.authId = this.RightMsg[index].authId
            this.IsEditRight = true
        },
        async SubmitEditRight () {
            const formData = new FormData()
            for (const key in this.EditRightMsg) {
                formData.append(key, this.EditRightMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('修改权限成功')
        },
        DelRight (index) {
            const formData = new FormData()
            formData.append('authId', this.RightMsg[index].authId)
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/api/api/pubAuthController/deleteByPrimaryKey',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(result => {
                    if (result.data.resultCode === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.InitDictionaryList()
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            })
        }
    },
    created () {
        this.InRightData()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.right {
    background-color: #E9F0F5;
    width: 100%;
    height: 100%;
    position: relative;
    &-title {
        height: px2rem(10);
        line-height: px2rem(10);
        font-size: px2rem(4);
        color: #FC7F89;
        margin: 0 px2rem(4);
    }

    &-list {
        height: px2rem(140);
        background-color: #fff;
        margin: 0 px2rem(4);
        padding: px2rem(4);

        &-button {
            height: px2rem(15);
            display: flex;
            align-items: center;
            .el-button {
                padding: px2rem(2) px2rem(4)
            }
            &-more {
                background-color: #FC7F89;
                color: #fff;
            }
            &-add {
                color: #fff;
                background-color: #AD94E2;
            }
            &-edit {
                color: #fff;
                background-color: #ECC87F;
            }

            &-del {
                color: #fff;
                background-color: #616789;
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
            }

            &-tab {
                display: flex;
                flex-direction: column;
                div:nth-child(odd) {
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #fff;
                        height: px2rem(10);
                        line-height: px2rem(10);
                        font-size: px2rem(4);
                        flex:3;
                        text-align: center;
                        color:#000;
                        display: inline-block;

                        img {
                            width: px2rem(2.5);
                            height: px2rem(2.5)
                        }
                        button {
                            border: none;
                            padding: px2rem(1.4) px2rem(3);
                            margin: 0 px2rem(2);
                            color: #ffffff;
                            border-radius: px2rem(1);
                            vertical-align: middle;
                        }
                        button:nth-child(1) {
                            background-color: #ECC87F
                        }
                        button:nth-child(2) {
                            background-color: #616789
                        }
                    }
                    :nth-child(1) {
                        flex: 1
                    }
                }
                div:nth-child(even) {
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #E0E3F8;
                        height: px2rem(10);
                        line-height: px2rem(10);
                        font-size: px2rem(4);
                        flex:3;
                        text-align: center;
                        color:#000;
                        display: inline-block;
                        img {
                            width: px2rem(2.5);
                            height: px2rem(2.5)
                        }
                        button {
                            border: none;
                            padding: px2rem(1.4) px2rem(3);
                            margin: 0 px2rem(2);
                            color: #ffffff;
                            border-radius: px2rem(1);
                            vertical-align: middle;
                        }
                        button:nth-child(1) {
                            background-color: #ECC87F;
                        }
                        button:nth-child(2) {
                            background-color: #616789
                        }
                    }
                    :nth-child(1) {
                        flex: 1
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
            height: px2rem(70);
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
                input {
                    width: px2rem(68);
                    border: 1px solid #E8EAEC;
                    height: px2rem(7);
                }
                :nth-child(1) {
                    input {
                        width: px2rem(64);
                    }
                }
                :nth-child(2) {
                    input {
                        width: px2rem(64);
                    }
                }
                div {
                    margin: px2rem(2) 0;
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
