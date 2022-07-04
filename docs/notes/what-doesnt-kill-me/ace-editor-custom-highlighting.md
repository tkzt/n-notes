---
title: Ace Editor 自定义高亮
titleTemplate: 那些杀不死我的
---
# Ace Editor 自定义高亮

## Preface

这次的副本是基于 [ACE](https://ace.c9.io/) DIY 一个 SQL 编辑器，现阶段主要要支持（也就是高亮）所有 Hive 关键词。

## Analysis

众所周知，ACE 默认支持了很多模式（比如 sql、JavaScript 等等），但这些模式只会高亮特定的一些关键词，当我想要高亮额外的关键字时（比如我在 `sql` 模式想高亮 `HIVE` 中的 `MSCK`），则需要配置一番。

## Show Code

比如，当我们在一个 VUE APP 中（Vue2），`yarn add ace-builds` 安装了 ACE 之后，一个在 `sql 模式`、`sqlserver 主题` 下，扩充了 `MSCK` 关键字的例子如下：

```html
<template>
  <div ref="editor" style="height: 400px; width: 500px"></div>
</template>
<script>
  import ace from "ace-builds";
  import "ace-builds/webpack-resolver";
  import "ace-builds/src-noconflict/mode-sql";
  import "ace-builds/src-noconflict/theme-sqlserver";

  export default {
    data: () => ({
      editor: null,
    }),
    mounted() {
      this.initializeEditor();
    },
    beforeDestroy() {
      if (this.editor) {
        this.editor.destroy();
        this.editor.container.remove();
      }
    },
    methods: {
      initializeEditor() {
        this.editor = ace.edit(this.$refs["editor"], {
          theme: "ace/theme/sqlserver",
        });

        const session = this.editor.session;
        session.setMode("ace/mode/sql", function () {
          const rules = session.$mode.$highlightRules.getRules();
          for (const stateName in rules) {
            rules[stateName].unshift({
              token: "keyword",
              regex: "msck",
              caseInsensitive: true,
            });
          }
          // force recreation of tokenizer
          session.$mode.$tokenizer = null;
          session.bgTokenizer.setTokenizer(session.$mode.getTokenizer());
          // force re-highlight whole document
          session.bgTokenizer.start(0);
        });
      },
    },
  };
</script>
```

其中，关键部分在于：

```javascript
session.setMode("ace/mode/sql", function () {
  const rules = session.$mode.$highlightRules.getRules();
  for (const stateName in rules) {
    rules[stateName].unshift({
      token: "keyword",
      regex: "msck",
      caseInsensitive: true,
    });
  }
  // force recreation of tokenizer
  session.$mode.$tokenizer = null;
  session.bgTokenizer.setTokenizer(session.$mode.getTokenizer());
  // force re-highlight whole document
  session.bgTokenizer.start(0);
});
```

简单来说，regex 是字符串或者正则表达式，用于匹配内容的一部分。而 token 用于标识 regex 命中的这部分的高亮规则，它可以是字符串或者是函数（输入为命中内容，输出为规则标识）。

需要注意的是，虽然 regex 可以是诸如 `[a-zA-Z_$][a-zA-Z0-9_$]*\\b` 正则表达式，但实践表明，无论是 `/msck/i` 还是 `(?i)msck` 还是 `new Regex('msck', 'i')` 都无法生效，最终经过不懈 google，发现忽略大小写的匹配需要通过如上述代码中的 `caseInsensitive` 属性来设置。

通过阅读源码不难发现，各个模式下会预先配置一些高亮规则，通常包括关键字、运算符、类型等等，而 token 便是用于将内容对应到高亮规则上的。换句话说，token 会作为最终高亮的类别依据，具体而言，会体现在一个形如 `ace_token_name` 的 css class 上。而我们的目的是使得 `msck` 像关键词那样高亮，故直接用模式中已经定义的 `keyword` 作为 token。而如果想要自定义高亮的样式，可以将 token 命名成某个自定义的名称，比如 'customized-keyword'，而后通过 css 类 `ace_customized-keyword` 来自定义样式。

## Reference

- [How do I add new highlight rules at runtime with Ace Code Editor?](https://stackoverflow.com/questions/39353174/how-do-i-add-new-highlight-rules-at-runtime-with-ace-code-editor)
- [ace editor non capturing group issue](https://stackoverflow.com/questions/25213824/ace-editor-non-capturing-group-issue)
