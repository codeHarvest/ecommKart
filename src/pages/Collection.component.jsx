import React from 'react'
import { connect } from 'react-redux';

// import CollectionItem from '../components/CollectionItem.component'
import { selectCollection } from '../redux/shop/shop.selector';


const CollectionPage = ({ match }) => {
    console.log(match);
    return (
        <div className="category">
            <h2>category</h2>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
 collection : selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage);