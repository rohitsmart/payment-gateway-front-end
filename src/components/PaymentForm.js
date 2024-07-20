import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';

function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle payment processing
    alert('Payment details submitted');
  };

  return (
    <Container id="payment-form" className="my-5">
      <Row className="justify-content-center">
        <Col md="6">
          <h2 className="text-center">Payment Form</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="text"
                name="amount"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentForm;
