import { FunctionComponent, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { Validator } from '../validators';

interface FormInputProps {
    inputFor: string;
    type: string;
    label: string;
    value: string;
    placeholder: string;
    feedback: string;
    isValid: boolean;
    changeHandler: (newState: string) => void;
}

export const useFormInput = (validate: Validator) => {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setValid(validate(value));
  }, [value]);

  return [value, valid, setValue];
};

const FormInput: FunctionComponent<FormInputProps> = ({
  inputFor, type, label, value, placeholder, feedback, isValid, changeHandler,
}) => (
  <Form.Group controlId={`auth-form-${inputFor}`}>
    <Form.Label>
      {label}
    </Form.Label>
    <Form.Control
      isValid={isValid}
      isInvalid={value !== '' ? !isValid : undefined}
      value={value}
      required
      type={type}
      placeholder={placeholder}
      onChange={(event) => changeHandler(event.target.value)}
    />
    <Form.Control.Feedback type="invalid">
      {feedback}
    </Form.Control.Feedback>
  </Form.Group>
);

export default FormInput;
