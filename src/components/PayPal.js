// src/components/PayPal.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

function PayPal() {
  const [email, setEmail] = useState('');
  const [price, setPrice] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Mock API data
    const fetchMockData = () => {
      setTimeout(() => {
        setPrice(200); // Mock price
        setOrderId('ORD987654'); // Mock order ID
        setTimestamp(new Date().toISOString()); // Mock timestamp
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

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    const paymentDetails = {
      email,
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
    }
  };

  return (
    <Container id="paypal-form" className="my-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <div className="text-center">
            <h2 className="mb-4">PayPal Payment</h2>
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
              <Label for="email">PayPal Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter PayPal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit" className="w-100">Pay with PayPal</Button>
            <p className="text-center mt-3">Time remaining: {timer} seconds</p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PayPal;
