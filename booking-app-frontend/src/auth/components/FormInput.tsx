import { FunctionComponent } from 'react';
import { Form } from 'react-bootstrap';

interface FormInputProps {
    inputFor: string;
    type: string;
    label: string;
    placeholder: string;
    feedback: string;
    changeHandler: (newState: string) => void;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  inputFor, type, label, placeholder, feedback, changeHandler,
}) => (
  <Form.Group controlId={`auth-form-${inputFor}`}>
    <Form.Label>
      {label}
    </Form.Label>
    <Form.Control
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
