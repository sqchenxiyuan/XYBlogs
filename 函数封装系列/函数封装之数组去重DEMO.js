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

function unique_hash_type_sign(arr){
  var result = [];
  var objs = [];
  var hashMap={};
  var data,sign,type,l=arr.length;//标记

  for(var i=0;i<l;i++){
    data=arr[i];
    type=typeof data;
    if(type === 'object' || type === 'function'){
      sign="__sign__";//标记的键值
      while(true){
        if(data[sign] !== undefined){
          if(data[sign]===data){
            break;//存在重复的
          }else{//冲突避免
            sign+='_';
          }
        }else{
          objs.push({
            obj:data,
            str:sign
          });
          data[sign]=data;
          result.push(data);
          break;
        }
      }
    }else{
      if(!hashMap[type])hashMap[type]={};
      if(!hashMap[type][data]){
        hashMap[type][data]=true;
        result.push(data);
      }
    }
  }

  l=objs.length;
  for(i=0;i<l;i++){
    var obj=objs[i];
    delete obj.obj[obj.str];
  }

  return result;
}

function unique_hash_sort(arr){
  if(arr.length===0)return [];
  arr= arr.slice().sort();
  var result=[];
  var haveNaN=false;
  result.push(arr[0]);
  arr.reduce((last,data)=>{

    if(data !== last||typeof data ==='number' && isNaN(data) && !haveNaN){
      if(!haveNaN&&isNaN(data))haveNaN=true;
      result.push(data);
    }

    return data;
  });

  return result;
}

function unique_ES6_arrFrom(arr){
  return Array.from(new Set(arr));
}

function unique_ES6_Set(arr){
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


var numberarr=makeNumberArr(300000,300000);// 纯数字数组
var stringarr=makeStringArr(300000,300000);// 纯字符串数组
var objectarr=makeObjectArr(300000);//纯对象数组
var arrData={
  number:[],
  string:[],
  object:[]
};

var data=[10,100,1000,10000,100000,500000,1000000];
data.forEach((num)=>{
  arrData.number.push(makeNumberArr(num,num));
  arrData.string.push(makeStringArr(num,num));
  arrData.object.push(makeObjectArr(num));
});



function test(foo,str){
  var i,j=10;
  data.forEach((num,index)=>{
    var numberTime=testTime(arrData.number[index],foo,100);
    var stringTime=testTime(arrData.number[index],foo,100);
    var objectTime=testTime(arrData.number[index],foo,100);

    console.log('测试-'+str+'-'+num+' : '+(numberTime+stringTime+objectTime)/3+' ms');
  });
}

function testTime(arr,foo,time = 1){
  var start=new Date().getTime();
  for(var i=0;i<time;i++){
    foo(arr);
  }
  return (new Date().getTime()-start)/time;
}

// test(unique_2loop,'2loop');
// test(unique_2loop_indexOf,'unique_2loop_indexOf');
// test(unique_2loop_indexOf_forEach,'unique_2loop_indexOf_forEach');
// test(unique_hash_type_sign,'unique_hash_type_sign');
// test(unique_hash_sort,'unique_hash_sort');
// test(unique_ES6_arrFrom,'unique_ES6_arrFrom');
test(unique_ES6_Set,'unique_ES6_Set');
