import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../reducers/authReducer';

let mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    authUserId: state.auth.id,
    profile: state.profilePage.profile,
    errors: state.app.errors,
    success: state.app.success
})

export default connect(mapStateToProps, { logout })(Header);