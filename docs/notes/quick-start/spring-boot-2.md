---
title: SpringBoot 速通 2：构建一个 Restful 的服务
titleTemplate: Quick Start
---
# SpringBoot 速通 2：构建一个 Restful 的服务

## 一切始于 Spring Initializr

不论贫穷富贵、皮肤黑白黄灰，所有的 Spring Boot 应用，都应该基于 Spring Initializr。通过 Initializr，你可以非常迅速地拉取应用所需的依赖，并且得到许多初始化配置。举个仅需要 Spring Web 依赖的例子。

如果当你创建项目时，选择 Maven 来进行包管理， 以下的 `pom.xml` 文件将会被生成。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
	<modelVersion>4.0.0</modelVersion>
	<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>2.3.2.RELEASE</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
	<groupId>com.example</groupId>
	<artifactId>rest-service</artifactId>
	<version>0.0.1-SNAPSHOT</version>
	<name>rest-service</name>
	<description>Demo project for Spring Boot</description>

	<properties>
		<java.version>1.8</java.version>
	</properties>

	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>

		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
			<exclusions>
				<exclusion>
					<groupId>org.junit.vintage</groupId>
					<artifactId>junit-vintage-engine</artifactId>
				</exclusion>
			</exclusions>
		</dependency>
	</dependencies>

	<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>

</project>
```

暂时假定不选 Gradle。

## 创建 Model

现在，你已经完成了初始设置，可以开始创建你的 Web 服务了。

从考虑服务如何进行交互开始吧。

首先，服务将处理发向 `/greeting` 的 `GET` 请求，而请求中会带一个可选参数 `name`。然后，服务给这个请求一个状态为 `200 OK`、带有 JSON 形式问候消息的返回。JSON 形如：

```json
{
  "id": 1,
  "content": "Hello, World!"
}
```

显而易见，`id` 字段意指与问候相关联的一个独一无二的标识码，而 `content` 即为问候具体的文本描述。

按照惯例，应当模型化问候的描述，那么你需要创建一个相关的类，于是随手写一个 POJO：

```java
package com.example.restservice;

public class Greeting {

	private final long id;
	private final String content;

	public Greeting(long id, String content) {
		this.id = id;
		this.content = content;
	}

	public long getId() {
		return id;
	}

	public String getContent() {
		return content;
	}

}
```

> 应用中使用 `Jackson JSON` 库进行 Greeting 实例到 JSON 的自动转化，而该库已被 web starter 自动引入了。

## 创建 Controller

众所周知，Controller 负责处理 Spring RESTful 服务中的 HTTP 请求。所谓 Controller，需要通过 `@RestController` 注解进行声明。你比如说，一个处理 `/greeting` `GET` 请求，返回上述 Greeting 实例的例子如下：

```java
package com.example.restservice;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GreetingController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
}
```

这看上去很简单，但是其背后风起云涌、策马奔腾。让我们一步一步来看：

- 首先 `@GetMapping("/greeting")` 注解确保了发向 `/greeting` 路由的 GET 请求能被 `greeting()` 方法处理

> `@GetMapping` 注解表示 GET 请求的路由匹配，相似地，对于 POST 请求，可以使用 `@PostMapping`。更加通用地，可以在 `@RequestMapping` 注解中指定 `method` 参数以表示 GET 请求还是 POST 请求，你比如 `@RequestMapping(method=GET)` 可以同样用来表示匹配 GET 请求。

- 其次，通过 `@RequestParam` 注解，可以将请求中包含的 `name` 参数，转化成函数的 `name` 参数，同时，如果 `name` 在请求中缺省，则将 `World` 作为实参。
- 再次，函数将传入 `id`、`content` 创建一个 Greeting 实例并返回。其中，传入的 id 通过 `AtomicLong` 类的一个实例 `counter` 得到。顾名思义，该 Counter 每次会增加一点，以达到独一无二的效果。而 Content 通过将 `name` 实参填入预先设置好的模板中得到。
- RESTful Web 服务与传统 MVC 模式一个显著区别在于，前者不再是在服务端先依靠某种 View 将数据渲染成 HTML 再返回，而是直接返回一个将会被转化为 JSON 的既定类的实例（本质上返回了一个 JSON 字符串）。
- 再回过头来，上述代码通过 `@RestController` 标注，将类标记为一个将作出 RESTful 返回的控制器（而不是返回一个所谓的 View）。事实上，这个注解同时起到了传统 SpringMVC 应用中，`@Controller` 和 `@ResponseBody` 两个注解的作用。
- 上面提到 RESTful 服务的返回本质是 JSON，而得幸于 Spring 框架对于 HTTP 返回信息转化的支持，上述函数返回的实例会被自动转化为 JSON 字符串。究其根本，是因为 [Jackson 2](https://github.com/FasterXML/jackson) 已经被框架自动包含了，框架中的 `MappingJackson2HttpMessageConverter` 便是为此而生。
- 最后，你还需要创建一个入口类，然后随手写一个 main 函数：

```java
@SpringBootApplication
public class GreetingApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

> 此间的 `@SpringBootApplication` 是一个伟大的注解，它同时起到了传统 Spring App 的 `@Configuration`、`@EnableAutoConfiguration`、`@ComponentScan` 注解的作用。

到这里该服务便开发地差不多了。你会发现过程中没有写一行该死的 `xml` 配置，甚至连那个可恶的 `web.xml` 文件，SB 也一同把它干掉了。这样一来，开发竟是如此的纯粹，心智负担得到了有效减少。

## 创建 JAR 包

自古以来，JAR 包是延续人类文明的关键，我们可以通过它进行传播、更新以及部署，它太重要了。那如何通过 Gradle 或者 Maven 创建出一个呢？你比如说：

- Maven 中，通过执行 `./mvnw clean package`
- Gradle 中，通过执行 `./gradlew build`

## 运行 JAR

你比如说：

```bash
java -jar target/gs-rest-service-0.1.0.jar
```

## 测试服务

在上述启起服务之后，你访问 `http://localhost:8080/greeting`，你将得到如下返回：

```json
{ "id": 1, "content": "Hello, World!" }
```

然后你提供了一个 `name` 值，就像这样 `http://localhost:8080/greeting?name=Foo`，于是你得到：

```json
{ "id": 2, "content": "Hello, Foo!" }
```

## Summary

恭喜，完事。
