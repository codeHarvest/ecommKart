import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDWIYENlmuUeQL8ITe1bDvjHgAgDca_BKQ",
    authDomain: "ecommerce-app-58569.firebaseapp.com",
    databaseURL: "https://ecommerce-app-58569.firebaseio.com",
    projectId: "ecommerce-app-58569",
    storageBucket: "",
    messagingSenderId: "549966460082",
    appId: "1:549966460082:web:04165da780649de67b05ab"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return ;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
    // console.log(snapShot);
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


