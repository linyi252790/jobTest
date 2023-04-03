import {createApp} from 'vue'
import App from './App.vue'
import './assets/less/reset.less';
import './assets/less/common.less';

const app = createApp(App);

import { TUICore, TUIComponents } from "./TUIKit";
import { genTestUserSig } from "../debug";

const config = {
    SDKAppID: 1400653563,
};
const TUIKit = TUICore.init(config);

TUIKit.use(TUIComponents);

const userID = 'user1';
const userInfo = {
    userID: userID,
    userSig: genTestUserSig(userID).userSig,
};
TUIKit.login(userInfo);

app.use( TUIKit );


/*elementPlus UI组件库注册*/

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

app.use(ElementPlus)


/*vantUI组件库的注册*/
import Vant, {ConfigProvider} from 'vant';
import 'vant/lib/index.css';

app.use(Vant);
app.use(ConfigProvider);

/*路由注册*/
import router from './routes/index';

app.use(router);

app.mount('#app')
