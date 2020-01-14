<template>
    <div class="reset-margin">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(news,index) in newsList" :key="index">
                <router-link v-bind="{to:'/news/newsInfo/'+index}">
                    <img class="mui-media-object mui-pull-left" :src="news.pic">
                    <div class="mui-media-body">
                        <h3>{{news.title}}</h3>
                        <p class='mui-ellipsis'>{{news.src || "本地网"}}</p>
                        <p class="time">{{news.time | dateFormat('LLLL')}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return {
            newsList:[]
        }
    },
    created(){
        this.getNews();
    },
    methods:{
        getNews:function(){
            var url="https://api.jisuapi.com/news/get";
            this.$http.jsonp(url,{
                params:{
                    channel:'新闻',
                    num:20,
                    start:0,
                    appkey:'16437cf56c7e4b79'
                }
            }).then(function(res){
                this.newsList=res.body.result.list;
                //console.log(this.newsList);
            },function(err){
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
.mui-table-view .mui-media-object{
    height: 85px;
    width: 120px;
    max-width: none;
    margin-top:5px;
}

h3{
    font-size: 15px;
    white-space: normal;
    line-height: 1.5;
}

p.time{
    color:skyblue;
    font-weight: bold;
    font-size:13px;
}
</style>