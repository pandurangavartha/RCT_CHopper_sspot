import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import App from './App.jsx';
import "!!style-loader!css-loader!./node_modules/bootstrap/dist/css/bootstrap.css";
import './scss/_custom.scss';
import '!!style-loader!css-loader!./scss/custom.css';
import '!!style-loader!css-loader!./scss/font-awesome.min.css';
import '!!style-loader!file-loader!./scss/simple-line-icons.min.css';
import ShowList from './modules/Listing/list';
import Routes from './route';
import Header from './modules/Header/header';
import Sidebar from './modules/sidebar/sidebar';
import configureStore from './storecreate';
// const store = configureStore();
const history = createBrowserHistory();
// const { store, persistor } = configureStore()
import { PersistGate } from 'redux-persist/integration/react'
// import { persistStore, persistReducer } from 'redux-persist'
import { persistStore, autoRehydrate } from 'redux-persist'
// import PersistedStore from "./Persist";
import { store, persistor } from './storecreate';
import LoadingAnimation from "./loadingAnimation/index";

// const store =  configureStore();
console.log('------------11----------------main.js-')
// constructor(props) {
//     super(props);
//     this.state = { rehydrated: false }
// }
// componentWillMount() {
//     persistStore(store, {}, () => {
//         this.setState({ rehydrated: true })
//     })
// }
// persistStore(store, {}, () => {
ReactDOM.render((
    <div  >
        <div >
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Routes />
                </PersistGate>
            </Provider>
        </div>
    </div>
), document.getElementById('root'));
// registerServiceWorker();
// })
// class App1 extends Component {
//     render() {
//         const persistor = persistStore(store);
//         return (
//             <Provider store={store}>
//                 <PersistGate persistor={persistor}>
//                     <Routes />
//                 </PersistGate>
//             </Provider>
//         );
//     }
// }

// export default App1;

// const app = (
//     <Provider store={store}>
//             <Routes />
//     </Provider>
// );

// ReactDOM.render( app, document.getElementById( 'root' ) );