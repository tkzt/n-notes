import fg from 'fast-glob'
import matter from 'gray-matter'

export function getCategories() {
    const docs = fg.sync(['**/*.md', '!**/node_modules'])
    const categories = getBasicCategories(docs);
    return buildTree(docs, categories);
}

function getBasicCategories(docs){
    return docs.filter(d => d.includes('/index.md') && d!=='docs/index.md');
}


function buildTree(docs, categories) {
    return categories.reduce((pre, curr)=>{
        const { data: { title, description } } = matter.read(curr);
        const prefixPath = curr.replace('index.md', '');
        const children = docs.filter(d => d.includes(prefixPath) && !d.includes('/index.md')).map(d=>{
            const { data: { title } } = matter.read(d);
            return {
                title,
                link: d.replace(/(^docs|.md$)/g, ''),
            }
        })
        const category = {
            link: curr.replace(/(^docs|index.md$)/g, ''),
            title,
            description,
            children
        }
        return [...pre, category];
    }, [])
}