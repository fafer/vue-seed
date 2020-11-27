import Vue from 'vue';
import { Plugin } from 'vue-fragment';
import ${Component} from '../../components/Name';
import '../../common/flexible';
import '../../common/base.css';

Vue.use(Plugin);
const app = new Vue(${Component});
app.$mount('#app');
