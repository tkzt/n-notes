import { defineConfig } from 'vitepress'
import { getCategories } from './docs-util'

const macroCategories = [
    {
        text: 'Notes',
        path: '/notes/'
    },
    {
        text: 'Cheap Talks',
        path: '/cheap-talk/'
    },
    {
        text: 'Boring Plans',
        path: '/boring-plans/'
    },
];

export default defineConfig({
    title: 'N Notes',
    base: '/n-notes/',
    description: 'Knowledge has no limit',
    lastUpdated: true,
    themeConfig: {
        logo: '/logo.svg',
        siteTitle: 'N Notes',
        nav: nav(),
        sidebar: sidebar(),
        editLink: {
            pattern: 'https://github.com/boring-plans/n-notes/edit/main/docs/:path'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/boring-plans' },
        ],
        footer: false
    },
    algolia: {
        appId: 'P30D7LZ51B',
        apiKey: 'ff2fb8be1301d8e9efaa94da359a1355',
        indexName: 'n-notes'
    },
    carbonAds: {
        code: 'CEBDT27Y',
        placement: 'vuejsorg'
    }
})

function nav() {
    const formattedCategories = getFormattedCategories();
    return  macroCategories.map(mc=>({
        text: mc.text,
        activeMatch: mc.path,
        link: formattedCategories.find(fc=>fc.link.includes(mc.path)).items[0]?.link || ''
    }));
}
  
function sidebar() {
    const formattedCategories = getFormattedCategories();
    return macroCategories.reduce((pre, curr)=>({...pre,
        [curr.path]: formattedCategories.filter(fc=>fc.link.includes(curr.path))
    }), {})
}

function getFormattedCategories(){
    return getCategories().map(c=>({
        link: c.link,
        text: c.title,
        collapsible: true,
        items: c.children.map(cr=>({
            text: cr.title,
            link: cr.link
        }))
    }));
}