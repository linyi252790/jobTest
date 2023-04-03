<template>

    <van-sticky :offset-top="0">
        <van-config-provider :theme-vars="themeVars">

            <van-nav-bar
                    title="个人简历"
                    left-arrow
                    @click-left="onClickLeft"
            >
            </van-nav-bar>

        </van-config-provider>


    </van-sticky>

    <div class="wrap">
        <van-cell-group v-if="state.resumeList.length > 0">
            <van-cell :title="'简历' + (i+1)" v-for="(url, i) in state.resumeList" :key="url" icon="records">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-button type="success" size="mini" @click="showResume(url)">
                        查看
                    </van-button>
                    <van-button type="danger" size="mini" @click="delResume(url)">
                        移除
                    </van-button>
                </template>
            </van-cell>

        </van-cell-group>
        <div v-else>
            <van-empty description="暂无简历，赶紧上传吧~~~"/>
        </div>

        <van-uploader :before-read="beforeRead" :after-read="afterRead">
            <div class="dilivery">
                <van-icon name="plus"></van-icon>
                上传简历
            </div>
        </van-uploader>

    </div>

</template>

<script lang="ts" setup>
    import {reactive} from 'vue'
    import {useRouter, useRoute} from 'vue-router'
    import WorkItem from "../../components/workItem.vue";
    import {getWorkInfo, IWorkInfo} from "../../api/work";
    import {userResumeList, uploadResume, addUserResume, delUserResume} from "../../api/user";
    import {Toast} from 'vant'

    const state = reactive({
        info: {},
        show: false,
        resumeList: [],
    });

    const router = useRouter();
    const route = useRoute();


    const goLogin = () => {
        router.push('/login');
    }

    const goChat = () => {
        router.push('/chat');

    }

    const onClickLeft = () => {
        console.log('onClickLeft');
        router.back();
    }

    const onClickRight = () => {
        console.log('onClickRight');
    }

    const themeVars = {
        navBarBackgroundColor: 'linear-gradient( to right, #6db260, #3da632)',
        navBarTitleTextColor: '#fff',
        navBarIconColor: '#fff',
    }

    const getUserResumeList = async () => {
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


    /*
    * 函数如果返回 true，则会继续上传；否则终止
    * */
    const beforeRead = (file) => {
        console.log(file.type);
        if (file.type !== 'application/pdf') {
            Toast('请上传 pdf 格式的简历');
            return false;
        }
        return true;
    };

    const afterRead = async (info) => {
        console.log(info.file); // info.file 就是文件
        // 调用上传接口上传简历信息
        // 完成上传 cover 前端如何通过 ajax 上传文件呢 通过 FormData 对象完成
        const form = new FormData();
        form.append('cover', info.file);
        let response = await uploadResume(form);
        console.log(response);
        if (response.statusCode == 200) {
            // 将上传的简历更新到用户的简历列表里面
            let responseInfo = await addUserResume({resumeUrl: response.data.url});
            if (responseInfo.statusCode == 200) {
                // 添加成功
                // 获取最新的简历列表
                getUserResumeList();

            } else {
                Toast(response.message);
            }

        } else {
            Toast(response.message);
        }
    }

    const showResume = (url: string) => {
        console.log(url, 'showResume');
        router.push({
            path: '/resume-info',
            query: {url}
        });
    }

    const delResume = async (url: string) => {
        console.log(url, 'delResume');
        let response = await delUserResume({resumeUrl: url});
        if (response.statusCode == 200) {
            // 获取最新的简历列表
            getUserResumeList();
        } else {
            Toast(response.message);
        }
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
