import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios'
const DeliveryForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        streetAddress: "",
        townCity: "",
        district: "",
        phone: "",
        zipCode: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("http://localhost:5000/api/addresses", formData, {withCredentials: true});
          console.log("Address saved:", response.data);
          alert("Address saved successfully!");
          setFormData({
            firstName: "",
            lastName: "",
            streetAddress: "",
            townCity: "",
            district: "",
            phone: "",
            zipCode: "",
            email: "",
          });
          window.location.reload();

        } catch (error) {
          console.error("Error saving address:", error);
          alert("Failed to save address.");

        }
      };

    return (

        <Col md="7">
            <Card className="rounded-0 border-0">
                <Card.Body>
                    <Row className="py-2">
                        <Col md="12">
                            <h4 className="ft-20 fw-bold text-justify">
                                BILLING DETAILS
                            </h4>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="6">
                            <Form.Control
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            // errorMessage={errorMessage("firstName")}
                            />
                        </Col>
                        <Col md="6">
                            <Form.Control
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            // errorMessage={errorMessage("lastName")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="streetAddress"
                                type="text"
                                placeholder="Street Addresses"
                                value={formData.streetAddress}
                                onChange={handleChange}
                            // errorMessage={errorMessage("streetAddress")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="townCity"
                                type="text"
                                placeholder="Town/City"
                                value={formData.townCity}
                                onChange={handleChange}
                            // errorMessage={errorMessage("townCity")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="district"
                                type="text"
                                placeholder="District"
                                value={formData.district}
                                onChange={handleChange}
                            // errorMessage={errorMessage("district")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="phone"
                                type="text"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                            // errorMessage={errorMessage("phone")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="zipCode"
                                type="text"
                                placeholder="Zip Code"
                                value={formData.zipCode}
                                onChange={handleChange}
                            // errorMessage={errorMessage("zipCode")}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="email"
                                type="text"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            // errorMessage={errorMessage("email")}
                            />
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
            <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-md">
                Save Address
            </button>
        </Col>
    )
}

export default DeliveryForm