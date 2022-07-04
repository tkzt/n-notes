<script setup>
import { useData } from 'vitepress'
import Home from './Home.vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

const { frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <home v-if="frontmatter.layout==='home'" />
  <layout v-else />
</template>
