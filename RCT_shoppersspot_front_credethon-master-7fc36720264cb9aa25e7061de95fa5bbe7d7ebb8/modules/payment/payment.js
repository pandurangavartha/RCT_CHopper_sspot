import React, {Component} from "react";
import {
  Row,
  Col,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
  CardHeader,
  CardFooter,
  CardBlock,
  Form,
  FormGroup,
  FormText,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import * as headerActions from '../../actions/headeractions';

class Payment extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        cartids:[],
        price:'',
         alerts: [],
           position: "top-right",
      timeout: 400,
      page:true
    };
    this.orderProduct=this.orderProduct.bind(this);
  }
  dashboard(){
      window.location.href="#/dashboard";
    }
  orderProduct(productid){
      var collectprouctids=[];
      this.props.actions.cartproducts({'user_id':localStorage.getItem('user_id')}).then(data => {
           data.result[0].products.map(product => {
            collectprouctids.push(product._id)
        });
      var entered=true;
    collectprouctids.map(id=>{
      this.props.actions.ordertheproduct({ "docid":id, "user_id":localStorage.getItem('user_id')})
   })
 if(entered){
     localStorage.setItem('saveids',[])
     localStorage.setItem('price','')
     entered=false
 this.setState({
      large: !this.state.large
    });
    const type='success';
     const newAlert ={
			id: (new Date()).getTime(),
			type: type,
			headline: `Whoa, ${type}!`,
			message: 'products are placed successfully and delivered soon'
		};
  this.setState({alerts: [...this.state.alerts, newAlert],page:false })
 }
         });
      
}
  componentDidMount(){
      this.setState({cartids:localStorage.getItem('saveids'),'price':localStorage.getItem('price')});
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
  render() {
    return (
      <div className="animated fadeIn">
        {this.state.page?
        <Row>
         <AlertList
			position={this.state.position}
			alerts={this.state.alerts}
			timeout={this.state.timeout}
			dismissTitle="Begone!"
			onDismiss={this.onAlertDismissed.bind(this)}
                    />
          <Col xs="12" sm="6" className='paymentSubmitform'>
            <Card >
              <CardHeader>
                Total payment to be made:<strong>Rs.{this.state.price}/-</strong>
              </CardHeader>
              <CardBlock className="card-body">
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Name</Label>
                      <Input type="text" id="name" placeholder="Enter your name" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Credit Card Number</Label>
                      <Input type="text" id="ccnumber" placeholder="0000 0000 0000 0000" required/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input type="text" id="cvv" placeholder="123" required/>
                    </FormGroup>
                  </Col>
                  <Button className='paymentSubmit' onClick={this.orderProduct}>Proceed Securely</Button>
                </Row>
              </CardBlock>
            </Card>
          </Col>
          </Row>:<div className="paidui"><Card xs="12" sm="6">
          <Row>
          <Col xs="12" className="textcenter"> 
          <img src="../../thankyou.png" width="400" className="topheight"/>
          <h4>Payment has recieved and orders will be deleiverd soon </h4>
          </Col>
          <Button className='paymentSubmit' onClick={this.dashboard}>Continue Shopping</Button>
          </Row>
          </Card>
       </div>}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    const {listData} = state.list;
    console.log(state.list.listData.length, 'fine-----')
    return {listData};
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(headerActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Payment);


