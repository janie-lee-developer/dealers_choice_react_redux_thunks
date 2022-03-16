// react
import React, { Component } from 'react';

// child components
import StockList from './Components/StockList';
import Nav from './Components/Nav';
import Portfolio from './Components/Portfolio';

// redux
import { connect } from 'react-redux';

// thunks
import { loadStocks, loadRandStocks  } from './store';


class _App extends Component {
    constructor() {
        super();
        this.state = {
            metal: false,
            agri: false,
            energy: false
        }
        
        this.filterMetals = this.filterMetals.bind(this);
        this.filterEnergy = this.filterEnergy.bind(this);
        this.filterAgri = this.filterAgri.bind(this);
    }

    componentDidMount() {
        // load initial stock prices
        this.props.load();

        // generates new random prices every 3 second
        setInterval(async () => {
            this.props.loadRand();
        }, 3000)
    }

    filterMetals() {
        this.setState({metal: true, agri: false, energy: false});
    }

    filterAgri() {
        this.setState({ metal: false, agri: true, energy: false });
    }

    filterEnergy() {
        this.setState({ metal: false, agri: false, energy: true });
    }

    render() {
        // redux store
        const { stocks } = this.props;

        // react state
        const { metal, agri, energy } = this.state

        const Component = () => {
            if (metal) return <StockList stocks={stocks.filter(categoryObj => categoryObj.name === 'Precious Metals')} filterMetals={this.filterMetals} />;
            if (agri) return <StockList stocks={stocks.filter(categoryObj => categoryObj.name === 'Agricultural Commodities')} filterAgri={this.filterAgri}/>;
            if (energy) return <StockList stocks={stocks.filter(categoryObj => categoryObj.name === 'Energy')} filterEnergy={this.filterEnergy}/>;
            if (!metal && !agri && !energy )return <StockList stocks={stocks} />
        }

        return (
            <div className='containerBody'>
                <Nav filterMetals={this.filterMetals} filterAgri={this.filterAgri} filterEnergy={this.filterEnergy}/>
                <Component />
                <Portfolio />
            </div>
        )
    }
}

// redux APIs
// mapDispatchToProps
// mapStateToProps
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