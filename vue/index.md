### Vue2 和 Vue3 的区别

##### 数据响应式

vue2 通过 object.definedProperty 不能检测到数组修改 index 和 length 的情况，一上来就会对数据进行递归观察不优雅
vue3 通过 Proxy 对对象进行代理，可以实现 vue2 数组观察的缺陷，并且实现了 reactive，shallowReactive，readOnly shallowReadonly 等 api

vue3 观察分为 引用数据类型和基本数据类型观察 对象使用的是 Proxy，普通数据通过 ref

#####
