import DefaultTheme from 'vitepress/theme';
import Layout from './CustomizedLayout.vue';
import '@waline/client/dist/waline.css';
import './custom.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faClock, faComment, faHourglass } from '@fortawesome/free-solid-svg-icons';

library.add(faEye, faClock, faComment, faHourglass);

export default {
    ...DefaultTheme,
    Layout
}
