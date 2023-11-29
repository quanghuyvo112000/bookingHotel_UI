import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ResetPasswordForm from "../Containers/ResetPasswordForm";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Hàm kiểm tra mật khẩu có ít nhất 1 chữ số và 1 ký tự
  const isPasswordValid = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d).+$/.test(password);
  };

  const handleChange = (field) => (e) => {
    setPasswords({
      ...passwords,
      [field]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = passwords;

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      return;
    }

    // Kiểm tra mật khẩu có đủ yêu cầu không
    if (!isPasswordValid(password)) {
      setError("Mật khẩu phải chứa ít nhất 1 chữ số và 1 ký tự.");
      return;
    }

    try {
      // Kiểm tra trạng thái trước khi gọi API
      if (!password || !confirmPassword) {
        setError("Vui lòng nhập đầy đủ mật khẩu và xác nhận mật khẩu.");
        return;
      }

      // Gọi API để đặt lại mật khẩu
      const response = await axios.put(
        "https://localhost:7211/Account/resetPassword",
        {
          email: email,
          token: token,
          newPassword: password,
        }
      );

      // Hiển thị thông báo từ phản hồi của máy chủ
      setMessage(response.data.message);
      setError("");

      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate("/dang-nhap"); // Thay đổi đường dẫn tùy thuộc vào định tuyến của bạn
      }, 2000); // 2000 milliseconds = 2 seconds
    } catch (error) {
      console.error(
        "Lỗi khi đặt lại mật khẩu:",
        error.response ? error.response.data.message : error.message
      );
      setError("Đặt lại mật khẩu không thành công.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Đặt Lại Mật Khẩu</h4>
              <ResetPasswordForm
                onSubmit={handleResetPassword}
                password={passwords.password}
                confirmPassword={passwords.confirmPassword}
                onChange={handleChange}
              />
              {error && <div className="alert alert-danger mt-3">{error}</div>}
              {message && (
                <div className="alert alert-success mt-3">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
