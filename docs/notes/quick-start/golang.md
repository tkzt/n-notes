---
title: Golang 基础语法速通
titleTemplate: Quick Start
---
# Golang 基础语法速通

## 概览

- go 属于 c 家族
- go 不是 oop 语言
- go 严格统一编码风格
- go 是静态语言，编译后，生成机器可运行的二进制指令
- go 原生支持 Unicode，天生采用 utf-8 编码（go 的作者之一 为 utf-8 编码的作者）
- go 天生支持并发
- go 自带内存管理、GC 机制，这意味着 go 其实运行在某种意义上的虚拟机上
- go 没有引用传递（当然，有引用类型）
- go 中有指针，但不支持指针运算，这避免了一些潜在的 bug（可见于 c/c++ 程序中）
- go 很快（尤其编译，默认静态编译，所以另一方面会导致编译出的二进制文件体积较大）

## 数据类型

| 类型       | 关键词                                                       |
| ---------- | ------------------------------------------------------------ |
| 布尔型     | bool                                                         |
| 字符型     | string                                                       |
| 整型       | int、int8、int16、int32、int64                               |
| 无负号整型 | uint、uint8、uint16、uint32、uint64、uintptr（用于存储指针） |
| 浮点型     | float32、float64                                             |
| 字节型     | byte（uint8 的别名）                                         |
| rune 型    | rune（int32 的别名）                                         |
| 复数型     | complex64、complex128                                        |

其中，字节型主要用以处理 ascii 字符，你比如：

```go
var foo byte = 128
bar := string(foo)
fmt.Println(bar)
```

![example_byte](/type_byte_example_output_2.png)

而如尼型主要用以处理 unicode 字符，你比如：

```go
var foo rune = 23628
bar := string(foo)
fmt.Println(bar)
```

![image-20200930101307901](/type_rune_example_output.png)

众所周知，ascii 编码中的字符占 1 字节、unicode 中占 2 字节，而作为 unicode 一种可变长实现的 utf-8，虽然字符所占字节数不定，但是中文通常占 3 字节。在 golang 中，string 类型是一种值类型，其本质是只读的 `byte 数组的切片`，所以，当 `len` 作用在一个字符串上时，默认是得到其底层 byte 数组的 length，再加上 golang 默认编码 utf-8，所以你比如：

```go
foo := "屌"
fmt.Println(len(foo)) // 3
```

那么想要得到类似于 python 中 len 的效果，则可以这样：

```go
foo := "屌"
fmt.Println(len([]rune(foo))) // 1
```

或者欲得到字符串长度，也可以此般：

```go
foo := "屌"
fmt.Println(utf8.RuneCountInString(foo)) // 1，需要 import "unicode/utf8"
```

此外，由于 string 类型为值类型，其零值为空字符串而非 nil。

另外，golang 全然不允许 **隐式类型转换** ，只支持 **显式类型转换**， **别名类型** 与 **原有类型** 之间也不行。你比如：

```go
var foo int32 = 18
var bar int
bar = foo      // 隐式类型转换，会报编译错误错误。
bar = int(foo) // 显式类型转换，成功。
```

此外，在 golang 中：

- 值类型包括 int、float、bool、string、struct 以及数组
- 引用类型包括指针、切片、map、chan（通道）

再外，可以通过 `math.MaxInt64`、`math.MinInt64` 的方式得到预定义的某类型最大最小值。

## 变量

一个平淡无奇的变量声明如下：

```go
var foo string = bar
```

其中，`bar` 可以为表达式或者字面量。

另外，`string` 和 `bar` 可以有一者省略，比如：

```go
var foo = bar
```

go 会根据 `bar` 自动推断 foo 的类型，再如：

```go
var foo string
```

在没有指定初值的情况下，go 会自动以零值初始变量。至于零值，可想而知，数字类型的零值为 0，字符串的零值为 ""，布尔的零值为 false，指针的零值为 nil。而对于引用类型来说，所引用的底层数据结构会被初始为对应的零值，但是被声明为其零值的引用类型的变量，会返回 nil 作为其零值。

