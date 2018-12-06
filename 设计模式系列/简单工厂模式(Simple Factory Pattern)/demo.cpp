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