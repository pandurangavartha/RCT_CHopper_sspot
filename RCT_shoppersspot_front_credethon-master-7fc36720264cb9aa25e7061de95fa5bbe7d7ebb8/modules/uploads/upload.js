import React from 'react';
import * as uploadActions from '../../actions/uploadaction';
import {bindActionCreators} from 'redux';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";

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

class Upload extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            name: '',
            productname: '',
            decription: '',
            images:[],
            pictures:[],
            alerts:[],
            timeout:200
        }

        this.uploadImage = this.uploadImage.bind(this);
        this.updateState = this.updateState.bind(this);
          this.onDrop = this.onDrop.bind(this);
          this.setname = this.setname.bind(this);
          this.handleSelectChange=this.handleSelectChange.bind(this);
          console.log('-----this.setname----',this.setname)
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
    uploadImage(){
        var formData = new FormData();
        var store=0;
      this.state.images.map(function(val,key){
          store=val.length;
       for (var i=0; i < val.length; i++) {
          formData.append('image', val[i]);
        } 
      })
    formData.append('name', this.state.name);
    formData.append('description', this.state.decription);
    console.log('--------formData---------------',formData)
        this.props.actions.addproduct(formData).then(data => {
            this.setState({name:'',decription:''});
            var x =document.getElementsByClassName("deleteImage");
             for(var i=0; i<x.length; i++) {
                 x[i].click();
             };
             for(var i=0; i<store; i++) {
                  var y= document.getElementsByClassName("deleteImage")[0]
              if(y != undefined){
               y.click();
               }
             };
             var y= document.getElementsByClassName("deleteImage")[0]
             if(y != undefined){
             y.click();
         }
    });
    const type='success'
        const newAlert ={
			id: (new Date()).getTime(),
			type: type,
			headline: `Whoa, ${type}!`,
			message: 'product added to the list successfully'
		};
	    this.setState({
			alerts: [...this.state.alerts, newAlert]
	    });
    }
    setname(e,name){
      console.log('------name,e-----',name,e)
        this.setState({name:name});
    }
    onDrop(picture) {
        this.setState({
            images: this.state.images.concat(picture),
        });
    }
     updateState(type, event) {
        var obj = {};
        obj[type] = event.target.value;
        console.log('-------------updateState----------',obj);
        this.setState(obj);
    }


    handleSelectChange(event) {
      console.log('++++++++', event.target.value)
      this.setState({name:event.target.value});
    }
    render() {
        const moveright={
            'marginLeft':'100px'
        }
        const moverights={
            'marginLeft':'45%'
        }
        return (
         <div className="animated fadeIn" style={moveright}>
   <AlertList
			position={this.state.position}
			alerts={this.state.alerts}
			timeout={this.state.timeout}
			dismissTitle="Begone!"
			onDismiss={this.onAlertDismissed.bind(this)}
                    />
        <Row>
          <Col xs="12" sm="10">
            <Card>
              <CardHeader>
                <strong>Upload</strong>
                <small> Products</small>
              </CardHeader>
              <CardBlock className="card-body">
               
                <FormGroup row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="city">Product Name</Label>
                      <Input type="text" id="city" placeholder="Name" value={this.state.productname} onChange = {(e) => this.updateState('productname', e)}/>
                    </FormGroup>
                  </Col>
                   <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccyear">Category</Label>
                      <div>
                        <select className="form-control"  onClick={this.handleSelectChange}>
                            <option value="Mobiles">Mobiles</option>
                            <option value="SmartPhones">SmartPhones</option>
                            <option value="Gadgets">Gadgets</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Desktops">Desktops</option>
                            <option value="Tvs">Tvs</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Fashions">Fashions</option>
                            <option value="Decoratives">Decoratives</option>
                            <option value="Furniture">Furniture</option>
                        </select>
                      </div>
                      {/* <Input type="select" name="ccyear" id="ccyear">
                        <option value={this.state.name} onChange = {(e) => this.updateState('name', e)}>Mobiles</option>
                        <option value={this.state.name} onChange = {(e) => this.updateState('name', e)}>SmartPhones</option>
                        <option onClick={(e) =>this.setname(e,'Laptops')}>Laptops</option>
                        <option onClick={(e) =>this.setname(e,'Desktops')}>Desktops</option>
                        <option onClick={(e) =>this.setname(e,'Tvs')}>Tvs</option>
                        <option onClick={(e) =>this.setname(e,'Gadgets')}>Gadgets</option>
                        <option onClick={(e) =>this.setname(e,'Electronics')}>Electronics</option>
                        <option onClick={(e) =>this.setname(e,'Fashions')}>Fashions</option>
                        <option onClick={(e) =>this.setname(e,'Decoratives')}>Decoratives</option>
                        <option onClick={(e) =>this.setname(e,'Furniture')}>Furniture</option>
                      </Input> */}
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="postal-code">Product Description</Label>
                      <Input type="text" id="postal-code" placeholder="description" value={this.state.decription} onChange = {(e) => this.updateState('decription', e)}/>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                     <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif','.jpeg']}
                maxFileSize={5242880}
                images={this.pictures}
            />
                  </Col>
                </FormGroup>
                <FormGroup>
                <Button style={moverights} onClick={this.uploadImage}>Submit</Button>
                </FormGroup>
              </CardBlock>
            </Card>
          </Col>
        </Row>
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
        actions: bindActionCreators(uploadActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Upload);

