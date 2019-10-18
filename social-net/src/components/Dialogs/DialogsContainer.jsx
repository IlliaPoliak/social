import Dialogs from './Dialogs'
import { addMessage } from '../../redux/dialogsReducer'
import { connect } from 'react-redux'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import { compose } from 'redux';


export default compose(
    connect(state => ({ dialogsPage: state.dialogsPage }), { addMessage }),
    withAuthRedirect
)(Dialogs)