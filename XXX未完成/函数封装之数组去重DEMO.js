var x=[1,2,4,4,5,6,6,5,4,10,"a","a","a"];

function unique_2loop(arr){//最简单的双循环去重
  var i,j;
  var result=[];
  var l=arr.length;
  loop1:
  for(i=0;i<l;i++){
    var rl=result.length;

    for(j=0;j<rl;j++){
      if(arr[i]===result[j]||typeof arr[i] ==='number' && typeof result[i] ==='number' && isNaN(arr[i])&&isNaN(result[i])){
        continue loop1;
      }
    }
    result.push(arr[i]);
  }
  return result;
}

function unique_2loop_indexOf(arr){
  var result=[];
  var l=arr.length;
  var haveNaN=false;//标记是否有了NaN

  for(var i=0;i<l;i++){
    var rl=result.length;
    var data=arr[i];

    if(result.indexOf(data)===-1||typeof data ==='number' && isNaN(data) && !haveNaN){
      if(!haveNaN&&isNaN(data))haveNaN=true;
      result.push(data);
    }
  }

  return result;
}

function unique_2loop_indexOf_forEach(arr){
  var result = [];
  var haveNaN=false;//标记是否有了NaN

  arr.forEach((data)=>{
    if(result.indexOf(data)===-1||typeof data ==='number' && isNaN(data) && !haveNaN){
      if(!haveNaN&&isNaN(data))haveNaN=true;
      result.push(data);
    }
  });

  return result;
}

function unique(arr){
  var i,str;
  var out=[];
  var hash={};
  hash.object=[];
  var l=arr.length;
  var item,type;
  loop1:
  for(i=0;i<l;i++){
    item=arr[i];
    type=typeof item;
    if(type === 'function'||type === 'object'){
      str='__sign__';
      while(true){
        if(typeof item[str]!=='undefined'){
          if(item[str]===item){
            continue loop1;
          }else{//冲突避免
            str+='_';
            continue;
          }
        }else{
          hash.object.push(item);
          // console.log(hash.object.length);
          item[str]=item;
          out.push(item);
          break;
        }
      }
    }else{//可直接使用hash表示判断
      if(!hash[type])hash[type]={};
      if(!hash[type][item]){
        hash[type][item]=true;
        out.push(item);
      }
    }
  }

  //去除对象当中的引用
  while(true){
    item=hash.object.pop();
    if(item){
      str='__sign__';
      while(true){
        if(typeof item[str]==='object'&&item[str]===item){
          delete item[str];
          break;
        }else{//冲突避免
          str+='_';
          continue;
        }
      }
    }else{
      break;
    }
  }

  return out;
}

function unique_es6(arr){
  return [...new Set(arr)];
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

// 生成纯对象数组
function makeObjectArr(length) {
    var arr = new Array(length);
    var objarray=[];
    var newobj;
    for (var i = 0; i < length; i++) {
        if(Math.random()*2>1){
          newobj={};
          arr[i]=newobj;
          objarray.push(newobj);
        }else{
          arr[i] = objarray[Math.floor(Math.random()*(objarray.length-1))];
        }

    }
    return arr;
}


var numberarr=makeNumberArr(30000,30000);// 纯数字数组
var stringarr=makeStringArr(30000,30000);// 纯字符串数组
var objectarr=makeObjectArr(30000);//纯对象数组


function test(foo,str){
  console.time('纯数字数组测试-'+str);
  console.log(foo(numberarr).length);
  console.timeEnd('纯数字数组测试-'+str);

  console.time('纯字符串数组测试-'+str);
  console.log(foo(stringarr).length);
  console.timeEnd('纯字符串数组测试-'+str);

  console.time('纯对象数组测试-'+str);
  console.log(foo(objectarr).length);
  console.timeEnd('纯对象数组测试-'+str);
}

// test(unique_2loop,'2loop');
test(unique_2loop_indexOf,'unique_2loop_indexOf');
test(unique_2loop_indexOf_forEach,'unique_2loop_indexOf_forEach');
// test(unique,'policy');
// test(unique_es6,'es6');
