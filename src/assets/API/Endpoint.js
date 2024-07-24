const BASE_URL = 'http://localhost:8080/api';

const PUBLIC_URL = `${BASE_URL}/public`;
const PRIVATE_URL = `${BASE_URL}/protected`;

// Authentication Endpoints
const AUTH_ENDPOINTS = {
  LOGIN: `${PUBLIC_URL}/login`,
  SIGNUP: `${PUBLIC_URL}/register`,
};

// User and Client Endpoints
const USER_CLIENT_ENDPOINTS = {
  CREATE_CLIENT: `${PRIVATE_URL}/user/create-client`,
  FETCH_CLIENT: `${PRIVATE_URL}/user/client`,
};

// Payment Endpoints
const PAYMENT_ENDPOINTS = {
  STRIPE: `${PUBLIC_URL}/payment/stripe`,
  PAYPAL: `${PUBLIC_URL}/payment/paypal`,
  DEBIT_CARD: `${PUBLIC_URL}/payment/debit-card`,
  CREDIT_CARD: `${PUBLIC_URL}/payment/credit-card`,
  ORDER_DETAILS_ENDPOINT: `${PUBLIC_URL}/payment/order-details`,
};

// Export all endpoints
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AUTH_ENDPOINTS,
  USER_CLIENT_ENDPOINTS,
  PAYMENT_ENDPOINTS,
};
