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

const filterMetals = () => {
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

const filterAgri = ()=> {
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

const filterEnergy = () => {
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

class _App extends Component {
    // constructor() {
    //     super();
    //     this.state = store.getState();
        
    //     this.filterMetals = this.filterMetals.bind(this);
    //     this.filterEnergy = this.filterEnergy.bind(this);
    //     this.filterAgri = this.filterAgri.bind(this);
    // }

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

    render() {
        // const { stocks, metals, agri, energy } = this.props.data;
        console.log('Test2', this.props.data);



        const Component = () => {
            if (metals.length > 0 && agri.length === 0 && energy.length === 0) return <StockList stocks={metals} filterMetals={this.filterMetals} />;
            if (agri.length > 0 && metals.length === 0 && energy.length === 0) return <StockList stocks={agri} filterAgri={this.filterAgri}/>;
            if (energy.length > 0 && metals.length === 0 && agri.length === 0) return <StockList stocks={energy} filterEnergy={this.filterEnergy}/>;
            return <StockList stocks={stocks} />
        }

        return (
            <div className='containerBody'>
                {this.props.data.stocks.map(stock => { <a>{stock.name}</a> })}
                {/* <Nav filterMetals={this.filterMetals} filterAgri={this.filterAgri} filterEnergy={this.filterEnergy}/>
                <Component />
                <div className='userBox'>
                    <div className='categoryHeader'>
                        Welcome, user1
                    </div>
                    <p>
                        Note: Every 3 seconds the market refreshes. Purchase must be made within the 3 seconds in order to reserve the price you see in the market.
                    </p>
                    <ul>
                        <li>Available Funds: $ </li>
                        <li>Total Assets: $ </li>
                        <li>Assets Breakdown: </li>
                    </ul>
                </div>    */}
            </div>
        )
    }
}


const App = connect(
    state => ({ data: state }),
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