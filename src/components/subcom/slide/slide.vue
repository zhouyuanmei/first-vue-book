<template>
    <div>
        <mt-swipe :auto="2500">
            <mt-swipe-item v-for="(imgObj,index) in imgs" :key='index'>
                <img :src="imgObj.imgsrc" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props:['imgs']
}
</script>

<style scoped>
     .mint-swipe{
        height: 240px;
        background-color: red;
    }

    img{
        height: auto;
        width: 100%;
    }
</style>