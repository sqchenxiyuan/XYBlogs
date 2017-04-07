// var lengthOfLongestSubstring = function(s) {
//     let l=s.length;
//     let hashMap={};
//     let max=0;
//     // let maxstr="";
//
//     let n=0;
//     for(let i = 0; i < l; i++){
//         let char = s[i];
//         n++;
//         if(hashMap[char] === undefined || i-hashMap[char] >= n){
//             if(n > max){
//                 max = n;
//                 // maxstr = s.substr(i-n+1,n);
//             }
//         }else{
//             n=i-hashMap[char];
//         }
//         // console.log(char,i,hashMap[char] , n)
//         hashMap[char]=i;
//     }
//
//     if(n>max){
//         max=n;
//         maxstr=s.substr(i-n,n);
//     }
//
//     return max;
// };

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

console.log(lengthOfLongestSubstring("pwwkew"));
