import Header from './Header';
import { setAuthUserData } from './../../redux/authReducer'
import { connect } from 'react-redux';
import { logout } from '../../redux/authReducer';

let mapStateToProps = state => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
})

export default connect(mapStateToProps, { setAuthUserData, logout })(Header);