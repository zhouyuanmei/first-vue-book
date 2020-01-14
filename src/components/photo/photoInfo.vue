<template>
    <div class="reset-margin">
        <div class="title">
            <h4>图片详情</h4>
            <p>
                <span>{{descObj.time}}</span>
                <span>新闻类型:{{descObj.name}}</span>
            </p>
        </div>
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(pic,index) in list" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                   <img :src="pic.middle" alt="">
                </li>
            </ul> 
		</div>
        <div class="title abstract">
            <h4>图片摘要</h4>
            <p>{{descObj.abstract}}</p>
        </div>
        <comment></comment>
    </div>
</template>

<script>
import comment from '../subcom/comment/comment.vue';
export default {
    data(){
        return {
            params:{},
            descObj:{},
            list:[]
        }
    },
    created(){
        this.getPicInfo();
    },
    components:{
        comment:comment
    },
    methods:{
        getPicInfo(){
            var url="http://route.showapi.com/852-2";
            var params;

            this.params=this.$route.params;

            //console.log(this.params.index);
            params={
                showapi_appid:'122969',
                showapi_sign:'53c3110b85a3466fabde2258e4240af4',
                type:this.params.id
            };

            this.$http.get(url,{
                params:params
            }).then(function(res){
                //console.log(res.body.showapi_res_body.pagebean.contentlist);
                this.descObj = {
                    abstract: res.body.showapi_res_body.pagebean.contentlist[this.params.index].title,
                    name: res.body.showapi_res_body.pagebean.contentlist[this.params.index].typeName,
                    time: res.body.showapi_res_body.pagebean.contentlist[this.params.index].ct
                };

                this.list = res.body.showapi_res_body.pagebean.contentlist[this.params.index].list;

               // console.log(this.list);


                for (var o of this.list) {
                    o.middle = 'https://images.weserv.nl/?url=' + o.middle.substr(6);
                }
            })
        }
    }
}
</script>

<style scoped>
    .title{
        padding:15px 15px 0px;
    }

    .title>h4{
        color: skyblue;
    }

    .title>p{
        color: #bbb;
        border-bottom: 1px solid #bbb;
        padding-bottom: 10px;
    }

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        border:none;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border:none;
    }
    .abstract>h4{
        color: pink;
    }
    .abstract>p{
        color: #000;
    }
    .comment {
        padding: 0 20px 0;
    }
    
    .mui-content>.mui-table-view:first-child {
        padding-right: 10px;
        margin:0;
    }
    
    img {
        width: 100px;
        height: 100px;
    }
    .abstract{
        padding:0px 15px 0px;
    }
</style>