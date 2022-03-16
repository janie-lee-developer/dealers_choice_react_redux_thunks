import React from 'react';
import Asset from './Asset';
import { connect } from 'react-redux';

const Portfolio = ({ assets }) => {
    return (
        <div className='userBox'>
            <div className='categoryHeader'>
                Welcome, user1
            </div>
            <p className='userNote'>
                Note: Every 3 seconds the market refreshes. Purchase must be made within the 3 seconds in order to reserve the price you see in the market.
            </p>
            <ul>
                <li>Available Funds: $ </li>
                <li>Total Assets: $ </li>
                <li>Assets Breakdown: {
                    assets.map(asset => {
                        return <Asset key={asset.id} asset={asset}/>
                    })
                }</li>
            </ul>
        </div>   
    )
}


export default connect(state=>state)(Portfolio);



