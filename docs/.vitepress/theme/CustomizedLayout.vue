<script setup>
import DefaultTheme from 'vitepress/theme';
import { useData, useRoute } from 'vitepress';
import { onMounted, watch, nextTick, computed, ref } from 'vue';
import { init } from '@waline/client';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const { Layout } = DefaultTheme;
const vpData = useData();
const route = useRoute();
const timeTaken = ref(0);
const encodedTitle = computed(()=>vpData.frontmatter.value.title.replaceAll(' ', '-').toLowerCase());
const placeholders = [
  '闪电风暴已经生成！',
  '苏联力量强大无比！',
  '告诉我你在想什么~',
  '清除你的个体意识！',
  '基洛夫刚刚造好，基洛夫报道！',
  '正在行动中！',
  'shake it, baby!'
]
let walineInstance = null;

onMounted(()=>{
  nextTick(()=>{
    initWaline();
  });
});

watch(route, ()=>{
  if(walineInstance){
    walineInstance.destroy();
    nextTick(()=>{
      initWaline();
    });
  }
})

watch(vpData.isDark, (val)=>{
  if(walineInstance){
    walineInstance.update({
      dark: val
    });
  }
});

function initWaline(){
  walineInstance = init({
    el: '#waline',
    serverURL: 'https://waline.tkzt.cn',
    dark: vpData.isDark.value,
    locale: {
      placeholder: placeholders[Math.floor(Math.random()*placeholders.length)],
      sofa: '空空如也。',
    },
    pageview: true,
    comment: true,
  });

  calcTimeTaken();
}

/**
 * time taken = total words / average reading speed + time taken of pictures
 * 
 * and, average reading speed = 275
 */
function calcTimeTaken(){
  const main = document.querySelector('main > .vp-doc');
  if(main){
    const pictures = main.querySelectorAll('img').length;
    timeTaken.value = Math.ceil(main.innerText.length / 275 + (pictures>9?((12+4)/2*9 + (pictures-9)*3):(pictures>0?((12 + 12-pictures+1) / 2 * pictures):0)) / 60);
  }
}
</script>

<template>
  <Layout>
    <template #doc-before>
      <div class="vp-doc">
        <h1 :id="encodedTitle" tabindex="-1">
          {{ vpData.frontmatter.value.title }}
          <a class="header-anchor" :href="'#'+encodedTitle" aria-hidden="true">#</a>
        </h1>
        <div class="info" :key="route.path">
          <span key="date">
            <font-awesome-icon icon="fa-solid fa-clock" />
            <span class="info-text">Posted on {{ vpData.frontmatter.value.date?new Date(vpData.frontmatter.value.date).toLocaleDateString():'a long time ago' }}</span>
          </span>
          <span key="visitors">
            <font-awesome-icon icon="fa-solid fa-eye" />
            <span class="info-text waline-pageview-count" :data-path="route.path">-</span>
            <span class="info-text after-num">visitor(s)</span>
          </span>
          <span key="comments">
            <font-awesome-icon icon="fa-solid fa-comment" />
            <span class="info-text waline-comment-count" :data-path="route.path">-</span>
            <span class="info-text after-num">comment(s)</span>
          </span>
          <span key="timeTaken">
            <font-awesome-icon icon="fa-solid fa-hourglass" />
            <span class="info-text">{{ timeTaken }} min read</span>
          </span>
        </div>
      </div>
    </template>
    <template #doc-footer-before>
      <div id="waline"></div>
    </template>
  </Layout>
</template>

<style scoped>
.info {
  margin-top: 16px;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  border-radius: 8px;
  font-size: small;
  color:  var(--vp-c-text-2);
}

.info > span:nth-child(n + 2) {
  margin-left: 24px;
}

.info-text {
  margin-left: 8px;
}

.info-text.after-num {
  margin-left: 0;
}

.info-text.after-num::before {
  content: ' ';
}
</style>