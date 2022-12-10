import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式
import '@/styles/index.less'
import Vant from 'vant'
import 'vant/lib/index.css'
// 注意less文件一定放在css文件的下面，样式才可以生效
import 'vant/lib/index.less'
// 引入时间全局过滤器
import '@/utils/dayjs'
// 引入接口
import api from '@/api'

Vue.prototype.$api = api
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
