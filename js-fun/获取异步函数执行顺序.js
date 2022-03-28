// ABCDE 获取5个异步函数的执行顺序
const asyncFun = (target) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`${target} 执行了`)
            resolve(target)
        }, Math.random() * 1000)
    })
}

const A = async() => await asyncFun('A')
const B = async() => await asyncFun('B')
const C = async() => await asyncFun('C')
const D = async() => await asyncFun('D')
const E = async() => await asyncFun('E')

function pipeFn(...fns) {
    let idx = 0
    let result = []
    async function process(index, fn, resolve) {
        const ret = await fn()
        idx++
        result.push({
            idx,
            name: fn.name
        })
        if (index === fns.length - 1) {
            resolve(result)
        }
    }

    return function() {
        return new Promise((resolve, reject) => {
            fns.forEach((fn, index) => {
                process(index, fn, resolve)
            })
        })
    }
}

const t = pipeFn(A, B, C, D, E)

t().then((ret) => {
    console.log(ret)
})