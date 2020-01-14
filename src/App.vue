<template>
    <div>
        <!-- 头部文件 来自mint-->
        <mt-header fixed title="创客学院商城"></mt-header>
		<div v-if="isShow" @click="back" class="return">返回</div>
        <!-- 页面切换 -->
        <router-view></router-view>

        <!-- 页脚文件 来自于mui的tabbar-->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/book/bookList">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">商品</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar">
				<span class="mui-icon mui-icon-contact"><span id="span" class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/news">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
    </div>
</template>

<script>
import {vm,CONSTR} from './kits/getCount.js';

vm.$on(CONSTR,function(num){
	//console.log(num);
	document.querySelector('#span').innerHTML=parseInt(document.querySelector('#span').innerHTML)+num;
});

export default {
	watch:{
		'$route'(newRouter,oldRouter){
			if(newRouter.path=='/home'){
				this.isShow=false;
			}else{
				this.isShow=true;
			}
		}
	},
    methods:{
		back(){
			this.$router.go(-1);
		}
	},
	data(){
		return {
			isShow:false
		}
	}
}
</script>

<style scoped>
    .return{
		position: fixed;
		color: pink;
		top:10px;
		left: 10px;
		z-index: 99;
	}
</style>