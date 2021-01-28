import { FormEvent, FunctionComponent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import BookingAppLogo from '../../assets/BookingAppLogo.png';
import { IAuthCredentials } from '../actions/types';
import FormInput from './FormInput';
import './AuthForm.sass';

export enum AuthFormTypes {
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    RECOVER = 'RECOVER'
}

interface AuthFormProps {
    type: AuthFormTypes;
    submitHandler: (credentials: IAuthCredentials) => void;
}

const AuthForm: FunctionComponent<AuthFormProps> = ({ type, submitHandler }) => {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const credentials: IAuthCredentials = { email, password, userName };
  const isRegister: boolean = type === AuthFormTypes.REGISTER;
  const isRecover: boolean = type === AuthFormTypes.RECOVER;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity()) {
      submitHandler(credentials);
    }
    setValidated(true);
  };

  return (
    <div className="auth-form-wrapper">
      <img id="logo-image" src={BookingAppLogo} alt="Booking app logo" />
      <Form noValidate validated={validated} id="auth-form" onSubmit={handleSubmit}>
        {isRegister
            && (
            <FormInput
              inputFor="username"
              type="text"
              label="Your name"
              placeholder="Enter your name"
              feedback="Your name is required"
              changeHandler={setUserName}
            />
            )}
        <FormInput
          inputFor="email"
          type="email"
          label="Your email"
          placeholder="Enter your email"
          feedback="Your email is required"
          changeHandler={setEmail}
        />

        {!isRecover && (
        <FormInput
          inputFor="password"
          type="password"
          label="Your password"
          placeholder="Enter your password"
          feedback="Your password is required"
          changeHandler={setPassword}
        />
        )}

        <Button type="submit" variant="primary" className="submit-button">
          {type}
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;
