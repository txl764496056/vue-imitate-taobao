<template>
    <div>
        <back ref="backNav">
            <template #back-title>选择国家和地区</template>
        </back>
        <ul class="area-unit" v-for="(value,name) in callingCode" :key="name">
            <div class="title" v-if='Object.keys(value).length>0' :ref="name" :id="name">{{name=='common' ? "常用国家/地区":name}}</div>
            <li class="area-code" v-for="(code,area) in value" :key="code" @click="selectArea(area,code)">
                <p>{{area}}</p>
                <span>+{{code}}</span>
            </li>
        </ul>
        <div class="area-nav">
            <div class="item"
            v-for="(value,name) in callingCode" 
            :key='name'
            :class="{'iconfont icon-star':name=='common'}" 
            @click="areaNavTab(name)">{{name=='common' ? '':name}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'AreaList',
        data(){
            return {
                callingCode:null,
                backNavH:0
            }
        },
        created(){
            this.getCallingCode();
        },
        mounted(){
            this.backNavH = this.$refs.backNav.$el.clientHeight;
        },
        methods:{
            getCallingCode(){
                let _this = this;
                this.axios.get('/counryCallingcode').then(res=>{
                    _this.callingCode = res.data.countryCallingCodes;
                });
            },
            areaNavTab(name){
                if( !this.$refs[name] ) return ;
                let top = this.$refs[name][0].getBoundingClientRect().top;
                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                // 滚动距离 = 已滚动距离 + 元素距离视口顶部距离 - 返回导航高度
                let scroll = scrollTop + top - this.backNavH;
                document.body.scrollTop = scroll;
                document.documentElement.scrollTop = scroll;
            },
            selectArea(area,areaCode){
                this.$router.push({
                    name:"login",
                    params:{
                        area,
                        areaCode
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
$area-nav-w:50;
.area-unit{
    position:relative;
    .title{
        text-align:left;
        background-color:#eee;
        font-size:vm(32);
        padding: vm(8) vm(25) {right:vm(25 + $area-nav-w);};
    }
    .area-code{
        display:flex;
        justify-content: space-between;
        line-height:vm(100);
        border-bottom:1px solid $border-color-dd;
        padding: 0 vm(25) {right:vm(25 + $area-nav-w);};
        p{
            font-weight:bold;
            color:$txt-black;
            font-size:vm(32);
        }
        span{
            color:$txt-gray2;
        }
    }
}
.area-nav{
    position:fixed;
    right:0;
    top:$back-nav-h;
    bottom:0;
    display:inline-flex;
    flex-wrap:wrap;
    width:vm($area-nav-w);
    background-color:#fff;
    .item{
        width:100%;
        display:block;
        text-align:center;
        align-self:stretch;
        color:$txt-gray2;
    }
}
</style>