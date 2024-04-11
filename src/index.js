import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header/header";
import TranslateToggle from "./components/toggle/translate_toggle/translate_toggle";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Header />
        <TranslateToggle />
        <App />
    </BrowserRouter>
);
