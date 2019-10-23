import React, { Component } from 'react'

import  SHOP_DATA  from "./shopData";

import PreviewCollection from '../components/Preview-Collection.component';

export default class shopPage extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            collections : SHOP_DATA
        } 
    }
    
    render() {

        const { collections } =  this.state ; 

        return (
            <div className="shop-page">
                {
                    collections.filter((item,idx) => idx < 4).map(({ id, ...otherCollectionProps }) => <PreviewCollection key={id} {...otherCollectionProps}/> )
                }
            </div>
        )
    }
}
