<template>
    <Layout>
        <div class="company">
            <van-sticky>
                <div class="top">
                    <div class="topTitle">
                        公司
                    </div>
                    <div class="searchBox">
                        <!--search回车时候触发 ， update:model-value 内容变化后触发-->
                        <van-search @update:model-value="onSearch" :clearable="false" @search="onSearch"
                                    background="#139639" shape="round" v-model="state.kw"
                                    placeholder="请输入搜索关键词"/>
                    </div>
                </div>
            </van-sticky>


            <div class="content">
                <div class="item" @click="showInfo(ele)" v-for="ele in state.companyList" :key="ele._id">
                    <div class="avatar">

                        <img :src="ele.logoUrl"
                             alt="">
                    </div>
                    <div class="text">
                        <div class="textTitle">
                            {{ ele.title }}
                        </div>
                        <div class="tips">
                            {{ ele.companyType }} | {{ ele.companyType}} | {{ ele.companyNumber }}
                        </div>
                        <div class="more">
                            <div class="moreBox">
                                <span>热招：</span>
                                <span class="active">
								{{ ele.workInfo ? ele.workInfo[0].title : '暂无岗位' }}
							</span>
                                <span>等 {{ ele.workInfo.length }} 个岗位</span>
                                <div class="icon">
                                    <van-icon name="arrow"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts" setup>
    import {reactive} from 'vue'
    import {Toast} from 'vant'

    import Layout from '../../pages/Layout/index.vue'
    import {getCompanyList} from "../../api/work";
    import {useRouter} from 'vue-router'

    const router = useRouter();

    const state = reactive({
        kw: '',
        companyList: [],
    })
    const onSearch = (val) => {
        console.log(val, state.kw);
    }

    const companyList = async () => {
        let response = await getCompanyList();
        console.log(response);
        if (response.statusCode == 200) {
            state.companyList = response.data.list;
        } else {
            Toast(response.message);
        }
    }
    companyList();

    const showInfo = (ele) => {
        console.log('showInfo');
        router.push({
            path: '/company-info',
            query: {companyid: ele._id},
        })
    }

</script>

<style scoped lang="less">
    .company {
        .top {
            height: 1.3rem;
            background-color: #139639;
            display: flex;
            align-items: center;
            padding: 0 0.3rem;

            .topTitle {
                font-size: 0.42rem;
                color: #fff;
                margin-right: 0.35rem;

            }

        }

        .content {
            padding: 0 0.3rem;

            .item {
                display: flex;
                box-shadow: 0 0 0.36rem rgba(0, 0, 0.36rem, 0.2);
                margin: 0.3rem 0;
                padding: 0.4rem 0.32rem 0.3rem 0.32rem;

                .avatar {
                    border-radius: 50%;
                    height: 0.8rem;
                    box-shadow: 0 0 0.36rem rgba(0, 0, 0.36rem, 0.1);
                    margin-right: 0.2rem;

                    img {
                        width: 0.8rem;
                        height: 0.8rem;
                    }
                }

                .text {
                    font-size: 0.2rem;

                    .textTitle {
                        font-size: 0.36rem;

                    }

                    .tips {
                        padding-top: 0.1rem;
                        font-size: 0.18rem;
                        color: #888888;
                        padding-bottom: 0.3rem;
                        border-bottom: 0.01rem solid #f4f4f4;
                    }
                }

                .more {
                    display: flex;
                    align-items: center;
                    padding-top: 0.3rem;

                    .moreBox {
                        display: flex;
                        align-items: center;

                        .active {
                            padding-right: 0.1rem;
                            color: #41a736;
                        }

                        .icon {
                            display: flex;
                        }

                    }


                }


            }
        }
    }
</style>
