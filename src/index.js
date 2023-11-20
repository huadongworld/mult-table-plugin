import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';
import router from './router';

Vue.use(ElementUI);
Vue.use(Button);
Vue.use(Select);

new Vue({
    router,
    el: '#root',
    components: { App },
    render: h => h(App)
});