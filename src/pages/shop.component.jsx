import React from 'react'
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverview from '../components/CollectionsOverview.component';
import CollectionPage from './Collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../firebase/firebase.util';
import { updateCollections } from '../redux/shop/shop.actions';
import withSpinner from '../components/withSpinner.component';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class shopPage extends React.Component{ 
 
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
       const { updateCollections } = this.props;
       
        const collectionRef = firestore.collection('collections');

        collectionRef.onSnapshot(async snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({ loading : false })
        })
    }
    

    render(){

        const { match } = this.props;
        const { loading } = this.state;
        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/> }/>
                <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/> }/>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections : collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(shopPage);