import React from 'react';
import Stock from './Stock';

const Category = ({ category}) => {

    return (
        <div className='categoryBox'>
            <div className='categoryHeader'>
                Category: {category.name}
            </div>
            {
                category.stocks.map(stock => {
                    return <Stock key={stock.id} stock={stock} categoryName={category.name}
                    />
                })
            }
        </div>
    )
}

export default Category;

