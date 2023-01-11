<script setup>
import DefaultTheme from 'vitepress/theme';
import Valine from 'valine';
import { ref, onMounted } from 'vue';

const { Layout } = DefaultTheme;
const valineInitFailed = ref(false);

onMounted(()=>{
  new Valine({
    el: '#vcomments',
    appId: 'n06TKNQNbYo839sxTZRoXHFY-MdYXbMMI',
    appKey: 'FOTSWXGrlUyGLPKmECdAMBfo',
    avatar: 'retro',
    visitor: true,
    placeholder: 'Feel free to leave a comment, and md is supported :)'
  });
});
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <div id="vcomments" v-if="!valineInitFailed"></div>
    </template>
  </Layout>
</template>