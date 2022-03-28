### React 事件机制

1. react 并不是把事件绑定在 dom 上面而是把事件代理在 document 上面，通过事件冒泡到 document 上面，阻止事件冒泡的机制是通过 preventDefault
2. 冒泡到 document 上面的事件也不是原生的事件，通过事件合成的方式实现的 将事件统一存放在一个数组，避免频繁的新增与删除

事件合成：抹平了浏览器之间的兼容问题，赋予跨端开发
好处：减少内存消耗，不需要频繁的建立和移除 dom 事件

### react 高阶组件、 render props、hooks 的功能和区别

高阶组件：实现代码的复用，并且不污染原来的组件--》vue mixin
使用场景：代码复用，逻辑抽象、渲染劫持、State 抽象和更改、Props 更改
优点：复用逻辑，不影响包裹组件的内部逻辑
缺点： hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名，进而被覆盖

render props：可以把字组件的 state 放在父组件进行渲染 --》scope-slot
缺点：无法在 return 语句外访问数据、嵌套写法不够优雅

hooks:它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性
优点：在大部分场景下面 让前面两种模式更简单

### react-fiber

React 15 以前 react 的 diff 是整棵树一气呵成进行操作，这样会导致在页面节点过多的情况下容易造成卡顿，不能响应用户操作

为了解决这个问题，需要通过某些调度策略合理地分配 CPU 资源，从而提高浏览器的用户响应速率, 同时兼顾任务执行效率

ReactFiber 架构

- 分批延时对 DOM 进行操作，避免一次性操作大量 DOM 节点，可以得到更好的用户体验
- 给浏览器一点喘息的机会，它会对代码进行编译优化（JIT）及进行热代码优化，或者对 reflow 进行修正

核心思想：
Fiber 也称协程或者纤程；它只是一种控制流程的让出机制。让出 CPU 的执行权，让 CPU 能在这段时间执行其他的操作。**渲染的过程可以被中断**，可以将控制权交回浏览器，让位给高优先级的任务，浏览器空闲后再恢复渲染

### Component、 ELement、Instance 之间的联系和区别

Component：一个具有 render 方法的类
Element：是一个普通的对象，描述了对于一个 DOM 节点或者其他组件 component

### 触发组件重新渲染

- setState
- 父组件重新渲染

### react setState 原理

1. 首先调用 setState(function|object,cb)入口，调用 enqueueSetState
2. enqueueSetState 会将新的 state 放在队列，并调用 enqueueUpdate
3. enqueueUpdate 首先会判断当前是否处于更新状态
   不是 触发更新
   是 收集组件更新放在 dirtyComponents 队列
   此处体现的“任务锁”的思想，是 React 面对大量状态仍然能够实现有序分批处理的基石

### useState 为什么返回的是一个数组不是一个对象

1. 数组的结构可以直接从新赋名，而对象不可以
2. 写法更加优雅

### react hooks 解决了那些问题

1. 复用逻辑麻烦的问题--》通过 hooks 可以单独提出逻辑，使得这些逻辑可以单独测试并复用
2. 复杂组件变得难以理解--》比如生命周期的问题 可以通过 useEffect 解决
3. 难以理解的 class--》函数式编程 更加简单

### useEffect 和 useLayoutEffect 的区别

1. useEffect 发生在 dom 的渲染阶段，异步执行 主要用于 添加订阅、设置定时器、记录日志
2. useLayoutEffect 发生在 Dom 渲染结束，可以并行操作 dom 主要用于 操作 dom，修改样式
3. useLayoutEffect 总是比 useEffect 先执行

### react hooks 在开发中需要注意哪些问题和细节

1. hooks 的调用必须在顶层函数，不能在循环，条件，嵌套中使用
   这是因为 React 需要利用调用顺序来正确更新相应的状态
2. 使用 useState 时候，使用 push，pop，splice 等直接更改数组对象无法获取到最新的值，需要[...oldState,newState]
3. 善用 useCallback，useMemo 具有缓存作用
4. useEffect 里面声明的定时器 要返回一个 clear 函数

### react diff

类型：

- 树比对：由于网页视图中较少有跨层级节点移动，两株虚拟 DOM 树只对同一层次的节点进行比较。
- 组件比对：如果组件是同一类型，则进行树比对，如果不是，则直接放入到补丁中。
- 元素比对：主要发生在同层级中，通过标记节点操作生成补丁，节点操作对应真实的 DOM 剪裁操作

1. 忽略节点跨层级操作场景，提升比对效率，如果当前节点不存在，则其子节点也不进行对比了
2. 如果组件的 class 一致，则默认为相似的树结构，否则默认为不同的树结构。 这也是 PureComponent 及 React.memo 可以提高性能的原因
3. 同一层级的子节点，可以通过标记 key 的方式进行列表对比。
   其中节点重新排序同时涉及插入、移动、删除三个操作，通过 key 可以直接进行移动

### react key 的作用

1. 追踪有哪些节点进行了修改
2. 判断新旧节点是否是一个节点，减少 diff 过程

注意事项

- key 值一定要和具体的元素—一对应
- 尽量不要用数组的 index 去作为 key
- 不要在 render 的时候用随机数或者其他操作给元素加上不稳定的 key
