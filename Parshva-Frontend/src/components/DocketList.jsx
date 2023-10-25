import React, { useState, useEffect } from "react";
import DocketForm from "./DocketForm";
import { Modal, Button } from "react-bootstrap";

export default function DocketList() {
  const [tickets, setTickets] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("https://docket-list.vercel.app/api/dockets/get");
      const data = await response.json();
      setTickets(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching suppliers", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <>
      <div
        className="m-5 p-5 bg-light border border-2 border-dark rounded-3 shadow-lg"
        style={{ minHeight: "80vh" }}
      >
        <div className="d-flex justify-content-between mb-5">
          <h1>Dockets</h1>
          <Button
            variant="outline-dark"
            className="border-2"
            onClick={handleShow}
          >
            Create New Docket
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a Docket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <DocketForm setShow={setShow} fetchSuppliers={fetchSuppliers} />
            </Modal.Body>
          </Modal>
        </div>
        <div className="bg-white border border-dark border-2 ">
          <div
            className="bg-dark text-light p-4 "
            style={{
              display: "grid",
              gap:"1em",
              gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            }}
          >
            <span>Name</span>
            <span>Start time</span>
            <span>End time</span>
            <span>No. of hours worked</span>
            <span>Rate per hour</span>
            <span>Supplier Name</span>
            <span>Purchase order num.</span>
            <span>Purchase order desc.</span>
          </div>
          {tickets ? (
            tickets.map((ticket, i) => {
              const poSplit = ticket.purchaseOrder.split(" : ");
              return (
                <div
                  className="bg-light text-dark p-4  border-bottom border-5 border-white"
                  style={{
                    display: "grid",
                    gap:"1em",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                  }}
                  key={i}
                >
                  <span>{ticket.name}</span>
                  <span>{ticket.startTime}</span>
                  <span>{ticket.endTime}</span>
                  <span>{ticket.hoursWorked}</span>
                  <span>{ticket.ratePerHour}</span>
                  <span>{ticket.supplier}</span>
                  <span>{poSplit[0]}</span>
                  <span>{poSplit[1]}</span>
                </div>
              );
            })
          ) : (
            <h2 className="text-center p-5">No Data</h2>
          )}
        </div>
      </div>
    </>
  );
}
