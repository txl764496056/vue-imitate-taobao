<template>
    <div class="authority-list">
        <back>
            <template #back-title>系统权限</template>
        </back>
        <p>为您提供更好的用户体验，淘宝在特定场景可能需要向您申请一下手机系统权限</p>
        <list class="au-item" :list="list"></list>
    </div>
</template>

<script>
import List from "@/components/List.vue";
    export default {
        name:'Authority',
        components:{
            List
        },
        data(){
            return {
                list:[
                    {
                        title:'允许访问通讯录权限',
                        content:'方便您取用您的联系人信息',
                        tips:'已允许'
                    },
                    {
                        title:'允许访问相册权限',
                        content:'帮助您实现图片和文件的保存和读取',
                        tips:'已允许'
                    },
                    {
                        title:'允许访问相机权限',
                        content:'进行扫码、拍摄，用于登录、直接拍摄上传图片等',
                        tips:'已允许'
                    }
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.authority-list{
    p{
        color:$txt-gray2;
        font-size:vm(28);
        padding:$pd25;
    }
}

</style>