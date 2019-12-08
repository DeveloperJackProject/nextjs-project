import Link from 'next/link'
import { Button } from 'antd'
import styled from 'styled-components'
import { withRouter } from 'next/router'

const Title = styled.h1`
    color: yellow;
    font-size: 40px;
`;

const B = ({time}) => <>
    <Title>Title</Title>
    <Link href="/b#1234">
        <Button>{time}</Button>
    </Link>
</>

B.getInitialProps = async () => {
    const moment = await import('moment')

    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'jack',
                time:moment.default(Date.now() - 60 * 1000).fromNow()
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(B)