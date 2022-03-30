//
//       B    D  F
//   A
//       C    E
//

const graph = {
    A: ['B', 'C'],
    B: ['A', 'D', 'C'],
    C: ['A', 'B', 'D', 'E'],
    D: ['B', 'C', 'E', 'F'],
    E: ['C', 'D'],
    F: ['D']
}

// 广度优先遍历
function BFS(graph, p) {
    let queue = []
    queue.push(p)
    const seen = new Set()

    ret = []
    while (queue.length) {
        // 拿出队列的第一个
        const vertex = queue.shift()
        ret.push(vertex)
        seen.add(vertex)
            // 拿出队列相邻的
        const nodes = graph[vertex]

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            if (!seen.has(node)) {
                queue.push(node)
                seen.add(node)
            }
        }
    }
    console.log(ret)
}

BFS(graph, 'A')

// 利用bfs计算最短路径
// 只需要在bfs遍历过程中 标记一个循环点的前一个点即可
function BFSPath(graph, p1, p2) {
    const queue = []
    queue.push(p1)

    const seen = new Set()

    // 存储路径
    const map = new Map()

    map.set(p1, null)
    while (queue.length > 0) {
        const vertex = queue.shift()
        const nodes = graph[vertex]
        seen.add(vertex)
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i]
            if (!seen.has(node)) {
                seen.add(node)
                queue.push(node)
                map.set(node, vertex)
            }
        }
    }

    while (p2) {
        console.log(`${p2}前一个节点是：${map.get(p2)}`)
        p2 = map.get(p2)
    }
}

BFSPath(graph, 'A', 'F')

function DFS(graph, p) {
    const stack = []
    stack.push(p)
    const seen = new Set()

    let ret = []
    while (stack.length) {
        let vertex = stack.pop()
        seen.add(vertex)
        ret.push(vertex)
        const nodes = graph[vertex]
        for (let i = 0; i < nodes.length; i++) {
            if (!seen.has(nodes[i])) {
                seen.add(nodes[i])
                stack.push(nodes[i])
            }
        }
    }

    console.log(ret)
}

// DFS(graph, 'A')