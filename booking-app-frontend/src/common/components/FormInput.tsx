import { FunctionComponent, ChangeEvent, ElementType } from 'react';
import { Form } from 'react-bootstrap';

interface FormInputProps {
    label: string;
    value: string;
    type?: string;
    as?: ElementType;
    rows?: number;
    options?: string[];
    min?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  type, label, value, as, rows, options, min, placeholder, onChange,
}) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    {as === 'select' && options
        && (
        <Form.Control as="select" value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Form.Control>
        )}
    {as !== 'select' && (
      <Form.Control
        type={type}
        placeholder={placeholder}
        as={as}
        rows={rows}
        value={value}
        min={min}
        required
        onChange={onChange}
      />
    )}
  </Form.Group>
);

export default FormInput;
