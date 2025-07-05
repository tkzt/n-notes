---
title: FRP 配置记录
titleTemplate: 掉落
date: 2025-07-05
---

由于 WFH，近几个月经常通过 [FRP](https://github.com/fatedier/frp) 远程到内网里，最近阿里云的机器到期了，重新部署的时候发现新版本配置不太适用了。在此帖下目前（v0.62.1）用的配置。

## FRPS

```toml
bindPort = 7000

webServer.addr = "0.0.0.0"
webServer.port = 7500
webServer.user = "<ADMIN_WEB_USER>"
webServer.password = "<ADMIN_WEB_PWD>"

auth.method = "token"
auth.token = "<TOKEN_FOR_CONN>"
```

## FRPC

```toml
serverAddr = "<SERVER_IP>"
serverPort = 7000

[[proxies]]
name = "rdp"
type = "tcp"
localIP = "<INTERNAL_IP>"
localPort = 3389
remotePort = 12389
```

这边的 `INTERNAL_IP` 在远程机器有多个网卡情况下，对应的应当是内网 DHCP 分配的 IP。
