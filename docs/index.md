---
layout: home
title: Home

hero:
  name: N Notes
  text: "以有涯隨無涯, 殆已!\n已而為知者, 殆而已矣!"
  tagline: 是的，这是一个博客网站。
  image:
    src: /logo_filled.svg
    alt: VitePress
  actions:
    - theme: brand
      text: 组队探索（4 体力）
      link: /notes/
    - theme: alt
      text: 单人探索（6 体力）
      link: https://github.com/boring-plans/n-notes
---

<div class="container">
  <div class="latest-articles" v-if="articles.length">
    <div class="latest-title">Latest:</div>
    <a v-for="{title, date, link}, index in articles" :key="index" class="article" :href="link">
      <div>{{title}}</div>
      <div>{{date}}</div>
    </a>
  </div>
  <div v-else class="loading-container">
    <div class="loading">
      <font-awesome-icon icon="fas fa-circle-notch" class="loading-icon"/>
      <div>Loading..</div>
    </div>
  </div>
</div>

<script setup>
import { ref, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const articles = ref([])

async function loadLatest(count=5){
  articles.value = (await (await fetch('https://n-notes-crawling.tkzt.cn/blogs.json', {mode: 'cors', method: 'GET'})).json()).sort((a, b)=>new Date(b.date)-new Date(a.date)).slice(0, count);
}

onMounted(()=>{
  loadLatest();
})
</script>

<style scoped>
.container {
  padding: 0 48px;
  position: relative;
}

.latest-articles {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.latest-title {
  margin-bottom: 24px;
  font-size: large;
  font-weight: 500;
  width: 100%;
}

.article {
  cursor: pointer;
  width: 100%;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vp-c-bg-soft);
}

.article:hover {
  background: var(--vp-c-bg-mute);
}

.article > p:nth-of-type(1) {
  font-size: medium;
  font-weight: 600;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.article > p:nth-of-type(2) {
  font-size: small;
  color: var(--vp-c-text-2);
}

.loading-container {
  position: absolute;
  top: 50%;
  left: 50%;
}

.loading {
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}

.loading-icon {
  animation: spin 1s linear infinite;
  margin-right: .5rem;
}

@media screen and (min-width: 960px) {
  .article {
    width: 49%;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
