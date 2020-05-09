import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { DataTable } from 'react-data-components';
import _ from 'lodash'
import { gettheproducts } from '../../actions/galleryactions';
import '../../scss/font-awesome.min.css';
import './table-twbs.css'
import { faHome,faSort  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import '../../node_modules/font-awesome/css/font-awesome.min.css'

class ParentComponent extends Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            data: [],
            nameSort: ''
        };
        // this.state = {
        //     column: null,
        //     data: [],
        //     direction: null,
        // }
        this.onSort = this.onSort.bind(this)
        // this.handleSort = this.handleSort.bind(this)
    }

    componentDidMount() {
        this._isMounted = true;
        //   fetch("http://hostname:xxxx/yyyy/zzzz")
        //     .then(function(response) {
        //       return response.json();
        //     })
        //     .then(items => this.setState({ data: items }));
        this.props.actions.gettheproducts().then(items => this.setState({ data: items.result }));
        // .then(function (obj) {
        //     console.log('----objobj-----', obj)
        //     .then(items => this.setState({ data: obj.result }));
        // })
        // console.log('----objobj----9-', this.state)
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    onSort(event, sortKey) {
        /*
        assuming your data is something like
        [
          {accountname:'foo', negotiatedcontractvalue:'bar'},
          {accountname:'monkey', negotiatedcontractvalue:'spank'},
          {accountname:'chicken', negotiatedcontractvalue:'dance'},
        ]
        */
        const data = this.state.data;
        if (this.state.nameSort !== 'asc') {
            data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
            this.setState({ data, nameSort: 'asc' })
        }
        if (this.state.nameSort === 'asc') {
            data.reverse()
            this.setState({ data, nameSort: 'desc' })
        }
    }

    handleSort(clickedColumn) {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }


    // compareBy(key) {
    //     return function (a, b) {
    //         if ("" + a[key] < ("" + b[key])) return -1;
    //         if ("" + a[key] > ("" + b[key])) return 1;
    //         return 0;
    //     };
    // }

    // sortBy(key) {
    //     let arrayCopy = [...this.state.data];
    //     arrayCopy.sort(this.compareBy(key));
    //     arrayCopy.reverse(); //for descending
    //     this.setState({ data: arrayCopy });
    // }


    renderTableHeader() {
        // setTimeout(() => {
            console.log('--------his.state.data-------------', this.state.data[0])
            // let header = Object.keys(this.props.gallery[0])
            let header = ['_id', 'name', 'image', 'Path']
            return header.map((key, index) => {
                return <th key={index} >{key.toUpperCase()}<FontAwesomeIcon style={{paddingLeft:'5px',fontSize:'25px'}} icon={faSort}/></th>
            })
        // }, 10);
    }

    renderTableData() {
        // setTimeout(() => {
            // let header = Object.keys(this.state.data[0])
            // return header.map((key, index) => {
            //     return <th key={index}>{key.toUpperCase()}</th>
            // })
        return this.state.data.map((student, index) => {
            const { _id, name, image, Path } = student //destructuring
            return (
                <tr key={_id}>
                    <td>{_id}</td>
                    <td>{name}</td>
                    <td>{image}</td>
                    <td>{Path}</td>
                </tr>
            )
        })
        // }, 100);
    }

    render() {
        // const { column, data, direction } = this.state

        var newdata = this.state.data;
        return (
            <div>
                {/* <h1 id='title'>React Dynamic Table</h1> */}
                <table id='students'>
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </div>
        )
        // return (
        //     <table className="m-table">
        //         <thead>
        //             <tr>
        //                 <th style={{ paddingRight: '20px', cursor: 'pointer' }} onClick={e => this.onSort(e, 'name')}>AccountName</th>
        //                 <th style={{ paddingRight: '20px', cursor: 'pointer' }} onClick={e => this.onSort(e, 'image')}>ContractValue</th>
        //                 {/* <th sorted={column === 'name' ? direction : null}
        //                     onClick={this.handleSort('name')}>AccountName</th>
        //                 <th sorted={column === 'image' ? direction : null}
        //                     onClick={this.handleSort('image')}>ContractValue</th> */}
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {newdata.map(function (account, index) {
        //                 return (
        //                     <tr key={index} data-item={account}>
        //                         <td data-title="Account">{account.name}</td>
        //                         <td data-title="Value">{account.image}</td>
        //                     </tr>
        //                 );
        //             })}
        //         </tbody>
        //     </table>
        // );
    }
}


// class listView extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             columns: [
//                 { title: 'Name', prop: 'name' },
//                 { title: 'City', prop: 'city' },
//                 { title: 'Address', prop: 'address' },
//                 { title: 'Phone', prop: 'phone' }
//             ],
//             data: [
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' },
//                 // It also supports arrays
//                 // [ 'name value', 'city value', 'address value', 'phone value' ]
//             ]
//         }
//     }

//     componentDidMount() {
//         this.props.actions.gettheproducts();
//     }

//     render() {
//         return (
//             <DataTable
//                 className="container"
//                 keys="name"
//                 columns={this.state.columns}
//                 initialData={this.state.data}
//                 initialPageLength={5}
//                 initialSortBy={{ prop: 'city', order: 'descending' }}
//                 pageLengthOptions={[5, 20, 50]}
//             />

//         )
//     }

// }
// {/* <DataTable
// className="container"
// keys="id"
// columns={tableColumns}
// initialData={data}
// initialPageLength={5}
// initialSortBy={{ prop: 'city', order: 'descending' }}
// pageLengthOptions={[5, 20, 50]}
// /> */}

function mapStateToProps(state) {
    console.log('-----------state----------', state)
    return {
        gallery: state.gallery.galleryData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ gettheproducts }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ParentComponent);