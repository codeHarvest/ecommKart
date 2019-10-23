import React from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';
import  Homepage  from './pages/Homepage.component';
import shopPage from './pages/shop.component';
import Header from './components/Header.component';
import SigninAndSignup from './pages/SigninAndSignup.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';

class App extends React.Component {
  
  constructor(props){
      super(props);

      this.state = {
        currentUser : null 
      }
  }
  

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });
            console.log(this.state);
        })
      }else{
        this.setState({currentUser: userAuth });
      }

    }); 
  }
  
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }


  render(){
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/hats" component={shopPage}/>
          <Route path="/contact" component={SigninAndSignup}/>
        </Switch>
      </div>
    );
  }
}

export default App;
