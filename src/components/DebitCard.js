import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col, Alert } from 'reactstrap';

function DebitCard() {
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

  useEffect(() => {
    // Mock API data
    const fetchMockData = () => {
      setTimeout(() => {
        setPrice(100); // Mock price
        setOrderId('ORD123456'); // Mock order ID
        setTimestamp(new Date().toISOString()); // Mock timestamp
        setAmount(100); // Mock amount
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
    }
  };

  return (
    <Container id="payment-form" className="my-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h2 className="text-center">Payment Form</h2>
          {error && <Alert color="danger">{error}</Alert>}
          {success && <Alert color="success">Payment processed successfully!</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="text"
                name="amount"
                id="amount"
                placeholder="Amount"
                value={amount}
                disabled // Disable the amount field
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
              />
            </FormGroup>
            <FormGroup>
              <Label for="expiryDate">Expiry Date</Label>
              <Input
                type="text"
                name="expiryDate"
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="cvv">CVV</Label>
              <Input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="Enter CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" type="submit">Pay Now</Button>
            <p className="text-center mt-3">Time remaining: {timer} seconds</p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default DebitCard;
