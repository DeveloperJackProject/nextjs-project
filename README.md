# Day 1
1.yarn和npm区别 - yarn速度快

    并行安装：
        无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。
        而 Yarn 是同步执行所有任务，提高了性能。

    离线模式：
        如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。


2.如何手动创建react+next的项目：

    ```
        yarn add react react-dom next
    ```

3.如何通过脚手架创建react+next项目：

    ```
        npm install -g create-next-app
        npx create-next-app projectname
        或者
        yarn create next-app projectname
    ```

# Day 2
1.koa就是对nodejs的http模块进行了一个简单的封装

    koa2中间件模式
    ```
        const server = new Koa();
        server.use(middleware);
        or
        server.use(async (ctx, next) => {
            //ctx 记录请求和请求的内容，返回也是使用ctx，例如希望请求返回一段代码，就是ctx.body = '<span>body</span>'
            // 返回数据，则是ctx.body = {success: true}，另外需要ctx.set('Content-Type', 'application/json')
            //next 调用下一个中间件， await next()，不加入这句话，则无法执行下一个中间件
        });
        /// KOA1中使用的是Generator
    ```

2.KOA的ctx中的：

    ctx中的很多对象属性是代理到的ctx.request和ctx.response，例子ctx.header实际是ctx.request.header
    request：koa的resquest对象，对nodejs的resquest对象的high level的封装
    response：koa的response对象，对nodejs的response对象的high level的封装
    req：nodejs的request对象
    res：nodejs的response对象

    koa-router
    ```
        const router = new Router()
        //定义对于某一个路径下的某一个method该是用那一个函数来处理
        router.get('/test/:id', (ctx) => {
            //ctx.params.id就能获取传递参数
        })
        //调用设置的router
        server.use(router.routes())
    ```

3.结合next使用

    ```
        server.use(async (ctx, next) => {
            //使用req和res的原因是，next为了兼容各个node server，这样就能保证统一的输入处理
            await handle(ctx.req, ctx.res)
            ctx.respond = false
        });
    ```