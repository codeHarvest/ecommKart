import React, { Component } from 'react'
import  { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PreviewCollection from '../components/Preview-Collection.component';
import { selectCollections } from '../redux/shop/shop.selector';

const shopPage = ( { collections } ) => { 
 

        return (
            <div className="shop-page">
                {
                    collections.filter((item,idx) => idx < 4).map(({ id, ...otherCollectionProps }) => <PreviewCollection key={id} {...otherCollectionProps}/> )
                }
            </div>
        )
    
}

const mapStateToProps = createStructuredSelector({
    collections : selectCollections
})


export default connect(mapStateToProps)(shopPage);