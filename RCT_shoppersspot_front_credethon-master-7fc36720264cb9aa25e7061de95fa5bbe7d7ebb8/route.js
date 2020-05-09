import { Provider, connect } from 'react-redux';
import React from 'react';
import configureStore from './storecreate';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import AppFull from './approutes';
import Login from './modules/login/login';
import Register from './modules/Register/Register';
// const store = configureStore();
const history = createBrowserHistory();
import { HashRouter, Link } from 'react-router-dom';
import { insertToken } from './actions/tokenAction';
import AuthorizedRoute from './AuthorizedRoute'
// const { store, persistStore } = configureStore()
import { persistStore } from 'redux-persist'
import LoadingAnimation from "./loadingAnimation/index";
import { store } from './storecreate';
import NotFoundPage from './modules/pagenotfound/pageNotFound'

console.log('-------------10------------router.js-----')

class Routes extends React.Component {

    constructor(props) {
        super(props);
        this.state = { rehydrated: false }
    }
    componentWillMount() {
        //     persistStore(store, {}, () => {
        //         this.setState({ rehydrated: true })
        //     })

    }

    componentDidMount() {
        this.props.insertToken();
        console.log('-------this.props.insertToken()-------', this.props)
    }
    render() {
        console.log('-------this.props.token-------', this.props.token)
        // if (!this.state.rehydrated) {
        //     return <div>Loading...</div>
        // }
        return (
            <Provider store={store}>
                <HashRouter >
                    <Switch>
                        <Route exact path="/login" name="Login Page" component={Login} />
                        <Route exact path="/register" name="Register Page" component={Register} />
                        {/* <Route path="/" name="Home" component={AppFull} /> */}
                        <Route path="/NotFoundPage" name="NotFoundPage" component={NotFoundPage} />
                        <AuthorizedRoute path="/" name="Home" component={AppFull} />
                        {/* <Route path="*" name="NotFoundPage" component={NotFoundPage} /> */}
                        {/* <Redirect to='/login' /> */}
                        {/* <Redirect to="/NotFoundPage" name="NotFoundPage" component={NotFoundPage} /> */}
                        {/* <LoadingAnimation /> */}
                        {/* {this.props.token && [
                        <Route path="/" name="Home" component={AppFull} />
                    ]} */}
                    </Switch>
                </HashRouter >
            </Provider>
        )
    }
}
const mapStoreToProps = state => ({
    token: state.token.user_token
})
const mapDispatchToProps = {
    insertToken
}
export default connect(mapStoreToProps, mapDispatchToProps)(Routes);
