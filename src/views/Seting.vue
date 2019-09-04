<template>
    <div>
        <back>
            <template #back-title>设置</template>
        </back>
        <div class="set-unit" v-for="(value,key) in list" :key="key">
            <div v-if="key=='address'" class="user-msg">
                <img :src="userMsg.photo" alt="" class="photo">
                <router-link class="nick-name" to="/nickname">{{userMsg.nickname}}</router-link>
            </div>
            <list 
            class="set-item"
            :class="{'set-list':key!='address'}" 
            :list="value" 
            ></list>
        </div>
    </div>
</template>

<script>
import List from '@/components/List.vue'
    export default {
        name:'Setting',
        components:{
            List
        },
        data(){
            return {
                userMsg:{},
                list:{
                    address:[{
                        title:"我的收获地址",
                    }],
                    authority:[{
                        title:"系统权限",
                        url:'/authority'
                    }]
                }
            }
        },
        mounted(){
            this.getUserMsg();
        },
        methods:{
            getUserMsg(){
                let _this = this;
                this.axios.get('/seting',{
                    params:{userKey:_this.$global.userKey}
                }).then(res=>{
                    _this.userMsg = res.data;
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.set-list,.user-msg{
    margin-top:vm(20);
}
.user-msg{
    margin-left:vm(25);
}
.user-msg{
    background-color:#fff;
    $size:vm(100);
    display:flex;
    align-items:center;
    border-bottom:1px solid $border-color-ee;
    padding: vm(25) {
        left:0;
    };
    .nick-name{
        font-size:vm(34);
        color:$txt-black;
        margin-left:vm(20);
    }
    .photo{
        width:$size;
        height:$size;
        border-radius:50%;
    }
}
.set-unit{
    background-color:#fff;
}
</style>