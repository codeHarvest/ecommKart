import React from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CollectionPreview from './Preview-Collection.component';
import { selectCollections } from '../redux/shop/shop.selector';


const CollectionsOverview = ({ collections }) => {
    return (
        <div className="collections-overview">
            {
                collections.filter((item,idx) => idx < 4).map(({ id, ...otherCollectionProps }) => <CollectionPreview key={id} {...otherCollectionProps}/> )
            }
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    collections : selectCollections
  })
  

export default connect(mapStateToProps)(CollectionsOverview);