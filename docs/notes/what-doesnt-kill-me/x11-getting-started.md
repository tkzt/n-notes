---
title: X 窗口编程入门：展现一张图片
titleTemplate: 那些杀不死我的
---
# X 窗口编程入门：展现一张图片

## 简介

X Window 系统是在 Unix、类 Unix 操作系统（以及 OpenVMS）中建立图形用户界面的标准工具包和协议。相比于 GTK、QT 之类抽象级别更高的库，X 窗口编程诞生较早，它仅为 GUI 环境构建提供了基本的框架（基础绘图、键鼠事件、窗口移动等），但 X 标准并没有定义 UI 的呈现方式（不提供按钮、文本框等 widgets）。

X 标准为了实现其灵活的设计初衷，采用了客户端——服务器模型（基于应用程序的视角）：客户端决定做什么，服务端接受用户的输入并执行真正的绘图。本地的 X 显示程序提供显示服务，所以它是服务器，而远端应用程序使用了该服务，所以远端应用程序是客户端。

## 一个简单示例

### 头文件

```cpp
#include <X11/Xlib.h>
#include <X11/Xutil.h>
#include <X11/Xos.h>
#include <stdlib.h>
```

### 必要申明

```cpp
Display *dsp = XOpenDisplay((char *)0); // 指向显示结构的指针
int screen = DefaultScreen(dsp);        // default screen for operations
Window win = XCreateSimpleWindow(dsp, DefaultRootWindow(dsp), 0, 0, 500, 500, 1, BlackPixel(dsp, screen), WhitePixel(dsp, screen)); // 详见示例
GC gc = XCreateGC(dsp, win, 0, 0);      // 图形上下文，为了绘制不同的风格，我们可以使用含有不同绘制参数的多个图形上下文
```

### 基础绘图

```cpp
//-- 画点
XDrawPoint(dsp,         // Display *
           win,         // Window
           gc,          // GC
           0,0);        // 目标像素坐标
//-- 画线
XDrawLine(dsp,
          win,
          gc,
          250,250,      // src_x,src_y
          0,0);         // dst_x,dst_y
//-- 画矩形
XDrawRectangle(dsp,
               win,
               gc,
               10, 10,  // src_x,src_y
               25, 25); // rect_w,rect_h
//-- 画弧线
XDrawArc(dsp,
         win,
         gc,
         250, 250,      // 中心坐标
         50, 50,        // 水平直径，竖直直径
         0,             // src_arc（与竖直顺时针夹角）
         360*64);       // dst_arc（与竖直顺时针夹角）（在X标准中，64代表一度，360x64意味着一圈）
```

### 事件

在 X Window 系统中，X 服务器接受到的各种事件（暴露事件、鼠标点击事件等）被封装在 XEvent 结构中。在入口函数中，通过一个 while 循环等待事件的触发，如下：

```cpp
//-- driven by events
while (1)
{
    XNextEvent(dis, &event);

    switch(event.type)
    {
        case KeyPress:
            break;
        case ButtonPress:
            break;
        case Expose:
            break;
        default:
            break;
    }
}
```

### 完整示例

以下程序实现点击鼠标左键便在窗口中重绘一条线：

```cpp
#include <X11/Xlib.h>
#include <X11/Xutil.h>
#include <X11/Xos.h>
#include <stdio.h>
#include <stdlib.h>

void main()
{
    //-- create the display
    Display dsp = XOpenDisplay((char *)0);

    //-- create the Graphics Context
    GC gc = XCreateGC(dis, win, 0, 0);

    //-- create default screen
    int screen = DefaultScreen(dis);                    // default screen for operations

    //-- create main window
    win = XCreateSimpleWindow(dsp,
                              DefaultRootWindow(dsp),
                              0, 0,                     // 大概是新生窗体相对于父窗体的出生点吧
                              500,                      // 新生窗体的宽
                              500,                      // 新生窗体的高
                              1,                        // border width
                              BlackPixel(dsp, screen),  // border color
                              WhitePixel(dsp, screen)); // background color

    //-- set properties
    XSetStandardProperties(dsp,                         // display
                           win,                         // window
                           "Demo",                      // window name
                           "",                          // icon name
                           None,                        // icon pixmap
                           NULL,
                           0,
                           NULL);

    //-- 相当于设置事件监听
    XSelectInput(this->dsp,
                 this->main_win,
                 ExposureMask |                         // 暴露事件
                     ButtonPressMask |                  // 鼠标点击事件
                     KeyPressMask);                     // 键盘按键事件

    //-- 设置前景色（画笔颜色）
    screen_colormap = DefaultColormap(dsp, screen);
    XColor foreColor;
    foreColor.red = 65535;                              // 用short int类型存储分量数据
    foreColor.blue = 0;                                 // 因而(65535,0,0)表示红色
    foreColor.green = 0;
    XAllocColor(dsp, screen_colormap, &foreColor);

    //-- 显示win这个窗口为最前
    XClearWindow(dsp, win);
    XMapRaised(dsp, win);

    //-- create an XEvent
    XEvent event;

    //-- KeySym结构存储按键事件的详情
    KeySym key;

    //-- 用来存储所按按键
    char text[255];

    //-- 监听事件
    while(1)
    {
        XNextEvent(dsp, &event);
        switch(event.type)
        {
            case KeyPress:
                {
                    if(event.type == KeyPress && XLookupString(&event.xkey, text, 255, &key, 0) == 1)
                    {
                        if(text[0]=='q')
                        {
                            //-- just give back system resource
                            XFreeGC(dsp, gc);
                            XDestroyWindow(dsp, win);
                            XCloseDisplay(dsp);
                            exit(1);
                        }
                    }
                }
                break;
            case ButtonPress:
                {
                    XClearWindow(dsp, win); // 重绘窗口内容
                    XDrawLine(dsp, win, gc, 250, 250, 0, 0); // 画线
                }
                break;
            case Expose:
                break;
            default:
                break;
        }
    }
}
```

