import { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const userId = sessionStorage.getItem('idUser');
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.request({
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: 'GET',
          url: `https://localhost:7211/Account/getInfor?id=${userId}`,
        });

        setUserData(response.data.data);
        setUpdatedUserData({
          id: response.data.data.id,
          fullname: response.data.data.name,
          email: response.data.data.email,
          phoneNumber: response.data.data.phoneNumber || '',
          address: response.data.data.address || '',
        });
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu người dùng:', error);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUpdatedUserData({
      fullname: userData.name,
      email: userData.email,
      phoneNumber: userData.phoneNumber || '',
      address: userData.address || '',
    });
  };

  const handleUpdateClick = async () => {
    debugger
    try {
      const updatedData = {
        id: userData.id,
        name: updatedUserData.fullname,
        email: updatedUserData.email,
        phoneNumber: updatedUserData.phoneNumber,
        address: updatedUserData.address,
      };
  
      await axios.put(
        `https://localhost:7211/Account/updateInfor`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setUserData((prevUserData) => ({
        ...prevUserData,
        name: updatedUserData.fullname,
        email: updatedUserData.email,
        phoneNumber: updatedUserData.phoneNumber,
        address: updatedUserData.address,
      }));
      setEditMode(false);
    } catch (error) {
      console.error('Lỗi khi cập nhật dữ liệu người dùng:', error);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{ marginBottom: 50 }} className="container mt-5">
      {userData ? (
        <div className="card">
          <div className="card-body">
            <h4 style={{ fontSize: 18 }}>Thông tin tài khoản</h4>
            <p>Họ và tên: {userData.name}</p>
            <p>Email: {userData.email}</p>
            <p>Số điện thoại: {userData.phoneNumber || 'N/A'}</p>
            <p>Địa chỉ: {userData.address || 'N/A'}</p>

            {editMode ? (
              <div>
                <h4 style={{ fontSize: 18 }}>Chỉnh sửa thông tin</h4>
                <div className="mb-3 row">
                  <label className="form-label col-6">
                    Họ và tên:
                    <input
                      type="text"
                      className="form-control"
                      name="fullname"
                      value={updatedUserData.fullname}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="form-label col-6">
                    Email:
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={updatedUserData.email}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div className="mb-3 row">
                  <label className="form-label col-6">
                    Số điện thoại:
                    <input
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                      value={updatedUserData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="form-label col-6">
                    Địa chỉ:
                    <input
                      type="text"
                      className="form-control"
                      name="address"
                      value={updatedUserData.address}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <button className="btn btn-primary me-2" onClick={handleUpdateClick}>
                  Cập nhật
                </button>
                <button className="btn btn-secondary" onClick={handleCancelClick}>
                  Hủy
                </button>
              </div>
            ) : (
              <button className="btn btn-warning" onClick={handleEditClick}>
                Chỉnh sửa
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Đang tải dữ liệu người dùng...</p>
      )}
    </div>
  );
};

export default Account;
