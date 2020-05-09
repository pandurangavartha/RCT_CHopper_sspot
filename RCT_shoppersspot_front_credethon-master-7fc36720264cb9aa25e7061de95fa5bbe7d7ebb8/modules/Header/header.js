import React, { Component } from 'react';
import {
  Badge,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  NavbarBrand, Input,
  DropdownToggle,
  Label
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gettheproducts, cartproducts, ordertheproduct, cancelorder } from '../../actions/headeractions';
import { logoutuser } from '../../actions/logout';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import { loginOutUser } from '../../actions/loginactions';
import { addToast } from '../../actions/toastsactions';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import Popup from '../../Modal/modal';
import ModalPopup from '../../ModalPopup/Modal';
import Toasts from "../toastor/Toast";
import PropTypes from "prop-types";
import { validation } from '../Register/FormValidator';
import { UpdateProfiles, getProfileDetails } from '../../actions/registeractions';

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      large: false,
      primary: false,
      productscart: [],
      getProfileDetailsData: [],
      cartid: '',
      subtotal: 0,
      position: "top-right",
      alerts: [],
      timeout: 400,
      showPopup: false,
      isShowing: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleLarge = this.toggleLarge.bind(this);
    this.togglePrimary = this.togglePrimary.bind(this);
    this.logout = this.logout.bind(this);
    this.closetoggleLarge = this.closetoggleLarge.bind(this);
    this.orderProduct = this.orderProduct.bind(this);
    this.loadProducts = this.loadProducts.bind(this);
    this.cancelOrder = this.cancelOrder.bind(this);
    this.openModalHandler = this.openModalHandler.bind(this);
    this.openModalHandlerProfile = this.openModalHandlerProfile.bind(this);
    this.closeModalHandlerProfile = this.closeModalHandlerProfile.bind(this);
    this.getDetailsUse = this.getDetailsUse.bind(this);
  }

  getDetailsUse() {
    this.props.actions.getProfileDetails().then(data => {
      console.log('-------data----getDetailsUse-------', data.result, [data.result])
      this.setState({ getProfileDetailsData: [data.result] });
    })
  }

  openModalHandlerProfile() {
    this.getDetailsUse()
    this.setState({
      isShowingProfile: true
    });
  }

  closeModalHandlerProfile() {
    this.setState({
      isShowingProfile: false
    });
  }

  openModalHandler() {
    this.setState({
      isShowing: true
    });
    this.toggleLarge('modal-popup')
  }

  closeModalHandler() {
    this.setState({
      isShowing: false
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onAlertDismissed(alert) {
    const alerts = this.state.alerts;
    const idx = alerts.indexOf(alert);
    if (idx >= 0) {
      this.setState({
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
  }
  orderProduct(productid) {
    var collectprouctids = [];
    // var entered=true;
    this.state.productscart.map(cart => {
      collectprouctids.push(cart._id);
    })
    localStorage.setItem('saveids', collectprouctids);
    localStorage.setItem('price', this.state.subtotal);
    // collectprouctids.map(id=>{
    //     this.props.actions.ordertheproduct({ "docid":id, "user_id":localStorage.getItem('user_id')})
    // })
    // if(entered){
    //     entered=false
    this.setState({
      large: !this.state.large
    });
    //    const type='success';
    //     const newAlert ={
    //			id: (new Date()).getTime(),
    //			type: type,
    //			headline: `Whoa, ${type}!`,
    //			message: 'products are placed successfully and delivered soon'
    //		};
    //  this.setState({alerts: [...this.state.alerts, newAlert] })
    // }
    window.location.href = '#/payment'
  }
  loadProducts(productid) {
    this.props.actions.gettheproducts();
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  logout() {
    const { addToast } = this.props.actions;
    addToast({ text: "User! LoggedOut Successfully!!", color: 'blue' });
    this.props.actions.logoutuser()
    window.location.href = '#/login'
    // localStorage.setItem('islogin',false);
    //  localStorage.setItem('email','')
    localStorage.clear()
    this.props.actions.loginOutUser({})
    //  keysToRemove.forEach(k =>localStorage.removeItem(k))
    //  localStorage.removeItem('auth','email','islogin','user_id')
  }

  togglePrimary() {
    this.setState({
      primary: !this.state.primary
    });
  }

  toggleLarge(value) {
    console.log('---------undefined-------', value)
    if (value == undefined || value !== 'modal-popup') {
      this.setState({
        large: !this.state.large
      });
    }
    var prouductcalci = {
      'mobiles': '9999',
      'smartphones': '9999',
      'desktops': '9999',
      'laptops': '49999',
      'tvs': '50000',
      'electronics': '9000',
      'fashions': '999',
      'decoratives': '2000',
      'furniture': '150000',
      'Mobiles': '9999',
      'SmartPhones': '9999',
      'Desktops': '9999',
      'Laptops': '49999',
      'Tvs': '50000',
      'Electronics': '9000',
      'Fashions': '999',
      'Decoratives': '2000',
      'Furniture': '150000',
    }
    var result = ["Mobiles", "SmartPhones", "Desktops", "Tvs", "Gadgets", "Electronics", "Fashions", "Decoratives", "Furniture", "Laptops"]
    this.props.actions.cartproducts({ 'user_id': localStorage.getItem('user_id') }).then(data => {
      data.result[0].products.map(product => {
        var productname = product.name;
        if (prouductcalci[productname] != undefined) {
          product.price = prouductcalci[productname];
        } else {
          product.price = 5000;
        }
      });
      var calculatetotal = 0;
      data.result[0].products.map(product => {
        if (product.price != undefined) {
          calculatetotal = calculatetotal + parseInt(product.price);
        }
      });
      this.setState({ productscart: data.result[0].products, cartid: data.result[0]._id, 'subtotal': calculatetotal });
    });

  }
  closetoggleLarge() {
    this.setState({
      large: !this.state.large
    });

  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }
  cancelOrder(e, id) {
    const { addToast } = this.props.actions;
    var that = this;
    this.props.actions.cancelorder(id, this.state.cartid).then(function (id) {

      addToast({ text: "Item!!" + that.state.productscart[0].image + "removed Successfully!!", color: 'blue', position: 'top' });
      var getproducts = that.state.productscart;
      console.log('---getproducts-----+++++++++++++++++++++++++=', id, getproducts[0].image)
      var calculatetotal = 0;
      getproducts = getproducts.filter(data => {
        return data._id != id;
      });
      getproducts = getproducts.filter(data => {
        if (data.price != undefined) {
          calculatetotal = calculatetotal + parseInt(data.price);
        }
        return data._id != id;
      });
      that.setState({ 'productscart': getproducts, 'subtotal': calculatetotal });

    });
  }
  componentDidMount() {
    this.props.actions.gettheproducts();
    if (localStorage.getItem('email') != 'pandurangarao@gmail.com' && localStorage.getItem('email') != 'admin') {
      document.getElementById('hideupload').style.display = "none";
    }
  }
  render() {
    const csss = {
      display: 'none'
    }
    const right = {
      marginLeft: '30%'
    }

    return (
      <header className="app-header navbar" >
        {/* <div style={{ marginTop: '-100px' }style={{padding:'10px'}}}> */}
        <img src="../../logo.jpg" width="180" height="70" />
        <AlertList
          position={this.state.position}
          alerts={this.state.alerts}
          timeout={this.state.timeout}
          dismissTitle="Begone!"
          onDismiss={this.onAlertDismissed.bind(this)}
        />
        <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
        <NavbarToggler className="d-md-down-none" onClick={this.sidebarToggle}>&#9776;</NavbarToggler>

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="#/dashboard" onClick={this.loadProducts}>Products</NavLink>
          </NavItem>
          <NavItem className="px-3" id='hideupload'>
            <NavLink href="#/components/upload">Add Products</NavLink>
          </NavItem>
        </Nav>
        {/* </div> */}
        <Modal isOpen={this.state.large} toggle={this.toggleLarge}
          className={'modal-lg ' + this.props.className} autoFocus={false} >
          <ModalHeader toggle={this.toggleLarge}>My Shopping Cart</ModalHeader>
          <ModalBody>
            <Col xs="12" lg="12">
              {this.state.productscart.length > 0 ? <Table responsive size="sm">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Sub Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.productscart.map((dynamicComponent, i) => <Cartcontent
                    key={i} componentData={dynamicComponent} orderProduct={this.orderProduct} cancelOrder={this.cancelOrder} />)}
                  <tr><td colSpan='3'>TOTAL</td><td>Rs.{this.state.subtotal}</td></tr>
                </tbody>
              </Table> : <Badge style={right} color="danger">No products in cart</Badge>}
            </Col>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleLarge}>Back To Shopping</Button>
            {this.state.productscart.length > 0 ? <Button color="primary" onClick={this.orderProduct}>Proceed</Button> : ''}
          </ModalFooter>
          {/* <Toasts/> */}
        </Modal>
        {/* <Toasts/> */}


        {/* <div style={{ marginTop: '-100px' }}> */}
        <img src='../../scss/img/avatars/cartlogo.png' className="img-avatar" alt="admin@bootstrapmaster.com" height="40" width="40" onClick={this.toggleLarge} />
        {/* </div> */}

        {/* <div style={{ marginTop: '-100px' }}> */}
        <img src='../../scss/img/avatars/cartlogo.png' className="img-avatar" alt="admin@bootstrapmaster.com" height="40" width="40" color="blue" onClick={this.togglePopup.bind(this)} />
        {this.state.showPopup ?
          <Popup
            text='Click "Close Button" to hide popup'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
        {/* </div> */}


        {/* <div> */}
        {this.state.isShowing ? <div onClick={this.closeModalHandler.bind(this)} className="back-drop"></div> : null}
        <img src='../../scss/img/avatars/cartlogo.png' className="img-avatar" alt="admin@bootstrapmaster.com" height="40" width="40" onClick={this.openModalHandler} />
        {/* <button className="open-modal-btn" onClick={this.openModalHandler.bind(this)}>Open Modal</button> */}
        <ModalPopup
          className="modal"
          show={this.state.isShowing}
          close={this.closeModalHandler.bind(this)}>
          {this.state.productscart.length > 0 ? <Table responsive size="sm">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Sub Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.productscart.map((dynamicComponent, i) => <Cartcontent
                key={i} componentData={dynamicComponent} orderProduct={this.orderProduct} cancelOrder={this.cancelOrder} />)}
              <tr><td colSpan='3'>TOTAL</td><td>Rs.{this.state.subtotal}</td></tr>
            </tbody>
          </Table> : <Badge style={right} color="danger">No products in cart</Badge>}
          {/* Maybe aircrafts fly very high because they don't want to be seen in plane sight? */}
        </ModalPopup>
        {/* <Toasts/> */}
        {/* </div> */}


        {/* -----------------------profile--------------------- */}
        <ModalPopup
          className="modal" show={this.state.isShowingProfile} profileDetails='profileDetails' close={this.closeModalHandlerProfile.bind(this)}>
          {this.state.getProfileDetailsData.map((dynamicComponent, i) => <UserDetails
            key={i} componentProfileDetailData={dynamicComponent} cancelOrder={this.cancelOrder} sendFunction={this.getDetailsUse} />)}
          {/* Maybe aircrafts fly very high because they don't want to be seen in plane sight? */}
          {/* <UserDetails sendFunction = {this.getDetailsUse} /> */}
        </ModalPopup>
        {/* ------------------------------------------------------- */}

        <Nav className="ml-auto" navbar>
          <NavItem>
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="nav-link dropdown-toggle">
                <img src='../../scss/img/avatars/8.jpg' className="img-avatar" alt="admin@bootstrapmaster.com" />
              </DropdownToggle>
              <DropdownMenu right className={this.state.dropdownOpen ? 'show' : ''}>
                {this.state.isShowingProfile ? <div onClick={this.closeModalHandlerProfile.bind(this)} className="back-drop"></div> : null}
                <DropdownItem onClick={this.openModalHandlerProfile}><i className="fa fa-wrench" ></i> Profile Details</DropdownItem>
                <DropdownItem onClick={this.logout}><i className="fa fa-wrench" ></i> Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavItem>
        </Nav>
        {/* <Toasts/> */}
        {/* <Toasts/> */}

      </header>

    )
  }
}
class Cartcontent extends React.Component {
  render() {
    return (
      <tr>
        <td><img src={this.props.componentData.Path ? this.props.componentData.Path : '../../scss/img/avatars/noPhotoFound.png'} className="img-avatar" height="40" width="40" /></td>
        <td>1</td>
        <td>Rs:{this.props.componentData.price ? this.props.componentData.price : 0}</td>
        <td>Rs:{this.props.componentData.price}</td>
        <td><img src='../../deletee.svg' alt="admin@bootstrapmaster.com" width="20px" height="20px" title='view' onClick={(e) => this.props.cancelOrder(e, this.props.componentData._id)} /></td>
      </tr>
    );
  }
}
var isEnabled
class UserDetails extends React.Component {
  constructor(props) {
    super(props);
    let fields = {};
    fields["username"] = "";
    // fields["emailid"] = "";
    fields["mobileno"] = "";
    fields["password"] = "";
    this.state = {
      fields: fields,
      errors: {},
      isButtonDisabled: false,
      selectValue: '',
      // values:[
      //   { value: 'USA', name: 'USA' },
      //   { value: 'CANADA', name: 'CANADA' }
      // ]
      companies: [
        { name: 'company1', id: '1' },
        { name: 'company2', id: '2' },
        { name: 'company3', id: '3' }
      ],
      jobs: [
        { id: '1', jobs: [{ name: 'job1-1', id: '11' }, { name: 'job1-2', id: '22' }, { name: 'job1-3', id: '13' }] },
        { id: '2', jobs: [{ name: 'job2-1', id: '11' }, { name: 'job2-2', id: '22' }, { name: 'job2-3', id: '13' }] },
        { id: '3', jobs: [{ name: 'job3-1', id: '11' }, { name: 'job3-2', id: '22' }, { name: 'job3-3', id: '13' }] }
      ],
      selectedCompany: '',
      selectedJob: ''
    }
    this.countryData = [
      { value: 'USA', name: 'USA' },
      { value: 'CANADA', name: 'CANADA' }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.update = this.update.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
    this.onDropdownSelected = this.onDropdownSelected.bind(this);
  }
  componentDidMount(){
    this.props.componentProfileDetailData.country != null ? this.setState({selectValue: this.props.componentProfileDetailData.country}) : ''
    this.props.componentProfileDetailData.company != null ? this.setState({selectedCompany: this.props.componentProfileDetailData.company}) : ''
    this.props.componentProfileDetailData.job != null ? this.setState({selectedJob: this.props.componentProfileDetailData.job}) : ''
  }
  
  handleChange(e) {
    let fields = this.state.fields;
    // const { email, password } = this.state;
    // const isEnabled = email.length > 0 && password.length > 0;
    fields[e.target.name] = e.target.value;
    if (fields.mobileno == '') {
      fields.mobileno = this.props.componentProfileDetailData.mobile
    }
    if (fields.username == '') {
      fields.username = this.props.componentProfileDetailData.firstname
    }
    console.log('----------mobileno------------', e.target.name)
    this.setState({
      fields
    });
    this.setState({
      isButtonDisabled: false
    });

    // console.log('-----selectedCompany----------', this.state, e.target.value)
    // this.setState({ selectedCompany: e.target.value })

  }

  handleChangeCompany(e) {
    console.log('-----selectedCompany----------', this.state, e.target.value)
    this.setState({ selectedCompany: e.target.value })
  }

  handleChangeJob(e) {
    console.log('-----handleChangeJob----------', e.target, e.target.value)
    this.setState({ selectedJob: e.target.value })
  }

  submituserRegistrationForm(e) {
    console.log('--------updatefields------jkl----')
    e.preventDefault();
    if (this.validateForm()) {
      // const { addToast } = this.props.actions;
      addToast({ text: "User! Updated Successfully!!" });
      let fields = {};
      fields["username"] = "";
      // fields["emailid"] = "";
      fields["mobileno"] = "";
      fields["password"] = "";
      this.setState({ fields: fields });
      console.log('--------updatefields----------', this.state.fields, this.state.selectValue)
      UpdateProfiles({ firstname: this.state.fields.username, lastname: this.state.fields.username, country: this.state.selectValue, id: localStorage.getItem('user_id') ,company: this.state.selectedCompany,job: this.state.selectedJob})
      console.log('--------updatedata----------')
      // getDetailsUse()
      this.props.sendFunction();

      //   if (data.status == 'success') {
      //     this.setState({ firstname: '', lastname: '', email: '', country: '' });
      //     // window.location.href = '#/login';
      //   }
      // });
      // alert("Form submitted");
    }
    this.setState({
      isButtonDisabled: true
    });
  }
  validateForm() {
    var fields, errors, formIsValid;
    fields = this.state.fields;
    errors = {};
    formIsValid = true;
    console.log('-----------before -------------', fields, formIsValid, errors)
    var { fields, formIsValid, errors } = validation(fields, formIsValid, errors, 'ProfileUpdate')
    this.setState({
      errors: errors
    });

    return formIsValid;
  }

  update() {
    return isEnabled = false
  }

  canBeSubmitted() {
    const { password, username, mobileno } = this.state.fields;
    return password.length > 0 || username.length > 0 || mobileno.length > 0;
  }

  createSelectItems() {
    let items = [];
    let yui = [{ id: 'USA', name: 'USA' },
    { id: 'CANADA', name: 'CANADA' },
    { id: 'USAA', name: 'USAA' }]
    // for (let i = 0; i <= yui; i++) {
    //   console.log()
    //   items.push(<option key={i} value={i}>{i}</option>);
    //   //here I will be creating my options dynamically based on
    //   //what props are currently passed to the parent component
    // }
    // yui = yui.find(op => {
    //   return op.value === this.props.componentProfileDetailData.country
    // })

    items = yui.map(v => (
      <option value={v.value}>{v.name}</option>
    ))
    // let optionTemplate = this.state.values.map(v => (
    //     <option value={v.id}>{v.name}</option>
    //   ));
    return items;
  }

  onDropdownSelected(e) {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
    this.setState({ 'selectValue': e.target.value })
  }
  setDefaultJob(jobs) {
    console.log('--------------jobs[0].jobs.id-----', jobs, jobs[0].jobs.id)
    this.setState({ 'selectedJob': jobs[0].jobs[0].id })
  }
  render() {
    console.log('--------itemsitems--------------', this.createSelectItems(), this.state.jobs)

    // let optionTemplate = this.state.values.map(v => (
    //   <option value={v.id}>{v.name}</option>
    // ));

    let jobs = this.state.jobs.filter(job => {
      console.log('---------------', job.id, this.state.selectedCompany, job.id === this.state.selectedCompany)
      return job.id === this.state.selectedCompany
    })
    // this.setDefaultJob(jobs);
    console.log('------------jobs----------', jobs)
    isEnabled = this.canBeSubmitted();
    console.log('---------render-------78----------', this.state.fields.username, isEnabled, this.state.isButtonDisabled)

    if (this.state.isButtonDisabled === true) {
      isEnabled = false
    }
    console.log('---------render-------790----------', this.state.selectValue, isEnabled, this.state)
    return (
      <div id="main-registration-container">
        <div id="register">
          <h3 style={{ textAlign: 'center', marginBottom: '10%' }}>Details Page</h3>
          <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
            <label>Name</label>
            <input type="text" name="username" value={this.state.fields.username != '' ? this.state.fields.username : this.props.componentProfileDetailData.firstname} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.username}</div>
            <label>Email ID:</label>
            <input type="text" readOnly name="emailid" value={this.props.componentProfileDetailData.email} />
            {/* <div className="errorMsg">{this.state.errors.emailid}</div> */}
            <label>Mobile No:</label>
            <input type="text" name="mobileno" value={this.state.fields.mobileno != '' ? this.state.fields.mobileno : this.props.componentProfileDetailData.mobile} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.mobileno}</div>
            <label>Country</label>

            <Input style={{ width: '90%' }} type="select" name="selectOption"
              value={this.state.selectValue != '' ? this.state.selectValue : this.state.selectValue} onChange={this.onDropdownSelected} >
              <option>--Choose Country--</option>
              {this.createSelectItems()}
            </Input>

            {/* <Input style={{ width: '90%' }} type="select" name="selectOption"
              value={this.createSelectItems().find(op => {
                return op.value === this.props.componentProfileDetailData.country
              })} onChange={this.onDropdownSelected} >
              {this.createSelectItems()}
            </Input> */}

            <label>Companies</label>
            {/* <select value={this.state.value} onChange={this.handleChange}>
              {optionTemplate}
            </select> */}
            <Input style={{ width: '90%' }} type="select" value={this.state.selectedCompany} onChange={this.handleChangeCompany.bind(this)}>
              <option>--Choose Company--</option>
              {
                this.state.companies.map((company, i) => {
                  return <option value={company.id}>{company.name}</option>
                  // return <option>{company.name}</option>
                })
              }
            </Input>
            <label>Jobs</label>
            {/* this.setState({selectedJob: jobs}) */}
            <Input style={{ width: '90%' }} type="select" value={this.state.selectedJob} onChange={this.handleChangeJob.bind(this)} >
              <option>--Choose Job--</option>
              {
                jobs != '' ? jobs[0].jobs.map((job, i) => {
                  return <option value={job.id}>{job.name}</option>
                  // return <option>{job}</option>
                }):[]
              }
            </Input>

            <label>Submit</label>

            {/* <input type="password" name="password" value={this.state.fields.password != '' ? this.state.fields.password : this.props.componentProfileDetailData.password} onChange={this.handleChange} />
            <div className="errorMsg">{this.state.errors.password}</div> */}
            <input disabled={!isEnabled} style={!isEnabled ? { backgroundColor: 'lightblue' } : { backgroundColor: 'green' }} type="submit" className="button" value="Update Profile" name="submit" />
          </form>
          {/* <Link to="/signup" className="btn btn-primary">Sign up</Link> */}
          {/* <Link to="/login" style={{ color: 'blue', float: 'right' }}>BackToLogin</Link> */}
        </div>
        <Toasts />
        {/* <Header getDetailsUse={this.callApi} /> */}
        {/* <Header ref={foo => this.getDetailsUse = getDetailsUse} /> */}
        {/* <Header sendFunction = {this.functionToPass} /> */}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // const { listData } = state.list;
  // console.log(state.list.listData.length, 'fine-----')
  return {
    listData: state.list,
    login: state.login
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ gettheproducts, cartproducts, ordertheproduct, cancelorder, logoutuser, loginOutUser, addToast, getProfileDetails, UpdateProfiles }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


