import React, { useState } from 'react';
import axios from 'axios';
import ForgotPasswordForm from '../Containers/ForgotPasswordForm';

const ForgotPassword = () => {
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (email) => {
      try {
        // Gọi API để yêu cầu đặt lại mật khẩu
        const response = await axios.post('https://localhost:7211/Account/forgotPassword', {
          email: email,
        });
  
        // Hiển thị thông báo từ phản hồi của máy chủ
        setMessage(response.data.message);
      } catch (error) {
        console.error('Lỗi khi yêu cầu đặt lại mật khẩu:', error.response ? error.response.data.message : error.message);
        setMessage('Yêu cầu đặt lại mật khẩu không thành công.');
      }
    };
  

  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <ForgotPasswordForm onSubmit={handleForgotPassword} message={message} />
        </div>
      </div>
    </div>
  </div>
);
};

export default ForgotPassword;
