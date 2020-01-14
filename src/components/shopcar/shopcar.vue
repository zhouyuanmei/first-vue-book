<template>
    <div class="reset-margin">
        <div class="book-wp" v-for="(book,index) in list" :key="index">
            <mt-switch class="switch" v-model='value[index]'></mt-switch>
            <div class="img-wp">
                <img :src="book.img" alt="">
            </div>
            <div class="goods-info">
                <h4>{{book.sub1}}</h4>
                <div class="price-wp">
                    <div class="price">{{book.price}}</div>
                    <amount :count="book.num" :flag="book.flag" @num="getBook"></amount>
                    <div @click="delBook(index,book.flag)" class="delete">删除</div>
                </div>
            </div>
        </div>
        <div class="total-price">
            <div class="price-desc">
                <div class="total">总计(不含运费)</div>
                <div class="price-amount">已勾选商品<span>{{getAmount}}</span>件 总价 ￥<span>{{totalPrice}}</span>元</div>
            </div>
            <div class="price-btn">
                <mt-button type="danger" size="small">去结算</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import {getItem,getObj,update,removeItem} from '../../kits/local.js';
import amount from '../subcom/amount/amount.vue';
export default {
    components:{
        amount:amount
    },
    computed:{
        getAmount(){
            var newArr=this.value.filter(item => item);
            var totalPrice=0;
            this.value.forEach((item,index)=>{
                var num=this.list[index].num;
                var price=this.list[index].price.substr(this.list[index].price.indexOf(' ')+1);
                //console.log(num,price);
                if(item){
                    totalPrice+=num*price;
                }
            });
            this.totalPrice=totalPrice;
            return newArr.length;
        }
    },
    created(){
        this.getGoods();
    },
    data(){
        return {
            dataList:getItem(),
            value:[],
            obj:getObj(),
            list:[],
            totalPrice:0
        }
    },
    methods:{
        getGoods(){
            //console.log(getObj());
            var url = 'http://apis.juhe.cn/goodbook/query?key=7ba0167f5416e26ea119177ef5dceb0e';
            //var url="http://apis.juhe.cn/goodbook/query?key=935c395121c3dbdfe92b08d1ffaf1438";
            for(let o in this.obj){
                this.$http.jsonp(url,{
                    params:{
                        catalog_id:o.substr(0,o.length-1),
                        pn:o.substr(3),
                        rn:1
                    }
                }).then(function(res){
                    //console.log(res.body.result.data[0]);
                    res.body.result.data[0].price='￥ '+Math.floor(Math.random()*100+50);
                    res.body.result.data[0].num=this.obj[o];
                    res.body.result.data[0].flag=o;
                    this.list.push(res.body.result.data[0]);
                });
            }
        },
        getBook(obj){   
            update(obj);
            for(var i=0;i<this.list.length;i++){
                if(this.list[i].flag==obj.goodsId){
                    if(obj.type=='add'){
                        this.list[i].num+=1;
                        break;
                    }else{
                        this.list[i].num-=1;
                        break;
                    }
                }
            }
        },
        delBook(index,flag){
            //删除list里面的对应项
            this.list.splice(index,1);
            //选中状态按钮删除对应项
            this.value.splice(index,1);
            //删除localstorage里面的对应项
            removeItem(flag);
        }
    }
}
</script>

<style scoped>
    .book-wp{
        padding:5px;
        border-bottom: 1px solid #ccc;
        display: flex;
        align-items: center;
    }
    .img-wp{
        flex:0 0 90px;
        padding:5px 5px;
        margin-left:10px;
    }

    img{
        height: 116px;
        width:90px;   
    }
    h4{
        color:skyblue;
        font-size:14px;
        margin:0;
        margin-top:10px;
        padding: 0;
        line-height: 1.5;
    }
    .goods-info{
        font-size:14px;
        flex:1;
        text-align: center;
    }

    .switch{
        flex:0 0 52px;
    }

    .price-wp{
        margin-top:30px;
        display: flex;
        text-align: center;
        padding:0 10px;
    }
    .price-wp>div{
        margin-right: 5px;
    }
    .price{
        color:red;
    }
    .delete{
        color:chocolate;
    }

    .total-price{
        height: 100px;
        width: 375px;
        background-color: #ccc;
        padding:20px 30px 20px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        bottom: 50px;
    }
    .price-desc>.total{
        margin-bottom: 10px;
    }
    .price-desc>.price-amount>span{
        color: rgb(155, 56, 56);
        font-weight: bold;
    }
</style>