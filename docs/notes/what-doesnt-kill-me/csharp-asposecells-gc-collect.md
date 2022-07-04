---
title: C# 记一次 AsposeCells 与 GC.Collect 的配合
titleTemplate: 那些杀不死我的
---
# C# 记一次 AsposeCells 与 GC.Collect 的配合

## 问题

程序中有两个依赖 AsposeCells 实现操作 Excel 文件的函数，分别是读取表格数据的 LoadData，以及保存数据的 SaveData，当函数跑在循环中的时候，会先后进行 Load、Save 操。如下：

```csharp
_excelHelper.SaveDict(
    _dataAnalysizer.UpdateDict(
        _solrDataGetter.GetData(startTime, stopTime),
        _excelHelper.LoadDict()
    )
);
```

实践发现，Load 数据后 Save 数据时，会抛文件被占用的异常。

## 解决

通过在 Load 完成之后，进行:

```csharp
GC.Collect();
```

显式调用，以解决问题。
