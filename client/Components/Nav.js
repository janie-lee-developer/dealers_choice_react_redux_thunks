import React from 'react';

const Nav = ({ loadApiMetals, loadApiAgri  }) => {
    return (
        <ul className='navigation'>
            <li onClick={() => loadApiMetals()}><a>Metals</a></li>
            <li ><a>Energy</a></li>
            <li onClick={() => loadApiAgri()}><a>Agricultural Commodities</a></li>
            <li style={{ float: 'left' }}><a href='/'>ETF Traders.com</a></li>
        </ul>
    )
}

export default Nav;

// , loadApiEnergy, loadApiAgri
