# 编程题 leetcode-5-Longest Palindromic Substring 最长回文串

leetcode 5 Longest Palindromic Substring 最长回文串，Manacher算法解析

## 难度 3/10

## 题目

Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Examples:

Example 1:
>   Input: `babad`

>   Output: `bab`

>   Note: `aba` is also a valid answer.

Example 2:
>   Input: `cbbd`

>   Output: `bb`

---

这个就是找最长回文串。。。

## 解题思路

### O(n2)算法

一般想到的都是找到每个点作为对称点的回文串找最长的那个，这个比较简单就不展示代码了，而且这个复杂度高了=、=AC不了

### O(n)算法 --- Manacher算法

Manacher算法主要是利用回文串的对称性来快速的判断出当前位置的回文串的最小长度然后再向左查询，虽然内部使用了双循环但是由于其对字符串的查询是只有单向的，所以算法是0(n)的。

-----

首先 `Manacher算法` 需要将字符串间隙插入相同的一个字符。比如： `abc` 变成 `a#b#c`。这样就将对过去字符串的奇长度和偶长度回文串的判断转化为了，只对奇长度的判断。减少了算法设计的复杂度

`Manacher算法`需要准备一个数组 `p` 用于存储每个位置的中心的回文串长度(或者延伸长度,下文讲述采用存储延伸长度的方式)，当前最长回文串的中心位置 `ci`。

然后接下我们就可以从头到尾遍历一遍字符串，获取`p`数组，找到最长的回文串中心位置了。

当我们需要知道在以在i点为中心的回文串长度时的情况：

![](http://i1.piimg.com/567571/aec5fd1b5d38515a.png)

这时我们知道之前的最长的回文串中心的位置和长度

![](http://i4.buimg.com/567571/99602867b5a0b6d0.png)

由于回文串的对称性，我们可以找到以 `ci` 点为中心与 `i` 点对应的点 `j`。 `j = 2*ci - i`

![](http://i2.muimg.com/567571/02013e6294507e3d.png)

然后根据回文串的对称性，可以知道在最长回文串的范围内，i点和j点的回文串部分是相同的，所以当

`ci - p[ci] <= j - p[j] ` 即j点的回文串完全覆盖在ci点的回文串时，我们可以直接推出 `p[i] === p[j]` 这样的结论

![](http://i1.piimg.com/567571/a19e18c175bc4457.png)

但是如果超出了，那么我们只能获取最短的那一处作为i点的起始延伸长度，然后开始判断。

![](http://i1.piimg.com/567571/8d8a260edc851a91.png)

这时的最小延伸长度`d = i + p[j] - ci - p[ci]`,然后开始从 `ci + p[ci]` 处开始向后对比就是了~~~

## AC代码

### Javascript

``` javascript

let longestPalindrome = function(s) {


    s = '.' + s.split('').join('.') + '.';

    let length = s.length;
    let p = new Array(length);
    let ci = 0;
    let cw = 0;

    p[0] = 0;

    for (let i = 0; i < length ; i++){
        let l = 0;
        if (p[ci] + ci >= i){
            if (i + p[ci * 2 - i] < cw){
                p[i] = p[ci * 2 - i];
                continue;
            }
            l = cw - i;
        }

        for (;
            i - l >= 0 &&
            i + l < length &&
            s[i + l] === s[i - l];
            l++);

        p[i] = l - 1;

        if (p[i] >= p[ci]){
            ci = i;
            cw = p[i] + i;
        }

    }

    return s.substring(ci - p[ci], ci + p[ci] + 1).split('').filter((data, index) => {
        if (1 === index % 2){
            return true;
        } else {
            return false;
        }
    }).join('');
};

```

## 相关算法

>   Manacher算法

## 在线链接

[Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)

## END

>   2017-4-22    立项

>   2017-4-20    立项
