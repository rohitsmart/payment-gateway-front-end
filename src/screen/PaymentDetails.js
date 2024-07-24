import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '../assets/API/services';
import endpoints from '../assets/API/Endpoint';
import { showToast } from '../components/custom/CustomToaster';
function PaymentDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  const transactionId = new URLSearchParams(window.location.search).get('transactionID');
console.log(transactionId)
  useEffect(() => {
    if (transactionId) {
      const fetchPaymentDetails = async () => {
        try {
          const data = await get(`${endpoints.PAYMENT_ENDPOINTS.ORDER_DETAILS_ENDPOINT}`, null, { transactionID: transactionId });
          setPaymentDetails(data);
          setLoading(false);
          switch (data.modeOfPayment) {
            case 'STRIPE':
              navigate(`/stripe-payment?orderId=${data.transactionId}`);
              break;
            case 'PAYPAL':
              navigate(`/paypal-payment?orderId=${data.transactionId}`);
              break;
            case 'DEBIT_CARD':
            case 'CREDIT_CARD':
              navigate(`/card-payment?orderId=${data.transactionId}`);
              break;
            default:
              setError('Unknown payment mode');
              showToast('error', 'Unknown payment mode');
              setLoading(false);
          }
        } catch (err) {
          setError('Error fetching payment details');
          showToast('error', 'Error fetching payment details');
          setLoading(false);
          console.error('Error fetching payment details:', err);
        }
      };

      fetchPaymentDetails();
    }
  }, [transactionId, navigate]);

return(
  <></>
)
}

export default PaymentDetails;
