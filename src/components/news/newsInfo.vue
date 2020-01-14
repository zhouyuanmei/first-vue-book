<template>
    <div class="reset-margin">
        <div class="wp">
            <h3>{{obj.title}}</h3>
            <p class="des">
                <span class="time">{{obj.time | dateFormat('LLLL')}}</span>
                <span class="src">{{obj.src}}</span>
            </p>
            <div class="content" v-html="obj.content">
            </div>
        </div>
        <comment :id="id"></comment>
    </div>
</template>

<script>
import comment from '../subcom/comment/comment.vue';
export default {
    components:{
        comment:comment
    },
    data(){
        return {
            id:'',
            obj:{}
        }
    },
    created(){
        this.getNews();
    },
    methods:{
        getNews:function(){
            var url="https://api.jisuapi.com/news/get";
            this.id=this.$route.params.index;
            //console.log(this.$route);
            this.$http.jsonp(url,{
                params:{
                    channel:'新闻',
                    num:1,
                    start:this.id,
                    appkey:'16437cf56c7e4b79'
                }
            }).then(function(res){
                this.obj=res.body.result.list[0];
                //console.log(this.obj);
            },function(err){
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>
    .wp{
        padding:20px;
    }

    .des{
        padding-bottom: 15px;
        border-bottom: 1px solid #ccc;
        margin-top:10px;
        font-size:16px;
    }

    h3{
        color:royalblue;
    }

    .time{
        color:#8f8f94;
        margin-right: 10px;
    }

    p.content{
        text-indent: 30px;
        color:#000;
    }
</style>