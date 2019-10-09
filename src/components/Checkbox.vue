<template>
    <div class="checkbox">
        <span class="input" 
          :class="{'checked':isSelected}"></span>
        <input type="checkbox"
         :value="label" 
         :checked="checked" 
         v-model="isChecked"
         v-bind="$attrs"/>
        <template v-if="showLabel">{{label}}</template>
    </div>
</template>

<script>
    export default {
        name:"Checkbox",
        inheritAttrs:false,
        model:{
            prop:['checked'],
            event:'change'
        },
        props:{
            label:{
                type:[String,Number],
                default:""
            },
            checked:{
                type:Array,
                default(){
                    return []
                }
            },
            showLabel:{
                type:Boolean,
                default:true
            },
        },
        computed: {
            isChecked: {
                get(){
                    return this.checked;
                },
                set(val){
                    this.$emit('change',val);
                }
            },
            isSelected(){
                let result = false;
                for(let i=0;i<this.isChecked.length;i++){
                    if(this.isChecked[i]===this.label){
                        result = true;
                    }
                }
                return result;
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.checkbox{
    $size:40;
    display:inline-flex;
    justify-content: flex-start;
    align-items: center;
    input,.input{
        width:vm($size);
        height:vm($size);
        display:inline-block;
        border-radius:vm(5);
        border:none;
    }
    .input{
        background-color:#fff;
        text-align: center;
        line-height:vm($size/1.65);
        border:1px solid $border-color-ee;
        &.checked{
            background-color:themeColor(2);
            &::after{
                display:inline-block;
                width:50%;
                content:"";
                height:vm(10);
                border:1px solid transparent{
                    left-color:#fff;
                    bottom-color:#fff;
                };
                transform: rotate(-45deg);
            }
        }
    }
    input{
        opacity: 0;
        margin-left:vm(-$size);
        margin-right:vm(10);
    }
}
</style>