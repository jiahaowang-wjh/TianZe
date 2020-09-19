<!--  -->
<template>
  <div class='dictionary'>
        <div class='dictionary-title'>
            字典管理
        </div>
        <div class='dictionary-list'>
            <div class='dictionary-list-button'>
            <el-button class='dictionary-list-button-more' @click='SelectMore'>选择多项</el-button>
            <el-button class='dictionary-list-button-add' @click='AddDictionary'>新增字典</el-button>
            <el-button class='dictionary-list-button-del' @click='DeleteData'>删除</el-button>
            </div>
            <div class='dictionary-list-content'>
                <!-- 正常显示模板 -->
                <template v-if='isNormal'>
                    <div class='dictionary-list-content-title'>
                        <span>序号</span>
                        <span>字典类型</span>
                        <span>字典编码</span>
                        <span>字典编号</span>
                        <span>字典显示</span>
                        <span>排序</span>
                        <span>备注</span>
                        <span>操作</span>
                    </div>
                    <div class='dictionary-list-content-tab'>
                        <div class='dictionary-list-content-tab-item' v-for='(item,index) in DictionaryMsg' :key='index'>
                            <span>{{index+1}}</span>
                            <span>{{item.dictionType}}</span>
                            <span>{{item.dictionCode}}</span>
                            <span>{{item.dictionNo}}</span>
                            <span>{{item.dictionDis}}</span>
                            <span>{{item.sort}}</span>
                            <span>{{item.note}}</span>
                            <span>
                                <button @click='AlterDictionary(index)'>编辑</button>
                            </span>
                        </div>
                    </div>
                </template>
                <!-- 多选显示模板 -->
                <template v-else>
                    <div class='dictionary-list-content-title'>
                        <span>序号</span>
                        <span>字典类型</span>
                        <span>字典编码</span>
                        <span>字典编号</span>
                        <span>字典显示</span>
                        <span>排序</span>
                        <span>备注</span>
                    </div>
                    <div class='dictionary-list-content-tab'>
                        <div class='dictionary-list-content-tab-item' v-for='(item,index) in DictionaryMsg' :key='index'>
                            <span>
                                <input type="checkbox" v-model='item.isSelected'>
                            </span>
                            <span>{{item.dictionType}}</span>
                            <span>{{item.dictionCode}}</span>
                            <span>{{item.dictionNo}}</span>
                            <span>{{item.dictionDis}}</span>
                            <span>{{item.sort}}</span>
                            <span>{{item.note}}</span>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <!-- 是否显示添加页面 -->
        <div class='dictionary-add-dictionary' v-if='IsAddDictionary'>
            <div class='dictionary-add-dictionary-box'>
                <div class='dictionary-add-dictionary-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseDictionary'>
                </div>
                <div class='dictionary-add-dictionary-box-body'>
                    <div>
                        字典类型：
                        <el-select v-model='AddDictionaryMsg.dictionType'>
                            <el-option :value='item' :label='item' v-for='(item, index) in DiractionType' :key='index'></el-option>
                        </el-select>
                    </div>
                    <div>
                        字典编码：<input type="text" v-model='AddDictionaryMsg.dictionCode'>
                    </div>
                    <div>
                        字典编号：<input type="text" v-model='AddDictionaryMsg.dictionNo'>
                    </div>
                    <div>
                        字典显示：<input type="text" v-model='AddDictionaryMsg.dictionDis'>
                    </div>
                    <div>
                        字典排序：<input type="text" v-model='AddDictionaryMsg.sort'>
                    </div>
                    <div>
                        字典备注：<textarea cols="30" rows="10" v-model='AddDictionaryMsg.note'></textarea>
                    </div>
                </div>
                <div class='dictionary-add-dictionary-box-footer'>
                    <button @click='CloseDictionary'>取消</button>
                    <button @click='SubmitNew'>确认</button>
                </div>
            </div>
        </div>
        <!-- 是否显示添加页面 -->
        <div class='dictionary-add-dictionary' v-if='IsEditDictionary'>
            <div class='dictionary-add-dictionary-box'>
                <div class='dictionary-add-dictionary-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseEdit'>
                </div>
                <div class='dictionary-add-dictionary-box-body'>
                    <div>
                        字典类型：
                        <el-select v-model='AlterDictionaryMsg.dictionType'>
                            <el-option :value='item' :label='item' v-for='(item, index) in DiractionType' :key='index'></el-option>
                        </el-select>
                    </div>
                    <div>
                        字典编码：<input type="text" v-model='AlterDictionaryMsg.dictionCode'>
                    </div>
                    <div>
                        字典编号：<input type="text" v-model='AlterDictionaryMsg.dictionNo'>
                    </div>
                    <div>
                        字典显示：<input type="text" v-model='AlterDictionaryMsg.dictionDis'>
                    </div>
                    <div>
                        字典排序：<input type="text" v-model='AlterDictionaryMsg.sort'>
                    </div>
                    <div>
                        字典备注：<textarea cols="30" rows="10" v-model='AlterDictionaryMsg.note'></textarea>
                    </div>
                </div>
                <div class='dictionary-add-dictionary-box-footer'>
                    <button @click='CloseEdit'>取消</button>
                    <button @click='SubmitAlterDictionary'>确认</button>
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
            // 用户信息列表数据源
            DictionaryMsg: [],
            // 确定选用正常模板还是多选模板
            isNormal: true,
            IsAddDictionary: false,
            IsEditDictionary: false,
            DiractionType: ['BANK_PAY', 'COMMODITY_NAME', 'PLACE', 'NORM', 'MEASURE', 'PACKAGE'],
            AddDictionaryMsg: {
                dictionType: '',
                dictionCode: '',
                dictionNo: '',
                dictionDis: '',
                sort: '',
                note: ''
            },
            AlterDictionaryMsg: {
                dictionId: '',
                dictionType: '',
                dictionCode: '',
                dictionNo: '',
                dictionDis: '',
                sort: '',
                note: ''
            }
        }
    },
    methods: {
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        async InitDictionaryList () {
            const pageNum = '1'
            const pageSize = '20'
            const formData = new FormData()
            formData.append('pageNum', pageNum)
            formData.append('pageSize', pageSize)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDictionController/queryDicList',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.DictionaryMsg = result.data.list.map(v => {
                return { ...v, isSelected: false }
            })
        },
        async DeleteData () {
            const DeleteList = this.DictionaryMsg.filter(v => {
                return v.isSelected === true
            })
            // 参数拼接
            let dictionIds = ''
            DeleteList.map(v => {
                dictionIds += v.dictionId + ','
            })
            dictionIds = dictionIds.substring(0, dictionIds.length - 1)
            const formData = new FormData()
            formData.append('dictionIds', dictionIds)
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/api/api/pubDictionController/delDictionList',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(result => {
                    console.log(result)
                    if (result.data.resultCode === '200') {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.InitDictionaryList()
                    }
                    this.$emit('RenovateFragment', 'Dictionary')
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            })
        },
        CloseDictionary () {
            this.IsAddDictionary = false
        },
        AddDictionary () {
            this.IsAddDictionary = true
        },
        async SubmitNew () {
            const formData = new FormData()
            for (const key in this.AddDictionaryMsg) {
                formData.append(key, this.AddDictionaryMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDictionController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('添加信息成功')
            this.$emit('RenovateFragment', 'Dictionary')
            this.IsAddDictionary = false
        },
        CloseEdit () {
            this.IsEditDictionary = false
        },
        AlterDictionary (index) {
            this.IsEditDictionary = true
            this.AlterDictionaryMsg.dictionId = this.DictionaryMsg[index].dictionId
        },
        async SubmitAlterDictionary () {
            const formData = new FormData()
            for (const key in this.AlterDictionaryMsg) {
                formData.append(key, this.AlterDictionaryMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDictionController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error('修改错误,请重新输入')
            this.$message.success('修改信息成功')
            this.$emit('RenovateFragment', 'Dictionary')
        }
    },
    created () {
        this.InitDictionaryList()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.dictionary {
    background-color: #E9F0F5;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    &-title {
        height: px2rem(10);
        line-height: px2rem(10);
        font-size: px2rem(4);
        color: #FC7F89;
        margin-left: px2rem(4);
    }

    &-list {
        background-color: #fff;
        padding: px2rem(4);
        margin: 0 px2rem(4);
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
            button {
                border: none;
                background-color: #ECC87F;
                color: #fff;
                padding: px2rem(1) px2rem(2.5);
                border-radius: px2rem(1);
            }
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
                    flex: 4
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
                        flex: 4
                    }
                }
                div:nth-child(even) {
                    display: flex;
                    span {
                        flex: 3;
                        background-color: #E0E3F8;
                        height: px2rem(10);
                        line-height: px2rem(10);
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
                        flex: 4
                    }
                }
            }
        }
    }
    &-add-dictionary {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(120);
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
                    width: px2rem(80);
                    margin: px2rem(1) 0;
                }
                input {
                    width: px2rem(80);
                    border: 1px solid #E8EAEC;
                    height: px2rem(7);
                    margin: px2rem(1) 0;
                }
                textarea {
                    width: px2rem(80);
                    height: px2rem(14);
                    resize: none;
                    border: 1px solid #E8EAEC;
                }
                :last-child {
                    margin: px2rem(1) 0;
                    vertical-align: middle;
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
