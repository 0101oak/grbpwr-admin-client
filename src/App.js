// import { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Navbar from './components/navbar';
import Add from './pages/add/add';
import Product from './pages/product/product';

export default function Admin() {
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Add />}></Route>
          <Route path='product' element={<Product />}></Route>
        </Routes>
      </Router>

    </div>
  );
}