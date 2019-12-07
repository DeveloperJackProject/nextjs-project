# Day 1
1.yarn和npm区别 - yarn速度快

    并行安装：
        无论 npm 还是 Yarn 在执行包的安装时，都会执行一系列任务。npm 是按照队列执行每个 package，也就是说必须要等到当前 package 安装完成之后，才能继续后面的安装。
        而 Yarn 是同步执行所有任务，提高了性能。

    离线模式：
        如果之前已经安装过一个软件包，用Yarn再次安装时之间从缓存中获取，就不用像npm那样再从网络下载了。


2.如何手动创建react+next的项目：

    yarn add react react-dom next

3.如何通过脚手架创建react+next项目：

    npm install -g create-next-app
    npx create-next-app projectname
    或者
    yarn create next-app projectname

# Day 2
1.koa就是对nodejs的http模块进行了一个简单的封装

    koa2中间件模式
    const server = new Koa();
    server.use(middleware);
    or
    server.use(async (ctx, next) => {
        //ctx 记录请求和请求的内容，返回也是使用ctx，例如希望请求返回一段代码，就是ctx.body = '<span>body</span>'
        // 返回数据，则是ctx.body = {success: true}，另外需要ctx.set('Content-Type', 'application/json')
        //next 调用下一个中间件， await next()，不加入这句话，则无法执行下一个中间件
    });
    /// KOA1中使用的是Generator

2.KOA的ctx中的：

    ctx中的很多对象属性是代理到的ctx.request和ctx.response，例子ctx.header实际是ctx.request.header
    request：koa的resquest对象，对nodejs的resquest对象的high level的封装
    response：koa的response对象，对nodejs的response对象的high level的封装
    req：nodejs的request对象
    res：nodejs的response对象

    koa-router

    const router = new Router()
    //定义对于某一个路径下的某一个method该是用那一个函数来处理
    router.get('/test/:id', (ctx) => {
        //ctx.params.id就能获取传递参数
    })
    //调用设置的router
    server.use(router.routes())

3.结合next使用

    server.use(async (ctx, next) => {
        //使用req和res的原因是，next为了兼容各个node server，这样就能保证统一的输入处理
        await handle(ctx.req, ctx.res)
        ctx.respond = false
    });

4.redis安装

    windows: https://github.com/MicrosoftArchive/redis/releases
    Mac: 
        方法1：下载之后，进入folder执行make进行编译，然后sudo make install
        方法2：安装Homebrew，先brew update,然后brew install redis

5.redis基础使用

    redis-cli -p port
    set key value: 存入值
    get key：获取值
    setex key timeout value： 可以设置数据过期时间(单位：秒)，这样就可以省去代码中处理过期逻辑。例如session过期
    KEYs *：获取所有的KEY
    DEL keyname：删除存储的键值对

6.node链接redis

    使用ioredis进行链接


# other

   + 关于next的小坑
        + next的getRequestHandler只支持node的request和response
        + next默认不支持css，也就是import语法，会failed to compile，因为有CSS in JS

            解决方法：yarn add @zeit/next-css
            ```
                const withCss = require('@zeit/next-css')
                //withLess

                if(typeof require !== 'undefined'){
                    require.extensions['.css'] = file => {}
                }

                module.exports = withCss({})
                // module.exports = withLess(withCss({}))
            ```
        + next引用antd的组件，如何引用样式

            方法1：在page下，创建_app.js复写原next/app，然后在其中引用
            ```
                import App from 'next/app'
                import 'antd/dist/antd.css'
                export default App;
            ```
            
            方法2：在babelrc中配置，添加style那一行，但是在webpack会有问题，[mini-css-extract-plugin]会报错
            ```
                {
                    "presets": ["next/babel"],
                    "plugins": [
                        [
                            "import", {
                                "libraryName": "antd",
                                "style": "css"
                            }
                        ]
                    ]
                }
            ```
            