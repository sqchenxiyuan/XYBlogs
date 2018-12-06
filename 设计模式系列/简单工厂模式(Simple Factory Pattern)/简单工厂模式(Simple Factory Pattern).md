# 简单工厂模式(Simple Factory Pattern)

本文简单讲述简单工厂模式

## 功能

**简单工厂模式**其实算不上设计模式，但是由于十分简单好用，所以经常被使用到，它是一种创建类的设计模式，对对象的创建进行的了封装

简单工厂模式也十分容易理解，就是传入一个容易理解的参数，来获取对应的复杂对象，就像工厂一样我想要什么，工厂就会给我生成什么出来

## URL结构图

![](http://blog-cdn.chenxiyuan.fun/18-12-5/45163999.jpg)

## 示例

### 工厂生产汽车

``` c++
#include <iostream>
using namespace std;

//汽车类
class Car {
public:
    virtual void didi() {
        cout << "滴滴" << endl;
    }
};

class SedanCar :public Car {
public:
    virtual void didi() {
        cout << "滴滴 小轿车" << endl;
    }
};

class BigTruck :public Car {
public:
    virtual void didi() {
        cout << "滴滴 大卡车" << endl;
    }
};

//工厂类
class CarFactory {
public:
    Car * createCar(string carType) {
        if (carType == "Car") {
            return new Car();
        }
        else if (carType == "SedanCar") {
            return new SedanCar();
        }
        else if (carType == "BigTruck") {
            return new BigTruck();
        }
        else {
            return nullptr;
        }
    }
};

int main()
{
    Car * car;
    CarFactory carFactory;
    car = carFactory.createCar("Car");
    car->didi();
    car = carFactory.createCar("SedanCar");
    car->didi();
    car = carFactory.createCar("BigTruck");
    car->didi();
}
```

这个示例里面，使用工厂类来生成具体的汽车类，可以让客户端不需要知道具体的汽车类，只需要接触工厂

## END

>   2018-12-06  完成
> 
>   2018-12-05  立项