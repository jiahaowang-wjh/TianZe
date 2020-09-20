import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userMenuTree: [],
        userMenu: [],
        userInfo: {
            id: ''
        },
        receiveMoney: {
            userName: '开户名：山东盛世天泽公关顾问有限公司',
            cardNum: '收款卡号：810101201421046328',
            openAddr: '开户行：日照银行股份有限公司银海支行'
        }
    },
    mutations: mutations,
    actions: actions,
    modules: {}
})
