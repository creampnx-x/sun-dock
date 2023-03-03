# Dock-Cli

```bash
pnpm i @sun-dock/dock-cli -D
```

将相应的命令添加到 `package.json` 中，⚠️注意 `bin.name` 是 dock:

```json
"scripts": {
    "dock": "dock"
}
```

## 查询 windicss class
你甚至可以建个空项目只为了快速查询 windicss class，或者将 dock-cli 安装到全局下直接使用查询。

使用`--query`参数通过以下命令查询:
```bash
pnpm run dock --query=padding:4,paddingTop:4,textAlign:\"center\" # 注意不要有空格
# The input style pair "padding:4,paddingTop:4,textAlign:"center"" will tranform like this: 
# <div className="p-4px pt-4px text-center" />;
```
可以看到 dock-cli 打印了一个 JSX，其中就包含了生成的所有 class，不再需要搜索直接 一步到位。

## 对单个文件转换
使用`--filename`对单个文件进行转换：
```bash
pnpm run dock --filename=Hello.tsx
```
**为什么不支持批量修改？**

考虑到可能出现的 bug 影响布局当时没发现但导致线上缺陷，所以提供单文件原子化修改，单功能验证避免**大规模纰漏**。

> 你也可以在本地写脚本遍历文件夹，再在单文件上使用 dock-cli

