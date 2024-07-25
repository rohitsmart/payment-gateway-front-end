import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import cardImage from '../assets/images/card.png';
import stripeImage from '../assets/images/stripe.avif';
import paypalImage from '../assets/images/paypal.png';
import upiImage from '../assets/images/upi.jpg';

function Home() {
  const navigate = useNavigate();

  const handlePaymentRedirect = (paymentType) => {
    navigate(`/`);
  };

  return (
    <div className="home-page">
      <div className="container text-center">
        <h1 className="display-4">Welcome to Fake Payment Gateway</h1>
        <p className="lead">Choose your preferred payment method</p>
        <div className="row">
          <div className="col-md-3">
            <div className="payment-option" onClick={() => handlePaymentRedirect('card')}>
              <img src={cardImage} alt="Card Payment" className="img-fluid" />
              <Button color="primary" className="mt-2">Card Payment</Button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="payment-option" onClick={() => handlePaymentRedirect('stripe')}>
              <img src={stripeImage} alt="Stripe Payment" className="img-fluid" />
              <Button color="primary" className="mt-2">Stripe</Button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="payment-option" onClick={() => handlePaymentRedirect('paypal')}>
              <img src={paypalImage} alt="PayPal Payment" className="img-fluid" />
              <Button color="primary" className="mt-2">PayPal</Button>
            </div>
          </div>
          <div className="col-md-3">
            <div className="payment-option" onClick={() => handlePaymentRedirect('upi')}>
              <img src={upiImage} alt="UPI Payment" className="img-fluid" />
              <Button color="primary" className="mt-2">UPI</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
