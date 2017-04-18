# JS双等号(==)和三等号(===)详解

JS中的双等号(==)和三等号(===)是有很大的区别的，这是初学JS的人都知道的，但是大家都对其中运算原理不是特别清楚，这篇文章将讲述两个等号内部的运算规则，以及一些简单的总结。

## 运算规则

首先我们来看双等号(==)和三等号(===)的内部的运算规则。虽然有点长，但是只有详细了解其内部的详细规则，我们才能释然一些奇怪的情况（比如 `[] == false`）

### 双等号(==)

JS中双等号(==)的判断是很复杂的，这也是最容易弄混淆的地方，所以很多的面试都会考察这一点，同时在开发中也要求尽量少使用双等号(==)。

#### 细则

1.  If `Type(x)` is the same as `Type(y)` then,

    Return the result of performing Strict Equality Comparison `x === y`.

2.  If x is `null` and y is `undefined`, return `true`.

3.  If x is `undefined` and y is `null`, return `true`.

4.  If `Type(x)` is `Number` and `Type(y)` is `String`, return the result of the comparison `x == ToNumber(y)`.

5.  If `Type(x)` is `String` and `Type(y)` is `Number`, return the result of the comparison `ToNumber(x) == y`.

6.  If `Type(x)` is `Boolean`, return the result of the comparison `ToNumber(x) == y`.

7.  If `Type(y)` is `Boolean`, return the result of the comparison `x == ToNumber(y)`.

8.  If `Type(x)` is either `String`, `Number`, or `Symbol` and `Type(y)` is `Object`, return the result of the comparison `x ==  ToPrimitive(y)`.

9.  If `Type(x)` is `Object` and `Type(y)` is either `String`, `Number`, or `Symbol`, return the result of the comparison `ToPrimitive(x) == y`.

10. Return `false`.

#### 精简

在上面我们可以看出，双等号(==)的运算规则简单的就是如下规则：

1.  判断两边的变量 `是否同类型` ，如果同类型就返回三等号(===)的运算的结果。

2.  判断两边的变量 `是否一个为 null 一个为 undefined`，如果是就返回 `true`。

    ps：可以简单的记为 `null == undefined` 为 `true`

3.  判断两边的变量 `是否一个为 Number类型 一个为 String类型`，如果是，则将String类型的变量使用 `ToNumber` 方法转换为Number类型 再执行比较。

    ps：相当于 `'123' == 1` 转化为 `123 == 1`

4.  判断是否有一边为 `Boolean类型`, 如果有则对这个Boolean类型变量使用 `ToNumber` 方法转换为Number类型 再执行比较。

    ps：结合上面 `'2' == true` 先转换为 `'2' == 1`, 在转换为 `2 == 1`

5.  判断两边的变量 `是否一个为 Number、String、symbol类型 一个为 Object类型` ，如果是则对Object类型的变量执行`ToPrimitive`方法的转换后再进行比较

6.  如果上面的条件都没有满足，那么直接返回 `false`

### 三等号(===)

JS中双等号(==)的判断是很简单，它的规则也同样简单。

#### 细则

1.  If `Type(x)` is different from `Type(y)`, return `false`.

2.  If `Type(x)` is `Number`, then

    1.  If x is `NaN`, return `false`.

    2.  If y is `NaN`, return `false`.

    3.  If x is the same Number value as y, return `true`.

    4.  If x is `+0` and y is `-0`, return `true`.

    5.  If x is `-0` and y is `+0`, return `true`.

    6.  Return `false`.

3.  Return `SameValueNonNumber(x, y)`.


#### 精简

三等号(===)的运算规则就很简单：

1.  类型不同返回 `false`

2.  数值类型 `NaN` 永远返回 `false`

3.  其余的基础类型直接比较值是否相等

    对象比较引用是否相同。

### 特别的转换函数

上面可以看到，在运算中使用了 `ToNumber`,`ToPrimitive`,`SameValueNonNumber`这3个函数，虽然看名字就能知道它是干啥的，但是其中还是有一些坑

#### ToNumber

|Argument Type   |	Result
|:--             |:--
|Undefined	     |Return `NaN`.
|Null	         |Return `+0`.
|Boolean	     |Return `1` if argument is `true`. Return `+0` if argument is `false`.
|Number	         |Return argument (no conversion).
|String	         |See grammar and conversion algorithm below.
|Symbol	         |Throw a `TypeError` exception.
|Object          |Apply the following steps:<br>Let `primValue` be ? `ToPrimitive(argument, hint Number)`.<br>Return ? `ToNumber(primValue)`.

其中 `String` 到 `Number` 的转换是最复杂的，将单开一片文章进行讲解。

#### ToPrimitive

这个方法的算法看似复杂，其实就是主要将对象转换为基本数据类型。

详细可参看参考资料中的链接[ToPrimitive](http://www.ecma-international.org/ecma-262/7.0/#sec-strict-equality-comparison)

只需要记住：

1.  优先转换为 `String` 时，依次调用对象的 `toString` 和 `valueOf` ,获取最先返回不是对象的那个值

2.  优先转换为 `Number` 时，依次调用对象的 `valueOf` 和 `toString` ,获取最先返回不是对象的那个值Number

3.  默认转换是默认转换为 `Number`。

#### SameValueNonNumber

1.  Assert: `Type(x)` is not `Number`.

2.  Assert: `Type(x)` is the same as `Type(y)`.

3.  If `Type(x)` is `Undefined`, return `true`.

4.  If `Type(x)` is `Null`, return `true`.

5.  If `Type(x)` is `String`, then

    If `x` and `y` are exactly the `same sequence of code units` (same length and same code units at corresponding indices), return `true`;

    otherwise, return `false`.

6.  If `Type(x)` is `Boolean`, then

    If `x` and `y` are `both true` or `both false`, return `true`;

    otherwise, return `false`.

7.  If `Type(x)` is `Symbol`, then

    If `x` and `y` are both the same `Symbol value`, return `true`;

    otherwise, return `false`.

8.  Return `true` if `x` and `y` are the same Object value.

    Otherwise, return `false`.

从上面的算法不难看出其实就是很普通的比较，相信看一看就能懂。

## 归纳

结合上面的一堆算法我们就可以简单的总结出一些东西了。

## 奇怪的情况

## 参考资料

[双等号运算规则](http://www.ecma-international.org/ecma-262/7.0/#sec-abstract-relational-comparison)

[三等号运算规则](http://www.ecma-international.org/ecma-262/7.0/#sec-abstract-equality-comparison)

[ToNumber](http://www.ecma-international.org/ecma-262/7.0/#sec-abstract-equality-comparison)

[ToPrimitive](http://www.ecma-international.org/ecma-262/7.0/#sec-strict-equality-comparison)



## END

>   2017-4-12   立项
