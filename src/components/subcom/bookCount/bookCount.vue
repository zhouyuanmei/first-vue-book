<template>
    <div class="count-wp">
        <input @click="sub" readonly type="text" value="-">
        <input v-model="num" readonly type="text" value="1">
        <input @click="add" readonly type="text" value="+">
    </div>
</template>

<script>
export default {
    data(){
        return {
            num:1
        }
    },
    methods:{
        sub(){
            this.num = this.num<=1?1:--this.num;
            this.getNum();
        },
        add(){
           this.num++;
           this.getNum();
        },
        getNum(){
            this.$emit('count',this.num);
        }
    }
}
</script>

<style scpoed>
    .count-wp input[type="text"]{
        width:40px;
        height: 30px;
        margin:0;
        padding:0;
        text-align: center;
    }
    .count-wp {
        float: right;
        height: 60px;
        padding:0;
        margin-right: 130px;
    }
</style>