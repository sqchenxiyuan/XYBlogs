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