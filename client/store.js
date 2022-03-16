import {createStore} from 'redux';

// combine reducer
import { combineReducers } from 'redux';

// thunks
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

//initial state
const initialState = {
    //entire data
    stocks: [],
    // categories
    metals: [],
    agri: [],
    energy: [],
    assets: [],
    user: {
        fund: 100,
        totalAsset: 0
    },
    test: 'Janie, redux is connected!..'
}

// reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'LOAD') {
        console.log('test: before load', state)
        state = {...state, stocks: action.data }
        console.log('test: after load', state);
    }
    if (action.type === 'LOAD_RANDOM') {
        state = { ...state, stocks: action.data }
    }
    if (action.type === 'FILTER_ENERGY') {
        state = { ...state, stocks: action.data }
        state.metals = [];
        state.agri = [];
    }
    if (action.type === 'FILTER_AGRI') {
        state = { ...state, stocks: action.data }
        state.metals = [],
        state.energy = []
    }
    if (action.type === 'FILTER_METALS') {
        state = { ...state, stocks: action.data }
        state.agri = [],
        state.energy = []
    }
    if (action.type === 'ADD_ASSET') {
        state = {...state, assets: [...state.assets, action.data]}
    }
    console.log('final state', state.stocks);
    return state;
}

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
    console.log('why is category an empty?', categoryName);
    let nOfShare = e.target.getElementsByTagName('input')[0].value;
    nOfShare === '' ? nOfShare = 1 : parseInt(nOfShare);
    console.log('share number is', nOfShare)

    return async (dispatch) => {
        const response = (await axios.post(`/api/portfolio`, {
            categoryName, stockName, stockPrice, nOfShare
        })).data;
        console.log('axiossss', response);
        dispatch({ type: 'ADD_ASSET', data: response })
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export {
    loadStocks,
    loadRandStocks,
    buyStock
}


