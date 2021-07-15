import i18n from '../i18n';
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { LangTranslator } from 'vuetify/types/services/lang';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    },
    lang: {
        // @ts-ignore
        t: (key, ...params) => i18n.t(key, params),
    }
});
