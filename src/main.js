/*
 * @Date: 2019-06-01 01:15:01
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import echarts from 'echarts'
// import myCharts from './utils/myCharts.js'
import App from './App.vue'

// import store from './vuex/store'
import routes from './router/routes'
import './mock.js'

/* 表单验证组件 */
// import validate, { config } from './public/vee-validate'; //表单验证插件配置
// Vue.use(validate, config);
// Vue.use(VeeValidate)
// Validator.localize('zh_CN', zh)

Vue.config.productionTip = false;
Vue.prototype.$charts = echarts;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
// Vue.use(myCharts);

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
	router,
  // myCharts,
	// store,
  render: h => h(App)
})
