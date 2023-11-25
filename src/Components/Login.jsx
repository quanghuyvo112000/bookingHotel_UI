import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/Login.css";

function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // Hàm xử lý sự kiện khi nhấp vào liên kết "Nếu bạn quên mật khẩu"
  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  // Hàm xử lý thay đổi dữ liệu khi người dùng nhập
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (activeTab === "login") {
      setLoginFormData({
        ...loginFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    } else if (activeTab === "register") {
      setRegisterFormData({
        ...registerFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Hàm chuyển đổi giữa tab "Đăng nhập" và "Đăng ký"
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowLoginPassword(false);
    setShowConfirmPassword(false);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "login") {
      setShowLoginPassword(!showLoginPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // xác thực đăng nhập
  const handleLoginSuccess = async (token, role) => {
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("jwtToken", token);

    // Dựa vào role để điều hướng người dùng
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  //xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7211/Account/login",
        {
          username: loginFormData.username,
          password: loginFormData.password,
        }
      );

      if (response.data.state) {
        console.log("Đăng nhập thành công!");
        sessionStorage.setItem("fullname", response.data.data.name);
        sessionStorage.setItem("idUser", response.data.data.id);
        handleLoginSuccess(response.data.message, response.data.data.role); // Corrected this line
      } else {
        console.log("Đăng nhập không thành công! Kiểm tra tên thông tin");
        alert("Vui lòng kiểm tra lại thông tin");
      }
    } catch (error) {
      if (error.response) {
        alert("Đăng nhập không thành công! Kiểm tra tên thông tin");
      } else {
        console.error("Lỗi khi đăng nhập!", error);
        alert("Tài khoản không tồn tại");
      }
    }
  };

  // xử lý đăng ký
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !registerFormData.fullname ||
      !registerFormData.username ||
      !registerFormData.password ||
      !registerFormData.confirmPassword ||
      !registerFormData.email
    ) {
      alert("Vui lòng nhập đủ thông tin!.");
      return;
    }

    if (
      registerFormData.password.length < 6 ||
      registerFormData.password.length >= 25
    ) {
      alert("Mật khẩu có độ dài từ 6 đến 25 ký tự!.");
      return;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).+$/.test(registerFormData.password)) {
      alert("Mật khẩu phải chứa ít nhất một chữ cái và một số.");
      return;
    }

    if (registerFormData.password !== registerFormData.confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không khớp!.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7211/Account/register",
        {
          email: registerFormData.email,
          username: registerFormData.username,
          password: registerFormData.password,
          name: registerFormData.fullname,
        }
      );

      console.log(response);

      if (response.data.state) {
        // Assuming 'state' is used to indicate success
        alert("Đăng ký thành công!");
        setRegisterFormData({
          fullname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeToTerms: false,
        });
        handleTabChange("login");
      } else {
        alert("Đăng ký không thành công! " + response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          alert(
            "Đăng ký không thành công! Tài khoản hoặc địa chỉ email đã được đăng ký."
          );
        } else {
          alert(
            `Đăng ký không thành công! Lỗi server: ${error.response.status}`
          );
          console.error("Lỗi khi thực hiện đăng ký!", error.response.data);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error(
          "Lỗi khi thực hiện đăng ký! Không nhận được phản hồi từ server."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Lỗi khi thực hiện đăng ký!", error.message);
      }
    }
  };

  return (
    <div style={{ marginBottom: 80 }} className="card">
      <div className="card-body">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "login" ? "active" : ""}`}
              onClick={() => handleTabChange("login")}
            >
              Đăng nhập
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "register" ? "active" : ""}`}
              onClick={() => handleTabChange("register")}
            >
              Đăng ký
            </button>
          </li>
        </ul>

        <div className="tab-content">
          {activeTab === "login" && (
            <div
              id="login"
              className={`tab-pane ${
                activeTab === "login" ? "show active" : ""
              }`}
            >
              <h5 className="card-title">Đăng nhập</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="login-username">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    id="login-username"
                    name="username"
                    value={loginFormData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label htmlFor="login-password">Mật khẩu</label>
                  <div className="input-group">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="form-control"
                      id="login-password"
                      name="password"
                      value={loginFormData.password}
                      onChange={handleChange}
                    />
                    <span
                      className="eye-icon"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => togglePasswordVisibility("login")}
                    >
                      <FontAwesomeIcon
                        icon={showLoginPassword ? faEye : faEyeSlash}
                      />
                    </span>
                  </div>
                </div>
                <div>
                  <span
                    style={{ fontSize: 12, color: "black", margin: "5px 0" }}
                  >
                    Nếu bạn quên mật khẩu. Vui lòng chọn vào{" "}
                    <span
                      className="forgot-password-link"
                      onClick={handleForgotPasswordClick}
                    >
                      đây
                    </span>
                    !
                  </span>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-submit-login"
                >
                  Đăng nhập
                </button>
              </form>
            </div>
          )}

          {activeTab === "register" && (
            <div
              id="register"
              className={`tab-pane ${
                activeTab === "register" ? "show active" : ""
              }`}
            >
              <h5 className="card-title">Đăng ký</h5>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label htmlFor="register-fullname">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-fullname"
                    name="fullname"
                    value={registerFormData.fullname}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="register-username">Tên đăng nhập</label>
                  <input
                    type="text"
                    className="form-control"
                    id="register-username"
                    name="username"
                    value={registerFormData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={registerFormData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label htmlFor="register-password">Mật khẩu</label>
                  <div className="input-group">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      className="form-control"
                      id="register-password"
                      name="password"
                      value={registerFormData.password}
                      onChange={handleChange}
                    />
                    <span
                      className="eye-icon"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => togglePasswordVisibility("login")}
                    >
                      <FontAwesomeIcon
                        icon={showLoginPassword ? faEye : faEyeSlash}
                      />
                    </span>
                  </div>
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label htmlFor="register-confirm-password">
                    Xác nhận mật khẩu
                  </label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control"
                      id="register-confirm-password"
                      name="confirmPassword"
                      value={registerFormData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className="eye-icon"
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      <FontAwesomeIcon
                        icon={showConfirmPassword ? faEye : faEyeSlash}
                      />
                    </span>
                  </div>
                </div>
                <div className="form-check">
                  <div
                    className="rules"
                    style={{
                      borderRadius: 5,
                      lineHeight: 2.5,
                      fontWeight: 400,
                      color: "black",
                      border: "1px solid #dee2e6",
                      scrollBehavior: "smooth",
                      overflow: "auto",
                      width: "100%",
                      height: 150,
                      margin: "15px 0",
                      padding: 10,
                      fontSize: 9,
                    }}
                  >
                    <h4 style={{ fontSize: 12 }}>Tóm tắt các Điều khoản</h4>
                    <span>
                      {" "}
                      + Cùng với các Điều khoản trên trang này, còn có hai tài
                      liệu khác cùng nhau hợp thành hợp đồng giữa chúng tôi với
                      bạn:
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Trang Chúng tôi hoạt động như thế nào giúp bạn sử dụng
                      Nền tảng của chúng tôi và hiểu về các đánh giá, xếp hạng,
                      gợi ý của chúng tôi, cách chúng tôi kiếm tiền và những vấn
                      đề khác nữa.
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Tiêu chuẩn và Hướng dẫn về Nội dung giúp chúng tôi duy
                      trì mọi nội dung trên Nền tảng sao cho liên quan và phù
                      hợp với người truy cập toàn cầu mà không hạn chế tự do
                      ngôn luận. Tài liệu đó cho biết cách chúng tôi quản lý nội
                      dung và các hành động khi có nội dung không phù hợp.
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Khi đồng ý với các Điều khoản của chúng tôi, bạn đồng ý
                      với tất cả nội dung trong cả ba tài liệu. Nếu bạn không
                      chấp nhận bất kỳ Điều khoản nào trong các Điều khoản này,
                      vui lòng không sử dụng Nền tảng của chúng tôi.
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Tất cả thông tin này (cùng email xác nhận đơn đặt và mọi
                      thông tin được cung cấp trong giai đoạn tiền hợp đồng
                      trước khi bạn đặt chỗ) đều quan trọng vì chúng quy định
                      các điều khoản pháp lý mà căn cứ trên đó các Nhà cung cấp
                      Dịch vụ cung cấp Trải nghiệm Du lịch thông qua Nền tảng
                      của chúng tôi.
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Nếu xảy ra vấn đề với Trải nghiệm Du lịch của bạn, Mục
                      A15 trong các Điều khoản này sẽ giải thích những gì bạn có
                      thể làm để giải quyết vấn đề đó. Điều đó bao gồm khiếu nại
                      với chúng tôi, đưa ra tòa và (trong một số trường hợp) sử
                      dụng dịch vụ giải quyết tranh chấp trực tuyến.
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Nếu bạn muốn kháng nghị quyết định kiểm duyệt hoặc báo
                      cáo bất kỳ nội dung nào trên Nền tảng của chúng tôi thì
                      Tiêu chuẩn và Hướng dẫn về Nội dung sẽ giải thích cách
                      kháng nghị hoặc báo cáo, cũng như cách chúng tôi quản lý
                      các yêu cầu này.
                    </span>
                    <br />
                    <span>
                      {" "}
                      + Bản tóm tắt này không nằm trong các Điều khoản của chúng
                      tôi hay một tài liệu pháp lý nào cả. Đây chỉ là phần giải
                      thích đơn giản về các Điều khoản của chúng tôi. Chúng tôi
                      khuyến khích bạn đọc toàn bộ nội dung của từng tài liệu.
                      Một số từ trong bản tóm tắt này có ý nghĩa rất cụ thể, vì
                      vậy vui lòng kiểm tra “Từ điển Booking.com” ở phần cuối
                      các Điều khoản này.
                    </span>
                    <br />
                  </div>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={registerFormData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="agreeToTerms">
                    Tôi đồng ý với điều khoản sử dụng
                  </label>
                </div>
                <button
                  type="submit"
                  className={`btn btn-primary ${
                    !registerFormData.agreeToTerms ? "disabled" : ""
                  }`}
                >
                  Đăng ký
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
