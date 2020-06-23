<template>
    <div class="cart">
        <div class="title red-linear">
            <div class="up">
                购物车
                <button v-if="isManage" @click="hiddenManage">管理</button>
                <button v-else @click="showManage">完成</button>
            </div>
            <p>共11件宝贝</p>
        </div>

        <cart-item
         v-for="(item,index) in cartList" 
         :cartMsg="item" 
         v-on:showSelect="showSelect"
         @selectedShop="handleSelectedShop"
         :allSelect="isAllSelect"
         :noneSelect="allNoneSelect"
         :key="index"></cart-item>
         <!-- :allSelect="isAllSelect"
         :noneSelect="allNoneSelect" -->
         
         <div class="count-btn-container">
            <div class="count-btn">
                <checkbox class="checkbox-btn"
                 :label="'全选'" 
                 :showLabel="true" 
                 v-model="isChecked"></checkbox>
                <div class="right">
                    <p>合计：<span>￥{{totalPrice}}</span></p>
                    <button class="red-linear">结算({{totalNum}})</button>
                </div>
            </div>
        </div>
        <Menu></Menu>
        <select-type
        class="cart-select-type" 
        v-if="isSelectType=='open'"
        :goodImg="selectMsg.img"
        :spuPrice="selectMsg.spu_price"
        :spuStore="selectMsg.spu_store"
        :skuList="selectMsg.sku_list"
        :spu_code="selectMsg.spu_code"
        :selectedSkuCode="oldSkuCode"
        :selectedType="selectMsg.attr"
        v-on:getSkuCode="getSelectSkuCode"
        v-on:closeSelect="closeSelect">
            <template>
                <button @click="updateCartProduct" class="big-btn confirm-btn">确定</button>
            </template>
        </select-type>
    </div>
</template>

