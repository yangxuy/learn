### HTTP

##### HTTP/0.9

1. 只有一个命令 GET
2. 协议规定，服务器只能回应 HTML 格式的字符串，不能回应别的格式

##### HTTP/1.0

1. 支持 GET,POST,HEAD
2. 请求需要带上请求头，用来描述一些元数据
3. 响应增加了响应头，状态码，权限，缓存，内容编码，多字符集支持

缺点：HTTP/1.0 版的主要缺点是，每个 TCP 连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接
TCP 连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢
解决办法：**Connection: keep-alive**

##### HTTP/1.1

1. 持久化链接，即 TCP 链接默认不关闭，大多数浏览器允许同时建立 6 个持久连接 2.管道机制
2. 管道机制，即一个 TCP 链接里面客户端可以同时发送多个请求，但是服务器还是需要按照顺序返回
3. content-length 字段规定返回的长度
4. 分块传输编码，产生一块数据，就发送一块 Transfer-Encoding: chunked
5. 增加了 PUT,OPTION,PATCH,DELETE 请求方式

缺点：管道机制允许一个 TCP 发送多个请求，所有发送是按顺序进行的，前一个回应完成才会进行下一个，势必会造成堵塞，称为‘队头堵塞’
解决方法：减少 http 发送次数，同时多开持久连接

##### HTTP/2.0

**只能运行在 HTTPS 环境下**

1. 二进制协议 头信息和数据体都是二进制，并且统称为"帧"（frame）：头信息帧和数据帧
2. 多工 在服用 TCP 链接的时候，不需要按照顺序进行返回
3. 数据流 HTTP/2.0 将每个请求或回应的数据包，称为数据流，每个数据流都有一个独一无二的编码，数据包发送的时候都会带上这个标识用来区分它属于哪个数据流，客户端发出的数据流，ID 一律为奇数，服务器发出的，ID 为偶数。
4. 头信息压缩 一方面头信息通过 gzip 和 compress 压缩，另一方面客户端和服务器维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就提高速度了
5. 服务器推送 主动向客户端发送资源，这叫做服务器推送

##### 升级 https

1. 获取证书，证书是一个二进制文件，在经销商购买
2. 安装证书
3. 修改链接把 http 修改成 https
4. 301 重定向 将 HTTP 协议的访问导向 HTTPS 协议
