// #include <iostream>
// #include <stdlib.h>
// using namespace std;

// class SimpleClass{
//     public:
//         int x;
//         float y;
// };

// int main()
// {
//     SimpleClass s;

//     cout << sizeof(s) << endl;
//     system("pause");

//     return 0;
// }

// #include <iostream>
// #include <stdlib.h>
// using namespace std;

// class SimpleClass{
//     public:
//         int x;
//         float y;
//         void print(){
//             cout << x << endl;
//         }
// };

// int main()
// {
//     SimpleClass s;

//     cout << sizeof(s) << endl;
//     system("pause");

//     return 0;
// }

// #include <iostream>
// #include <stdlib.h>
// using namespace std;

// class SimpleClass{
//     public:
//         void print(){
//             cout << "hello" << endl;
//         }
// };

// int main()
// {
//     SimpleClass s;

//     cout << sizeof(s) << endl;
//     system("pause");

//     return 0;
// }

// #include <iostream>
// #include <stdlib.h>
// using namespace std;

// class SimpleClass{
//     public:
//         virtual void print(){
//             cout << "hello" << endl;
//         }
// };

// int main()
// {
//     SimpleClass s;

//     cout << sizeof(s) << endl;
//     system("pause");

//     return 0;
// }


// #include <iostream>
// #include <stdlib.h>
// using namespace std;

// class A
// {
//     public:
//         void print()
//         {
//             cout<<"This is A"<<endl;
//         }
// };
 
// class B : A
// {
//     public:
//         void print()
//         {
//             cout<<"This is B"<<endl;
//         }
// };

// int main()
// {
//     A a;
//     B b;
   
//     A * pa = &a;
//     B * pb = &b;

//     pa->print();
//     pb->print();
//     system("pause");

//     return 0;
// }


// #include <iostream>
// #include <stdlib.h>
// using namespace std;

// class A
// {
//     public:
//         void print()
//         {
//             cout<<"This is A"<<endl;
//         }
// };
 
// class B : public A
// {
//     public:
//         void print()
//         {
//             cout<<"This is B"<<endl;
//         }
// };

// int main()
// {
//     A a;
//     B b;
   
//     A * pa = &a;
//     A * pb = &b;

//     pa->print();
//     pb->print();
//     system("pause");

//     return 0;
// }


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