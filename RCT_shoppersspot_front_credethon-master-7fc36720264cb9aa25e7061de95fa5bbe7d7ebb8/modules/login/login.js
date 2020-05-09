import React, { Component } from "react";
import { Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginuser ,socialLoginuser} from '../../actions/loginactions';
import PropTypes from "prop-types";
import Toasts from "../toastor/Toast";
import { addToast } from "../../actions/toastsactions";
import {addLoader,removeLoader} from "../../actions/loader";
import '../Register/Register.css';
import { validation } from '../Register/FormValidator';
import { GoogleLogin } from 'react-google-login-component';
import './loginCss.css';
import { registerUser } from '../../actions/registeractions';
import { Googlekey, Password } from '../../constant';

class Login extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   email: '',
    //   password: ''
    // }
    // this.login = this.login.bind(this);
    // this.register = this.register.bind(this);

    let fields = {};
    fields["emailid"] = "";
    fields["password"] = "";
    this.state = {
      fields: fields,
      errors: {},
      loading:true
    }
    this.google = `${Googlekey}`
    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }
  handleChange(e) {
    let fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({
      fields
    });
  }

  submituserRegistrationForm(e) {
    e.preventDefault();
    if (this.validateForm()) {
      const { addToast } = this.props.actions;
      addToast({ text: "User! Loggedin Successfully!!", color: 'red' });
      let fields = {};
      fields["emailid"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
      console.log('--------fields----------', this.state.fields.password, this.state.fields.emailid)
      this.props.actions.loginuser({ password: this.state.fields.password, email: this.state.fields.emailid }).then(data => {
        this.props.actions.addLoader({})
        localStorage.setItem('loading',true)
        // alert("Form submitted");
      })
    }
  }

  validateForm() {
    var fields, errors, formIsValid;
    fields = this.state.fields;
    errors = {};
    formIsValid = true;
    console.log('-----------before ---login----------', fields, formIsValid, errors)
    var { fields, formIsValid, errors } = validation(fields, formIsValid, errors, 'login')
    console.log('-----------after -----login--------', fields, formIsValid, errors)
    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  responseGoogle(googleUser) {
    console.log('--------googleUser---------')
    // var id_token = googleUser.getAuthResponse().id_token;
    // var googleId = googleUser.getId();
    // console.log({ googleId });
    // console.log({accessToken: id_token});

    if (googleUser.getAuthResponse().id_token) {
      const { addToast } = this.props.actions;
      addToast({ text: "User! Social Loggedin Successfully!!", color: 'green' });
      var profile = googleUser.getBasicProfile();
      const userDetails = {
        'user_email': profile.getEmail(),
        'firstName': profile.ofa,
        'lastName': profile.wea,
        'userName': profile.ig,
        'mediaType': 'google',
        "mediaUniqueid": profile.getId(),
        "profilePicture": profile.Paa
      }
      console.log('-----userDetails---------', userDetails.user_email, Password)
      this.props.actions.registerUser({ email: userDetails.user_email, password: Password }).then(data => {
        console.log('-----data-------1----', data)
        this.props.actions.loginuser({ email: userDetails.user_email, password: Password }).then(Data => {
          console.log('-----Data-------2----', Data)
        })
      }).catch(error => {
        throw (error);
      });
    }
  }

  // updateState(type, event) {
  //   var obj = {};
  //   obj[type] = event.target.value;
  //   this.setState(obj);
  // }
  // login() {
  //   if (this.state.password != '' && this.state.email != '') {
  //     const { addToast } = this.props.actions;
  //     addToast({ text: "User! Loggedin Successfully!!" });
  //     this.props.actions.loginuser({ password: this.state.password, email: this.state.email }).then(data => {
  //       console.log('--------data---login------', data, this.state)
  //       // this.setState({email: '',password:''});
  //       //   return listApi.redirectToLogin(cat).then(cats => {
  //       //     console.log('----------login action-----------',cats)
  //       //     if (cats.success) {
  //       //         dispatch(success(cats.data));
  //       //         localStorage.setItem('auth', cats.data._id)
  //       //         localStorage.setItem('islogin', true);
  //       //         localStorage.setItem('user_id', cats.data._id);
  //       //         localStorage.setItem('email', cats.data.email);
  //       //         window.location.href = "#/dashboard";
  //       //     }
  //       // }).catch(error => {
  //       //     dispatch(fail(error));
  //       //     throw (error);
  //       // });
  //     });

  //   }
  // }

  register() {
    window.location.href = '#/register';
  }
  render() {
    const margin = {
      marginLeft: '35%',
      marginTop: '-10%'
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <img src="../../logo.jpg" style={margin} />
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    {/* <p className="text-muted">Sign In to your account</p> */}
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                      <label>Email ID:</label>
                      <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} />
                      <div className="errorMsg">{this.state.errors.emailid}</div>
                      <label>Password</label>
                      <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
                      <div className="errorMsg">{this.state.errors.password}</div>
                      <input type="submit" className="button" value="Login" />
                    </form>
                  </CardBlock>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBlock className="card-body text-center">
                    <div>
                      <h2>Sign up</h2>
                      {/* <p>E-commerce brings convenience for customers as they do not have to leave home and only need to browse website online, especially for buying the products which are not sold in nearby shops.</p> */}
                      <Button color="primary" className="mt-3" active onClick={this.register}>Register Now!</Button>
                      <div className="login-divider">
                        <span>OR</span>
                      </div>
                      <GoogleLogin socialId={this.google}
                        className="google-login loginBtn--google "
                        scope="email profile openid"
                        fetchBasicProfile={true}
                        responseHandler={this.responseGoogle}
                        buttonText="Login With Google" />
                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
        {/* <Toasts /> */}
      </div>
    );
  }

  // render() {
  //   console.log('---------render-----------------')
  //   return (
  //     <div id="main-registration-container">
  //       <div id="register">
  //         <h3 style={{textAlign:'center',marginBottom:'10%'}}>Registration page</h3>
  //         <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
  //           <label>Email ID:</label>
  //           <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} />
  //           <div className="errorMsg">{this.state.errors.emailid}</div>
  //           <label>Password</label>
  //           <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
  //           <div className="errorMsg">{this.state.errors.password}</div>
  //           <input type="submit" className="button" value="Register" />
  //         </form>
  //       </div>
  //       <Toasts />
  //     </div>
  //   );
  // }

}

Login.propTypes = {
  actions: PropTypes.shape({
    addToast: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state, ownProps) {
  // const {listData} = state.list;
  console.log('-------------------satate of login-------------', state)
  // const {token} = state.token;
  const { login } = state.login;
  // console.log(state.list,listData,token,login ,'fine----------------------')
  return { login };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ loginuser, addToast, socialLoginuser,registerUser,addLoader }, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);