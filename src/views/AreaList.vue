<template>
    <div>
        <back>
            <template #back-title>选择国家和地区</template>
        </back>
        <ul class="area-unit" v-for="(value,name) in callingCode" :key="name">
            <div class="title" :id="name">{{name=='common' ? "常用国家/地区":name}}</div>
            <li class="area-code" v-for="(code,area) in value" :key="code">
                <p>{{area}}</p>
                <span>+{{code}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name:'AreaList',
        data(){
            return {
                callingCode:null
            }
        },
        created(){
            this.getCallingCode();
        },
        methods:{
            getCallingCode(){
                let _this = this;
                this.axios.get('/counryCallingcode').then(res=>{
                    console.log(res);
                    _this.callingCode = res.data.countryCallingCodes;
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
.area-unit{
    .title{
        text-align:left;
    }
    .area-code{
        display:flex;
        justify-content: space-between;
    }
}
</style>