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
  
firebase.initializeApp(config);



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

// async request to create collections documents

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
 
    // here we are gonna loop through the collections array and batch the calls together to create new doc ref 

    const batch = firestore.batch();
    
    objectsToAdd.forEach(obj =>  {
        const newDocRef = collectionRef.doc(); // creates key for each document reference object.
        
        // sets document reference for mutiple objects either all objects(categories like mens) are created or none
        batch.set(newDocRef, obj);
        // console.log(newDocRef);
    });
 
    // fire our batch request and batch returns a promise which gives a null or void value

    return await batch.commit();
} 

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection =   collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName : encodeURI(title.toLowerCase()),
            id : doc.id,
            title,
            items
        }
    });

    return transformedCollection.reduce((accumulator,collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{});
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


