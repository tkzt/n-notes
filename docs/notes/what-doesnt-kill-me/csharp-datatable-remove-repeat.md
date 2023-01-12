---
title: C# DataTable 仅某几列相同时的去重
titleTemplate: 那些杀不死我的
date: 2019-08-26
---

## 简单来说

如题所示，今天遇到的一个需求是，将 DataTable 去重，但这个去重并不是两行完全相同才去，这个去重详情是，如果 DataTable 中，某两列值相同，则任取其一值，以得到一个那两列无相同值、表结构相同的 DataTable。

## Show Me The Code

### 两行完全相同时的去重

两行完全相同时的去重，比较简单。假设待去重的 Datable 叫 `originalDt`，其内值为：

| col1 | col2 | col3 | col4 |
| ---- | ---- | ---- | ---- |
| 1    | 2    | 3    | 4    |
| 4    | 5    | 6    | 7    |
| 1    | 2    | 3    | 4    |

则去重操作如下：

```csharp
DataView tempView = new DataView(originalDt);
DataTable resultDt =
	tempView.ToTable(true,new string [] {"col1","col2","col3","col4"}); // true 表示去重，第二参数为新 DataTable 的诸列
```

其中，`resultDt` 为去重后的得到的 DataTable。

### 指定两列相同的去重

指定两列相同的去重，也不难。假设待去重的 Datable 叫 `originalDt`，其内值为：

| col1 | col2 | col3 | col4 |
| ---- | ---- | ---- | ---- |
| 1    | 2    | 3    | 4    |
| 4    | 5    | 6    | 7    |
| 8    | 2    | 3    | 9    |

则去重操作如下：

```csharp
DataTable resultDt = originalDt.Clone(); // 复制表结构
var groups = resultDt.AsEnumerable().GroupBy(row => row["col2"].ToString() + row["col3"].ToString());
foreach (var group in groups)
{
    DataRow newRow = resultDt.NewRow();
    newRow.ItemArray = group.ElementAt(0).ItemArray;
    resultDt.Rows.Add(newRow);
}
```

其中，有重时取分组中第一条数据。

就酱。
