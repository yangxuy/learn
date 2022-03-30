function fibo(n) {
    if (n == 1 || n == 2) {
        return 1
    } else {
        return fibo(n - 1) + fibo(n - 2)
    }
}

function db_fibo(n) {
    const opts = Array.from(n)
    opts[0] = 1
    opts[1] = 1

    for (let i = 2; i < n; i++) {
        opts[i] = opts[i - 1] + opts[i - 2]
    }
    return opts[n - 1]
}

console.log(fibo(10))
console.log(db_fibo(10))