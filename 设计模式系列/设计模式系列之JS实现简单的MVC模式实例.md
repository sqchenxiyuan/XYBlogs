# 设计模式系列(1)——JS实现简单的MVC模式实例

前端日益复杂，已经不再是过去简单的展示信息的时代，丰富的交互，丰富的视觉呈现，复杂的数据处理，以及应用级别的网站的出现，前端开发注定不能再如同过去一般。MV*模式也是前端可以借鉴来，解除各个功能间耦合的设计模式，这篇文章只是一个简单的MVC模型的示例和简单阐述，这也是这个系列开始，让我们一起来学习设计模式，让前端开发更加规范，更加轻松，更加清晰！

---

## 简介

**MVC** 是一种设计模式，它主要是解耦数据(Model)和用户界面(View)的关系,由第三组件(Controller)来管理逻辑和用户输入。

### Model(模型)

Model主要管理数据，不涉及用户界面。当它的数据发生改变时，它会通知它的观察者(View),让其作出相应的反应。

总之，Model(模型)主要管理数据。

### View(视图)

View是Model的表现，用于展示Model的数据。View常常可以提供便利的方式来对Model的数据进行编辑处理。

总之，View(视图)主要展示数据。

### Controller(控制器)

Controller是Model和View之间的中介，当用户操作View时(点击、输入等)，它会负责更新Model。

总之，Controller(控制器)主要是提供简单的方法，来管理Model和View之间的关系和变化。

### 简单总结

在MVC里面，就我的理解是这样的

>Model(模型):给View提供数据获取接口并通知改变事件，给Controller提供数据设置接口
>
>View(视图):给Controller提供控制接口并通知用户事件
>
>Controller(控制器):控制

![](https://blog-cdn.chenxiyuan.fun/16-9-18/74405755.jpg)

## 简单示例

``` html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title></title>
	</head>
	<body>
		<input id="test" /><br>
		1:<p class="test"></p><br>
		2:<p class="test"></p><br>
		3:<p class="test"></p><br>
		 <script>
      //模块
		  var testModle={
				data:"",
        //提供设置数据的方法
				setData:function(data){
					this.data=data;
					this.dataChange();
				},
        //提供获取数据的方法
				getData:function(data){
					return this.data;
				},
        //数据更改事件
				dataChange:function(){
					testView.update();
				}
			}

      //视图
			var testView={
        //初始化
				init:function(){
					document.getElementById("test").addEventListener('keyup',this.onchange);
					document.getElementById("test").addEventListener('keydown',this.onchange);
					document.getElementById("test").addEventListener('keyup',function(){
						console.log(234);
					})
				},
        //改变事件
				onchange:function(){
					testControl.putdata();
				},
        //数据更新
				update:function(){
					var ps=document.getElementsByClassName('test');
					for(var i=0;ps[i];i++){
						ps[i].innerHTML=testModle.getData();
					}
				}
			};

      //控制器
			var testControl={
        //初始化
				init:function(){
					testView.init();
				},
        //设置数值
				putdata:function(){
					testModle.setData(document.getElementById("test").value);
				}
			}

			testView.init();
		 </script>
	</body>
</html>
```
