import { withRouter } from 'next/router'
import Comp from '../components/b'
import { resolve } from 'any-promise'

const B = ({ router, name }) => <Comp>{ router.query.id } { name }</Comp>

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

export default withRouter(B)