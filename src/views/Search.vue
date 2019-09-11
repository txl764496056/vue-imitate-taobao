<template>
    <div class="search-page">
        <back>
            <template #back-title>
                <input-item class="search"
                  v-model="search"
                  clearIcon
                  clearBg
                  placeholder="搜索"
                  @keyup="keyupHandle"></input-item>
            </template>
            <template #back-right>
                <button class="search-btn red-linear"
                @click="searchStart">搜索</button>
            </template>
        </back>
    </div>
</template>

<script>
    export default {
        name:'Search',
        components:{
        },
        data(){
            return {
                search:''
            }
        },
        mounted(){
            document.addEventListener('keydown',this.keyboardEnter);
        },
        methods:{
            searchStart(){
                // let _this = this;
                // this.axios.get('/search',{
                //     params:{
                //         product:_this.search
                //     }
                // }).then(res=>{
                //     console.log(res);
                // })
                // 搜索成功后
                document.removeEventListener('keydown',this.keyboardEnter);
            },
            keyboardEnter(evt){
                if(evt.keyCode==13){
                    this.searchStart();
                }
            },
            keyupHandle(){
                let _this = this;
                this.axios.get('/searchHot',{
                    params:{
                        hot_key:_this.search
                    }
                }).then(res=>{
                    // _this.hotList = res.data;
                    console.log(res);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.search{
    background-color:#f5f5f5;
    margin-top:vm(4.6);
    padding: 0 vm(25);
    border-radius:vm(50);
    height:vm(60);
    margin-right:vm(45);
}
.search-btn{
    border:none;
    color:#fff;
    font-size:vm(32);
    padding:vm(5) vm(15) vm(8);
    border-radius:vm(40);
    margin-right:vm(10);
}
</style>