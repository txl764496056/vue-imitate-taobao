<template>
    <div class="buy-num">
        <div class="sub btn" :class="{'light':num>min}" @click="subNum">-</div>
        <input class="num"
         :disabled="numDisabled"
         type="number"
         v-model="num">
        <div class="plus btn" :class="{'light':num<max}" @click="addNum">+</div>
    </div>
</template>

<script>
    export default {
        name:"BuyNum",
        props:{
            value:{
                type:Number,
                default:1
            },
            max:{
                type:Number,
                default:10
            },
            min:{
                type:Number,
                default:1
            },
            isDisabled:{
                type:Boolean,
                default:false
            }
        },
        data() {
            return {
                // num:this.value
            }
        },
        computed:{
            numDisabled(){
                return this.num>=this.max||this.num<=this.min||this.isDisabled;
            },
            num:{
                get(){
                    return this.value;
                },
                set(val){
                    this.$emit('input',val);
                }
            }
        },
        methods: {
            subNum() {
                this.num = (this.num-1)<this.min ? this.min:this.num-1;
            },
            addNum(){
                this.num = (this.num+1)>this.max ? this.max:this.num+1;
            }       
        },
        watch:{
            num(){
                this.$emit('addNumClick',this.num);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.buy-num{
    display:flex;
    $btnSize:50;
    height:vm($btnSize);
    .btn,.num{
        background-color:#eee;
    }
    .btn{
        
        width:vm($btnSize);
        display:flex;
        justify-content: center;
        align-items:center;
        font-size:vm(38);
        color:$txt-gray2;
        font-weight:bold;
        &.light{
            color:$txt-gray1;
        }
    }
    .num{
        margin:0 vm(5);
        width:vm($btnSize+30);
        display:flex;
        justify-content: center;
        align-items:center;
        color:$txt-black;
        font-size:vm(30);
        border:none;
        text-align:center;
        &:disabled{
            color:$txt-gray2;
        }
    }
}
</style>