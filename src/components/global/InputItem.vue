<template>
    <div class="input-item">
        <slot name="left"></slot>
        <div class="input">
            <input 
            :class="{'focus-color':value!=''}"
            :value='value' 
            v-on="inputListeners"
            v-bind="$attrs"/>
            <i v-if="clearShow" @click="clear" class="clear iconfont icon-cha"></i>
        </div>
        <slot name="right"></slot>
    </div>
</template>

<script>
    export default {
        name:'InputItem',
        inheritAttrs:false,
        model:{
            prop:['value'],
            event:'input'
        },
        props:{
            value:{
                type:[String,Number],
                default:''
            },
            clearShow:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
            }
        },
        computed:{
            inputListeners:function(){
                var vm = this;
                return Object.assign({},
                this.$listeners,
                {
                    // 覆写监听器
                    input:function(evt){
                        vm.$emit('input',evt.target.value);
                    }
                })
            }
        },
        methods:{
            handleInput(evt){
                this.$emit('input',evt.target.value);
            },
            clear(){
                this.$emit('input','');
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../../css/base.scss';
.input-item{
    display:flex;
    border-bottom:1px solid $theme-color;
    height:vm(70);
    align-items:center;
    .input{
        flex:1;
        position:relative;
        display:flex;
        align-items:center;
        height:100%;
        .clear{
            display:flex;
            justify-content: flex-end;
            align-items:center;
            flex-shrink:0;
            color:$txt-gray1;
        }
    }
    input{
        width:vm(200);
        height:100%;
        flex:1;
        border:none;
        font-size:vm(34);
        &:focus{
            color:$theme-color;
        }
        &.focus-color{
            text-shadow:0 0 0 $txt-black;
            -webkit-text-fill-color:transparent;
        }
    }
}
</style>