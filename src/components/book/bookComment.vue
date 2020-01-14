<template>
    <div class="reset-margin">
        <div class="wp">
            <comment></comment>
        </div>
    </div>
</template>

<script>
import comment from '../subcom/comment/comment.vue';
export default {
    components:{
        comment:comment
    }
}
</script>

<style scoped>
    .wp{
        padding:0 15px 0;
    }
</style>