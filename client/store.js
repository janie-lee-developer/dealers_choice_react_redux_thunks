import {createStore} from 'redux';

// combine reducer
import { combineReducers } from 'redux';

// thunks
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//initial state
const initialState = {
    stocks: [],
    assets: [],
    userFund: 500
}

// reducers
const stockReducer = (state = initialState.stocks, action) => {
    if (action.type === 'LOAD') {
        return state = action.data
    }
    if (action.type === 'LOAD_RANDOM') {
        return state = action.data
    }
    return state;
}

const assetReducer = (state = initialState.assets, action) => {
    if (action.type === 'ADD_ASSET') {
        return state = [ ...state, action.data ]
    }
    if (action.type === 'SELL') {
        return state = state.filter( asset => asset.id !== action.asset.id )
    }
    return state;
}

//combine reducers
const reducer = combineReducers({ stocks: stockReducer, assets: assetReducer});


// thunks
const loadStocks = () => {
    return async (dispatch) => {
        const response = (await axios.get('/api/stocks')).data;
        dispatch({ type: 'LOAD', data: response });
    }
}

const loadRandStocks = () => {
    return async (dispatch) => {
        const response = (await axios.get('/api/stocks/rand')).data;
         dispatch({ type: 'LOAD_RANDOM', data: response })
    }
}

const buyStock = (e, stockName, stockPrice, categoryName) => {
    let nOfShare = e.target.getElementsByTagName('input')[0].value;
    nOfShare === '' ? nOfShare = 1 : parseInt(nOfShare);
    console.log('number of shares bought is:', nOfShare)

    return async (dispatch) => {
        const response = (await axios.post(`/api/portfolio`, {
            categoryName, stockName, stockPrice, nOfShare
        })).data;
        console.log('axios post return:', response);
        dispatch({ type: 'ADD_ASSET', data: response })
    }
}

const sellAsset = (asset) => {
    console.log('sell this asset:', asset);
    return async(dispatch) => {
        await axios.delete(`/api/portfolio/${asset.id}`);
        dispatch({ type: 'SELL', asset })
    }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export {
    loadStocks,
    loadRandStocks,
    buyStock,
    sellAsset
}


