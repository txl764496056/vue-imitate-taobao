<template>
    <div class="search-record">
        <nav-list :navList="list" v-on:navListClick="navListClick" :currType="currType"></nav-list>
        <div class="container">
            <h2>历史搜索</h2>
            <div class="history-list">
                <div class="item"
                v-for="(item,index) in historyRecord"
                :key="index">{{item.length>5 ? item.slice(0,5)+"...":item}}</div>
            </div>
            <h2>搜索发现</h2>
            <div class="search-find">
                <div class="item"
                v-for="(item,index) in searchFind"
                :key="index">
                    {{item}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavList from "@/components/NavList.vue"
    export default {
        name:"SearchRecord",
        components:{
            NavList
        },
        props:{
            historyRecord:{
                type:Array,
                default(){
                    return []
                }
            },
            currType:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                list:[{
                    name:"全部",
                    type:'all'
                },{
                    name:"天猫",
                    type:'tianmao'
                },{
                    name:"店铺",
                    type:'shop'
                }],
                searchFind:[],
            }
        },
        mounted(){
            this.getSearchFind();
        },
        methods:{
            getSearchRecord(){
                let _this = this;
                this.axios.get('/getSearchRecord').then(res => {
                    _this.historyRecord = res.data;
                });
            },
            getSearchFind(){
                let _this = this;
                this.axios.get('/getSearchFind',{
                    params:{
                        type:_this.currType
                    }
                }).then(res => {
                    _this.searchFind = res.data;
                });
            },
            navListClick(data){
                this.getSearchFind();
                this.$emit('navListType',data);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.container{
    background-color:#fff;
    padding:vm(20);
    margin-top:vm(30);
    h2{
        margin-top:vm(20);
    }
}
.search-find,.history-list{
    margin-top:vm(10);
    .item{
        font-size:vm(26);
        color:$txt-gray1;
    }
}

.search-find{
    display:flex;
    flex-wrap:wrap;
    .item{
        width:50%;
        margin:vm(10) 0;
    }
}

.history-list{
    display:flex;
    flex-wrap:wrap;
    .item{
        background-color:#f8f8f8;
        margin:vm(10);
        padding:vm(12) vm(20);
        border-radius:vm(50);
    }
}

</style>