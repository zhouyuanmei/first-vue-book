<template>
    <div class="reset-margin">
        <div class="wp">
            <h4>{{book.title}}</h4>
            <div class="bookImg">
                <img :src=book.img alt="">
            </div>
            <div>
                <p>{{book.sub2}}</p>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    data(){
        return {
            book:{},
            params:this.$route.params
        }
    },
    created(){
        this.getInfo();
    },
    methods:{
        getInfo(){
            //var url="http://apis.juhe.cn/goodbook/query?key=935c395121c3dbdfe92b08d1ffaf1438";
            var url = 'http://apis.juhe.cn/goodbook/query?key=8cc39789ec7434b69796a7f61f81d089';
            var params={
                catalog_id:this.params.id,
                pn:this.params.index,
                rn:1
            };

            this.$http.jsonp(url,{
                params:params
            }).then(function(res){
                //console.log(res.body);
                this.book=res.body.result.data[0];
            });
        }
    }
}
</script>

<style scoped>
    .wp{
        padding:10px;
    }
    h4{
        padding:0 5px 10px;
        text-align: center;
        color: rgb(55, 163, 199);
        border-bottom: 1px solid #aaa;
    }
    .bookImg{
        width: 350px;
        height: 220px;
        text-align: center;
        margin: 20px 0;
    }
    .bookImg>img{
        width: auto;
        height: 220px;
    }
    p{
        text-indent: 30px;
        padding:0 8px;
    }
</style>