import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Home from './pages/Home';
import Two from './pages/Two';
import Detail from './pages/Detail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/three" element={<Home />}></Route>
        <Route path="/detail" element={<Detail />}></Route>
        <Route path="/setting" element={<Two />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
