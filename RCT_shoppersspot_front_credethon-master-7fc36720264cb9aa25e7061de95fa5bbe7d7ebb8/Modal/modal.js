import React from 'react';
// import './modal.css';
// import styles from './modal.css'

class Popup extends React.Component {
    render() {
        const modal = {
            display: 'block', /* Hidden by default */
            position: 'fixed', /* Stay in place */
            zIndex: 1, /* Sit on top */
            left: 0,
            top: 0,
            width: '100%', /* Full width */
            height: '100%', /* Full height */
            overflow: 'auto', /* Enable scroll if needed */
            // backgroundColor: 'red', /* Fallback color */
            backgroundcolor: 'rgba(0,0,0,0)', /* Black w/ opacity */
        }
        const modalcontent = {
            backgroundColor: 'red',
            margin: '5% auto', /* 15% from the top and centered */
            padding: '20px',
            border: '1px solid #888',
            width: '50%', /* Could be more or less, depending on screen size */
            height: '60%'
        }
        const close = {
            float: 'right',
            backgroundColor: 'green',
            padding: '0px 8px',
            margin: '-3.5%',
            cursor: 'pointer',
            fontSize: '30px'
        }
        const focus = {
            color: 'black',
            textDecoration: 'none',
            cursor: 'pointer',
        }
        const header = {
            borderTop: '2px solid black',
            marginTop: '5%',
        }
        const footer = {
            borderTop: '2px solid black',
            marginTop: '6%',
            margin: '30% -2% 16%',
            position: 'relative'
        }

        const closebutton = {
            border: 'none',
            display: 'inline-block',
            padding: '8px 16px',
            verticalAlign: 'middle',
            overflow: 'hidden',
            textDecoration: 'none',
            color: 'inherit',
            backgroundColor: 'inherit',
            textAlign: 'center',
            cursor: 'pointer',
            whiteSpace: 'nowrap'
        }

        const topright = {
            position: 'absolute',
            right: 0,
            top: 0
        }



        return (
            <div >
                <div style={modal}>
                    <div style={modalcontent}>
                        <span style={Object.assign({}, close)} onClick={this.props.closePopup} >&times;</span>
                        <div style={header}>
                            <h1>{this.props.text}</h1>
                        </div>
                        <div style={footer}></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;