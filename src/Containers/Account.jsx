import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Account = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    id: '',
    fullname: '',
    username: '',
    email: '',
    role: '',
    age: '',
    phoneNumber: '',
  });

  const userId = sessionStorage.getItem('idUser');
  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.request({
          headers: {
            Authorization: token
          },
          method: "GET",
          url: `https://localhost:7211/Account/getInfor?id=${userId}`
        }).then(response => {
          console.log(response.data);
        });
        setUserData(response.data);
        setUpdatedUserData(response.data);
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
    setUpdatedUserData(userData);
  };

  const handleUpdateClick = async () => {
    try {
      const { age, phoneNumber, ...dataToUpdate } = updatedUserData;
      await axios.put(`https://localhost:7211/Account/update`, dataToUpdate, {
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(updatedUserData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div style={{marginBottom: 50}} className="container mt-5">
      {userData ? (
        <div className="card">
          <div className="card-body">
            <h4 style={{ fontSize: 18 }}>Thông tin tài khoản</h4>
            <p>Fullname: {userData.fullname}</p>
            <p>Email: {userData.email}</p>
            <p>Age: {userData.age}</p>
            <p>Phone Number: {userData.phoneNumber}</p>

            {editMode ? (
              <div>
                <h4 style={{ fontSize: 18 }}>Chỉnh sửa thông tin</h4>
                <div className="mb-3 row">
                  <label className="form-label col-6">
                    Họ và tên:
                    <input type="text" className="form-control" name="fullname" value={updatedUserData.fullname} onChange={handleInputChange} />
                  </label>
                  <label className="form-label col-6">
                    Email:
                    <input type="text" className="form-control" name="email" value={updatedUserData.email} onChange={handleInputChange} />
                  </label>
                </div>
                <div className="mb-3 row">
                  <label className="form-label col-6">
                    Tuổi:
                    <input type="text" className="form-control" name="age" value={updatedUserData.age} onChange={handleInputChange} />
                  </label>
                  <label className="form-label col-6">
                    Phone Number:
                    <input type="text" className="form-control" name="phoneNumber" value={updatedUserData.phoneNumber} onChange={handleInputChange} />
                  </label>
                </div>
                <button className="btn btn-primary me-2" onClick={handleUpdateClick}>
                  Update
                </button>
                <button className="btn btn-secondary" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
            ) : (
              <button className="btn btn-warning" onClick={handleEditClick}>
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Account;
