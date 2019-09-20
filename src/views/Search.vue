<template>
    <div class="search-page">
        <back>
            <template #back-left>
                <i class="search-back-icon iconfont icon-arrow-l" @click="isHistoryRecord ? goBack():hideHistoryRecord()"></i>
            </template>
            <template #back-title>
                <input-item class="search"
                  v-model="search"
                  clearIcon
                  clearBg
                  placeholder="搜索"
                  @keyup="keyupHandle"
                  @input="searchInput"></input-item>
            </template>
            <template #back-right>
                <button class="search-btn red-linear"
                @click="searchStart">搜索</button>
            </template>
        </back>
        <div v-if="hotList.length!=0&&isHotList&&search!=''" class="hot-list">
            <div class="item"
             v-for="(item,index) in hotList"
             :key="index"
             @click="selectHotKey(item)">{{item}}</div>
        </div>
        
        <keep-alive include="SearchRecord">
            <search-record 
            v-if="isHistoryRecord" 
            :historyRecord="historyRecord"
            v-on:navListType="navListType"
            v-on:searchClick="searchClick"
            :currType="currType"></search-record>
            <search-result v-else :currType="currType" :search="search"></search-result>
        </keep-alive>
    </div>
</template>

<script>
import SearchRecord from "./SearchRecord.vue"
import SearchResult from "./SearchResult.vue"
    export default {
        name:'Search',
        components:{
            SearchRecord,
            SearchResult
        },
        data(){
            return {
                search:'',
                hotList:[],
                isHotList:false,
                historyRecord:[],
                isHistoryRecord:true,
                currType:'all'
            }
        },
        mounted(){
            document.addEventListener('keydown',this.keyboardEnter);
            this.getSearchRecord();
        },
        methods:{
            searchStart(){
                // 搜索成功后
                document.removeEventListener('keydown',this.keyboardEnter);
                this.isHotList = false;
                this.isHistoryRecord = false;
                this.saveSearchRecord();
            },
            saveSearchRecord(){
                let _this = this;
                this.axios.get('/saveSearchRecord',{
                    params:{
                        record:_this.search
                    }
                }).then(res => {
                    if(res.data=='保存成功'){
                        _this.getSearchRecord();
                    }
                });
            },
            getSearchRecord(){
                let _this = this;
                this.axios.get('/getSearchRecord').then(res => {
                    _this.historyRecord = res.data;
                });
            },
            keyboardEnter(evt){
                if(evt.keyCode==13){
                    this.searchStart();
                }
            },
            keyupHandle(){
                let _this = this;
                this.isHotList = true;
                this.axios.get('/searchHot',{
                    params:{
                        hot_key:_this.search
                    }
                }).then(res=>{
                    _this.hotList = res.data;
                })
            },
            selectHotKey(hotKey){
                this.search = hotKey;
                this.searchStart();
            },
            searchInput(){
                this.isHistoryRecord = true;
            },
            navListType(data){
                this.currType = data;
            },
            searchClick(data){
                this.search = data;
                this.searchStart();
            },
            hideHistoryRecord(){
                this.isHistoryRecord = true;
            },
            goBack(){
                this.$router.go(-1);
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
.hot-list{
    position:fixed;
    top:$back-nav-h;
    background-color:#fff;
    left:0;
    right:0;
    bottom:0;
    padding:vm(10);
    border-radius:vm(8);
    box-shadow:0 0 vm(12) shadowColor(0.15);
    z-index:999;
    .item{
        border-bottom:1px solid $border-color-ee;
        padding:vm(25) vm(10);
        font-size:vm(28);
        color:$txt-gray2;
        &:last-of-type{
            border-bottom:none;
        }
    }
}
.search-back-icon{
    margin-left:vm(20);
    font-size:vm(38);
    font-weight:bold;
    color:$txt-gray1;
}
</style>