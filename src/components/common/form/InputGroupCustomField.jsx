import React, { ReactNode } from "react";
import { InputGroup, Form, FormText } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

const InputGroupCustomField = ({
  labelText,
  labelTextIcon,
  name,
  inputType,
  placeholder,
  errorMessage,
}) => {
  const { register } = useFormContext();
  return (
    <Form.Group className="mb-3" controlId={name}>
      {(labelText ).length > 0 && <Form.Label className="ft-14">{labelText}</Form.Label>}
      <InputGroup>
        <Form.Control
          placeholder={placeholder ? placeholder : ""}
          aria-label={name}
          type={inputType}
          {...register(name)}
          aria-describedby={name}
          className={`${errorMessage ? "is-invalid" : ""} rounded-0`}
        />
        <InputGroup.Text id={name} className="rounded-0 cursor-pointer bg-white">
          <span>{labelTextIcon}</span>
        </InputGroup.Text>
      </InputGroup>
      {errorMessage && (
        <FormText className="text-danger">{errorMessage}</FormText>
      )}
    </Form.Group>
  );
};

export default InputGroupCustomField;
