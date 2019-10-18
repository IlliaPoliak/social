import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './redux/redux-store';
import App from './App';
import './index.css';

ReactDOM.render(
    // HashRouter <BrowserRouter basename={process.env.PUBLIC_URL}>
    <HashRouter>
        <Provider store={store} >
            <App />
        </Provider>
    </HashRouter>, document.getElementById('root'));


serviceWorker.unregister();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA