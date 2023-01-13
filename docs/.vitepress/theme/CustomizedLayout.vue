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
const encodedTitle = ref('');
let walineInstance = null;

onMounted(()=>{
  encodedTitle.value = computed(()=>vpData.frontmatter.value.title.replaceAll(' ', '-').toLowerCase());

  nextTick(()=>{
    initWaline();
  });
});

watch(route, ()=>{
  resetStatistics();

  nextTick(()=>{
    initWaline();
  });
})

watch(vpData.isDark, (val)=>{
  if(walineInstance){
    walineInstance.update({
      dark: val
    });
  }
});

async function initWaline(){
  const walineElem = document.querySelector('#waline')
  if(walineElem){
      walineInstance = init({
      el: '#waline',
      serverURL: 'https://waline.tkzt.cn',
      dark: vpData.isDark.value,
      locale: {
        placeholder: (await (await fetch('https://v1.jinrishici.com/rensheng.txt')).text()),
        sofa: '空空如也。',
      },
      pageview: true,
      comment: true,
    });

    calcTimeTaken();
  }
}

/**
 * time taken = total words / average reading speed + time taken of pictures
 * 
 * and, average reading speed = 275
 */
function calcTimeTaken() {
  const main = document.querySelector('main > .vp-doc');
  if(main){
    const pictures = main.querySelectorAll('img').length;
    timeTaken.value = Math.ceil(main.innerText.length / 275 + (pictures>9?((12+4)/2*9 + (pictures-9)*3):(pictures>0?((12 + 12-pictures+1) / 2 * pictures):0)) / 60);
  }
}

function resetStatistics() {
  if(walineInstance){
    walineInstance.destroy();
  }

  const pageviewCountElem = document.querySelector('.waline-pageview-count');
  if(pageviewCountElem) {
    pageviewCountElem.innerHTML = '-';
  }

  const commentCountCountElem = document.querySelector('.waline-comment-count');
  if(commentCountCountElem) {
    commentCountCountElem.innerHTML = '-';
  }

  timeTaken.value = 0;
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
        <div class="info">
          <span>
            <client-only><font-awesome-icon icon="fas fa-clock"/></client-only>
            <span class="info-text" key="date">{{ vpData.frontmatter.value.date?new Date(vpData.frontmatter.value.date).toLocaleDateString('sv'):'A long time ago' }}</span>
          </span>
          <span>
            <client-only><font-awesome-icon icon="fas fa-eye"/></client-only>
            <span class="info-text waline-pageview-count" :data-path="route.path">-</span>
            <span class="info-text after-num">view(s)</span>
          </span>
          <span>
            <client-only><font-awesome-icon icon="fas fa-comment"/></client-only>
            <span class="info-text waline-comment-count" :data-path="route.path">-</span>
            <span class="info-text after-num">comment(s)</span>
          </span>
          <span>
            <client-only><font-awesome-icon icon="fas fa-hourglass-start"/></client-only>
            <span class="info-text">{{ timeTaken || '-' }} min read</span>
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
  margin: 16px 0;
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

.fa-hourglass-start {
  width: 13px;
}

@media (max-width: 960px) {
  .info > span:nth-child(3) {
    margin-left: 0;
  }

  .info > span {
    display: inline-block;
    width: calc(50% - 12px);
  }
}
</style>