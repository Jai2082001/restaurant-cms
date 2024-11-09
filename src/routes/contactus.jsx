import BaseContainer from "../components/common/container/BaseContainer";
import React from "react";
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import {
  MdMailOutline,
  MdOutlineAddIcCall,
  MdOutlineMail,
} from "react-icons/md";
import InputGroupField from "../components/common/form/InputGroupField";
// import {
//   ContactUsFormFields,
//   contactUsSchema,
// } from "../components/contact-us/contact-us.helper";
import { FormProvider, useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { getErrorMessage } from "@/data/utils/lib";
import TextAreaField from "../components/common/form/TextAreaField";

const ContactUs = () => {
//   const methods = useForm<ContactUsFormFields>({
//     resolver: yupResolver(contactUsSchema),
//     mode: "onTouched",
//   });

//   const {
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = methods;

//   const onSubmit = async (data: ContactUsFormFields) => {
//     alert("Thanks for query. We shall get back to you very shortly !");
//     reset();
//   };

  const errorMessage = (error) => {alert(error)};

  return (
    <section>
      <BaseContainer>
       
        <Row className="py-5 border-bottom">
          <Col md="6">
            <h1 className="ft-24 fw-bold text-dark">OUR CORPORATE OFFICE</h1>
            <div className="py-2">
              <h2 className="ft-16">
                <span className="text-color-b94" style={{ marginRight: "8px" }}>
                  <FaHome size={19} />
                </span>
                <span className="text-color-b94 fw-normal">
           
                </span>
              </h2>
            </div>
            <div className="py-2">
              <h2 className="ft-16">
                <span className="text-color-b94" style={{ marginRight: "8px" }}>
                  <MdOutlineAddIcCall size={19} />
                </span>
                <span className="text-color-b94 fw-normal">+8801712341937</span>
              </h2>
            </div>
            <div className="py-2">
              <h2 className="ft-16">
                <span className="text-color-b94" style={{ marginRight: "8px" }}>
                  <MdMailOutline size={19} />
                </span>
                <span className="text-color-b94 fw-normal">
         
                </span>
              </h2>
            </div>
            <Row className="py-2">
              <Col md="12">
                <h2 className="ft-24 fw-bold text-dark mt-2 mb-2">
                  OPENING TIME
                </h2>
                <h3 className="mt-2">
                  <span className="ft-16 fw-normal text-color-b94">
                    Saturday -- Thursday : 9.00 AM- 5.00 PM
                  </span>
                </h3>
              </Col>
            </Row>
          </Col>
          <Col md="6">
            <h1 className="ft-24 fw-bold text-dark mt-3 mb-3">GET IN TOUCH</h1>
            <div>
              <FormProvider >
                <Form className="py-3" >
                  <InputGroupField
                    labelTextIcon={<AiOutlineUser size={19} />}
                    name="name"
                    inputType="text"
                    placeholder="Name"
                    // errorMessage={errorMessage("name")}
                  />

                  <InputGroupField
                    labelTextIcon={<MdOutlineAddIcCall size={19} />}
                    name="phone"
                    inputType="text"
                    placeholder="Phone"
                    // errorMessage={errorMessage("phone")}
                  />

                  <InputGroupField
                    labelTextIcon={<MdOutlineMail size={19} />}
                    name="email"
                    inputType="email"
                    placeholder="Email"
                    // errorMessage={errorMessage("email")}
                  />

                  <TextAreaField
                    labelText="Message : "
                    name="message"
                    rows={3}
                    // errorMessage={errorMessage("message")}
                  />

                  <Row className="py-4">
                    <Col>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Button
                          variant="danger"
                          type="submit"
                          className="w-100 rounded-0"
                        >
                          Send
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </FormProvider>
            </div>
          </Col>
        </Row>
      </BaseContainer>
    </section>
  );
};

export default ContactUs;
