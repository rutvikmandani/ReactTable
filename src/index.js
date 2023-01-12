import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Expanded from './Components/Expanded';
import ExpandableTableComponent from './Prac2';
// import App from './Demo';
// import App from './Demo3';
import App from "./Components/Editable"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Expanded /> */}
    {/* <ExpandableTableComponent /> */}
    
  </React.StrictMode>
);

