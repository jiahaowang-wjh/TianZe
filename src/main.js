import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/style.scss'
import './assets/js/htmlFontSize.js'
import './assets/js/axios.config.js'
import './assets/js/filters.js';
import "../element-variables.scss";
import {
    getToken,
    loginOut
} from '@/util'
import mixin from '@/mixins';
// router跳转权限控制
const WHITE_LIST = ['/login'];


var isLoadRouter = false;
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        window.sessionStorage.setItem('token', 'Basic Y2xpZW50OjEyMzQ1Ng==')
        // return next()
    }
    if (isLoadRouter) {
        next();
    } else {

        // 判断登录是否有效
        let tokenState = getToken(); //获取token getToken()
        if (tokenState) {
            if (to.path == '/login') {
                next();
            } else {
                let sessionUserInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                // 判断登录数据是否存在

                if (sessionUserInfo.userInfoId) {
                    store.commit('SAVE_USER_INFO', sessionUserInfo);
                    store.dispatch('userMenus').then(() => {
                        next(store.state.userMenuTree[0])
                    })
                } else {

                    loginOut();
                }
            }
        } else {
            if (WHITE_LIST.indexOf(to.path) != -1) {
                next();
            } else {
                next(`/login?redirect=${to.path}`);
            }
        }
    }

});
router.afterEach((to, from) => {
    // 判断当前页面是否存在

    if (!to.name) {
        router.push('/login');
    }
});















// 按需引入echarts
Vue.prototype.$UpdateFile = async function (file) {
    const formData = new FormData()
    formData.append('file', file)
    const {
        data: result
    } = await this.$http({
        method: 'post',
        url: '/api/api/fileUploading/uploading',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    if (result.resultCode !== '200') return this.$message.error('上传失败, 请重试')
    // http://113.204.236.218:8989/
    // http://47.108.135.174:9000/
    const fileBasePath = 'http://113.204.236.218:8989/'; //线上环境
    // const fileBasePath='http://113.204.236.218:8989/';
    // const fileBasePath='http://47.108.135.174:9000/';
    return fileBasePath + result.data.split('/')[3]
}
Vue.mixin(mixin);

new Vue({
    router,
    
    store,
    render: h => h(App)
}).$mount('#app')
