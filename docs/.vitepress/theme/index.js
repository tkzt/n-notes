import DefaultTheme from 'vitepress/theme';
import Layout from './CustomizedLayout.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faClock, faComment, faHourglassStart, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import '@waline/client/dist/waline.css';
import './custom.css';

library.add(faEye, faClock, faComment, faHourglassStart, faCircleNotch);

export default {
    ...DefaultTheme,
    Layout
}
