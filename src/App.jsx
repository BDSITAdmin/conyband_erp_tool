import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header";
import Menu from './components/menu';
import Dashboard from "./pages/Dashboard"; 
import Inventory from "./pages/Inventory";
import Components from './pages/Product';
import Vendors from './pages/Vendors';
import Purchase from './pages/Purchase';
import Settings from './pages/settings';
import Users from './pages/users';


function App() {
  return (
    <Router>
      <Header />
      <div className="flex">
        <Menu />
        <div className="flex-grow ">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/Components" element={<Components />} />
            <Route path="/Vendors" element={<Vendors />} />
            <Route path="/Purchase" element={<Purchase />} />
            <Route path="/users" element={<Users />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
