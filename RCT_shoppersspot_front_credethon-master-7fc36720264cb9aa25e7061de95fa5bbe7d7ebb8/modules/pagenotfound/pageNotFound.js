import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../../assets/images/pageNotFound.png';
class NotFoundPage extends React.Component {
  render() {
    console.log('--------------------------------------------')
    return (
      <div>
        <img src={PageNotFound} alt="" style={{width:'100%'}} />
        <p style={{ color: "red", position: "absolute", top: "10%", fontSize: "70px" }}>PageNotFound</p>
        <p style={{ position: "absolute", top: "10%", left: "60%", fontSize: "70px" }}>
          <Link to="/login">Go to Login</Link>
        </p>
      </div>
    )
  }
}

export default NotFoundPage;