import React, { Component } from 'react';
import { Badge, Row, Col, Card, CardHeader, CardFooter, CardBlock, Label, Input } from "reactstrap";
import { connect } from 'react-redux';
import {gettheproducts,getthatpics,addtocart,viewtheimage,deletetheimage} from '../../actions/galleryactions';
import { bindActionCreators } from 'redux';
import { Button } from 'reactstrap';
import { AlertList, Alert, AlertContainer } from "react-bs-notifier";
import LoadingAnimation from "../loadingAnimation/index";
import {removeLoader,addLoader} from "../../actions/loader";

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            products: [],
            position: "top-right",
            alerts: [],
            timeout: 200,
        }
        this.selectproducts = this.selectproducts.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.viewimage = this.viewimage.bind(this);
        this.deleteimage = this.deleteimage.bind(this);
    }
    componentDidMount() {
        var result = ["Mobiles", "SmartPhones", "Laptops", "Desktops", "Tvs", "Gadgets", "Electronics", "Fashions", "Decoratives", "Furniture"]
        console.log('========111111111111111111111===========',result.indexOf(window.location.href.split('/')[5]),'\n',window.location.href.split('/')[5])
        if (result.indexOf(window.location.href.split('/')[5]) > -1) {
            console.log('========OOOOOOOOOOOOOOOOOOOO======234=====')
            this.setState({ entered: window.location.href });
            this.props.actions.getthatpics(window.location.href.split('/')[5]);
            console.log('========OOOOOOOOOOOOOOOOOOOO===========')
        } else {
            this.props.actions.addLoader({})
            this.props.actions.gettheproducts();
            setTimeout(() => {
                console.log('===================',this.props.loading,this.state)
                // this.setState({'loading':false})
                // localStorage.setItem('islogin', true);
                // localStorage.setItem('loading',false)
                // this.props.loading = false
                this.props.actions.removeLoader({})
            }, 5000);
            // localStorage.setItem('loading',false)
           
        }
    }
    viewimage(e, imageid) {
        this.props.actions.viewtheimage(imageid).then(data => {
            window.location.href = '#/prouduct'
        });
    }
    deleteimage(e, imageid) {
        this.props.actions.deletetheimage(imageid).then(data => {
            const type = 'danger';
            const newAlert = {
                id: (new Date()).getTime(),
                type: type,
                message: 'product deleted from list successfully'
            };
            this.setState({
                alerts: [...this.state.alerts, newAlert]
            });
        });
    }
    selectproducts(e) {
        var products = this.state.products.slice();
        if (products.indexOf(e) == -1) {
            products.push(e);
        } else {
            var idx = products.indexOf(e);
            if (idx > -1) {
                products.splice(idx, 1);
            }
        }
        this.setState({ products: products });
    }
    addToCart(e) {
        const type = 'success'
        if (this.state.products.length != 0) {
            this.props.actions.addtocart({ docids: this.state.products, user_id: localStorage.getItem('user_id') }).then(data => {
                this.setState({ products: [] });
                var x = document.getElementsByClassName("checkbox");
                for (var i = 0; i <= x.length; i++) {
                    if (x[i] != undefined) {
                        x[i].checked = false;
                    }
                }
                const newAlert = {
                    id: (new Date()).getTime(),
                    type: type,
                    headline: `Whoa, ${type}!`,
                    message: 'products added to the cart successfully'
                };
                this.setState({
                    alerts: [...this.state.alerts, newAlert]
                });
            });
        }
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
    componentWillMount() {
        if (localStorage.getItem('islogin') == null || localStorage.getItem('islogin') == 'false') {
            window.location.href = "#/login";
        }
    }
    render() {
        const pullright = {
            'marginLeft': '90%',
            'marginBottom': '10px'
        }
        return (
            <div>
                <AlertList
                    position={this.state.position}
                    alerts={this.state.alerts}
                    timeout={this.state.timeout}
                    dismissTitle="Begone!"
                    onDismiss={this.onAlertDismissed.bind(this)}
                />
                <div className="clearfix">
                    <Button color="primary" className="mt-3" style={pullright} active onClick={this.addToCart}>Add To Cart</Button>
                </div>
                <div className="animated fadeIn">
                    <Row>
                        {this.props.galleryData.map((dynamicComponent, i) => <Gallerycontent
                            key={i} componentData={dynamicComponent} selectproducts={this.selectproducts} viewimage={this.viewimage} deleteimage={this.deleteimage} />)}
                    </Row>

                </div>
            </div>
        )
    }
}

class Gallerycontent extends React.Component {
    render() {
        const imagecss = {
            width: "100%",
            height: "80%"
        }
        const imageright = {
            marginLeft: '84%'
        }
        const image = {
            marginLeft: '90%'
        }
        const imageadjust = {
            marginLeft: '-5%'
        }
        return (
                <Col xs="12" sm="2" md="4">
                    <Card className="cardbodyy">
                        <CardBlock className="card-body">
                            <input className="form-control-four form-check checkbox" type='checkbox' style={image} onChange={(e) => this.props.selectproducts(this.props.componentData._id)} />
                            <img src={this.props.componentData.Path} alt="admin@bootstrapmaster.com" width="400px" height="200px" />
                        </CardBlock>

                        <CardFooter className="clearfix" >
                            <div className="pro-title">
                                {this.props.componentData.name}
                            </div>
                            <div className="pro-action">
                                <img src='../../view-01-512.png' alt="admin@bootstrapmaster.com" width="26px" height="32px" title='view' onClick={(e) => this.props.viewimage(e, this.props.componentData._id)} />
                                {(localStorage.getItem('email') == 'pandurangarao@gmail.com' || localStorage.getItem('email') == 'admin') ? <img src='../../deletee.svg' alt="admin@bootstrapmaster.com" width="20px" height="20px" title='view' onClick={(e) => this.props.deleteimage(e, this.props.componentData._id)} /> : ''}
                            </div>
                        </CardFooter>
                    </Card>
                </Col>
        );
    }
}
function mapStateToProps(state, ownProps) {
    console.log('++++++++++++++++++++++++++',state.login)
    const { galleryData } = state.gallery;
    const {login,loading } = state.login
    return { galleryData ,login,loading};
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({gettheproducts,removeLoader,getthatpics,addLoader,addtocart,viewtheimage,deletetheimage}, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);

