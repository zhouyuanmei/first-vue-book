<template>
    <div>
        <div class="wp">
            <div class="post-comment">
                <h3>提交评论</h3>
                <textarea v-model="text" placeholder="请输入评论内容"></textarea>
                <mt-button @click="post" type="primary" size="large">提交</mt-button>
            </div>
            <div class="comment-list">
                <h3>评论列表</h3>
                <div class="comment-info" v-for="(commentObj,index) in commentList" :key="index">
                    <div class="title">
                        <span>{{index+1}}楼</span>
                        <span class="time">{{commentObj.add_time}}</span>
                    </div>
                    <ul class="mui-table-view">
                        <li class="mui-table-view-cell">{{commentObj.content}}</li>
                    </ul>
                </div>
            </div>
            <div class="more">
                <mt-button  :disabled="status" @click="more" type="danger" size="large">more...</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui';

export default {
    props:['id'],
    created(){
        this.getComment(this.index);
    },
    data(){
        return {
            text:'',
            index: 0,
            commentList:[],
            status:false,
            bookId:this.$route.params.id+this.$route.params.index
        }
    },
    methods:{
        post(){
            var url="http://localhost:88/Lv16day9/server/commentAdd.php";
            
            if(this.status){
                return;
            }

            this.$http.get(url,{
                params:{
                    query_index:this.id || this.bookId,
                    content:this.text
                }
            }).then(function(res){
                //console.log(res.body);
                if(res.body.success){
                    Toast("添加成功");
                    this.commentList.unshift({
                            content:this.text,
                            add_time:new Date()
                        });
                    this.text='';
                    this.getComment();
                }
            },function(err){
                console.log(err);
            });
        },
        getComment(index){
            var url='http://localhost:88/Lv16day9/server/commentList.php';

            index = index || 0;
            this.$http.get(url,{
                params:{
                    query:this.id || this.bookId,
                    page:index
                }
            }).then(function(res){
                //this.commentList=res.body.data;
                if(this.commentList.length >= res.body.total){
                    Toast("到底啦");
                    this.status=true;
                }

                if(index>0){
                    this.commentList=this.commentList.concat(res.body.data);
                }else{
                    this.commentList=res.body.data;
                    this.status=false;
                }
            });
        },
        more(){
            this.index++;
            this.getComment(this.index);
        }
    }
}
</script>

<style scoped>
    .wp{
        padding:15px;
    }
    textarea{
        margin-bottom: 5px;
    }
    .post-comment{
        margin-bottom: 20px;
    }
    h3{
        border-bottom: 1px solid #bbb;
        padding-bottom: 10px;
        margin-bottom: 10px;
    }
    .title{
        padding:10px 15px 10px;
        color:#6d6d72;
        font-size:15px;
        background-color: #efeff4;
    }
    .time{
        color:rgb(196, 92, 92);
        margin-left:20px;
        font-weight: bold;
    }
</style>