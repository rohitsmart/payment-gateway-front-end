import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import DebitCard from './components/DebitCard';
import CreditCard from './components/CreditCard';
import PayPal from './components/PayPal';
import StripePayment from './components/StripePayment';
import CustomSpinner from './components/CustomSpinner';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CustomSpinner />} />
        <Route path="/credit" element={<CreditCard />} />
        <Route path="/paypal" element={<PayPal />} />
        <Route path="/stripe" element={<StripePayment />} />


      </Routes>
    </Router>
  );
}

export default App;
