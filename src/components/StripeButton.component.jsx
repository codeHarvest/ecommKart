import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const onToken = Token => {
    console.log(Token);
    alert('Payment Successful');
}

 const StripeButton = ({ price })  => {
   const priceForStripe = price * 100;
   const publishableKey = 'pk_test_5TXgSWIJYFNfQfVBhmlA3NUe00jwrbUcpA';
    return (
        <StripeCheckout 
            label= 'Pay Now'
            name = 'CRWN clothing'
            billingAddress
            shippingAddress
            image= 'https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            token={onToken} 
            stripeKey={publishableKey}      
         />
    )
}


export default StripeButton;