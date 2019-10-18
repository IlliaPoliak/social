import Posts from './Posts';
import { connect } from 'react-redux'
import { addPost } from '../../../redux/profileReducer'

export default connect( state =>({ posts: state.profilePage.posts }), { addPost })(Posts);