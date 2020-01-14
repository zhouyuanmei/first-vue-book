<template>
    <div class="reset-margin">
        <!-- <mt-swipe :auto="2500">
            <mt-swipe-item v-for="(imgObj,index) in imgList" :key='index'>
                <img :src="imgObj.imgsrc" alt="">
            </mt-swipe-item>
        </mt-swipe> -->
        <slide :imgs="imgList"></slide>

        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="news/newsList">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="photo/photoList">
                        <span class="mui-icon mui-icon-email"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="book/bookList">
                        <span class="mui-icon mui-icon-chatbubble"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-location"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-search"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul> 
		</div>

    </div>
</template>

<script>
import slide from '../components/subcom/slide/slide.vue';
export default {
    components:{
        slide:slide
    },
    created:function(){
        this.renderslider();
    },
    methods:{
        renderslider:function(){
            var url='http://localhost:88/Lv16day9/server/ajaxList.php';
            this.$http.get(url).then(function(res){
                //console.log(res.body);
                this.imgList=res.body.data;
                //console.log(this.imgList);
            },function(err){
                console.log(err);
            });
        }
    },
    data(){
        return {
            imgList:[]
        }
    }
}
</script>

<style scoped>
    .mint-swipe{
        height: 240px;
        background-color: red;
    }

    img{
        height: auto;
        width: 100%;
    }

    .mui-content{
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border:none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:none;
    }

    .mui-icon-home:before,
    .mui-icon-email:before,
    .mui-icon-chatbubble:before,
    .mui-icon-location:before,
    .mui-icon-search:before,
    .mui-icon-phone:before{
        content:"";
        height:50px;
        width: 50px;
        display: inline-block;
        background-size:cover;
    }

    .mui-icon-home:before{
        background-image: url("../../static/img/1.png");
    }
    .mui-icon-email:before{
        background-image: url("../../static/img/2.png");
    }
    .mui-icon-chatbubble:before{
        background-image: url("../../static/img/3.png");
    }
    .mui-icon-location:before{
        background-image: url("../../static/img/4.png");
    }
    .mui-icon-search:before{
        background-image: url("../../static/img/5.png");
    }
    .mui-icon-phone:before{
        background-image: url("../../static/img/6.png");
    }

</style>