而当声明局部变量时，崇尚 `大道至简` 的 golang，则可以这样：

```go
foo := bar
```

此外，多个变量的声明可以这样：

```go
var (
		foo = 12
		bar = 13
	)
fmt.Println(foo, bar) // 12 13
```

## 常量

golang 中常量只能是数字、字符串、布尔值，其声明就像这样：

```go
const foo = 10086
```

同样也可以批量声明，你比如：

```go
const (
  foo        = 123
  bar string = "淦"
)
```

另外，golang 中除了 true、false、nil 之外，还有一个名曰 `iota` 的常量，其意指微量、极少量，在常量声明时可用以生成连续常量：

```go
const (
  foo = iota + 1
  bar
)
fmt.Println(foo, bar) // 1 2
```

或者连续位移：

```go
const (
  foo = 2 << iota
  bar
)
fmt.Println(foo, bar) // 2 4
```

## 数组与切片

### 数组

golang 中的数组为 c 语言意义上的数组，长度在声明后不可变，你比如：

```go
var foo [2]string = [...]string{"123", "456"}
// 局部可简化为
// foo := [...]string{"123", "456"}
```

数组间可以直接判断是否相等，你比如：

```go
foo := [...]int{1, 2, 3}
bar := [...]int{1, 3, 2}
biu := [...]int{1, 2, 3}
fmt.Println(foo == bar, foo == biu) // false true
```

### 切片

#### 切片的声明

而切片（slice）则是数组的一个扩展，是一种引用类型，其本质是一个指向某数组的 `胖指针`，可以通过如下方式进行声明：

##### 字面量方式

```go
foo := []string{"123", "456"}
```

##### make 方式

```go
foo := make([]string, 10, 100)
```

通过 `make` 进行切片声明时，需提供类型、长度，也可以提供容量，当容量缺省时，默认容量与长度相等。

#### 切片的长度与容量

其底层实现包含了三个必要元素：指向底层数组的指针、切片长度、切片容量。通过内置函数 `len` 以及 `cap` 可以获取到切片的长度与容积。通过一个例子可以更清晰地理解长度、容量究竟为何物：

```go
foo := []string{"123", "456", "789", "101112"}
bar := foo[1:3]       // {"456", "789"}
fmt.Println(len(bar)) // 2
fmt.Println(cap(bar)) // 3
```

声明时不指定 end index，则容量为切片底层数组 start index（此例的 1） 到最后元素的个数。当然，声明时是可以指定 end index 的，比如：

```go
foo := []string{"123", "456", "789", "101112"}
bar := foo[1:3:3]     // {"456", "789"}
fmt.Println(len(bar)) // 2
fmt.Println(cap(bar)) // 2
```

#### 切片修改

此外，既然切片是引用类型，则通过其对值进行的修改，最终会作用到底层数组上，那么可想而知，其他基于该数组的切片也会受到影响，这意思是：

```go
foo := []string{"123", "456", "789", "101112"}
bar := foo[1:3] // ["456", "789"]
biu := foo[2:4] // ["789", "101112"]
bar[1] = "七八九"
fmt.Println(foo) // ["123", "456", "七八九", "101112"]
fmt.Println(bar) // ["456", "七八九"]
fmt.Println(biu) // ["七八九", "101112"]
```

同样的道理，当切片作为参数传递的时候，类似于 c/c++ 中的指针传递（本质上也是一种值传递），所做的修改，将同样作用到底层数组中。

#### nil 切片与空切片

所谓 `nil 切片` 以及 `空切片` 即：

```go
var foo []string // nil 切片
foo := []string{} // 空切片
```

从声明中可以感受到这二者的区别，虽然二者的长度容量都是 0，但前者指向底层数组的指针为 nil，而后者指向一个值为空的地址。

#### 切片的 append

当切片容量大于长度时进行 append，则修改会直接作用到底层数组上，而当容量等于长度时进行 append，则修改会发生在一个新的底层数组上（一般来说新数组会二倍扩容）。这意思是：

