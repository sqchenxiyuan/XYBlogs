# 编程题 leetcode 13 Roman to Integer

leetcode 13 Roman to Integer解析

## 题目

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

|Symbol|Value|
|---|---|
|I|1|
|V|5|
|X|10|
|L|50|
|C|100|
|D|500|
|M|1000|

Examples:

For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

+ `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
+ `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
+ `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

Example 1:
```
Input: "III"
Output: 3
```

Example 2:
```
Input: "IV"
Output: 4
```

Example 3:
```
Input: "IX"
Output: 9
```

Example 4:
```
Input: "LVIII"
Output: 58
Explanation: C = 100, L = 50, XXX = 30 and III = 3.
```

Example 5:
```
Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
```
-----

这道题就是对题12的反转将罗马数字转换为阿拉伯数字，思路差不多

## 解题思路

## AC代码

### Javascript

``` javascript
let romanToInt = function(s) {
    let code = [
        ["I", "V"],
        ["X", "L"],
        ["C", "D"],
        ["M", "A"],
        ["A", "A"]
    ]

    let base = 1
    let i = 0
    let number = 0
    while (1){
        if (!code[i + 1]) break

        let reg4 = new RegExp(`${code[i][0]}${code[i][1]}`)
        let reg9 = new RegExp(`${code[i][0]}${code[i + 1][0]}`)
        let regNor = new RegExp(`${code[i][0]}+`)
        let regGt = new RegExp(`${code[i][1]}${code[i][0]}*`)

        if (reg4.test(s)){
            number = number + base * 4
            s = s.replace(reg4, "")
        } else if (reg9.test(s)){
            number = number + base * 9
            s = s.replace(reg9, "")
        } else if (regGt.test(s)){
            number = number + base * (s.match(regGt)[0].length - 1 + 5)
            s = s.replace(regGt, "")
        } else if (regNor.test(s)){
            number = number + base * s.match(regNor)[0].length
            s = s.replace(regNor, "")
        }

        i = i + 1
        base = base * 10

        if (s === ""){
            break
        }
    }

    return number
}
```

## 在线链接

[roman-to-integer](https://leetcode.com/problems/roman-to-integer)

## END

>   2018-06-08  完成

>   2018-06-08  立项
