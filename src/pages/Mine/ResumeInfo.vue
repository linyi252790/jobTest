<template>
    <van-sticky :offset-top="0">
        <van-config-provider :theme-vars="themeVars">

            <van-nav-bar
                    title="简历详情"
                    left-arrow
                    @click-left="onClickLeft"
            >
            </van-nav-bar>

        </van-config-provider>


    </van-sticky>

    <vue-pdf-embed :source="API_PREFIX + state.resumeUrl"/>

</template>

<script setup lang="ts">
    import {reactive} from 'vue'
    import VuePdfEmbed from "vue-pdf-embed";
    import {useRoute, useRouter} from 'vue-router'
    import {API_PREFIX} from "../../config/site";

    const route = useRoute();
    const router = useRouter();


    const state = reactive({
        resumeUrl: route.query.url,
    })

    const themeVars = {
        navBarBackgroundColor: 'linear-gradient( to right, #6db260, #3da632)',
        navBarTitleTextColor: '#fff',
        navBarIconColor: '#fff',
    }

    const onClickLeft = () => {
        router.back();
    }


</script>

<style scoped lang="less">

</style>
