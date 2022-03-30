// 从数组中选出不相邻数据的最大和
const arr = [1, 2, 4, 1, 7, 8, 3]

function ret_opt(arr, i) {
    if (i == 0) {
        return arr[i]
    } else if (i == 1) {
        return Math.max(arr[i], arr[i - 1])
    } else {
        const A = retOpt(arr, i - 2) + arr[i]
        const B = retOpt(arr, i - 1)
        return Math.max(A, B)
    }
}

// console.log(ret_opt(arr, 6))

function db_opt(arr) {
    const len = arr.length
    const opts = Array.from(len)
    opts[0] = arr[0]
    opts[1] = Math.max(arr[1], arr[0])

    for (let i = 2; i < len; i++) {
        const A = opts[i - 2] + arr[i]
        const B = opts[i - 1]
        opts[i] = Math.max(A, B)
    }
    return opts[len - 1]
}

// console.log(db_opt(arr))

// 求一个数组是否可以累加为一个给定的值

const recArr = [3, 34, 4, 12, 5, 2]
    //        arr[i]  i   0   1   2  3  4  5  6  7  8  9
    //        3       0   T   f   f  T  f  f  f  f  f  f
    //        34      1   T   f   f  T  f  f  f  f  f  f
    //        4       2   T   f   f  T  T
    //        12      3   T
    //        5       4   T
    //        2       5   T

// opts(2,4)=opts(1,4)||opts(1,0)

function rec_sub(arr, i, sub) {
    if (i == 0) {
        return arr[i] == sub
    } else if (sub == 0) {
        return true
    } else if (arr[i] > sub) {
        return rec_sub(arr, i - 1, sub)
    } else {
        const A = rec_sub(arr, i - 1, sub - arr[i]) // 选择第i个值
        const B = rec_sub(arr, i - 1, sub) // 不选择第i个值
        return A || B
    }
}

// console.log(rec_sub(recArr, 6, 9))
// console.log(rec_sub(recArr, 6, 13))

function db_sub(arr, sub) {
    const opts = []
        // 初始化二维数组
    for (let i = 0; i < arr.length; i++) {
        opts[i] = []
        for (let j = 0; j <= sub; j++) {
            // 当j==0的时候 值为true 当i==0 opts[0][j]=arr[i]==j
            if (j == 0 || (i == 0 && arr[i] == j)) {
                opts[i][j] = true
            } else {
                opts[i][j] = false
            }
        }
    }

    // 按个计算
    for (let i = 1; i < arr.length; i++) {
        for (let j = 1; j <= sub; j++) {
            if (arr[i] > j) {
                opts[i][j] = opts[i - 1][j]
            } else {
                const A = opts[i - 1][j - arr[i]]
                const B = opts[i - 1][j]
                opts[i][j] = A || B
            }
        }
    }

    return opts[arr.length - 1][sub]
}

console.log(rec_sub(recArr, 6, 13))
console.log(db_sub(recArr, 13))