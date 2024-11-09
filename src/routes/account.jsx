import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const Account = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "", // Only used if there is a registration form
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

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
            newErrors.email = "Enter a valid email";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";

        if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/account`, formData, { withCredentials: true });
            console.log("Account data saved:", response.data);
            alert("Account data saved successfully!");
            setFormData({
                email: "",
                password: "",
                confirmPassword: "", // Clear only if registration form
            });
            setErrors({});
        } catch (error) {
            console.error("Error saving account data:", error);
            alert("Failed to save account data.");
        }
    };

    return (
        <Col md="6">
            <Card className="rounded-0 border-0">
                <Card.Body>
                    <Row className="py-2">
                        <Col md="12">
                            <h4 className="ft-20 fw-bold text-justify">ACCOUNT DETAILS</h4>
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
                    <Row className="mb-2">
                        <Col md="12">
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Col>
                    </Row>
                    {/* Conditionally render confirmPassword for registration */}
                    {formData.confirmPassword !== undefined && (
                        <Row className="mb-2">
                            <Col md="12">
                                <Form.Control
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    isInvalid={!!errors.confirmPassword}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.confirmPassword}
                                </Form.Control.Feedback>
                            </Col>
                        </Row>
                    )}
                </Card.Body>
            </Card>
            <Button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 shadow-md">
                Save Account
            </Button>
        </Col>
    );
};

export default Account;
