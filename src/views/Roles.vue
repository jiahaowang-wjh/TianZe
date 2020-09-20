<!--  -->
<template>
    <div class='roles'>
        <div class='roles-title'>
            角色管理
        </div>
        <div class='roles-list'>
            <div class='roles-list-button'>
            <el-button class='roles-list-button-new' @click='AddRole'>新增角色</el-button>
            </div>
            <div class='roles-list-content'>
                <div class='roles-list-content-title'>
                    <span>序号</span>
                    <span>角色名称</span>
                    <span>是否有效</span>
                    <span>备注</span>
                    <span>操作</span>
                </div>
                <div class='roles-list-content-tab'>
                    <div class='roles-list-content-tab-item' v-for='(item,index) in RolesMsg' :key='index'>
                        <span>{{index+1}}</span>
                        <span>{{item.rolename}}</span>
                        <span>{{item.isenable === '1' ? '是' : '否'}}</span>
                        <span>{{item.note}}</span>
                        <span>
                            <button @click='ShowDistributionPage(index)'>分配权限</button>
                            <button @click='OpenAlterPage(index)'>编辑</button>
                            <button @click='DeleteRole(index)'>删除</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 是否显示分配权限页面 -->
        <div class='roles-add-dictionary' v-if='IsShowDistributionPage'>
            <div class='roles-add-dictionary-box'>
                <div class='roles-add-dictionary-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseDistributionPage'>
                </div>
                <div class='roles-add-dictionary-box-body'>
                    <div>
                        角色名称：<input type="text" :disabled='true' v-model='ShowUserMsg.RoleName'>
                    </div>
                    <div>
                        是否有效：<input type="text" :disabled='true' v-model='ShowUserMsg.isenable'>
                    </div>
                    <div>
                        备注信息：<input type="text" :disabled='true' v-model='ShowUserMsg.note'>
                    </div>
                    <div class='roles-add-dictionary-box-body-menuList'>
                        <span>分配权限菜单：</span>
                        <el-select multiple v-model='HasSelectMsg.MenuMsg'>
                            <el-option :label='item.menuName' :value='item.menuId' v-for='(item,index) in MenuMsgList' :key=index></el-option>
                        </el-select>
                        <el-select multiple v-model='HasSelectMsg.UserRightMsg' placeholder="请选择用户权限">
                            <el-option :label='item.interfacename' :value='item.authId' v-for='(item,index1) in UserRightMsgList' :key=index1></el-option>
                        </el-select>
                        <el-select multiple v-model='HasSelectMsg.DebtRightMsg' placeholder="请选择债务系统权限">
                            <el-option :label='item.interfacename' :value='item.authId' v-for='(item,index2) in DebtRightMsgList' :key=index2></el-option>
                        </el-select>
                        <el-select multiple v-model='HasSelectMsg.AssetsRightMsgList' placeholder="请选择资产系统权限">
                            <el-option :label='item.interfacename' :value='item.authId' v-for='(item,index3) in AssetsRightMsgList' :key=index3></el-option>
                        </el-select>
                    </div>
                </div>
                <div class='roles-add-dictionary-box-footer'>
                    <button @click='CloseDistributionPage'>取消</button>
                    <button @click='SubmitAllDistributionData'>确认</button>
                </div>
            </div>
        </div>
        <!-- 是否显示新增角色页面 -->
        <div class='roles-add-person' v-if='IsShowAddRole'>
            <div class='roles-add-person-box'>
                <div class='roles-add-person-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAddPage'>
                </div>
                <div class='roles-add-person-box-body'>
                    <div>
                        角色名称：<input type="text" v-model='AddRoleList.rolename'>
                    </div>
                    <div>
                        是否有效：
                        <el-select v-model='AddRoleList.isenable'>
                            <el-option :value='1' :label="'是'"></el-option>
                            <el-option :value='0' :label="'否'"></el-option>
                        </el-select>
                    </div>
                    <div>
                        备注信息：<input type="text"  v-model='AddRoleList.note'>
                    </div>
                </div>
                <div class='roles-add-person-box-footer'>
                    <button @click='CloseAddPage'>取消</button>
                    <button @click='SubmitAddData'>确认</button>
                </div>
            </div>
        </div>
        <!-- 是否显示新增角色页面 -->
        <div class='roles-add-person' v-if='IsShowAlterRole'>
            <div class='roles-add-person-box'>
                <div class='roles-add-person-box-header'>
                    <span>提示</span>
                    <img src="@imgs/other/error@2x.png" alt="" @click='CloseAddPage'>
                </div>
                <div class='roles-add-person-box-body'>
                    <div>
                        角色名称：<input type="text" v-model='AlterRoleMsg.rolename'>
                    </div>
                    <div>
                        是否有效：
                        <el-select v-model='AlterRoleMsg.isenable'>
                            <el-option :value='1' :label="'是'"></el-option>
                            <el-option :value='0' :label="'否'"></el-option>
                        </el-select>
                    </div>
                    <div>
                        备注信息：<input type="text"  v-model='AlterRoleMsg.note'>
                    </div>
                </div>
                <div class='roles-add-person-box-footer'>
                    <button @click='CloseAlterPage'>取消</button>
                    <button @click='SubmitEditRoleMsg'>确认</button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            isNormal: true,
            IsShowAddRole: false,
            IsShowAlterRole: false,
            RolesMsg: [],
            // 是否打开修改分配权限页面
            IsShowDistributionPage: false,
            // 用户选中信息
            HasSelectMsg: {
                MenuMsg: [],
                UserRightMsg: [],
                DebtRightMsg: [],
                AssetsRightMsgList: []
            },
            // 点击分配权限展示信息
            MenuMsgList: [],
            UserRightMsgList: [],
            DebtRightMsgList: [],
            AssetsRightMsgList: [],
            ShowUserMsg: {
                RoleName: '',
                isenable: '',
                note: ''
            },
            // 提交用户修改菜单
            SubmitMenuMsg: {
                roleId: '',
                menus: ''
            },
            // 提交用户修改权限
            SubmitRightMsg: {
                roleId: '',
                authId: ''
            },
            AddRoleList: {
                rolename: '',
                note: '',
                isenable: ''
            },
            // 修改角色信息
            AlterRoleMsg: {
                rolename: '',
                isenable: '',
                note: '',
                roleId: ''
            }
        }
    },
    methods: {
        // 获取角色信息列表
        async GetRoleMsg () {
            const roleId = window.sessionStorage.getItem('roleId')
            const formData = new FormData()
            formData.append('roleId', roleId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubRoleController/queryRole',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.RolesMsg = result.data.map(v => {
                return { ...v, isSelected: false }
            })
        },
        ShowDistributionPage (index) {
            this.ShowUserMsg.RoleName = this.RolesMsg[index].rolename
            this.ShowUserMsg.isenable = this.RolesMsg[index].isenable
            this.ShowUserMsg.note = this.RolesMsg[index].note
            this.SubmitMenuMsg.roleId = this.RolesMsg[index].roleId
            this.SubmitRightMsg.roleId = this.RolesMsg[index].roleId
            console.log(this.SubmitRightMsg.roleId, this.SubmitMenuMsg.roleId)
            this.IsShowDistributionPage = true
        },
        CloseDistributionPage () {
            this.IsShowDistributionPage = false
        },
        async GetMenuAndRightMsg () {
            const formData = new FormData()
            const { data: MenuResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubMenu/selcetListAuth',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.MenuMsgList = MenuResult.data
            const { data: UserRightResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/selectUserAuth',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.UserRightMsgList = UserRightResult.data

            const { data: DebtRightResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/selectDebtAuth',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.DebtRightMsgList = DebtRightResult.data

            const { data: AssetsRightResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubAuthController/selectAssetsAuth',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.AssetsRightMsgList = AssetsRightResult.data
        },
        async SubmitAllDistributionData () {
            this.SubmitMenuMsg.menus = this.HasSelectMsg.MenuMsg.join(',')
            this.SubmitRightMsg.authId = [...this.HasSelectMsg.UserRightMsg, ...this.HasSelectMsg.DebtRightMsg, ...this.HasSelectMsg.AssetsRightMsgList].join(',')
            const MenuFormData = new FormData()
            for (const key in this.SubmitMenuMsg) {
                MenuFormData.append(key, this.SubmitMenuMsg[key])
            }
            const { data: MenuResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubRoleController/addRoleMenus',
                data: MenuFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (MenuResult.resultCode !== '200') return this.$message.error('添加菜单失败')
            const RightFormData = new FormData()
            for (const key in this.SubmitRightMsg) {
                RightFormData.append(key, this.SubmitRightMsg[key])
            }
            const { data: RightResult } = await this.$http({
                method: 'post',
                url: '/api/api/pubRoleController/addRoleAuthList',
                data: RightFormData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (RightResult.resultCode !== '200') return this.$message.error('添加权限失败')
            this.$message.success('修改用户权限成功')
        },
        AddRole () {
            this.IsShowAddRole = true
        },
        CloseAddPage () {
            this.IsShowAddRole = false
        },
        async SubmitAddData () {
            const formData = new FormData()
            for (const key in this.AddRoleList) {
                formData.append(key, this.AddRoleList[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubRoleController/insertSelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error('操作失败')
            this.$message.success('新增角色成功')
        },
        async DeleteRole (index) {
            const formData = new FormData()
            formData.append('roleId', this.RolesMsg[index].roleId)
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubRoleController/deleteByPrimaryKey',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('操作成功')
        },
        OpenAlterPage (index) {
            this.IsShowAlterRole = true
            this.AlterRoleMsg.roleId = this.RolesMsg[index].roleId
        },
        async SubmitEditRoleMsg () {
            const formData = new FormData()
            for (const key in this.AlterRoleMsg) {
                formData.append(key, this.AlterRoleMsg[key])
            }
            const { data: result } = await this.$http({
                method: 'post',
                url: '/api/api/pubRoleController/updateByPrimaryKeySelective',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            if (result.resultCode !== '200') return this.$message.error(result.resultMessage)
            this.$message.success('操作成功')
        },
        CloseAlterPage () {
            this.IsShowAlterRole = false
        }
    },
    created () {
        this.GetRoleMsg()
        this.GetMenuAndRightMsg()
    }
}

</script>
<style lang='scss' scoped>
@import '@css/style.scss';
.roles {
    display: flex;
    flex-direction: column;
    background-color: #E9F0F5;
    height: 100%;
    width: 100%;
    position: relative;
    input:disabled {
        background-color: #E0E3F8;
    }
    &-title {
        height: px2rem(10);
        line-height: px2rem(10);
        font-size: px2rem(4);
        color: #FC7F89;
        margin: px2rem(1) px2rem(4);
    }

    &-list {
        height: px2rem(140);
        overflow: auto;
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
        }

        &-content {
            display: flex;
            flex-direction: column;
            &-title {
                display: flex;
                height: px2rem(12);
                span {
                    height: px2rem(12);
                    line-height: px2rem(12);
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
                &-item {
                    display: flex;
                    span {
                        flex: 3;
                        height: px2rem(12);
                        line-height: px2rem(12);
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
                    :last-child {
                        button {
                            border: none;
                            padding: px2rem(1) px2rem(2.5);
                            margin: 0 px2rem(2);
                            background-color: #FC7F89;
                            color: #fff;
                            border-radius: px2rem(1);
                        }
                        :nth-child(2) {
                            background-color: #ECC87F;
                        }
                        :nth-child(3) {
                            background-color: #616789;
                        }
                    }
                }
                div:nth-child(odd) {
                    span {
                        background-color: #fff;
                    }
                }
                div:nth-child(even) {
                    span {
                        background-color: #E0E3F8;
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
            width: px2rem(200);
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
                    width: px2rem(38);
                    margin: px2rem(1) 0;
                    margin-left: px2rem(2);
                }
                input {
                    width: px2rem(165);
                    border: 1px solid #E8EAEC;
                    height: px2rem(7);
                    margin: px2rem(1) 0;
                    padding-left: px2rem(2);
                }
                &-menuList {
                    height: px2rem(20);
                    line-height: px2rem(20);
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
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
    &-add-person {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        background-color:rgba(0,0,0,.4);
        &-box {
            position: absolute;
            background-color:#ffffff;
            width: px2rem(100);
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
                    width: px2rem(70);
                    border: 1px solid #E8EAEC;
                    height: px2rem(8);
                    line-height: px2rem(8);
                    margin: px2rem(3) 0;
                    padding-left: px2rem(2);
                }
                .el-select {
                    width: px2rem(70);
                    line-height: px2rem(8);
                    height: px2rem(8);
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
