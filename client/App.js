// react
import React, { Component } from 'react';

// children components
import StockList from './Components/StockList';
import Nav from './Components/Nav';

// redux
import { connect } from 'react-redux';
import store from './store';

// thunks
import { loadStocks, loadRandStocks  } from './store';

// interval keys
let intMetals;
let intAgri;
let intEnergy;
let intrand;


class _App extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                fund: 100,
                totalAsset: 0
            }
        }
        
        this.filterMetals = this.filterMetals.bind(this);
        this.filterEnergy = this.filterEnergy.bind(this);
        this.filterAgri = this.filterAgri.bind(this);
    }

    componentDidMount() {
        // load initial stock prices
        this.props.load();

        // generates new random prices every 1 second
        intrand = setInterval(async () => {
            this.props.loadRand();
        }, 3000)
        
        // react state subscribing to redux state
        // store.subscribe(()=> this.setState(store.getState()));
    }

    filterMetals() {
        clearInterval(intAgri);
        clearInterval(intEnergy);

        // imediate filter
        let metals = this.state.stocks.filter(categoryObj => {
            return categoryObj.name === 'Precious Metals'
        });
        store.dispatch({ type: 'FILTER_METALS', data: [...metals] });

        // every 1 second, pull out updated metal prices
        intMetals = setInterval(() => {
            metals = this.state.stocks.filter(categoryObj => {
                return categoryObj.name === 'Precious Metals'
            });
            store.dispatch({ type: 'FILTER_METALS', data: [...metals] });
        }, 1000);
    }

    filterAgri() {
        clearInterval(intMetals);
        clearInterval(intEnergy);

        // imediate filter before the first sec
        let agri = this.state.stocks.filter(categoryObj => {
            return categoryObj.name === 'Agricultural Commodities'
        });
        store.dispatch({ type: 'FILTER_AGRI', data: [...agri] });

        // every 1 second, pull out updated agri prices
        intAgri = setInterval(() => {
            agri = this.state.stocks.filter(categoryObj => {
                return categoryObj.name === 'Agricultural Commodities'
            });
            store.dispatch({ type: 'FILTER_AGRI', data: [...agri] });
        }, 1000);
    }

    filterEnergy() {
        clearInterval(intMetals);
        clearInterval(intAgri);

        // imediate filter before the first sec
        let energy = this.state.stocks.filter(categoryObj => {
            return categoryObj.name === 'Energy'
        });
        store.dispatch({ type: 'FILTER_ENERGY', data: [...energy] });

        // every 1 second, pull out updated energy prices
        intEnergy = setInterval(() => {
            energy = this.state.stocks.filter(categoryObj => {
                return categoryObj.name === 'Energy'
            });
            store.dispatch({ type: 'FILTER_ENERGY', data: [...energy] })
        }, 1000);
    }

    render() {
        // redux store
        const { stocks, metals, agri, energy, assets, user } = this.props;

        // react state
        const { fund, totalAsset } = this.state.user;

        const Component = () => {
            if (metals.length > 0 && agri.length === 0 && energy.length === 0) return <StockList stocks={metals} filterMetals={this.filterMetals} />;
            if (agri.length > 0 && metals.length === 0 && energy.length === 0) return <StockList stocks={agri} filterAgri={this.filterAgri}/>;
            if (energy.length > 0 && metals.length === 0 && agri.length === 0) return <StockList stocks={energy} filterEnergy={this.filterEnergy}/>;
            return <StockList stocks={stocks} />
        }

        return (
            <div className='containerBody'>
                <Nav filterMetals={this.filterMetals} filterAgri={this.filterAgri} filterEnergy={this.filterEnergy}/>
                <Component />
                <div className='userBox'>
                    <div className='categoryHeader'>
                        Welcome, user1
                    </div>
                    <p className='userNote'>
                        Note: Every 3 seconds the market refreshes. Purchase must be made within the 3 seconds in order to reserve the price you see in the market.
                    </p>
                    <ul>
                        <li>Available Funds: $ {fund}</li>
                        <li>Total Assets: $ {totalAsset}</li>
                        <li>Assets Breakdown: {
                            assets.map(asset => {
                                return <div key={asset.id} className='asset'>
                                    <ul>
                                        <li>Category: {asset.categoryName}</li>
                                        <li>Item: {asset.name}</li>
                                        <li>Time Purchased: {new Date(asset.updatedAt).toLocaleString()}</li>
                                        <li>Price Bought at: $ {parseFloat(asset.boughtPrice)}</li>
                                        <li>Number of Shares Owned: {asset.nOfBoughtShares}</li>
                                        <li>Current Value: $ {
                                            (stocks.filter(categoryObj => categoryObj.name === asset.categoryName)[0].stocks.filter(stock=>{
                                                return stock.name === asset.name
                                            })[0].price) * asset.nOfBoughtShares
                                        }</li>
                                    </ul>
                                </div>
                            })
                        }</li>
                    </ul>
                </div>   
            </div>
        )
    }
}


const App = connect(
    state => state,
    (dispatch) => {
        return {
            load: () => {
                dispatch(loadStocks());
            },
            loadRand: () => {
                dispatch(loadRandStocks());
            }
        }
    }
)(_App);

export default App;