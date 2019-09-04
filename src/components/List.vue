<template>
    <div class="list-container">
        <div
        class="item"
        v-for="(item,index) in list"
        :key="index">
            <div class="left">
                <p>{{item.title}}</p>
                <span v-if="item.content">{{item.content}}</span>
            </div>
            <router-link :to="item.url||''" class="right">
                <div v-if="item.tips" class="tips">
                    <slot name="tips">{{item.tips}}</slot>
                </div>
                <i v-if="item.arrow||true" class="iconfont icon-arrow-r"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name:'List',
        props:{
            list:{
                type:Array,
                default(){
                    return [{
                        content:"",
                        title:"",
                        tips:"",
                        url:"",
                        arrow:true
                    }];
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.list-container{
    background-color:#fff;
    .item{
        $pd:vm(20);
        border-bottom:1px solid $border-color-ee;
        display:flex;
        justify-content: space-between;
        align-items: center;
        padding-top:$pd;
        padding-bottom:$pd;
        &:last-of-type{
            border-bottom:none;
        }
        .left{
            p{
                font-size:vm(34);
                color:$txt-black;
            }
            span{
                font-size:vm(28);
                color:$txt-gray2;
            }
        }
        .right{
            display:flex;
            justify-content: flex-end;
            align-items: center;
            .tips{
                color:$txt-gray2;
                font-size:vm(28);
                margin-right:vm(5);
            }
            i{
                color:$txt-gray2;
            }
        }
    }
}
</style>