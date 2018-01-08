import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from './Routers';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Routers />, document.getElementById('root'));
registerServiceWorker();