```go
foo := []string{"123", "456", "789", "101112"}
bar := foo[:] // ["123", "456", "789", "101112"]
bar = append(bar, "131415", "")
bar[5] = "161718"
fmt.Println(bar) // ["123", "456", "789", "101112", "131415", "161718"]
fmt.Println(foo) // ["123", "456", "789", "101112"]
```

## Map

所谓 `map`，即广为人知的键值对。在 golang 中，map 为引用类型，其声明可以是：

```go
foo := map[string]int{"bar": 1024} // 或不提供初值 map[string]int{}
fmt.Println(foo) // map[bar:1024]
```

也可以：

```go
foo := make(map[string]int, 10) // 或不指定容积 make(map[string]int)
fmt.Println(foo) // map[]
```

不同于切片，map 的 key 需有意义（而不能零值填充），所以 make 构造时，无法指定长度， make 出的 map length 均为 0。

另外，golang map 中，当 key 不存在时，返回声明类型的零值，你比如：

```go
foo := make(map[string]int, 10)
fmt.Println(foo["bar"]) // 0
```

然而，当 key 不存在时，不单返回零值，若要判断某 key 是否存在于某 map 中，则可以利用如下 `biu`：

```go
foo := map[string]int{"bar": 1024}
bar, biu := foo["bar"]
fmt.Println(bar, biu) // 1024 true
```

按照惯例，map 可以通过赋值方式进行新增、修改，而删除则通过内置函数 `delete`，你比如：

```go
foo := map[string]int{"bar": 1024}
delete(foo, "bar")
foo["bar"] = 2048
fmt.Println(foo) // map[bar:2048]
```

特殊地，当 map 的 value 类型是函数时，可用以实现一个简易的工厂模式；当类型为布尔时，稍加完善，可实现集合的效果。

## Channel

### 声明

顾名思义，channel 充当 golang 中的管道，数据在其中流动，其声明如是：

```go
foo := make(chan int)
```

### 操作符

管道的操作采用可以表示流向的操作符 `<-`，你比如：

```go
foo := make(chan int, 1) // 第二个参数为管道容量，0 容量管道的发送、接收操作会被一直阻塞
foo <- 6                 // 向管道中发送数据
fmt.Println(<-foo)       // 从管道中读一把数据
```

同样，在声明时也可以指定方向（使之只可发送或者只可接收），声明缺省方向则表示管道为双向管道。你比如：

```go
foo := make(chan<- int, 1) // 只能向其发送
bar := make(<-chan int, 1) // 只能从起接收
```

### 管道的容量

管道的容量又称之为缓存大小，当管道中数据小于容量时，向其发送数据不会发生阻塞；当管道中存在数据时，从其中接收数据不会发生阻塞。

### 管道的关闭

关闭管道使用内置函数 `close` 当管道未被关闭且其中无数据时，表达式 `<-foo` 会一直阻塞，而若目标管道处于关闭状态，该表达式会返回相应类型的零值。另外，只有当管道中数据全部被接收后，管道才会被真正关闭，在接收时可使用一个额外变量用以检查管道是否已关闭。你比如：

```go
foo := make(chan int, 3)
foo <- 1
foo <- 2
close(foo)
bar, biu := <-foo
fmt.Println(bar, biu) // 1 true
bar, biu = <-foo
fmt.Println(bar, biu) // 2 true
bar, biu = <-foo
fmt.Println(bar, biu) // 0 false
```

此外，向已关闭的管道发送数据会引起异常，你比如：

```go
foo := make(chan int, 2)
foo <- 1
close(foo)
foo <- 2 // panic: send on closed channel 尽管此时仍可以从管道接收数据
```

### 在管道上使用 for ... range

在管道上运用 for ... range 语法，会一直迭代到管道被关闭的时候，你比如：

```go
foo := make(chan int, 2)
foo <- 1
foo <- 2
close(foo)
for bar := range foo {
	fmt.Println(bar)
} // 1 2
```

