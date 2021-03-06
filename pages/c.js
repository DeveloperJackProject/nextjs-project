import { withRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Comp = dynamic(import('../components/b'))

const B = ({ router, name }) => <Comp>{ router.query.id } { name }</Comp>

B.getInitialProps = async () => {
    console.log("page");
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: 'jack'
            })
        }, 1000)
    })
    return await promise
}

export default withRouter(B)