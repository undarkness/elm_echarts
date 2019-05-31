import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Echarts from 'echarts'
// import myCharts from './utils/myCharts.js'
import App from './App.vue'

// import store from './vuex/store'
import router from './router/router'
// import Mock from './mock'


Vue.config.productionTip = false;
Vue.prototype.echarts = Echarts;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
// Vue.use(myCharts);/

new Vue({
  el: '#app',
	router,
	// store,
  render: h => h(App)
})
