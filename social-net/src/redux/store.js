import { dialogsReducer } from './dialogsReducer';
import { profileReducer } from './profileReducer';

let store = {
    _state: {
        postsPage: {
            posts: [
                { id: 121212, text: 'post 1', countLikes: 36 },
                { id: 213123, text: 'post 2', countLikes: 4 },
                { id: 432123, text: 'post 3', countLikes: 39 },
                { id: 556322, text: 'post 4', countLikes: 51 }
            ],
            newPostBody: ''
        },
        dialogsPage: {
            dialogs: [
                { id: 199091, name: 'Illia Poliak' },
                { id: 222333, name: 'Tat Poliak' },
                { id: 334567, name: 'Serg Poliak' },
                { id: 434665, name: 'Michel' },
                { id: 527564, name: 'John' }
            ],
            messages: [
                { id: 123, text: 'Test text' },
                { id: 321, text: 'Test text' },
                { id: 213, text: 'Test text' },
                { id: 456, text: 'Test text' },
                { id: 754, text: 'JTest text' }
            ],
            newMessageBody: ''
        }
    },
    _callSubscriber() { },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },
    dispatch(action) {
        this._state.postsPage = profileReducer(this._state.postsPage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._callSubscriber(this._state)
    }
}

export default store