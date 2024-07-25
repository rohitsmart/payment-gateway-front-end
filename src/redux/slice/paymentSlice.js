import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  amount: null,
  transactionId: null,
  paymentStatus: '',
  modeOfPayment: '',
  orderId: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData: (state, action) => {
      const { message, amount, transactionId, paymentStatus, modeOfPayment, orderId } = action.payload;
      state.message = message;
      state.amount = amount;
      state.transactionId = transactionId;
      state.paymentStatus = paymentStatus;
      state.modeOfPayment = modeOfPayment;
      state.orderId = orderId;
    },
    clearPaymentData: (state) => {
      state.message = '';
      state.amount = null;
      state.transactionId = null;
      state.paymentStatus = '';
      state.modeOfPayment = '';
      state.orderId = null;
    },
  },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;

export const selectPayment = (state) => state.payment;

// Export reducer
export default paymentSlice.reducer;
