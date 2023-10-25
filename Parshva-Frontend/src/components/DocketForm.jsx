import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormControl,
  FormLabel,
} from "react-bootstrap";

const DocketForm = ({ setShow, fetchSuppliers }) => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    hoursWorked: "",
    ratePerHour: "",
    supplier: "",
    purchaseOrder: "",
  });

  const [suppliers, setSuppliers] = useState([]); // List of suppliers
  const [purchaseOrders, setPurchaseOrders] = useState([]); // List of purchase orders for the selected supplier
  const [poList, setPoList] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setPoList(true);
  };

  useEffect(() => {
    // Simulate fetching suppliers from an API
    // You should replace this with an actual API call
    const fetchSuppliers = async () => {
      try {
        // Fetch suppliers and set them in the state
        const response = await fetch("dataFile.json");
        const data = await response.json();
        setSuppliers(data);
      } catch (error) {
        console.error("Error fetching suppliers", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleValidation = () => {
    let isValid = true;
    const newErrors = {};

    // Basic validation example: All fields are required
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSupplierChange = (e) => {
    const currentSup = suppliers.find(
      (name) => name.Supplier === e.target.value
    );

    const purchaseOrderList = suppliers.filter(
      (num) => num["PO Number"] === currentSup["PO Number"] && num["PO Number"]
    );
    setPurchaseOrders(purchaseOrderList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = handleValidation();

    if (isValid) {
      // Form is valid, you can proceed with submission
      // Send the form data to the server using a POST request
      fetch("https://docket-list.vercel.app/api/dockets/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setShow(false);
          console.log("Form data submitted:", data);
          fetchSuppliers();
          // You can perform any additional actions after a successful submission
        })
        .catch((error) => {
          console.error("Error submitting the form data:", error);
        });
    } else {
      // Form is not valid, you can display validation errors
      console.log("Form validation failed");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel>Name:</FormLabel>
          <FormControl
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </FormGroup>
        <Row>
          <Col>
            <FormGroup className="mb-3">
              <FormLabel>Start Time:</FormLabel>
              <FormControl
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
              {errors.startTime && (
                <div className="text-danger">{errors.startTime}</div>
              )}
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-3">
              <FormLabel>End Time:</FormLabel>
              <FormControl
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
              {errors.endTime && (
                <div className="text-danger">{errors.endTime}</div>
              )}
            </FormGroup>
          </Col>
        </Row>
        <FormGroup className="mb-3">
          <FormLabel>No. of Hours Worked:</FormLabel>
          <FormControl
            type="number"
            name="hoursWorked"
            value={formData.hoursWorked}
            onChange={handleChange}
          />
          {errors.hoursWorked && (
            <div className="text-danger">{errors.hoursWorked}</div>
          )}
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Rate Per Hour:</FormLabel>
          <FormControl
            type="number"
            name="ratePerHour"
            value={formData.ratePerHour}
            onChange={handleChange}
          />
          {errors.ratePerHour && (
            <div className="text-danger">{errors.ratePerHour}</div>
          )}
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel>Supplier:</FormLabel>
          <FormControl
            as="select"
            name="supplier"
            value={formData.supplier}
            onChange={(e) => {
              handleChange(e);
              handleSupplierChange(e);
            }}
          >
            <option value="">Select Supplier</option>
            {suppliers?.map(
              (supplier, i) =>
                supplier.Supplier && (
                  <option
                    key={i}
                    value={supplier.Supplier}
                    data-info={supplier}
                  >
                    {supplier.Supplier}
                  </option>
                )
            )}
          </FormControl>
          {errors.supplier && (
            <div className="text-danger">{errors.supplier}</div>
          )}
        </FormGroup>
        {poList && purchaseOrders && (
          <FormGroup className="mb-3">
            <FormLabel>Purchase Order:</FormLabel>
            <FormControl
              as="select"
              name="purchaseOrder"
              value={formData.purchaseOrder}
              onChange={(e) => {
                handleChange(e);
              }}
            >
              <option value="">Select Purchase Order</option>
              {purchaseOrders.map((po, i) => (
                <option
                  key={i}
                  value={po["PO Number"] + " : " + po.Description}
                  data-info={po}
                >
                  {po["PO Number"]}&nbsp;:&nbsp;{po.Description}
                </option>
              ))}
            </FormControl>
            {errors.purchaseOrder && (
              <div className="text-danger">{errors.purchaseOrder}</div>
            )}
          </FormGroup>
        )}

        <Button type="submit" variant="outline-dark" className="w-100 my-2">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default DocketForm;
