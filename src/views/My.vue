<template>
    <div>
        <div class="banner">
            <div class="up">
                <div class="photo">
                    <img :src="person.photo" alt="" />
                    <router-link to="/nickname" class="nick-name">{{person.nickname}}</router-link>
                </div>
                <router-link to="/seting" class="iconfont icon-shezhi"></router-link>
            </div>
            <div class="dw">
                <router-link to="" class="item">
                    <p>{{person.collect}}</p>
                    <span>收藏夹</span>
                </router-link>
                <router-link to="" class="item">
                    <p>{{person.attention}}</p>
                    <span>关注店铺</span>
                </router-link>
                <router-link to="" class="item">
                    <p>{{person.track}}</p>
                    <span>足迹</span>
                </router-link>
                <router-link to="" class="item">
                    <p>{{person.coupon}}</p>
                    <span>优惠券</span>
                </router-link>
            </div>
        </div>
        <Menu></Menu>
    </div>
</template>

<script>
import Menu from '@/components/Menu.vue'
    export default {
        name:'My',
        components: {
            Menu
        },
        data(){
            return {
                person:{}
            }
        },
        created(){
            this.getData();
        },
        methods:{
            getData(){
                let _this = this;
                this.axios.get("/my",
                {params:{userKey:_this.$global.userKey}}
                ).then(res=>{
                    _this.person = res.data.person;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../css/base.scss';
.banner{
    background-image:linear-gradient(90deg,themeColor(0.7),themeColor(1));
    padding: vm(25) {
        bottom:vm(60);
        top:vm(30);
    };
    .up{
        display:flex;
        justify-content: space-between;
        color:#fff;
        align-items:center;
        a{
            color:inherit;
            font-size:vm(40);
        }
        .photo{
            display:flex;
            align-items:center;
            img{
                $size:vm(80);
                width:$size;
                height:$size;
                border-radius:50%;
                border: 2px solid #fff;
            }
            .nick-name{
                margin-left:vm(15);
                font-size:vm(40);
            }
        }
    }
    .dw{
        display:flex;
        justify-content: space-around;
        margin-top:vm(40);
        .item{
            color:#fff;
            text-align:center;
           span{
               font-size:vm(26);
           }
        }
    }
}
</style>