<template>
    <div class="reset-margin">
        <div class="wp">
            <div class="banner">
                <slide :imgs=imgList></slide>
            </div>
            <div class="cart">
                <h4>{{bookObj.title}}</h4>
                <div>
                    <p class="price">
                        <s class="prev">市场价:￥150.00</s>
                        <span class="current">销售价:￥128.00</span>
                    </p>
                    <p class="amount">
                        <span class="buy">购买数量:</span>
                        <bookCount @count="getCount"></bookCount>
                        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                            <i v-show="isShow" class="ball"></i>
                        </transition>
                    </p>
                    <p class="btn">
                        <mt-button class="buyBtn" type="danger" size="small">立刻购买</mt-button>
                        <mt-button @click="addCart" class="addBtn" type="primary" size="small">加入购物车</mt-button>
                    </p>
                    
                </div>
            </div>
            <div class="book-desc">
                <h4 style="color:red;">详细介绍:</h4>
                <ul>
                    <li>
                        <span>图书摘要：</span>
                        <span>{{bookObj.sub1}}</span>
                    </li>
                    <li>
                        <span>出版日期：</span>
                        <span>{{bookObj.bytime}}</span>
                    </li>
                    <li>
                        <span>阅读量：</span>
                        <span>{{bookObj.reading}}</span>
                    </li>
                </ul>
            </div>
            <router-link v-bind="{to:'/book/bookDesc/'+params.id+'/'+params.index}">
                <mt-button type="danger" size="large" style="margin:15px 0 10px;">图文介绍</mt-button>
            </router-link>
            <router-link v-bind="{to:'/book/bookComment/'+params.id+'/'+params.index}">
                <mt-button type="primary" size="large">商品评论</mt-button>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import slide from '../subcom/slide/slide.vue';
import bookCount from '../subcom/bookCount/bookCount.vue';
import {vm,CONSTR} from '../../kits/getCount.js';
import {setItem,obj} from '../../kits/local.js';

export default {
    components:{
        slide:slide,
        bookCount:bookCount
    },
    data(){
        return {
            params:this.$route.params, //父级组件传到子组件的数据 url传递
            imgList:[],
            bookObj:{},
            num:0,
            isShow:false
        }
    },
    created(){
        this.getBooks();
    },
    methods:{
        getBooks(){
             //var url="http://apis.juhe.cn/goodbook/query?key=935c395121c3dbdfe92b08d1ffaf1438";
             var url = 'http://apis.juhe.cn/goodbook/query?key=8cc39789ec7434b69796a7f61f81d089';
             var url1='http://localhost:88/Lv16day9/server/bookImgList.php';
             var params={
                catalog_id:this.params.id,
                pn:this.params.index,
                rn:1
            };
        
            this.$http.jsonp(url,{
                params:params
            }).then(function(res){
                this.imgList.push({
                    imgsrc:res.body.result.data[0].img
                });

                this.bookObj=res.body.result.data[0];
                //console.log(this.bookObj);

                this.$http.get(url1).then(function(res){
                    this.imgList=this.imgList.concat(res.body.data);
                });
                //console.log(this.imgList);
            });

            
        },
        addCart(){
            //console.log(1);
            vm.$emit(CONSTR,this.num);
            this.isShow=!this.isShow;//动画显示或隐藏
            obj.id=this.params.id;
            obj.index=this.params.index;
            obj.num=this.num;//使组件传递过来的值重新赋值
            //console.log(obj);
            setItem(obj);

        },
        getCount(num){
            this.num=num;
        },
        beforeEnter(el){
            //console.log(el);
            el.style.transform='translate(0px,0px)';
        },
        enter(el,done){
            el.offsetWidth;
            el.style.transform='translate(90px,250px)';
            done();
        },
        afterEnter(){
            this.isShow=!this.isShow;
        }
    }
}
</script>

<style scoped>
    ul,li{
        margin:0;
        padding:0;
        list-style: none;
        font-size:14px;
        margin:10px;
        color:#aaa;
    }
    .wp{
        padding:10px;
    }
    .wp>div{
        border:1px solid #ccc;
        border-radius: 5px;
        /* overflow: hidden; */
        margin-bottom: 10px;
    }
    .wp>div:nth-child(2),.wp>div:nth-child(3){
        padding:10px 5px;
    }
    h4{
        color:deepskyblue;
        border-bottom: 1px solid brown;
        padding-bottom: 10px;
    }
    .btn{
        text-align: center;
    }
    .buyBtn,.addBtn{
        width:110px;
    }
    .buyBtn{
        margin-right: 20px;
    }
    .buy{
        margin-right: 20px;
    }
    .amount:after{
        content:'';
        display: block;
        clear:both;
    }
    .amount{
        height: 60px;
        line-height: 60px;
        position: relative;
    }
    .ball{
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        left:50%;
        margin-left:-30px;
        margin-top: -10px;
        top: 50%;
        transition:all 0.5s ease;
    }
</style>