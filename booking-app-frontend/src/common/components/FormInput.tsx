import {
  FunctionComponent, ChangeEvent, ElementType, useRef,
} from 'react';
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
    pattern?: string;
    validationMessage?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FunctionComponent<FormInputProps> = ({
  type, label, value, as, rows, options, min, placeholder, pattern, validationMessage, onChange,
}) => {
  const inputElement = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    if (!inputElement.current) return;
    if (inputElement.current.checkValidity()) {
      inputElement.current.setCustomValidity('');
    } else if (validationMessage) {
      inputElement.current.setCustomValidity(validationMessage);
    }
  };

  return (
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
          ref={inputElement}
          type={type}
          placeholder={placeholder}
          as={as}
          rows={rows}
          value={value}
          min={min}
          required
          pattern={pattern}
          onChange={handleChange}
        />
      )}
    </Form.Group>
  );
};

export default FormInput;
