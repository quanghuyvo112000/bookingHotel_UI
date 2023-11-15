import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xóa token và role khỏi localStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('fullname');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('checkInDate');
    sessionStorage.removeItem('numNights');

    // Chuyển hướng về trang đăng nhập hoặc trang chủ
    navigate('/dang-nhap');
  }, [navigate]);

  return (
    <div>Đã đăng xuất</div>
  );
};

export default Logout;
