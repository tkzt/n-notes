---
title: Git 基操
titleTemplate: 军体拳
---
# Git 基操

## 简介

相较于 SVN 等集中式版本管理工具，Git 其显著特点包括分布式、强大的分支管理、快、简单。其诞生是为了高效且符合开源精神地解决 Linux 源码管理问题，初代由 Linus 历时两周，使用 C 开发。

所谓分布式即每个节点都含有完整仓库，都可以在本地进行版本的更新、回滚，版本的管理不必依赖某一个节点（即集中式管理中的中央节点）。但实际上，为了不同节点更便捷地进行版本的同步，往往会有某个（些）节点充当另一意义上的中央（你比如 github、gitee 等）。Git 的运作看起来像这样：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210312161433791.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70)
<small style="text-align: center; display:block">* PS. from [廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/896043488029600)</small>
## 基本概念

### 版本库（repository）

字面上来看是一个装着所有待管理文件的容器，文件的删除、更新、新增都体现其中。本质上是一个名曰 `.git` 的文件夹，同级目录下所有文件（除去 `.gitignore` 中被点名的文件们）的各个状态都通过某些神奇魔法记录在其中。

### 工作区、暂存区、HEAD

可以将版本库的神奇魔法简单理解为如下所示（所谓工作区即待管理文件所在目录）：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210312161451784.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70)

## 配置

### 安装

略

### name、email、ssh key

初始配置通常包括三项：

#### name

```bash
git config --global user.name "蔡嵩松"
```

最终表现为：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210312161508687.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70)

#### email

```bash
git config --global user.email "css@yunboo.com.cn"
```

这个可以用来统计 contribution 等。

#### ssh 密钥

在同步数据时，身份校验是必不可少的。众所周知，校验方式有两种，https、ssh。这其实是两种协议，前者在推送远端时会显式地要求输入账号名密码（在 coding 中，是 coding 的账号名密码），而后者需事先通过 ssh-keygen （一般而言一路 enter 即可）生成 ssh 公私密钥，然后将公钥填到相关平台的 ssh 配置中。

生成密钥：

```bash
ssh-keygen -t rsa -C "username@domain"

```

windows 下查看公钥：

```bash
notepad ~/.ssh/id_rsa.pub
```

## Get Started

### 初始化仓库

初始化仓库有两种方式：将本地已有的文件夹初始化为 git 仓库、从远端拉取一个已存在的 git 仓库。

#### 从本地文件夹

此种方式需要先在相关平台创建空白的仓库。首先需要在目标文件夹内：

```bash
git init
```

一个 `.git` 文件夹应运而生（实际是在当前目录创建了一个版本库）。而后将需要管理的文件通过 `git add` 命令添加到暂存区，一般而言，初始时会添加当前目录除 `.gitignore` 中指明文件外所有文件：

```bash
git add .
```

而后，例行 first commit（暂存区到本地版本库）：

```bash
git commit -m "first commit"
```

而后，添加远程源：

```bash
git remote add origin https://e.coding.net/yunboo/smartCampus/running-platform.git
```

在一番修改再 add 再 commit 后，推送到远端：

```bash
git push -u origin master
```

其中 `-u` 用于指定本地版本库所在分支的远程上流，是 `--set-upstream` 的简写。

#### 从远程仓库

首先克隆仓库到本地：

```bash
git clone https://e.coding.net/yunboo/smartCampus/running-platform.git
```

在一番修改再 add 再 commit 后，推送到远端：

```bash
git push -u origin master
```

## 基本操作

### add

通过 `git add` ：

- 将工作区文件添加到暂存区（stage）
- 将工作区文件的修改更新到暂存区

后接具体文件、文件夹进行单独、批量的添加（`.` 指当前文件夹所有）。

### commit

通过 `git commit` 将暂存区文件提交到版本库，即一次创建了一个版本。

在提交同时，需要为该版本添加一些备注信息。备注可以通过两种方式来添加：

