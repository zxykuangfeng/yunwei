import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import 'vxe-table/lib/style.css'
import VXETable from 'vxe-table'
import VCalendar from 'v-calendar';
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Antd)
Vue.use(VXETable)
Vue.use(VCalendar)
new Vue({
  router, // 挂载路由
  render: h => h(App),
}).$mount('#app')
