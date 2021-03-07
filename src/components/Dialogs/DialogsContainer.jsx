import Dialogs from './Dialogs'
import { addMessage } from '../../reducers/dialogsReducer'
import { connect } from 'react-redux'
import {withAuthRedirect} from '../hoc/withAuthRedirect'
import { compose } from 'redux';
import { reset } from 'redux-form';

export default compose(
    connect(state => ({ dialogsPage: state.dialogsPage }), { addMessage, reset }),
    withAuthRedirect
)(Dialogs)