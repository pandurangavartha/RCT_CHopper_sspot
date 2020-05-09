 import React from 'react';
import * as uploadActions from '../../actions/uploadaction';
import {bindActionCreators} from 'redux';

import {Badge, Row, Col, Card, CardHeader, CardFooter, CardBlock, Label, Input, Table,
  Pagination,
  PaginationItem,
  PaginationLink} from "reactstrap";
  import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  FormText,
  InputGroup,
  InputGroupAddon,
  InputGroupButton
} from "reactstrap";

import ImageUploader from 'react-images-upload';

import {connect} from 'react-redux';

class Shipping extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            name: '',
            decription: '',
            images:[],
        }

        this.uploadImage = this.uploadImage.bind(this);
        this.updateState = this.updateState.bind(this);
          this.onDrop = this.onDrop.bind(this);
    }
    uploadImage(){
        var formData = new FormData();
//        for (var i=0; i < this.state.images; i++) {
//       formData.append('picture', this.state.images[i]);
//    } 
    this.state.images.filter(function(val){
         formData.append('image', val);
    })
    formData.append('name', this.state.name);
    formData.append('gender', this.state.decription);
        this.props.actions.addproduct(formData).then(data => {
            this.setState({name:'', decription:'',images:[]});
        });
    }
    onDrop(picture) {
        this.setState({
            images: this.state.images.concat(picture),
        });
    }
     updateState(type, event) {
        var obj = {};
        obj[type] = event.target.value;
        this.setState(obj);
    }
    render() {
        <div>
 <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Company</strong>
                <small> Form</small>
              </CardHeader>
              <CardBlock className="card-body">
                <FormGroup>
                  <Label htmlFor="company">Company</Label>
                  <Input type="text" id="company" placeholder="Enter your company name"/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">VAT</Label>
                  <Input type="text" id="vat" placeholder="DE1234567890"/>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">Street</Label>
                  <Input type="text" id="street" placeholder="Enter street name"/>
                </FormGroup>
                <FormGroup row>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="city">City</Label>
                      <Input type="text" id="city" placeholder="Enter your city"/>
                    </FormGroup>
                  </Col>
                  <Col xs="8">
                    <FormGroup>
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input type="text" id="postal-code" placeholder="Postal Code"/>
                    </FormGroup>
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="country">Country</Label>
                  <Input type="text" id="country" placeholder="Country name"/>
                </FormGroup>
              </CardBlock>
            </Card>
          </Col>
        </div>
    }

    }


export default Shipping;


 
 
 
 
 
 
 
 
 
 
 
 
 
