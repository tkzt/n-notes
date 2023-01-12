---
title: MQTT 基础速通
titleTemplate: Quick Start
date: 2020-09-29
---

## 概览

所谓 MQTT 即 Message Queuing Telemetry Transport，译为 `消息队列遥测传输协议`。

其特点如下：

- 是一种基于 `发布/订阅（publish/subscribe）` 模式的"轻量级"通讯协议
- 基于 TCP/IP 协议
- 支持 QoS（Quality of Service，指一个网络能够利用各种基础技术，为指定的网络通信提供更好的服务能力，是网络的一种安全机制， 是用来解决网络延迟和阻塞等问题的一种技术（百度百科））
- 报文小，开销低，带宽占用低

## 发布/订阅模式

MQTT 中，broker 负责依据 topic 中转 publisher 发布的信息给 subscriber。MQTT 中的 topic 不需要预先建立，发布者发送消息到某个主题、订阅者订阅某个主题的时候，broker 就会自动创建这个主题。另外，topic 是有层级的，层级支持通配符：`+ `与 `#`：

- `+` 通配单层，比如 `news/+` 可以匹配 `news/sports`，`news/+/basketball` 可匹配到 `news/sports/basketball`
- `#` 通配多层，比如 `news/#` 可以匹配 `news`、 `news/sports`、`news/sports/basketball` 以及 `news/sports/basketball/x` 等等

## 报文

MQTT 的消息主要由三部分组成：固定长度头部、可变长度头部、payload。

| 组成部分     | 说明                            |
| ------------ | ------------------------------- |
| 固定长度头部 | 占 2 字节大小，所有消息中均存在 |
| 可变长度头部 | 某些类型的消息中存在            |
| payload      | 某些类型的消息中存在            |

MQTT 的主要消息类型有：

- CONNECT / CONNACK - connect
- PUBLISH / PUBACK - publish
- SUBSCRIBE / SUBACK - subscribe
- UNSUBSCRIBE / UNSUBACK - unsubscribe
- PINGREQ / PINGRESP - ping（心跳）
- DISCONNECT - disconnect

特殊地，PINGREQ / PINGRESP 和 DISCONNECT 两种消息没有可变头部、payload，其大小只有 2 字节。另外，在 CONNECT 报文的可变长度头部里，有个 Protocol Version 的字段。为了节省空间，只有一个字节。所以版本号不是按照字符串 "3.1.1" 存放的，而是使用数字 4 来表示 3.1.1 版本。

### QoS

针对不同的场景，MQTT 设计了 3 个 QoS 等级：

- QoS0 至多一次 - 是一种 "fire and forget" 的消息发送模式：Sender (可能是 Publisher 或者 Broker) 发送一条消息之后，就不再关心它有没有发送到对方，也不设置任何重发机制。适用于环境传感器数据传输等，丢失一次记录无所谓，因为很快会有新的数据上报。

- QoS1 至少一次 - 包含了简单的重发机制，Sender 发送消息之后等待接收者的 ACK，如果没收到 ACK 则重新发送消息。这种模式能保证消息至少能到达一次，但可能会因此产生重复消息。

- QoS2 只有一次 - 设计了 [略微复杂](https://docs.emqx.io/broker/v3/en/protocol.html#qos2-message-publish-and-subscribe) 的重发和重复消息发现机制，保证消息到达对方并且严格值到达一次，适用于计费系统中。

## 会话保持

MQTT 协议通过在 connect 报文里，配置 `keepalive` 字段，来设置心跳包（PINGREQ/PINGRESP）的发送时间间隔。当长时间无法收到设备的 PINGREQ 的时候，broker 就会认为设备已经下线。因此，keepalive 可以察觉异常的同时，亦可以达到会话保持的作用。

此外，在 CONNECT 报文里设置 `CleanSession` 字段为 False 的设备，断线后重新上线后，则 broker 会将存储的：

- 设备所有的订阅
- 还未被设备确认的 QoS1 和 QoS 消息
- 设备离线时错过的消息

发送给其。

## 遗嘱机制

MQTT 设计了遗愿（Last Will、Testament） 消息，让 Broker 在发现设备异常下线的情况下，帮助设备发布一条遗愿消息到指定的主题。

实际上在某些 [MQTT 服务器](https://www.emqx.io/cn/products/broker) 的实现里 (比如 EMQ X)，设备上线或下线的时候 broker 会通过某些系统主题发布设备状态更新，更符合实际应用场景。

## 参考

- [MQTT 协议是什么](https://juejin.im/post/6844904205463879688)

- [MQTT 入门介绍](https://www.runoob.com/w3cnote/mqtt-intro.html)
