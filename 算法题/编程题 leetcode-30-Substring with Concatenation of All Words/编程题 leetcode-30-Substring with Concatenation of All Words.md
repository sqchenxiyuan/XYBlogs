# 编程题 leetcode 30 Substring with Concatenation of All Words

leetcode 30 Substring with Concatenation of All Words 解析

## 题目

You are given a string, `s`, and a list of words, `words`, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in `words` exactly once and without any intervening characters.

Example1:
```
Input:
  s = "barfoothefoobarman",
  words = ["foo","bar"]
Output: [0,9]
Explanation: Substrings starting at index 0 and 9 are "barfoor" and "foobar" respectively.
The output order does not matter, returning [9,0] is fine too.
```

Example2:
```
Input:
  s = "wordgoodstudentgoodword",
  words = ["word","student"]
Output: []
```
----

现有一组长度相等的字符串，求在父串中有这些字符串组合成的子串(每个字符串只能出现一次)的起始位置

## 解题思路

由于单词长度一样，比对的时候可以取固定长度，然后通过MAP来快速查询

## AC代码

### Javascript

``` javascript
let findSubstring = function(s, words) {
    if (words.length === 0) return []
    let wordlen = words[0].length
    let childlen = wordlen * words.length
    let map = {}
    words.forEach(word => {
        map[word] ? map[word]++ : (map[word] = 1)
    })

    let results = []

    for (let i = 0; i <= s.length - childlen; i++){
        let nowMap = {}
        let count = 0
        for (let j = 0; j < words.length; j++){
            let word = s.substr(i + j * wordlen, wordlen)
            if (map[word]){
                if (nowMap[word]){
                    if (nowMap[word] === map[word]){
                        ok = false
                        break
                    } else {
                        nowMap[word]++
                        count++
                    }
                } else {
                    nowMap[word] = 1
                    count++
                }
            } else {
                ok = false
                break
            }
        }
        if (count === words.length) results.push(i)
    }

    return results
}
```
## 在线链接

[substring-with-concatenation-of-all-words](https://leetcode.com/problems/substring-with-concatenation-of-all-words)

## END

>   2018-08-08  完成
> 
>   2018-08-03  立项