---
title: 关于 nginx 中 root、alias、proxy_pass 请求的实际路径
titleTemplate: 掉落
---
# 关于 nginx 中 root、alias、proxy_pass 请求的实际路径

## 前言

最近有和 nginx 作斗争，一些掉落如下。

### root 与 alias

#### 当如下配置时：

```js
listen 1997;

location /img {
    root img/sky;
}
```

访问 ``http://ip:1997/img/morning.jpg``，其实访问 ``http://ip:1997/img/img/sky/morning.jpg``。

#### 而如下配置时：

```js
listen 1997;

location /img {
    alias img/sky;
}
```

访问 ``http://ip:1997/img/morning.jpg``，其实访问 ``http://ip:1997/img/sky/morning.jpg``。


### proxy_pass

#### 当如下配置时：

```
listen 1997;

location /img/sky {
    proxy_pass http://ip_another:port_another;
}
```

访问 `http://ip:1997/img/sky/morning.jpg`，代理到 `http://ip_another:port_another/img/sky/morning.jpg`。

#### 当如下配置时：

```
listen 1997;

location /img/sky {
    proxy_pass http://ip_another:port_another/;
}
```
访问 `http://ip:1997/img/sky/morning.jpg`，代理到 `http://ip_another:port_another/morning.jpg`。

#### 而当如下配置时：

```
listen 1997;

location /img/sky {
    proxy_pass http://ip_another:port_another/static/imgs/;
}
```

访问 ``http://ip:1997/img/sky/morning.jpg``，其实访问 ``http://ip_another:port_another/static/imgs/morning.jpg``。

#### 而当如下配置时：

```
listen 1997;

location /img/sky {
    proxy_pass http://ip_another:port_another/static/imgs;
}
```

访问 ``http://ip:1997/img/sky/morning.jpg``，其实访问 ``http://ip_another:port_another/static/imgsmorning.jpg``。

## 后语

带不带 `/` 很重要。