/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
let strStr = function(haystack, needle) {
    //sunday算法

    //计算偏移表
    let p = needle.length
    let shift = {}
    for (let i = 0; i < p; i++){
        shift[needle[i]] = p - i
    }

    //匹配
    let i1 = 0 //主串标识
    let i2 = 0 //子串标识
    for (; i1 < haystack.length;){
        i2 = 0
        while (i2 < p && haystack[i1 + i2] === needle[i2]){ i2++ }
        if (i2 === p) break
        i1 = i1 + (shift[haystack[i1 + p]] || p + 1)
    }
    if (i2 === p) return i1
    return -1
}
// let strStr = function(haystack, needle) {
//     return haystack.indexOf(needle)
// }

console.log(strStr("hello", "ll")) //2
console.log(strStr("aaaaa", "bba")) //-1
console.log(strStr("mississippi", "issip")) //4
console.log(strStr("babbbbbabb", "bbab")) //5
console.log(strStr("aabaaabaaac", "aabaaac")) //4
console.log(strStr("mississippi", "pi")) //9
console.log(strStr("mississippi", "ippi")) //7
console.log(strStr("mississippi", "missi")) //0