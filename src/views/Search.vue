<template>
    <div>
        <back>
            <template #back-title>
                <input-item v-model="search" clearIcon placeholder="搜索"></input-item>
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
                search:'888'
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>