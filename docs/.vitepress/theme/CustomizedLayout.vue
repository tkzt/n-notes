<script setup>
import DefaultTheme from 'vitepress/theme';
import { onMounted } from 'vue';

const { Layout } = DefaultTheme;

onMounted(async ()=>{
  const { default: Valine } = await import('valine');

  new Valine({
    el: '#vcomments',
    appId: 'n06TKNQNbYo839sxTZRoXHFY-MdYXbMMI',
    appKey: 'FOTSWXGrlUyGLPKmECdAMBfo',
    avatar: 'retro',
    visitor: true,
    placeholder: 'Feel free to leave a comment, and md syntax is supported :)'
  });
});
</script>

<template>
  <Layout>
    <template #doc-footer-before>
      <div id="vcomments"></div>
    </template>
  </Layout>
</template>