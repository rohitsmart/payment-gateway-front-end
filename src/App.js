import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import PaymentDetails from './screen/PaymentDetails';
import StripePayment from './components/StripePayment';
import CustomToaster from './components/custom/CustomToaster'
import ServerErrorPage from './screen/ServerErrorPage';
import Home from './screen/Home';

function App() {
  return (
    <Router>
      <CustomToaster />

      <Header />
      <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/payment-details" element={<PaymentDetails />} />
      <Route path="/stripe-payment" element={<StripePayment />} />
      <Route path="/server-error" element={<ServerErrorPage />} />

      </Routes>
    </Router>
  );
}

export default App;
