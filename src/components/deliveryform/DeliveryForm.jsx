import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

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

    const [errors, setErrors] = useState({});

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Validation function
    const validate = () => {
        const newErrors = {};

        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.streetAddress) newErrors.streetAddress = "Street Address is required";
        if (!formData.townCity) newErrors.townCity = "Town/City is required";
        if (!formData.district) newErrors.district = "District is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
        if (!formData.zipCode) newErrors.zipCode = "Zip Code is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) newErrors.email = "Enter a valid email";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_FETCH_LINK}/api/addresses`, formData, { withCredentials: true });
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
            setErrors({});
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
                            <h4 className="ft-20 fw-bold text-justify">BILLING DETAILS</h4>
                        </Col>
                    </Row>
                    {/* Form Fields with Validation Feedback */}
                    <Row className="mb-2">
                        <Col md="6">
                            <Form.Control
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                isInvalid={!!errors.firstName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.firstName}
                            </Form.Control.Feedback>
                        </Col>
                        <Col md="6">
                            <Form.Control
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                isInvalid={!!errors.lastName}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.lastName}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="streetAddress"
                                type="text"
                                placeholder="Street Address"
                                value={formData.streetAddress}
                                onChange={handleChange}
                                isInvalid={!!errors.streetAddress}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.streetAddress}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.townCity}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.townCity}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.district}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.district}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.phone}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.phone}
                            </Form.Control.Feedback>
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
                                isInvalid={!!errors.zipCode}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.zipCode}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            <Button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-md">
                Save Address
            </Button>
        </Col>
    );
};

export default DeliveryForm;