<script>
import Menu from "@/components/Menu.vue"
import Checkbox from "@/components/Checkbox.vue"
import SelectType from "@/components/SelectType.vue"
import CartItem from "@/components/CartItem.vue"
    export default {
        name:"Cart",
        components:{
            Menu,
            Checkbox,
            SelectType,
            CartItem
        },
        data() {
            return {
                selectedShop:[], //已选中店铺的id,以及改店铺下被选中的产品的sku_code列表
                isManage:true,
                // cartList:[],
                productNum:0, //购物车产品数量
                selectProductNum:0, //已选中产品数量
                totalNum:0,
                // isChecked:false,
                // isAllSelect:false,
                isSelectType:'close', //是否打开selectType
                selectMsg:{}, //当前被点击产品（购物车列表）的属性列表
                oldSkuCode:"", //购物车列表每项产品，当前被点击产品的sku_code,也就是加入点击弹窗后都还未修正的
                selectSkuCode:"", //属性选择弹窗选择的产品的sku_code
                // allNoneSelect:false, //是否没有一个选中
                selectSpuCode:"", //当前被选择产品大类的spu_code
                cartList:[{"shop_id":"360000201905081566","shop_name":"管消速放店","shop_logo":"http://dummyimage.com/60x60/7b79f2/jpg&text=shop","product":[{"sku_code":"s6k8sm","spu_code":"s6","cart_num":1,"title":"个料意第完力形员变半应始度重界","spu_price":44.5,"shop_id":"360000201905081566","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"周半色","img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","code":"k7"},{"value":"物色","img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","code":"k8"},{"value":"都机色","img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","code":"k9"},{"value":"就眼色","img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","code":"k10"},{"value":"合色色","img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","code":"k11"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":76,"store":44,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k7ss"},{"price":39.07,"store":55,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k7sm"},{"price":75,"store":80,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k7sl"},{"price":48.3,"store":16,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k8ss"},{"price":68.1,"store":33,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k8sm"},{"price":51.2,"store":96,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k8sl"},{"price":35.6,"store":48,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k9ss"},{"price":23.7,"store":33,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k9sm"},{"price":41.7,"store":62,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k9sl"},{"price":28,"store":64,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k10ss"},{"price":61,"store":82,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k10sm"},{"price":77.1,"store":65,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k10sl"},{"price":42.5,"store":14,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k11ss"},{"price":27.3,"store":82,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k11sm"},{"price":31.98,"store":71,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k11sl"}]},"spu_store":242,"attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","price":68.1},{"sku_code":"s6k9sl","spu_code":"s6","cart_num":1,"title":"个料意第完力形员变半应始度重界","spu_price":44.5,"shop_id":"360000201905081566","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"周半色","img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","code":"k7"},{"value":"物色","img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","code":"k8"},{"value":"都机色","img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","code":"k9"},{"value":"就眼色","img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","code":"k10"},{"value":"合色色","img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","code":"k11"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":76,"store":44,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k7ss"},{"price":39.07,"store":55,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k7sm"},{"price":75,"store":80,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k7sl"},{"price":48.3,"store":16,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k8ss"},{"price":68.1,"store":33,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k8sm"},{"price":51.2,"store":96,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k8sl"},{"price":35.6,"store":48,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k9ss"},{"price":23.7,"store":33,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k9sm"},{"price":41.7,"store":62,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k9sl"},{"price":28,"store":64,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k10ss"},{"price":61,"store":82,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k10sm"},{"price":77.1,"store":65,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k10sl"},{"price":42.5,"store":14,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k11ss"},{"price":27.3,"store":82,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k11sm"},{"price":31.98,"store":71,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k11sl"}]},"spu_store":242,"attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"L","code":"sl"}},"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","price":41.7},{"sku_code":"s6k7sl","spu_code":"s6","cart_num":1,"title":"个料意第完力形员变半应始度重界","spu_price":44.5,"shop_id":"360000201905081566","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"周半色","img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","code":"k7"},{"value":"物色","img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","code":"k8"},{"value":"都机色","img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","code":"k9"},{"value":"就眼色","img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","code":"k10"},{"value":"合色色","img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","code":"k11"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":76,"store":44,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k7ss"},{"price":39.07,"store":55,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k7sm"},{"price":75,"store":80,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k7sl"},{"price":48.3,"store":16,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k8ss"},{"price":68.1,"store":33,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k8sm"},{"price":51.2,"store":96,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k8sl"},{"price":35.6,"store":48,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k9ss"},{"price":23.7,"store":33,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k9sm"},{"price":41.7,"store":62,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k9sl"},{"price":28,"store":64,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k10ss"},{"price":61,"store":82,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k10sm"},{"price":77.1,"store":65,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k10sl"},{"price":42.5,"store":14,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k11ss"},{"price":27.3,"store":82,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k11sm"},{"price":31.98,"store":71,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k11sl"}]},"spu_store":242,"attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"L","code":"sl"}},"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","price":75},{"sku_code":"s6k7sm","spu_code":"s6","cart_num":1,"title":"个料意第完力形员变半应始度重界","spu_price":44.5,"shop_id":"360000201905081566","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"周半色","img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","code":"k7"},{"value":"物色","img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","code":"k8"},{"value":"都机色","img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","code":"k9"},{"value":"就眼色","img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","code":"k10"},{"value":"合色色","img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","code":"k11"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":76,"store":44,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k7ss"},{"price":39.07,"store":55,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k7sm"},{"price":75,"store":80,"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k7sl"},{"price":48.3,"store":16,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k8ss"},{"price":68.1,"store":33,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k8sm"},{"price":51.2,"store":96,"img":"http://dummyimage.com/60x60/7986f2/jpg&text=product","attr":{"color":{"value":"物色","code":"k8"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k8sl"},{"price":35.6,"store":48,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k9ss"},{"price":23.7,"store":33,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k9sm"},{"price":41.7,"store":62,"img":"http://dummyimage.com/60x60/a9f279/jpg&text=product","attr":{"color":{"value":"都机色","code":"k9"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k9sl"},{"price":28,"store":64,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k10ss"},{"price":61,"store":82,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k10sm"},{"price":77.1,"store":65,"img":"http://dummyimage.com/60x60/f279cd/jpg&text=product","attr":{"color":{"value":"就眼色","code":"k10"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k10sl"},{"price":42.5,"store":14,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"S","code":"ss"}},"sku_code":"s6k11ss"},{"price":27.3,"store":82,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"M","code":"sm"}},"sku_code":"s6k11sm"},{"price":31.98,"store":71,"img":"http://dummyimage.com/60x60/79f0f2/jpg&text=product","attr":{"color":{"value":"合色色","code":"k11"},"size":{"value":"L","code":"sl"}},"sku_code":"s6k11sl"}]},"spu_store":242,"attr":{"color":{"value":"周半色","code":"k7"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/f28f79/jpg&text=product","price":39.07}]},{"shop_id":"150000199310015325","shop_name":"题始往决权店","shop_logo":"http://dummyimage.com/60x60/799ff2/jpg&text=shop","product":[{"sku_code":"s53k55sm","spu_code":"s53","cart_num":1,"title":"海特律些象义节改信或声命般至各领","spu_price":40.57,"shop_id":"150000199310015325","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"类共亲色","img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","code":"k54"},{"value":"立色类委色","img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","code":"k55"},{"value":"无看知色","img":"http://dummyimage.com/60x60/87f279/jpg&text=product","code":"k56"},{"value":"只色","img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","code":"k57"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":53.6,"store":61,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k54ss"},{"price":73.88,"store":7,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k54sm"},{"price":53.98,"store":25,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k54sl"},{"price":69,"store":57,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k55ss"},{"price":63.3,"store":80,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k55sm"},{"price":64.75,"store":24,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k55sl"},{"price":21.8,"store":68,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k56ss"},{"price":49,"store":15,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k56sm"},{"price":22.78,"store":27,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k56sl"},{"price":64,"store":81,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k57ss"},{"price":57.8,"store":86,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k57sm"},{"price":58.7,"store":85,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k57sl"}]},"spu_store":353,"attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","price":63.3},{"sku_code":"s53k57sm","spu_code":"s53","cart_num":1,"title":"海特律些象义节改信或声命般至各领","spu_price":40.57,"shop_id":"150000199310015325","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"类共亲色","img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","code":"k54"},{"value":"立色类委色","img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","code":"k55"},{"value":"无看知色","img":"http://dummyimage.com/60x60/87f279/jpg&text=product","code":"k56"},{"value":"只色","img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","code":"k57"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":53.6,"store":61,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k54ss"},{"price":73.88,"store":7,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k54sm"},{"price":53.98,"store":25,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k54sl"},{"price":69,"store":57,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k55ss"},{"price":63.3,"store":80,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k55sm"},{"price":64.75,"store":24,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k55sl"},{"price":21.8,"store":68,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k56ss"},{"price":49,"store":15,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k56sm"},{"price":22.78,"store":27,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k56sl"},{"price":64,"store":81,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k57ss"},{"price":57.8,"store":86,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k57sm"},{"price":58.7,"store":85,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k57sl"}]},"spu_store":353,"attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","price":57.8},{"sku_code":"s53k56sm","spu_code":"s53","cart_num":1,"title":"海特律些象义节改信或声命般至各领","spu_price":40.57,"shop_id":"150000199310015325","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"类共亲色","img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","code":"k54"},{"value":"立色类委色","img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","code":"k55"},{"value":"无看知色","img":"http://dummyimage.com/60x60/87f279/jpg&text=product","code":"k56"},{"value":"只色","img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","code":"k57"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":53.6,"store":61,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k54ss"},{"price":73.88,"store":7,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k54sm"},{"price":53.98,"store":25,"img":"http://dummyimage.com/60x60/f2b179/jpg&text=product","attr":{"color":{"value":"类共亲色","code":"k54"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k54sl"},{"price":69,"store":57,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k55ss"},{"price":63.3,"store":80,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k55sm"},{"price":64.75,"store":24,"img":"http://dummyimage.com/60x60/8e79f2/jpg&text=product","attr":{"color":{"value":"立色类委色","code":"k55"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k55sl"},{"price":21.8,"store":68,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k56ss"},{"price":49,"store":15,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k56sm"},{"price":22.78,"store":27,"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k56sl"},{"price":64,"store":81,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"S","code":"ss"}},"sku_code":"s53k57ss"},{"price":57.8,"store":86,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"M","code":"sm"}},"sku_code":"s53k57sm"},{"price":58.7,"store":85,"img":"http://dummyimage.com/60x60/f279aa/jpg&text=product","attr":{"color":{"value":"只色","code":"k57"},"size":{"value":"L","code":"sl"}},"sku_code":"s53k57sl"}]},"spu_store":353,"attr":{"color":{"value":"无看知色","code":"k56"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/87f279/jpg&text=product","price":49}]},{"shop_id":"520000201505063625","shop_name":"石治口律店","shop_logo":"http://dummyimage.com/60x60/bc79f2/jpg&text=shop","product":[{"sku_code":"s113k118sm","spu_code":"s113","cart_num":1,"title":"克历反信按利马广始决被反间","spu_price":36.51,"shop_id":"520000201505063625","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"布位色","img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","code":"k114"},{"value":"器质色","img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","code":"k115"},{"value":"明周色","img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","code":"k116"},{"value":"毛好建色","img":"http://dummyimage.com/60x60/f28379/jpg&text=product","code":"k117"},{"value":"克速受色","img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","code":"k118"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":68.4,"store":36,"img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","attr":{"color":{"value":"布位色","code":"k114"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k114ss"},{"price":23.4,"store":97,"img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","attr":{"color":{"value":"布位色","code":"k114"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k114sm"},{"price":46.2,"store":41,"img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","attr":{"color":{"value":"布位色","code":"k114"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k114sl"},{"price":77.6,"store":52,"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k115ss"},{"price":64.45,"store":23,"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k115sm"},{"price":22.2,"store":75,"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k115sl"},{"price":63,"store":18,"img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","attr":{"color":{"value":"明周色","code":"k116"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k116ss"},{"price":38.08,"store":27,"img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","attr":{"color":{"value":"明周色","code":"k116"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k116sm"},{"price":78.9,"store":51,"img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","attr":{"color":{"value":"明周色","code":"k116"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k116sl"},{"price":25.7,"store":50,"img":"http://dummyimage.com/60x60/f28379/jpg&text=product","attr":{"color":{"value":"毛好建色","code":"k117"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k117ss"},{"price":57,"store":83,"img":"http://dummyimage.com/60x60/f28379/jpg&text=product","attr":{"color":{"value":"毛好建色","code":"k117"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k117sm"},{"price":39.9,"store":17,"img":"http://dummyimage.com/60x60/f28379/jpg&text=product","attr":{"color":{"value":"毛好建色","code":"k117"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k117sl"},{"price":57.57,"store":38,"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k118ss"},{"price":34.9,"store":4,"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k118sm"},{"price":73.4,"store":95,"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k118sl"}]},"spu_store":356,"attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","price":34.9},{"sku_code":"s113k115sm","spu_code":"s113","cart_num":1,"title":"克历反信按利马广始决被反间","spu_price":36.51,"shop_id":"520000201505063625","sku_list":{"attr":{"color":{"title":"颜色分类","list":[{"value":"布位色","img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","code":"k114"},{"value":"器质色","img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","code":"k115"},{"value":"明周色","img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","code":"k116"},{"value":"毛好建色","img":"http://dummyimage.com/60x60/f28379/jpg&text=product","code":"k117"},{"value":"克速受色","img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","code":"k118"}]},"size":{"title":"尺码","list":[{"value":"S","code":"ss"},{"value":"M","code":"sm"},{"value":"L","code":"sl"}]}},"sku_items":[{"price":68.4,"store":36,"img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","attr":{"color":{"value":"布位色","code":"k114"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k114ss"},{"price":23.4,"store":97,"img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","attr":{"color":{"value":"布位色","code":"k114"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k114sm"},{"price":46.2,"store":41,"img":"http://dummyimage.com/60x60/f2ed79/jpg&text=product","attr":{"color":{"value":"布位色","code":"k114"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k114sl"},{"price":77.6,"store":52,"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k115ss"},{"price":64.45,"store":23,"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k115sm"},{"price":22.2,"store":75,"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k115sl"},{"price":63,"store":18,"img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","attr":{"color":{"value":"明周色","code":"k116"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k116ss"},{"price":38.08,"store":27,"img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","attr":{"color":{"value":"明周色","code":"k116"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k116sm"},{"price":78.9,"store":51,"img":"http://dummyimage.com/60x60/79f2a6/jpg&text=product","attr":{"color":{"value":"明周色","code":"k116"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k116sl"},{"price":25.7,"store":50,"img":"http://dummyimage.com/60x60/f28379/jpg&text=product","attr":{"color":{"value":"毛好建色","code":"k117"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k117ss"},{"price":57,"store":83,"img":"http://dummyimage.com/60x60/f28379/jpg&text=product","attr":{"color":{"value":"毛好建色","code":"k117"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k117sm"},{"price":39.9,"store":17,"img":"http://dummyimage.com/60x60/f28379/jpg&text=product","attr":{"color":{"value":"毛好建色","code":"k117"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k117sl"},{"price":57.57,"store":38,"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"S","code":"ss"}},"sku_code":"s113k118ss"},{"price":34.9,"store":4,"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"M","code":"sm"}},"sku_code":"s113k118sm"},{"price":73.4,"store":95,"img":"http://dummyimage.com/60x60/7992f2/jpg&text=product","attr":{"color":{"value":"克速受色","code":"k118"},"size":{"value":"L","code":"sl"}},"sku_code":"s113k118sl"}]},"spu_store":356,"attr":{"color":{"value":"器质色","code":"k115"},"size":{"value":"M","code":"sm"}},"img":"http://dummyimage.com/60x60/ca79f2/jpg&text=product","price":64.45}]}]
            }
        },
        created(){
            
        },
        mounted(){
            this.getCartList();
            
        },
        computed:{
            totalPrice(){
                return 0;
            },
            isAllSelect(){
                
                // return this.selectedShop.length>0&&this.selectedShop.length==this.cartList.length;
                return this.selectProductNum>0&&this.selectProductNum===this.productNum;
            },
            allNoneSelect(){
                // return this.selectedShop.length==0;
                return this.selectProductNum==0;
            },  
            isChecked:{
                get(){
                    return this.isAllSelect;
                },
                set(val){
                    this.handleAllSelect(val);
                }
            }
        },
        methods: {
            /**
             * 获得购物车产品数量
             */
            getAllProduct(data){
                let num = 0;
                for(let i=0;i<data.length;i++){
                    num += data[i].product.length;
                }
                this.productNum = num;
            },
            /**
             * 获得已选择产品的数量
             */
            getSelectProductNum(){
                let num = 0;
                for(let i=0;i<this.selectedShop.length;i++){
                    num += this.selectedShop[i].skuCodeList.length;
                }
                this.selectProductNum = num;
            },
            /**
             * 查询已选择shop_id列表中是否含有当前选中的
             * 返回索引值
             */
            getShopIdIndex(shop_id){
                for(let i=0;i<this.selectedShop.length;i++){
                    if(this.selectedShop[i].shop_id==shop_id){
                      return i;
                    }
                }
                return -1;
            },
            /**
             * 存储或删除已选中shop_id
             */
            handleSelectedShop(data){
                let {shop_id,skuCodeList} = data;
                
                let index = this.getShopIdIndex(shop_id);

                if(index==-1&&skuCodeList.length>0){
                    this.selectedShop.push({
                        skuCodeList,
                        shop_id
                    });
                }else if(skuCodeList.length==0){
                    this.selectedShop.splice(index,1);
                }else{
                    this.selectedShop[index] = {
                        shop_id,
                        skuCodeList
                    }
                }
                this.getSelectProductNum();
            },
            /**
             * 全选/取消全选
             */
            handleAllSelect(val){
                if(val){
                    let arr = [];
                    for(let i=0;i<this.cartList.length;i++){
                        let skuCodeList = this.cartList[i].product.map((item)=>{
                            return item.sku_code;
                        })
                        arr.push({
                            shop_id:this.cartList[i].shop_id,
                            skuCodeList
                        })
                    }
                    this.selectedShop = arr;
                }else{
                    this.selectedShop = [];
                }

                this.getSelectProductNum();
                
            },
            getCartList(){
                let _this = this;
                // this.axios.get('/cartList').then(res=>{
                //     _this.cartList = res.data;
                //     this.getAllProduct(res.data);
                // })
                this.getAllProduct(this.cartList);
            },
            hiddenManage() {
                this.isManage = false;
            },
            showManage() {
                this.isManage = true;
            },
            showSelect(data){
                let {spu_code,sku_code} = data;
                this.isSelectType = "open";
                this.selectSpuCode = spu_code;
                this.oldSkuCode = sku_code;
            },
            closeSelect(data){
                this.isSelectType = data;
            },
            getSelectSkuCode(sku_code){
                this.selectSkuCode = sku_code;
            },
            updateCartProduct(){
                let _this = this;
                this.axios.get("/updateCartProduct",{
                    params:{
                        sku_code:_this.oldSkuCode, //列表项的sku_code，更改前的
                        update_code:_this.selectSkuCode, //列表属性的sku_code,新的sku_code
                    }
                }).then(res=>{
                    if(res.data=='success'){
                        _this.closeSelect('close');
                        _this.getCartList();
                    }
                });
            },
            checkClick(){
                console.log("ddd");
            }
        },
        watch:{
            /* 筛选出当前被点击的产品大类（根据spu_code) */
            selectSpuCode(){
                let _this = this;
                for(let i=0;i<this.cartList.length;i++){
                    let item = this.cartList[i];
                    let product = _.filter(item.product,function(o){
                        return o.spu_code==_this.selectSpuCode;
                    });
                    if(product.length>0){
                        _this.selectMsg = product[0];
                        break;
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "../css/base.scss";
.cart{
    .title{
        padding: vm(25) {
            bottom:vm(120);
        };
        color:#fff;
        .up{
            display:flex;
            justify-content: space-between;
            font-size:vm(34);
            letter-spacing: 1px;
            button{
                font-size:vm(30);
                color:#fff;
                border:none;
                background-color:transparent;
            }
        }
        p{
            margin-top:vm(15);
        }
    }
    .checkbox-btn{
        ::v-deep .input{
            border-radius:50%;
        }
    }
   
}

.cart-select-type{
    .confirm-btn{
        background-color:$theme-color;
    }
    ::v-deep &.select-type{
        .content{
            .btns{
                .confirm-btn{
                    width:100%;
                }
            }
        }
    }
}
.count-btn-container{
    position:relative;
    height:$menu-h;
}
.count-btn{
    display:flex;
    justify-content: space-between;
    position:fixed;
    bottom:$menu-h;
    left:0;
    right:0;
    height:$menu-h;
    background-color:#fff;
    border-top:1px solid $border-color-ee;
    padding:0 vm(25);
    .checkbox-btn{
        font-size:vm(28);
    }
}
</style>