import React from 'react';

const Stock = ({ stock, buy }) => {
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
            {/* <form onSubmit={(e) => { e.preventDefault(); buy(e, stock) }}>
                Number of Shares: <input type='number' name='nOfShare' placeholder='1'></input>
                <button>Buy</button>
            </form> */}
        </div>
    )
}

export default Stock;
