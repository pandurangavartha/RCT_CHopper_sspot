import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import { insertToken } from './actions/tokenAction';

class AuthorizedRoute extends React.Component {
  // componentDidMount() {
  //   this.props.insertToken()
  //   console.log('-------this.props.insertToken()-------', this.props)
  // }
  render() {
    console.log('--------this.props--------AuthorizedRoute-------', this.props.login, this.props.login.loggedIn,this.props.login.pending)
    const { component: Component, ...rest } = this.props
    const {pending, loggedIn} =  this.props.login
    console.log('--------component: Component, pending, loggedIn, ...rest---------------', pending, loggedIn, ...rest)
    return (
      <Route {...rest} render={props => {
        if (pending) return <div>Loading...</div>
        return loggedIn
          ? <Component {...props} />
          : <Redirect to="/login" />
      }} />
    )
  }
}

function mapStateToProps(state) {
  // const { protectLogin } = state.login;
  console.log('----------------authorized-------------------',state)
  return {
    login: state.login
  };
}

// function mapStateToProps(state) {
//   let token = state.token.user_token
//   console.log('--------mapStateToProps-----Auth----------',this.state,this.props,state.token)
//   let authentication = state.token.loggedIn === true ? {loggedIn:true, pending:false} : {loggedIn:false, pending:false}
//   console.log('------------------',authentication)
//   const { loggedIn, pending } = authentication;

//   return {
//     token,loggedIn, pending
//   };
// }

// const mapDispatchToProps = {
//   insertToken
// }

export default connect(mapStateToProps)(AuthorizedRoute)
