<template>
    <div class="company">
        <!-- 顶部 -->
        <van-sticky>
            <div class="top">
                <div class="back" @click="back">
                    <van-icon name="arrow-left"/>
                </div>
                <div class="topTitle">
                    职位详情
                </div>
                <div class="attention" @click="collectCompanyHandler">
                    <span>收藏</span>
                    <van-icon name="plus"></van-icon>
                </div>
            </div>
        </van-sticky>

        <!-- 内容 -->
        <div class="cnt-bg"></div>
        <div class="content">
            <div class="introduce">
                <div class="avatar">
                    <img src="https://mina.52kfw.cn/uploads/attach/2021/09/20210923/6c560d5e896f2fa457ec50ff1dae77e3.png"
                         alt="">
                </div>
                <div class="text">
                    <h3 class='title'>{{ state.info.title }}</h3>
                    <div class="tips">
                        {{ state.info.companyRange }} | {{ state.info.companyNumber }} | {{ state.info.companyType }}
                    </div>
                    <div :class="{textContent: flag}">
                        <div class="textChange">
                            {{ state.info.description }}
                        </div>
                    </div>
                    ...<span class='more' @click="clickMore">{{flag ? '查看更多':'收起'}}</span>
                </div>

            </div>
            <div class="workTime">
                <span class='timeTitle'>工作时间</span>
                <div class="timeText">
                    <div class="timeTextBox">
                        <span v-for="v in state.info.workTime" :key="v">{{  v }}</span>
                    </div>
                </div>
            </div>
            <div class="welfare">
                <div class="welfareTitle">
                    员工福利
                </div>
                <div class="welfareContent">
                    <div class="item" v-for="(e, i) in state.info.welfare" :key="i">
                        <div class="avatar">
                            <img :src="e.img"
                                 alt="">
                        </div>
                        <div class="text">
                            <span class='textTitle'>{{ e.title }}</span>
                            <span>{{ e.descp }}</span>
                        </div>
                    </div>
                </div>
                <div class="companySite">
                    <div class='siteTitle'>公司官网</div>
                    <span class='text'>{{  state.info.siteUrl ?  state.info.siteUrl.substring(0, 30) : '暂无官网' }}...</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {ref, reactive} from 'vue';
    import {Toast} from 'vant';

    import {useRouter, useRoute} from 'vue-router'
    import {getCompanyInfo} from "../../api/work";
    import {collectCompany} from "../../api/user";

    const state = reactive({
        info: {}
    });

    const flag = ref(true);

    const router = useRouter();
    const route = useRoute();

    const back = () => {
        router.back();
    }
    const clickMore = () => {
        flag.value = !flag.value;
    }

    const companyInfo = async () => {
        let response = await getCompanyInfo(route.query.companyid);

        console.log(response);

        if (response.statusCode == 200) {
            state.info = response.data;

        } else {
            Toast(response.message);
        }
    }
    companyInfo();

    const collectCompanyHandler = async () => {
        console.log('collectCompany');
        let response = await collectCompany({companyid: route.query.companyid});
        if (response.statusCode == 200) {
            Toast('收藏成功')
        } else {
            Toast(response.message);
        }
    }

</script>

<style scoped lang="less">
    .cnt-bg {
        width: 100%;
        height: 0.75rem;
        background-color: #139639
    }

    .company {

        .top {
            display: flex;
            color: #fff;
            background-color: #139639;
            padding: 0.3rem 0.3rem;
            padding-top: 0.8rem;
            align-items: center;

            .attention {
                color: #fff;
                font-size: 0.22rem;
                display: flex;
                justify-content: space-between;
                border: 0.01rem solid #fff;
                padding: 0.1rem 0.2rem;
                border-radius: 0.3rem;

                span {
                    padding-left: 0.1rem;
                }
            }

            .topTitle {
                margin: 0 0.2rem;
                font-size: 0.36rem;
            }
        }


        .content {
            padding: 0rem 0.27rem;
            position: relative;
            top: -0.74rem;

            .introduce {
                display: flex;
                align-items: top;

                .avatar {
                    width: 1.81rem;
                    height: 1.81rem;
                    margin-right: 0.4rem;
                    border-radius: 0.2rem;
                    box-shadow: 0 0 36px rgba(0, 0, 0, 0.2);
                }

                .text {
                    .title {
                        font-size: 0.4rem;
                        color: #fff;
                        margin-bottom: 0.58rem;
                        white-space: nowrap;
                        width: 4.6rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .tips {
                        font-size: 0.22rem;
                        margin-bottom: 0.18rem;
                    }

                    .textContent {
                        font-size: 0.22rem;
                        color: #888888;
                        height: 0.98rem;
                        overflow: hidden;
                    }

                    .textChange {
                        font-size: 0.22rem;
                        line-height: 1.4;
                        color: #888888;
                        height: auto;
                        overflow: hidden;
                    }

                    .more {
                        font-size: 0.22rem;
                        color: #139639;
                    }
                }
            }

            .workTime {
                margin-top: 0.1rem;
                padding-bottom: 0.4rem;
                border-bottom: 0.01rem solid #eeeeee;

                .timeTitle {
                    font-size: 0.32rem;
                    font-weight: bold;
                }

                .timeText {
                    display: flex;
                    margin-top: 0.3rem;
                    color: #777777;

                    .timeTextBox {
                        span {
                            font-size: 0.22rem;
                            margin-right: 0.2rem;
                        }
                    }
                }
            }

            .welfare {
                margin-top: 0.4rem;


                .welfareTitle {
                    font-size: 0.32rem;
                    font-weight: bold;
                }

                .welfareContent {
                    margin-top: 0.49rem;
                    padding: 0 0.3rem;
                    padding-bottom: 0.4rem;
                    border-bottom: 0.01rem solid #eeeeee;

                    .item {
                        display: flex;
                        margin-top: 0.43rem;
                        align-items: center;

                        .avatar {
                            margin-right: 0.58rem;
                        }

                        .text {
                            display: flex;
                            flex-direction: column;
                            font-size: 0.22rem;
                            color: #888888;

                            .textTitle {
                                color: #333333;
                                font-size: 0.28rem;
                                margin-bottom: 0.2rem;
                            }
                        }
                    }

                }

                .companySite {
                    margin-top: 0.39rem;

                    .siteTitle {
                        font-size: 0.32rem;
                        font-weight: bold;
                        margin-bottom: 0.41rem;
                    }

                    .text {
                        font-size: 0.28rem;
                        color: #888888;
                        margin-top: 0.41rem;
                    }
                }
            }
        }
    }
</style>
