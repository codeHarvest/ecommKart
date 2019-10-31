import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../firebase/firebase.util';

import { ReactComponent as Logo } from '../assets/crown.svg';
import CartIcon from './CartIcon.component';
import CartDropDown from './CartDropDown.component';


const Header = ({ currentUser, hidden }) => {
    return (
        <div className="header">
            <Link className="logo-container" to="/">
              <Logo className="logo"/>
            </Link>

            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/contact">CONTACT</Link>
                {
                    currentUser ? 
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div> 
                    : 
                    <Link className="option" to="/contact">SIGN IN</Link>
                }
                <CartIcon/>
            </div>
            {
                hidden ? null : <CartDropDown/>  
            }
        </div>
    )
}

const mapStateToProps = ({ user : { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden
})


export default connect(mapStateToProps)(Header);