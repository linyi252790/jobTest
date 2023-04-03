<template>

    <Layout>
        <!--固定，移动端的页面基本都是 顶天立地的 顶部 header 底部 tabbar-->
        <van-sticky :offset-top="0">
            <!--1. 搜索-->
            <div class="search">
                <div class="location">
                    <h3>北京</h3> <img class="select" :src="selectIcon" alt="下拉选择">
                </div>
                <div class="kw">
                    <input type="text" placeholder="搜索...">
                    <img class="fdj" :src="sousuoIcon" alt="放大镜">
                </div>

            </div>
        </van-sticky>


        <!--2. 轮播图 -->
        <!--后期使用的第三方的swiper组件 以及轮播图接口-->
        <div class="banner">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="ele in state.bannerList">
                    <van-image
                            width="100%"
                            :src="ele.imageUrl"
                    />
                </van-swipe-item>
            </van-swipe>
        </div>

        <!--3. 列表选项卡-->
        <!--无限滚动，一般也叫做 滚动加载-->
        <!--实现的方案：
            0. iScroll 插件
            https://github.com/cubiq/iscroll

            1. 可以使用第三方的插件实现 better-scroll
            https://github.com/ustbhuangyi/better-scroll/blob/master/README_zh-CN.md

            3. 借助 Vue UI组件库里的组件去实现 vue3 elementPlus（饿了么前端团队为 vue3 开发的UI组件库）
                elementPlus 里面有提供一个无限滚动组件
                https://element-plus.gitee.io/zh-CN/component/infinite-scroll.html
        -->
        <div class="tabs">
            <div class="header">
                <div class="left">
                    <div class="item" :class="{active: currentTab == 1}" @click="tabHandler(1)">推荐</div>
                    <div class="item" :class="{active: currentTab == 2}" @click="tabHandler(2)">最新</div>
                </div>
                <div class="right">
                    筛选
                </div>
            </div>

            <!--固定高度，才可以使用 elementPlus 里面的无限滚动组件-->
            <!-- TODO :注意事项，在做无限滚动加载的时候，需要给滚动容器在套一层，然后在该层设置高度和 overflow: auto -->
            <div class="list-wrap" style="overflow: auto" ref="listWrap">
                <ul class="list"

                    v-infinite-scroll="load"
                    :infinite-scroll-disabled="disabled"
                >
                    <li class="item" @click="showInfo(ele)" v-for="ele in state.workList" :key="ele._id">
                        <div class="header">
                            <h2 class="title">{{ ele.title }}</h2>
                            <h3 class="salary">{{ ele.salary }}</h3>
                        </div>
                        <div class="tag">{{ ele.workAddress }} | {{ ele.workRange }} | {{ ele.education }}</div>
                        <div class="welfare">
                            <span v-for="(e,i) in ele.welfare" :key="i">{{ e }}</span>
                        </div>
                        <div class="company-info">
                            <div class="left">
                                <img :src="ele.companyInfo[0].logoUrl" :alt="ele.companyInfo[0].title" class="logo">
                                <div class="info">
                                    <h2>{{ ele.companyInfo[0].title }}</h2>
                                    <p>{{ ele.companyInfo[0].companyType}} {{ ele.companyInfo[0].companyNumber }}</p>
                                </div>
                            </div>
                            <div class="right">
                                立即投递
                            </div>
                        </div>
                    </li>
                </ul>
                <p v-if="noMore" class="no-more">暂无更多的数据...</p>
            </div>


        </div>

    </Layout>


</template>

<script setup lang="ts">
// @ts-nocheck
    import {reactive, onMounted, ref, Ref, toRaw, computed} from 'vue';
    import {useRouter} from 'vue-router'
    import selectIcon from '../../assets/icon/xuanze.png';
    import sousuoIcon from '../../assets/icon/sousuo.png';
    
    import Layout from '../../pages/Layout/index.vue';

    import {getBannersByPos, getWorkList, IBanner, IWork} from '../../api/work.ts';

    const total = ref(9999999999);
    const page = ref(0);
    const router = useRouter();


    const currentTab: Ref<number> = ref(1);

    type StateType = {
        bannerList: IBanner[],
        workList: IWork[],
    };

    const state: StateType = reactive({
        bannerList: [],
        workList: [],
    });

    // 根据获取数据的长度和总共数据的长度算出来的
    const noMore = computed(() => state.workList.length >= total.value)
    const disabled = computed(() => noMore.value)

    onMounted(async () => {
        let response = await getBannersByPos();
        state.bannerList = response.data.info.banners;

        // let rs = await getWorkList(1);
        // state.workList = rs.data.list;

    });
    // 和模板里面的 ref="listWrap" 进行绑定，通过 listWrap.value 属性可以获取到当前的 dom 元素
    const listWrap: Ref<HTMLElement> = ref();

    const tabHandler = async (type: number) => {
        // 在做切换的时候，不能触发当前项目下拉滚动加载
        // 在点击切换的时候，把外层容器的滚动的滚动条的位置重置为 0 即可，当然还要让页码重置为 0即可。
        console.log(listWrap.value);
        listWrap.value.scrollTop = 0; // 重置
        page.value = 0;

        currentTab.value = type;
        /*根据 type 去加载不同的工作岗位*/
        let rs = await getWorkList(type);
        state.workList = rs.data.list;
    }

    const load = async () => {
        page.value++;
        console.log(page.value);

        let rs = await getWorkList(currentTab.value, page.value);
        // 总记录数
        total.value = rs.data.total;

        /*把新的 数据追加到旧数据之后，实现滚动加载数据 */

        // 由于旧的数据需要是数组类型，则我们可以使用 toRaw 把响应式数据转化为原始的数据
        // state.workList = [旧的数据, rs.data.list];
        state.workList = [...toRaw(state.workList), ...rs.data.list];

    }

    const showInfo = (ele: IWork) => {
        router.push({
            path: '/workinfo',
            query: {
                companyid: ele.companyInfo[0]._id,
                workid: ele._id,
            }
        })

    }


