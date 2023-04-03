<template>
    <div class="collect">
        <van-sticky :offset-top="0">
            <van-config-provider :theme-vars="themeVars">

                <van-nav-bar
                        title="我的收藏"
                        left-arrow
                        @click-left="onClickLeft"

                >

                </van-nav-bar>

            </van-config-provider>
        </van-sticky>


        <!--选项卡-->
        <div class="tabs">
            <van-tabs v-model:active="active" @click-tab="onClickTab">
                <van-tab title="岗位收藏">
                    <div class="list">
                        <div class="itemBox" v-if="state.collectWorkList.length > 0"
                             v-for="ele in state.collectWorkList" :key="ele._id" @click="showInfo(ele)">
                            <div class="item">
                                <div class="itemTitle">
                                    <div class="titleText">
                                        {{ ele.title }}
                                    </div>
                                    <div class="salary-wrap">
                                        <span>{{ ele.salary }}</span>
                                        <!--.stop 事件修饰符阻止冒泡-->
                                        <van-button type="danger" size="mini" @click.stop="removeWorkCollect(ele)">
                                            移除
                                        </van-button>
                                    </div>
                                </div>
                                <div class="require">
                                    <span>{{ ele.workAddress }} | {{ ele.workRange }} | {{ ele.education }}</span>
                                </div>
                                <div class="tipsBox">
                                    <div class="tips" v-for="v in ele.welfare" :key="v">
                                        <span>{{ v }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <van-empty v-else description="暂无收藏的岗位~~"/>
                    </div>
                </van-tab>
                <van-tab title="公司收藏">
                    <div class="list">
                        <div class="itemBox" v-for="n in 10">
                            <div class="item">
                                <div class="companyBox">
                                    <div class="company">
                                        <div class="logoUrl">
                                            <img src="https://mina.52kfw.cn/uploads/attach/2021/09/20210923/6c560d5e896f2fa457ec50ff1dae77e3.png"
                                                 alt="">
                                        </div>
                                        <div class="companyText">
                                            <span class='name'>凯杰网络科技有限公司</span>
                                            <div class="msg">
                                                <span>有限公司</span>
                                                <span>200-100人</span>
                                            </div>
                                            <div class="msg">
                                                <span>五险一金</span>
                                                <span>下午茶</span>
                                            </div>
                                            <div class="msg">
                                                <span>http://jy.52kfw.cn/</span>
                                            </div>
                                            <div class="msg">
                                                <span>广州海珠区保利中悦广场36楼102室</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- 投递按钮 -->
                                    <div class="btn">
                                        <van-button type="danger" size="mini">
                                            移除
                                        </van-button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>


    </div>
</template>

<script setup lang="ts">
    import {ref, reactive} from 'vue'
    import {useRouter} from 'vue-router'
    import {Toast} from 'vant'
    import {collectWorkList, delCollectWork} from "../../api/user";

    const router = useRouter();
    const state = reactive({
        collectWorkList: [],
    });

    const active = ref(0);
    const onClickTab = (options) => {
        console.log(active.value);
        console.log(options);
    }

    const onClickLeft = () => {
        router.back();
    }

    const themeVars = {
        navBarBackgroundColor: '#40a735',
        navBarTitleTextColor: '#fff',
        navBarIconColor: '#fff',
    }

    const getCollectWorkList = async () => {

        let response = await collectWorkList();
        if (response.statusCode == 200) {
            state.collectWorkList = response.data.result;
        } else {
            Toast(response.message);
        }
    }
    getCollectWorkList();

    const showInfo = (ele) => {
        router.push({
            path: '/workinfo',
            query: {workid: ele._id},
        })
    }

    const removeWorkCollect = async (ele) => {
        console.log('removeWorkCollect');
        let response = await delCollectWork({workid: ele._id});
        if (response.statusCode == 200) {
            Toast('移除成功');
            getCollectWorkList();

        } else {
            Toast(response.message);
        }
    }

</script>

<style scoped lang="less">
    .collect {
        width: 100%;
        height: 100%;

        padding-bottom: 0.05rem;

        .tabs {
            width: 100%;
            /*height: 2.1rem;*/
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
                        }

                    }

                    .companyBox {
                        /*margin-top: 0.34rem;*/
                        display: flex;
                        justify-content: space-between;

                        .company {
                            display: flex;
                            font-size: 0.26rem;

                            .logoUrl {
                                margin-right: 0.16rem;

                                img {
                                    width: 0.8rem;
                                    height: 0.8rem;
                                }
                            }

                            .companyText {
                                .name {
                                    font-size: 0.36rem;
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
