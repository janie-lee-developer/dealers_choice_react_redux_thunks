import React from 'react';
import Stock from './Stock';

const Category = ({ category }) => {
    return (
        <div className='categoryBox'>
            <h2>Category: {category.name}</h2>
            <hr />
            {
                category.stocks.map(stock => {
                    return <Stock key={stock.id} stock={stock}/>
                })
            }
        </div>
    )
}

export default Category;
