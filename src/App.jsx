import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Menu from './components/Menu';
import Dashboard from "./pages/Dashboard"; 
import Inventory from "./pages/Inventory";
import Products from './pages/Products';
import Vendors from './pages/Vendors';
import Purchase from './pages/Purchase';


function App() {
  return (
    <Router>
      <Header />
      <div className="flex">
        <Menu />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/Products" element={<Products />} />
            <Route path="/Vendors" element={<Vendors />} />
            <Route path="/Purchase" element={<Purchase />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
