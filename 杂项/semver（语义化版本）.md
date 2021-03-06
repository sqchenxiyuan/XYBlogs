# semver（语义化版本）

写了一年多的代码了，从以前随便开个文件夹就写，到开始用版本控制管理项目的版本，但之前对版本这个东西一直是混乱的，到底大版本和小版本应该如何区分等等。后来发现了社区里的 semver（语义化版本）,用于解决混乱的版本号，这篇文章将介绍semver的内容以及npm上版本号上的一些符号的意思。

## semver 2.0.0 简介

    一般情况下semver的版本都是`x.y.z`的格式。例如 1.1.0，2.4.5等等

    `x`代表的主版本号，当有大量更新，重大意义的更新时才会增加，比如API改变，核心代码实现变动等等。

    `y`代表的次版本号，当有兼容性的修改或者新的特性(API)加入时才会改变。

    `z`代表的修订版本号,顾名思义就是在修复一些缺陷的时候发布新的版本号。

    到这里差不多就明白那些版本号大概是如何增长的了

## semver 2.0.0 详细

这一段就是semver 2.0.0的标准说明，但还是建议直接去[semver官网](http://semver.org/)看~~

1.  使用语义化版本控制的软件 **必须** 定义公共 API。该 API 可以在代码中被定义或出现于严谨的文件内。无论何种形式都应该力求精确且完整。

    PS:公共API便是暴露这个项目的依赖方式的途径，如果没有公共 API 那么也就没有了版本控制的依据，个人认为这个API可以不一定是提供调用的，也可以是内部的实现等等

2.  标准的版本号必须采用 `XYZ` 的格式，其中 X、Y 和 Z 为非负的整数，且禁止在数字前方补零。`X` 是主版本号、`Y` 是次版本号、而 `Z` 为修订号。每个元素必须以数值来递增。例如：1.9.1 -> 1.10.0 -> 1.11.0。

3.  标记版本号的软件发行后，禁止改变该版本软件的内容。任何修改都必须以新版本发行。

    PS:有一次就是内容没有校验好就发了一个版本，那时我想的是可以直接再交一个吗，然而是不行的，这样的做法只会带来混乱，其实也是要对提交的内容负责吧~

4.  主版本号为零（0.y.z）的软件处于开发初始阶段，一切都可能随时被改变。这样的公共 API 不应该被视为稳定版。

5.  1.0.0 的版本号用于界定公共 API 的形成。这一版本之后所有的版本号更新都基于公共 API 及其修改内容。

6.  修订号 Z（x.y.Z | x > 0）必须在只做了向下兼容的修正时才递增。这里的修正指的是针对不正确结果而进行的内部修改。

    PS：也就是修正版本号(Z) 主要是针对一些内部BUG的修复

7.  次版本号 Y（x.Y.z | x > 0）必须在有向下兼容的新功能出现时递增。在任何公共 API 的功能被标记为弃用时也必须递增。也可以在内部程序有大量新功能或改进被加入时递增，其中可以包括修订级别的改变。每当次版本号递增时，修订号必须归零。

    PS：即当存在大量改动，但是API依然向下兼容的时候

8.  主版本号 X（X.y.z | X > 0）必须在有任何不兼容的修改被加入公共 API 时递增。其中可以包括次版本号及修订级别的改变。每当主版本号递增时，次版本号和修订号必须归零。

    PS：主版本号主要是在有不兼容的修改的情况下做出的，而对于不向下兼容的改动对低版本用户来说很困扰的事情，因为升级将会耗费大量的资源。

9.  先行版本号可以被标注在修订版之后，先加上一个连接号再加上一连串以句点分隔的标识符号来修饰。标识符号必须由 ASCII 码的英数字和连接号 `[0-9A-Za-z-]` 组成，且 **禁止** 留白。数字型的标识符号 **禁止** 在前方补零。先行版的优先级低于相关联的标准版本。被标上先行版本号则表示这个版本并非稳定而且可能无法达到兼容的需求。范例：1.0.0-alpha、1.0.0-alpha.1、1.0.0-0.3.7、1.0.0-x.7.z.92。

10. 版本编译信息可以被标注在修订版或先行版本号之后，先加上一个加号再加上一连串以句点分隔的标识符号来修饰。标识符号必须由 ASCII 的英数字和连接号 [0-9A-Za-z-] 组成，且禁止留白。当判断版本的优先层级时，版本编译信息可以被忽略。因此当两个版本只有在版本编译信息有差别时，属于相同的优先层级。范例：1.0.0-alpha+001、1.0.0+20130313144700、1.0.0-beta+exp.sha.5114f85。

11. 版本的优先层级指的是不同版本在排序时如何比较。判断优先层级时，必须把版本依序拆分为主版本号、次版本号、修订号及先行版本号后进行比较（版本编译信息不在这份比较的列表中）。由左到右依序比较每个标识符号，第一个差异值用来决定优先层级：主版本号、次版本号及修订号以数值比较，例如：1.0.0 < 2.0.0 < 2.1.0 < 2.1.1。当主版本号、次版本号及修订号都相同时，改以优先层级比较低的先行版本号决定。例如：1.0.0-alpha < 1.0.0。有相同主版本号、次版本号及修订号的两个先行版本号，其优先层级必须透过由左到右的每个被句点分隔的标识符号来比较，直到找到一个差异值后决定：只有数字的标识符号以数值高低比较，有字母或连接号时则逐字以 ASCII 的排序来比较。数字的标识符号比非数字的标识符号优先层级低。若开头的标识符号都相同时，栏位比较多的先行版本号优先层级比较高。范例：1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0。


## semver npm Advanced Range Syntax（范围语法）

### 多个版本号组合

npm上版本号是可以通过 `||` 来表示组合的，比如 `1.0.0 || 2.0.0`，但会优先下载最高级的。

### Hyphen Ranges X.Y.Z - A.B.C

例子： `1.2.3 - 2.3.4 := >=1.2.3 <=2.3.4`

如果前部分的文字有省略，那么省略的都以0替换，比如 `1.2 - 2.3.4 := >=1.2.0 <=2.3.4`

如果是后半部分便将省略部分的前一即提升一级，但不能达到或者更高，不如：`1.2.3 - 2.3 := >=1.2.3 < 2.4.0`

### X-Ranges 1.2.x 1.X 1.2.* *

`X`,`x`,`*`这3个字符都是表示的任意的意思,应该很好理解

比如：

`* := >=0.0.0 ` 任意版本,特别是当值为`""`的时候，也默认为`*`

`1.x := >=1.0.0 <2.0.0`

`1.2.x := >=1.2.0 <1.3.0`

其实省略部分就默认填充了一个`*`

比如 `1 := 1.x.x := >=1.0.0 <2.0.0`

### Tilde Ranges ~1.2.3 ~1.2 ~1

开头`~`的符号意思是允许对最小的定义的版本进行修改

比如：

`~1.2.3 := >=1.2.3 <1.(2+1).0 := >=1.2.3 < 1.3.0`
`~1.2 := >=1.2.0 <1.(2+1).0 := >=1.2.0 < 1.3.0`
`~1 := >=1.0.0 <(1+1).0.0 := >=1.0.0 < 2.0.0`

### Caret Ranges ^1.2.3 ^0.2.5 ^0.0.4

开头`^`的符号意思是允许在最大已确定的版本号内变动，感觉和`~`相反

比如：

`^1.2.3 := >=1.2.3 <2.0.0`
`^0.2.3 := >=0.2.3 <0.3.0`
`^0.0.3 := >=0.0.3 <0.0.4`

可以看出主要目的是在当前达到的最大的开发级别作为范围

## 后记

看完了有关semver的资料后终于搞懂了各个位置的数字的规律，以前就是完全想着来的,版本号也是写死的。

![](https://ooo.0o0.ooo/2017/06/23/594d21670f438.gif)

## 参考资料

[semver 2.0.0](http://semver.org/lang/zh-CN/)

[npm semver 说明](https://docs.npmjs.com/misc/semver)

[semver git 地址](https://github.com/mojombo/semver)

## END

>   2017-6-23   完成

>   2017-5-23   立项
