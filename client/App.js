import React, { Component } from 'react';
import axios from 'axios';
// import faker from 'faker';
import StockList from './Components/StockList';
import Nav from './Components/Nav';

class App extends Component {
    constructor() {
        super();
        this.state = {
           stocks : [],
           metals: {}
        }
        // this.loadApiMetals = this.loadApiMetals.bind(this);
        // this.loadApiEnergy = this.loadApiEnergy.bind(this);
        // this.loadApiAgri = this.loadApiAgri.bind(this);
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

    async loadApiMetals(){
        const metals = (await axios.get('/api/stocks/metals')).data;
        this.setState({ metals });
    }

    render() {
        const { stocks } = this.state
        return (
            <div>
                {/* <Nav loadApiAgri={this.loadApiAgri} loadApiEnergy={this.loadApiEnergy} loadApiMetals={this.loadApiMetals} /> */}
                <StockList stocks = { stocks } />
            </div>
        )
    }
}

export default App;