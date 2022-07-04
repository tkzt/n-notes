---
title: 一个被绿光笼罩的故事
titleTemplate: 那些杀不死我的
---
# 一个被绿光笼罩的故事

## 废话

这本来是邻坐，荒野的任务（好吧，现在也是），他觉得我可能会比较感兴趣就和我一起探讨了，我觉得他是个弟弟就也和他一起探讨了。最终很愉快地出了图，那简直是杨老师成功成团出道的快乐：“用全力去追～青春多宝贵～”。


![raw2Rgb](/raw2Rgb.jpg)
![raw2Rgb3](/raw2Rgb3.jpg)
![raw2Rgb4](/raw2Rgb4.jpg)
![raw2Rgb9](/raw2Rgb9.jpg)


当然，图像只代表了一部分，我们经历了~~无数次~~很多次~~公演~~探索，从 Python 到 C++ 再变成 Halide，从 raw10 到 raw8，~~从芒果小酪到复原椰子汁..我们一路走来，很多人是凭着唱歌跳舞到了这个位置，很多人觉得我凭着傻气站在这里，现在有很多质疑，我想说我站到这里我也在付出努力，我要面临着更大的质疑和压力...这是意义非凡的三个月~~两星期。

## MIPI RAW 的解析

### Bayer 格式

所谓 RAW 图，也就是传说中的 Bayer（拜耳阵列） 格式，在奇数行每个像素一般采样 RGRGRG..在偶数行一般采样 GBGBGB..在实际处理时，每个像素的 RGB 值从该像素本身以及相邻像素的其他颜色值得来。这种采样方式在基本不降低图像质量的同时，可以将采样频率降低 60％ 以上。

![拜耳阵列](/bayer-array.png)


具体而言，每个像素含有一个通道的值，其余两通道值依据相邻一周的像素通过插值得到，插值的方式有很多种，陶某采用老少咸宜的线性插值补偿算法，又为了~~偷懒~~降低算法复杂度,在需要参考周围 4 个像素时，陶某采用深得人心的均值处理方式，据说成像质量相差甚微。也就是：

![拜耳阵列2](/bayer-array-2.png)


对于图中的 B :

> R = ( R<sub>left-top</sub> + R<sub>left-bottom</sub> + R<sub>right-top</sub> + R<sub>right-bottom</sub> ) / 4
> G = ( G<sub>top</sub> + G<sub>bottom</sub> + G<sub>left</sub> + G<sub>right</sub> ) / 4
> B = B<sub>self</sub>

### MIPI RAW (RAW10)

据说，传感器采集的 RAW 数据一般是 10bits，那么在字节流中需要用 2bytes(16bits) 来存储这 10bits，也就是一个 RAW 数据占两字节空间，而 MIPI RAW (这里指 RAW10) 格式是一种压缩过的 RAW 图格式，用 5bytes（40bits） 来存储 4 个 RAW 数据。这 4 个数据（奇数行 RGRG,偶数行 GBGB），按拜耳阵列排列，插值后可以解析成 RGB 空间的图像。

### 5bytes 中的 4 个值

![raw10](/raw10.png)

如图可见，P0-P3 代表四个像素的某一通道的值，它们可以是 RGRG（奇行），也可以是 GBGB（偶行）。如此这般，从 5bytes 中读取 4 个值简直是一件轻松而又愉悦的事情。用优美的 Python 表示出来的话，大概如下：

```python
def getRGGB(bytes):
    return [(bytes[0]<<2)|(bytes[4]&0x03),(bytes[1]<<2)|((bytes[4]&0x0C)>>2),(bytes[2]<<2)|((bytes[4]&0x30)>>4),(bytes[3]<<2)|((bytes[4]&0xC0)>>6)]
```

4 个值解析出来后，是 10bits 的，很显然，无法直接应用到单值 8bits 的 RGB 空间。据说，这种 10bits 到 8bits 有着某种对应关系，但这种关系就像陶某和 PXM 的关系一样，没人（目前为止）能告诉我那是个什么关系..后来，陶某采用丢弃第五个 byte 的方式（直接当成 RAW8），去解析，意思就是：

