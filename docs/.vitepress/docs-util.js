import fg from 'fast-glob'
import matter from 'gray-matter'

export function getCategories() {
    const docs = fg.sync(['**/*.md', '!**/node_modules'])
    const categories = getBasicCategories(docs);
    return buildTree(docs, categories);
}

function getBasicCategories(docs){
    return docs.filter(d => d.includes('index.md') && d!=='docs/index.md');
}


function buildTree(docs, categories) {
    return categories.reduce((pre, curr)=>{
        const { data: { title } } = matter.read(curr);
        const prefixPath = curr.replace('index.md', '');
        const children = docs.filter(d => d.match(new RegExp(prefixPath+'[^/]*?.md')) && !d.includes('/index.md')).map(d=>{
            const { data: { title } } = matter.read(d);
            return {
                title,
                link: d.replace(/(^docs|.md$)/g, ''),
            }
        })
        const category = {
            link: curr.replace(/(^docs|index.md$)/g, ''),
            title,
            children
        }
        return [...pre, category];
    }, []).sort((a, b)=>a.title>b.title?-1:1)
}