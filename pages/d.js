import Link from 'next/link'
import { withRouter } from 'next/router'
import Comp from '../components/a'

const D = ({ router, name }) => (
    <>
        <Link href="#aaa">
            <a className="link">test</a>
        </Link>
        <style jsx>
            {`
                a {
                    color: blue
                }
                .link {
                    color: yellowgreen
                }
            `}
        </style>
        <style jsx global>
            {`
                a {
                    color: red
                }
            `}
        </style>
    </>
)

export default withRouter(D)