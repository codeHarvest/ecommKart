import React from 'react'
import { Route } from 'react-router-dom';

import CollectionsOverview from '../components/CollectionsOverview.component';
import CollectionPage from './Collection.component';

const shopPage = ({ match }) => { 
 

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`} component={CollectionsOverview}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
            </div>
        )
    
}


export default shopPage;