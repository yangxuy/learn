function foo(...args1) {
    foo.params = [...args1]
    return function fn(...args2) {
        return foo(...args1, ...args2)
    }
}

Function.prototype.getValue = function() {
    return foo.params.reduce((pre, next) => pre + next)
}

const fn = foo(1)(2)(3, 4, 5)

console.log(fn.getValue())