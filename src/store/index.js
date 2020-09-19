import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userMenuTree:[],
        userMenu:[],
        userInfo:{
            id:''
        }
    },
    mutations: mutations,
    actions: actions,
    modules: {
    }
})
