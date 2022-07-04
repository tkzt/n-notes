---
title: SpringBoot 速通 1：Hello, Spring Boot
titleTemplate: Quick Start
---
# SpringBoot 速通 1：Hello, Spring Boot


## 楔子

因为时间与地域的关系，陶某于 2020 年 10 月 27 日开始系统学 SpringBoot。由于出发点远不是**爱**，故这场学习将无与伦比地枯燥、艰辛、充满矛盾。但贫苦布衣的人生本就如此。

“你是否愿意学习 SB，无论是顺境或逆境，富裕或贫穷，健康或疾病，快乐或忧愁，你都将毫无保留地爱她，对她忠诚直到永远？”

...

## Spring 必要基础知识点

由于 Java 历史之悠久、Spring 框架之繁荣，使用 Spring Boot 时，不得不预先掌握一些通用概念。包括但不限于：

### Java Bean 与 POJO 与 Spring Bean

Java Bean 诞生在很久很久以前，那个桌面应用开发百花齐放的时代。其出生的本意是，通过编写**符合既定规范的类**，利用**运行时可以读取到类全部属性的技术（也就是反射）**，实现诸如 Button、TextArea、Text 等等可视化组件的封装，以便进行类似于某 Basic 拖拽式桌面应用开发。而此间的 `符合既定规范的类` 便是 Java Bean，它首先是一个 Java 类，其次需要满足一些既定规范：

- 具有一个无参构造函数
- 所有属性都声明为 `private`，通过声明为 `public` 的形如 `getCertainAttr` 的 getter 方法获取属性、形如 `setCertainAttr` 的 setter 方法设置属性。特殊地，布尔类型的 getter 方法形如 `isCertainAtrr`。
- 可序列化（继承自 Serializable，本意为了保存组件状态，以便还原状态（比如保存、关闭后，再次打开项目），继续开发）

当然，在桌面组件化开发的市场上，Java 不是很成功（主要是 Sun 公司），但 Java Bean 是无辜的，好不容易编的一套规范，也许可以放在服务端开发上。于是 Java Bean 成了 MVC 中的 M，主要用以传递数据、更方便地与持久层互动。但由于 Java Bean 过分轻量，与我 Sun 堂堂 企业级应用 格格不入（需要开发者去反复地自行实现一些简单、低级的功能），这无疑增加了高贵的、只想关注业务逻辑的企业级应用开发者们的心智负担，于是基于 JB，更加周到的 EJB（Enterprise Java Bean）应运而生。

然而，周到的代价是繁琐，很快，EJB 就失去了贪婪但懒惰的人们的宠爱。更有甚者，高调吹捧 `Plain Old Java Object`（也有言曰 `Plain Ordinary Java Object`，意译过来就是，平淡无奇的 Java 对象），想要来一场 Java 届的伟大的文艺复兴。按照业界共识，一个 POJO 无需遵循 Java Bean 的上古规范，理应淋漓尽致地体现 `plain`：

- 属性声明为 `private` ，通过 `public` 的 getter 、setter 方法获取、设置属性
- 不继承自任何类
- 不实现任何接口
- 不被任何框架侵入

理想状态下，POJO 用于数据传递，以便更自如地与 DAO 层（也就是持久层）交互。

后来，作为革命的一方里程碑，一个叫 Spring 的框架出生了。该框架通过自带的 `Spring 容器`，对对象进行管理，再辅助以 IOC、AOP 技术，既避免了繁琐，又保障了安全、减少了心智负担（既可以贪，又可以懒）。而此间的类，无需规范，不管你 POJO 不 POJO、EJB 不 EJB，只要能为容器所管理即可。同时，出于爱与敬意，此间的类也被叫做 Bean，又为人唤作 `Spring Bean`。

此外，Java 世界的 Bean 取其 `咖啡豆` 之意，妙哉。

### IOC

所谓 `IOC`，即 Inversion Of Control，直译为`控制反转`。所谓反转，可以理解为 转变原本的 A Call B，为 A Wait For B。原本 A 中想要使用 B 中的功能，需要自行实例化 B，这样的缺点在于，一旦 B 有所改变（方法等调用方式有所变更），迫使 A 也要修改。而有了 IOC，类与类间的依赖统一交由容器进行管理，类与类间解耦，故又被叫作 `依赖注入`。

### AOP

所谓，AOP 即 Aspect Oriented Programming，直译为 `面向切面编程`。此前，对于一些重复的 日志记录、事务书写 的过程，开发者们需要一遍一遍地复制粘贴。此后，通过动态代理技术，这些过程宛如立身于一个切面，不在三界之中，独善五行之外。

## 关于 Spring Boot

### 概览

使用大于六级的水平，意译官网的 overview 中关于 SB 的介绍为：

> SB 使得创建 可独立运行、生产级、基于 Spring 框架的应用 变得~~巨几把~~简单，你所要做的，仅仅是运行应用而已。
>
> 简而言之，我们从 减少心智负担 出发，整合了 Spring 框架与一些三方库，以便你可以以最少的配置进行 Spring 应用开发。

总之，主张“约定优于配置”的 Spring Boot，使 Spring 开发无比简洁、极其快速。

### 特性

- 创建可独立运行的 Spring 应用
- 内置 Tomcat、Jetty 或 Undertow，无需部署 WAR 文件
- 提供解放双手、简化构建配置的 `starter`
- 自动、即时地配置 Spring 框架、三方库
- 提供 准生产 的特性，你比如度量指标、健康检查、加载配置信息
- 绝无代码生成，绝不需 xml 配置

### 参考

- [Java 帝国之 Java bean (上）](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513115&idx=1&sn=da30cf3d3f163d478748fcdf721b6414#rd)
- [Java 帝国之 Java bean（下）](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665513118&idx=1&sn=487fefb8fa7efd59de6f37043eb21799#rd)
