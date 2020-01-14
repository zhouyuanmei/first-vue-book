<template>
    <div class="reset-margin">
        <ul>
            <li v-for="(book,index) in bookList" :key="index">
                <router-link v-bind="{to:'/book/bookInfo/'+id+'/'+index}">
                    <div class="banner">
                        <img :src="book.img" alt="" @error='imgError(book.img)'>
                        <span class="book-name">{{book.title}}</span>
                    </div>
                    <div class="desc">
                        <p>
                            <span style="font-size:10px;">分类</span>
                            <span class="red">{{book.catalog}}</span>
                        </p>
                        <p>
                            <span style="font-size:12px;">阅读量:</span>
                            <span class="amount">{{book.reading}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    created(){
        this.getBook();
    },
    methods:{
        getBook(){
            var url = 'http://apis.juhe.cn/goodbook/catalog?key=8cc39789ec7434b69796a7f61f81d089';
            //var url="http://apis.juhe.cn/goodbook/catalog?key=935c395121c3dbdfe92b08d1ffaf1438";
            var url1 = 'http://apis.juhe.cn/goodbook/query?key=8cc39789ec7434b69796a7f61f81d089';
            //var url1="http://apis.juhe.cn/goodbook/query?key=935c395121c3dbdfe92b08d1ffaf1438";

            this.$http.jsonp(url).then(function(res){
                //console.log(res.body.result[0].id);
                for(var o of res.body.result){
                    //console.log(o.id);
                    this.idList.push(o.id);
                };
                //console.log(this.idList);
                var params={
                    catalog_id:this.idList[Math.floor(Math.random()*this.idList.length)],
                    pn:0,
                    rn:12
                };
                this.id=params.catalog_id;
                this.$http.jsonp(url1,{
                    params:params
                }).then(function(res){
                    //console.log(res.body.result);
                    this.bookList=res.body.result.data;
                    //console.log(this.bookList);
                })
            })
        },
        imgError(src){
            //console.log('图片加载错误');
            for(var o of this.bookList){
                if(o.img==src){
                    o.img=this.bookSrc;
                }
            }
        }
    },
    data(){
        return {
            idList:[],
            bookList:[],
            bookSrc:'https://img.alicdn.com/imgextra/i4/99494115/O1CN01uSVdvm1gGiNzY6h3T_!!0-saturn_solar.jpg_240x240xz.jpg_.webp',
            id:''
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

    ul {
        border:1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        width: 95%;
        margin:50px 10px 10px;
    }

    li{
        width:50%;
        height: 260px;
        float: left;
        border:1px solid #ccc;
        box-shadow: 0 0 5px rgba(0,0,0,.5);
        padding:0px 10px 0;
        position: relative;
    }
    .banner {
        height: 200px;
        width: 100%;
        text-align: center;
    }
    .book-name{
        font-size: 12px;
        color: darkred;
        display: block;
        height: 20.8px;
        overflow: hidden;
    }
    img{
        height: 160px;
        width: 85%;
        margin-top: 10px;
    }
    .desc{
        height: 60px;
        background-color: rgb(152, 195, 236,0.5);
        width: 100%;
        position: absolute;
        left:0;
        bottom:0;
        padding:10px;
    }
    p{
        margin:0;
        padding:0;
    }
    .red{
        color:darkred;
        font-size:12px;
    }
    .amount{
        float:right;
        font-size: 12px;
    }
</style>