import {createStore} from 'redux';

// combine reducer
import { combineReducers } from 'redux';

// thunks
import { applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import axios from 'axios';

//initial state
const initialState = {
    //entire data
    stocks: [],
    // categories
    metals: [],
    agri: [],
    energy: [],
    test: 'Janie, redux is connected!..'
}

// reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'LOAD') {
        console.log('test: before load', state)
        state.stocks = action.data;
        console.log('test: after load', state);
    }
    if (action.type === 'LOAD_RANDOM') {
        state.stocks = action.data;
    }
    if (action.type === 'FILTER_ENERGY') {
        state.energy = action.data;
        state.metals = [];
        state.agri = [];
    }
    if (action.type === 'FILTER_AGRI') {
        state.agri = action.data;
        state.metals = [],
        state.energy = []
    }
    if (action.type === 'FILTER_METALS') {
        state.metals = action.data;
        state.agri = [],
        state.energy = []
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

const store = createStore(rootReducer, applyMiddleware(thunks));

export default store;
export {
    loadStocks,
    loadRandStocks
}