若上述没有 `close(foo)`，则程序会阻塞在 for 中，直到天荒地老或者 `fatal error: all goroutines are asleep`。

### Select

Select 可以理解为管道专用的 switch，其 case 上条件通常为一组管道的接收、发送操作（以及一个 default），你比如：

```go
foo := make(chan int, 1)
for i := 1; i <= 3; i++ {
  select {
    case foo <- 10:
    	fmt.Println("->")
    case <-foo:
    	fmt.Println("<-")
    default:
    	fmt.Println("not matched")
  }
}// -> <- ->
```

第一次匹配，管道中为空，故发送操作生效；第二次，管道中有一个 10，故接收生效；接收完管道中再次为空，故第三次发送生效。特殊地，当缺省 default 操作时，若无 case 可以成功执行，则程序会阻塞在 select 语句中，直到有一个 case 可以成功执行。

此外，select 的 case 条件可以是一个 timeout 操作，以此可实现，在若干秒后仍无 case 响应则直接进行某些操作的功能，你比如：

```go
foo := make(chan int, 1)
select {
  case <-time.After(time.Second * 5): // time.After 返回一个单向（<-chan Time）的管道，可用于获取指定间隔后的时间
  	fmt.Println("timeout")
  case <-foo:
  	fmt.Println("<-")
} // 五秒后打印 timeout
```

### Timer 与 Ticker

timer 与 ticker 是两个特殊的管道，功能上可以分别参考 JavaScript 里的 `setTimeout` 与 `setInterval`。

#### timer

```go
foo := time.NewTimer(time.Second * 3)
fmt.Println(<-foo.C) // 三秒后打印形如 2020-10-10 09:30:37.222475 +0800 CST m=+3.005188752
```

timer 以及 ticker 管道的关闭，需采用 `Stop` 方法，你比如：

```go
foo := time.NewTimer(time.Second * 1)
bar := make(chan string, 1)
go func() {
  <-foo.C
  bar <- "timeout"
}()
foo.Stop()         // 在 1 秒内关闭掉 timer 管道，则执行到 `<-foo.C` 直接返回，bar 中将不会有数据
fmt.Println(<-bar) // 死锁 fatal error: all goroutines are asleep - deadlock!
```

#### ticker

```go
foo := time.NewTicker(time.Second * 1)
go func() {
  for f := range foo.C {
    fmt.Println(f)
  } // 每隔一秒打印一把时间
}()
time.Sleep(time.Second * 3)
foo.Stop() // 三秒后 ticker 管道关闭，for ... range 因而终止
```

## Make 与 New

golang 中，可用函数 `new` 与 `make` 进行内存分配，具体如下：

new 函数使用时，返回指向传入类型零值的指针，你比如：

```go
foo := new(int)
fmt.Println(foo, *foo) // 0xc0000b4008 0
```

而 make，只用于 slice、map、channel 的初始化，使用时可以指定相应结构的长度、容量，在以零值构建完成底层数据后，返回相应的引用，你比如：

```go
foo := make([]int, 10)
fmt.Println(foo) // [0 0 0 0 0 0 0 0 0 0]
```

## 基本逻辑

### If

你比如：

```go
if true {
  fmt.Println("true") // true
}
```

加上声明以及 else 则形如：

```go
if foo := true; !foo {
  fmt.Println("true")
} else {
  fmt.Println("foo is true") // foo is true
}
```

值得注意的是，golang if 中的条件必须是**布尔类型**。

### Switch

golang 的 switch 与传统意义上的 switch 相比，显得更加便捷：

- 不必写 break，默认自动跳出

```go
foo := 1984
switch foo {
  case 1984:
  	fmt.Println("1984")
  default:
  	fmt.Println("default")
}
```

- 每个 case 可以有多个条件，以逗号分割

```go
foo := 1984
switch foo {
  case 1984, 1987:
  	fmt.Println("1984")
  case 1884, 1887:
  	fmt.Println("1884")
  default:
  	fmt.Println("default")
}
```

