import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import files from "./data/products.json";

let arr = {};
const imgArr = files.map((i) => {
    arr[i.id + "-01"] = "";
    return i.id + "-01";
});
console.log(arr);
imgArr.map((item) => {
    console.log(item);
    arr[item] = require("./img/" + item + ".jpg");
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
