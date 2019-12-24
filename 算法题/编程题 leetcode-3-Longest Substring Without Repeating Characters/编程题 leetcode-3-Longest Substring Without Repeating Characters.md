# 编程题 leetcode-3-Longest Substring Without Repeating Characters

leetcode 3 Longest Substring Without Repeating Characters解析

## 题目

Given a string, find the length of the longest substring without repeating characters.

Examples:

+   Given `abcabcbb`, the answer is `abc`, which the length is 3.

+   Given `bbbbb`, the answer is `b`, with the length of 1.

+   Given `pwwkew`, the answer is `wke`, with the length of 3. Note that the answer must be a substring, `pwke` is a subsequence and not a substring.

-----

意思就是找到字符串中 最长的没有重复字符串的子串。

## 解题思路

这道题可以使用O(n)的算法实现，使用一个hash表存储上次出现的符号的位置，以及当前无重复子串的长度，每到下一个就查询和当前符号相同的上一个符号的距离，并与当前无重复子串的长度做对比

![](https://blog-cdn.chenxiyuan.fun/17-4-7/36732968-file_1491562169426_6c31.png)

比如当 `pwwkew` 到达最后一个符号时的状态是如上图所示：

hash表的数据是:`p:0,w:2,k:3,e:4`

当前字符串长度 `n` 为: 4 => `wkew`

当前字符位置 `i` 为: 5

最大字符串长度 `max` 为: 3

最大字符串 `maxstr` 为: `wke`

这时不需要去遍历当前的字符串，只需要查询hash表判断最近的 `w` 是否会包含在我们的当前字符串中。

使用 `i - hash['w'] >= n` 来判断是否在其中，这里我们 `5 - 2 = 3 < 4` 可以得出当前串的前部分包含了 `w` 所以将串的长度缩小到没有这个符号就是当前最小的串了。使用 `n = i-hashMap[char];` 就缩减到最小的长度了。

## AC代码

### Javascript

``` javascript

var lengthOfLongestSubstring = function(s) {
    let l=s.length,
        hashMap={},
        n=0,//当前字符串长度
        max=0;

    for(let i = 0; i < l; i++){
        let char = s[i];
        n++;
        if(hashMap[char] !== undefined && i-hashMap[char] < n){
            n = i-hashMap[char];
        }
        if(n > max)max = n;
        hashMap[char] = i;
    }

    return max;
};

```

## 在线链接

[longest-substring-without-repeating-characters](https://leetcode.com/problems/longest-substring-without-repeating-characters)

## END

> 2017-4-7 完成

> 2017-4-7 立项
