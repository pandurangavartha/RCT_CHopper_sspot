import React from 'react';

import './Modal.css';

const modal = (props) => {
    if (props.profileDetails === undefined) {
        console.log('---------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&----------', props)
        return (
            <div>
                <div className="modal-wrapper-common"
                    style={{
                        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    <div className="modal-header-common">
                        <h3>Modal Header</h3>
                        <span className="close-modal-common-btn" onClick={props.close}>×</span>
                    </div>
                    <div className="modal-body-common">
                        <p>
                            {props.children}
                        </p>
                    </div>
                    <div className="modal-footer-common">
                        <button className="btn-common-cancel" onClick={props.close}>CLOSE</button>
                        <button className="btn-common-continue">CONTINUE</button>
                    </div>
                </div>
            </div>
        )
    } else {
        console.log('---------^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^----------', props)
        return (
            // <div style={{ boxShadow: '0 5px 8px 0 rgba(0,0,0,0.2)'}}>
            <div className="modal-wrapper-common1" style={{ 'zIndex': 1, 'position': 'absolute', 'display': 'flex', 'margin': '23% 35%', 'boxShadow': 'rgba(48, 49, 48, 0.42)' }} 
            style={{
                transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0',
                margin:'20% 35%'
                }}>
                <span style={{ 'fontSize': '30px', 'margin': '25% 93%', 'position': 'absolute', 'color': 'red' }} onClick={props.close}>×</span>
                {props.children}
                <span  style={{margin: '-38% 85%',position: 'absolute',color:'red',cursor:'pointer'}} onClick={props.close}>CLOSE</span>
            </div>
            // </div>
        )
    }

}

export default modal;
