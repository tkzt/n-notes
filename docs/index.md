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
  <div class="archives">
    <div v-for="{title, details, latest}, index in archives" :key="index" class="archive">
      <p><a :href="latest">{{title}}</a></p>
      <p>{{details}}</p>
    </div>
  </div>
</div>

<script setup>
import { ref } from 'vue';

const archives = ref([
  {
    title: 'Boring Plans',
    details: "👨‍💻 一些个人项目的开发记录。",
    latest: '/boring-plans/fine-weather-gallery'
  },
  {
    title: 'Cheap Talks',
    details: "📕 又叫「程序员物语」。写程序以前, 他是个诗人。",
    latest: '/cheap-talks/cicadas-crying'
  },
  {
    title: 'Notes',
    details: "📑 博客。知识积累、刷题笔记 ..",
    latest: '/notes/basic-skills/python-decorator'
  }
])
</script>

<style scoped>
.container {
  padding: 0 48px;
}

.archives {
  max-width: 1152px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.archive {
  background: var(--vp-c-bg-soft);
  width: 100%;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
}

.archive > p:nth-of-type(1) {
  font-size: medium;
  font-weight: 600;
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.archive > p:nth-of-type(1):hover {
  text-decoration: underline;
}

.archive > p:nth-of-type(2) {
  font-size: small;
  color: var(--vp-c-text-2);
  margin: 8px 0;
}

@media (min-width: 960px) {
  .container {
    padding: 0 64px;
  }

  .archive {
    width: 32%;
    margin: 0;
  }
}
</style>
