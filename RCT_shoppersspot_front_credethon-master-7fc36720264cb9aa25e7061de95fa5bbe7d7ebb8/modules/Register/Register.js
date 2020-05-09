import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBlock, CardFooter, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {registerUser} from '../../actions/registeractions';
import './Register.css';
import {validation} from './FormValidator';
import Toasts from "../toastor/Toast";
import { addToast } from "../../actions/toastsactions";
import { HashRouter, Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     firstname:'',
    //     lastname:'',
    //     email: '',
    //     password: ''
    // }
    // this.registerAccount = this.registerAccount.bind(this);
    // console.log('-----------register---------------------',this.registerAccount)
    let fields = {};
    fields["username"] = "";
    fields["emailid"] = "";
    fields["mobileno"] = "";
    fields["password"] = "";
    this.state = {
      fields: fields,
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this);

    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
  }
  // updateState(type, event) {
  //     var obj = {};
  //     obj[type] = event.target.value;
  //     console.log('-----------updateState---------------------',obj)
  //     this.setState(obj);
  //     console.log('-----------updateState-------level--------------',this.state)
  // }
  // registerAccount() {
  //   console.log('---------register-------------this.props.actions---------',this.props.actions)
  //     this.props.actions.registerUser({firstname: this.state.firstname, lastname: this.state.lastname,email: this.state.email,password: this.state.password}).then(data => {
  //         if(data.status == 'success'){
  //         this.setState({firstname: '', lastname: '',email:'',password:''});
  //         window.location.href='#/login';
  //         }
  //     });
  // }

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
      addToast({ text: "User! Registered Successfully!!" });
      let fields = {};
      fields["username"] = "";
      fields["emailid"] = "";
      fields["mobileno"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
      console.log('--------fields----------',this.state)
      this.props.actions.registerUser({ firstname: this.state.fields.username, lastname: this.state.fields.username, email: this.state.fields.emailid, password: this.state.fields.password }).then(data => {
        if (data.status == 'success') {
          this.setState({ firstname: '', lastname: '', email: '', password: '' });
          window.location.href = '#/login';
        }
      });
      // alert("Form submitted");
    }
  }

  validateForm() {
    var fields,errors,formIsValid;
    fields = this.state.fields;
    errors = {};
    formIsValid = true;
    console.log('-----------before -------------',fields,formIsValid,errors)
     var {fields,formIsValid,errors} = validation(fields,formIsValid,errors,'register')
    //  .then((obj)=>{
    //    console.log('-----------obj----------',obj)
    //    fields = obj.fields
    //    errors = obj.errors
    //    formIsValid = obj.formIsValid
    //     this.setState({
    //       errors: errors
    //     });
    //     return formIsValid;
    //  })
    console.log('-----------after -------------',fields,formIsValid,errors)
    // if (!fields["username"]) {
    //   formIsValid = false;
    //   errors["username"] = "*Please enter your username.";
    // }

    // if (typeof fields["username"] !== "undefined") {
    //   if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
    //     formIsValid = false;
    //     errors["username"] = "*Please enter alphabet characters only.";
    //   }
    // }

    // if (!fields["emailid"]) {
    //   formIsValid = false;
    //   errors["emailid"] = "*Please enter your email-ID.";
    // }

    // if (typeof fields["emailid"] !== "undefined") {
    //   //regular expression for email validation
    //   var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //   if (!pattern.test(fields["emailid"])) {
    //     formIsValid = false;
    //     errors["emailid"] = "*Please enter valid email-ID.";
    //   }
    // }

    // if (!fields["mobileno"]) {
    //   formIsValid = false;
    //   errors["mobileno"] = "*Please enter your mobile no.";
    // }

    // if (typeof fields["mobileno"] !== "undefined") {
    //   if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
    //     formIsValid = false;
    //     errors["mobileno"] = "*Please enter valid mobile no.";
    //   }
    // }

    // if (!fields["password"]) {
    //   formIsValid = false;
    //   errors["password"] = "*Please enter your password.";
    // }

    // if (typeof fields["password"] !== "undefined") {
    //   if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["password"] = "*Please enter secure and strong password.";
    //   }
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  render() {
    console.log('---------render-----------------')
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3 style={{textAlign:'center',marginBottom:'10%'}}>Registration Page</h3>
          <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
            <label>Name</label>
            <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.username}</div>
            <label>Email ID:</label>
            <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.emailid}</div>
            <label>Mobile No:</label>
            <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.mobileno}</div>
            <label>Password</label>
            <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.password}</div>
            <input type="submit" className="button" value="Register" />
          </form>
          {/* <Link to="/signup" className="btn btn-primary">Sign up</Link> */}
          <Link to="/login" style={{color:'blue',float: 'right'}}>BackToLogin</Link>
        </div>
        <Toasts />
      </div>
      // <div className="app flex-row align-items-center">
      //   <Container>
      //     <Row className="justify-content-center">
      //       <Col md="6">
      //         <Card className="mx-4">
      //           <CardBlock className="card-body p-4">
      //             <h1>Register</h1>
      //             <p className="text-muted">Create your account</p>
      //             <InputGroup className="mb-3">
      //               <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
      //               <Input type="text" placeholder="First name" value={this.state.firstname} onChange = {(e) => this.updateState('firstname', e)}/>
      //             </InputGroup>
      //             <InputGroup className="mb-3">
      //               <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
      //               <Input type="text" placeholder="Last name" value={this.state.lastname} onChange = {(e) => this.updateState('lastname', e)}/>
      //             </InputGroup>
      //             <InputGroup className="mb-3">
      //               <InputGroupAddon>@</InputGroupAddon>
      //               <Input type="text" placeholder="Email" value={this.state.email} onChange = {(e) => this.updateState('email', e)}/>
      //             </InputGroup>
      //             <InputGroup className="mb-3">
      //               <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
      //               <Input type="password" placeholder="Password" value={this.state.password} onChange = {(e) => this.updateState('password', e)}/>
      //             </InputGroup>
      //             <Button color="success" block onClick={this.registerAccount}>Create Account</Button>
      //           </CardBlock>
      //         </Card>
      //       </Col>
      //     </Row>
      //   </Container>
      // </div>
    );
  }
}

Register.propTypes = {
    actions: PropTypes.shape({
    addToast: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps(state, ownProps) {
  console.log('---------mapStateToProps-----------------', state, ownProps, state.list)
  // const { listData } = state.list;
  return {};
}

function mapDispatchToProps(dispatch) {
  console.log('---------mapDispatchToProps-----------------', registerUser, dispatch)
  return {
    actions: bindActionCreators({registerUser,addToast}, dispatch)
    // actions: bindActionCreators({ addToast }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);








// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     const { addToast } = this.props.actions;
//     addToast({ text: "Hello, World!" });
//   }

//   render() {
//     return (
//       <main>
//         <section>
//           <h1>It's getting toasty!</h1>
//           <p>Click the button below to dispatch a toast notification.</p>
//           <button onClick={this.handleClick}>Dispatch</button>
//         </section>
//         <Toasts />
//       </main>
//     );
//   }
// }

// App.propTypes = {
//   actions: PropTypes.shape({
//     addToast: PropTypes.func.isRequired
//   }).isRequired
// };

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators({ addToast }, dispatch)
// });

// export default connect(null, mapDispatchToProps)(App);