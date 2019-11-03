import React from 'react'
import { connect } from 'react-redux';

import CustomButton from './CustomButton.component'
import CartItem from './CartItem.component'


const CartDropDown = ({ cartItems }) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
                }
            </div>
            <CustomButton>TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = ({cart: { cartItems }}) => ({
    cartItems
})

export default connect(mapStateToProps)(CartDropDown);