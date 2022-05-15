import React from "react";
import "./input.css";
import { useField, FieldArray } from "formik";
import { Row, Col } from "react-bootstrap";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <>
      <Row className="justify-content-center ml-auto mr-auto">
        <label
          htmlFor={props.id || props.name}
          className="form-text mb-1 mt-3 justify-content-center text-center"
        >
          {label}
        </label>
        <br />
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error form-text mt-1 justify-content-center text-center mb-n1">
            {meta.error}
          </div>
        ) : null}
      </Row>
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Row className="justify-content-center ml-auto mr-auto">
      <label
        htmlFor={props.id || props.name}
        className="form-text mb-1 mt-3 justify-content-center text-center"
      >
        {label}
      </label>
      <select
        {...field}
        {...props}
        className="text-input py-1"
        placeholder="Choose an option"
      />
      {meta.touched && meta.error ? (
        <div className="error form-text mt-1 justify-content-center text-center mb-n1">
          {meta.error}
        </div>
      ) : null}
    </Row>
  );
};

const MyMultipleSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Row className="justify-content-center ml-auto mr-auto">
      <label
        htmlFor={props.id || props.name}
        className="form-text mb-1 mt-3 justify-content-center text-center"
      >
        {label}
      </label>
      <FieldArray
        {...field}
        {...props}
        className="text-input py-1"
        placeholder="Choose an option"
      />
      {meta.touched && meta.error ? (
        <div className="error form-text mt-1 justify-content-center text-center mb-n1">
          {meta.error}
        </div>
      ) : null}
    </Row>
  );
};

const MyFile = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Row className="justify-content-center ml-auto mr-auto">
        <label
          htmlFor={props.id || props.name}
          className="form-text mb-1 mt-3 justify-content-center text-center"
        >
          {label}
        </label>
        <br />
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error form-text mt-1 justify-content-center text-center mb-n1">
            {meta.error}
          </div>
        ) : null}
      </Row>
    </>
  );
};

export { MyTextInput, MySelect, MyFile, MyMultipleSelect };
