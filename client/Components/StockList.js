import React from 'react';

// child components
import Category from './Category';

const StockList = ({ stocks }) => {
    return (
        <div className='stockList'>
            {stocks.map(category => {
                return <Category key={category.id} category={category}/>
            })}
        </div>
    )
}

export default StockList;