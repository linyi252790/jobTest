<template>
    <div class="item">
        <div class="header">
            <h2 class="title">{{ info.title }}</h2>
            <h3 class="salary">{{ info.salary }}</h3>
        </div>
        <div class="tag">{{ info.workAddress }} | {{ info.workRange }} | {{ info.education }}</div>
        <div class="welfare">
            <span v-for="ele in info.welfare" :key="ele">{{ ele }}</span>
        </div>
        <div class="company-info">
            <div class="left">
                <img :src="info.companyInfo ? info.companyInfo[0].logoUrl : ''"
                     :alt="info.companyInfo ? info.companyInfo[0].title : ''" class="logo">
                <div class="info">
                    <!--页面刚加载的时候，由于 岗位详情是异步请求，info 是一个空对象，那么在获取 companyInfo 的时候为 undefined 那么如果在去获取 0 下标，则会报错，所以要判断一下是否存在 companyInfo 属性，如果存在，则代表网络请求岗位详情成功了。-->
                    <h2>{{ info.companyInfo ? info.companyInfo[0].title : '' }}</h2>
                    <p>{{ info.companyInfo ? info.companyInfo[0].workRange : '' }} {{ info.companyInfo ?
                        info.companyInfo[0].companyNumber : '' }} </p>
                </div>
            </div>
            <!--点击这个按钮，实现简历的投递，这个时候是子父通信。在vuejs3里面子父通信，我们可以使用自定义事件处理。
                1. 在父组件里面，给子组件传递一个自定义事件
                2. 在父组件里面给这个自定义事件绑定好事件处理回调函数
                3. 在子组件里面触发自定义事件，同时可以将数据通过自定义事件传递给父组件
            -->
            <div class="right" @click="deliveryFn">
                立即投递
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    /*父子通信，则需要在子组件定义好相关的属性信息*/
    import {defineProps, toRefs, defineEmits} from 'vue'
    import {IWorkInfo} from '../api/work.ts';

    const emit = defineEmits(['delivery']);
    // props 获取到父组件传递的属性信息
    const props = defineProps({
        info: {
            //Object ECMAScript里面的构造函数类型，但是我们这里使用的类型应该是我们使用 ts 约束的 IWorkInfo 类型 使用 ts 里面的断言。断言 Object 是 IWorkInfo
            type: Object as IWorkInfo,
        }
    })

    const {info} = toRefs(props);

    const deliveryFn = () => {
        // 触发父组件传递的自定义事件
        // this.$emit() vue2 但是 vue3 里面 setup 里面是没有 this
        /*delivery 是父组件里面自定义的事件 @delivery='fn'*/
        emit('delivery');

    }

</script>

<style scoped lang="less">
    .item {
        margin-bottom: 0.6rem;

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
</style>
