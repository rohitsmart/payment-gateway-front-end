import React from 'react';
import toast, { Toaster as HotToaster } from 'react-hot-toast';

const CustomToaster = () => {
  return (
    <HotToaster 
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        duration: 2000,
        style: {
          padding: '16px',
          color: '#fff',
        },
        success: {
          style: {
            background: '#32cd32',
          },
          iconTheme: {
            primary: '#4caf50',
            secondary: '#fff',
          },
        },
        error: {
          style: {
            background: '#ff6347',
          },
          iconTheme: {
            primary: '#f44336',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export const showToast = (type, message) => {
  if (type === 'success') {
    toast.success(message);
  } else if (type === 'error') {
    toast.error(message);
  }
};

export default CustomToaster;
