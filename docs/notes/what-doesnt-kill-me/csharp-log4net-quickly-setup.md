---
title: C# 如何在五分钟之内愉快地开始使用 log4net
titleTemplate: 那些杀不死我的
---
# C# 如何在五分钟之内愉快地开始使用 log4net

## 简单来说

据说：

> [Inserting log requests into the application code requires a fair amount of planning and effort.](http://logging.apache.org/log4net/release/manual/configuration.html)

但这不准确，对于我们彩笔玩家而言，输出 log 就好比必要时人们戴的无镜片眼镜一样，往往只是为了好看。

## 共五分钟

### 第一分钟

打开[这个](http://logging.apache.org/log4net/release/manual/configuration.html)网页。

### 第二分钟

假设刚好你的项目也是个 `ConsoleApplication` 或者 `WindowsFormsApplication`，那么这时：

1. 按下 `shift` + `ctrl` + `A`
2. 左侧展开 _Visual C#_ 项大纲，点击 `常规`，在右侧的具体项中找到 `应用程序配置文件`
3. 绞尽脑汁为配置文件起一个美妙的名字，虽然大家都习惯性地叫它 `log4net.config`
4. 点击 `添加` 按钮

### 第三分钟

这时，从之前打开的网页中，复制类似于：

```xml
<log4net>
    <appender name="RollingFile" type="log4net.Appender.RollingFileAppender">
      <file value="../../Logs/" />
      <appendToFile value="true" />
      <maximumFileSize value="100KB" />
      <maxSizeRollBackups value="2" />
      <StaticLogFileName value="false" />
      <DatePattern value="yyyyMMdd_recor\d.lo\g"/>
      <RollingStyle value="Date"/>

      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%level] (%logger:%line) - %message%newline" />
      </layout>
    </appender>

    <root>
      <level value="DEBUG" />
      <appender-ref ref="RollingFile" />
    </root>
</log4net>
```

以及：

```xml
<configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler"/>
</configSections>
```

的内容到方才新建的一般被叫做 `log4net.config` 的配置文件的 `<configuration></configuration>` 中，之后我们的配置文件看起来像这样：

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler"/>
  </configSections>
  <log4net>
    <appender name="RollingFile" type="log4net.Appender.RollingFileAppender">
      <file value="../../Logs/" />
      <appendToFile value="true" />
      <maximumFileSize value="100KB" />
      <maxSizeRollBackups value="2" />
      <StaticLogFileName value="false" />
      <DatePattern value="yyyyMMdd_recor\d.lo\g"/>
      <RollingStyle value="Date"/>

      <layout type="log4net.Layout.PatternLayout">
        <conversionPattern value="%date [%level] (%logger:%line) - %message%newline" />
      </layout>
    </appender>

    <root>
      <level value="DEBUG" />
      <appender-ref ref="RollingFile" />
    </root>
  </log4net>
</configuration>
```

假设你恰好也更关注日志的本地输出，那么这时我们需要绞尽新的脑汁，思考一下将输出的日志文件的名字，以及日志的输出样式，以及日志输出的位置。如上的配置文件随后将输出的日志文件的名称是当前 `年年年年月月日日` 加 `下划线` 加 `record.log`，之所以有斜杠是因为 `g` 以及 `d` 在 `DatePattern ` 中会被转义。这时我们的日志样式差不多像这样：

```js
2019-08-28 11:33:41,786 [DEBUG] (ConsoleApplication1.Program:23) - test
```

### 第四分钟

配置文件已经就绪，差不多了。打开 `App.config` 或者 `app.config`，在 `<configuration></configuration>` 中添加类似于：

```xml
<appSettings>
  <add key="log4net.Config" value="../../log4net.config"/>
</appSettings>
```

的 appSettings。若按上述新建 `log4net.config`，则 log4net.Config 对应的 `value` 是 "../../log4net.config"，这个相对路径是相对于项目下 `bin\Debug` 而言的，之前的日志输出路径也是同理。

### 第五分钟

假设我们的类一如既往地叫“Program”，那么一次华丽地日志输出将类似于：

```csharp
private static readonly ILog log = LogManager.GetLogger(typeof(Program));
static void Main(string[] args)
{
    log.Debug("test");
    Console.ReadLine();
}
```

当然，输出的日志叫 `20190828_record.log`，输出的内容类似于：

```js
2019-08-28 11:33:41,786 [DEBUG] (ConsoleApplication1.Program:23) - test
```

## Time Up

就酱。
