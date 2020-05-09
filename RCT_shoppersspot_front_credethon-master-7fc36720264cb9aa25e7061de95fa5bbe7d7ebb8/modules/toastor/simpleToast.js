import PropTypes from "prop-types";
import React, { Component } from "react";
import './toast.css'
class Toast extends Component {
    commonFunction() {
        console.log('-----commonFunction---------')
        setTimeout(() => {
            this.props.onDismissClick()
        }, 3000)
    }
    render() {
        console.log('-------simpleToast----------12796136518679-')
        this.commonFunction()

        // POST http://core.decoupling.dev.docp-project.com:3000/api/createFreeSlot/
        // {
        //     "dayNo": 10
        //   }
        //         ssh-rsa 2048 fUtFD4Uc6JGcBYrlJUDUXcwc0NAeUh13XfYZ/DdYnkM=
        // ssh-rsa 2048 39:b6:3e:e4:af:88:57:e6:f8:ca:dd:8d:7c:db:a0:6f
        // ssh-rsa AAAAB3NzaC1yc2EAAAABJQAAAQEArMNorOmSIxeP5wsX9CAWiHnF8cjz6Lnzk2Wsj6mRmKz7aq4mgRqP7gXnghKsXL4InrMeC/hM0b/U8gs6S6bAKtZFO9B5JnnALhBJiFlLTgoJN8aWwxUp52e0Heq3vvYNrUdg9ai/CeNe/v0H/GjnE6i6/1xOT2J0BXKmxTuAyuVHVWJZ+JLaa3XH+rCCRpo+guV53H0vPVdQWey57b7BaWQ7S0rgy5v+zNsoDhxi04hJVJuwPFOYkWZG9ZWU/JvGrBg1navZgVf5RJjAQXUEhyOHzvcwKTTLiHgLF8VwvoYGrFm1U9QZbACrkdvpTbnpt7/P40YJ9Q0bJIaSI1umww== rsa-key-20200415
        // if (this.props.position == undefined) {
        //     console.log('--------simpletoaster Condition----if--------',this.props.position)
        //     [this.props.position] = 'bottom'
        // }
        let pos = this.props.position
        console.log('--------simpletoaster Condition------------', pos)
        return (
            <li className={this.props.position == undefined ? "toast" : "toast toastsTop"} style={{ backgroundColor: this.props.color }}>
                <p className="toast__content">
                    {this.props.text}
                </p>
                <button className="toast__dismiss" onClick={this.props.onDismissClick}>
                    x
                </button>
            </li>
        );
    }

    shouldComponentUpdate() {
        return false;
    }
    // componentWillUnmount() {
    //     this.commonFunction();
    // }
}

Toast.propTypes = {
    color: PropTypes.string.isRequired,
    onDismissClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
};

export default Toast;