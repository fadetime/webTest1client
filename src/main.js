// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import ImgUrlHeader from './filters/imgUrlHeader'
import "../node_modules/materialize-css/dist/css/materialize.min.css"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(infiniteScroll)
Vue.config.productionTip = false

Vue.filter('date', DateFilter)
Vue.filter('imgUrlHeader', ImgUrlHeader)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
