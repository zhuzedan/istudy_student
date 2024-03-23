import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'axios-vue';
import * as echarts from 'echarts';
import '@/theme/font.less' // 引入思源字体

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.prototype.$echarts = echarts

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
