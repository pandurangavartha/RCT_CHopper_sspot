import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../../actions/listaction';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';

class ShowList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            email: '',
            listData: []
        }

        this.updateState = this.updateState.bind(this);
        this.savedata = this.savedata.bind(this);
        this.updateData = this.updateData.bind(this);
        this.deleteData = this.deleteData.bind(this);
    }
    updateState(type, event) {
        var obj = {};
        obj[type] = event.target.value;
        this.setState(obj);
    }
    savedata() {
        this.props.actions.createItem({name: this.state.data, email: this.state.email}).then(data => {
            this.setState({data: '', email: '',listData:[]});
        });
    }
    updateData(data) {
        this.props.actions.updateItem(data);
    }
    deleteData(data) {
        this.props.actions.deleteItem(data);
    }
    componentDidMount() {
        this.props.actions.loadlist();
    }
    componentWillReceiveProps(nextProps) {
        console.log('reccieve', nextProps)
    }
    componentWillupdate() {
        console.log("DSvdsv")
        return true;
    }
    render() {
        const tablecss = {
            marginLeft: '500px'
        }

        return (
                <div>
                    <input style={tablecss} type='text' className="form-control-six" value={this.state.data} onChange = {(e) => this.updateState('data', e)}/>
                    <input type='text' className="form-control-six" value={this.state.email} onChange = {(e) => this.updateState('email', e)}/>
                    <input  type='submit' className="form-control-six" onClick={this.savedata}/>
                    <div className="col-md-6" style={tablecss}>
                        <table className="table table-theme table-hover" border='0' >
                            <thead>
                                <tr>
                                    <th>
                                       Names
                                    </th>
                                    <th>
                                        Email
                                    </th>
                                    <th>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                
                        </table>
                    </div>
                </div>
                );
    }
}
class Content extends React.Component {
    render() {
        const tablecenter = {
            textAlign: 'right'
        }
        return (
                 <tr>
                    <td>{this.props.componentData.name}</td>    
                    <td>{this.props.componentData.email}</td>     
                    <td style={tablecenter}>
                        <button onClick={() => this.props.deleteData(this.props.componentData)} >Delete</button><button onClick={() => this.props.updateData(this.props.componentData)}>Update</button></td>     
                 </tr>
                );
    }
}
function mapStateToProps(state, ownProps) {
    const {listData} = state.list;
    console.log(state.list.listData.length, 'fine-----')
    return {listData};
}


function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
