import React from "react";
import { Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
// interface InputFormProps {
//   labelText: string;
//   name: string;
//   inputType: string;
//   errorMessage?: string;
//   labelCls?: string;
//   formCheckCls?: string;
// }

export const InputField = ({
  labelText,
  name,
  inputType,
  errorMessage,
  labelCls,
  ...props
}) => {


  return (
    <Form.Group controlId={name} >
      <Form.Label className={labelCls ? labelCls : 'ft-14'}>{labelText}</Form.Label>
      <Form.Control
        type={inputType ? inputType : "text"}
        autoComplete="off"
        className={`${errorMessage ? "is-invalid" : ""} rounded-0`}
        {...props}
      />
      {errorMessage && (
        <FormText className="text-danger">{errorMessage}</FormText>
      )}
    </Form.Group>
  );
};
