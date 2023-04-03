<template>
    <Layout>
        <div class="my">
            <div class="top">

                <!-- 个人信息 -->
                <div class="info">
                    <div class="avatar">
                        <img src="https://mina.52kfw.cn/uploads/attach/2021/09/20210923/6c560d5e896f2fa457ec50ff1dae77e3.png"
                             alt="">
                    </div>
                    <div class="infoText">
                        <div class="name">
                            <span>曹阳</span>
                        </div>
                        <div class="introduce">
                            用一句话介绍自己..
                        </div>
                    </div>
                </div>

                <!-- 选项卡 -->
                <div class="option">
                    <div class="optionItem" @click="resumeCenterHandler">
                        <img src="https://mina.52kfw.cn/uploads/attach/2022/06/20220622/6c4e97a40fdb95ea57ee156e071fd468.png">
                        <span>附件简历</span>
                    </div>
                    <div class="optionItem" @click="resumeListHandler">
                        <img src="https://mina.52kfw.cn/uploads/attach/2022/06/20220622/93d7b120928e3681059323ae1522ffe8.png">
                        <span>已投简历</span>
                    </div>
                    <div class="optionItem" @click="collectHandler">

                        <img src="https://mina.52kfw.cn/uploads/attach/2022/06/20220622/d7f80b639a9c863f0b203432533b707e.png">
                        <span>我的收藏</span>
                    </div>
                </div>
                <!-- 列表 -->
                <div class="list">
                    <van-cell-group>
                        <van-cell title="个人主页" icon="location-o" is-link/>
                        <van-cell title="常见问题" icon="location-o" is-link to="/message"/>
                        <van-cell title="设置" icon="location-o" is-link to="/message"/>
                        <van-cell title="帮助与反馈" icon="location-o" is-link to="/message"/>
                    </van-cell-group>
                </div>
                <!-- 退出登录 -->
                <div class="loginOut" @click="loginOut">
                    <van-button round size="large" type="danger" shape=' circle'>退出登录</van-button>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script lang="ts" setup>
    import Layout from '../../pages/Layout/index.vue'
    import {useRouter} from 'vue-router'

    const router = useRouter();


    const loginOut = () => {
        // 退出
        localStorage.removeItem('token');
        localStorage.removeItem('userinfo');
        router.push('/');
    }

    const resumeCenterHandler = () => {
        router.push('/resume-center');
    }

    const resumeListHandler = () => {
        router.push('/resume-list');
    }

    const collectHandler = () => {
        router.push('/collect-center');
    }

</script>

<style scoped lang="less">
    .my {

        .top {
            height: 3.86rem;
            background: rgb(124, 182, 114);
            background: linear-gradient(114deg, rgba(124, 182, 114, 1) 0%, rgba(63, 167, 52, 1) 90%);
            padding-top: 0.8rem;
        }

        .info {
            display: flex;
            align-items: center;
            padding: 0 0.3rem;
            margin-bottom: 0.4rem;

            .avatar {
                margin-right: 0.35rem;

                img {
                    width: 1.4rem;
                    height: 1.4rem;
                }
            }

            .infoText {
                color: #fff;

                .name {
                    font-size: 0.48rem;
                    display: flex;
                    align-items: center;

                    span {
                        margin-right: 0.21rem;
                    }
                }

                .introduce {
                    padding-top: 0.18rem;
                    font-size: 0.24rem;
                }
            }
        }

        // 选项卡
        .option {
            width: 5.72rem;
            background-color: #fff;
            border-radius: 0.2rem;
            margin: 0 auto;
            box-shadow: 0 0 0.36rem rgba(0, 0, 0.36rem, 0.2);
            padding: 0.34rem 0.64rem;
            display: flex;
            justify-content: space-around;

            .optionItem {
                display: flex;
                align-items: center;
                flex-direction: column;

                img {
                    width: 0.55rem;
                    height: 0.6rem;
                }

                span {
                    padding-top: 0.2rem;
                    font-size: 0.26rem;
                }
            }
        }

        // 列表
        .list {
            padding: 0 0.3rem;
            padding-top: 0.32rem;

            .linkValue {
                font-size: 0.24rem;
                color: #999999;
            }

            .listIcon {
                margin-right: 0.31rem;
            }
        }

        // 退出登录
        .loginOut {
            width: 80%;
            margin: 0 auto;
            margin-top: 0.8rem;

        }


    }
</style>
