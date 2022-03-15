import React from 'react';
import { render } from 'react-dom';

// root component
import App from './App';

// redux
import store from './store';
import { Provider } from 'react-redux';

render(<Provider store= { store }><App /></Provider>, document.querySelector('#root'));