~~def getRGGB(bytes):~~
~~return [(bytes[0]<<2)|(bytes[4]&0x03),(bytes[1]<<2)|((bytes[4]&0x0C)>>2),(bytes[2]<<2)|((bytes[4]&0x30)>>4),(bytes[3]<<2)|((bytes[4]&0xC0)>>6)]~~

以及：

```python
rggbData[i,j] = srcImg[insideIndex]
rggbData[i,j+1] = srcImg[insideIndex+1]
rggbData[i,j+2] = srcImg[insideIndex+2]
rggbData[i,j+3] = srcImg[insideIndex+3]
```

至此，终于可以出图像了。

## 但这没完

你看杨老师成团之后，停止奋斗了嘛？停止燃烧她的卡路里了嘛？停止心动的信号了嘛？没有!所以说，陶某不应该停止折腾。为了比较效率以及提升抗辐射能力什么的，就又有了 C++ 版本以及 Halide 版本，它们的核心处理部分，大概长这样：

### C++

```cpp
//-- get rgbData valued
for(int i=0;i<height;i++)
{
    for(int j=0;j<width;j++)
    {
        uint8_t R,G,B;
        if(!(i%2))
        {
            if(!(j%2))
            {
                R = rggbData[i][j];
                G = ((i>=1?rggbData[i-1][j]:0)+(height-1-i?rggbData[i+1][j]:0)+(j>=1?rggbData[i][j-1]:0)+(width-1-j>=1?rggbData[i][j+1]:0))/4;
                B = ((i>=1&&j>=1?rggbData[i-1][j-1]:0)+(i>=1&&width-1-j?rggbData[i-1][j+1]:0)+(height-1-i>=1&&j>=1?rggbData[i+1][j-1]:0)+(height-1-i>=1&&width-1-j>=1?rggbData[i+1][j+1]:0))/4;
            }
            else
            {
                R = ((j>=1?rggbData[i][j-1]:0)+(width-1-j>=1?rggbData[i][j+1]:0))/2;
                G = rggbData[i][j];
                B = ((i>=1?rggbData[i-1][j]:0)+(height-1-i>=1?rggbData[i+1][j]:0))/2;
            }
        }
        else
        {
            if(j%2)
            {
                B = rggbData[i][j];
                G = ((i>=1?rggbData[i-1][j]:0)+(height-1-i?rggbData[i+1][j]:0)+(j>=1?rggbData[i][j-1]:0)+(width-1-j>=1?rggbData[i][j+1]:0))/4;
                R = ((i>=1&&j>=1?rggbData[i-1][j-1]:0)+(i>=1&&width-1-j?rggbData[i-1][j+1]:0)+(height-1-i>=1&&j>=1?rggbData[i+1][j-1]:0)+(height-1-i>=1&&width-1-j>=1?rggbData[i+1][j+1]:0))/4;
            }
            else
            {
                B = ((j>=1?rggbData[i][j-1]:0)+(width-1-j>=1?rggbData[i][j+1]:0))/2;
                G = rggbData[i][j];
                R = ((i>=1?rggbData[i-1][j]:0)+(height-1-i>=1?rggbData[i+1][j]:0))/2;
            }
        }
        rgbData[i][j][0] = R;
        rgbData[i][j][1] = G;
        rgbData[i][j][2] = B;
    }
}
```

### Python

