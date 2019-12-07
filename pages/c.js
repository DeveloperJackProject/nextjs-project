import { withRouter } from 'next/router'
import Comp from '../components/b'

const B = ({ router }) => <Comp>{ router.query.id }</Comp>

export default withRouter(B)