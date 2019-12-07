import { Button } from "antd"
import Link from 'next/link'
import Router from 'next/router'

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


export default () => {

    function goToB(){
        Router.push('/b')
    }

    function goToC(){
        Router.push({
            pathname: '/c',
            query: {
                id:2
            }
        })
    }

    return (
        <>
            <Link href="/a" as="/page/a">
                <Button>Jump to A</Button>
            </Link>
            <Button onClick={goToB}>Jump to B</Button>
            <Button onClick={goToC}>Jump to C</Button>
        </>

    )
}