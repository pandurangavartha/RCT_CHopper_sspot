import React, {Component} from "react";
import {
  Badge,
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as trackActions from '../../actions/trackactions';
class Trackorder extends Component {
     constructor(props) {
        super(props);
        this.state = {
            orderedproducts: [],
        }
    }
    componentDidMount() {
        console.log('max')
        this.props.actions.gettheorderedproducts().then(data => {
            var collectorders=[];
            data.result.map(function(order){
                if(order.productsInfo.length !=0){
                collectorders.push(order.productsInfo[0]);
               }
            })
            this.setState({orderedproducts: collectorders});
        });
    }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Track your orders
              </CardHeader>
              <CardBlock className="card-body">
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Prouct</th>
                    <th>Name</th>
                    <th>Ordered</th>
                    <th>Expected</th>
                  </tr>
                  </thead>
                    <tbody>
                    {this.state.orderedproducts.map((dynamicComponent, i) => <OrderedContent 
                                key = {i} componentData = {dynamicComponent}/>)}
                  </tbody>
                </Table>
              </CardBlock>
            </Card>
          </Col>

        </Row>
      </div>

    )
  }
}
class OrderedContent extends React.Component {
    render() {
        return (
                <tr>
        <td><img src={this.props.componentData.Path?this.props.componentData.Path:''} height='20' width='40'/></td>
                    <td>{this.props.componentData.name?this.props.componentData.name:''}</td>
                    <td>December</td>
                    <td>
                      <Badge color="success">Soon</Badge>
                    </td>
                  </tr>
                )
    }
}
        
function mapStateToProps(state, ownProps) {
    const {listData} = state.list;
    return {listData};
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(trackActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Trackorder);


