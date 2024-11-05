import { Card, Col, Row, Form, Button } from 'react-bootstrap';
import DeliveryForm from '../deliveryform/DeliveryForm';
import { useState } from 'react';

const SavedAddresses = ({ addresses, selectedAddressId, onSelectAddress, onAddNewAddress }) => {
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const handleAddAddressClick = () => {
    setShowAddAddressForm(!showAddAddressForm);
  };

  return (
    <Col md="7">
      <Card className="rounded-0 border-0 mb-3">
        <Card.Body>
          <Row className="py-2">
            <Col md="12">
              <h4 className="ft-20 fw-bold text-justify">
                SELECT A SAVED ADDRESS
              </h4>
            </Col>
          </Row>

          {addresses.map((address) => (
            <Card key={address.id} className="rounded-0 border mb-3">
              <Card.Body>
                <Form.Check
                  type="radio"
                  name="selectedAddress"
                  id={`address-${address.id}`}
                  label=""
                  checked={selectedAddressId === address.id}
                  onChange={() => onSelectAddress(address.id)}
                  className="mb-3"
                />
                <Row className="mb-2">
                  <Col md="6">
                    <div className="text-muted">First Name</div>
                    <div>{address.firstName}</div>
                  </Col>
                  <Col md="6">
                    <div className="text-muted">Last Name</div>
                    <div>{address.lastName}</div>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md="12">
                    <div className="text-muted">Street Address</div>
                    <div>{address.streetAddress}</div>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md="6">
                    <div className="text-muted">Town/City</div>
                    <div>{address.townCity}</div>
                  </Col>
                  <Col md="6">
                    <div className="text-muted">District</div>
                    <div>{address.district}</div>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md="6">
                    <div className="text-muted">Phone</div>
                    <div>{address.phone}</div>
                  </Col>
                  <Col md="6">
                    <div className="text-muted">ZipCode</div>
                    <div>{address.zipCode}</div>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col md="12">
                    <div className="text-muted">Email</div>
                    <div>{address.email}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          <Button 
            variant="primary" 
            className="mt-3"
            onClick={handleAddAddressClick}
          >
            {showAddAddressForm ? "Cancel" : "Add New Address"}
          </Button>

          {showAddAddressForm && (
            <div className="mt-3">
              <DeliveryForm onSubmit={onAddNewAddress} />
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SavedAddresses;
