var x=[1,2,4,4,5,6,6,5,4,10,"a","a","a"];

//1.会去除数组中的null和undefined元素


function quc(arr){
  var out=[];
  var hash={};
  var l=arr.length;
  var item,type;
  for(var i=0;i<l;i++){
    if(type === 'null' || type === 'undefined'){//去除数组中的null和undefined元素
      continue;
    }
    item=arr[i];
    type=typeof item;
    if(type === 'function'||type === 'object'){

    }else{//可直接使用hash表示判断
      if(!hash[item]){
        hash[item]=true;
        out.push(item);
      }
    }
  }
  return out;
}



// 生成纯数字数组
function makeNumberArr(length, size) {
    var arr = new Array(length);
    for (var i = 0; i < length; i++) {
        arr[i] = Math.floor(Math.random() * size);
    }
    return arr;
}

// 生成纯文本数组
function makeStringArr(length, size) {
    var arr = new Array(length);
    for (var i = 0; i < length; i++) {
        arr[i] = String(Math.floor(Math.random() * size));
    }
    return arr;
}


var numberarr=makeNumberArr(3000,3000);// 纯数字数组
var stringarr=makeStringArr(3000,3000);// 纯字符串数组

console.time('纯数字数组测试');
console.log(quc(numberarr).length);
console.timeEnd('纯数字数组测试');

console.time('纯字符串数组测试');
console.log(quc(stringarr).length);
console.timeEnd('纯字符串数组测试');
