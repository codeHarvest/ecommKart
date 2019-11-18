import React from 'react'
import { connect } from 'react-redux';
import { auth } from '../firebase/firebase.util';
import { createStructuredSelector } from 'reselect';

import { ReactComponent as Logo } from '../assets/crown.svg';
import CartIcon from './CartIcon.component';
import CartDropDown from './CartDropDown.component';
import { selectCartHidden } from '../redux/cart/cart.selector';
import { selectCurrentUser } from '../redux/user/user.selector';
import { HeaderContianer, OptionsContainer, LogoContainer, OptionLink } from './header.styles';


const Header = ({ currentUser, hidden }) => {
    return (
        <HeaderContianer>
            <LogoContainer to="/">
              <Logo className="logo"/>
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/signin">CONTACT</OptionLink>
                {
                    currentUser ? 
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink> 
                    : 
                    <OptionLink to="/signin">SIGN IN</OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null : <CartDropDown/>  
            }
        </HeaderContianer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser : selectCurrentUser,
    hidden: selectCartHidden
});


export default connect(mapStateToProps)(Header);