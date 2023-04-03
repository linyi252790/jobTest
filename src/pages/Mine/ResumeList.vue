<template>
    <div class="collect">
        <van-sticky :offset-top="0">
            <van-config-provider :theme-vars="themeVars">

                <van-nav-bar
                        title="已投简历"
                        left-arrow
                        @click-left="onClickLeft"

                >

                </van-nav-bar>

            </van-config-provider>
        </van-sticky>

        <div class="tabs">
            <div class="list">
                <div class="itemBox" v-if="state.deliveryList.length > 0" v-for="ele in state.deliveryList"
                     :key="ele._id">
                    <div class="item">
                        <div class="itemTitle">
                            <div class="titleText">
                                {{ ele.workInfo.title }}
                            </div>
                            <div class="salary-wrap">
                                <span> {{ ele.workInfo.salary }}</span>
                                <van-button type="success" size="mini" @click="showWorkInfo(ele)">
                                    查看
                                </van-button>
                            </div>
                        </div>
                        <div class="require">
                            <span>{{ ele.workInfo.workAddress }} | {{ ele.workInfo.workRange }} | {{ ele.workInfo.education }}</span>
                        </div>
                        <div class="tipsBox">
                            <div class="tips" v-for="v in ele.workInfo.welfare" :key="v">
                                <span>{{ v }}</span>
                            </div>
                        </div>
                        <div class="companyBox">
                            <div class="company">
                                <div class="logoUrl">
                                    <img :src="ele.companyInfo.logoUrl"
                                         alt="">
                                </div>
                                <div class="companyText">
                                    <span class='name'>{{ ele.companyInfo.title }}</span>
                                    <div class="msg">
                                        <span>{{ ele.companyInfo.companyRange }}</span>
                                        <span>{{ ele.companyInfo.companyNumber }}</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <van-empty v-else description="暂无投递~~~"/>
            </div>
        </div>


    </div>
</template>

<script setup lang="ts">
    import {reactive} from 'vue'
    import {userDeliveryResumeList} from "../../api/user";
    import {useRouter} from 'vue-router'

    const state = reactive({
        deliveryList: [],
    });
    const router = useRouter();


    const onClickLeft = () => {
        router.back();
    }

    const themeVars = {
        navBarBackgroundColor: '#40a735',
        navBarTitleTextColor: '#fff',
        navBarIconColor: '#fff',
    }

    const getUserDeliveryResumeList = async () => {
        let response = await userDeliveryResumeList();
        console.log(response);
        state.deliveryList = response.data.result;
    }
    getUserDeliveryResumeList();

    const showWorkInfo = (ele) => {
        router.push({
            path: '/workinfo',
            query: {workid: ele.workInfo._id}
        })
    }

</script>

<style scoped lang="less">
    .collect {
        width: 100%;
        height: 100%;

        padding-bottom: 0.05rem;

        .tabs {
            width: 100%;
        }

        .list {
            .itemBox {
                box-shadow: 0 0 0.36rem rgba(0, 0, 0, 0.2);
                border-radius: 0.2rem;
                width: 6.8rem;
                margin: 0 auto;

                .item {
                    padding: 0.31rem;
                    text-align: left;
                    margin: 30px 0;

                    .itemTitle {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.36rem;

                        .titleText {
                        }

                        .salary-wrap {
                            color: #149639;
                            display: flex;
                            flex-direction: column;

                            > span {
                                margin-bottom: 0.05rem;
                            }
                        }

                    }

                    .require {
                        margin-top: 0.19rem;
                        color: #333333;
                        font-size: 0.2rem;
                    }

                    .tipsBox {
                        display: flex;
                        margin-top: 0.19rem;

                        .tips {
                            padding: 0.15rem 0.09rem;
                            font-size: 0.16rem;
                            border-radius: 0.1rem;
                            background-color: #f4f4f4;
                            margin-right: 0.1rem;

                            span {
                                margin-right: 0.04rem;
                            }
                        }

                    }

                    .companyBox {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 0.1rem;

                        .company {
                            display: flex;
                            font-size: 0.26rem;

                            .logoUrl {
                                margin-right: 0.16rem;

                                img {
                                    width: 0.6rem;
                                    height: 0.6rem;
                                }
                            }

                            .companyText {
                                .name {
                                    font-size: 0.32rem;
                                }

                                .msg {
                                    margin-top: 0.2rem;
                                    font-size: 0.16rem;
                                    display: flex;
                                    color: #888888;

                                    span {
                                        padding-right: 0.1rem;
                                    }
                                }
                            }
                        }
                    }
                }

            }

        }

    }
</style>