- 不限定 case 条件的类型，在 switch 后不接表达式的情况下，可以在每个 case 中分别写表达式，但需要保证表达式其值的类型相同

```go
foo := 1984
switch {
  case foo == 1984:
  	fmt.Println("1984") // 1984
  case false:
  	fmt.Println("false")
  default:
  	fmt.Println("default")
}
```

- 新增了 fallthrough 关键字，在匹配的 case 中 fallthrough，可以往下继续匹配 case

```go
foo := 1984
switch {
  case foo > 1983:
  	fmt.Println("1984") // 1984
  	fallthrough
  case foo > 1883:
  	fmt.Println("1884") // 1884，此 case 不贯穿，所以直接跳出
  case foo > 1783:
  	fmt.Println("1784")
  default:
  	fmt.Println("default")
}
```

### For

for 的写法如下：

```go
for foo := 0; foo < 2; foo++ {
  fmt.Println(foo)
} // 0, 1
```

golang 中没有 while 关键词，但是功能上 for 也可以实现：

```go
foo := 2
for foo > 0 {
  fmt.Println(foo)
  foo--
} // 2, 1
```

另外，golang 中死循环写起来也更简洁：

```go
for {
  fmt.Println("never end")
}
```

而当 for 与 range 配合使用的时候，可以对数组、map 等进行遍历，你比如：

```go
foo := [...]int{1, 2, 3}
for index, value := range foo {
  fmt.Println(index, value)
}
```

## 函数

基本的函数声明、调用如下：

```go
func foo(a int, b int) int {
	return a + b
}

func main() {
	fmt.Println(foo(1, 2)) // 3
}
```

golang 统一编码规范，将左侧大括号放在函数名同一行（而不是另起一行），与任何函数式编程的语言类似，在 golang 中函数是一等公民，函数可作为参数和返回值。

## Goroutine

Goroutine 是协程的 go 语言实现，所谓协程，又被称为微线程，即是一种比进程更轻量的存在。goroutine 所需的开销非常小，可以轻松创建出上万个 goroutine，golang 通过 goroutine 实现对并发编程的支持。一般而言，golang 运行库最多会启动 `$GOMAXPROCS` 个线程来运行 goroutine。

启动一个 goroutine 非常简单，你比如：

```go
foo := func() { fmt.Println("bar") }
go foo()
```

### Goroutine 间通信

goroutine 间通过 channel 进行通信，这也是所谓“管道”的意义。你比如：

```go
foo := make(chan string, 1)
bar := make(chan string, 1)
biu := make(chan string, 1)
go func() {
  <-foo
  biu <- "sth"
}()
go func() {
  <-bar
  foo <- "sth"
}()
bar <- "nothing"
fmt.Println(<-biu, len(bar), len(foo)) // sth 0 0
```

### Goshed

类似于线程的调度，有时某个 goroutine 中的操作可能非常耗时（单纯的耗时，而非通过管道阻塞在原地等待），这就有可能需要主动让出 CPU，从而尽可能地提高全局效率， `Goshed` 函数便是为此而生：

```go
go func() {
  for i := 0; i <= 10000; i++ {
    runtime.Gosched()
    fmt.Println(i)
  }
}()
```

## others

- go 中变量的声明必须使用空格隔开
- go 包名由小写字母组成
- go 中公有和私有的区别在于第一个字母是否大写（大写则公）
- go 中没有左自增/减，只有右自增/减
- go 新增了 `&^` 操作符，通常称为按位清零运算符，意为将左边数中，所有右边数对应为 1 的位清零，你比如 `5&^4` 其值为 1，即是 101 按 100 进行清零得到的。

## 参考

- [Go 语言基础（二）—— 基本常用语法](https://juejin.im/post/6844904053932032013)
- [Go Channel 详解](https://colobu.com/2016/04/14/Golang-Channels/)
- [Go 语言 make 与 new 的区别](https://juejin.im/post/6844903910050643976)
- [Go 语言的核心 Routine-Channel](https://www.cnblogs.com/peiyu1988/p/8781948.html)
