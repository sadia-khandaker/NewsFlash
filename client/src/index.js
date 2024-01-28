import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
// Use React Router to route to different pages
import {BrowserRouter} from 'react-router-dom';
//import "bootstrap/dist/css/bootstrap.css";
// We will be using Redux to manage our state so
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);
