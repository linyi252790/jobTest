<template>
    <div class="wrap">
        <!--公共的头部是否可以写在 layout? -->
        <!--答：不建议，因为基本上每个页面的头部都不太一样，则我们建议把头部在自己的页面去
        完成-->
        <!--slot使用组件方传递的内容-->
        <slot></slot>
        <!--layout 公共布局组件-->
        <!--开启组件的路由模式，可以实现页面的切换-->
        <!--1. 主题定制 2. 如果不能定制，则我们去覆盖默认样式即可 img-->
        <van-config-provider v-if="props.showFooter" :theme-vars="themeVars">

            <van-tabbar v-model="active" route>
                <van-tabbar-item to="/">
                    <span>岗位</span>

                    <template #icon="props">
                        <img :src="props.active ? workIcons.active : workIcons.inactive"/>
                    </template>

                </van-tabbar-item>
                <van-tabbar-item to="/company" icon="search">
                    <span>公司</span>
                    <template #icon="props">
                        <img :src="props.active ? companyIcons.active : companyIcons.inactive"/>
                    </template>
                </van-tabbar-item>
                <van-tabbar-item to="/message" icon="friends-o">
                    <span>消息</span>
                    <template #icon="props">
                        <img :src="props.active ? messageIcons.active : messageIcons.inactive"/>
                    </template>
                </van-tabbar-item>
                <van-tabbar-item to="/mine" icon="setting-o">
                    <span>我的</span>
                    <template #icon="props">
                        <img :src="props.active ? mineIcons.active : mineIcons.inactive"/>
                    </template>
                </van-tabbar-item>
            </van-tabbar>
        </van-config-provider>


    </div>

</template>

<script setup lang="ts">

    import {defineProps, withDefaults} from 'vue'

    interface Props {
        showFooter: boolean,
    }

    const props = withDefaults(defineProps<Props>(), {
        showFooter: true,
    })

    import {ref} from 'vue'

    import workIcon from '../../assets/tabbar/lingdai.png';
    import workIconA from '../../assets/tabbar/lingdai_a.png';

    import companyIcon from '../../assets/tabbar/dasha.png';
    import companyIconA from '../../assets/tabbar/dasha_a.png';


    import messageIcon from '../../assets/tabbar/message.png';
    import messageIconA from '../../assets/tabbar/message_a.png';


    import mineIcon from '../../assets/tabbar/mine.png';
    import mineIconA from '../../assets/tabbar/mine_a.png';


    const active = ref(0);
    /*岗位的图标url地址*/
    const workIcons = {
        active: workIconA,
        inactive: workIcon,
    };

    const companyIcons = {
        active: companyIconA,
        inactive: companyIcon,
    };

    const messageIcons = {
        active: messageIconA,
        inactive: messageIcon,
    };


    const mineIcons = {
        active: mineIconA,
        inactive: mineIcon,
    };

    const themeVars = {
        tabbarHeight: '100px',
        tabbarItemTextColor: '#666',
        tabbarItemActiveColor: '#149639',
    }

</script>

<style scoped lang="less">
    .wrap {
        width: 100%;
        height: 100%;
        padding-bottom: 2rem;
    }

    .van-tabbar-item__icon img {
        height: 55px;
    }

    .pb15 {
        padding-bottom: 1.5rem;

    }

</style>
