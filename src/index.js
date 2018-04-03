import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Store
import store from './store/index';

// Root
import Root from './config/Root';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