</script>

<style scoped lang="less">
    .wrap {
        .search {
            background-color: #149639;

            display: flex;
            justify-content: space-between;
            align-items: center;

            padding: 0.18rem 0.29rem;


            .location {
                display: flex;
                align-items: center;

                h3 {
                    /*
                        移动端要适配 一般使用方案？ rem 方法
                            规则：基准设计稿 iPhone6 ： 750px * 1344px
                            1rem = 100px
                            其他的元素都以这个基准换算为rem单位
                            后面在动态的去更改 html 根标签的 font-size 值，实现等比的缩放。
                    */
                    /*webstorm px2rem alt+d 自动转换 */
                    font-size: 0.36rem;
                    color: #fff;
                    margin-right: 0.2rem;
                }

                .select {

                    width: 0.26rem;
                    height: 0.18rem;

                }
            }

            .kw {
                position: relative;

                input {
                    outline: none;
                    border: none;
                    padding-left: 0.37rem;
                    width: 5.47rem;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    background: #F4F4F4;
                    border-radius: 0.3rem;
                }

                .fdj {

                    position: absolute;
                    top: 0.11rem;
                    right: 0.3rem;
                    width: 0.38rem;
                    height: 0.38rem;

                }
            }
        }

        .banner {
            img {
                width: 7.5rem;
                height: 3.02rem;
            }
        }

        .tabs {

            > .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #333333;
                padding: 0.4rem 0.29rem;

                .left {

                    display: flex;
                    align-items: center;
                    font-size: 0.3rem;

                    .item {
                        margin-right: 0.31rem;
                        padding: 0.19rem 0;

                        &.active {
                            color: #149639;
                            border-bottom: 0.04rem solid #149639;
                            font-weight: 700;
                        }
                    }

                }

                .right {
                    font-size: 0.24rem;
                    height: 0.5rem;
                    line-height: 0.5rem;
                    padding: 0 0.27rem;
                    background: #F4F4F4;
                    text-align: center;
                    border-radius: 0.08rem;
                }

            }

            .list-wrap {
                height: calc(100vh - 100px - 3.02rem - 48px - 76px);
                /*border: 1px solid red;*/

                > .list {

                    .item {
                        margin-bottom: 0.6rem;

                        padding: 0 0.29rem;

                        > .header {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.36rem;

                            .title {
                                color: #333333;
                            }

                            .salary {
                                color: #149639;
                                font-weight: 500;
                            }
                        }

                        .tag {
                            font-size: 0.24rem;
                            color: #666666;
                            margin-top: 0.19rem;
                            margin-bottom: 0.27rem;
                        }

                        .welfare {
                            display: flex;
                            flex-wrap: wrap;
                            margin-bottom: 0.3rem;

                            span {
                                padding: 10px 0.15rem;
                                margin-right: 0.1rem;
                                text-align: center;
                                color: #666666;
                                background-color: #F4F4F4;
                                border-radius: 0.08rem;
                                margin-bottom: 0.1rem;

                            }

                        }

                        .company-info {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;

                            .left {
                                display: flex;
                                align-items: center;

                                .logo {
                                    width: 0.6rem;
                                    height: 0.6rem;
                                    border-radius: 50%;
                                    background-color: #ccc;
                                    margin-right: 0.16rem;
                                }

                                .info {
                                    > h2 {

                                        font-size: 0.24rem;
                                        color: #333333;
                                        margin-bottom: 0.12rem;

                                    }

                                    > p {
                                        font-size: 0.18rem;
                                        color: #666;
                                    }
                                }
                            }

                            .right {
                                padding: 0.14rem 0.18rem;
                                border: 0.02rem solid #149639;
                                border-radius: 0.25rem;
                                color: #149639;
                                font-size: 0.24rem;
                                text-align: center;
                            }


                        }
                    }
                }

                .no-more {
                    text-align: center;
                    color: #666;
                }
            }

        }


    }
</style>
