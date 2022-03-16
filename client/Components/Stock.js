import React from 'react';

// redux
import { connect } from 'react-redux';
import { buyStock } from '../store';

const Stock = ({ buy, stock, categoryName }) => {
    console.log('why is category an empty???', categoryName);

    return (
        <div className='stockBox'>
            <h4>Item: {`${stock.name[0].toUpperCase()}${stock.name.slice(1)}`}</h4>
            <p>
                price: $ {stock.price} 
                {
                    stock.imgUrl ?
                        <img className='triangle' src={`assets/${stock.imgUrl}`}></img> :
                        <i></i>
                }
            </p>
            <form onSubmit={(e) => { e.preventDefault(); buy(e, stock.name, stock.price, categoryName) }}>
                Number of Shares: <input type='number' name='nOfShare' min='1' placeholder='0' ></input>
                <button>Buy</button>
            </form>
        </div>
    )
}

const mapDispatch = (dispatch) => {
    return {
        buy: async(e, stockName, stockPrice, categoryName) => {
            dispatch(buyStock(e, stockName, stockPrice, categoryName));
        }  
    }
}

export default connect(null, mapDispatch)(Stock);
