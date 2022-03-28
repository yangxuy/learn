// 实现函数链式调用
// 异步执行函数
// LazyMan('tony').eat('水果').eat('米饭').sleep(1000).eat('晚饭')

class LazyMan {
    constructor(name) {
        console.log(`我是${name}`)
        this.name = name
        this.taskList = []

        setTimeout(() => {
            this.next()
        }, 0)
    }

    eat(type) {
        this.taskList.push(() => {
            console.log(`${this.name} 吃了: ${type}`)
            this.next()
        })
        return this
    }

    sleep(time) {
        this.taskList.push(() => {
            setTimeout(() => {
                console.log(`${this.name} 睡了：${time}`)
                this.next()
            }, time)
        })
        return this
    }

    next() {
        const fn = this.taskList.shift()
        fn && fn()
    }
}

new LazyMan('tony').eat('水果').eat('米饭').sleep(1000).eat('晚饭')