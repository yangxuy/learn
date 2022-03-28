// 同步函数的顺序执行
// 前一个函数的输出做下一个函数的输入
function pipeFunction(arr) {
    return arr.reduce((pre, next) => {
        return function(...args) {
            const value = pre.apply(null, args)
            return next(value)
        }
    })
}

const add = (target) => target + 5
const mid = (target) => target * 5
const target = pipeFunction([add, mid])

console.log(target(5))

// 异步处理
const asyncFun = (target) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(target)
        }, Math.random() * 1000)
    })
}
const asyncAdd = async(target) => await asyncFun(target + 5)
const asyncMid = async(target) => await asyncFun(target * 5)

function pipeFunction2(...args) {
    return args.reduce((pre, next) => {
        return async(...target) => {
            const res = await pre.apply(null, target)
            return next(res)
        }
    })
}

const p = pipeFunction2(asyncAdd, asyncMid)
p(5).then((res) => console.log(res))