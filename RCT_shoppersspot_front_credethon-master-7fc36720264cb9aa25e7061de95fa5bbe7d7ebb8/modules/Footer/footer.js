import React from 'react';
import {
    Navbar,
    Container,
    NavbarBrand
  } from 'reactstrap';

function Footer() {
    const right = {
        marginLeft: '50%',
        color:'red'
    }
        return(
            <div >  
                <Navbar color="dark" dark>
                    <Container>
                        <NavbarBrand style={right}> MobileAPP</NavbarBrand>
                    </Container>
                </Navbar>
            </div>
        )
}
// className="fixed-bottom"

export default Footer;