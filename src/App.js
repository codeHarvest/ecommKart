import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.scss';
import  Homepage  from './pages/Homepage.component';
import shopPage from './pages/shop.component';
import Header from './components/Header.component';
import SigninAndSignup from './pages/SigninAndSignup.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/users.actions';


class App extends React.Component { 

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id: snapshot.id,
              ...snapshot.data()
            });
            console.log(this.state);
        })
      }else{
        setCurrentUser(userAuth);
      }

    }); 
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div className="App">
        <Header/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/hats" component={shopPage}/>
          <Route exact path="/contact" render={ () => this.props.currentUser ? (<Redirect to='/' />) : <SigninAndSignup/> } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser : user.currentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser : user =>  dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
