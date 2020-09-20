<!--  -->
<template>
  <div class='document'>
      <div class='document-title'>
          文档管理
      </div>
      <div class='document-list'>
        <div class='document-list-button'>
          <el-button class='document-list-button-more' @click='SelectMore'>选择多项</el-button>
          <el-button class='document-list-button-add' @click='OpenAddDocument'>新增文档</el-button>
          <el-button class='document-list-button-del' @click='DelectDocument'>删除</el-button>
        </div>
        <div class='document-list-content'>
            <!-- 正常显示模板 -->
            <template v-if='isNormal'>
                <div class='document-list-content-title'>
                    <span>序号</span>
                    <span>文档名称</span>
                    <span>文档路径</span>
                    <span>备注</span>
                    <span>操作</span>
                </div>
                <div class='document-list-content-tab'>
                    <div class='document-list-content-tab-item' v-for='(item,index) in DocMsg' :key='index'>
                        <span>{{index+1}}</span>
                        <span>{{item.docId}}</span>
                        <span>{{item.docPath}}</span>
                        <span>{{item.note}}</span>
                        <span>
                            <button @click='OpenEditDocument(index)'>编辑</button>
                        </span>
                    </div>
                </div>
            </template>
            <!-- 多选显示模板 -->
            <template v-else>
                <div class='document-list-content-title'>
                    <span>序号</span>
                    <span>文档名称</span>
                    <span>文档路径</span>
                    <span>备注</span>
                </div>
                <div class='document-list-content-tab'>
                    <div class='document-list-content-tab-item' v-for='(item,index) in DocMsg' :key='index'>
                        <span>
                            <input type="checkbox" v-model='item.isSelected'>
                        </span>
                        <span>{{item.docId}}</span>
                        <span>{{item.docPath}}</span>
                        <span>{{item.note}}</span>
                    </div>
                </div>
            </template>
        </div>
        <!-- 是否显示添加页面 -->
        <div class='document-add' v-if='IsAddDocument'>
            <div class='document-add-box'>
                <div class='document-add-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAddDocument'>
                </div>
                <div class='document-add-box-body'>
                    <div>
                        文档路径：<input type="text" v-model='AddDictionaryMsg.docPath'>
                    </div>
                    <div>
                        备注：<input type="text" v-model='AddDictionaryMsg.note'>
                    </div>
                </div>
                <div class='document-add-box-footer'>
                    <button @click='CloseAddDocument'>取消</button>
                    <button @click='SubmitAddMsg'>确认</button>
                </div>
            </div>
        </div>
        <!-- 是否显示编辑页面 -->
        <div class='document-add' v-if='IsEditDocument'>
            <div class='document-add-box'>
                <div class='document-add-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseEditDocument'>
                </div>
                <div class='document-add-box-body'>
                    <div>
                        文档路径：<input type="text" v-model='EditDictionaryMsg.docPath'>
                    </div>
                    <div>
                        备注：<input type="text" v-model='EditDictionaryMsg.note'>
                    </div>
                </div>
                <div class='document-add-box-footer'>
                    <button @click='CloseEditDocument'>取消</button>
                    <button @click='SubmitEditDocument'>确认</button>
                </div>
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
            IsAddDocument: false,
            IsEditDocument: false,
            // 用户信息列表数据源
            DocMsg: [],
            // 确定选用正常模板还是多选模板
            isNormal: true,
            AddDictionaryMsg: {
                docPath: '',
                note: ''
            },
            EditDictionaryMsg: {
                docId: '',
                docPath: '',
                note: ''
            }
        }
    },
    methods: {
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        // 获取查询文档信息
        async DocumentInit () {
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDocController/queryDoc'
            })
            this.DocMsg = result.data.map(v => {
                return { ...v, isSelected: false }
            })
            console.log(this.DocMsg)
        },
        // 添加文档
        CloseAddDocument () {
            this.IsAddDocument = false
        },
        OpenAddDocument () {
            this.IsAddDocument = true
        },
        async SubmitAddMsg () {
            const formData = new FormData()
            for (const key in this.AddDictionaryMsg) {
                formData.append(key, this.AddDictionaryMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDocController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error('添加错误,请重新输入')
            this.$message.success('添加文档成功')
            this.IsAddDictionary = false
        },
        // 编辑文档
        CloseEditDocument () {
            this.IsEditDocument = false
        },
        OpenEditDocument (index) {
            this.EditDictionaryMsg.docId = this.DocMsg[index].docId
            this.IsEditDocument = true
        },
        async SubmitEditDocument () {
            const formData = new FormData()
            for (const key in this.EditDictionaryMsg) {
                formData.append(key, this.EditDictionaryMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubDocController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(result)
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('修改文档成功')
            this.IsEditDocument = false
        },
        DelectDocument () {
            const DeleteList = this.DocMsg.filter(v => {
                return v.isSelected === true
            })
            // 参数拼接
            let docIds = ''
            DeleteList.map(v => {
                docIds += v.docId + ','
            })
            docIds = docIds.substring(0, docIds.length - 1)
            const formData = new FormData()
            formData.append('docIds', docIds)
            this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http({
                    method: 'post',
                    url: '/api/api/pubDocController/delDocList',
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
        this.DocumentInit()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.document {
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
                button {
                    border: none;
                    background-color: #ECC87F;
                    color: #ffffff;
                    padding: px2rem(1.2) px2rem(3);
                    font-size: px2rem(3.5);
                    border-radius: px2rem(1);
                }
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
        left: 0;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(100);
            height: px2rem(62);
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
                    width: px2rem(73);
                    border: 1px solid #E8EAEC;
                    height: px2rem(7);
                    padding-left: px2rem(2);
                }
                :nth-child(1){
                    input {
                        width: px2rem(67);
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
