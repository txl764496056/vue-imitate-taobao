export default {
    props:{
        // 停留时间
        time:{
            type:[Number,String],
            default:1000
        },
        // 定位
        position:{
            type:String,
            default:''
        },
        // style样式
        innerStyle:{
            type:String,
            defalut:''
        },
        isShow:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
        }
    },
    render(h){
        if(this.isShow){
            return h('div',{
                class:['toast',this.position],
                style:this.innerStyle
            },[this.$scopedSlots.default()])
        }
    },
    watch:{
        isShow(val){
            let _this = this;
            if(val){
                setTimeout(function(){
                    _this.$emit("changeIsShow","");
                },this.time);
            }
        }
    }
}