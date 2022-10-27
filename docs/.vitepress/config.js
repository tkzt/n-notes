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
            pattern: 'https://github.com/boring-plans/n-notes/edit/main/docs/:path'
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/boring-plans' },
            { 
                icon: {
                    svg: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M9.82,13.87C10.89,13.87 11.77,14.74 11.77,15.82A1.95,1.95 0 0,1 9.82,17.77C8.74,17.77 7.87,16.89 7.87,15.82C7.87,14.74 8.74,13.87 9.82,13.87M14.5,3.34L15.18,3.31C18.94,3.31 22,6.37 22,10.13L21.95,10.95L20.76,10.58L20.78,10.13C20.78,7.04 18.27,4.53 15.18,4.53L14.83,4.54L14.5,3.34M15.32,6.23C17.38,6.3 19.05,8 19.08,10.06L17.84,9.68C17.65,8.56 16.78,7.68 15.67,7.5L15.32,6.23M2,15.41C1.97,14.8 2.07,12.64 4.95,9.97C8.35,6.81 9.82,7.05 9.82,7.05C9.82,7.05 13,6.75 11.06,10.46H11.13C11.6,9.96 12.62,9.21 14.69,9C16.77,8.79 16.77,10.5 16.5,11.7C18.38,12.64 19.56,14.03 19.56,15.58C19.56,18.4 15.63,20.69 10.78,20.69H10.65L10.5,20.69C7,20.69 4,19.42 2.71,17.59C2.25,16.97 2,16.29 2,15.58V15.41M9.82,11.92C6.59,11.92 3.97,13.67 3.97,15.82C3.97,17.97 6.59,19.72 9.82,19.72C13.05,19.72 15.67,17.97 15.67,15.82C15.67,13.67 13.05,11.92 9.82,11.92Z" />
                        </svg>`
                }, 
                link: 'https://weibo.com/u/5267060694'
            }
        ],
        footer: false,
        algolia: {
            appId: 'QCKYLKARBM',
            apiKey: '52369651aa7f8e76f02ce3153031f857',
            indexName: 'tkzt',
        }
    }
})

function nav() {
    return  macroCategories.map(mc=>({
        text: mc.text,
        activeMatch: mc.path,
        link: mc.path
    }));
}
  
function sidebar() {
    const formattedCategories = getFormattedCategories();
    return macroCategories.reduce((pre, curr)=>({...pre,
        [curr.path]: formattedCategories.filter(fc=>fc.link.includes(curr.path)&&fc.items?.length)
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
