import React from 'react';
import Stock from './Stock';

const Category = ({ category, buy }) => {
    return (
        <div className='categoryBox'>
            <div className='categoryHeader'>
                Category: {category.name}
            </div>
            {
                category.stocks.map(stock => {
                    return <Stock key={stock.id} stock={stock} buy={buy}
                    />
                })
            }
        </div>
    )
}

export default Category;
