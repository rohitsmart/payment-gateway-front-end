import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../assets/API/services';
import endpoints from '../assets/API/Endpoint';
import { showToast } from '../components/custom/CustomToaster';
import { setPaymentData, selectPayment } from '../redux/slice/paymentSlice';

function PaymentDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paymentState = useSelector(selectPayment);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const transactionId = new URLSearchParams(window.location.search).get('transactionID');
  console.log('Transaction ID:', transactionId);

  useEffect(() => {
    if (transactionId) {
      const fetchPaymentDetails = async () => {
        try {
          const data = await get(`${endpoints.PAYMENT_ENDPOINTS.ORDER_DETAILS_ENDPOINT}`, null, { transactionID: transactionId });
          setPaymentDetails(data);
          dispatch(setPaymentData(data));
          setLoading(false);
        } catch (err) {
          setError('Error fetching payment details');
          showToast('error', 'Error fetching payment details');
          setLoading(false);
          console.error('Error fetching payment details:', err);
          navigate('/server-error');
        }
      };

      fetchPaymentDetails();
    }
  }, [transactionId, navigate, dispatch]);

  useEffect(() => {
    // Log the payment state after it has been updated
    console.log("Redux payment state after dispatch:", paymentState);
  }, [paymentState]);

  useEffect(() => {
    if (paymentDetails) {
      switch (paymentDetails.modeOfPayment) {
        case 'STRIPE':
          navigate(`/stripe-payment`);
          break;
        case 'PAYPAL':
          navigate(`/paypal-payment?orderId=${paymentDetails.transactionId}`);
          break;
        case 'DEBIT_CARD':
        case 'CREDIT_CARD':
          navigate(`/card-payment?orderId=${paymentDetails.transactionId}`);
          break;
        default:
          setError('Unknown payment mode');
          showToast('error', 'Unknown payment mode');
          setLoading(false);
      }
    }
  }, [paymentDetails, navigate]);

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
    </>
  );
}

export default PaymentDetails;
