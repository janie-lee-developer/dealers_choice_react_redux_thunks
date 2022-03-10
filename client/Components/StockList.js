import React from 'react';
import Category from './Category';

const StockList = ({ stocks }) => {
    return (
        <div>
            {stocks.map(category => {
                return <Category key={category.id} category={ category }/>
            })}
        </div>
    )
}

export default StockList;