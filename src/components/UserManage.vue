<!--  -->
<template>
  <div class='user-manage'>
      <div class='user-manage-title'>
          用户管理
      </div>
      <div class='user-manage-list'>
        <div class='user-manage-list-button'>
          <el-button class='user-manage-list-button-more' @click='SelectMore'>选择多项</el-button>
          <el-button class='user-manage-list-button-new' type="text" @click="dialogFormVisible = true">添加员工</el-button>
          <el-button class='user-manage-list-button-edit'>编辑</el-button>
          <el-button class='user-manage-list-button-del'>删除</el-button>
        </div>
        <div class='user-manage-list-content'>
            <!-- 正常显示模板 -->
            <template v-if='isNormal'>
                <div class='user-manage-list-content-title'>
                    <span>序号</span>
                    <span>公司名称</span>
                    <span>用户名称</span>
                    <span>用户类型</span>
                    <span>类型</span>
                    <span>年龄</span>
                    <span>联系电话</span>
                </div>
                <div class='user-manage-list-content-tab'>
                    <div class='user-manage-list-content-tab-item' v-for='(item,index) in userMsg' :key='index'>
                        <span>{{index+1}}</span>
                        <span>{{item.companyName}}</span>
                        <span>{{item.userName}}</span>
                        <span>{{item.personType}}</span>
                        <span>{{item.TypeNum}}</span>
                        <span>{{item.age}}</span>
                        <span>{{item.tel}}</span>
                    </div>
                </div>
            </template>
            <!-- 新增显示模板 -->
            <template v-else>
                <div class='user-manage-list-content-title'>
                    <span>序号</span>
                    <span>公司名称</span>
                    <span>用户名称</span>
                    <span>用户类型</span>
                    <span>类型</span>
                    <span>年龄</span>
                    <span>联系电话</span>
                </div>
                <div class='user-manage-list-content-tab'>
                    <div class='user-manage-list-content-tab-item' v-for='item in userMsg' :key='item.userId'>
                        <span>
                            <input type="checkbox" class='user-manage-list-content-tab-item-select'>
                        </span>
                        <span>{{item.companyName}}</span>
                        <span>{{item.userName}}</span>
                        <span>{{item.personType}}</span>
                        <span>{{item.TypeNum}}</span>
                        <span>{{item.age}}</span>
                        <span>{{item.tel}}</span>
                    </div>
                </div>
            </template>
        </div>
        <div class='user-manage-list-pagination'>
             <el-pagination :background="bgc" :page-size="10" layout="prev, pager, next, jumper" :total="1000" @current-change="handleCurrentChange" > <!--:current-page.sync="currentPage3" -->
            </el-pagination>
        </div>
        <!-- 新增用户 -->
        <div class='user-manage-list-pop'>
            <el-dialog title="新增员工" :visible.sync="dialogFormVisible" class='user-manage-list-pop-container'>
                <div class='user-manage-list-pop-container-form'>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>用户姓名:</span>
                        <input v-model="AddEmployeeMsg.userName">
                    </div>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>人员ID:</span>
                        <input v-model="AddEmployeeMsg.personId">
                    </div>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>角色ID:</span>
                        <input v-model="AddEmployeeMsg.roleId">
                    </div>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>登陆名:</span>
                        <input v-model="AddEmployeeMsg.loginName">
                    </div>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>密码:</span>
                        <input v-model="UserPassword">
                    </div>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>用户头像:</span>
                        <input v-model="AddEmployeeMsg.userAvatar">
                    </div>
                    <div class='user-manage-list-pop-container-form-content'>
                        <span>备注:</span>
                        <input v-model="AddEmployeeMsg.note">
                    </div>
                </div>
                <div class='user-manage-list-pop-container-footer'>
                    <button @click="UserCancelled">取 消</button>
                    <button @click="AddEmployee">确 定</button>
                </div>
            </el-dialog>
        </div>
      </div>
  </div>
</template>

<script>
import QS from 'qs'
import md5 from 'js-md5'
export default {
    data () {
        return {
            // 分页器结构数据源
            bgc: true,
            queryInfo: {
                pageSize: 2,
                pageNum: 1
            },
            // 用户信息列表数据源
            userMsg: [
            ],
            // 确定选用正常模板还是多选模板
            isNormal: true,
            // 添加用户信息源
            // 用户原密码
            UserPassword: '',
            AddEmployeeMsg: {
                userName: '',
                userId: '',
                roleId: '',
                loginName: '',
                // md5加密后密码
                passwordMd5: '',
                userAvatar: '',
                note: ''
            },
            // 是否打开新增用户页面
            dialogFormVisible: false
        }
    },
    methods: {
        handleCurrentChange (val) {
            this.queryInfo.pageNum = val
            this.getUserMsg()
        },
        SelectMore () {
            this.isNormal = !this.isNormal
        },
        async getUserMsg () {
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubUser/queryList',
                data: QS.stringify(this.queryInfo)
            })
            this.userMsg = result.data.list
        },
        // 用户取消
        UserCancelled () {
            this.dialogFormVisible = false
            // 清除所有填写信息
            for (var i in this.AddEmployeeMsg) {
                this.AddEmployeeMsg[i] = ''
            }
        },
        // 用户确定添加
        async AddEmployee () {
            // 密码使用MD5加密
            this.AddEmployeeMsg.passwordMd5 = md5(this.UserPassword)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubUser/addPubUser',
                data: QS.stringify(this.AddEmployeeMsg)
            })
            if (result.resultCode === '200') {
                this.$message({
                    message: '用户添加成功',
                    type: 'success'
                })
            }
            // 清除所有填写信息
            for (var i in this.AddEmployeeMsg) {
                this.AddEmployeeMsg[i] = ''
            }
            this.dialogFormVisible = false
        }
    },
    created () {
        this.getUserMsg()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.user-manage {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
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
            line-height: px2rem(15);
            display: flex;
            align-items: center;
            .el-button {
                padding: px2rem(2) px2rem(4)
            }
            &-more {
                background-color: #FC7F89;
                color: #fff;
            }

            &-new {
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
        &-pagination {
            padding: px2rem(5) 0;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: px2rem(8);
            line-height: px2rem(8);
            .el-pagination>.active {
                background-color: #616789;
            }
            &-button {
                width: px2rem(8);
                height: px2rem(5);
                padding: px2rem(1) px2rem(2);
                line-height: px2rem(5);
                display: inline-block;
                margin-left: px2rem(3);
                font-size: px2rem(3.5);
                color: #fff;
                text-align: center;
                background-color: #616789;
                border-radius: px2rem(1);
            }
        }
        // 添加员工
        &-pop {
            &-container {
                &-form {
                    &-content {
                        margin: px2rem(4) 0 ;

                        span {
                            display: inline-block;
                            width: px2rem(18);
                            text-align: center;
                        }
                        input {
                            padding-left: px2rem(2);;
                            height: px2rem(8);
                            line-height: px2rem(8);
                            border-radius: px2rem(1);
                            border: 1px solid #E8EAEC;
                            width: px2rem(140);
                            margin-left: px2rem(4);
                        }
                    }
                }
                &-footer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    button {
                        margin: 0 px2rem(4);
                        margin-top: px2rem(6);
                        width: px2rem(12);
                        height: px2rem(8);
                        line-height: px2rem(8);
                        font-size: px2rem(3.5);
                        box-sizing: border-box;
                        border: none;
                        border-radius: px2rem(1);
                        background-color: #616789;
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>
