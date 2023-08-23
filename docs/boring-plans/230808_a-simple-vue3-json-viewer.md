---
title: How a simple Vue3 JSON viewer was made
titleTemplate: Boring Plans
date: 2023-08-08
---

## Preface

Once upon a time, there was a poor guy refactoring an old React Web app, in which a JSON viewer component called `JsonViewer` was used. However, this guy was rebuilding the app on top of Vue3, and unfortunately, there was none such suitable component only providing such simple functions in Vue3 ecology (or at lease that poor guy didn't find such one).

He finally decided to make one.

## A Name

First of all, a proper name was required. After continuously exploring on GitHub for inspiration for about 2hrs, he gave that up. There is no doubt that `JsonViewer` is the best name for such a component, that guy realized that too. And because it is a Vue Component, so of course `VueJsonViewer` is also acceptable. He noticed that as well. However, they all have been taken. This made him mad.

After watching 2 episodes of 「Naruto: Shippuden」, he decided to call it `VueSjv`, a abbreviation for **Vue Simple Json Viewer**. 


## Implementation

### Recursion

Definitely, a JSON viewer is built in a recursive way. It's like:

```html
<json-viewer>
  <!-- direct value -->
  <span>{{key}}</span>: <span>{{value}}</span>
  ...
  <!-- nested value -->
  <span>{{key}}</span>: <json-viewer>{{value}}</json-viewer>
</json-viewer>
```

Here's actually a question. The viewer put together directly in the way above looks like:

![](https://images.tkzt.cn/blog/sjv-simple.png)

It's a little bit ugly, unless you are a crazy Python fan.


### Teleport

What then springs into my mind is the built in component `teleport`. We can transfer the nested value out to the right behind position of parent node, to try to shrink the ugly indentation.

To explicitly explain, take array element as an example (also recursively):

```html
<teleport :to="teleportTo" :disabled="!teleportTo">
  <div class="relative pl-9.5px">
    <div v-for="item, index in modelValue" :key="index" class="flex pl-15px flex-col">
      <div class="flex">
        <div class="mr-2 c-indigo-600">
          {{ index }}:
        </div>
        <simple-json-viewer :model-value="item" :depth="depth + 1"
          :ref="(node) => { updateChildrenRef(node as ChildrenRefType, index) }"
          :initial-expanded-depth="initialExpandedDepth"
          :teleportTo="teleportMap['arr-' + index]" />
      </div>

      <!-- teleport destination -->
      <div :ref="elem => updateTeleportMap(elem as HTMLElement, 'arr-' + index)"></div>
    </div>
  </div>
</teleport>
```

### Value Copying

Last but not least, a just-right JSON viewer component should provide the feature to conveniently copy value.

Actually, to build a feature like that, you can always trust [`VueUse`](https://vueuse.org/).

Hover to display the copy button:

```html
<script setup>
// imports omitted
const { isOutside } = useMouseInElement(itemRef)
</script>
<template>
  ...
  <div :class="buttonCls" v-if="!isOutside">
    <i size="12" class="i-mdi-content-copy"></i>
  </div>
  ...
</template>
```

Click to copy content:

```js
function copyContent(content: unknown) {
  // determine the final content to copy according to the type
  const type = getValueType(content)
  const contentStr = (type === 'string' ? content : JSON.stringify(content) || type) as string

  const clipboard = useClipboard()
  clipboard.copy(contentStr)
}
```

### Others

Other tech used:

- [UnoCSS](https://unocss.dev/)


## Links

- a [DEMO](https://sjv.tkzt.cn/)
- the [REPO](https://github.com/tkzt/vue-sjv)


That's it.