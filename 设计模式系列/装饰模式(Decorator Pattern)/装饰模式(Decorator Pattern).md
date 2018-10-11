# 装饰模式(Decorator Pattern)

本文简单讲述装饰模式

## 功能

**装饰模式(Decorator Pattern)**可以动态的给一个对象添加额外的功能。

也就是可以在保持原始功能的情况下对原始功能增加额外的修饰能力的模式，例如人可以使用衣服来装饰自己的外表。

## UML结构图

![](http://o7yupdhjc.bkt.clouddn.com/18-10-11/96618075.jpg)

## 实例

### 人物衣着装饰

``` c++
#include "pch.h"
#include <iostream>
using namespace std;

//原本类
class Person {
public :
    Person() {};
    Person(char* name){
	    this->name = name;
    }

    virtual void show() {
	    cout << name<< endl;
    }

private:
    char* name;
};

//服装类
class Clothes : public Person {
protected:
    Person * component;

public:
    void decorate(Person * component) {
	    this->component = component;
    }

    virtual void show() {
	    if (component != NULL) {
		    component->show();
	    }
    }
};

//具体服装类
class Tshirts : public Clothes {
public:
    Tshirts(int number) {
	    this->number = number;
    }
		
    virtual void show() {
	    cout << number << "号体恤 ";
	    Clothes::show();
    }

private:
    int number;
};

class Jeans : public Clothes {
public:
    virtual void show() {
	    cout << "牛仔裤 ";
	    Clothes::show();
    }

private:
    int number;
};

int main()
{
    char name[] = "爱和圣殿";
    Person person(name);
    Tshirts tshirts(11);
    Jeans jeans;

    tshirts.decorate(&person);
    jeans.decorate(&tshirts);

    jeans.show();
}
```

在这个实例中看到牛仔裤调用show一般很容易让人晕，其实这里的**牛仔裤**在工厂函数输出后是一个`person`对象,经过修饰后的一个人！，这里很容易被误导

## END

>   2018-10-11   完成
> 
>   2018-10-11   立项