```python
# get img valued
for i in range(img.shape[0]):
    for j in range(img.shape[1]):
        R = 0
        G = 0
        B = 0
        if not i%2:# odd row
            if not j%2:# odd col
                R = rggbData[i,j]
                G = ((rggbData[i-1,j] if i>=1 else 0)+(rggbData[i+1,j] if rggbData.shape[0]-1-i>=1 else 0)+(rggbData[i,j-1] if j>=1 else 0)+(rggbData[i,j+1] if (rggbData.shape[1]-1-j>=1) else 0))/4
                B = ((rggbData[i-1,j-1] if (i>=1 and j>=1) else 0)+(rggbData[i-1,j+1] if (i>=1 and (rggbData.shape[1]-1-j>=1)) else 0)+(rggbData[i+1,j-1] if ((rggbData.shape[0]-1-i>=1) and j>=1) else 0)+(rggbData[i+1,j+1] if ((rggbData.shape[0]-1-i>=1) and (rggbData.shape[1]-1-j>=1)) else 0))/4
            else:
                R = ((rggbData[i,j-1] if j>=1 else 0)+(rggbData[i,j+1] if rggbData.shape[1]-1-j>=1 else 0))/2
                G = rggbData[i,j]
                B = ((rggbData[i-1,j] if i>=1 else 0)+(rggbData[i+1,j] if rggbData.shape[0]-1-i>=1 else 0))/2
        else:# even row
            if not j%2:# odd col
                R = ((rggbData[i-1,j] if i>=1 else 0)+(rggbData[i+1,j] if rggbData.shape[0]-1-i>=1 else 0))/2
                G = rggbData[i,j]
                B = ((rggbData[i,j-1] if j>=1 else 0)+(rggbData[i,j+1] if rggbData.shape[1]-1-j>=1 else 0))/2
            else:
                R = ((rggbData[i-1,j-1] if (i>=1 and j>=1) else 0)+(rggbData[i-1,j+1] if (i>=1 and (rggbData.shape[1]-1-j>=1)) else 0)+(rggbData[i+1,j-1] if ((rggbData.shape[0]-1-i>=1) and j>=1) else 0)+(rggbData[i+1,j+1] if ((rggbData.shape[0]-1-i>=1) and (rggbData.shape[1]-1-j>=1)) else 0))/4
                G = ((rggbData[i-1,j] if i>=1 else 0)+(rggbData[i+1,j] if rggbData.shape[0]-1-i>=1 else 0)+(rggbData[i,j-1] if j>=1 else 0)+(rggbData[i,j+1] if rggbData.shape[1]-1-j>=1 else 0))/4
                B = rggbData[i,j]

        # then make sure <= 255 and valuing
        # adjust order (for showing and saving with opencv)
        img[i,j][2] = R
        img[i,j][1] = G
        img[i,j][0] = B
```

### Halide

```cpp
//-- get that value
Expr result = ((y+1)%2)*(((x+1)%2)*(((c/2+c%2)^1)*(rggbData(x,y))+(c%2)*((rggbData(x-1,y)+rggbData(x+1,y)+rggbData(x,y-1)+rggbData(x,y+1))/4)+(c/2)*((rggbData(x-1,y-1)+rggbData(x-1,y+1)+rggbData(x+1,y-1)+rggbData(x+1,y+1))/4))+(x%2)*(((c/2+c%2)^1)*((rggbData(x-1,y)+rggbData(x+1,y))/2)+(c%2)*(rggbData(x,y))+(c/2)*((rggbData(x,y+1)+rggbData(x,y-1))/2)))+(y%2)*(((x+1)%2)*(((c/2+c%2)^1)*((rggbData(x,y+1)+rggbData(x,y-1))/2)+(c%2)*(rggbData(x,y))+(c/2)*((rggbData(x-1,y)+rggbData(x+1,y))/2))+(x%2)*(((c/2+c%2)^1)*((rggbData(x-1,y-1)+rggbData(x-1,y+1)+rggbData(x+1,y-1)+rggbData(x+1,y+1))/4)+(c%2)*((rggbData(x-1,y)+rggbData(x+1,y)+rggbData(x,y-1)+rggbData(x,y+1))/4)+(c/2)*(rggbData(x,y))));
```

(展示一下 Halide 对于图像处理充满创造性的重新定义，顺便 show 一下陶某依稀记得的，哪位大牛说的“代码可读性越差，逼格越高”的至理名言。)

## 最后

不说了，《嘻咦啊看》该更新了。
