# 编程题 leetcode-6-ZigZag Conversion

leetcode 6 ZigZag Conversion 解析

## 难度 1/10

## 题目

The string `PAYPALISHIRING` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

Examples:

```

P   A   H   N
A P L S I I G
Y   I   R

```

And then read line by line: `PAHNAPLSIIGYIR`

Write the code that will take a string and make this conversion given a number of rows:

> string convert(string text, int nRows);

`convert("PAYPALISHIRING", 3)` should return `PAHNAPLSIIGYIR`.

---

刚看到是一脸懵逼的，主要是他用的3行，我们可以看看4行的效果

```

P     I   N
A   L S  I G
Y A   H R
P     I

```

结果就变成了`PINALSIGYAHRPI`

现在要的就是给一个字符串和行数，输出Z字展示下的每行连接接起来的字符串（每一行的结果，连接在一起）

## 解题思路

这个可以用数学的方式，也可以直接模拟出来=。=

对于数学这种烧脑壳的东西，我还是喜欢模拟出来（虽然都是数学）

首先我们可以对特殊情况做简单的处理，那就是只有一行时，字符串是不会改变的，直接返回就可以了。

然后我们可以根据当前的字符的序号，简单的判断下一个字符相对的位置，

```

P     I   N
A   L S  I G
Y A   H R
P     I

```

我们可以看出这是一个循环的，我们可以看出 `行数 * 2 - 2` 是一个循环周期,然后每 `行数 - 1` 个又是一种不同的走向，每一部分前一半是行数加一，后一半是行数减一，并右移一位。

这样我们可以直接做这样的判断

``` javascript

if(Math.floor(字符序列 / (行数 - 1)) % 2 === 0){
    //行数加一;
}else{
    //行数减一;
    //右移一位;
}

```

这样遍历一遍我们就获得了每个字符的位置，接下来还不简单吗-。-


## AC代码

### Javascript

``` javascript

let convert = function(s, numRows) {
    if(numRows === 1)return s;
    let l = s.length;
    let result = [];
    let x = 0, y = 0;
    let gnum = numRows - 1;

    for (let i = 0; i < l; i++){
        if (!result[y]){
            result[y] = "";
        }

        result[y] += s[i]

        if(Math.floor(i / gnum) % 2 === 0){
            y++;
        }else{
            x++;
            y--;
        }
    }
    return result.join('');
};

```
## 在线链接

[leetcode 6 ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion)

## END

>   2017-5-6    完成

>   2017-5-6    立项
