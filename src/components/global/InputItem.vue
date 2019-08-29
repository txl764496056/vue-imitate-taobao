<template>
    <div class="input-item">
        <slot name="left"></slot>
        <input 
        :class="{'focus-color':value!=''}"
        :value='value' 
        v-on="inputListeners"
        v-bind="$attrs"/>
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
            // handleFocus(){
            // },
            // handleBlur(){
            // }
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
    input{
        width:vm(200);
        flex:1;
        padding:0 vm(15);
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