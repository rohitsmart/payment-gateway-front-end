import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './StripePayment.css';
import CustomSpinner from './CustomSpinner';
import PaymentSuccess from './PaymentSuccess';
import PaymentFailed from './PaymentFailed';
import { post } from '../assets/API/services';
import endpoints from '../assets/API/Endpoint';
import { selectPayment } from '../redux/slice/paymentSlice';

function StripePayment() {
  const navigate = useNavigate();
  const paymentState = useSelector(selectPayment);

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { amount, transactionId, orderId } = paymentState;

  console.log("amount from redux ", amount);

  useEffect(() => {
    if (!transactionId) {
      setError('Transaction ID not found');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [transactionId]);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();

    setLoading(true);

    const paymentDetails = {
      amount,
      cardNumber,
      expiryDate,
      cvv,
      orderId,
      timestamp: new Date().toISOString(),
    };

    try {
      await post(endpoints.PAYMENT_ENDPOINTS.STRIPE, paymentDetails);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setError(null);
      }, 5000);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setError('Failed to process payment');
        setTimeout(() => {

        }, 5000);
      }, 5000);
    }
  };

  return (
    <Container id="stripe-form" className="my-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <div className="text-center">
            <h2 className="mb-4">Stripe Payment</h2>
            {error && <PaymentFailed />}
            {success && <PaymentSuccess amount={amount} />}
          </div>
          {!success && !error && (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="price">Amount</Label>
                <Input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="Amount"
                  value={amount || ''}
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
          )}
          {loading && (
            <div className="text-center mt-4">
              <CustomSpinner message="Please do not press back. Processing your payment..." />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default StripePayment;
