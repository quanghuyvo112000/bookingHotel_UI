import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faMapLocationDot, faBuildingCircleCheck, faCartFlatbedSuitcase, faHotel, faCashRegister, faCreditCard, faCircleCheck, faBed } from '@fortawesome/free-solid-svg-icons';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPaginate from 'react-paginate';
import '../css/BillManage.css'; // Thêm CSS để tùy chỉnh giao diện

const StatusSelect = ({ selectedStatus, handleStatusChange, handleUpdateStatus, billId, state }) => {
  return (
    <div className="status-select">
      <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#275fbe" }} />
      <label htmlFor="status">Trạng thái:</label>
      <select id="status" value={selectedStatus} onChange={handleStatusChange}>
        <option value="chờ phê duyệt">Chờ phê duyệt</option>
        <option value="đã duyệt">Đã duyệt</option>
        {/* Thêm các trạng thái khác nếu cần */}
      </select>
      {state === 'chờ phê duyệt' && (
        <button className="btn btn-danger" onClick={() => handleUpdateStatus(billId)}>Cập nhật trạng thái</button>
      )}
      {state === 'đã duyệt' && (
        <button className="btn btn-secondary" disabled={false}>Không cập nhật</button>
      )}
    </div>
  );
};

const Bill = ({ bill }) => {
  const [selectedStatus, setSelectedStatus] = useState('chờ phê duyệt');

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleUpdateStatus = async (billId) => {
    try {
      console.log("Updating status for Bill ID:", billId);
      await axios.put(`http://localhost:4000/bills/${billId}`, { state: selectedStatus });

      // Cập nhật trạng thái của Bill (chưa cung cấp trong đoạn mã nguồn)

      console.log(`Updated status for bill with ID ${billId}`);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const mapPaymentMethod = (payment) => {
    switch (payment) {
      case 'nhanphong':
        return 'Thanh toán khi nhận phòng';
      case 'creditCard':
        return 'Credit Card';
      case 'bank':
        return 'Ngân hàng';
      default:
        return payment;
    }
  };

  const formatCheckInDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  return (
    <div style={{marginBottom: 50}} className="col-md-6 mb-4">
      <div className="card">
        <div className="card-body">
          <h4 style={{ fontSize: 16 }}> <FontAwesomeIcon icon={faHotel} style={{ color: "#275fbe" }} /> {bill.hotelInfo.nameHotel} </h4>
          <p> <FontAwesomeIcon icon={faLocationDot} style={{ color: "#275fbe" }} /> Khu vực: {bill.hotelInfo.location}, <FontAwesomeIcon icon={faMapLocationDot} style={{ color: "#275fbe" }} /> Địa chỉ: {bill.hotelInfo.address}</p>
          <hr />
          <p>Tên khách hàng: {bill.customerName}</p>
          <p>Email: {bill.customerEmail}</p>
          <p>Số điện thoại: {bill.customerPhone}</p>
          <hr />
          <p style={{ fontSize: 14, fontWeight: 500 }}>Thông tin phòng: {bill.roomInfo.nameRoom}</p>
          <p> <FontAwesomeIcon icon={faBuildingCircleCheck} style={{ color: "#275fbe" }} /> Ngày Check-In: {formatCheckInDate(bill.checkInDate)}</p>
          <p> <FontAwesomeIcon icon={faCartFlatbedSuitcase} style={{ color: "#275fbe" }} /> Ngày Check-Out: {bill.checkOutDate}</p>
          <p> <FontAwesomeIcon icon={faBed} style={{ color: "#275fbe" }} /> Số phòng đã đặt: {bill.numRooms} phòng</p>
          <p> <FontAwesomeIcon icon={faCashRegister} style={{ color: "#275fbe" }} /> Tổng tiền thanh toán: {bill.totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
          <p> <FontAwesomeIcon icon={faCreditCard} style={{ color: "#275fbe" }} /> Hình thức thanh toán: {mapPaymentMethod(bill.payment)}</p>
          <StatusSelect
            selectedStatus={selectedStatus}
            handleStatusChange={handleStatusChange}
            handleUpdateStatus={() => handleUpdateStatus(bill.id)}
            billId={bill.id}
            state={bill.state}
          />
        </div>
      </div>
    </div>
  );
};

const BillManage = () => {
  const [bills, setBills] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const userId = sessionStorage.getItem('idUser');
  const billsPerPage = 5; // Số hóa đơn hiển thị trên mỗi trang

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/bills/${userId}`);
        setBills(response.data);
      } catch (error) {
        console.error('Error fetching bills:', error);
      }
    };

    fetchBills();
  }, [userId]);

  // Lọc danh sách hóa đơn
  const approvedBills = bills.filter((bill) => bill.state === 'đã duyệt');
  const pendingApprovalBills = bills.filter((bill) => bill.state === 'chờ phê duyệt');

  // Tính toán số trang
  const pageCount = Math.ceil(pendingApprovalBills.length / billsPerPage);

  // Hiển thị chỉ các hóa đơn cho trang hiện tại
  const displayBills = pendingApprovalBills.slice(pageNumber * billsPerPage, (pageNumber + 1) * billsPerPage);

  // Hàm xử lý thay đổi trang
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="container">
      <h4 style={{ fontSize: 18, marginTop: 15 }}>Danh sách hóa đơn</h4>
      <Tabs>
        <TabList>
          <Tab>Chờ phê duyệt</Tab>
          <Tab>Đã duyệt</Tab>
        </TabList>

        <TabPanel>
          {displayBills.length > 0 ? (
            <div>
              <div className="row">
                {displayBills.map((bill) => (
                  <Bill key={bill.id} bill={bill} />
                ))}
              </div>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
              />
            </div>
          ) : (
            <p>No bills found with the status "chờ phê duyệt."</p>
          )}
        </TabPanel>

        {/* Tương tự cho Tab "Đã duyệt" */}
        <TabPanel>
          {approvedBills.length > 0 ? (
            <div>
              <div className="row">
                {approvedBills.map((bill) => (
                  <Bill key={bill.id} bill={bill} />
                ))}
              </div>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination__link'}
                nextLinkClassName={'pagination__link'}
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination__link--active'}
              />
            </div>
          ) : (
            <p>No bills found with the status "đã duyệt."</p>
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default BillManage;
