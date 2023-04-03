<template>

    <Layout :showFooter="!data.currentConversationID">

        <div id="preloadedImages" class="home-h5">

            <main class="home-h5-main">
                <div class="message" v-show="!data.currentConversationID">
                    <main class="home-h5-content">
                        <div class="home-h5-main-content">
                            <TUIConversation @current="handleCurrentConversation"/>
                        </div>
                    </main>

                </div>
                <TUIChat v-show="data.currentConversationID"/>
            </main>

        </div>
    </Layout>


</template>

<script setup lang="ts">

    import {getCurrentInstance, onMounted, reactive} from 'vue'
    import Layout from '../../pages/Layout/index.vue';
    import {useRoute} from 'vue-router'

    const route = useRoute();

    let instance = getCurrentInstance();
    const TUIKit:any = instance?.appContext.config.globalProperties.$TUIKit;

    const data = reactive({
        currentConversationID: '',
        companyid: '',
        env: {
            isH5: true,
        }
    })

    onMounted(() => {
        const companyid = route.query.companyid;
        if (!companyid) {
            return;
        }

        const name = `C2C${companyid}`;
        data.currentConversationID = name;

        TUIKit.TUIServer.TUIConversation.getConversationProfile(name).then((imResponse: any) => {
            TUIKit.TUIServer.TUIConversation.handleCurrentConversation(imResponse.data.conversation);
        });

    })

    const handleCurrentConversation = (value) => {
        data.currentConversationID = value;
    }

</script>

<style lang="scss" scoped>
    @import "../../styles/home.scss";
</style>
