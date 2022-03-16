import React from 'react';
import { connect } from 'react-redux';
import { sellAsset } from '../store';

const Asset = ({ asset, stocks, sell }) => {

    let currentVal = ((stocks.filter(categoryObj => categoryObj.name === asset.categoryName)[0].stocks.filter(stock => {
        return stock.name === asset.name
    })[0].price) * asset.nOfBoughtShares).toFixed(2)

    return (
        <div className='asset'>
            <ul>
                <li>Category: <strong>{asset.categoryName}</strong></li>
                <li>Item: <strong>{asset.name}</strong></li>
                <li>Time Purchased: {new Date(asset.updatedAt).toLocaleString()}</li>
                <li>Price Bought at: <strong>$ {parseFloat(asset.boughtPrice)}</strong></li>
                <li>Number of Shares Owned: <strong>{asset.nOfBoughtShares}</strong></li>
                <li>Current Value: $ <strong>{ currentVal }</strong></li>
            </ul>
            <div className='sellBttn'>
                <button onClick={() => sell(asset)}>Sell</button>
            </div>
        </div>
    )
}

export default connect(state => state, (dispatch) => {
    return {
        sell: async(asset) => {
            dispatch(sellAsset(asset))
        }
    }
})(Asset);




