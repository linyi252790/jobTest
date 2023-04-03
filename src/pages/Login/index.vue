<template>
    <div class="wrap">
        <div class="info">
            <h2>您好！</h2>
            <p>欢迎来到职业帮，立即注册</p>
        </div>
        <div class="form">
            <div class="item first">
                <input type="text" v-model="state.phone" placeholder="请输入手机号码"> <i>+86</i>
            </div>

            <div class="item">
                <input type="text" v-model="state.code" placeholder="请输入验证码"> <span>获取验证码</span>
            </div>
        </div>
        <div class="btn" @click="login">
            登 录
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {reactive} from 'vue'
    import {Toast} from 'vant';
    import {phoneLogin} from "../../api/user";
    import {useRouter} from 'vue-router'

    const router = useRouter();

    const state = reactive({
        phone: '',
        code: '',
    });

    const login = async () => {
        console.log(state);

        if (state.phone.trim() == '') {
            Toast('手机号码不能为空');
            return;
        }
        if (state.code.trim() == '') {
            Toast('手机验证码不能为空');
            return;
        }
        let reg = /^1[3-9]\d{9}$/;
        if (!reg.test(state.phone)) {
            Toast('手机号码格式不正确！');
            return;
        }

        // 合法，调用手机登录接口
        let response = await phoneLogin(state);

        console.log(response);
        if (response.statusCode == 200) {
            Toast('登录成功');
            /*1. 记录登录的标识 */
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userinfo', JSON.stringify( response.data.userInfo ));

            /*2. 前往个人中心*/
            router.push('/mine');

        } else {
            Toast(response.message);
        }
    }

</script>

<style lang="less" scoped>

    input::-webkit-input-placeholder {
        font-size: 0.28rem;
        color: #D8D8D8;

    }

    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        font-size: 0.28rem;
        color: #D8D8D8;
    }

    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        font-size: 0.28rem;
        color: #D8D8D8;

    }

    input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        font-size: 0.28rem;
        color: #D8D8D8;
    }

    .wrap {
        width: 100%;
        height: 100%;
        background-color: #fff;

        padding: 0 1rem;

        padding-bottom: 3.07rem;
        padding-top: 2rem;

        display: flex;

        flex-direction: column;
        justify-content: space-between;

        /*align-items: center;*/

        .info {

            h2 {
                font-size: 0.48rem;
                color: #181818;
                font-weight: 700;
                padding-bottom: 0.3rem;
            }

            p {
                font-size: 0.36rem;
                color: #333333;
            }

        }

        .form {
            .item {
                width: 5.4rem;
                height: 0.96rem;
                border-bottom: 1px solid #CCCCCC;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &.first {
                    flex-direction: row-reverse;
                    justify-content: space-between;
                    align-items: center;

                    i {
                        width: 0.5rem;
                        height: 0.2rem;
                        margin-right: 0.45rem;
                    }

                    input {
                        flex: 1;
                    }
                }

                input {
                    height: 100%;
                    outline: none;
                    border: none;
                }

                span {
                    border: 0.01rem solid #149639;
                    background-color: #fff;
                    color: #149639;
                    height: 0.5rem;
                    border-radius: 0.25rem;
                    line-height: 0.5rem;
                    padding: 0 0.18rem;
                }
            }
        }

        >.btn {
            width: 5rem;
            /*height: 0.88rem;*/
            /*line-height: 0.88rem;*/
            color: #fff;
            text-align: center;
            font-weight: 700;
            background: #149639;
            border-radius: 0.44rem;
        }

    }

</style>
