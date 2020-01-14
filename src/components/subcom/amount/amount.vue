<template>
    <div class="count-wp1">
        <input @click="sub" readonly type="text" value="-">
        <input class="number1" v-model="num" readonly type="text" value="1">
        <input @click="add" readonly type="text" value="+">
    </div>
</template>

<script>
export default {
    props:['count','flag'],
    data(){
        return {
            num:this.count,
            result:{
                type:'add',
                goodsId:0
            }
        }
    },
    methods:{
        sub(){
            this.num = this.num<=1?1:--this.num;
            this.getNum('sub');
        },
        add(){
           this.num++;
           this.getNum('add');
        },
        getNum(type){
            this.result.type=type;
            this.result.goodsId=this.flag;
            this.$emit('num',this.result);
        }
    }
}
</script>

<style scpoed>
    .count-wp1{
        margin:0;
    }
    .count-wp1 input[type="text"]{
        width:22px;
        height: 20px;
        margin:0;
        padding:0;
        text-align: center;
    }
    .count-wp1 input[type="text"].number1{
        width:40px;
    }
</style>