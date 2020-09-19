<template>
    <div class="home">
        <el-container class='home-container'>
            <!-- 头部区域 -->
            <el-header class='home-container-header'>
                <!-- 左侧logo -->
                <div class='home-container-header-logo'>
                    <img  src="@imgs/home/sstz-logo.png" alt="">
                    <span >天泽系统</span>
                </div>
                <!-- 右侧用户身份信息及退出按钮 -->
                <div class='home-container-header-user'>
                    <!-- 头部右侧栏 -->
                    <div class='home-container-header-user-msg'>
                        <img :src="userMsg.userAvatar" alt="">
                        <span>{{userMsg.userName}}</span>
                    </div>
                    <div class='home-container-header-user-back' @click='logout'>
                        <img src="@imgs/home/back.svg" alt="">
                    </div>
                </div>
            </el-header>
            <!-- 主体区域 -->
            <el-container class='home-container-body'>
                <!-- 侧边栏 -->
                <div class='home-container-body-aside'>
                    <div class='home-container-body-aside-menu' text-color="#fff" active-text-color="#fff">
                        <!-- 一级菜单 -->
                        <div  v-for='(item,index) in AsideListContent' :key='item.id' class='home-container-body-aside-menu-item'>
                            <div class='home-container-body-aside-menu-item-content' @click="showToggle(item,index)" :class='{active: item.isSelected}'>
                                <span class='home-container-body-aside-menu-item-title'>{{item.menuName}}</span>
                                <img src="@imgs/home/right.svg" alt="" v-if='item.children'>
                            </div>
                            <!-- 二级菜单 -->
                            <!-- <transition name='Toggle'> -->
                            <div v-if='item.isSelected'>
                                <div v-for='(subItem,index) in item.children'  :key='subItem.id' class='home-container-body-aside-menu-item-subitem' @click.stop='subItemToggle(subItem,index)' :class='{active: subItem.isChildSelected}'>
                                    <span>{{subItem.menuName}}</span>
                                </div>
                            </div>
                            <!-- </transition> -->
                        </div>
                    </div>
                </div>
                <!-- 右侧内容主体 -->
                <el-main class='home-container-body-main'>
                   <component :is="currentComponent" @onChangeFragment='onChangeFragment' @RenovateFragment='RenovateFragment' v-if="isRouterAlive"></component>  <!-- :ComponentName='Componentname'-->
                </el-main>
        </el-container>
    </el-container>
    </div>
</template>

