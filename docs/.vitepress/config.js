import { defineConfig, createContentLoader } from 'vitepress'
import { getCategories } from './docs-util'
import { Feed } from 'feed'
import { writeFileSync } from "node:fs"
import { join } from 'node:path'

const macroCategories = [
    {
        text: 'Notes',
        path: '/notes/'
    },
    {
        text: 'Cheap Talks',
        path: '/cheap-talks/'
    },
    {
        text: 'Boring Plans',
        path: '/boring-plans/'
    },
];

export default defineConfig({
    title: 'N Notes',
    description: 'Knowledge has no limit',
    lastUpdated: true,
    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'N Notes',
        nav: nav(),
        sidebar: sidebar(),
        editLink: {
            pattern: 'https://github.com/tkzt/n-notes/edit/main/docs/:path'
        },
        footer: {
            copyright: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="link-underline">CC BY-NC-SA 4.0 ↗️</a> © 2022-PRESENT <a href="https://tkzt.cn" target="_blank" class="link-underline">Allen Tao ↗️</a>'
        },
        algolia: {
            appId: 'QCKYLKARBM',
            apiKey: '52369651aa7f8e76f02ce3153031f857',
            indexName: 'tkzt',
        }
    },
    buildEnd: async (config) => {
        await dumpArticles(config.outDir)
    }
})

function nav() {
    return macroCategories.map(mc => ({
        text: mc.text,
        activeMatch: mc.path,
        link: mc.path
    }));
}

async function sidebar() {
    const formattedCategories = getFormattedCategories();
    return macroCategories.reduce((pre, curr) => ({
        ...pre,
        [curr.path]: formattedCategories.filter(fc => fc.link.includes(curr.path) && fc.items?.length)
    }), {})
}

function getFormattedCategories() {
    return getCategories().map(c => ({
        link: c.link,
        text: c.title,
        collapsible: true,
        items: c.children.map(cr => ({
            text: cr.title,
            link: cr.link
        }))
    }));
}

async function dumpArticles(outDir) {
    const host = "https://n-notes.tkzt.cn"
    const feed = new Feed({
        title: 'N Notes',
        description: '以有涯隨無涯，殆已！已而為知者，殆而已矣！是的，这是一个博客网站。',
        id: host,
        link: host,
        language: 'zh',
        image: `${host}/logo_filled.svg`,
        favicon: `${host}/favicon.ico`,
        copyright: 'Copyright (c) 2022-present, Allen Tao'
    })
    const articles = await createContentLoader('**/*.md', {
        excerpt: true,
        render: true
    }).load()

    articles.sort((a, b) => (+new Date(b.frontmatter.date) || -Infinity) - ((+new Date(a.frontmatter.date) || -Infinity)))

    const articlesJsonArr = []
    articles.forEach(({ html, url, frontmatter, excerpt }) => {
        if (!url.endsWith('/') && frontmatter.title) {
            feed.addItem({
                title: frontmatter.title,
                id: `${host}${url}`,
                link: `${host}${url}`,
                description: excerpt,
                content: html,
                author: [
                    {
                        name: 'Allen Tao',
                        email: 'allen@tkzt.cn',
                        link: 'https://tkzt.cn'
                    }
                ],
                date: frontmatter.date
            })
            articlesJsonArr.push({
                title: frontmatter.title,
                link: `${host}${url}`,
                date: frontmatter.date
            })
        }
    })

    writeFileSync(join(outDir, 'feed.rss'), feed.rss2())
    writeFileSync(join(outDir, 'blogs.json'), JSON.stringify(articlesJsonArr))
}
