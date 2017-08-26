# vscode eslint vue文件格式的自动修复(eslint vue auto fix)

这篇文章主要描述 vscode 的 eslint 插件如何自动修复VUE文件内的格式错误

## 问题

## 修复方式

在 vscode 中的用户配置中给 `eslint.validate` 中的VUE配置设置 `autoFix` 为 `true`

``` JSON
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        {
            "language": "vue",
            "autoFix": true
        }
    ]
}
```

然后就好了~~

## END

>   2017-8-26   完成

>   2017-8-26   立项
