<template>
    <div class="reset-margin">
        <div class="classify">
            <ul v-bind="{style:'width:'+ulWidth + 'px'}">
                <li @click="getPicDesc(index+1)" v-for="(picName,index) in picList" :key="index">{{picName.name}}</li>
            </ul>
        </div>
        <div class="pic-wp">
            <ul>
                <li v-for="(item,index) in list" :key="index">
                    <router-link v-bind="{to:'/photo/photoInfo/' +item.type + '/' + index }">
                        <img v-lazy="item.list[0].big" src="" alt="">
                        <div class="title">{{item.title}}</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.getPicList();
        this.getPicDesc(1);
    },
    data(){
        return {
            list:[],
            picList:[],
            ulWidth:375
        }
    },
    methods:{
        getPicList(){
            var url="http://route.showapi.com/852-1";
            this.$http.get(url,{
                params:{
                    showapi_appid:'122969',
                    showapi_sign:'53c3110b85a3466fabde2258e4240af4'
                }
            }).then(function(res){
                //console.log(res.body.showapi_res_body.list);
                this.picList=res.body.showapi_res_body.list;
                var w=70;
                var len=this.picList.length;
                this.ulWidth=w*len;
                //console.log(this.picList);
            },function(err){
                console.log(err);
            })

        },
        getPicDesc(index){
            var url="http://route.showapi.com/852-2";
            var params={
                showapi_appid:'122969',
                showapi_sign:'53c3110b85a3466fabde2258e4240af4',
                type:`${index}00${Math.floor(Math.random()*3+1)}`
            };
            this.$http.get(url,{
                params:params
            }).then(function(res){
                //console.log(res.body.showapi_res_body.pagebean.contentlist);
                this.list=res.body.showapi_res_body.pagebean.contentlist;
                //console.log(this.list);
                for(var o of this.list){
                    //console.log(o);
                    o.list[0].big='https://images.weserv.nl/?url='+o.list[0].big.substr(6);
                }
            },function(err){
                console.log(err);
            })
        }
    }
}
</script>


<style scoped>
    ul,li{
        list-style: none;
        margin:0;
        padding:0;
    }
    .classify{
        height: 60px;
        line-height: 60px;
        width: 100%;
        overflow: scroll;
        
    }
    .classify>ul>li{
        float:left;
        width: 70px;
        font-size: 14px;
        color:skyblue;
        text-align: center;
    }
    .pic-wp{
        padding:0 10px 0 10px;
    }
    
    li[data-v-e44b37fe]{
        margin-bottom: 8px;
    }
    img{
        width: 100%;
    }
    .title{
        text-align: center;
        color: #aaa;
        font-size:14px;
    }
</style>