<script>
export default {
    name: 'Main',
    data () {
        return {
            userMsg: {
                userName: '用户名或身份',
                userAvatar: require('@imgs/home/user-logo.png')
            },
            // 一级侧边栏动态激活下标
            AsideActiveIndex: 0,
            // 二级菜单样式变换
            AsideSubActiveIndex: 0,
            AsideListContent: [],
            currentComponent: 'home',
            isRouterAlive: true
        }
    },
    components: {
        Home: () => import('@c/Home'),
        DebtChain: () => import('@c/DebtChain'),
        UserManage: () => import('@c/UserManage'),
        MyDebt: () => import('@c/MyDebt'),
        ReportInfo: () => import('@c/myapproval/ReportInfo'),
        CivilMedia: () => import('@c/myapproval/CivilMedia'),
        UnlockApply: () => import('@c/myapproval/UnlockApply'),
        PaymentVoucher: () => import('@c/myapproval/PaymentVoucher'),
        PayDetail: () => import('@c/PayDetail'),
        Formula: () => import('@c/Formula'),
        Roles: () => import('@c/Roles'),
        Right: () => import('@c/Right'),
        Dictionary: () => import('@c/Dictionary'),
        Document: () => import('@c/Document'),
        Password: () => import('@c/Password'),
        AddReportForm: () => import('@c/MyDebt/AddReportForm'),
        ExamineReportForm: () => import('@c/MyDebt/ExamineReportForm'),
        Investigation: () => import('@c/MyDebt/Investigation'),
        UnlockApplyForm: () => import('@c/MyDebt/UnlockApplyForm'),
        CivilMediaForm: () => import('@c/MyDebt/CivilMediaForm'),
        PledgedContract: () => import('@c/MyDebt/PledgedContract'),
        ReportPayment: () => import('@c/currency/ReportPayment'),
        UnlockPayment: () => import('@c/currency/UnlockPayment'),
        DebtDownload: () => import('@c/DebtDownload'),
        FinanceDownload: () => import('@c/FinanceDownload'),
        ReportApprove: () => import('@c/currency/ReportApprove'),
        // 报备凭证审批
        ReportVoucherApprove: () => import('@c/currency/ReportVoucherApprove'),
        // 调解审批
        MediaApprove: () => import('@c/currency/MediaApprove'),
        // 调查报告审批
        ExamineReportFormApprove: () => import('@c/currency/ExamineReportFormApprove'),
        // 解债审批
        UnlockApplyApprove: () => import('@c/currency/UnlockApplyApprove'),
        // 解债缴费审批
        UnlockPaymentApprove: () => import('@c/currency/UnlockPaymentApprove'),
        // 重新编辑报备页面
        EditReport: () => import('@c/Alter/EditReport')
    },
    methods: {
        // 退出登录
        logout () {
            window.localStorage.clear()
            this.$router.push({
                name: 'Login'
            })
        },
        // 切换组件
        onChangeFragment (componentName) {
            this.currentComponent = componentName
        },
        // 获取数据
        async getAsideList () {
            // 获取用户权限菜单
            const formData = new FormData()
            formData.append('userId', window.sessionStorage.getItem('userId'))
            const { data: Listresult } = await this.$http({
                method: 'post',
                url: '/api/api/pubUser/selectMenuByUserId',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            let ParentList = Listresult.data.filter(v => {
                return v.prantId === '0'
            })
            ParentList = ParentList.map(v => {
                return { ...v, isSelected: false }
            })

            ParentList[0].isSelected = true
            let children = Listresult.data.filter(v => {
                return v.prantId !== '0'
            })
            children = children.map(v => {
                return { ...v, isChildSelected: false }
            })
            ParentList.forEach(v => {
                if (v.menuOrder === 5) {
                    v.children = children
                }
            })
            this.AsideListContent = ParentList
        },
        // 一级菜单菜单
        showToggle (item, index) {
            this.AsideListContent.forEach(v => {
                if (v.isSelected !== this.AsideListContent[index].isSelected) {
                    v.isSelected = false
                }
            })
            item.isSelected = !item.isSelected
            // 页面切换
            if (item.menuUrl === 'MyApproval') return false
            this.currentComponent = item.menuUrl
        },
        // 下级菜单样式及组件切换变换
        subItemToggle (subItem, index) {
            const Approve = this.AsideListContent.filter(v => {
                return v.menuOrder === 5
            })
            Approve[0].children.forEach(v => {
                if (v.isChildSelected !== Approve[0].children[index].isChildSelected) {
                    v.isChildSelected = false
                }
            })
            subItem.isChildSelected = true
            this.currentComponent = subItem.menuUrl
        },
        initData () {
            // 获取路由中的信息
            this.userMsg.userName = this.$route.params.username
            //  获取左侧导航栏数据
            this.getAsideList()
        },
        RenovateFragment (componentName) {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
            this.onChangeFragment(componentName)
        }
    },
    created () {
        // 初始化数据
        this.initData()
        this.userMsg.userName = window.sessionStorage.getItem('userName')
        this.userMsg.userAvatar = require('@imgs/home/user-logo.png')
    }
}
</script>
<style lang="scss" scoped>
@import '@css/style.scss';
.home {
    width: 100%;
    height: 100%;
    font-size: px2rem(12);
    position: relative;
    &-container {
        height: 100%;
        &-header {
            background-color: #fff;
            display: flex;
            align-items: center;
            padding: 0 px2rem(10);
            height: px2rem(20) !important;
            justify-content: space-between;
            // 左侧logo
            &-logo {
                display: flex;
                align-items: center;
                img {
                    width: px2rem(16);
                    height: px2rem(16);
                }
                span {
                    font-size: px2rem(6);
                    margin-left: px2rem(4);
                    font-weight: 600;
                    color: #616789;
                }
            }
            // 右侧用户信息
            &-user {
                display: flex;
                justify-items: center;

                &-msg {
                    display: flex;
                    align-items: center;
                    img {
                        width: px2rem(6);
                        height: px2rem(6);
                        border-radius: 50%;
                    }
                    span {
                        font-size: px2rem(4);
                        margin-left: px2rem(2);
                        margin-right: px2rem(8);
                    }
                }

                &-back {
                    display: flex;
                    justify-items: center;
                    img {
                        width: px2mre(6);
                        height: px2rem(6);
                    }
                }
            }
        }

        &-body {
            &-aside {
                background-image: linear-gradient(to bottom, #5C6283 , #191A38);
                width: px2rem(55);
                height: 100%;
                &-menu {
                        height: 100%;
                        width: 100%;
                    &-item {
                        display: flex;
                        flex-direction: column;
                        &-content {
                            background-color: transparent;
                            color: #fff;
                            line-height: px2rem(9);
                            display: flex;
                            padding-left: px2rem(10);
                            justify-content: space-between;
                            align-items: center;
                            height: px2rem(10);
                        }

                        &-subitem {
                            height: px2rem(9);
                            display: flex;
                            justify-content: center;
                            padding-left: px2rem(14);
                        }
                        span {
                            font-size: px2rem(4);
                            color: #fff;
                            width: 100%;
                            height: px2rem(9);
                            line-height: px2rem(9);
                        }
                        img {
                            height: px2rem(8);
                            width: px2rem(4);
                        }
                        .active {
                            background-color: #FC7F89;

                            img {

                            }
                        }
                    }
                }
            }

            &-main {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
            }
        }
    }
}
</style>
<style lang="scss">
@import '@css/style.scss';
.el-main {
    padding: 0!important;
}
</style>
