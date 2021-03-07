import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { profileReducer } from './profileReducer'
import { dialogsReducer } from './dialogsReducer'
import { usersReducer } from './usersReducer'
import { authReducer } from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import { appReducer } from './appReducer';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer, {}, compose(
    applyMiddleware( thunkMiddleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;