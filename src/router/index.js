import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'







Vue.use(VueRouter)




const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/main',
        name: 'Main',
        component: Main,
        meta: {
            requireAuth: true
        },
        children: [{
                path: '/Home',
                name: 'Home',
                component: () => import('@/views/Home'),
                meta: {
                    leftMenu: '/Home'
                }
            },
            { //"债事链
                path: '/DebtChain',
                name: 'DebtChain',
                component: () => import('@/views/DebtChain'),
                meta: {
                    leftMenu: '/DebtChain',
                }
            },
            { //"用户管理"
                path: '/UserManage',
                name: 'UserManage',
                component: () => import('@/views/UserManage'),
                meta: {
                    leftMenu: '/UserManage',
                }
            },
            { //我的债行
                path: '/MyDebt',
                name: 'MyDebt',
                component: () => import('@/views/MyDebt'),
                meta: {
                    leftMenu: '/MyDebt',
                }
            },
            { // 支付明细
                path: '/PayDetail',
                name: 'PayDetail',
                component: () => import('@/views/PayDetail'),
                meta: {
                    leftMenu: '/PayDetail',
                }
            },

            { //公式配置
                path: '/Formula',
                name: 'Formula',
                component: () => import('@/views/Formula'),
                meta: {
                    leftMenu: '/Formula',
                }
            },
            { //角色管理
                path: '/Roles',
                name: 'Roles',
                component: () => import('@/views/Roles'),
                meta: {
                    leftMenu: '/Roles',
                }
            },
            { //权限管理
                path: '/Right',
                name: 'Right',
                component: () => import('@/views/Right'),
                meta: {
                    leftMenu: '/Right',
                }
            },
            { //"字典管理"
                path: '/Dictionary',
                name: 'Dictionary',
                component: () => import('@/views/Dictionary'),
                meta: {
                    leftMenu: '/Dictionary',
                }
            },
            { //文档管理
                path: '/Document',
                name: 'Document',
                component: () => import('@/views/Document'),
                meta: {
                    leftMenu: '/Document',
                }
            },
            { //修改密码
                path: '/Password',
                name: 'Password',
                component: () => import('@/views/Password'),
                meta: {
                    leftMenu: '/Password',
                }
            },

            { //子页面
                path: '/ExamineReportForm',
                name: 'ExamineReportForm',
                component: () => import('@/views/MyDebt/ExamineReportForm'),
                meta: {
                    leftMenu: '/ExamineReportForm',
                }
            },
            { //子页面
                path: '/Investigation',
                name: 'Investigation',
                component: () => import('@/views/MyDebt/Investigation'),
                meta: {
                    leftMenu: '/Investigation',
                }
            },
            { //子页面
                path: '/UnlockApplyForm',
                name: 'UnlockApplyForm',
                component: () => import('@/views/MyDebt/UnlockApplyForm'),
                meta: {
                    leftMenu: '/UnlockApplyForm',
                }
            }, { //子页面
                path: '/CivilMediaForm',
                name: 'CivilMediaForm',
                component: () => import('@/views/MyDebt/CivilMediaForm'),
                meta: {
                    leftMenu: '/CivilMediaForm',
                }
            }, { //子页面
                path: '/PledgedContract',
                name: 'PledgedContract',
                component: () => import('@/views/MyDebt/PledgedContract'),
                meta: {
                    leftMenu: '/PledgedContract',
                }
            }, { //子页面
                path: '/ReportPayment',
                name: 'ReportPayment',
                component: () => import('@/views/currency/ReportPayment'),
                meta: {
                    leftMenu: '/ReportPayment',
                }
            }, { //子页面
                path: '/UnlockPayment',
                name: 'UnlockPayment',
                component: () => import('@/views/currency/UnlockPayment'),
                meta: {
                    leftMenu: '/UnlockPayment',
                }
            }, { //我的审批
                path: '/myapproval',
                name: 'MyApproval',
                component: () => import('@/views/myapproval'),
                children: [{ //录入信息
                        path: '/ReportInfo',
                        name: 'ReportInfo',
                        component: () => import('@/views/myapproval/ReportInfo'),
                        meta: {
                            leftMenu: '/ReportInfo',
                        }
                    },
                    { // 新增录入
                        path: '/AddReportForm',
                        name: 'AddReportForm',
                        component: () => import('@/views/MyDebt/AddReportForm'),
                        meta: {
                            leftMenu: '/ReportInfo',
                        }
                    },
                    { //调解信息
                        path: '/CivilMedia',
                        name: 'CivilMedia',
                        component: () => import('@/views/myapproval/CivilMedia'),
                        meta: {
                            leftMenu: '/CivilMedia',
                        }
                    },
                    { //债权处理
                        path: '/UnlockApply',
                        name: 'UnlockApply',
                        component: () => import('@/views/myapproval/UnlockApply'),
                        meta: {
                            leftMenu: '/UnlockApply',
                        }
                    },
                    { //支付凭证
                        path: '/PaymentVoucher',
                        name: 'PaymentVoucher',
                        component: () => import('@/views/myapproval/PaymentVoucher'),
                        meta: {
                            leftMenu: '/PaymentVoucher',
                        }
                    },
                    { // 报备凭证审批
                        path: '/ReportVoucherApprove',
                        name: 'ReportVoucherApprove',
                        component: () => import('@/views/currency/ReportVoucherApprove'),
                        meta: {
                            leftMenu: '/myapproval',
                        }
                    },
                    { // 调解审批
                        path: '/MediaApprove',
                        name: 'MediaApprove',
                        component: () => import('@/views/currency/MediaApprove'),
                        meta: {
                            leftMenu: '/myapproval',
                        }
                    },
                    { // 调查报告审批
                        path: '/ExamineReportFormApprove',
                        name: 'ExamineReportFormApprove',
                        component: () => import('@/views/currency/ExamineReportFormApprove'),
                        meta: {
                            leftMenu: '/ReportInfo',
                        }
                    }, { // 解债审批
                        path: '/UnlockApplyApprove',
                        name: 'UnlockApplyApprove',
                        component: () => import('@/views/currency/UnlockApplyApprove'),
                        meta: {
                            leftMenu: '/myapproval',
                        }
                    }, { // 解债缴费审批
                        path: '/UnlockPaymentApprove',
                        name: 'UnlockPaymentApprove',
                        component: () => import('@/views/currency/UnlockPaymentApprove'),
                        meta: {
                            leftMenu: '/myapproval',
                        }
                    },
                    { // 重新编辑报备页面
                        path: '/EditReport',
                        name: 'EditReport',
                        component: () => import('@/views/currency/EditReport'),
                        meta: {
                            leftMenu: '/ReportInfo',
                        }
                    },
                ]
            },

            { //"辅助债务信息
                path: '/DebtDownload',
                name: 'DebtDownload',
                component: () => import('@/views/DebtDownload'),
                meta: {
                    leftMenu: '/DebtDownload',
                }
            }, { //辅助财务信息
                path: '/FinanceDownload',
                name: 'FinanceDownload',
                component: () => import('@/views/FinanceDownload'),
                meta: {
                    leftMenu: '/FinanceDownload',
                }
            }, { //子页面
                path: '/ReportApprove',
                name: 'ReportApprove',
                component: () => import('@/views/currency/ReportApprove'),
                meta: {
                    leftMenu: '/ReportApprove',
                }
            },



        ]
    }
]

const router = new VueRouter({
    routes
})

// router.beforeEach((to, from, next) => {
//     // to 表示将要访问的路径
//     // from 表示由哪个路径跳转而来
//     // next 表示一个函数,表示放行, next('/login'),表示强制跳转的路径
//     // 1. 如果访问登录页面 直接放行
//     if (to.path === '/login') {
//         window.sessionStorage.setItem('token', 'Basic Y2xpZW50OjEyMzQ1Ng==')
//         return next()
//     }
//     // 2. 获取token
//     const tokenStr = window.sessionStorage.getItem('token')
//     // 3. 如果没有token,跳转到登录页面
//     if (!tokenStr) return next('/login')
//     next()
// })

export default router
