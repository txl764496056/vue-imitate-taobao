<template>
    <div class="input-item">
        <slot name="left"></slot>
        <div class="input">
            <input 
            :class="{'cursor-color':cursorColor&&value==''}"
            :value='value' 
            v-on="inputListeners"
            v-bind="$attrs"/>
            <i 
            v-if="isShow&&clearIcon&&value!=''" 
            @click="clear" 
            :class="{'bg':clearBg}"
            class="clear iconfont icon-cha"></i>
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
            // 是否显示清除按钮
            clearIcon:{
                type:Boolean,
                default:false
            },
            // 是否一直显示清除按钮
            clearShow:{
                type:Boolean,
                default:false
            },
            clearBg:{
                type:Boolean,
                default:false
            },
            cursorColor:{
                type:Boolean,
                default:false
            }
        },
        data(){
            return {
                isShow:false,
                inputStyle:{
                    'text-shadow':'0 0 0 '+this.cursorColor,
                    '-webkit-text-fill-color':'transparent'
                }
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
                    },
                    focus:function(){
                        vm.isShow = true;
                    },
                    blur:function(){
                        setTimeout(function(){
                          vm.isShow = vm.clearShow ? true:false;  
                        },50)
                    }
                })
            }
        },
        methods:{
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
            &.bg{
                $size:vm(36);
                width:$size;
                height:$size;
                display:flex;
                justify-content: center;
                align-items:center;
                background-color:rgba(0,0,0,0.2);
                color:#fff;
                font-size:vm(25);
                border-radius:50%;
            }
        }
    }
    input{
        width:vm(200);
        height:100%;
        flex:1;
        border:none;
        font-size:vm(32);
        background-color:transparent;
        color:$txt-black;
        &.cursor-color{
            color:$theme-color;
        }
        &:disabled{
            color:$txt-gray2;
        }
    }
}
</style>