import React, {Component} from "react";
import {Container, Row, Col, Card, CardBlock, CardFooter, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";
import {connect} from 'react-redux';
import * as galleryactions from '../../actions/galleryactions';
import {bindActionCreators} from 'redux';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";

class Productdetail extends Component {
     constructor(props) {
        super(props);
        this.state = {
            image: '',
            name: '',
            password: '',
            description:'',
            price:'',
            alerts:[],
            timeout:200
        }
        this.goback = this.goback.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }
    componentDidMount(){
        
        if(this.props.prouductinfo != undefined && this.props.prouductinfo.result != undefined){
            this.setState({'image':this.props.prouductinfo.result[0].Path,'name':this.props.prouductinfo.result[0].name});
        }else{
              window.location.href='#/dashboard';
        }
        if(this.props.prouductinfo != undefined && this.props.prouductinfo.result != undefined){
   var prouductpricecalci={
        'mobiles':'9999',
        'smartphones':'9999',
        'desktops':'9999',
        'laptops':'49999',
        'tvs':'50000',
        'electronics':'9000',
        'fashions':'999',
        'decoratives':'2000',
        'furniture':'150000',
        'Mobiles':'9999',
        'SmartPhones':'9999',
        'Desktops':'9999',
        'Laptops':'49999',
        'Tvs':'50000',
        'Electronics':'9000',
        'Fashions':'999',
        'Decoratives':'2000',
        'Furniture':'150000',
        'gadgets':'100000',
        'Gadgets':'100000',
    }
        var prouductcalci={
        'mobiles':'A mobile phone, known as a cell phone in North America, is a portable telephone that can make and receive calls over a radio frequency link while the user is moving within a telephone service area. The radio frequency link establishes a connection to the switching systems of a mobile phone operator, which provides access to the public switched telephone network (PSTN). ',
        'smartphones':'A mobile phone, known as a cell phone in North America, is a portable telephone that can make and receive calls over a radio frequency link while the user is moving within a telephone service area. The radio frequency link establishes a connection to the switching systems of a mobile phone operator, which provides access to the public switched telephone network (PSTN). ',
        'desktops':'A desktop computer is a personal computer designed for regular use at a single location on or near a desk or table due to its size and power requirements. The most common configuration has a case that houses the power supply, motherboard (a printed circuit board with a microprocessor as the central processing unit (CPU), memory, bus, and other electronic components), disk storage (usually one or more hard disk drives, optical disc drives, and in early models a floppy disk drive); a keyboard and mouse for input; and a computer monitor, speakers, and, often, a printer for output.',
        'laptops':'A laptop, often called a notebook or "notebook computer", is a small, portable personal computer with a "clamshell" form factor, an alphanumeric keyboard on the lower part of the "clamshell" and a thin LCD or LED computer screen on the upper part, which is opened up to use the computer. Laptops are folded shut for transportation, and thus are suitable for mobile use.',
        'tvs':'Television (TV) is a telecommunication medium used for transmitting moving images in monochrome (black and white), or in colour, and in two or three dimensions and sound. The term can refer to a television set, a television program ("TV show"), or the medium of television transmission. Television is a mass medium for entertainment, education, news, politics, gossip and advertising.',
        'electronics':'Electronics is the science of controlling electrical energy electrically, in which the electrons have a fundamental role. Electronics deals with electrical circuits that involve active electrical components (such as vacuum tubes, transistors, diodes, integrated circuits, optoelectronics, and sensors), associated passive electrical components, and interconnection technologies. Commonly, electronic devices contain circuitry consisting primarily or exclusively of active semiconductors supplemented with passive elements; such a circuit is described as an electronic circuit.',
        'fashions':'Fashion is a popular style or practice, especially in clothing, footwear, accessories, makeup, hairstyle and body. Fashion is a distinctive and often constant trend in the style in which a person dresses. It is the prevailing styles in behaviour and the newest creations of textile designers.[1] Because the more technical term costume is regularly linked to the term "fashion", the use of the former has been relegated to special senses like fancy dress or masquerade wear, while "fashion" generally means clothing, including the study of it.',
        'Fashions':'Fashion is a popular style or practice, especially in clothing, footwear, accessories, makeup, hairstyle and body. Fashion is a distinctive and often constant trend in the style in which a person dresses. It is the prevailing styles in behaviour and the newest creations of textile designers.[1] Because the more technical term costume is regularly linked to the term "fashion", the use of the former has been relegated to special senses like fancy dress or masquerade wear, while "fashion" generally means clothing, including the study of it.',
        'decoratives':'The decorative arts are arts or crafts concerned with the design and manufacture of beautiful objects that are also functional. It includes interior design, but not usually architecture. The decorative arts are often categorized in opposition to the "fine arts", namely, painting, drawing, photography, and large-scale sculpture, which generally have no function other than to be seen.',
        'Decoratives':'The decorative arts are arts or crafts concerned with the design and manufacture of beautiful objects that are also functional. It includes interior design, but not usually architecture. The decorative arts are often categorized in opposition to the "fine arts", namely, painting, drawing, photography, and large-scale sculpture, which generally have no function other than to be seen.',
        'Mobiles':'A mobile phone, known as a cell phone in North America, is a portable telephone that can make and receive calls over a radio frequency link while the user is moving within a telephone service area. The radio frequency link establishes a connection to the switching systems of a mobile phone operator, which provides access to the public switched telephone network (PSTN).',
        'SmartPhones':'A mobile phone, known as a cell phone in North America, is a portable telephone that can make and receive calls over a radio frequency link while the user is moving within a telephone service area. The radio frequency link establishes a connection to the switching systems of a mobile phone operator, which provides access to the public switched telephone network (PSTN).',
        'Desktops':'A desktop computer is a personal computer designed for regular use at a single location on or near a desk or table due to its size and power requirements. The most common configuration has a case that houses the power supply, motherboard (a printed circuit board with a microprocessor as the central processing unit (CPU), memory, bus, and other electronic components), disk storage (usually one or more hard disk drives, optical disc drives, and in early models a floppy disk drive); a keyboard and mouse for input; and a computer monitor, speakers, and, often, a printer for output.',
        'Laptops':'A laptop, often called a notebook or "notebook computer", is a small, portable personal computer with a "clamshell" form factor, an alphanumeric keyboard on the lower part of the "clamshell" and a thin LCD or LED computer screen on the upper part, which is opened up to use the computer. Laptops are folded shut for transportation, and thus are suitable for mobile use.',
        'Tvs':'Television (TV) is a telecommunication medium used for transmitting moving images in monochrome (black and white), or in colour, and in two or three dimensions and sound. The term can refer to a television set, a television program ("TV show"), or the medium of television transmission. Television is a mass medium for entertainment, education, news, politics, gossip and advertising.',
        'Electronics':'Electronics is the science of controlling electrical energy electrically, in which the electrons have a fundamental role. Electronics deals with electrical circuits that involve active electrical components (such as vacuum tubes, transistors, diodes, integrated circuits, optoelectronics, and sensors), associated passive electrical components, and interconnection technologies. Commonly, electronic devices contain circuitry consisting primarily or exclusively of active semiconductors supplemented with passive elements; such a circuit is described as an electronic circuit.',
        'Fashions':'999',
        'Decoratives':'The decorative arts are arts or crafts concerned with the design and manufacture of beautiful objects that are also functional. It includes interior design, but not usually architecture. The decorative arts are often categorized in opposition to the "fine arts", namely, painting, drawing, photography, and large-scale sculpture, which generally have no function other than to be seen.',
        'Furniture':'Furniture refers to movable objects intended to support various human activities such as seating (e.g., chairs, stools, and sofas), eating (tables), and sleeping (e.g., beds). Furniture is also used to hold objects at a convenient height for work (as horizontal surfaces above the ground, such as tables and desks), or to store things (e.g., cupboards and shelves).',
        'furniture':'Furniture refers to movable objects intended to support various human activities such as seating (e.g., chairs, stools, and sofas), eating (tables), and sleeping (e.g., beds). Furniture is also used to hold objects at a convenient height for work (as horizontal surfaces above the ground, such as tables and desks), or to store things (e.g., cupboards and shelves).',
        'Gadgets':'Google Gadgets are dynamic web content that can be embedded on a web page. They can be added to and interact strongly with Googles iGoogle personalized home page (discontinued in November 2013, although iGoogle Gadgets still work on other websites) and the Google Desktop (discontinued in September 2011) application, as well as Google Wave (also no longer supported by Google) and Google Sites. Webmasters can add and customize a gadget to their own business or personal web site, a process called syndication..',
        'gadgets':'Google Gadgets are dynamic web content that can be embedded on a web page. They can be added to and interact strongly with Googles iGoogle personalized home page (discontinued in November 2013, although iGoogle Gadgets still work on other websites) and the Google Desktop (discontinued in September 2011) application, as well as Google Wave (also no longer supported by Google) and Google Sites. Webmasters can add and customize a gadget to their own business or personal web site, a process called syndication.',
    }
    var result = ["Mobiles", "SmartPhones", "Desktops", "Tvs","Gadgets","Electronics", "Fashions", "Decoratives", "Furniture","Laptops","mobiles","smartphones","desktops","laptops","tvs",'electronics','fashions','decoratives','furniture','mobiles','desktops','laptops','tvs','electronics','gadgets']
    var getIndex=result.indexOf(this.props.prouductinfo.result[0].name);
    if(getIndex != -1){
        this.setState({'description':prouductcalci[this.props.prouductinfo.result[0].name]});
        this.setState({'price':prouductpricecalci[this.props.prouductinfo.result[0].name]});
    }
    console.log(getIndex,'getindex',this.props.prouductinfo.result[0].name)
    }
    }
    goback() {
        window.location.href='#/'+this.props.prouductinfo.result[1].urlpath;
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
    addToCart(e) {
        var array=[];
        array.push(this.props.prouductinfo.result[0]._id);
        this.props.actions.addtocart({docids:array,user_id:localStorage.getItem('user_id')}).then(data => {
            this.setState({products: []});
            array=[];
            const type='success';
            const newAlert ={
			id: (new Date()).getTime(),
			type: type,
			headline: `Whoa, ${type}!`,
			message: 'product added to the cart successfully'
		};
	    this.setState({
			alerts: [...this.state.alerts, newAlert]
	    });
        });
    }
  render() {
    return (
      <div className="my-8 prouducttop">
           <AlertList
			position={this.state.position}
			alerts={this.state.alerts}
			timeout={this.state.timeout}
			dismissTitle="Begone!"
			onDismiss={this.onAlertDismissed.bind(this)}
                    />
        <Container>
             <Button className='btn btn-primary active backbut' onClick={this.goback}><span>Back to List</span></Button>
             <Card> 
                <Row className="cardspacing">
                  <Col md="6">
                     <Col md="3">
                        <img   src={this.state.image}   alt="admin@bootstrapmaster.com" width="400px"  title='view' />
                     </Col>
                  </Col>
                 <Col md="6">
                    <div className="productName">{this.state.name}</div>
                    <div className="productdescription">{this.state.description}</div>
                    <div className="price">Price:Rs.{this.state.price}/-</div>
                    <Button className='primary cartadd' onClick={this.addToCart}><span>Add To Cart</span></Button>
                 </Col>
              </Row>
          </Card>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
    const {prouductinfo} = state.product;
    return {prouductinfo};
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(galleryactions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Productdetail);