- `git commit` 其后不接任何命令，会在终端会切换为 vim 编辑器，以便编辑、保存一个 **详细的 commit 说明**。
- `git commit` 后接 `-m` 再接一句 **简洁的说明**，你比如：

```bash
git commit -m "whatever"
```

事实上，commit 时，需要有东西可提交，所谓有东西可提交包括：

- 有此前未添加到暂存区的文件被加入了
- 已经在暂存区的文件发生了更新（包括修改、被删除等等）

这意味着，在 commit 之前往往需要 add 一把，这便可以通过 `-am` 来简化命令（从字面上来看，`-am` 意思是在 commit 时先 add 一把）。但需要注意的是，`-am` 只会提交已在暂存区的文件状态更新，当有新增文件时，仍需要先 add。

另外，可以通过 `git tag` ，为当前版本打上标签。比如 `git tag "hhh"` 之后，通过 `git log` 查看提交日志：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021031216155141.png)

### push

在 commit 之后，在已指定上流的前提下，可以通过 `git push` 命令将本地版本库推送到远端。

在未指定上流时，可以在 push 时加上 `-u` 命令，再接上远端分支，指定上流并提交，你比如：

```bash
git push -u origin master
```

而后远端的 master 分支便成为本地上流，此后的推送只需要 `git push`。

### pull

众所周知，`git pull` 为 `git push` 的相反操作，默认拉取上流最新提交到本地，通过 `git pull origin certain-branch` 拉取远端某个分支最新提交。

### stash

有时，在工作区有修改但未提交的状态下，想拉取提交，或者切换分支，可以先 `git stash` 暂存本地修改到某个神秘空间（看起来本地修改仿佛消失了一样），而后在适宜的时候，`git stash pop` 将暂存放回本地。

### 分支

一个仓库可以有多个分支，直到分支合并前，各个分支独立发展。在版本库中，有一个神奇的 `HEAD 指针`，它指向某个分支，表示当前提交提往何方。

#### 新建分支

我们可以以某个所处分支作为源，创建一个分支：

```bash
git checkout -b "new-branch"
```

也可以不要源，创建一个孤儿分支（创建后工作区文件虽然在已 add 到暂存区，但处于更新未提交状态，可以直接删除某些不要的文件而后再 commit -am，以得到一个新分支的初始提交）：

```bash
git checkout --orphan "new-orphan-branch"
```

#### 切换

通过 `git branch` 命令可以查看当前所有的分支，通过 `git checkout` 可以切换到另一个分支：

```bash
git checkout new-branch
```

#### 拉取远端分支

一般而言，拉取下来的仓库处于默认的 master 分支，想要拉取某个非 master 分支到本地，可以通过：

```bash
git clone -b dev https://e.coding.net/yunboo/smartCampus/running-platform.git
```

所谓 `dev`，便是目标分支。

#### 合并分支

有时，我们想直接将远程某个分支合并到当前分支，那么直接：

```bash
git merge certain-branch
```

#### 冲突

在合并、拉取其他分支时，有可能两个分支都对某文件的某处进行了修改，这样便无法快速合并，便会产生冲突，此时需要手动去解决冲突。

在解决完冲突后，再提交便可。

### 回滚

每次提交都会生成一个 sha1 加密、以 16 进制显示的 `commit id`，你比如，由于时间与地域的关系，我们有如下三次提交：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210312161614379.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTEzNTI5ODg=,size_16,color_FFFFFF,t_70)

由于某些原因，在一番操作之后（工作区有一些更新还未提交）我们需要回到版本 `commit 06818...`。这时，我们可以这样：

```bash
git reset --soft 06818
```

这会保留本地未提交的修改，同时将未修改的文件退回到 06818 版本。

我们也可以：

```bash
git reset --hard 06818
```

这样会干掉本地所有修改，直接退回 06818 版本。

但有时，我们只想干掉中间版本，这时可以通过：

```bash
git revert d89ff
```

这样会触发一次新的提交，只去除某次指定的提交。
