<template>
  <div class="container" :class="{dark}">
    <div class="shadow"></div>
    <div class="cards">
      <div class="fluid">
        <div class="brand-title">
          <span class="n-letter">N</span> Notes
        </div>
        <div class="brand-description">
          Knowledge has no limit.
        </div>
      </div>

      <div 
        class="category-card blurred" 
        v-for="({ title, description, link }, index) in categories" 
        :key="index" 
        @click="goto(link)" 
        :title="description"
      >
        <div class="card-title">{{ title }}</div>
        <div class="card-description">{{ description }}</div>
      </div>

      <div class="fluid caption" key="footer">
          &copy; {{new Date().getFullYear()}} Allen Tao
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vitepress';

const router = useRouter();
const dark = ref(false);
const categories = ref([]);

function checkBgWhetherDark() {
  const img = new Image();
  img.src = 'https://picsum.photos/1920/1080?random';
  img.crossOrigin = 'anonymous';
  img.onload = (ev) => {
    const { width, height } = ev.target;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const {data} = ctx.getImageData(0, 0, width, height);

    // card turns to dark mode when bg is light
    dark.value = !(getAverageBrightness(data) < 50);
  }
}

function getAverageBrightness(imageData) {
  return imageData.length ? imageData.reduce((pre, curr, index)=>pre + curr*(index%4===0?0.299:(index%4===1?0.587:(index%4===2?0.114:0)))) / (imageData.length*3/4) : 0;
}

function getCategories() {
  const docs = import.meta.globEager('/**/*.md');
  return Object.entries(docs).filter(([key])=>key.includes('index.md') && key!=='/index.md').map(([key, value])=>{
    const prefixPath = key.replace('index.md', '');
    const [, child] = Object.entries(docs).find(([key])=>key.includes(prefixPath) && !key.includes('index.md'));
    return {
      title: value.__pageData.title,
      description: value.__pageData.description,
      link: child.__pageData.relativePath.replace('.md', '')
    }
  });
}

function goto(path){
  router.go('/n-notes/' + path)
}

checkBgWhetherDark();
categories.value.push(...getCategories())
</script>

<style scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-image: url(https://picsum.photos/1920/1080?random);
  background-size: cover;
  overflow: visible;
  color: rgba(255, 255, 255, 0.87);
}

.cards {
  display: flex;
  margin: auto;
  width: 80%;
  flex-wrap: wrap;
}

.category-card {
  margin: 8px;
  border-radius: 12px;
  padding: 20px;
  box-sizing: border-box;
  flex: 0 0 100%;
  cursor: pointer;
  overflow: hidden;
}

.card-description {
  color: rgba(255, 255, 255, 0.62);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.fluid {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: bold;
  padding: 8px;
}

.caption{
  font-size: xx-small;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: .87;
}

.brand-title {
  font-size: 3.7rem;
}

.brand-description {
  font-size: 1.4rem;
  margin-top: 16px;
  position: relative;
  font-weight: 400;
}


.n-letter {
  color: var(--vp-c-brand);
  text-shadow: var(--vp-c-brand-light) 0 0 20px;
}


.blurred {
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: saturate(180%) blur(20px);
}

.dark .blurred {
  background: rgba(0, 0, 0, 0.14);
  backdrop-filter: saturate(180%) blur(20px);
}

.shadow {
  width: 100%;
  height: 100%;
  position: absolute;
  background-image: radial-gradient(
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    ),
    radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
}

::-webkit-scrollbar {
  width: 13px;
  height: 13px;
  position: absolute;
  right: -13px;
}
::-webkit-scrollbar-thumb {
  border-radius: 1em;
  background-color: rgba(50, 50, 50, 0.28);
  border: 3px solid transparent;
  background-clip: content-box;
}
::-webkit-scrollbar-track {
  background-color: rgba(50, 50, 50, 0.06);
}
::-webkit-scrollbar-corner {
  background-color: rgba(50, 50, 50, 0.06);
}

@media screen and (min-width: 1200px) {
  .category-card {
    flex-basis: calc(25% - 16px);
  }
}

@media screen and (min-width: 800px) and (max-width: 1199px) {
  .category-card {
    flex-basis: calc(50% - 16px);
  }
}

@media screen and (max-width: 799px) {
  .cards {
    padding: 24px 0 8px 0;
  }

  .caption {
     position: relative;
  }
}

</style>