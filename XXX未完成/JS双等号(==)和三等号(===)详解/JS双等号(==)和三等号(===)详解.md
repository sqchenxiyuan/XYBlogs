# JS双等号(==)和三等号(===)详解

JS中的双等号(==)和三等号(===)是有很大的区别的，这是初学JS的人都知道的，但是大家都对其中运算原理不是特别清楚，这篇文章将讲述两个等号内部的运算规则，以及一些简单的总结。

## 运算规则

首先我们来看双等号(==)和三等号(===)的内部的运算规则。虽然有点长，但是只有详细了解其内部的详细规则，我们才能释然一些奇怪的情况（比如 `[] == false`）

### 双等号(==)

JS中双等号(==)的判断是很复杂的，这也是最容易弄混淆的地方，所以很多的面试都会考察这一点，同时在开发中也要求尽量少使用双等号(==)。

### 运算规则

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

### 精简

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

## 参考资料

[双等号运算规则](http://www.ecma-international.org/ecma-262/7.0/#sec-abstract-relational-comparison)

[三等号运算规则](http://www.ecma-international.org/ecma-262/7.0/#sec-abstract-equality-comparison)

[ToNumber](http://www.ecma-international.org/ecma-262/7.0/#sec-tonumber)

[ToPrimitive](http://www.ecma-international.org/ecma-262/7.0/#sec-toprimitive)

## END

>   2017-4-12   立项
