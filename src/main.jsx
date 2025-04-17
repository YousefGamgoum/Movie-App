import React from 'react';
import { createRoot } from 'react-dom/client'; // Use createRoot instead of ReactDOM.render
import { Provider } from 'react-redux';
import store from './store/store'; // Ensure the path is correct
import App from './App';

const root = createRoot(document.getElementById('root')); // Create a root
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);