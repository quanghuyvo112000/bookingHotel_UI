import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faBed,
  faHotel,
  faCalendarDays,
  faClock,
  faPersonShelter,
  faTrash,
  faMoneyBill,
  faCheck,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";

import "../css/BillManage.css";

const BillManage = () => {
  const [bills, setBills] = useState([]);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [isFinishSuccess, setIsFinishSuccess] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const billsPerPage = 6;

  const token = sessionStorage.getItem("jwtToken");

  const fetchBills = useCallback(async () => {
    try {
      debugger;
      const response = await axios.get(`https://localhost:7211/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBills(response.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const typeIdOptions = {
    TR01: "Standard",
    TR02: "Superior",
    TR03: "Deluxe",
    TR04: "Suite",
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const handleClosePopup = () => {
    setIsBookingSuccess(false);
  };

  const handleCancelBooking = async (billId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7211/Bill/delete`,
        {
          data: { id: billId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.state) {
        setIsBookingSuccess(true);

        // Tính toán vị trí của hóa đơn cần xóa trong danh sách hiện tại
        const indexOfBillToDelete = bills.findIndex(
          (bill) => bill.id === billId
        );

        // Nếu hóa đơn cần xóa nằm trên trang hiện tại
        if (
          indexOfBillToDelete >= currentPage * billsPerPage &&
          indexOfBillToDelete < (currentPage + 1) * billsPerPage
        ) {
          const updatedBills = [...bills];
          updatedBills.splice(
            indexOfBillToDelete - currentPage * billsPerPage,
            1
          );
          setBills(updatedBills);
        } else {
          // Nếu hóa đơn cần xóa không nằm trên trang hiện tại, chỉ cần fetch lại dữ liệu
          fetchBills();
        }
      } else {
        console.error("Lỗi xóa hóa đơn:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi xóa hóa đơn:", error);
    }
  };

  const handleFinishBooking = async (billId) => {
    try {
      const response = await axios.put(
        `https://localhost:7211/Bill/finish`,
        { id: billId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.state) {
        setIsFinishSuccess(true);
        // Cập nhật danh sách hóa đơn sau khi hoàn thành đặt phòng
        const updatedBills = bills.map((bill) =>
          bill.id === billId ? { ...bill, status: true } : bill
        );
        setBills(updatedBills);
      } else {
        console.error("Lỗi hoàn thành đơn đặt phòng:", response.data.message);
      }
    } catch (error) {
      console.error("Lỗi hoàn thành đơn đặt phòng:", error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * billsPerPage;
  const currentBills = bills.slice(offset, offset + billsPerPage);

  return (
    <div style={{ marginBottom: 100 }} className="container">
      <br />
      {bills.length > 0 ? (
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => {
            setSelectedTab(index);
            setCurrentPage(0); // Reset current page when changing tabs
          }}
        >
          <TabList className="custom-tab-list">
            <Tab
              className={`custom-tab ${selectedTab === 0 ? "active-tab" : ""}`}
            >
              Chờ phê duyệt
            </Tab>
            <Tab
              className={`custom-tab ${selectedTab === 1 ? "active-tab" : ""}`}
            >
              Đã phê duyệt
            </Tab>
          </TabList>

          <TabPanel>
            <div style={{ marginTop: 15 }} className="row">
              {currentBills
                .filter((bill) => bill.status === false)
                .map((bill) => (
                  <div
                    key={bill.id}
                    className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4"
                  >
                    <div className="card">
                      <div className="card-body">
                        <h4 style={{ fontSize: 16 }}>
                          {" "}
                          {bill.room && bill.room.hotel
                            ? bill.room.hotel.name
                            : "Không có tên"}
                        </h4>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faLocationDot}
                          />{" "}
                          {bill.room && bill.room.hotel
                            ? bill.room.hotel.address
                            : "Không có địa chỉ"}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faHotel}
                          />{" "}
                          Kiểu phòng: {typeIdOptions[bill.room.typeRoomId]}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faBed}
                          />{" "}
                          Kiểu giường: {bill.room.bed}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faCalendarDays}
                          />{" "}
                          Ngày nhận phòng: {formatDate(bill.date)}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faClock}
                          />{" "}
                          Số ngày thuê: {bill.period} ngày
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faPersonShelter}
                          />{" "}
                          Số lượng phòng thuê: {bill.amount} phòng
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faMoneyBill}
                          />{" "}
                          Tổng thanh toán: {formatCurrency(bill.total)}
                        </p>
                        <div>
                          {bill.status === false && (
                            <p>
                              Trạng thái:{" "}
                              <span style={{ color: "red" }}>
                                Đang chờ phê duyệt
                              </span>
                            </p>
                          )}
                          {bill.status === true && (
                            <p>
                              Trạng thái:{" "}
                              <span style={{ color: "green" }}>
                                Đã phê duyệt
                              </span>
                            </p>
                          )}
                        </div>
                        <h4 style={{ fontSize: 16 }}>Thông tin khách hàng</h4>
                        <p>Tên khách hàng: {bill.user.name}</p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faEnvelope}
                          />{" "}
                          Email khách hàng: {bill.user.email}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faPhone}
                          />{" "}
                          Số điện thoại: {bill.user.phoneNumber ?? "NnN"}
                        </p>
                        <div>
                          <button
                            className="btn btn-danger ml-auto"
                            onClick={() => handleCancelBooking(bill.id)}
                          >
                            {" "}
                            Xóa hóa đơn
                          </button>

                          <button
                            className="btn btn-success ml-2"
                            disabled={bill.status === true}
                            onClick={() => handleFinishBooking(bill.id)}
                          >
                            {bill.status
                              ? "Trạng thái đã cập nhật"
                              : "Cập nhật trạng thái"}
                          </button>
                        </div>
                        {isBookingSuccess && (
                          <div className="popup">
                            <FontAwesomeIcon
                              style={{
                                fontSize: 50,
                                color: "red",
                                textAlign: "center",
                                marginBottom: 15,
                              }}
                              icon={faTrash}
                            />
                            <p>Xóa hóa đơn thành công!</p>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleClosePopup}
                            >
                              Đóng
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {/* Pagination */}
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(
                bills.filter((bill) => bill.status === false).length /
                  billsPerPage
              )}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </TabPanel>
          <TabPanel>
            <div style={{ marginTop: 15 }} className="row">
              {currentBills
                .filter((bill) => bill.status === true)
                .map((bill) => (
                  <div
                    key={bill.id}
                    className="col-12 col-sm-12 col-md-12 col-lg-6 mb-4"
                  >
                    <div className="card">
                      <div className="card-body">
                        <h4 style={{ fontSize: 16 }}>
                          {" "}
                          {bill.room && bill.room.hotel
                            ? bill.room.hotel.name
                            : "Không có tên"}
                        </h4>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faLocationDot}
                          />{" "}
                          {bill.room && bill.room.hotel
                            ? bill.room.hotel.address
                            : "Không có địa chỉ"}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faHotel}
                          />{" "}
                          Kiểu phòng: {typeIdOptions[bill.room.typeRoomId]}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faBed}
                          />{" "}
                          Kiểu giường: {bill.room.bed}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faCalendarDays}
                          />{" "}
                          Ngày nhận phòng: {formatDate(bill.date)}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faClock}
                          />{" "}
                          Số ngày thuê: {bill.period} ngày
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faPersonShelter}
                          />{" "}
                          Số lượng phòng thuê: {bill.amount} phòng
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faMoneyBill}
                          />{" "}
                          Tổng thanh toán: {formatCurrency(bill.total)}
                        </p>
                        <div>
                          {bill.status === false && (
                            <p>
                              Trạng thái:{" "}
                              <span style={{ color: "red" }}>
                                Đang chờ phê duyệt
                              </span>
                            </p>
                          )}
                          {bill.status === true && (
                            <p>
                              Trạng thái:{" "}
                              <span style={{ color: "green" }}>
                                Đã phê duyệt
                              </span>
                            </p>
                          )}
                        </div>
                        <h4 style={{ fontSize: 16 }}>Thông tin khách hàng</h4>
                        <p>Tên khách hàng: {bill.user.name}</p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faEnvelope}
                          />{" "}
                          Email khách hàng: {bill.user.email}
                        </p>
                        <p>
                          {" "}
                          <FontAwesomeIcon
                            style={{
                              color: "#0264c8",
                            }}
                            icon={faPhone}
                          />{" "}
                          Số điện thoại: {bill.user.phoneNumber ?? "NnN"}
                        </p>
                        <div>
                          <button
                            className="btn btn-danger ml-auto"
                            onClick={() => handleCancelBooking(bill.id)}
                          >
                            {" "}
                            Xóa hóa đơn
                          </button>

                          <button
                            className="btn btn-success ml-2"
                            disabled={bill.status === true}
                            onClick={() => handleFinishBooking(bill.id)}
                          >
                            {bill.status
                              ? "Trạng thái đã cập nhật"
                              : "Cập nhật trạng thái"}
                          </button>
                        </div>
                        {isBookingSuccess && (
                          <div className="popup">
                            <FontAwesomeIcon
                              style={{
                                fontSize: 50,
                                color: "red",
                                textAlign: "center",
                                marginBottom: 15,
                              }}
                              icon={faTrash}
                            />
                            <p>Hủy phòng thành công!</p>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={handleClosePopup}
                            >
                              Đóng
                            </button>
                          </div>
                        )}
                        {isFinishSuccess && (
                          <div className="popup">
                            <FontAwesomeIcon
                              style={{
                                fontSize: 50,
                                color: "green",
                                textAlign: "center",
                                marginBottom: 15,
                              }}
                              icon={faCheck}
                            />
                            <p>Hoàn thành xác nhận hóa đơn!</p>
                            <button
                              type="button"
                              className="btn btn-secondary"
                              onClick={() => {
                                setIsFinishSuccess(false);
                                handleClosePopup();
                              }}
                            >
                              Đóng
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {isFinishSuccess && (
              <div className="popup">
                <FontAwesomeIcon
                  style={{
                    fontSize: 50,
                    color: "green",
                    textAlign: "center",
                    marginBottom: 15,
                  }}
                  icon={faCheck}
                />
                <p>Hoàn thành xác nhận hóa đơn!</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsFinishSuccess(false);
                    handleClosePopup();
                  }}
                >
                  Đóng
                </button>
              </div>
            )}
            {/* Pagination */}
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={Math.ceil(
                bills.filter((bill) => bill.status === true).length /
                  billsPerPage
              )}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </TabPanel>
        </Tabs>
      ) : (
        <p>No bills found for the given UserId.</p>
      )}
    </div>
  );
};

export default BillManage;
