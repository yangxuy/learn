const PENDING = 'pending'
const FULFILLED = 'fulfill'
const REJECTED = 'rejected'

// const promise =new Promise((resolve,reject)=>promise)
function resolvePromise(promise, x, resolve, reject) {
    if (promise === x) {
        resolve('循环引用')
    }
    // 判断x是否是Promise
    if ((typeof x === 'object' && x != null) || typeof x !== 'function') {
        const then = x.then

        // 这里认为是一个promise
        if (typeof then === 'function') {
            then.call(
                x,
                (re) => {
                    // 递归直到解析的值是普通股值
                    resolvePromise(promise, y, resolve, reject)
                },
                (rj) => {
                    reject(reason)
                }
            )
        } else {
            resolve(x)
        }
    } else {
        resolve(x)
    }
}
class PromiseA {
    constructor(executor) {
        this.state = PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfill = []
        this.onReject = []
        const resolve = (value) => {
            this.state = FULFILLED
            this.value = value
            this.onFulfill.forEach((cb) => cb())
        }
        const reject = (reason) => {
            this.state = REJECTED
            this.reason = reason
            this.onReject.forEach((cb) => cb())
        }
        try {
            executor(resolve, reject)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    }

    then(onResolve, onFailed) {
        onResolve = typeof onResolve === 'function' ? onResolve : (data) => data
        onFailed =
            typeof onFailed === 'function' ?
            onFailed :
            (reason) => {
                throw reason
            }
        const promiseA = new PromiseA((resolve, reject) => {
            if (this.state === PENDING) {
                this.onFulfill.push(() => {
                    setTimeout(() => {
                        const x = onResolve(this.value)
                        resolvePromise(promiseA, x, resolve, reject)
                    })
                })
                this.onReject.push(() => onReject(this.reason))
            }
            if (this.state === FULFILLED) {
                setTimeout(() => {
                    try {
                        const x = onResolve(this.value)
                        resolvePromise(promiseA, x, resolve, reject)
                    } catch (reason) {
                        console.log(reason)
                    }
                })
            }
            if (this.state === REJECTED) {
                setTimeout(() => {
                    try {
                        const x = onFailed(this.reason)
                    } catch (reason) {
                        console.log(reason)
                    }
                })
            }
        })
        return promiseA
    }
}

Promise.MyAll = function(arr) {
    return new Promise(function(resolve, reject) {
        let idx = 0
        let result = []

        function progress(i, current) {
            idx++
            const value = current()
            result.push(value)
            if (idx === i) {
                resolve(result)
            }
        }

        for (let i = 0; i < arr.length; i++) {
            progress(i, arr[i])
        }
    })
}

new PromiseA((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        })
    })
    .then(
        (ret) => {
            console.log(ret)
            return 2
        },
        (reason) => {
            console.log(reason)
        }
    )
    .then((ret) => {
        console.log(ret)
    })