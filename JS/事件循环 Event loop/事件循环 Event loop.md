# 事件循环 Event loop

JS由于是单线程的，为了避免等待I/O的处理阻塞后续事务的执行，具体的运行时往往对I/O操作通过异步操作的形式实现，例如发出请求，读取文件等等。

虽然也会有提供同步执行的形式，但是会阻塞其他事务的执行。

对于这些异步操作，就需要一个事件循环的模型来处理。类似处理完一个事件，然后等待下一个事件，一直这样循环下去。

``` js
while(wait_something){
    do_something
}
```

浏览器和Nodejs是现在JS十分常见的两个运行环境，它们的事件循环各自有各自的定义。

## 浏览器中的事件循环

[浏览器中的事件循环](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)需要一个任务队列(task queue)和一个微任务队列(microtask queue)

每次循环先从任务队列读取一个任务并执行，然后循环处理微任务队列的任务直到微任务队列为空，然后执行浏览器渲染相关的操作(所以如果任务耗时太多就会导致浏览器界面卡顿)。

具体的事件循环如图：

![](https://blog-cdn.chenxiyuan.fun/2020-9-23/c13398a5-335d-4644-8d74-3542c1be9efe.png)

详细流程可以参考[HTML Event Loops 标准 ](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

操作进入的队列

|异步操作|放入队列|
|--|--|
|setTimeout|任务队列|
|setInterval|任务队列|
|事件回调|任务队列|
|Promise.then/catch/finally|微任务队列|

## Nodejs中的事件循环

Nodejs中的事件循环与浏览器中的事件循环不同，将事件循环主要分为了6个阶段：timers、pending callbacks、idle prepare、poll、check和close callbacks

![](https://blog-cdn.chenxiyuan.fun/2020-9-23/61a67c78-352e-4bd7-a520-c4b16c936ee6.png)

每个阶段都是一个FIFO的队列

timers阶段处理`setTimeout`和`setInterval`的计时结束的任务,这些任务是以结束时间构建了一个最小堆，每次检测判断堆顶的任务是否满足要求。

pending callbacks阶段处理执行延迟到下一个循环迭代的I/O回调

idle, prepare阶段处理了nodejs自己的一些任务

poll(轮询)阶段检索新的I/O回调，执行它的处理

check阶段处理`setImmediate`的回调，但是在这之前会再次判断timers阶段是否有完成的任务

close callbacks阶段处理`close`事件的回调(poll阶段不会处理)

此外每个回调事件处理完后会处理`process.nextTick`的队列，每处理一个`nextTick`回调，会清空微任务队列。

![](https://blog-cdn.chenxiyuan.fun/2020-9-24/cfa2cbb5-4535-4d46-bf6d-1d4490501b7d.png)

详细可以参考 [Node.js 事件循环](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop) [Nodejs 源码事件循环](https://github.com/nodejs/node/blob/62443686d9cf0915186d696ba48a0ae1f4926625/deps/uv/src/win/core.c#L596) [Nodejs 任务处理](https://github.com/nodejs/node/blob/178e52a7ead2ef9ffb6eb5e17be167f17beb45a8/lib/internal/process/task_queues.js#L65)

## 参考资料

[HTML标准 Event Loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops)

[Node.js 事件循环](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)

[Nodejs 源码事件循环](https://github.com/nodejs/node/blob/62443686d9cf0915186d696ba48a0ae1f4926625/deps/uv/src/win/core.c#L596)

[Nodejs 任务处理](https://github.com/nodejs/node/blob/178e52a7ead2ef9ffb6eb5e17be167f17beb45a8/lib/internal/process/task_queues.js#L65)


## END

>   2020-09-24  立项

>   2020-09-23  立项