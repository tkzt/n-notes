import { defineConfig } from 'vitepress'
import { getCategories } from './docs-util'

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
        socialLinks: [
            {
                icon: {
                    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM112 416c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm157.533 0h-34.335c-6.011 0-11.051-4.636-11.442-10.634-5.214-80.05-69.243-143.92-149.123-149.123-5.997-.39-10.633-5.431-10.633-11.441v-34.335c0-6.535 5.468-11.777 11.994-11.425 110.546 5.974 198.997 94.536 204.964 204.964.352 6.526-4.89 11.994-11.425 11.994zm103.027 0h-34.334c-6.161 0-11.175-4.882-11.427-11.038-5.598-136.535-115.204-246.161-251.76-251.76C68.882 152.949 64 147.935 64 141.774V107.44c0-6.454 5.338-11.664 11.787-11.432 167.83 6.025 302.21 141.191 308.205 308.205.232 6.449-4.978 11.787-11.432 11.787z"/></svg>`
                },
                link: 'https://n-notes-crawling.tkzt.cn/feed.xml'
            }
        ],
        footer: {
            copyright: '<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" class="link-underline">CC BY-NC-SA 4.0 ↗️</a> © 2022-PRESENT <a href="https://tkzt.cn" target="_blank" class="link-underline">Allen Tao ↗️</a>'
        },
        algolia: {
            appId: 'QCKYLKARBM',
            apiKey: '52369651aa7f8e76f02ce3153031f857',
            indexName: 'tkzt',
        }
    }
})

function nav() {
    return macroCategories.map(mc => ({
        text: mc.text,
        activeMatch: mc.path,
        link: mc.path
    }));
}

function sidebar() {
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
