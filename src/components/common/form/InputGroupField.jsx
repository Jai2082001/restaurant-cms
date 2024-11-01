import React, { ReactNode } from "react";
import { InputGroup, Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";



const InputGroupField = ({
  labelText,
  labelTextIcon,
  name,
  inputType,
  placeholder,
  errorMessage,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      {labelText && <Form.Label className="ft-14">{labelText}</Form.Label>}
      <InputGroup>
        <InputGroup.Text id={name} className="rounded-0">
          <span>{labelTextIcon}</span>
        </InputGroup.Text>
        <Form.Control
          placeholder={placeholder ? placeholder : ""}
          aria-label={name}
          type={inputType}
          // {...register(name)}
          aria-describedby={name}
          className={`${errorMessage ? "is-invalid" : ""} rounded-0`}
        />
      </InputGroup>
      {errorMessage && (
        <FormText className="text-danger">{errorMessage}</FormText>
      )}
    </Form.Group>
  );
};

export default InputGroupField;
