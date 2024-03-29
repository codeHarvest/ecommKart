import React, { Component } from 'react'
import FormInput from './FormInput.component';
import CustomButton from './CustomButton.component';

import { auth , signInWithGoogle } from '../firebase/firebase.util';

export default class SignIn extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }
    

    handleSubmit = async (e) => {
        e.preventDefault();
        
        const {email , password } = this.state;

        try{
            auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        }catch(error){
            console.log(error);
        }

    };

    handleChange = (e) => {
        const { value , name } = e.target;

        this.setState({ [name] : value })
    };

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput name="email" type="email" handleChange={this.handleChange} label='email' value={this.state.email} required/>
                    <FormInput name="password" type="password" handleChange={this.handleChange} label='password' value={this.state.password} required/>
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn >Google Sign in</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}
