import React from 'react';

const Nav = ({ filterMetals, filterAgri, filterEnergy }) => {
    return (
            <ul className='navigation'>
                <li className='navBttns' onClick={() => filterMetals()}><a>Metals</a></li>
                <li className='navBttns' onClick={() => filterEnergy()}><a>Energy</a></li>
                <li className='navBttns' onClick={() => filterAgri()}><a>Agricultural Commodities</a></li>
                <li className='home'><a className='homeLink' href='/'>ETF Traders.com</a></li>
            </ul>
    )
}

export default Nav;

// , loadApiEnergy, loadApiAgri
//style={{ float: 'left' }}
