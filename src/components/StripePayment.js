// src/components/StripePayment.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import './StripePayment.css'; // Import custom CSS for additional styling
import CustomSpinner from './CustomSpinner';

function StripePayment() {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [price, setPrice] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading

  useEffect(() => {
    // Mock API data
    const fetchMockData = () => {
      setTimeout(() => {
        setPrice(150); // Mock price
        setOrderId('ORD112233'); // Mock order ID
        setTimestamp(new Date().toISOString()); // Mock timestamp
        setAmount(150); // Mock amount
      }, 500); // Simulate network delay
    };

    fetchMockData();

    // Timer logic
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          handleSubmit(); // Submit form after 60 seconds
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    setLoading(true); // Start loading

    const paymentDetails = {
      amount,
      cardNumber,
      expiryDate,
      cvv,
      price,
      orderId,
      timestamp,
    };

    try {
      // Simulate an API call
      console.log('Submitting payment details:', paymentDetails);
      setSuccess(true);
      setError(null);
    } catch (err) {
      setError('Failed to process payment');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Container id="stripe-form" className="my-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <div className="text-center">
            <h2 className="mb-4">Stripe Payment</h2>
            {error && <Alert color="danger">{error}</Alert>}
            {success && <Alert color="success">Payment processed successfully!</Alert>}
          </div>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="price">Amount</Label>
              <Input
                type="text"
                name="price"
                id="price"
                placeholder="Amount"
                value={price || ''}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <Label for="cardNumber">Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </FormGroup>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label for="expiryDate">Expiry Date</Label>
                  <Input
                    type="text"
                    name="expiryDate"
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label for="cvv">CVV</Label>
                  <Input
                    type="text"
                    name="cvv"
                    id="cvv"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>  
            <Button color="primary" type="submit" className="w-100">Pay with Stripe</Button>
            <p className="text-center mt-3">Time remaining: {timer} seconds</p>
          </Form>
          {loading && (
            <div className="text-center mt-4">
              <CustomSpinner />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default StripePayment;
