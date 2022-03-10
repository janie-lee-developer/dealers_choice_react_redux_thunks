import React from 'react';

const Nav = ({ loadApiMetals, loadApiEnergy, loadApiAgri  }) => {
    return (
        <ul className='navigation'>
            <li onClick={() => loadApiMetals()}><a>Metals</a></li>
            <li onClick={() => loadApiEnergy() }><a>Energy</a></li>
            <li onClick={() => loadApiAgri()}><a>Agricultural Commodities</a></li>
            <li style={{float:'left'}}><a>ETF Traders.com</a></li>
        </ul>
    )
}

export default Nav;
