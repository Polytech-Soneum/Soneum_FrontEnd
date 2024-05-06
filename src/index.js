import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from "./components/header/header";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer/footer";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Header />
      <App />
      <Footer />
  </BrowserRouter>
);
