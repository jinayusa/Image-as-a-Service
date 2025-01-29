// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import * as serviceWorker from './serviceWorker';

// Configure Amplify with the necessary settings
Amplify.configure({
  Auth: {
    // region: 'us-east-1', // Your AWS region
    // userPoolId: 'your_user_pool_id',
    // userPoolWebClientId: 'your_user_pool_web_client_id',
    // authenticationFlowType: 'USER_PASSWORD_AUTH', // Or another flow type
  },
  // Other configurations for S3, API, etc.
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
