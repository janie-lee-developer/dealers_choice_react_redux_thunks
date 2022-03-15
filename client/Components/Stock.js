import React from 'react';

const Stock = ({ stock }) => {
    // const removeRestButtons = (e) => {
    //     console.log('The button clicked', e)
    //     e.target.className = 'clickedAddBttn';
    //     let elements = document.getElementsByClassName('addBttn');
    //     while (elements.length > 0 ) {
    //         elements[0].parentNode.removeChild(elements[0]);
    //     }
    // }
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
            <form onSubmit={(e) => { e.preventDefault() }}>
                Number of Shares: <input type='number' name='nOfShare' placeholder='1' min='0'></input>
                <button>Buy</button>
            </form>
        </div>
    )
}

export default Stock;
