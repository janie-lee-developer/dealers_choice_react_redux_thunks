import React, { Component } from 'react';
import axios from 'axios';
// import faker from 'faker';
import StockList from './Components/StockList';
import Nav from './Components/Nav';

let intMetals;
let intAgri;


class App extends Component {
    constructor() {
        super();
        this.state = {
           stocks : [],
           metals: [],
           agri: []
        }
        this.loadApiMetals = this.loadApiMetals.bind(this);
        // this.loadApiEnergy = this.loadApiEnergy.bind(this);
        this.loadApiAgri = this.loadApiAgri.bind(this);
    }

    async componentDidMount() {
        const response = (await axios.get('/api/stocks')).data;
        this.setState({ stocks : response });

        setInterval(async ()=>{
            const responsee = (await axios.get('api/stocks/rand')).data;
            console.log(responsee);
            this.setState({ stocks: responsee });
        }, 1000)
    }

    loadApiMetals(){
        clearInterval(intAgri);
        this.setState({ agri: [] });

        const metalss = this.state.stocks.filter(categoryObj => {
            return categoryObj.name === 'Precious Metals'
        });
        this.setState({ metals: [...metalss] });

        intMetals = setInterval( () => {
            const metals = this.state.stocks.filter(categoryObj => {
                return categoryObj.name === 'Precious Metals'
            });
            this.setState({ metals: [...metals] });
        }, 1000);
    }

    loadApiAgri() {
        clearInterval(intMetals);
        this.setState({ metals: [] });

        const agri = this.state.stocks.filter(categoryObj => {
            return categoryObj.name === 'Agricultural Commodities'
        });
        this.setState({ agri: [...agri] });

        intAgri = setInterval(() => {
            const agrii = this.state.stocks.filter(categoryObj => {
                return categoryObj.name === 'Agricultural Commodities'
            });
            this.setState({ agri: [...agrii]});
        }, 1000);
        
    }

    render() {
        const { stocks, metals, agri } = this.state

        const Component = () => {
            if (metals.length > 0 && agri.length === 0) return <StockList stocks={metals} />;
            if (agri.length > 0 && metals.length === 0) return <StockList stocks={agri} />;
            return <StockList stocks={stocks} />
        }

        return (
            <div>
                <Nav loadApiMetals={this.loadApiMetals} loadApiAgri={this.loadApiAgri} />
                <Component />   
            </div>
        )
    }
}

export default App;

// loadApiEnergy={this.loadApiEnergy} 