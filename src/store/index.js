import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        reportId: '',
        payId: '',
        debtId: ''
    },
    mutations: {
        AlterReportId: (state, n) => {
            state.reportId = n
        },
        AlterPayId: (state, n) => {
            state.payId = n
        },
        AlterDebtId: (state, n) => {
            state.debtId = n
        }
    },
    actions: {
    },
    modules: {
    }
})
