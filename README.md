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


# Day 3 

1.getInitialProps

2.自定义_app，即用自定义的_app覆盖next默认的app

    用来固定布局
    例如保持公用状态，如Redux
    给页面传入自定义的数据（类似全局数据）
    自定义一些错误处理

    import App, { Container } from 'next/app'

    import 'antd/dist/antd.css'

    class MyApp extends App {
        render() {
            // render的时候，Component对应的就是每个页面
            const { Component } = this.props

            return (
                <Container>
                    <Component/>
                </Container>
            )
        }
    }

    export default MyApp;

    //更多拓展

    import App, { Container } from 'next/app'
    import Link from 'next/link'

    import 'antd/dist/antd.css'

    class MyApp extends App {

        // getInitialProps的时候，Component对应的就是每个页面
        // 每一次页面切换都会被执行
        static async getInitialProps ({ Component, ctx }){
            let pageProps;
            if(Component.getInitialProps) {
                pageProps = await Component.getInitialProps(ctx)
            }
            return {
                pageProps
            }
        }

        render() {
            // render的时候，Component对应的就是每个页面
            // 在render中传递各种想要给每个page传递的值
            const { Component, pageProps } = this.props

            return (
                <Container>
                    <div>
                        <Link href="/">Back to Index</Link>
                    </div>
                    <Component {...pageProps}/>
                </Container>
            )
        }
    }

    export default MyApp;

3.自定义document

    只有在服务端渲染的时候才会调用，是用来修改服务端渲染的文档内容，一般用来配合第三方css-in-js方案使用
    基础重写模板

    import Document, { Html, Head, Main, NextScript } from 'next/document'

    class MyDocument extends Document {

        static async getInitialProps(ctx){
            const props = await Document.getInitialProps(ctx)
            return {
                ...props
            };
        }

        render() {
            return <Html>
                <Head>

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        }
    }

    export default MyDocument

4.定义样式，使用css-in-js方案




# next

+ Link组件，页面跳转: Link组件必须填充节点，而且，必须是唯一节点

    import { Button } from "antd"
    import Link from 'next/link'

    export default () => (
        <Link href="/a">
            <Button>Index</Button>
        </Link>
    )

+ Router模块，代码跳转

    import { Button } from "antd"
    import Link from 'next/link'
    import Router from 'next/router'

    export default () => {

        function goToB(){
            Router.push('/b')
            // 也可以使用对象方式

            Router.push({
                pathname: '/b'
            })
        }

        return (
            <>
                <Link href="/a">
                    <Button>Jump to A</Button>
                </Link>
                <Button onClick={goToB}>Jump to B</Button>
            </>

        )
    }

+ 动态路由只能通过query

    import { Button } from "antd"
    import Link from 'next/link'
    import Router from 'next/router'

    export default () => {

        function goToB(){
            Router.push('/b?a=1')
            // 也可以使用对象方式

            Router.push({
                pathname: '/b'，
                query: {
                    id:2
                }
            })
        }

        return (
            <>
                <Link href="/a?a=2">
                    <Button>Jump to A</Button>
                </Link>
                <Button onClick={goToB}>Jump to B</Button>
            </>

        )
    }

    获取传递参数使用withRouter

        import { withRouter } from 'next/router'
        import Comp from '../components/b'

        const B = ({ router }) => <Comp>{ router.query.id }</Comp>

        export default withRouter(B)

+ 路由映射: 

    link标签的as属性

        <Link href="/a" as="/page/a">
            <Button>Jump to A</Button>
        </Link>

    Router.push的第二个参数

        Router.push({
            pathname: '/b'，
            query: {
                id:2
            }
        }, '/page/b')

    以上方法访问之后，刷新页面会出现404，需要在KOA中配置将服务器访问地址转化成前端实际访问地址：

    const router = new Router()

    router.get('/a/:id', async (ctx)=>{
        const id = ctx.params.id
        await handle(ctx.req, ctx.res, {
            pathname: '/a',
            query: {
                id:2
            }
        })
        ctx.respond = false
    })

    server.use(router.routes)


+ Router的钩子

    // 所有的路由钩子名称，写在了一个数组中

    const events = [
        'routeChangeStart',
        'routeChangeComplete',
        'routeChnageError',
        'beforeHistoryChange',
        'hashChangeStart',
        'hashChangeComplete'
    ]

    // 通过一个高阶函数在钩子触发后执行自定义的逻辑，这里直接输出了钩子名称和钩子函数的参数

    function makeEvent(type) {
        return (...args) => {
            console.log(type, ...args)
        }
    }

    //通过forEach遍历 绑定钩子事件
    
    events.forEach(event => {
        Router.events.on(event, makeEvent(event))
    })

    //当路由发生跳转 => routeChangeStart => beforeHistoryChange => routeChangeComplete
    //hash改变 => hashChangeStart => hashChangeComplete
        
+ getInitialProps (请求页面需要的数据)

    在页面中获取数据/在App中获取全局性数据，可以帮我们完成客户端和服务器端的数据同步
    是nextjs的数据获取规范，只有pages下面组件的getInitialProps才会被调用
    浏览器直接输入地址，则服务器端请求数据渲染
    如果通过react的link/router跳转，则在客户端请求服务端数据

    import { withRouter } from 'next/router'
    import Comp from '../components/b'

    const B = ({ router, name }) => <Comp>{ router.query.id } { name }</Comp>

    // 同步
    B.getInitialProps = () => {
        return {
            name: 'jack'
        }
    }

    export default withRouter(B)

    //异步
    B.getInitialProps = async () => {
        const promise = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    name: 'jack'
                })
            }, 1000)
        })
        return await promise
    }




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

        + 特殊字体fira code： https://github.com/tonsky/FiraCode
            