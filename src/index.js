// React
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

// Redux
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { syncHistoryWithStore } from 'react-router-redux';

// 3rd party
import { createBrowserHistory } from 'history';

// store
import reducer from './store/reducers';

// custom
import * as serviceWorker from './utils/serviceWorker';
import './index.css';
import App from './app/App';
import About from './app/About';
import Track from './app/Track';

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const hashHistory = createBrowserHistory();
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route exact path="/" component={App} />
            <Route path="/about" component={About} />
            <Route path="/tracks/:id" component={Track} />
        </Router>
    </Provider>,
    document.getElementById('root'),
);

serviceWorker.unregister();

// import { createStore } from 'redux';

// function playlist(state = [], action) {
//     console.log('action =>', action);
//     if (action.type === 'ADD_TRACK') {
//         return [...state, action.payload];
//     }
//     return state;
// }

// const store = createStore(playlist);

// const addTrackBtn = document.querySelectorAll('.addTrack')[0];
// const trackInput = document.querySelectorAll('.trackInput')[0];
// const list = document.querySelectorAll('.list')[0];

// store.subscribe(() => {
//     const arr = store.getState();
//     list.innerHTML = '';
//     arr.forEach(track => {
//         const li = document.createElement('li');
//         li.textContent = track;
//         list.appendChild(li);
//     });
// });

// addTrackBtn.addEventListener('click', () => {
//     const trackName = trackInput.value;
//     store.dispatch({ type: 'ADD_TRACK', payload: trackName });
//     trackInput.value = '';
// });
