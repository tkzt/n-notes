---
title: 奇技淫巧
titleTemplate: 军体拳
date: 2018-11-20
---

## Preface

用于收集若干细碎搬砖技巧。

## 1 - Windows 批处理中 cd 到 .bat 所在路径

```bash
@echo off
cd /d %~dp0
echo %cd%
```

## 2 - Windows Powershell 中禁止执行脚本

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 3 - Div 内竖直居中的一种实现

如下：

```html
<style>
  .container {
    height: 10vh;
    width: 10vw;
    display: table-cell;
    vertical-align: middle;
    background-color: #000;
    color: #eaeaea;
  }
  .content {
    background: #f00;
    height: 5vh;
  }
</style>
<div class="container">
  <div class="content"></div>
</div>
```

## 4 - Bat 脚本知识两则

### 后台运行

```bash
start /b somename.exe
```

### 杀死 nginx.exe

```bash
taskkill /im nginx.exe /f
```

## 5 - git ssh 三连

### 开局常规操作

```bash
git config --global user.name "username"
git config --global user.email "username@domain"
ssh-keygen -t rsa -C "username@domain"
```

一路 enter，而后可查看 ssh key：

```bash
cat ~/.ssh/id_rsa.pub
```

其中 `username@domain` 为托管平台的登录账号。例如托管平台为 Github 时，可以通过：

```bash
ssh -T "git@github.com"
```

测试是否关联托管平台成功：

![](/shell-check-ssh-git.png)
