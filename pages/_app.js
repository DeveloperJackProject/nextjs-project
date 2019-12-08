import App, { Container } from 'next/app'
import Link from 'next/link'

import 'antd/dist/antd.css'

class MyApp extends App {

    // getInitialProps的时候，Component对应的就是每个页面
    // 每一次页面切换都会被执行
    static async getInitialProps ({ Component }){
        let pageProps;
        if(Component.getInitialProps) {
            pageProps = await Component.getInitialProps()
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