## 展现图片

### 通过 XDrawPoint

#### pixmap

Pixmap 可以理解为 X Window 系统中的 Label（Qt 中的 QLabel），我们可以在上面绘图，也可以将图像嵌入其中。但 Pixmap 不会直接显示在窗口中，它被存储在内存中，需要通过 XCopyArea(或 XCopyPlane)方法才可以将其“贴”到窗口中。

可以通过如下方式创建一个 Pixmap：

```cpp
int depth = DefaultDepth(dsp, screen);
Pixmap pxm = XCreatePixmap(dsp,
                       win,
                       40, 30, // pixmap宽，高
                       depth); // default 24 (maybe 8x3?)
```

#### 按点绘图

XDrawPoint 方法会在指定像素画出 foreColor 所绑定颜色的点，所以，可以通过不断更改 foreColor 所指颜色依据 RGB 数据流依次画点，最终可在 pixmap 上绘出完整图像。即：

```cpp
screen_colormap = DefaultColormap(dsp, screen);

for(int i = 0;i < height;i++)
{
    for(int j = 0;j < width;j++)
    {
        foreColor.red = RGBData[i][j][0]/255 * 65535;
        foreColor.green = RGBData[i][j][1]/255 * 65535;
        foreColor.blue = RGBData[i][j][2]/255 * 65535;
        XAllocColor(dsp, screen_colormap, &foreColor);
        XDrawPoint(dsp, pxm, gc, j, i); // i refers to height, and j refers to width
    }
}

//-- to show
XCopyArea(dsp,
          pxm,
          win,
          gc,
          0, 0, width, height, // 将pxm上，从(0, 0)点开始，指定宽高的矩形区域内的图像数据，
          0, 0);               // 放置到指定窗口(win)中，选中区域的左上角，对齐到指定窗口的指定坐标(0, 0)
```

然而，XAllocColor 费时较多，导致展现图片缓慢，而陶某的最终目的是实现一个可以实时预览的 Linux 端应用，这样显然不妥。

### 通过 XImage

如果说 Pixmap 是 X 标准中的 Label，XImage 则是其中的标准图像格式。实现上述目的，我们可以从 RGB 数据流创建一个 XImage，然后直接通过 XPutImage 展现出来。即：

```cpp
channels = 4；                                          // 调用XCreateImage需要传入bitmap_pad（大概就是划分多少个bits作一个pixel，像3通道的话，24bits储存了一个pixel的图像信息），而XCreateImage支持的bitmap_pad只有8、16、32。所以对于三通道图像应扩成4通道，是每个pixel有32bits

XImage image = XCreateImage(dsp,
                            DefaultVisual(dsp, screen), // Visual *,该结构中包含了各种mask，有种滤镜的感觉？
                            depth,                      // 对于ZPixmap和XYPixmap，depth是目标容器的depth（如将要把所建的image展示在depth为24的Pixmap上，则此处depth亦为24），而对于XYBitmap，depth为1
                            ZPixmap,                    // 用于指定传入RGB(A)流的排列方式：ZPixmap以RGB(A)为一组，顺序排列；XYPixmap则把RGB各分量分成三个（所谓的）Plane，也就是先把R全排出来，再G，再B；XYBitmap则只有一个Plane，大概指的是灰度图吧
                            0,                          // 数据流偏移量，大概就是多少bits后为有效数据
                            (char *)RGBBuffer,          // RGBA数据流
                            width, height,              // 图像宽高，以pixel为单位
                            channels * 8,               // bitmap_pad
                            0);                         // bytes_per_line，虽然字面意思很明显似的，但不知道为什么赋了个0

XPutImage(dsp,
          pxm,
          gc,
          image,                                        // XImage
          0, 0, 0, 0,                                   // src_x,src_y,dst_x,dst_y:似乎指明的是对齐坐标，比如将目标容器(pxm)的(0,0)和图像(image)的(0,0)对齐
          width, height);                               // 图像宽高

XCopyArea(dsp, pxm, win, gc, 0, 0, width, height, 0, 0);
```

## 总结

感觉写了很多，也感觉什么都没写，这玩意儿...

## 源码

Demo 源文件在[这里](https://github.com/taoqingqiu/X11-GetStarted)。
