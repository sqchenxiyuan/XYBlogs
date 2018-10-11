#include <iostream>
#include <vector>

using namespace std;

class Observer {
public:
    virtual void update() {}
};

class Subject {
public:
    void attach(Observer * o) {
        observers.push_back(o);
    }

    void detach(Observer * o) {
        for (vector<Observer *>::iterator it = observers.begin(); it!=observers.end(); it++) {
            if (*it == o) {
                observers.erase(it);
                break;
            }
        }
    }

    void notify() {
        int count = observers.size();
        for (int i = 0; i < count; i++) {
            observers.at(i)->update();
        }
    }

private:
    vector<Observer*> observers;
};

class ConcreteSubject : public Subject {
public:
    string subjectState;
};

class ConcreteObserver : public Observer {
public:
    ConcreteObserver(string name, ConcreteSubject * subject) {
        this->name = name;
        this->subject = subject;
    }
    string oberverState;
    virtual void update() {
        oberverState = subject->subjectState;
        cout << "观察者：" << name.c_str() << "  新状态：" <<oberverState.c_str() << endl;
    }
private:
    string name;
    ConcreteSubject * subject;
};

int main()
{
    ConcreteSubject subject1;

    ConcreteObserver observer1("A", &subject1);
    ConcreteObserver observer2("B", &subject1);

    subject1.attach(&observer1);
    subject1.attach(&observer2);

    subject1.subjectState = "123";
    subject1.notify();
}