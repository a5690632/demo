import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Bouter from  "./router/router"



ReactDOM.render(<Bouter />, document.getElementById('root'));
registerServiceWorker();
