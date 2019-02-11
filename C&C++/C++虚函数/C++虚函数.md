# C++虚函数

最近上了一门课老师让研究一下C++的虚函数的实现原理，emmmmm，于是就有了这篇文章，一起来看下C++虚函数的底层原理吧~~~

## 面向内存编程

面对C++这个底层的语言，有的时候不得不说的面向内存编程，为此这边文章先从C++对象占用的内存大小来看，这里先看一个简单的C++对象

``` C++
#include <iostream>
#include <stdlib.h>
using namespace std;

class SimpleClass{
    public:
        int x;
        float y;
};

int main()
{
    SimpleClass s;

    cout << sizeof(s) << endl;
    system("pause");

    return 0;
}
```

![](http://blog-cdn.chenxiyuan.fun/18-9-25/845589.jpg)

输出`8`意味着这个对象实例化后是`8`个字节，其中`4`个字节为`int`类型的`x`属性，另`4`个字节为`float`类型的`y`属性一半

这时候再加一个函数试试看呢

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class SimpleClass{
    public:
        int x;
        float y;
        void print(){
            cout << x << endl;
        }
};

int main()
{
    SimpleClass s;

    cout << sizeof(s) << endl;
    system("pause");

    return 0;
}
```

这段代码输出结果依然是`8`,可以看到一个普通的成员函数是不会占据实例对象的内存的，因为成员函数是处于类作用域下面的全局函数，为此函数不会占据存储空间，但是看下面的代码

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class SimpleClass{
    public:
        void print(){
            cout << "hello" << endl;
        }
};

int main()
{
    SimpleClass s;

    cout << sizeof(s) << endl;
    system("pause");

    return 0;
}
```

![](http://blog-cdn.chenxiyuan.fun/18-9-25/72420102.jpg)

纯粹的只有函数的类，实例化后并不是不占用内存，而是依然占据的`1`个字节的内存，不为`0`的原因是占位，防止冲突，接下来看下虚函数的内存空间是如何的

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class SimpleClass{
    public:
        virtual void print(){
            cout << "hello" << endl;
        }
};

int main()
{
    SimpleClass s;

    cout << sizeof(s) << endl;
    system("pause");

    return 0;
}
```

![](http://blog-cdn.chenxiyuan.fun/18-9-25/44163621.jpg)

这里可以看到从`1`个占位字节上升到了`4`个字节，是不是很困惑？虚函数和普通函数的差别在哪呢？下面将会从面向对象编程的思维来看待

## 面向对象的思维

首先看下下面简单的代码

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class A
{
    public:
        void print()
        {
            cout<<"This is A"<<endl;
        }
};
 
class B : A
{
    public:
        void print()
        {
            cout<<"This is B"<<endl;
        }
};

int main()
{
    A a;
    B b;

    a.print();
    b.print();
    system("pause");

    return 0;
}
```

这个的结果很明显是

```
This is A
This is B
```

当然使用指针的时候结果当然也是如此

``` c++
int main()
{
    A a;
    B b;
   
    A * pa = &a;
    B * pb = &b;

    pa->print();
    pb->print();
    system("pause");

    return 0;
}
```

但是这样的代码呢？

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class A
{
    public:
        void print()
        {
            cout<<"This is A"<<endl;
        }
};
 
class B : public A
{
    public:
        void print()
        {
            cout<<"This is B"<<endl;
        }
};

int main()
{
    A a;
    B b;
   
    A * pa = &a;
    A * pb = &b;

    pa->print();
    pb->print();
    system("pause");

    return 0;
}
```

如果了解清楚一点是可以知道输出结果会变成

```
This is A
This is A
```

### 多态

在上面的代码中，A、B类的print函数都是各自定义了自己的输出，当想要某种输出的时候必须要显式的指明类型，这对于的程序的扩展性很不好，所以需要多态来解决问题，多态就是将接口与实现进行分离，不同个体提供相同的方法，但因个体差异，而采用不同的策略。而`virtual`关键词定义的虚函数就是实现多态的方式

``` c++

#include <iostream>
#include <stdlib.h>
using namespace std;

class A
{
    public:
        virtual void print()
        {
            cout<<"This is A"<<endl;
        }
};
 
class B : public A
{
    public:
        virtual void print()
        {
            cout<<"This is B"<<endl;
        }
};

int main()
{
    A a;
    B b;
   
    A * pa = &a;
    A * pb = &b;

    pa->print();
    pb->print();
    system("pause");

    return 0;
}
```

这下结果就变回了

```
This is A
This is B
```

也许现在还是觉得这样可能多次一举，但是这样改变一下呢

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class A
{
    public:
        void print()
        {
            cout<<"This is A print"<<endl;
        }

        virtual void virtualPrint()
        {
            cout<<"This is A virtualPrint"<<endl;
        }
};
 
class B : public A
{
    public:
        void print()
        {
            cout<<"This is B print"<<endl;
        }

        virtual void virtualPrint()
        {
            cout<<"This is B virtualPrint"<<endl;
        }
};

A * getPrinter(){
    A * p;
    if(rand() % 2 == 0){
        p = new A();
    } else {
        p = new B();
    }
    return p;
}

int main()
{
    A a;
    B b;

    for(int i = 0; i < 10; i++){
        getPrinter()->print();
        getPrinter()->virtualPrint();
    }
    system("pause");

    return 0;
}
```

![](http://blog-cdn.chenxiyuan.fun/18-9-26/28910857.jpg)

`getPrinter`函数作为一个生产printer的函数，使用虚函数后外部就不需要知道其具体的类型能正确的执行各自的操作，而不使用虚函数就全部执行的指定的类型的函数

那么虚函数的实现原理是什么呢？

## 虚函数表

在上面查看内存的时候发现添加了虚函数以后，空的类实例化会占据4个字节的内存，而这4个字节(在64位系统就是8字节)的内存其实就是一个指针，指向了一个虚函数表

![](http://blog-cdn.chenxiyuan.fun/18-9-26/75910568.jpg)

大致结构就是这样，具体也可以在宇宙第一IDE种查看下面的类

``` c++
class SimpleClass{
    public:
        virtual void f1(){
            cout << "f1" << endl;
        }

        virtual void f2() {
            cout << "f2" << endl;
        }
};
```

可以看到它的结构是这样的

![](http://blog-cdn.chenxiyuan.fun/18-9-26/77527731.jpg)

虚函数的多态，同名函数会覆盖父类的函数，不同名的会追加

``` c++
#include <iostream>
#include <stdlib.h>
using namespace std;

class SimpleClass{
    public:
        virtual void f1(){
            cout << "f1" << endl;
        }

        virtual void f2() {
            cout << "f2" << endl;
        }
};

class BigClass : public SimpleClass {
    public:
        virtual void f1() {
            cout << "f11" << endl;
        }

        virtual void f3() {
            cout << "f3" << endl;
        }
};

int main()
{
    SimpleClass simpleClass;
    BigClass sigClass;

    return 0;
}
```

![](http://blog-cdn.chenxiyuan.fun/18-9-26/37806363.jpg)

可以从图中看到，重写了的函数在虚函数表中的指针地址不一样，没有重写的保持和父类一致

## 总结

虚函数这里差不多就介绍这么多了，详细可以继续深入探究，在这里总结一下简单的内容：

1.  实例化的对象至少有一个字节的占位符
2.  普通成员函数处于类的全局作用域下，不会占据实例化对象的内存空间
3.  类定义了虚函数后，实例化后会多一个虚函数表指针，这个指针指向一个虚函数表
4.  虚函数表里是指向函数实体的函数指针，多态重写函数后原来的指针会指向新的函数，新增的虚函数会依次排在函数表的后面

## END

>   2018-09-26   完成
> 
>   2018-09-25   立项