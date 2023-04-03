<template>
    <van-sticky :offset-top="0">
        <van-config-provider :theme-vars="themeVars">

            <van-nav-bar
                    title="沟通中..."
                    left-arrow
                    @click-left="onClickLeft"
            >

            </van-nav-bar>

        </van-config-provider>

    </van-sticky>

    <div class="wrap">
        <div class="card">
            <WorkItem></WorkItem>
        </div>
        <div class="message">
            <div class="item" v-for="n in 1">
                <img src="https://mina.52kfw.cn/uploads/attach/2021/09/20210923/6c560d5e896f2fa457ec50ff1dae77e3.png" alt="" class="avatar"> <div class="content">您好，请问您还在找工作吗？ </div>
            </div>


            <div class="item" v-for="n in 1">
                <img src="https://mina.52kfw.cn/uploads/attach/2021/09/20210923/6c560d5e896f2fa457ec50ff1dae77e3.png" alt="" class="avatar"> <div class="content">看了您的简历觉得您比较符合我 们公司的标准呢。 </div>
            </div>




            <div class="item mine" v-for="n in 5">
                <img src="https://mina.52kfw.cn/uploads/attach/2022/02/20220226/1b32884332fddfe1bc986927c622d4c7.png" alt="" class="avatar"> <div class="content">您好，请问您还在找工作吗？ </div>
            </div>



        </div>
        <div class="send-msg">
            <input type="text" placeholder="请输入"> <span>发送</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import WorkItem from '../../components/workItem.vue'
    import {useRouter} from 'vue-router'

    const router = useRouter();


    const themeVars = {
        navBarBackgroundColor: 'linear-gradient( to right, #6db260, #3da632)',
        navBarTitleTextColor: '#fff',
        navBarIconColor: '#fff',
    }

    const onClickLeft = () => {
        console.log('onClickLeft');
        router.back();
    }


</script>

<style scoped lang="less">

    .wrap {
        width: 100%;
        height: 100%;
        background-color: #F4F4F4;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-top: 0.3rem;

        .card {
            width: 6.9rem;
            height: 3.14rem;
            background: #FFFFFF;
            box-shadow: 0rem 0.06rem 0.21rem 0rem rgba(1, 64, 153, 0.22);
            border-radius: 0.2rem;
            padding: 0.3rem;
        }

        .message{
            width: 100%;
            flex: 1;
            overflow: auto;
            padding: 0.3rem;
            padding-top: 0.5rem;


            .item{
                display: flex;
                margin-bottom: 0.55rem;

                &.mine{
                    flex-direction: row-reverse;
                    .avatar{
                        margin-left: 0.3rem;
                    }
                }
                .avatar{
                    width: 0.6rem;
                    height: 0.6rem;
                    border-radius: 0.3rem;
                    margin-right: 0.3rem;
                }
                .content{
                    width: 3.72rem;
                    min-height: 0.7rem;
                    background: #FFFFFF;
                    border-radius: 0rem 0.2rem 0.2rem 0.2rem;
                    font-size: 0.26rem;
                    color: #333333;
                    padding: 0.2rem;
                    line-height: 1.4;
                }
            }

        }
        .send-msg{
            width: 100%;
            height: 0.98rem;
            background: #FFFFFF;

            display: flex;
            align-items: center;

            input{
                outline: none;
                border: none;
                width: 5.9rem;
                height: 0.6rem;
                background: #F4F4F4;
                border-radius: 0.2rem;
                background-color: #F4F4F4;
                margin-right: 0.3rem;
                padding-left: 0.2rem;
            }
            span{
                flex: 1;
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.3rem;
                color: #149639;
            }
        }


    }
</style>
