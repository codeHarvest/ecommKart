import React from 'react'
import SignIn from '../components/SignIn.component'
import SignUp from '../components/sign-up.component'

const SigninAndSignup = () => {
    return (
        <div className="sign-in-sign-up">
            <SignIn/>
            <SignUp/>
        </div>
    )
}

export default SigninAndSignup;