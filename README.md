# Sun-Dock
用于将 `react style props` 转化为 `windicss class`, 实际上也就是使用 class 来操作行内样式。

掘金：https://juejin.cn/post/7207358714794229816/

npm：https://www.npmjs.com/package/@sun-dock/dock-cli



## 使用

`sun-dock` 会将不能转化的 style 保留下来，**不会**破毁代码逻辑。

### CLI

```bash
pnpm i @sun-dock/dock-cli -D
```
将相应的命令添加到 `package.json` 中，⚠️注意 `bin.name` 是 `dock`:
```json
"scripts": {
    "dock": "dock"
}
```

<br />

#### 查询 windicss class
> 你**甚至**可以建个空项目只为了快速查询 windicss class，或者将 dock-cli 安装到全局下直接使用查询。

使用`--query`参数通过以下命令查询:
```bash
pnpm run dock --query=padding:4,paddingTop:4,textAlign:\"center\"

# The input style pair "padding:4,paddingTop:4,textAlign:"center"" will tranform like this: 
# <div className="p-4px pt-4px text-center" />;
```
可以看到 dock-cli 打印了一个 JSX，其中就包含了生成的所有 class，不再需要搜索直接 `一步到位`。

<br/>

#### 对`单个`文件转换

使用`--filename`对的单个文件进行转换：
```bash
pnpm run dock --filename=Hello.tsx
```

<br />

**为什么不支持批量修改？**

考虑到可能出现的 `bug` 影响布局当时没发现但导致线上缺陷，所以提供单文件原子化修改，单功能验证避免**大规模纰漏**。
> 你也可以在本地写脚本遍历文件夹，再在单文件上使用 `dock-cli`。ref：[遍历文件夹内文件](https://juejin.cn/post/6986462081444741134)

<br />

### @sun-dock/s2w-loader

```bash
pnpm i @sun-dock/s2w-loader -D
```

一个 webpack loader 提供编译时兜底能力防止某处没有修改的逃逸行为。`@sun-dock/s2w-loader` 的核心是 `@sun-dock/core`, loader 只是为他提供了一个~~响亮~~的名字。

<br />

### @sun-dock/core

处理 style 的核心包，你能使用它创建任何的插件，他只提供一个能力——转换 style 到 windcss class。默认导出一个函数接收一个包含代码的string参数返回了转换后的代码，另外导出了小驼峰
形式的 style 到 class的转换表。详情查看源码: `core/config/index.js`.

<br />

## 背景

1. 如果你想要使用某个 `windicss` 样式，但是却不知道具体的 `class` 是什么，那么你需要点开官网（加载）、点开搜索（加载）、输入样式（加载且不一定正确）、查看究竟是哪个（思考）...
在这个过程中因为一个样式浪费了巨大的时间，且有可能下次还会忘记，完全是低效的，这也是为什么即使项目中配置了 windicss 但还是有很多开发者会使用 style 的一个原因。现在使用
`dock-cli` 的查询功能就可以避免低效。

2. `style` 拥有性能劣势但是类型优势，在开发中可以通过 `关键词匹配` + `回车` 直接编写，简单方便。但是它会引起重复渲染，尽管在 `React 18` 之后这种情况可能会被解决，
但 `style` 依旧是个非常差劲的选择，原因如下：

<br />

### 为什么不能用 `style prop`？

因为行内的 `style object` 在 `React` 组件重复渲染中总是新的，就像：
```tsx
<div style={{ color: 'red' }} />
```
这是因为 `props` 比较使用 `Object.is`, 而两个对象相等只能是相同的引用。
> 详见 [减少重复渲染](https://www.debugbear.com/blog/react-rerenders#passing-objects-as-props)
将 `object` 转化为 `string` 将减少重复渲染提高性能。


### change log

**v1.0.3**

+ add `!important`.

**v1.0.4**

+ add `%` | `calc`z as => [% | calc];

**v1.0.5**

+ fix font weight
