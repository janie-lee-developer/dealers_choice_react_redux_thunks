import React from 'react';

// child components
import Category from './Category';

// react-redux
import { connect } from 'react-redux';

const StockList = ({ stocks }) => {
    // console.log('stocks lists are', props ) 
    return (
        <div className='stockList'>
            {stocks.map(category => {
                return <Category key={category.id} category={category}/>
            })}
        </div>
    )
}

// const StockList = connect(state=> state)(_StockList);

export default StockList;