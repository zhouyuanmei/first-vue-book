//导入核心vue模块
import Vue from 'vue';

//导入路由
import VueRouter from 'vue-router';
//使用路由
Vue.use(VueRouter);

//导入ajax插件
import vueResource from 'vue-resource';
//使用resource
Vue.use(vueResource);

//导入根组件
import App from './App.vue';

//导入home组件
import home from './components/home.vue';
//导入其他组件
import bookList from './components/book/bookList.vue';
import bookInfo from './components/book/bookInfo.vue';
import bookDesc from './components/book/bookDesc.vue';
import bookComment from './components/book/bookComment.vue';
import newsList from './components/news/newsList.vue';
import newsInfo from './components/news/newsInfo.vue';
import shopcar from './components/shopcar/shopcar.vue';
import photoList from './components/photo/photoList.vue';
import photoInfo from './components/photo/photoInfo.vue';

//定义路由
var router = new VueRouter({
    linkActiveClass: 'mui-active',
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        component: home
    }, {
        path: '/news/newsList',
        component: newsList
    }, {
        path: '/news/newsInfo/:index',
        component: newsInfo
    }, {
        path: '/book/bookList',
        component: bookList
    }, {
        path: '/book/bookInfo/:id/:index',
        component: bookInfo
    }, {
        path: '/book/bookDesc/:id/:index',
        component: bookDesc
    }, {
        path: '/book/bookComment/:id/:index',
        component: bookComment
    }, {
        path: '/shopcar',
        component: shopcar
    }, {
        path: '/photo/photoList',
        component: photoList
    }, {
        path: '/photo/photoInfo/:id/:index',
        component: photoInfo
    }]
});

//头部导入mint-ui样式
import mintUI from 'mint-ui';
import 'mint-ui/lib/style.min.css';
//使用mintUI
Vue.use(mintUI);

//导入mui
import '../static/mui/css/mui.css';

//导入初始化样式
import '../static/css/reset.css';

//导入时间组件
import moment from 'moment';
//全局过滤器
Vue.filter('dateFormat', function(input, string) {
    //console.log(input);
    return moment().format(string);
});
//实例化
var vm = new Vue({
    el: '#app',
    render: create => create(App),
    router
});