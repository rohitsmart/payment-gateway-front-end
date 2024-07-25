import React from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';

function PaymentFailed() {
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center">
        <Col md="8" lg="6">
          <Alert color="danger">
            <h4 className="alert-heading">Payment Failed</h4>
            <p>There was an issue processing your payment. Please try again or contact support if the problem persists.</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default PaymentFailed;
