<template>

    <van-sticky :offset-top="0">
        <van-config-provider :theme-vars="themeVars">

            <van-nav-bar
                    title="职位详情"
                    right-text="按钮"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            >
                <template #right>
                    <img class="collect"
                         src="https://mina.52kfw.cn/uploads/attach/2022/06/20220617/645c9a245a7860781ffe48bebe940498.png"
                         alt="">
                </template>
            </van-nav-bar>

        </van-config-provider>


    </van-sticky>

    <div class="wrap">

        <div class="card">
            <!--父子组件通信 父组件将岗位的详情传递给 WorkItem 组件-->
            <WorkItem @delivery="deliveryHandler" :info="state.info"></WorkItem>
        </div>
        <div class="pannel">
            <h2 class="header">岗位职责</h2>
            <div class="info">
                <p>
                    岗位职责：
                </p>
                <p v-for="ele in state.info.works" :key="ele.title">
                    {{ ele.title }}
                </p>
            </div>
        </div>

        <div class="pannel">
            <h2 class="header">岗位要求</h2>
            <div class="info">

                <p v-for="ele in state.info.description" :key="ele.title">
                    {{ ele.title }}
                </p>
            </div>
        </div>
        <div class="dilivery" @click="goChat">
            立即聊天 IM
        </div>

    </div>

    <van-popup

            v-model:show="state.show"
            closeable
            round
            close-icon="close"
            position="bottom"
            :style="{ height: '30%' }"
    >
        <div class="resumt-wrap">
            <!--简历列表-->
            <van-cell-group v-if="state.resumeList.length > 0">

                <van-radio-group v-model="state.checkedResume">
                    <van-cell @click="selectResumeHandler(url)" :title="'简历' + (i+1)"
                              v-for="(url, i) in state.resumeList" :key="url">
                        <template #right-icon>
                            <van-radio :name="url"></van-radio>
                        </template>
                    </van-cell>

                </van-radio-group>


            </van-cell-group>
            <!--简历为空-->
            <div v-else>
                <van-empty description="暂无简历，赶紧上传吧~~~"/>
                <van-button type="danger" size="large" round @click="goResumeCenter">
                    <van-icon name="plus"></van-icon>
                    上传简历
                </van-button>

            </div>
        </div>
    </van-popup>


</template>

<script lang="ts" setup>
    import {reactive} from 'vue'
    import {useRouter, useRoute} from 'vue-router'
    import WorkItem from "../../components/workItem.vue";
    import {getWorkInfo, IWorkInfo} from "../../api/work";
    import {userResumeList, deliveryUserResume, collectWork} from "../../api/user";
    import {Toast} from 'vant'

    const state = reactive({
        info: {},
        show: false,
        resumeList: [],
        checkedResume: '',
    });

    const router = useRouter();
    const route = useRoute();


    const goLogin = () => {
        router.push('/login');
    }

    const goChat = () => {
        router.push({
            path: '/message',
            query: {companyid: route.query.companyid}
        })

    }

    const onClickLeft = () => {
        console.log('onClickLeft');
        router.back();
    }

    const onClickRight = async () => {
        console.log('onClickRight');
        let response = await collectWork({workid: route.query.workid});
        if (response.statusCode == 200) {
            Toast('岗位收藏成功');
            router.push('/collect-center');

        } else {
            Toast(response.message);
        }
    }

    const themeVars = {
        navBarBackgroundColor: 'linear-gradient( to right, #6db260, #3da632)',
        navBarTitleTextColor: '#fff',
        navBarIconColor: '#fff',
    }

    const getInfo = async () => {
        let workid = route.query.workid;
        let response = await getWorkInfo(workid);
        console.log(response);
        state.info = response.data;
    }
    getInfo();
    const getUserResumeList = async () => {
        if( !localStorage.getItem('token')){
            return;
        }
        let response = await userResumeList();
        console.log(response);
        if (response.statusCode == 200) {
            state.resumeList = response.data.result;
        } else {
            Toast('系统繁忙');
        }

    }
    getUserResumeList();


    const deliveryHandler = () => {
        /*完成简历的投递*/
        // 登录的检测  1. 路由守卫 2. token
        let token = localStorage.getItem('token');
        if (!token) {
            Toast('请登录后在投递简历！');
            router.push('/login');
            return;
        }
        console.log('用户已经登录，可以投递简历');
        state.show = true;
    }

    const goResumeCenter = () => {
        router.push('/resume-center');
    }

    const selectResumeHandler = async (url: string) => {
        console.log(url);
        state.checkedResume = url;

        // 简历的投递，以及 popup的关闭

        let response = await deliveryUserResume({resumeUrl: url, workid: route.query.workid});
        if (response.statusCode == 200) {
            Toast('投递成功');

        } else {
            Toast(response.message);
        }

        state.show = false;

    }

</script>

<style scoped lang="less">
    .resumt-wrap {
        padding: 0.4rem;
    }

    /deep/ .collect {
        width: 0.4rem;
        height: 0.39rem;
    }

    .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0 0.3rem;
        background-color: #fff;
        padding-top: 0.3rem;
    }

    .card {
        width: 6.9rem;
        background: #FFFFFF;
        box-shadow: 0rem 0.06rem 0.21rem 0rem rgba(1, 64, 153, 0.22);
        border-radius: 0.2rem;
        padding: 0.3rem;
    }

    .pannel {
        margin-top: 0.4rem;

        color: #333333;
        font-size: 0.3rem;
        background-color: #fff;

        .header {
            font-size: 0.3rem;
            color: #333333;
            padding-bottom: 0.4rem;

        }

        .info {
            color: #999999;
            font-size: 0.24rem;

            p {
                line-height: 2;
            }
        }
    }

    .dilivery {
        width: 6.9rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #fff;
        font-size: 0.3rem;
        background: #149639;
        border-radius: 0.35rem;
        margin-bottom: 0.2rem;
    }
</style>
