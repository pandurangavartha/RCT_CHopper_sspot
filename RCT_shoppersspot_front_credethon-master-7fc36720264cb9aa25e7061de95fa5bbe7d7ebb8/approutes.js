import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import ShowList from './modules/Listing/list';
import Gallery from './modules/Gallery/gallery';
import Upload from './modules/uploads/upload';
import Shipping from './modules/shipping/shipping';
import listView from './modules/listView/listView';
import Header from './modules/Header/header';
import Footer from './modules/Footer/footer';
import Sidebar from './modules/sidebar/sidebar';
import Trackorder from './modules/TrackOrder/trackorder';
import Productdetail from './modules/productview/productview';
import Payment from './modules/payment/payment';
import { insertToken } from './actions/tokenAction';
import { Provider, connect } from 'react-redux';
import AuthorizedRoute from './AuthorizedRoute'
import Toasts from "./modules/toastor/Toast";
import { persistStore, autoRehydrate } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingAnimation from "./loadingAnimation/index";
import NotFoundPage from './modules/pagenotfound/pageNotFound'


console.log('-------------8-------appRoutes.js----------')

class AppFull extends Component {

  // componentWillMount() {
  //   persistStore(store, {}, () => {
  //     this.setState({ rehydrated: true })
  //   })
  // }

  componentDidMount() {
    this.props.insertToken()
    console.log('-------componentDidMount----AppFull---', this.props)
  }

  render() {
    console.log('-------this.props.token--AppFull-----', this.props.token,this.props.loader[0].loading,localStorage.getItem('loading'))
    // if (!this.state.rehydrated) {
    //   return <div>Loading...</div>
    // }
    return (
      <div className="app">
      {this.props.loader[0].loading && <LoadingAnimation />}
        <Header />

        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Container fluid>
              <Switch>
                {/* <AuthorizedRoute path="/" name="Home" /> component={AuthorizedRoute}*/}
                <Route path="/dashboard" name="Dashboard" component={Gallery} />,
                {/* {this.props.token && [ */}
                <Route path="/gallery/:slug" name="Dashboard" component={Gallery} />,
                  <Route exact path="/components/upload" name="Dashboard" component={Upload} />,
                  <Route exact path="/components/gallery" name="Dashboard" component={Gallery} />,
                  <Route exact path="/components/trackorders" name="Dashboard" component={Trackorder} />,
                  <Route exact path="/prouduct" name="Dashboard" component={Productdetail} />,
                  <Route exact path="/payment" name="Dashboard" component={Payment} />,
                  <Route exact path="/listview" name="listView" component={listView} />,
                  <Route path="/components/cart" name="Dashboard" component={Shipping} />,
                  
                  {/* <Route path="*" name="NotFoundPage" component={NotFoundPage} /> */}
                  {/* <Redirect from="/" name="Home" to="dashboard" /> */}
                {/* ]} */}
                <Redirect to="/NotFoundPage" name="NotFoundPage" />
              </Switch>
            </Container>
            <Toasts />
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStoreToProps = state => ({
  token: state.token.user_token,
  loader:state.loader
})
const mapDispatchToProps = {
  insertToken
}
export default connect(mapStoreToProps, mapDispatchToProps)(AppFull);