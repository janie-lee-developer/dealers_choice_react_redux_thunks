import React from 'react';

const Stock = ({ stock }) => {
    return (
        <div className='stockBox'>
            <h4>name: {`${stock.name[0].toUpperCase()}${stock.name.slice(1)}`}</h4>
            <p>
                price: {stock.price} <br />
                {
                    stock.imgUrl ?
                        <img className='triangle' src={`assets/${stock.imgUrl}`}></img> :
                        <i></i>
                }
            </p>
        </div>
    )
}

export default Stock;
