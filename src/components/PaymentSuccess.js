import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { useSelector } from 'react-redux';

function PaymentSuccess({ amount }) {
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Alert color="success">
            <h4 className="alert-heading">Payment Successful!</h4>
            <p>Your payment of ${amount} has been processed successfully.</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentSuccess;
